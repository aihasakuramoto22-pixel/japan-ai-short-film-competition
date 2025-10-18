# 🌐 ValueDomain → Render 独自ドメイン設定ガイド

このガイドに従えば、**20分以内**にValueDomainで取得したドメインをRenderにデプロイしたサイトに接続できます。

---

## 📋 前提条件

- [ ] ValueDomainでドメインを取得済み（例: `yoursite.com`）
- [ ] Renderアカウントを作成済み
- [ ] GitHubアカウントを作成済み

---

## ステップ1: GitHubリポジトリの作成とプッシュ（5分）

### 1-1. GitHubに新しいリポジトリを作成

1. [GitHub](https://github.com/)にログイン
2. 右上の「+」→「New repository」をクリック
3. 以下を設定：
   - **Repository name**: `jaisfc-production`
   - **Description**: Japan AI Short Film Competition
   - **Public** または **Private** を選択
   - 「Create repository」をクリック

### 1-2. ローカルプロジェクトをGitHubにプッシュ

コマンドプロンプトで以下を実行：

```bash
cd C:\Users\user\Desktop\jaisfc2

# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# 最初のコミット
git commit -m "Initial commit - MEGA.io version"

# GitHubに接続（あなたのユーザー名に置き換えてください）
git remote add origin https://github.com/あなたのユーザー名/jaisfc-production.git

# メインブランチに設定
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**注意**: GitHubのユーザー名とパスワード（またはPersonal Access Token）の入力を求められます。

---

## ステップ2: Renderへのデプロイ（5分）

### 2-1. Renderアカウント作成

1. [Render](https://render.com/)にアクセス
2. 「Get Started for Free」をクリック
3. **GitHubアカウントで連携**を選択

### 2-2. バックエンド（Node.js）をデプロイ

1. Renderダッシュボードで「**New +**」→「**Web Service**」をクリック

2. GitHubリポジトリ `jaisfc-production` を選択
   - 見つからない場合：「Configure Account」→リポジトリへのアクセスを許可

3. 以下を設定：

   ```
   Name: jaisfc-backend
   Environment: Node
   Region: Singapore（日本に近い、またはOregonも可）
   Branch: main
   Root Directory: (空白のまま)
   Build Command: npm install
   Start Command: npm run server
   Instance Type: Free
   ```

4. 「**Advanced**」をクリックして環境変数を追加：

   | Key | Value |
   |-----|-------|
   | `PORT` | `3001` |
   | `FRONTEND_URL` | `https://yoursite.com`（後で正しいドメインに更新） |
   | `MEGA_EMAIL` | あなたのMEGAメールアドレス |
   | `MEGA_PASSWORD` | あなたのMEGAパスワード |
   | `PAYPAL_MODE` | `live`（本番環境）または`sandbox`（テスト） |
   | `PAYPAL_CLIENT_ID` | PayPal本番用Client ID |
   | `PAYPAL_CLIENT_SECRET` | PayPal本番用Secret |
   | `STRIPE_SECRET_KEY` | Stripe本番用Secret Key（sk_live_...） |
   | `STRIPE_PUBLISHABLE_KEY` | Stripe本番用Publishable Key（pk_live_...） |
   | `EMAIL_USER` | あなたのGmailアドレス |
   | `EMAIL_PASSWORD` | Gmailアプリパスワード |

5. 「**Create Web Service**」をクリック

6. **デプロイ完了を待つ**（5-10分）
   - ログに「Server is running on port 3001」と表示されればOK

7. **バックエンドのURLをメモ**
   - 例: `https://jaisfc-backend.onrender.com`

### 2-3. フロントエンド（React）をデプロイ

1. Renderダッシュボードで「**New +**」→「**Static Site**」をクリック

2. 同じGitHubリポジトリ `jaisfc-production` を選択

3. 以下を設定：

   ```
   Name: jaisfc-frontend
   Branch: main
   Root Directory: (空白のまま)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. 「**Advanced**」→「**Environment Variables**」で環境変数を追加：

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | バックエンドのURL（例: `https://jaisfc-backend.onrender.com/api`） |

5. 「**Create Static Site**」をクリック

6. **デプロイ完了を待つ**（3-5分）

7. **フロントエンドのURLをメモ**
   - 例: `https://jaisfc-frontend.onrender.com`

---

## ステップ3: ValueDomainでDNS設定（5分）

### 3-1. ValueDomainにログイン

1. [ValueDomain](https://www.value-domain.com/)にログイン
2. 「**ドメイン**」→「**ドメインの設定操作**」をクリック
3. 接続したいドメイン（例: `yoursite.com`）の「**DNS/URL**」をクリック

### 3-2. DNS設定を追加

以下のDNSレコードを追加します：

#### パターン1: フロントエンドをルートドメインに接続（推奨）

```
a @ 216.24.57.1
cname www jaisfc-frontend.onrender.com.
cname api jaisfc-backend.onrender.com.
```

**説明**:
- `yoursite.com` → フロントエンド（静的サイト）
- `www.yoursite.com` → フロントエンド（静的サイト）
- `api.yoursite.com` → バックエンド（Node.jsサーバー）

#### パターン2: すべてバックエンドで処理する場合

```
a @ 216.24.57.1
cname www jaisfc-backend.onrender.com.
```

**推奨**: パターン1を使用してください（パフォーマンスが良い）

### 3-3. DNS設定を保存

1. 「**保存する**」ボタンをクリック
2. DNS変更が反映されるまで**5分〜24時間**待つ（通常は1時間以内）

---

## ステップ4: Renderでカスタムドメインを設定（5分）

### 4-1. フロントエンドにドメインを追加

1. Renderダッシュボードで「**jaisfc-frontend**」を選択
2. 「**Settings**」タブをクリック
3. 「**Custom Domain**」セクションまでスクロール
4. 「**Add Custom Domain**」をクリック
5. ドメインを入力：
   - `yoursite.com`
   - `www.yoursite.com`
6. 「**Save**」をクリック

### 4-2. バックエンドにサブドメインを追加

1. Renderダッシュボードで「**jaisfc-backend**」を選択
2. 「**Settings**」タブをクリック
3. 「**Custom Domain**」セクションまでスクロール
4. 「**Add Custom Domain**」をクリック
5. サブドメインを入力：
   - `api.yoursite.com`
6. 「**Save**」をクリック

### 4-3. SSL証明書の自動発行を待つ

- Renderが自動的にLet's EncryptのSSL証明書を発行します
- 通常は**5-10分**で完了
- 「**Settings**」→「**Custom Domain**」で証明書の状態を確認できます
- ✅ 緑のチェックマークが表示されればOK

---

## ステップ5: 環境変数の更新（2分）

### 5-1. バックエンドの環境変数を更新

1. Renderダッシュボードで「**jaisfc-backend**」を選択
2. 「**Environment**」タブをクリック
3. `FRONTEND_URL` を更新：
   ```
   FRONTEND_URL=https://yoursite.com
   ```
4. 「**Save Changes**」をクリック
5. 自動的に再デプロイされます（2-3分）

### 5-2. フロントエンドの環境変数を確認

1. Renderダッシュボードで「**jaisfc-frontend**」を選択
2. 「**Environment**」タブをクリック
3. `VITE_API_URL` が正しいか確認：
   ```
   VITE_API_URL=https://api.yoursite.com/api
   ```
4. 間違っていたら修正して「**Save Changes**」

---

## ステップ6: 動作確認（3分）

### 6-1. DNS伝播を確認

1. [WhatsMyDNS](https://www.whatsmydns.net/)にアクセス
2. あなたのドメイン（例: `yoursite.com`）を入力
3. レコードタイプ「**A**」を選択
4. 世界中のDNSサーバーで正しいIPアドレス（`216.24.57.1`）が表示されればOK

### 6-2. サイトにアクセス

ブラウザで以下にアクセス：

1. **フロントエンド**: `https://yoursite.com`
   - サイトが表示されることを確認
   - HTTPSが有効（鍵マーク）になっていることを確認

2. **バックエンドAPI**: `https://api.yoursite.com/api/health`
   - 以下のようなJSONが表示されればOK：
   ```json
   {
     "status": "ok",
     "cloudStorage": "MEGA.io",
     "paymentMethods": ["Stripe (Apple Pay, Credit Card)", "PayPal"]
   }
   ```

### 6-3. テスト応募

1. `https://yoursite.com`にアクセス
2. 応募フォームを入力
3. テスト動画をアップロード（小さいファイルでOK）
4. 支払い処理を完了（テストモードの場合はテストカード使用）
5. 確認メールが届くことを確認

---

## 🎨 コードの修正（API URLの更新）

フロントエンドのコードでAPIのURLがハードコーディングされている場合は修正が必要です。

### 修正箇所: `src/components/AIFilmCompetition.jsx`

現在のコード（8行目）:
```javascript
const API_URL = 'http://localhost:3001/api';
```

以下のように変更：
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

この変更により：
- **本番環境**: 環境変数`VITE_API_URL`（`https://api.yoursite.com/api`）を使用
- **ローカル環境**: `http://localhost:3001/api`を使用

### 変更を反映

```bash
cd C:\Users\user\Desktop\jaisfc2

# ファイルを編集後
git add .
git commit -m "Update API URL to use environment variable"
git push

# Renderで自動的に再デプロイされます（3-5分）
```

---

## 📊 DNS設定の完全版

### ValueDomainのDNS設定画面で以下を設定：

```
# ルートドメインをRenderのIPに向ける
a @ 216.24.57.1

# wwwをフロントエンドに向ける
cname www jaisfc-frontend.onrender.com.

# apiサブドメインをバックエンドに向ける
cname api jaisfc-backend.onrender.com.

# メール用（オプション - 使用する場合のみ）
# mx @ 10 mail.yoursite.com.
```

**注意**: 各行の最後にピリオド（`.`）を忘れずに！

---

## 🐛 トラブルシューティング

### ❌ ドメインにアクセスできない

**原因1**: DNS設定が反映されていない
- **解決**: 最大24時間待つ（通常は1時間以内）
- **確認**: [WhatsMyDNS](https://www.whatsmydns.net/)でDNS伝播を確認

**原因2**: DNS設定が間違っている
- **解決**: ValueDomainの設定を再確認
  - CNAMEレコードの最後にピリオド（`.`）があるか
  - RenderのURLが正しいか（`jaisfc-frontend.onrender.com`など）

**原因3**: RenderでCustom Domainが設定されていない
- **解決**: Render → Settings → Custom Domainで追加

---

### ❌ HTTPSエラー（証明書エラー）

**原因**: SSL証明書がまだ発行されていない
- **解決**: Renderで証明書発行を待つ（5-10分）
- **確認**: Render → Settings → Custom Domain → 緑のチェックマーク

---

### ❌ APIが動作しない（CORS エラー）

**原因**: バックエンドの`FRONTEND_URL`が間違っている
- **解決**:
  1. Render → jaisfc-backend → Environment
  2. `FRONTEND_URL`を`https://yoursite.com`に更新
  3. 保存して再デプロイを待つ

---

### ❌ 支払いができない

**原因**: PayPal/Stripeの設定が本番用になっていない
- **解決**:
  1. `PAYPAL_MODE`が`live`になっているか確認
  2. Stripeのキーが`sk_live_...`と`pk_live_...`になっているか確認

---

## 📝 まとめ

### 設定後のURL構成

| 種類 | URL | 説明 |
|------|-----|------|
| フロントエンド | `https://yoursite.com` | メインサイト |
| フロントエンド | `https://www.yoursite.com` | wwwサブドメイン |
| バックエンドAPI | `https://api.yoursite.com` | APIサーバー |
| ヘルスチェック | `https://api.yoursite.com/api/health` | サーバー状態確認 |

### 完了チェックリスト

- [ ] GitHubにコードをプッシュ
- [ ] Renderにバックエンドをデプロイ
- [ ] Renderにフロントエンドをデプロイ
- [ ] ValueDomainでDNS設定
- [ ] RenderでCustom Domainを追加
- [ ] SSL証明書が発行された（HTTPSアクセス可能）
- [ ] 環境変数`FRONTEND_URL`を正しいドメインに更新
- [ ] サイトにアクセスして動作確認
- [ ] テスト応募を実施

---

## 🎉 完了！

おめでとうございます！あなたのサイトは独自ドメインで公開されました。

**あなたのサイト**: https://yoursite.com

---

**作成日**: 2025年10月18日
**対象プロジェクト**: jaisfc2 - MEGA.io版
**対象ドメイン**: ValueDomain

---

© 2025 Japan AI Short Film Competition. All rights reserved.
