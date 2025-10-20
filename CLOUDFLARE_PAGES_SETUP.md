# 🚀 Cloudflare Pages 完全無料デプロイガイド

**完成URL:** `https://jaisfc.pages.dev`

**総費用:** 0円（永久無料）

---

## 🎯 構成

| 項目 | サービス | URL | 費用 |
|------|---------|-----|------|
| フロントエンド | Cloudflare Pages | `https://jaisfc.pages.dev` | **0円** |
| バックエンド | Render Web Service | `https://japan-ai-backend.onrender.com` | **0円** |
| 動画ストレージ | Cloudflare R2 | - | **0円** |
| SSL証明書 | 自動 | - | **0円** |
| **合計** | | | **0円** |

---

## ⚡ Cloudflare Pagesの特徴

✅ **無制限トラフィック** - 帯域幅制限なし
✅ **超高速配信** - Cloudflareの全世界CDN
✅ **自動SSL** - HTTPS自動有効化
✅ **ゼロダウンタイム** - スリープなし（Renderは15分で休止）
✅ **無料ドメイン** - `.pages.dev` サブドメイン
✅ **Git連携** - GitHubプッシュで自動デプロイ

---

## 📋 セットアップ手順（15分）

### ステップ1: Cloudflare Pagesプロジェクト作成

1. **https://dash.cloudflare.com/** にアクセス
2. ログイン（アカウントがない場合は無料作成）
3. 左メニューから **「Workers & Pages」** をクリック
4. **「Create application」** をクリック
5. **「Pages」** タブを選択
6. **「Connect to Git」** をクリック

---

### ステップ2: GitHubリポジトリ接続

1. **「Connect GitHub」** をクリック
2. GitHubアカウントでログイン
3. 「Only select repositories」を選択
4. **`japan-ai-short-film-competition`** を選択
5. **「Install & Authorize」** をクリック
6. リポジトリ **`japan-ai-short-film-competition`** を選択
7. **「Begin setup」** をクリック

---

### ステップ3: ビルド設定

**Project settings:**

```
Project name: jaisfc
Production branch: main
```

**Build settings:**

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: (空白のまま)
```

**Environment variables:**

「Add variable」を2回クリックして以下を追加：

**変数1:**
```
Variable name: VITE_API_URL
Value: https://japan-ai-backend.onrender.com/api
```

**変数2:**
```
Variable name: VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
```

**「Save and Deploy」をクリック**

---

### ステップ4: デプロイ完了を待つ（3-5分）

ビルドログが表示されます。以下の手順で確認：

1. **ビルドステータスを確認**
   - Building application...
   - Uploading...
   - Deploying to Cloudflare's global network...

2. **完了メッセージを確認**
   ```
   ✓ Success! Deployed to https://jaisfc.pages.dev
   ```

3. **URLをクリック**して動作確認

---

### ステップ5: Renderバックエンド環境変数更新

フロントエンドのデプロイが完了したら、バックエンドを更新：

1. **https://dashboard.render.com/** にアクセス
2. **`japan-ai-backend`** サービスを選択
3. **「Environment」** タブをクリック
4. 以下の環境変数を追加/更新：

```
NODE_ENV = production
PORT = 3001
FRONTEND_URL = https://jaisfc.pages.dev

R2_ENDPOINT = https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID = YOUR_R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY = YOUR_R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME = japan-ai-film-competition

STRIPE_SECRET_KEY = sk_test_YOUR_STRIPE_SECRET_KEY

EMAIL_USER = japanaishortfilmcompetition@gmail.com
EMAIL_PASSWORD = YOUR_GMAIL_APP_PASSWORD
```

5. **「Save Changes」** をクリック
6. 自動再デプロイを待つ（2-3分）

---

## ✅ 動作確認

### バックエンドAPI確認

ブラウザで以下にアクセス：

```
https://japan-ai-backend.onrender.com/api/health
```

**期待される出力:**

```json
{
  "status": "ok",
  "deadline": "2025-11-30T23:59:59.000Z",
  "deadlinePassed": false,
  "cloudStorage": "Cloudflare R2",
  "cloudStorageStatus": "configured",
  "maxFileSize": "500MB",
  "paymentMethods": ["Stripe (Credit Card, Apple Pay, Google Pay)"]
}
```

### フロントエンド確認

ブラウザで以下にアクセス：

```
https://jaisfc.pages.dev
```

**確認項目:**
- ✅ サイトが表示される
- ✅ HTTPSが有効（鍵アイコン）
- ✅ 言語切り替えボタンが動作（EN ⇔ 日本語）
- ✅ ロゴが表示される
- ✅ 応募フォームが表示される
- ✅ フッターに連絡ボタンが表示される

---

## 🎨 カスタムドメイン設定（オプション）

Cloudflare Pagesでは独自ドメインも無料で設定可能：

### 無料ドメインを使う場合

1. **Freenom** (無料ドメイン `.tk`, `.ml`, `.ga`など)
   - https://www.freenom.com/
   - 注意: サービス停止の可能性あり

2. **eu.org** (無料ドメイン `.eu.org`)
   - https://nic.eu.org/
   - 承認まで数週間

### 有料ドメインを使う場合

1. Cloudflare Pagesダッシュボード → `jaisfc` プロジェクト
2. **「Custom domains」** タブ
3. **「Set up a custom domain」** をクリック
4. ドメイン名を入力（例: `jaisfc.com`）
5. DNSレコードを設定
6. SSL証明書が自動発行される

---

## 🔄 自動デプロイ

GitHubにプッシュすると自動的にCloudflare Pagesが再デプロイされます：

```bash
cd C:\Users\user\Desktop\jaisfc2

