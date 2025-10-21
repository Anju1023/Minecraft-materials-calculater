# コントリビューションガイド

マイクラ材料計算機への貢献をありがとうございます！🎉

## 🐛 バグ報告

バグを見つけた場合は、以下の情報を含めてIssueを作成してください：

- **ブラウザ**: Chrome 130, Safari 18など
- **OS**: Windows 11, macOS Sequoia, iOS 26など
- **再現手順**: 具体的な操作手順
- **期待する動作**: 本来どうなるべきか
- **実際の動作**: 実際に何が起こったか
- **スクリーンショット**: 可能であれば

## ✨ 機能要望

新機能のアイデアがある場合：

- **機能の説明**: どんな機能か
- **使用場面**: いつ使うか
- **メリット**: なぜ必要か
- **参考**: 他のアプリでの類似機能など

## 🔧 開発に参加

### 環境構築

```bash
# リポジトリをフォーク後、クローン
git clone https://github.com/Anju1023/minecraft-material-calculator.git
cd minecraft-material-calculator

# ローカルサーバーで起動
npx serve .
# または
python -m http.server 8000
# または Live Server拡張機能を使用
```

### コーディング規約

**HTML**
- セマンティックなタグを使用
- アクセシビリティを考慮
- 日本語コメント推奨

**CSS**
- Apple Human Interface Guidelines 2025準拠
- CSS変数・Container Queriesを活用
- レスポンシブデザイン必須
- ダークモード・高コントラストモード対応

**JavaScript**
- ES2025の機能を活用
- 関数は日本語コメント付き
- エラーハンドリング必須
- パフォーマンス・アクセシビリティを考慮

### プルリクエスト

1. **ブランチ作成**
   ```bash
   git checkout -b feature/新機能名
   # または
   git checkout -b fix/バグ修正名
   ```

2. **コミット**
   ```bash
   git commit -m "feat: 新機能の説明"
   # または
   git commit -m "fix: バグ修正の説明"
   ```

3. **プッシュ & PR作成**
   - 変更内容の説明
   - テスト結果
   - スクリーンショット（UI変更の場合）

## 📝 レシピデータの追加・修正

新しいアイテムやレシピを追加する場合：

### 1. スタック数の追加
`data/stack-sizes.js`に追加：
```javascript
'新アイテム名': 16, // 16個スタック
```

### 2. レシピの追加
適切なファイルに追加：
- 木材系: `data/recipes-wood.js`
- 石材系: `data/recipes-stone.js`
- その他: `data/recipes-other.js`

```javascript
'完成品名': {
    '材料1': 個数,
    '材料2': 個数,
    'yield': 完成個数
}
```

### 3. 自動補完の更新
`script.js`の`commonMaterials`配列に基礎素材を追加

## 🎨 デザインガイドライン

### カラーパレット
- プライマリ: `#007AFF` (Apple Blue)
- 成功: `#34C759` (Apple Green)
- エラー: `#FF3B30` (Apple Red)
- 背景: `#F2F2F7` (Apple Gray 6)

### タイポグラフィ
- システムフォント: `-apple-system, BlinkMacSystemFont`
- 見出し: 600-700 weight
- 本文: 400-500 weight

### スペーシング
- 基本単位: 4px, 8px, 16px, 24px, 32px, 48px
- 一貫したスペーシングを維持

## 🧪 テスト

プルリクエスト前に以下をテスト：

- [ ] 基本機能（建物追加、材料追加、計算）
- [ ] レスポンシブデザイン（モバイル、タブレット）
- [ ] ダークモード
- [ ] 各種ブラウザ（Chrome 130+, Safari 18+, Firefox 131+, Edge 130+）
- [ ] アクセシビリティ（キーボード操作、スクリーンリーダー）

## 📚 参考資料

- [Apple Human Interface Guidelines 2025](https://developer.apple.com/design/human-interface-guidelines/)
- [Minecraft Wiki](https://minecraft.wiki/)
- [Web Content Accessibility Guidelines 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 💬 質問・相談

不明な点があれば、遠慮なくIssueで質問してください！

---

みんなでより良いマイクラ材料計算機を作りましょう！🏗️✨