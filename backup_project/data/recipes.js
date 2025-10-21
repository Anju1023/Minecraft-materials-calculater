// マイクラ 1.21.10 全レシピデータベース - メインファイル

// 各カテゴリーのレシピをインポート
// ブラウザ環境では直接読み込み、Node.js環境では require を使用

let RECIPES = {};

// ブラウザ環境での読み込み
if (typeof window !== 'undefined') {
	// HTMLで各ファイルを読み込んだ後に、グローバル変数から取得
	if (typeof WOOD_RECIPES !== 'undefined') {
		Object.assign(RECIPES, WOOD_RECIPES);
	}
	if (typeof STONE_RECIPES !== 'undefined') {
		Object.assign(RECIPES, STONE_RECIPES);
	}
	if (typeof OTHER_RECIPES !== 'undefined') {
		Object.assign(RECIPES, OTHER_RECIPES);
	}
} else {
	// Node.js環境での読み込み
	try {
		const { WOOD_RECIPES } = require('./recipes-wood.js');
		const { STONE_RECIPES } = require('./recipes-stone.js');
		const { OTHER_RECIPES } = require('./recipes-other.js');

		Object.assign(RECIPES, WOOD_RECIPES, STONE_RECIPES, OTHER_RECIPES);
	} catch (error) {
		console.warn('レシピファイルの読み込みに失敗しました:', error.message);
	}
}

// 基本的なレシピ（フォールバック用）
if (Object.keys(RECIPES).length === 0) {
	RECIPES = {
		// 基本的なレシピのみ
		オークの板材: { オークの原木: 1, yield: 4 },
		オークの棒: { オークの板材: 2, yield: 4 },
		サクラの板材: { サクラの原木: 1, yield: 4 },
		サクラの階段: { サクラの板材: 6, yield: 4 },
		サクラのハーフブロック: { サクラの板材: 3, yield: 6 },
		サクラのトラップドア: { サクラの板材: 6, yield: 2 },
		サクラのフェンス: { サクラの板材: 4, サクラの棒: 2, yield: 3 },
		サクラのフェンスゲート: { サクラの板材: 2, サクラの棒: 4, yield: 1 },
		サクラのドア: { サクラの板材: 6, yield: 3 },
		樹皮を剥いだサクラの原木: { サクラの原木: 1, yield: 1 },
		ペールオークの板材: { ペールオークの原木: 1, yield: 4 },
		ペールオークの階段: { ペールオークの板材: 6, yield: 4 },
		ペールオークのボタン: { ペールオークの板材: 1, yield: 1 },
		磨かれた閃緑岩: { 閃緑岩: 4, yield: 4 },
		磨かれた閃緑岩の階段: { 磨かれた閃緑岩: 6, yield: 4 },
		磨かれた閃緑岩のハーフブロック: { 磨かれた閃緑岩: 3, yield: 6 },
		閃緑岩の塀: { 閃緑岩: 6, yield: 6 },
		ガラス: { 砂: 1, yield: 1 },
		ガラス板: { ガラス: 6, yield: 16 },
		鉄塊: { 鉄インゴット: 1, yield: 9 },
		ランタン: { 松明: 1, 鉄塊: 8, yield: 1 },
		松明: { 石炭: 1, 棒: 1, yield: 4 },
	};
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { RECIPES };
}