# 変更をコミット
git add .
git commit -m "Update application"

# GitHubにプッシュ
git push origin main
```

**約3分後**に `https://jaisfc.pages.dev` が自動更新されます。

---

## 📊 無料枠の制限

| 項目 | Cloudflare Pages | Render (バックエンド) | Cloudflare R2 |
|------|------------------|---------------------|--------------|
| **トラフィック** | 無制限 | 月100GB | 無制限（ダウンロード） |
| **ビルド時間** | 月500分 | - | - |
| **リクエスト数** | 無制限 | - | 月100万回（アップロード） |
| **ストレージ** | - | - | 月10GB |
| **稼働時間** | 24/7 | 月750時間（スリープあり） | - |

**通常のコンテスト運営では無料枠で十分です！**

---

## 🛠️ トラブルシューティング

### ビルドエラー: "npm ERR! code ELIFECYCLE"

**原因:** 依存関係のインストールエラー

**解決方法:**
1. ローカルで `npm install` を実行
2. `package-lock.json` をコミット
3. GitHubにプッシュ

### 環境変数が反映されない

**原因:** ビルド時に環境変数が読み込まれていない

**解決方法:**
1. Cloudflare Pages → `jaisfc` → Settings → Environment variables
2. 変数名が `VITE_` で始まっているか確認
3. 「Redeploy」をクリックして再デプロイ

### APIエラー: "CORS error"

**原因:** バックエンドの `FRONTEND_URL` が正しくない

**解決方法:**
1. Render → `japan-ai-backend` → Environment
2. `FRONTEND_URL` を `https://jaisfc.pages.dev` に更新
3. 再デプロイを待つ

### 動画アップロードエラー

**原因:** R2の環境変数が設定されていない

**解決方法:**
1. Render → `japan-ai-backend` → Environment
2. R2関連の環境変数を確認
3. 正しい値を設定して保存

---

## 🚀 パフォーマンス最適化

Cloudflare Pagesは自動的に以下を実行：

✅ **Brotli圧縮** - ファイルサイズを最大80%削減
✅ **HTTP/3** - 最新のHTTPプロトコル
✅ **グローバルCDN** - 世界中で高速アクセス
✅ **自動キャッシュ** - 静的ファイルをエッジでキャッシュ
✅ **画像最適化** - WebP自動変換

**追加設定不要で最高のパフォーマンス！**

---

## 📈 アクセス解析

Cloudflare Pagesダッシュボードで確認可能：

- **訪問者数** - ユニークビジター
- **リクエスト数** - ページビュー
- **帯域幅** - データ転送量
- **エラー率** - 4xx/5xxエラー
- **地域別アクセス** - 訪問者の国/地域

---

## 🎉 完了！

**あなたのサイト:**

```
🌐 メインサイト: https://jaisfc.pages.dev
📡 バックエンドAPI: https://japan-ai-backend.onrender.com
```

**総費用:** 0円（永久無料）

**運営コスト:**
- フロントエンド: 0円
- バックエンド: 0円
- ストレージ: 0円
- SSL証明書: 0円
- ドメイン: 0円

**合計: 0円/月**

---

## 📚 関連ドキュメント

- [Cloudflare Pages公式ドキュメント](https://developers.cloudflare.com/pages/)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [Render公式ドキュメント](https://render.com/docs)
- [Cloudflare R2公式ドキュメント](https://developers.cloudflare.com/r2/)

---

**作成日:** 2025年10月20日
**対象:** 完全無料でプロフェッショナルなサイトを運営したい方

---

© 2025 Japan AI Short Film Competition. All rights reserved.
