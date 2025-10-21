// マイクラ材料計算機のJavaScript

// プロジェクトデータ
let buildings = {};

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
	showMessage(
		`✓ ${buildingName}に「${materialName} x${quantity}」を追加しました`,
		'success'
	);
}

// 材料を削除
function deleteMaterial(buildingName, materialName) {
	delete buildings[buildingName][materialName];
	updateBuildingsList();
	showMessage(`「${materialName}」を削除しました`, 'success');
}

// 建物を削除
function deleteBuilding(buildingName) {
	if (confirm(`「${buildingName}」を削除しますか？`)) {
		delete buildings[buildingName];
		updateBuildingSelects();
		updateBuildingsList();
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
				: '<option value="">個別計算する建物を選択</option>';

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

	displayResults(`${buildingName} の必要素材`, baseMaterials);
}

// 結果を表示
function displayResults(title, baseMaterials) {
	const container = document.getElementById('results');

	if (Object.keys(baseMaterials).length === 0) {
		container.innerHTML = '<p>計算する材料がありません</p>';
		return;
	}

	// カテゴリー分類
	const categories = {
		'🌸 サクラ': [],
		'🌳 ペールオーク': [],
		'🌲 オーク': [],
		'🌲 スプルース': [],
		'🌲 シラカバ': [],
		'🌲 ジャングル': [],
		'🌲 アカシア': [],
		'🌲 ダークオーク': [],
		'🌴 マングローブ': [],
		'🎋 竹': [],
		'🪨 石材': [],
		'🪟 ガラス': [],
		'⚙️ 鉄・金属': [],
		'💡 燃料・光源': [],
		'🪴 植物・自然': [],
		'🎨 その他': [],
	};

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

			html += `<div class="material-result">
                <span class="material-name">${material}</span>
                <span>
                    <span class="material-quantity">× ${quantity}個</span>
                    ${stackInfo}
                </span>
            </div>`;
		});

		html += '</div>';
	});

	html += '</div>';
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

// 材料名の自動補完リストを作成
function setupMaterialAutocomplete() {
	const datalist = document.getElementById('materialList');
	const allMaterials = new Set();

	// レシピから材料名を収集
	Object.keys(RECIPES).forEach((material) => {
		allMaterials.add(material);
		Object.keys(RECIPES[material]).forEach((ingredient) => {
			if (ingredient !== 'yield') {
				allMaterials.add(ingredient);
			}
		});
	});

	// よく使われる基礎素材も追加
	const commonMaterials = [
		'オークの原木',
		'スプルースの原木',
		'シラカバの原木',
		'ジャングルの原木',
		'アカシアの原木',
		'ダークオークの原木',
		'サクラの原木',
		'ペールオークの原木',
		'マングローブの原木',
		'石',
		'丸石',
		'花崗岩',
		'閃緑岩',
		'安山岩',
		'深層岩',
		'凝灰岩',
		'砂',
		'ガラス',
		'鉄インゴット',
		'金インゴット',
		'銅インゴット',
		'ダイヤモンド',
		'ネザライトインゴット',
		'石炭',
		'草ブロック',
		'スイートベリー',
		'飾り壺',
		'サクラの葉',
		'オークの葉',
		'ツタ',
		'レッドストーンダスト',
		'エンダーパール',
	];

	commonMaterials.forEach((material) => allMaterials.add(material));

	// datalistに追加
	Array.from(allMaterials)
		.sort()
		.forEach((material) => {
			const option = document.createElement('option');
			option.value = material;
			datalist.appendChild(option);
		});
}

// 初期化
document.addEventListener('DOMContentLoaded', function () {
	setupMaterialAutocomplete();

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
