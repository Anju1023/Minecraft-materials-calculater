// マイクラ材料計算機のJavaScript

// プロジェクトデータ
let buildings = {};

// ローカルストレージからデータを読み込み
function loadData() {
	const saved = localStorage.getItem('minecraft-calculator-data');
	if (saved) {
		try {
			buildings = JSON.parse(saved);
			updateBuildingSelects();
			updateBuildingsList();
		} catch (e) {
			console.error('データの読み込みに失敗しました:', e);
		}
	}
}

// ローカルストレージにデータを保存
function saveData() {
	try {
		localStorage.setItem(
			'minecraft-calculator-data',
			JSON.stringify(buildings)
		);
	} catch (e) {
		console.error('データの保存に失敗しました:', e);
	}
}

// 建物を追加
function addBuilding() {
	const nameInput = document.getElementById('buildingName');
	const name = nameInput.value.trim();

	if (!name) {
		showMessage('建物名を入力してください', 'error');
		return;
	}

	if (buildings[name]) {
		showMessage(`「${name}」は既に存在します`, 'error');
		return;
	}

	buildings[name] = {};
	nameInput.value = '';

	updateBuildingSelects();
	updateBuildingsList();
	saveData(); // 自動保存
	showMessage(`✓ 建物「${name}」を追加しました！`, 'success');
}

// 材料を追加
function addMaterial() {
	const buildingSelect = document.getElementById('buildingSelect');
	const materialInput = document.getElementById('materialName');
	const quantityInput = document.getElementById('materialQuantity');

	const buildingName = buildingSelect.value;
	const materialName = materialInput.value.trim();
	const quantity = parseInt(quantityInput.value);

	if (!buildingName) {
		showMessage('建物を選択してください', 'error');
		return;
	}

	if (!materialName) {
		showMessage('材料名を入力してください', 'error');
		return;
	}

	if (!quantity || quantity <= 0) {
		showMessage('正しい個数を入力してください', 'error');
		return;
	}

	buildings[buildingName][materialName] = quantity;

	materialInput.value = '';
	quantityInput.value = '';

	updateBuildingsList();
	saveData(); // 自動保存
	showMessage(
		`✓ ${buildingName}に「${materialName} x${quantity}」を追加しました`,
		'success'
	);
}

// 材料を削除
function deleteMaterial(buildingName, materialName) {
	delete buildings[buildingName][materialName];
	updateBuildingsList();
	saveData(); // 自動保存
	showMessage(`「${materialName}」を削除しました`, 'success');
}

// 建物を削除
function deleteBuilding(buildingName) {
	if (confirm(`「${buildingName}」を削除しますか？`)) {
		delete buildings[buildingName];
		updateBuildingSelects();
		updateBuildingsList();
		saveData(); // 自動保存
		showMessage(`「${buildingName}」を削除しました`, 'success');
	}
}

// セレクトボックスを更新
function updateBuildingSelects() {
	const selects = ['buildingSelect', 'calcBuildingSelect'];

	selects.forEach((selectId) => {
		const select = document.getElementById(selectId);
		const currentValue = select.value;

		// オプションをクリア
		select.innerHTML =
			selectId === 'buildingSelect'
				? '<option value="">建物を選択</option>'
				: '<option value="">建物を選んで個別計算</option>';

		// 建物を追加
		Object.keys(buildings).forEach((name) => {
			const option = document.createElement('option');
			option.value = name;
			option.textContent = name;
			select.appendChild(option);
		});

		// 前の選択を復元
		if (currentValue && buildings[currentValue]) {
			select.value = currentValue;
		}
	});
}

