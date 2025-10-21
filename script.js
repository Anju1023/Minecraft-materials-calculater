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

	// 言語設定を読み込み
	const savedLang = localStorage.getItem('minecraft-calculator-language');
	if (savedLang && languages[savedLang]) {
		currentLanguage = savedLang;
		updateLanguage();
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
		showMessage(getText('messages.buildingNameRequired'), 'error');
		return;
	}

	if (buildings[name]) {
		showMessage(
			formatText(getText('messages.buildingExists'), { name }),
			'error'
		);
		return;
	}

	buildings[name] = {};
	nameInput.value = '';

	updateBuildingSelects();
	updateBuildingsList();
	saveData(); // 自動保存
	showMessage(
		formatText(getText('messages.buildingAdded'), { name }),
		'success'
	);
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
		showMessage(getText('messages.selectBuildingRequired'), 'error');
		return;
	}

	if (!materialName) {
		showMessage(getText('messages.materialNameRequired'), 'error');
		return;
	}

	if (!quantity || quantity <= 0) {
		showMessage(getText('messages.quantityRequired'), 'error');
		return;
	}

	// 英語で入力された場合は日本語に変換して保存
	const japaneseName = getJapaneseMaterialName(materialName);
	buildings[buildingName][japaneseName] = quantity;

	materialInput.value = '';
	quantityInput.value = '';

	updateBuildingsList();
	saveData(); // 自動保存
	const displayName = translateMaterial(japaneseName);
	showMessage(
		formatText(getText('messages.materialAdded'), {
			building: buildingName,
			material: displayName,
			quantity,
		}),
		'success'
	);
}

// 材料を削除
function deleteMaterial(buildingName, materialName) {
	delete buildings[buildingName][materialName];
	updateBuildingsList();
	saveData(); // 自動保存
	showMessage(
		formatText(getText('messages.materialDeleted'), { material: materialName }),
		'success'
	);
}

