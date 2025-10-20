# 🔧 Render バックエンド環境変数設定ガイド

このガイドでは、Renderバックエンド (`japan-ai-backend`) の環境変数を設定します。

---

## 📋 必要な環境変数

以下の環境変数を **https://dashboard.render.com/** の `japan-ai-backend` サービスに設定します。

---

## ⚙️ 設定手順

### ステップ1: Renderダッシュボードにアクセス

1. **https://dashboard.render.com/** にアクセス
2. **`japan-ai-backend`** サービスをクリック
3. 左メニューから **「Environment」** タブをクリック

---

### ステップ2: 環境変数を追加

**「Add Environment Variable」** をクリックして、以下を1つずつ追加：

---

#### 🌐 サーバー設定

| Key | Value | 説明 |
|-----|-------|------|
| `NODE_ENV` | `production` | 本番環境モード |
| `PORT` | `3001` | サーバーポート（Render自動設定） |
| `FRONTEND_URL` | `https://jaisfc.pages.dev` | フロントエンドURL（CORS設定用） |

---

#### 💾 Cloudflare R2設定（動画ストレージ）

| Key | Value |
|-----|-------|
| `R2_ENDPOINT` | `https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com` |
| `R2_ACCESS_KEY_ID` | `YOUR_R2_ACCESS_KEY_ID` |
| `R2_SECRET_ACCESS_KEY` | `YOUR_R2_SECRET_ACCESS_KEY` |
| `R2_BUCKET_NAME` | `japan-ai-film-competition` |

**📝 注意:** R2の設定は `.env.production` ファイルから取得済みです。

---

#### 💳 Stripe設定（決済）

| Key | Value |
|-----|-------|
| `STRIPE_SECRET_KEY` | `sk_test_YOUR_STRIPE_SECRET_KEY` |

**⚠️ 重要:** 現在はテストキーです。本番運用時は **Stripe Dashboard** から本番キー (`sk_live_...`) に変更してください。

---

#### 📧 メール設定（Gmail）

| Key | Value |
|-----|-------|
| `EMAIL_USER` | `japanaishortfilmcompetition@gmail.com` |
| `EMAIL_PASSWORD` | `YOUR_GMAIL_APP_PASSWORD` |

**📝 注意:** これはGmailアプリパスワードです（通常のパスワードではありません）。

---

### ステップ3: 保存して再デプロイ

1. すべての環境変数を入力したら **「Save Changes」** をクリック
2. Renderが自動的に再デプロイを開始します（2-3分待つ）
3. ログを確認して、以下のメッセージが表示されればOK：

```
==> Server is running on port 3001
==> Cloudflare R2 configured successfully
```

---

## ✅ 動作確認

### ヘルスチェック

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

**✅ 確認ポイント:**
- `cloudStorage`: "Cloudflare R2"
- `cloudStorageStatus`: "configured"
- `status`: "ok"

---

## 🔒 セキュリティ注意事項

### 環境変数の管理

1. **絶対に公開しない**
   - GitHub、Slack、メールなどで共有しない
   - スクリーンショットに含めない

2. **定期的に更新**
   - R2 APIトークン: 6ヶ月ごと
   - Gmailアプリパスワード: 変更時

3. **本番キーに変更**
   - Stripeテストキーを本番キーに変更
   - テストモードで十分テストしてから

---

## 🛠️ トラブルシューティング

### エラー: "cloudStorageStatus": "not configured"

**原因:** R2の環境変数が正しく設定されていない

**解決方法:**
1. Environment タブで以下を確認：
   - `R2_ENDPOINT` が `https://` で始まっているか
   - `R2_ACCESS_KEY_ID` と `R2_SECRET_ACCESS_KEY` が正しいか
   - `R2_BUCKET_NAME` が `japan-ai-film-competition` か
2. 保存して再デプロイ

---

### エラー: "CORS policy: No 'Access-Control-Allow-Origin' header"

**原因:** `FRONTEND_URL` が正しくない

**解決方法:**
1. `FRONTEND_URL` を確認
2. Cloudflare Pagesの正しいURLに変更：
   ```
   https://jaisfc.pages.dev
   ```
3. 保存して再デプロイ

---

### エラー: "Failed to send email"

**原因:** Gmail設定が正しくない

**解決方法:**
1. `EMAIL_USER` が正しいGmailアドレスか確認
2. `EMAIL_PASSWORD` がアプリパスワードか確認（通常のパスワードではない）
3. Gmail 2段階認証が有効か確認
4. [Googleアプリパスワード](https://myaccount.google.com/apppasswords)で新しいパスワードを生成

---

### エラー: "Stripe error: Invalid API key"

**原因:** Stripe APIキーが正しくない

**解決方法:**
1. [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)にアクセス
2. テストキーまたは本番キーをコピー
3. `STRIPE_SECRET_KEY` を更新
4. 保存して再デプロイ

---

## 🔄 環境変数の更新方法

環境変数を変更したい場合：

1. Render → `japan-ai-backend` → Environment
2. 変更したい変数の右側にある **鉛筆アイコン** をクリック
3. 新しい値を入力
4. **「Save Changes」** をクリック
5. 自動再デプロイを待つ（2-3分）

---

## 📊 環境変数一覧（コピー用）

以下をコピーして、Render Environmentに貼り付け可能な形式：

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://jaisfc.pages.dev
R2_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=YOUR_R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY=YOUR_R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME=japan-ai-film-competition
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
EMAIL_USER=japanaishortfilmcompetition@gmail.com
EMAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD
```

**⚠️ 注意:** Renderでは1つずつ手動で追加する必要があります。一括インポートはできません。

---

## 🚀 本番環境への切り替え

テストが完了したら、本番環境に切り替えます：

### 1. Stripe本番キーに変更

1. [Stripe Dashboard](https://dashboard.stripe.com/apikeys)（本番モード）
2. Secret keyをコピー
3. Render → `STRIPE_SECRET_KEY` を更新
4. フロントエンドの `VITE_STRIPE_PUBLISHABLE_KEY` も本番キーに変更

### 2. FRONTEND_URLを本番ドメインに変更

独自ドメインを設定した場合：

```
FRONTEND_URL=https://yourdomain.com
```

### 3. 動作確認

本番環境でテスト決済を実施：
- 実際のクレジットカードで少額決済
- メール通知が届くか確認
- 動画アップロードが動作するか確認

---

## 📝 チェックリスト

- [ ] NODE_ENV = production
- [ ] PORT = 3001
- [ ] FRONTEND_URL = https://jaisfc.pages.dev
- [ ] R2_ENDPOINT = https://...r2.cloudflarestorage.com
- [ ] R2_ACCESS_KEY_ID = (設定済み)
- [ ] R2_SECRET_ACCESS_KEY = (設定済み)
- [ ] R2_BUCKET_NAME = japan-ai-film-competition
- [ ] STRIPE_SECRET_KEY = sk_test_... (テスト) または sk_live_... (本番)
- [ ] EMAIL_USER = japanaishortfilmcompetition@gmail.com
- [ ] EMAIL_PASSWORD = (Gmailアプリパスワード)
- [ ] 保存して再デプロイ完了
- [ ] /api/health で動作確認

---

**作成日:** 2025年10月20日
**対象:** Renderバックエンドの環境変数設定

---

© 2025 Japan AI Short Film Competition. All rights reserved.
