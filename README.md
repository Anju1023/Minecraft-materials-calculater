# 🏗️ マイクラ材料計算機

Minecraft 1.21.10対応の建築材料計算Webアプリです。建築に必要な材料を入力すると、基礎素材まで自動分解して必要な材料を計算してくれます。

## ✨ 特徴

- **1.21.10完全対応**: 最新バージョンの全材料・レシピに対応
- **Apple風デザイン**: Human Interface Guidelinesに基づいた美しいUI
- **自動分解計算**: 複雑なレシピも基礎素材まで自動計算
- **スタック数表示**: アイテムごとのスタック数も表示
- **レスポンシブ対応**: PC・スマホ・タブレットで快適に使用可能
- **ダークモード対応**: システム設定に自動対応

## 🎮 使い方

1. **建物を追加**: 「拠点」「倉庫」など建物名を入力
2. **材料を追加**: 必要な材料と個数を入力（自動補完機能付き）
3. **計算実行**: 「すべての建物をまとめて計算」または個別計算
4. **結果確認**: カテゴリー別に整理された必要素材を確認

## 🌐 デモ

[GitHub Pages でデモを見る](https://Anju1023.github.io/minecraft-material-calculator/)

## 📱 対応材料

### 🌲 木材系（全9種類）
- オーク、スプルース、シラカバ、ジャングル、アカシア
- ダークオーク、マングローブ、サクラ、ペールオーク、竹

### 🪨 石材系
- 石、深層岩、凝灰岩、砂岩、プリズマリン
- エンドストーン、ネザーレンガ、ブラックストーンなど

### 🪟 ガラス系
- 通常ガラス + 全16色の色付きガラス・ガラス板

### ⚙️ 金属系
- 鉄、金、銅、ネザライト、鎖など

### 💡 光源系
- 松明、ランタン、グロウストーン、シーランタンなど

### 🛠️ ツール・武器
- 全素材の剣、ツルハシ、斧、シャベル、クワなど

## 🚀 技術仕様

- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript (ES2025)
- **デザインシステム**: Apple Human Interface Guidelines 2025準拠
- **レスポンシブ**: CSS Grid & Flexbox
- **アクセシビリティ**: WCAG 2.2準拠
- **ブラウザ対応**: Chrome 130+, Safari 18+, Firefox 131+, Edge 130+

## 📁 ファイル構成

```
minecraft-material-calculator/
├── index.html              # メインページ
├── style.css              # Apple風スタイル
├── script.js              # メイン機能
├── data/                  # データファイル
│   ├── stack-sizes.js     # スタック数データ
│   ├── recipes-wood.js    # 木材系レシピ
│   ├── recipes-stone.js   # 石材系レシピ
│   ├── recipes-other.js   # その他レシピ
│   └── recipes.js         # 統合レシピ
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # 自動デプロイ設定
├── .gitignore             # Git除外設定
├── LICENSE                # ライセンス
├── CONTRIBUTING.md        # 貢献ガイド
└── README.md             # このファイル
```

## 🔧 ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/Anju1023/minecraft-material-calculator.git
cd minecraft-material-calculator

# ローカルサーバーで起動
npx serve .
# または
python -m http.server 8000
# または
php -S localhost:8000

# ブラウザで開く
open http://localhost:8000
```

## 📝 更新履歴

### v1.0.0 (2025-10-21)
- 初回リリース
- Apple Human Interface Guidelines準拠のモダンUI
- Minecraft 1.21.10の全材料・レシピ対応
- ダークモード・レスポンシブデザイン対応
- 自動分解計算機能
- GitHub Pages対応

## 🤝 コントリビューション

バグ報告や機能要望は [Issues](https://github.com/Anju1023/minecraft-material-calculator/issues) でお願いします。

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 🙏 謝辞

- Minecraft は Mojang Studios の商標です
- Apple Human Interface Guidelines に基づいたデザイン
- 日本語対応とユーザビリティ向上

---

Made with ❤️ for Minecraft builders