// 建物一覧を更新
function updateBuildingsList() {
	const container = document.getElementById('buildingsList');

	if (Object.keys(buildings).length === 0) {
		container.innerHTML = '<p>建物が登録されていません</p>';
		return;
	}

	container.innerHTML = '';

	Object.entries(buildings).forEach(([buildingName, materials]) => {
		const card = document.createElement('div');
		card.className = 'building-card';

		const header = document.createElement('div');
		header.className = 'building-header';
		header.style.display = 'flex';
		header.style.justifyContent = 'space-between';
		header.style.alignItems = 'center';
		header.style.marginBottom = '24px';

		const title = document.createElement('h3');
		title.textContent = `🏠 ${buildingName}`;

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = '🗑️ 建物削除';
		deleteBtn.className = 'delete-btn building-delete';
		deleteBtn.onclick = () => deleteBuilding(buildingName);

		header.appendChild(title);
		header.appendChild(deleteBtn);
		card.appendChild(header);

		if (Object.keys(materials).length === 0) {
			const empty = document.createElement('p');
			empty.textContent = '材料未登録';
			empty.style.color = '#666';
			card.appendChild(empty);
		} else {
			Object.entries(materials).forEach(([materialName, quantity]) => {
				const item = document.createElement('div');
				item.className = 'material-item';

				const info = document.createElement('span');
				info.className = 'material-info';
				info.textContent = `${materialName}: ${quantity}個`;

				const delBtn = document.createElement('button');
				delBtn.textContent = '❌';
				delBtn.className = 'delete-btn material-delete';
				delBtn.title = '材料を削除';
				delBtn.onclick = () => deleteMaterial(buildingName, materialName);

				item.appendChild(info);
				item.appendChild(delBtn);
				card.appendChild(item);
			});
		}

		container.appendChild(card);
	});
}

// 材料を基礎素材まで分解
function decomposeMaterial(material, quantity, baseMaterials = {}, depth = 0) {
	if (depth > 10) return baseMaterials; // 無限ループ防止

	if (!RECIPES[material]) {
		// レシピがない = 基礎素材
		baseMaterials[material] = (baseMaterials[material] || 0) + quantity;
		return baseMaterials;
	}

	const recipe = RECIPES[material];
	const yieldAmount = recipe.yield || 1;

	// 必要なクラフト回数を計算（切り上げ）
	const craftTimes = Math.ceil(quantity / yieldAmount);

	// 各素材を再帰的に分解
	Object.entries(recipe).forEach(([ingredient, ingredientQty]) => {
		if (ingredient === 'yield') return;

		const needed = ingredientQty * craftTimes;
		decomposeMaterial(ingredient, needed, baseMaterials, depth + 1);
	});

	return baseMaterials;
}

// 全建物の計算
function calculateAll() {
	if (Object.keys(buildings).length === 0) {
		showMessage('建物が登録されていません', 'error');
		return;
	}

	// 全建物の材料を合計
	const allMaterials = {};
	Object.values(buildings).forEach((materials) => {
		Object.entries(materials).forEach(([material, quantity]) => {
			allMaterials[material] = (allMaterials[material] || 0) + quantity;
		});
	});

	const baseMaterials = {};
	Object.entries(allMaterials).forEach(([material, quantity]) => {
		decomposeMaterial(material, quantity, baseMaterials);
	});

	displayResults('🏘️ 合計必要素材', baseMaterials);
}

// 個別建物の計算
function calculateBuilding() {
	const select = document.getElementById('calcBuildingSelect');
	const buildingName = select.value;

	if (!buildingName) {
		showMessage('計算する建物を選択してください', 'error');
		return;
	}

	const materials = buildings[buildingName];
	if (Object.keys(materials).length === 0) {
		showMessage('材料が登録されていません', 'error');
		return;
	}

	const baseMaterials = {};
	Object.entries(materials).forEach(([material, quantity]) => {
		decomposeMaterial(material, quantity, baseMaterials);
	});

	displayResults(`🏠 ${buildingName}の必要素材`, baseMaterials);
}

