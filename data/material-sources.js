// 材料の入手方法データ
const materialSources = {
	// === 採取 vs クラフト選択可能な材料 ===

	// 石材系
	石: {
		mining: {
			name: '石',
			quantity: 1,
			tool: 'シルクタッチのツルハシ',
			location: '地下',
		},
		crafting: { name: '丸石', quantity: 1, method: 'かまどで精錬' },
	},
	石レンガ: {
		mining: null, // 採取不可
		crafting: { name: '石', quantity: 4, method: '作業台でクラフト' },
	},
	花崗岩: {
		mining: {
			name: '花崗岩',
			quantity: 1,
			tool: 'ツルハシ',
			location: '地下（高度0-79）',
		},
		crafting: {
			name: '丸石 + ネザークォーツ',
			quantity: '1 + 1',
			method: '作業台でクラフト',
		},
	},
	閃緑岩: {
		mining: {
			name: '閃緑岩',
			quantity: 1,
			tool: 'ツルハシ',
			location: '地下（高度0-79）',
		},
		crafting: {
			name: '丸石 + ネザークォーツ',
			quantity: '2 + 2',
			method: '作業台でクラフト',
		},
	},
	安山岩: {
		mining: {
			name: '安山岩',
			quantity: 1,
			tool: 'ツルハシ',
			location: '地下（高度0-79）',
		},
		crafting: {
			name: '閃緑岩 + 丸石',
			quantity: '1 + 1',
			method: '作業台でクラフト',
		},
	},
	深層岩: {
		mining: {
			name: '深層岩',
			quantity: 1,
			tool: 'シルクタッチのツルハシ',
			location: '深層（高度0以下）',
		},
		crafting: null, // クラフト不可
	},
	丸石状深層岩: {
		mining: {
			name: '丸石状深層岩',
			quantity: 1,
			tool: 'ツルハシ',
			location: '深層（高度0以下）',
		},
		crafting: null,
	},

	// 砂岩系
	砂岩: {
		mining: {
			name: '砂岩',
			quantity: 1,
			tool: 'ツルハシ',
			location: '砂漠・海岸',
		},
		crafting: { name: '砂', quantity: 4, method: '作業台でクラフト' },
	},
	赤い砂岩: {
		mining: {
			name: '赤い砂岩',
			quantity: 1,
			tool: 'ツルハシ',
			location: 'メサバイオーム',
		},
		crafting: { name: '赤い砂', quantity: 4, method: '作業台でクラフト' },
	},

	// ガラス系
	ガラス: {
		mining: {
			name: 'ガラス',
			quantity: 1,
			tool: 'シルクタッチのツール',
			location: '既存の建物',
		},
		crafting: { name: '砂', quantity: 1, method: 'かまどで精錬' },
	},

	// 木材系（原木 → 板材）
	オークの板材: {
		mining: null,
		crafting: {
			name: 'オークの原木',
			quantity: 1,
			method: '作業台でクラフト（4個入手）',
		},
	},
	サクラの板材: {
		mining: null,
		crafting: {
			name: 'サクラの原木',
			quantity: 1,
			method: '作業台でクラフト（4個入手）',
		},
	},
	スプルースの板材: {
		mining: null,
		crafting: {
			name: 'スプルースの原木',
			quantity: 1,
			method: '作業台でクラフト（4個入手）',
		},
	},

	// 原木系
	オークの原木: {
		mining: {
			name: 'オークの原木',
			quantity: 1,
			tool: '斧',
			location: 'オークの森・平原',
		},
		crafting: null,
	},
	サクラの原木: {
		mining: {
			name: 'サクラの原木',
			quantity: 1,
			tool: '斧',
			location: 'サクラの森',
		},
		crafting: null,
	},
	スプルースの原木: {
		mining: {
			name: 'スプルースの原木',
			quantity: 1,
			tool: '斧',
			location: 'タイガバイオーム',
		},
		crafting: null,
	},

	// 金属系
	鉄インゴット: {
		mining: null,
		crafting: { name: '鉄鉱石', quantity: 1, method: 'かまどで精錬' },
	},
	金インゴット: {
		mining: null,
		crafting: { name: '金鉱石', quantity: 1, method: 'かまどで精錬' },
	},
	銅インゴット: {
		mining: null,
		crafting: { name: '銅鉱石', quantity: 1, method: 'かまどで精錬' },
	},

	// レッドストーン系
	レッドストーン: {
		mining: {
			name: 'レッドストーン',
			quantity: '4-5',
			tool: '鉄以上のツルハシ',
			location: '地下（高度15以下）',
		},
		crafting: {
			name: 'レッドストーンブロック',
			quantity: 1,
			method: '作業台で分解（9個入手）',
		},
	},
};

// 材料の入手方法を取得
function getMaterialSource(materialName) {
	return materialSources[materialName] || null;
}

// 採取可能かチェック
function canMine(materialName) {
	const source = getMaterialSource(materialName);
	return source && source.mining !== null;
}

// クラフト可能かチェック
function canCraft(materialName) {
	const source = getMaterialSource(materialName);
	return source && source.crafting !== null;
}
