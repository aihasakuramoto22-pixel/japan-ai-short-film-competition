# 🔧 Cloudflare Pages ビルドエラー修正ガイド

## ❌ エラー内容

```
Error: Output directory "directory: dist" not found.
Failed: build output directory not found
```

---

## 🎯 原因

**Build output directory** の設定が間違っています。

❌ **間違った設定:**
```
Build output directory: directory: dist
```

✅ **正しい設定:**
```
Build output directory: dist
```

---

## 🛠️ 修正手順 (3分)

### 方法1: 設定を修正する (推奨)

#### ステップ1: Cloudflare Pagesにアクセス

1. https://dash.cloudflare.com/ を開く
2. ログイン
3. 左メニューから **「Workers & Pages」** をクリック
4. プロジェクト **`jaisfc`** をクリック

#### ステップ2: 設定画面を開く

1. 上部タブの **「Settings」** をクリック
2. 左サイドバーから **「Builds & deployments」** をクリック

#### ステップ3: Build configurationを編集

1. **「Build configuration」** セクションを見つける
2. **「Edit configuration」** ボタンをクリック

#### ステップ4: Build output directoryを修正

以下のように設定を確認・修正:

| 項目 | 正しい設定 |
|------|-----------|
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` ← ここを修正！ |
| **Root directory (advanced)** | 空白のまま |

**重要:** `dist` だけを入力してください。`directory: dist` ではありません！

#### ステップ5: 保存

1. **「Save」** ボタンをクリック

#### ステップ6: 再デプロイ

1. 上部タブの **「Deployments」** をクリック
2. 一番上（最新）のデプロイを見つける
3. 右側の **「⋯」** (3点メニュー) をクリック
4. **「Retry deployment」** を選択
5. 確認ダイアログで **「Retry deployment」** をクリック

#### ステップ7: デプロイ完了を確認

1. デプロイが始まると「Building」ステータスが表示される
2. 3-5分待つ
3. **「Success」** になれば完了 ✅

**期待される成功メッセージ:**
```
✓ Success! Deployed to https://jaisfc.pages.dev
```

4. URLをクリックしてサイトを確認

---

### 方法2: プロジェクトを削除して再作成

設定画面が見つからない場合、プロジェクトを作り直します:

#### ステップ1: 既存プロジェクトを削除

1. https://dash.cloudflare.com/ → Workers & Pages
2. `jaisfc` プロジェクトをクリック
3. Settings → Danger Zone
4. **「Delete project」** をクリック
5. プロジェクト名 `jaisfc` を入力して確認
6. **「Delete」** をクリック

#### ステップ2: 新規プロジェクト作成

詳細は `CLOUDFLARE_PAGES_SETUP.md` を参照してください。

**重要なポイント:**

1. **Create application** → **Pages** → **Connect to Git**
2. GitHub接続: `japan-ai-short-film-competition` を選択
3. **ビルド設定 (ここが重要！):**

```
Project name: jaisfc
Production branch: main

Framework preset: Vite
Build command: npm run build
Build output directory: dist  ← ここに「dist」だけを入力
Root directory: (空白のまま)
```

4. **環境変数を追加:**

```
VITE_API_URL=https://japan-ai-backend.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
```

5. **「Save and Deploy」** をクリック

6. デプロイ完了を待つ (3-5分)

---

## ✅ 成功の確認

### 1. デプロイログを確認

成功すると以下のようなログが表示されます:

```
✓ 1540 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                            0.71 kB │ gzip:  0.37 kB
dist/assets/index-DSf9kLsM.css            18.47 kB │ gzip:  4.32 kB
...
✓ built in 5.14s
Finished