// 結果を表示
function displayResults(title, baseMaterials) {
	const container = document.getElementById('results');

	if (Object.keys(baseMaterials).length === 0) {
		container.innerHTML = '<p>計算する材料がありません</p>';
		return;
	}

	// カテゴリー分類
	const categoryKeys = [
		'🌸 サクラ',
		'🌳 ペールオーク',
		'🌲 オーク',
		'🌲 スプルース',
		'🌲 シラカバ',
		'🌲 ジャングル',
		'🌲 アカシア',
		'🌲 ダークオーク',
		'🌴 マングローブ',
		'🎋 竹',
		'🪨 石材',
		'🪟 ガラス',
		'⚙️ 鉄・金属',
		'💡 燃料・光源',
		'🪴 植物・自然',
		'🎨 その他',
	];

	const categories = {};
	categoryKeys.forEach((key) => {
		categories[key] = [];
	});

	Object.entries(baseMaterials).forEach(([material, quantity]) => {
		const qtyCeil = Math.ceil(quantity);

		if (material.includes('サクラ')) {
			categories['🌸 サクラ'].push([material, qtyCeil]);
		} else if (material.includes('ペールオーク')) {
			categories['🌳 ペールオーク'].push([material, qtyCeil]);
		} else if (material.includes('オーク')) {
			categories['🌲 オーク'].push([material, qtyCeil]);
		} else if (material.includes('スプルース')) {
			categories['🌲 スプルース'].push([material, qtyCeil]);
		} else if (material.includes('シラカバ')) {
			categories['🌲 シラカバ'].push([material, qtyCeil]);
		} else if (material.includes('ジャングル')) {
			categories['🌲 ジャングル'].push([material, qtyCeil]);
		} else if (material.includes('アカシア')) {
			categories['🌲 アカシア'].push([material, qtyCeil]);
		} else if (material.includes('ダークオーク')) {
			categories['🌲 ダークオーク'].push([material, qtyCeil]);
		} else if (material.includes('マングローブ')) {
			categories['🌴 マングローブ'].push([material, qtyCeil]);
		} else if (material.includes('竹')) {
			categories['🎋 竹'].push([material, qtyCeil]);
		} else if (
			[
				'石',
				'丸石',
				'花崗岩',
				'閃緑岩',
				'安山岩',
				'深層岩',
				'凝灰岩',
				'砂岩',
				'プリズマリン',
				'エンドストーン',
				'ネザーレンガ',
				'玄武岩',
				'ブラックストーン',
			].some((s) => material.includes(s))
		) {
			categories['🪨 石材'].push([material, qtyCeil]);
		} else if (['ガラス', '砂'].some((s) => material.includes(s))) {
			categories['🪟 ガラス'].push([material, qtyCeil]);
		} else if (
			['鉄', '金', '銅', 'ネザライト', '鎖'].some((s) => material.includes(s))
		) {
			categories['⚙️ 鉄・金属'].push([material, qtyCeil]);
		} else if (
			[
				'石炭',
				'松明',
				'ランタン',
				'グロウストーン',
				'シーランタン',
				'エンドロッド',
				'ろうそく',
			].some((s) => material.includes(s))
		) {
			categories['💡 燃料・光源'].push([material, qtyCeil]);
		} else if (
			['草', '葉', 'ベリー', '苗木', 'ツタ', 'サトウキビ', '花', 'キノコ'].some(
				(s) => material.includes(s)
			)
		) {
			categories['🪴 植物・自然'].push([material, qtyCeil]);
		} else {
			categories['🎨 その他'].push([material, qtyCeil]);
		}
	});

	// HTML生成
	let html = `<div class="results-container">
        <h2>${title}</h2>`;

	Object.entries(categories).forEach(([categoryName, items]) => {
		if (items.length === 0) return;

		html += `<div class="category">
            <h3>${categoryName}</h3>`;

		items.forEach(([material, quantity]) => {
			const stackSize = getStackSize(material);
			const stacks = Math.floor(quantity / stackSize);
			const remaining = quantity % stackSize;

			let stackInfo = '';
			if (stackSize === 1) {
				stackInfo = '<span class="stack-info">(スタック不可)</span>';
			} else if (stacks > 0) {
				stackInfo =
					remaining > 0
						? `<span class="stack-info">(${stacks}スタック + ${remaining}個)</span>`
						: `<span class="stack-info">(${stacks}スタック)</span>`;
			}

			const displayName = material;
			const unit = '個';

			// 入手方法の情報を取得
			const source = getMaterialSource(material);
			let sourceInfo = '';

			if (source) {
				const miningText = '採取';
				const craftingText = 'クラフト';

				if (source.mining && source.crafting) {
					// 推奨方法を先に表示
					const miningClass = source.mining.recommended
						? 'source-option mining recommended'
						: 'source-option mining alternative';
					const craftingClass = source.crafting.recommended
						? 'source-option crafting recommended'
						: 'source-option crafting alternative';

					const miningOption = `<span class="${miningClass}" title="${
						source.mining.location || ''
					}">${miningText}: ${source.mining.name}${
						source.mining.recommended ? ' ⭐' : ''
					}</span>`;
					const craftingOption = `<span class="${craftingClass}" title="${
						source.crafting.method || ''
					}">${craftingText}: ${source.crafting.name}${
						source.crafting.recommended ? ' ⭐' : ''
					}</span>`;

					// 推奨を先に表示
					if (source.mining.recommended) {
						sourceInfo = `<div class="source-options">${miningOption}${craftingOption}</div>`;
					} else {
						sourceInfo = `<div class="source-options">${craftingOption}${miningOption}</div>`;
					}
				} else if (source.mining) {
					sourceInfo = `<div class="source-info mining" title="${
						source.mining.location || ''
					}">${miningText}: ${source.mining.name}</div>`;
				} else if (source.crafting) {
					sourceInfo = `<div class="source-info crafting" title="${
						source.crafting.method || ''
					}">${craftingText}: ${source.crafting.name}</div>`;
				}
			}

			html += `<div class="material-result">
                <div class="material-main">
                    <span class="material-name">${displayName}</span>
                    <span>
                        <span class="material-quantity">× ${quantity}${unit}</span>
                        ${stackInfo}
                    </span>
                </div>
                ${sourceInfo}
            </div>`;
		});

		html += '</div>';
	});

	html += `
		<div class="copy-section">
			<button onclick="copyResults()" class="copy-btn">
				📋 クリップボードにコピー
			</button>
		</div>
	</div>`;
	container.innerHTML = html;
}

