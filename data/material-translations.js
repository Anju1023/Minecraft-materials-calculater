// 材料名の翻訳データ
const materialTranslations = {
	// === 木材系 ===
	// サクラ
	サクラの原木: 'Cherry Log',
	サクラの木材: 'Cherry Planks',
	サクラの階段: 'Cherry Stairs',
	サクラのハーフブロック: 'Cherry Slab',
	サクラのフェンス: 'Cherry Fence',
	サクラのフェンスゲート: 'Cherry Fence Gate',
	サクラのドア: 'Cherry Door',
	サクラのトラップドア: 'Cherry Trapdoor',
	サクラの感圧板: 'Cherry Pressure Plate',
	サクラのボタン: 'Cherry Button',
	サクラの看板: 'Cherry Sign',
	サクラの吊り看板: 'Cherry Hanging Sign',

	// ペールオーク
	ペールオークの原木: 'Pale Oak Log',
	ペールオークの木材: 'Pale Oak Planks',
	ペールオークの階段: 'Pale Oak Stairs',
	ペールオークのハーフブロック: 'Pale Oak Slab',
	ペールオークのフェンス: 'Pale Oak Fence',
	ペールオークのフェンスゲート: 'Pale Oak Fence Gate',
	ペールオークのドア: 'Pale Oak Door',
	ペールオークのトラップドア: 'Pale Oak Trapdoor',
	ペールオークの感圧板: 'Pale Oak Pressure Plate',
	ペールオークのボタン: 'Pale Oak Button',
	ペールオークの看板: 'Pale Oak Sign',
	ペールオークの吊り看板: 'Pale Oak Hanging Sign',

	// オーク
	オークの原木: 'Oak Log',
	オークの木材: 'Oak Planks',
	オークの階段: 'Oak Stairs',
	オークのハーフブロック: 'Oak Slab',
	オークのフェンス: 'Oak Fence',
	オークのフェンスゲート: 'Oak Fence Gate',
	オークのドア: 'Oak Door',
	オークのトラップドア: 'Oak Trapdoor',
	オークの感圧板: 'Oak Pressure Plate',
	オークのボタン: 'Oak Button',
	オークの看板: 'Oak Sign',
	オークの吊り看板: 'Oak Hanging Sign',

	// スプルース
	スプルースの原木: 'Spruce Log',
	スプルースの木材: 'Spruce Planks',
	スプルースの階段: 'Spruce Stairs',
	スプルースのハーフブロック: 'Spruce Slab',
	スプルースのフェンス: 'Spruce Fence',
	スプルースのフェンスゲート: 'Spruce Fence Gate',
	スプルースのドア: 'Spruce Door',
	スプルースのトラップドア: 'Spruce Trapdoor',
	スプルースの感圧板: 'Spruce Pressure Plate',
	スプルースのボタン: 'Spruce Button',
	スプルースの看板: 'Spruce Sign',
	スプルースの吊り看板: 'Spruce Hanging Sign',

	// シラカバ
	シラカバの原木: 'Birch Log',
	シラカバの木材: 'Birch Planks',
	シラカバの階段: 'Birch Stairs',
	シラカバのハーフブロック: 'Birch Slab',
	シラカバのフェンス: 'Birch Fence',
	シラカバのフェンスゲート: 'Birch Fence Gate',
	シラカバのドア: 'Birch Door',
	シラカバのトラップドア: 'Birch Trapdoor',
	シラカバの感圧板: 'Birch Pressure Plate',
	シラカバのボタン: 'Birch Button',
	シラカバの看板: 'Birch Sign',
	シラカバの吊り看板: 'Birch Hanging Sign',

	// ジャングル
	ジャングルの原木: 'Jungle Log',
	ジャングルの木材: 'Jungle Planks',
	ジャングルの階段: 'Jungle Stairs',
	ジャングルのハーフブロック: 'Jungle Slab',
	ジャングルのフェンス: 'Jungle Fence',
	ジャングルのフェンスゲート: 'Jungle Fence Gate',
	ジャングルのドア: 'Jungle Door',
	ジャングルのトラップドア: 'Jungle Trapdoor',
	ジャングルの感圧板: 'Jungle Pressure Plate',
	ジャングルのボタン: 'Jungle Button',
	ジャングルの看板: 'Jungle Sign',
	ジャングルの吊り看板: 'Jungle Hanging Sign',

	// アカシア
	アカシアの原木: 'Acacia Log',
	アカシアの木材: 'Acacia Planks',
	アカシアの階段: 'Acacia Stairs',
	アカシアのハーフブロック: 'Acacia Slab',
	アカシアのフェンス: 'Acacia Fence',
	アカシアのフェンスゲート: 'Acacia Fence Gate',
	アカシアのドア: 'Acacia Door',
	アカシアのトラップドア: 'Acacia Trapdoor',
	アカシアの感圧板: 'Acacia Pressure Plate',
	アカシアのボタン: 'Acacia Button',
	アカシアの看板: 'Acacia Sign',
	アカシアの吊り看板: 'Acacia Hanging Sign',

	// ダークオーク
	ダークオークの原木: 'Dark Oak Log',
	ダークオークの木材: 'Dark Oak Planks',
	ダークオークの階段: 'Dark Oak Stairs',
	ダークオークのハーフブロック: 'Dark Oak Slab',
	ダークオークのフェンス: 'Dark Oak Fence',
	ダークオークのフェンスゲート: 'Dark Oak Fence Gate',
	ダークオークのドア: 'Dark Oak Door',
	ダークオークのトラップドア: 'Dark Oak Trapdoor',
	ダークオークの感圧板: 'Dark Oak Pressure Plate',
	ダークオークのボタン: 'Dark Oak Button',
	ダークオークの看板: 'Dark Oak Sign',
	ダークオークの吊り看板: 'Dark Oak Hanging Sign',

	// マングローブ
	マングローブの原木: 'Mangrove Log',
	マングローブの木材: 'Mangrove Planks',
	マングローブの階段: 'Mangrove Stairs',
	マングローブのハーフブロック: 'Mangrove Slab',
	マングローブのフェンス: 'Mangrove Fence',
	マングローブのフェンスゲート: 'Mangrove Fence Gate',
	マングローブのドア: 'Mangrove Door',
	マングローブのトラップドア: 'Mangrove Trapdoor',
	マングローブの感圧板: 'Mangrove Pressure Plate',
	マングローブのボタン: 'Mangrove Button',
	マングローブの看板: 'Mangrove Sign',
	マングローブの吊り看板: 'Mangrove Hanging Sign',

	// 竹
	竹: 'Bamboo',
	竹の木材: 'Bamboo Planks',
	竹の階段: 'Bamboo Stairs',
	竹のハーフブロック: 'Bamboo Slab',
	竹のフェンス: 'Bamboo Fence',
	竹のフェンスゲート: 'Bamboo Fence Gate',
	竹のドア: 'Bamboo Door',
	竹のトラップドア: 'Bamboo Trapdoor',
	竹の感圧板: 'Bamboo Pressure Plate',
	竹のボタン: 'Bamboo Button',
	竹の看板: 'Bamboo Sign',
	竹の吊り看板: 'Bamboo Hanging Sign',

	// === 石材系 ===
	石: 'Stone',
	丸石: 'Cobblestone',
	石の階段: 'Stone Stairs',
	石のハーフブロック: 'Stone Slab',
	丸石の階段: 'Cobblestone Stairs',
	丸石のハーフブロック: 'Cobblestone Slab',
	石レンガ: 'Stone Bricks',
	石レンガの階段: 'Stone Brick Stairs',
	石レンガのハーフブロック: 'Stone Brick Slab',
	石レンガの塀: 'Stone Brick Wall',

	// 花崗岩
	花崗岩: 'Granite',
	磨かれた花崗岩: 'Polished Granite',
	花崗岩の階段: 'Granite Stairs',
	花崗岩のハーフブロック: 'Granite Slab',
	磨かれた花崗岩の階段: 'Polished Granite Stairs',
	磨かれた花崗岩のハーフブロック: 'Polished Granite Slab',

	// 閃緑岩
	閃緑岩: 'Diorite',
	磨かれた閃緑岩: 'Polished Diorite',
	閃緑岩の階段: 'Diorite Stairs',
	閃緑岩のハーフブロック: 'Diorite Slab',
	磨かれた閃緑岩の階段: 'Polished Diorite Stairs',
	磨かれた閃緑岩のハーフブロック: 'Polished Diorite Slab',

	// 安山岩
	安山岩: 'Andesite',
	磨かれた安山岩: 'Polished Andesite',
	安山岩の階段: 'Andesite Stairs',
	安山岩のハーフブロック: 'Andesite Slab',
	磨かれた安山岩の階段: 'Polished Andesite Stairs',
	磨かれた安山岩のハーフブロック: 'Polished Andesite Slab',

	// 深層岩
	深層岩: 'Deepslate',
	丸石状深層岩: 'Cobbled Deepslate',
	磨かれた深層岩: 'Polished Deepslate',
	深層岩レンガ: 'Deepslate Bricks',
	深層岩タイル: 'Deepslate Tiles',
	深層岩の階段: 'Deepslate Stairs',
	深層岩のハーフブロック: 'Deepslate Slab',
	丸石状深層岩の階段: 'Cobbled Deepslate Stairs',
	丸石状深層岩のハーフブロック: 'Cobbled Deepslate Slab',
	磨かれた深層岩の階段: 'Polished Deepslate Stairs',
	磨かれた深層岩のハーフブロック: 'Polished Deepslate Slab',
	深層岩レンガの階段: 'Deepslate Brick Stairs',
	深層岩レンガのハーフブロック: 'Deepslate Brick Slab',
	深層岩タイルの階段: 'Deepslate Tile Stairs',
	深層岩タイルのハーフブロック: 'Deepslate Tile Slab',

	// 凝灰岩
	凝灰岩: 'Tuff',
	磨かれた凝灰岩: 'Polished Tuff',
	凝灰岩レンガ: 'Tuff Bricks',
	凝灰岩の階段: 'Tuff Stairs',
	凝灰岩のハーフブロック: 'Tuff Slab',
	磨かれた凝灰岩の階段: 'Polished Tuff Stairs',
	磨かれた凝灰岩のハーフブロック: 'Polished Tuff Slab',
	凝灰岩レンガの階段: 'Tuff Brick Stairs',
	凝灰岩レンガのハーフブロック: 'Tuff Brick Slab',

	// 砂岩
	砂岩: 'Sandstone',
	滑らかな砂岩: 'Smooth Sandstone',
	模様入り砂岩: 'Chiseled Sandstone',
	砂岩の階段: 'Sandstone Stairs',
	砂岩のハーフブロック: 'Sandstone Slab',
	滑らかな砂岩の階段: 'Smooth Sandstone Stairs',
	滑らかな砂岩のハーフブロック: 'Smooth Sandstone Slab',
	赤い砂岩: 'Red Sandstone',
	滑らかな赤い砂岩: 'Smooth Red Sandstone',
	模様入り赤い砂岩: 'Chiseled Red Sandstone',
	赤い砂岩の階段: 'Red Sandstone Stairs',
	赤い砂岩のハーフブロック: 'Red Sandstone Slab',
	滑らかな赤い砂岩の階段: 'Smooth Red Sandstone Stairs',
	滑らかな赤い砂岩のハーフブロック: 'Smooth Red Sandstone Slab',

	// === ガラス系 ===
	ガラス: 'Glass',
	板ガラス: 'Glass Pane',
	色付きガラス: 'Stained Glass',
	色付き板ガラス: 'Stained Glass Pane',
	砂: 'Sand',
	赤い砂: 'Red Sand',

	// === 金属系 ===
	鉄インゴット: 'Iron Ingot',
	鉄の扉: 'Iron Door',
	鉄のトラップドア: 'Iron Trapdoor',
	鉄格子: 'Iron Bars',
	金インゴット: 'Gold Ingot',
	金の感圧板: 'Gold Pressure Plate',
	銅インゴット: 'Copper Ingot',
	銅ブロック: 'Copper Block',
	切り込み入り銅: 'Cut Copper',
	銅の階段: 'Copper Stairs',
	銅のハーフブロック: 'Copper Slab',
	切り込み入り銅の階段: 'Cut Copper Stairs',
	切り込み入り銅のハーフブロック: 'Cut Copper Slab',

	// === 燃料・光源系 ===
	石炭: 'Coal',
	木炭: 'Charcoal',
	松明: 'Torch',
	魂の松明: 'Soul Torch',
	ランタン: 'Lantern',
	魂のランタン: 'Soul Lantern',
	グロウストーン: 'Glowstone',
	シーランタン: 'Sea Lantern',
	レッドストーンランプ: 'Redstone Lamp',

	// === 植物・自然系 ===
	草ブロック: 'Grass Block',
	土: 'Dirt',
	粗い土: 'Coarse Dirt',
	ポドゾル: 'Podzol',
	菌糸: 'Mycelium',
	葉: 'Leaves',
	苗木: 'Sapling',
	花: 'Flower',
	草: 'Grass',
	シダ: 'Fern',
	海草: 'Seagrass',
	昆布: 'Kelp',
	サボテン: 'Cactus',
	サトウキビ: 'Sugar Cane',
	カボチャ: 'Pumpkin',
	スイカ: 'Melon',

	// === その他 ===
	羊毛: 'Wool',
	カーペット: 'Carpet',
	ベッド: 'Bed',
	額縁: 'Item Frame',
	絵画: 'Painting',
	本棚: 'Bookshelf',
	チェスト: 'Chest',
	樽: 'Barrel',
	かまど: 'Furnace',
	作業台: 'Crafting Table',
	エンチャントテーブル: 'Enchanting Table',
	醸造台: 'Brewing Stand',
	金床: 'Anvil',
	ビーコン: 'Beacon',
	コンジット: 'Conduit',
};

// 材料名を翻訳する関数
function translateMaterial(materialName) {
	if (currentLanguage === 'en' && materialTranslations[materialName]) {
		return materialTranslations[materialName];
	}
	return materialName;
}

// 翻訳された材料名から日本語名を取得する関数
function getJapaneseMaterialName(translatedName) {
	if (currentLanguage === 'en') {
		for (const [japanese, english] of Object.entries(materialTranslations)) {
			if (english === translatedName) {
				return japanese;
			}
		}
	}
	return translatedName;
}
