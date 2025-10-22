// 多言語対応データ
const languages = {
	ja: {
		// ヘッダー
		title: '🏗️ マイクラ材料計算機',
		subtitle: '建築に必要な基礎素材を自動計算します',

		// セクションタイトル
		addBuilding: '🏠 建物を追加',
		addMaterials: '📦 材料を追加',
		buildingsList: '🏘️ 建物一覧',
		calculation: '🧮 必要素材計算',

		// フォーム
		buildingNamePlaceholder: '建物名を入力（例：拠点、倉庫）',
		materialNamePlaceholder: '材料名（例：{sample}）',
		quantityPlaceholder: '個数',
		selectBuilding: '建物を選択',
		selectBuildingCalc: '建物を選んで個別計算',

		// ボタン
		addBuildingBtn: '建物追加',
		addMaterialBtn: '材料追加',
		calculateAllBtn: '🏘️ すべての建物をまとめて計算',
		calculateBuildingBtn: '🏠 この建物だけ計算',
		deleteBuildingBtn: '🗑️ 建物削除',
		clearAllBtn: '🗑️ 全データクリア',

		// 結果
		totalMaterials: '🏘️ 合計必要素材',
		buildingMaterials: '🏠 {building}の必要素材',

		// カテゴリー
		categories: {
			'🌸 サクラ': '🌸 サクラ',
			'🌳 ペールオーク': '🌳 ペールオーク',
			'🌲 オーク': '🌲 オーク',
			'🌲 スプルース': '🌲 スプルース',
			'🌲 シラカバ': '🌲 シラカバ',
			'🌲 ジャングル': '🌲 ジャングル',
			'🌲 アカシア': '🌲 アカシア',
			'🌲 ダークオーク': '🌲 ダークオーク',
			'🌴 マングローブ': '🌴 マングローブ',
			'🎋 竹': '🎋 竹',
			'🪨 石材': '🪨 石材',
			'🪟 ガラス': '🪟 ガラス',
			'⚙️ 鉄・金属': '⚙️ 鉄・金属',
			'💡 燃料・光源': '💡 燃料・光源',
			'🪴 植物・自然': '🪴 植物・自然',
			'🎨 その他': '🎨 その他',
		},

		// メッセージ
		messages: {
			buildingNameRequired: '建物名を入力してください',
			buildingExists: '「{name}」は既に存在します',
			buildingAdded: '✓ 建物「{name}」を追加しました！',
			selectBuildingRequired: '建物を選択してください',
			materialNameRequired: '材料名を入力してください',
			quantityRequired: '正しい個数を入力してください',
			materialAdded: '✓ {building}に「{material} x{quantity}」を追加しました',
			materialDeleted: '「{material}」を削除しました',
			buildingDeleted: '「{building}」を削除しました',
			confirmDeleteBuilding: '「{building}」を削除しますか？',
			confirmClearAll:
				'すべてのデータを削除しますか？この操作は取り消せません。',
			allDataCleared: '✓ すべてのデータを削除しました',
			selectBuildingToCalculate: '計算する建物を選択してください',
			noMaterials: '材料が登録されていません',
			noMaterialsToCalculate: '計算する材料がありません',
			noMaterialsRegistered: '材料未登録',
			stacksInfo: '({stacks}スタック)',
			stacksWithRemaining: '({stacks}スタック + {remaining}個)',
			noStack: '(スタック不可)',

			// 入手方法
			mining: '採取',
			crafting: 'クラフト',
			miningFrom: '採取: {source}',
			craftingFrom: 'クラフト: {source}',

			// コピー機能
			copyToClipboard: 'クリップボードにコピー',
			copySuccess: '✓ クリップボードにコピーしました！',
			copyError: 'コピーする結果がありません',
			generatedAt: '生成日時',
			source: '出典',
		},
	},

	en: {
		// Header
		title: '🏗️ Minecraft Materials Calculator',
		subtitle: 'Automatically calculate basic materials needed for construction',

		// Section titles
		addBuilding: '🏠 Add Building',
		addMaterials: '📦 Add Materials',
		buildingsList: '🏘️ Buildings List',
		calculation: '🧮 Materials Calculation',

		// Forms
		buildingNamePlaceholder: 'Enter building name (e.g., Base, Storage)',
		materialNamePlaceholder: 'Material name (e.g., {sample})',
		quantityPlaceholder: 'Quantity',
		selectBuilding: 'Select Building',
		selectBuildingCalc: 'Select building for individual calculation',

		// Buttons
		addBuildingBtn: 'Add Building',
		addMaterialBtn: 'Add Material',
		calculateAllBtn: '🏘️ Calculate All Buildings',
		calculateBuildingBtn: '🏠 Calculate This Building Only',
		deleteBuildingBtn: '🗑️ Delete Building',
		clearAllBtn: '🗑️ Clear All Data',

		// Results
		totalMaterials: '🏘️ Total Required Materials',
		buildingMaterials: '🏠 Required Materials for {building}',

		// Categories
		categories: {
			'🌸 サクラ': '🌸 Cherry',
			'🌳 ペールオーク': '🌳 Pale Oak',
			'🌲 オーク': '🌲 Oak',
			'🌲 スプルース': '🌲 Spruce',
			'🌲 シラカバ': '🌲 Birch',
			'🌲 ジャングル': '🌲 Jungle',
			'🌲 アカシア': '🌲 Acacia',
			'🌲 ダークオーク': '🌲 Dark Oak',
			'🌴 マングローブ': '🌴 Mangrove',
			'🎋 竹': '🎋 Bamboo',
			'🪨 石材': '🪨 Stone',
			'🪟 ガラス': '🪟 Glass',
			'⚙️ 鉄・金属': '⚙️ Iron & Metal',
			'💡 燃料・光源': '💡 Fuel & Light',
			'🪴 植物・自然': '🪴 Plants & Nature',
			'🎨 その他': '🎨 Others',
		},

		// Messages
		messages: {
			buildingNameRequired: 'Please enter a building name',
			buildingExists: '"{name}" already exists',
			buildingAdded: '✓ Building "{name}" added!',
			selectBuildingRequired: 'Please select a building',
			materialNameRequired: 'Please enter a material name',
			quantityRequired: 'Please enter a valid quantity',
			materialAdded: '✓ Added "{material} x{quantity}" to {building}',
			materialDeleted: '"{material}" deleted',
			buildingDeleted: '"{building}" deleted',
			confirmDeleteBuilding: 'Delete "{building}"?',
			confirmClearAll: 'Delete all data? This action cannot be undone.',
			allDataCleared: '✓ All data cleared',
			selectBuildingToCalculate: 'Please select a building to calculate',
			noMaterials: 'No materials registered',
			noMaterialsToCalculate: 'No materials to calculate',
			noMaterialsRegistered: 'No materials registered',
			stacksInfo: '({stacks} stacks)',
			stacksWithRemaining: '({stacks} stacks + {remaining} items)',
			noStack: '(Cannot stack)',

			// 入手方法
			mining: 'Mine',
			crafting: 'Craft',
			miningFrom: 'Mine: {source}',
			craftingFrom: 'Craft: {source}',

			// コピー機能
			copyToClipboard: 'Copy to Clipboard',
			copySuccess: '✓ Copied to clipboard!',
			copyError: 'No results to copy',
			generatedAt: 'Generated',
			source: 'Source',
		},
	},
};

// 現在の言語（デフォルトは日本語）
let currentLanguage = 'ja';

// 言語を取得
function getText(key) {
	const keys = key.split('.');
	let value = languages[currentLanguage];

	for (const k of keys) {
		value = value[k];
		if (!value) break;
	}

	return value || key;
}

// プレースホルダー置換
function formatText(text, params) {
	let result = text;
	for (const [key, value] of Object.entries(params)) {
		result = result.replace(new RegExp(`{${key}}`, 'g'), value);
	}
	return result;
}