// メッセージ表示
function showMessage(message, type) {
	// 既存のメッセージを削除
	const existing = document.querySelector('.success-message, .error-message');
	if (existing) existing.remove();

	const messageDiv = document.createElement('div');
	messageDiv.className =
		type === 'success' ? 'success-message' : 'error-message';
	messageDiv.textContent = message;

	// メインコンテナの最初に挿入
	const main = document.querySelector('main');
	main.insertBefore(messageDiv, main.firstChild);

	// 3秒後に自動削除
	setTimeout(() => {
		if (messageDiv.parentNode) {
			messageDiv.remove();
		}
	}, 3000);
}

// 初期化
document.addEventListener('DOMContentLoaded', function () {
	loadData();
	updateMaterialList();

	// Enterキーイベント
	document
		.getElementById('buildingName')
		.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') addBuilding();
		});

	document
		.getElementById('materialQuantity')
		.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') addMaterial();
		});

	// サンプルデータを追加（デモ用）
	setTimeout(() => {
		buildings['小さな家'] = {
			オークの板材: 64,
			オークの階段: 16,
			オークのドア: 2,
			ガラス: 8,
			石: 32,
			松明: 6,
		};

		updateBuildingSelects();
		updateBuildingsList();
		showMessage(
			'✨ サンプルデータ「小さな家」を追加しました！試しに計算してみてね',
			'success'
		);
	}, 1000);
});
// ページ読み込み時にデータを復元（統合済み）
// 全データをクリア
function clearAllData() {
	if (confirm('すべてのデータを削除しますか？この操作は取り消せません。')) {
		buildings = {};
		localStorage.removeItem('minecraft-calculator-data');
		updateBuildingSelects();
		updateBuildingsList();
		document.getElementById('results').innerHTML = '';
		showMessage('✓ すべてのデータを削除しました', 'success');
	}
}
// 言語を切り替え