// 建物を削除
function deleteBuilding(buildingName) {
	if (
		confirm(
			formatText(getText('messages.confirmDeleteBuilding'), {
				building: buildingName,
			})
		)
	) {
		delete buildings[buildingName];
		updateBuildingSelects();
		updateBuildingsList();
		saveData(); // 自動保存
		showMessage(
			formatText(getText('messages.buildingDeleted'), {
				building: buildingName,
			}),
			'success'
		);
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
				? `<option value="">${getText('selectBuilding')}</option>`
				: `<option value="">${getText('selectBuildingCalc')}</option>`;

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
		deleteBtn.textContent = getText('deleteBuildingBtn');
		deleteBtn.className = 'delete-btn building-delete';
		deleteBtn.onclick = () => deleteBuilding(buildingName);

		header.appendChild(title);
		header.appendChild(deleteBtn);
		card.appendChild(header);

		if (Object.keys(materials).length === 0) {
			const empty = document.createElement('p');
			empty.textContent = getText('messages.noMaterialsRegistered');
			empty.style.color = '#666';
			card.appendChild(empty);
		} else {
			Object.entries(materials).forEach(([materialName, quantity]) => {
				const item = document.createElement('div');
				item.className = 'material-item';

				const info = document.createElement('span');
				info.className = 'material-info';
				const displayName = translateMaterial(materialName);
				const unit = currentLanguage === 'en' ? 'items' : '個';
				info.textContent = `${displayName}: ${quantity}${unit}`;

				const delBtn = document.createElement('button');
				delBtn.textContent = '❌';
				delBtn.className = 'delete-btn material-delete';
				delBtn.title =
					currentLanguage === 'en' ? 'Delete material' : '材料を削除';
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

	displayResults(getText('totalMaterials'), baseMaterials);
}

// 個別建物の計算
function calculateBuilding() {
	const select = document.getElementById('calcBuildingSelect');
	const buildingName = select.value;

	if (!buildingName) {
		showMessage(getText('messages.selectBuildingToCalculate'), 'error');
		return;
	}

	const materials = buildings[buildingName];
	if (Object.keys(materials).length === 0) {
		showMessage(getText('messages.noMaterials'), 'error');
		return;
	}

	const baseMaterials = {};
	Object.entries(materials).forEach(([material, quantity]) => {
		decomposeMaterial(material, quantity, baseMaterials);
	});

	displayResults(
		formatText(getText('buildingMaterials'), { building: buildingName }),
		baseMaterials
	);
}

// 結果を表示
function displayResults(title, baseMaterials) {
	const container = document.getElementById('results');

	if (Object.keys(baseMaterials).length === 0) {
		container.innerHTML = `<p>${getText(
			'messages.noMaterialsToCalculate'
		)}</p>`;
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

		const translatedCategoryName =
			getText(`categories.${categoryName}`) || categoryName;
		html += `<div class="category">
            <h3>${translatedCategoryName}</h3>`;

		items.forEach(([material, quantity]) => {
			const stackSize = getStackSize(material);
			const stacks = Math.floor(quantity / stackSize);
			const remaining = quantity % stackSize;

			let stackInfo = '';
			if (stackSize === 1) {
				stackInfo = `<span class="stack-info">${getText(
					'messages.noStack'
				)}</span>`;
			} else if (stacks > 0) {
				stackInfo =
					remaining > 0
						? `<span class="stack-info">${formatText(
								getText('messages.stacksWithRemaining'),
								{ stacks, remaining }
						  )}</span>`
						: `<span class="stack-info">${formatText(
								getText('messages.stacksInfo'),
								{ stacks }
						  )}</span>`;
			}

			const displayName = translateMaterial(material);
			const unit = currentLanguage === 'en' ? ' items' : '個';
			html += `<div class="material-result">
                <span class="material-name">${displayName}</span>
                <span>
                    <span class="material-quantity">× ${quantity}${unit}</span>
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
	loadData();
	updateMaterialList();
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
// ページ読み込み時にデータを復元（統合済み）
// 全データをクリア
function clearAllData() {
	if (confirm(getText('messages.confirmClearAll'))) {
		buildings = {};
		localStorage.removeItem('minecraft-calculator-data');
		updateBuildingSelects();
		updateBuildingsList();
		document.getElementById('results').innerHTML = '';
		showMessage(getText('messages.allDataCleared'), 'success');
	}
}
// 言語を切り替え
function switchLanguage(lang) {
	if (languages[lang]) {
		currentLanguage = lang;
		localStorage.setItem('minecraft-calculator-language', lang);
		updateLanguage();
		updateBuildingSelects(); // セレクトボックスも更新
	}
}

// 言語表示を更新
function updateLanguage() {
	// data-text属性を持つ要素を更新
	document.querySelectorAll('[data-text]').forEach((element) => {
		const key = element.getAttribute('data-text');
		element.textContent = getText(key);
	});

	// data-placeholder属性を持つ要素を更新
	document.querySelectorAll('[data-placeholder]').forEach((element) => {
		const key = element.getAttribute('data-placeholder');
		let placeholderText = getText(key);

		// 材料名のプレースホルダーの場合、サンプル材料を動的に設定
		if (key === 'materialNamePlaceholder') {
			const sampleMaterial =
				currentLanguage === 'en' ? 'Oak Planks' : 'オークの板材';
			placeholderText = formatText(placeholderText, { sample: sampleMaterial });
		}

		element.placeholder = placeholderText;
	});

	// 言語ボタンのアクティブ状態を更新
	document.querySelectorAll('.lang-btn').forEach((btn) => {
		btn.classList.remove('active');
	});
	document
		.getElementById(
			`lang${
				currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)
			}`
		)
		.classList.add('active');

	// HTML言語属性を更新
	document.getElementById('html-root').setAttribute('lang', currentLanguage);

	// Dublin Core言語メタデータを更新
	const dcLanguageMeta = document.querySelector('meta[name="DC.language"]');
	if (dcLanguageMeta) {
		dcLanguageMeta.setAttribute('content', currentLanguage);
	}

	// 建物一覧とセレクトボックスを更新
	updateBuildingsList();
	updateMaterialList();
}
// 材料のオートコンプリートリストを更新
function updateMaterialList() {
	const datalist = document.getElementById('materialList');
	datalist.innerHTML = '';

	// 全材料をオートコンプリートに追加
	Object.keys(materialTranslations).forEach((japaneseName) => {
		const option = document.createElement('option');
		option.value = translateMaterial(japaneseName);
		datalist.appendChild(option);
	});
}