Validating asset output directory
Deploying to Cloudflare's global network...
✓ Success! Deployed to https://jaisfc.pages.dev
```

### 2. サイトにアクセス

ブラウザで以下にアクセス:

```
https://jaisfc.pages.dev
```

**確認項目:**
- ✅ サイトが表示される
- ✅ HTTPS (鍵アイコン) が表示される
- ✅ ロゴが表示される
- ✅ 言語切り替えボタンが動作する (EN ⇔ 日本語)
- ✅ 応募フォームが表示される
- ✅ フッターに連絡ボタンが表示される

### 3. APIとの接続を確認

ブラウザの開発者ツール (F12) を開いて:

1. Consoleタブを確認
2. CORSエラーやAPIエラーがないか確認
3. Networkタブでリクエストが成功しているか確認

---

## 🔍 よくある間違い

### ❌ 間違い1: 余計な文字を入力

```
Build output directory: directory: dist
Build output directory: /dist
Build output directory: ./dist
Build output directory: "dist"
```

### ✅ 正解

```
Build output directory: dist
```

---

### ❌ 間違い2: Root directoryに値を入れる

```
Root directory: /
Root directory: .
```

### ✅ 正解

```
Root directory: (空白のまま)
```

---

### ❌ 間違い3: Framework presetが間違っている

```
Framework preset: React
Framework preset: None
```

### ✅ 正解

```
Framework preset: Vite
```

---

## 📊 ビルドログの見方

### 成功時のログ

```
✓ Success! Deployed to https://jaisfc.pages.dev
```

### 失敗時のログ

#### パターン1: Output directory not found
```
Error: Output directory "directory: dist" not found.
Failed: build output directory not found
```
→ **Build output directory** を `dist` に修正

#### パターン2: Build command failed
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```
→ `package.json` の依存関係を確認

#### パターン3: Environment variable missing
```
Error: Missing environment variable: VITE_API_URL
```
→ 環境変数を追加

---

## 🚀 再デプロイのトリガー

デプロイを再実行する方法は3つあります:

### 方法1: Cloudflareダッシュボードから

1. Deployments → 最新デプロイの「⋯」→ **Retry deployment**

### 方法2: GitHubにプッシュ

```bash
cd C:\Users\user\Desktop\jaisfc2

# ダミーコミットを作成
git commit --allow-empty -m "Trigger redeploy"

# プッシュ
git push origin main
```

→ 自動的に再デプロイが始まります

### 方法3: Cloudflare Wrangler CLI (高度)

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy dist
```

---

## 🛡️ 設定のバックアップ

将来のために、正しい設定をメモしておきましょう:

```yaml
# Cloudflare Pages 設定

Project name: jaisfc
Production branch: main

# Build settings
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: (空白)

# Environment variables
VITE_API_URL: https://japan-ai-backend.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY: pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
```

---

## 📞 それでも解決しない場合

### チェックリスト

1. [ ] Build output directory が `dist` だけになっているか
2. [ ] Framework preset が `Vite` になっているか
3. [ ] Build command が `npm run build` になっているか
4. [ ] Root directory が空白か
5. [ ] 環境変数が2つとも設定されているか
6. [ ] GitHubリポジトリが正しく接続されているか

### トラブルシューティング

**問題:** 設定を保存できない

**解決策:**
- ブラウザのキャッシュをクリア
- シークレットモードで試す
- 別のブラウザで試す

**問題:** デプロイが「Queued」のまま進まない

**解決策:**
- 5分待つ
- Cloudflareのステータスページを確認: https://www.cloudflarestatus.com/
- 時間を置いて再試行

**問題:** 「Unauthorized」エラー

**解決策:**
- GitHubの接続を再認証
- Cloudflareから一度ログアウトして再ログイン

---

## 🎉 修正完了後の確認

デプロイが成功したら、以下を確認してください:

1. **フロントエンド:** https://jaisfc.pages.dev
2. **バックエンド:** https://japan-ai-backend.onrender.com/api/health
3. **機能テスト:**
   - 言語切り替え
   - 応募フォーム表示
   - 画像プレビュー
   - フッター表示

すべて正常に動作していれば完了です！ ✅

---

## 📚 関連ドキュメント

- [CLOUDFLARE_PAGES_SETUP.md](./CLOUDFLARE_PAGES_SETUP.md) - 詳細なセットアップ手順
- [完全運用ガイド.md](./完全運用ガイド.md) - 運用全般のガイド
- [Cloudflare Pages 公式ドキュメント](https://developers.cloudflare.com/pages/)

---

**作成日:** 2025年10月20日
**対象:** Cloudflare Pagesデプロイエラーの解決

---

© 2025 Japan AI Short Film Competition. All rights reserved.