// 材料のオートコンプリートリストを更新
function updateMaterialList() {
	const datalist = document.getElementById('materialList');
	datalist.innerHTML = '';

	// よく使われる材料のリスト
	const commonMaterials = [
		// 木材系
		'オークの板材',
		'オークの階段',
		'オークのハーフブロック',
		'オークの葉',
		'サクラの板材',
		'サクラの階段',
		'サクラのハーフブロック',
		'サクラの葉',
		'ペールオークの板材',
		'ペールオークの階段',
		'ペールオークのハーフブロック',
		'ペールオークの葉',
		'スプルースの板材',
		'スプルースの階段',
		'スプルースのハーフブロック',
		'スプルースの葉',
		'シラカバの板材',
		'シラカバの階段',
		'シラカバのハーフブロック',
		'シラカバの葉',
		'ジャングルの板材',
		'ジャングルの階段',
		'ジャングルのハーフブロック',
		'ジャングルの葉',
		'アカシアの板材',
		'アカシアの階段',
		'アカシアのハーフブロック',
		'アカシアの葉',
		'ダークオークの板材',
		'ダークオークの階段',
		'ダークオークのハーフブロック',
		'ダークオークの葉',
		'マングローブの板材',
		'マングローブの階段',
		'マングローブのハーフブロック',
		'マングローブの葉',
		'竹の板材',
		'竹の階段',
		'竹のハーフブロック',

		// 石材系
		'石',
		'丸石',
		'石レンガ',
		'花崗岩',
		'閃緑岩',
		'安山岩',
		'深層岩',
		'凝灰岩',
		'砂岩',
		'赤い砂岩',
		'ネザーレンガ',
		'エンドストーン',
		'プリズマリン',

		// その他
		'ガラス',
		'板ガラス',
		'鉄インゴット',
		'金インゴット',
		'銅インゴット',
		'松明',
		'ランタン',
		'グロウストーン',
		'レッドストーン',
		'羊毛',
	];

	commonMaterials.forEach((material) => {
		const option = document.createElement('option');
		option.value = material;
		datalist.appendChild(option);
	});
}
// 計算結果をクリップボードにコピー
function copyResults() {
	const resultsContainer = document.querySelector('.results-container');
	if (!resultsContainer) {
		showMessage('コピーする結果がありません', 'error');
		return;
	}

	// テキスト形式で結果を生成
	let copyText = '';
	const title = resultsContainer.querySelector('h2').textContent;
	copyText += `${title}\n`;
	copyText += '='.repeat(title.length) + '\n\n';

	const categories = resultsContainer.querySelectorAll('.category');
	categories.forEach((category) => {
		const categoryName = category.querySelector('h3').textContent;
		copyText += `【${categoryName}】\n`;

		const materials = category.querySelectorAll('.material-result');
		materials.forEach((material) => {
			const materialName = material.querySelector('.material-name').textContent;
			const quantity = material.querySelector('.material-quantity').textContent;
			const stackInfo = material.querySelector('.stack-info');
			const stackText = stackInfo ? ` ${stackInfo.textContent}` : '';

			copyText += `  • ${materialName} ${quantity}${stackText}\n`;

			// 入手方法も追加
			const sourceOptions = material.querySelector('.source-options');
			const sourceInfo = material.querySelector('.source-info');

			if (sourceOptions) {
				const options = sourceOptions.querySelectorAll('.source-option');
				options.forEach((option) => {
					const isRecommended = option.classList.contains('recommended');
					const prefix = isRecommended ? '    ⭐ ' : '    💡 ';
					copyText += `${prefix}${option.textContent.replace(' ⭐', '')}\n`;
				});
			} else if (sourceInfo) {
				copyText += `    💡 ${sourceInfo.textContent}\n`;
			}
		});
		copyText += '\n';
	});

	// 生成日時を追加
	const now = new Date();
	const dateStr = now.toLocaleString('ja-JP');
	copyText += `\n生成日時: ${dateStr}\n`;
	copyText += `出典: マイクラ材料計算機 (https://anju1023.github.io/Minecraft-materials-calculater/)`;

	// クリップボードにコピー
	navigator.clipboard
		.writeText(copyText)
		.then(() => {
			showMessage('✓ クリップボードにコピーしました！', 'success');
		})
		.catch((err) => {
			// フォールバック: テキストエリアを使用
			const textArea = document.createElement('textarea');
			textArea.value = copyText;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);

			showMessage('✓ クリップボードにコピーしました！', 'success');
		});
}
