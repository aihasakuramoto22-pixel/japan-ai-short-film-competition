# 🚀 本番環境デプロイ手順書

**ドメイン**: aishortfilmjapan.shop
**所要時間**: 約60分

---

## ✅ 事前準備チェック

- [x] .envファイル作成済み
- [x] .env.productionファイル作成済み
- [ ] GitHubアカウント（[作成はこちら](https://github.com/signup)）
- [ ] Renderアカウント（[作成はこちら](https://render.com/signup)）

---

## ステップ1: GitHubリポジトリ作成（10分）

### 1-1. GitHubで新規リポジトリ作成

1. [GitHub](https://github.com/)にログイン
2. 右上の「+」→「New repository」をクリック
3. 以下のように設定:
   - **Repository name**: `japan-ai-short-film-competition`
   - **Description**: `Japan AI Short Film Competition - Video submission platform`
   - **Public/Private**: Private（推奨）
   - **Initialize this repository with**: 何も選択しない
4. 「Create repository」をクリック

### 1-2. ローカルからGitHubへプッシュ

コマンドプロンプトまたはGit Bashを開いて、以下を実行:

```bash
# プロジェクトフォルダに移動
cd C:\Users\user\Desktop\jaisfc2

# Gitリポジトリを初期化（まだの場合）
git init

# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit - Japan AI Short Film Competition v2.0"

# GitHubリポジトリを追加（ユーザー名を自分のものに変更）
git remote add origin https://github.com/あなたのユーザー名/japan-ai-short-film-competition.git

# メインブランチにリネーム
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**⚠️ 注意**: GitHubのユーザー名とパスワード（またはPersonal Access Token）を求められたら入力してください。

---

## ステップ2: Renderでバックエンドをデプロイ（15分）

### 2-1. Renderにログイン

1. [Render](https://render.com/)にアクセス
2. GitHubアカウントでログイン

### 2-2. 新規Webサービス作成

1. ダッシュボードで「New +」→「Web Service」をクリック
2. 「Connect a repository」で、先ほど作成したリポジトリを選択
   - リポジトリが表示されない場合は「Configure account」で権限を付与
3. 以下のように設定:

| 項目 | 設定値 |
|------|--------|
| **Name** | `japan-ai-backend` |
| **Region** | Singapore（日本に最も近い） |
| **Branch** | `main` |
| **Root Directory** | (空欄) |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

### 2-3. 環境変数を設定

「Advanced」→「Add Environment Variable」で以下を追加:

```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://aishortfilmjapan.shop
MEGA_EMAIL=あなたのMEGAメールアドレス
MEGA_PASSWORD=あなたのMEGAパスワード
STRIPE_SECRET_KEY=あなたのStripe Secret Key (sk_test_で始まる)
EMAIL_USER=japanaishortfilmcompetition@gmail.com
EMAIL_PASSWORD=あなたのGmailアプリパスワード
```

**⚠️ 重要**: スペースなしで1行ずつコピー＆ペーストしてください。

### 2-4. デプロイ開始

1. 「Create Web Service」をクリック
2. デプロイが開始されます（5-10分かかります）
3. 「Live」と表示されたら成功！
4. **バックエンドURL**をメモ: `https://japan-ai-backend.onrender.com`

---

## ステップ3: Renderでフロントエンドをデプロイ（15分）

### 3-1. 新規Static Siteを作成

1. ダッシュボードで「New +」→「Static Site」をクリック
2. 同じリポジトリを選択
3. 以下のように設定:

| 項目 | 設定値 |
|------|--------|
| **Name** | `japan-ai-frontend` |
| **Region** | Singapore |
| **Branch** | `main` |
| **Root Directory** | (空欄) |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 3-2. 環境変数を設定

「Advanced」→「Add Environment Variable」で以下を追加:

```
VITE_API_URL=https://japan-ai-backend.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51SJQj3Jwsbd7SooaAA345WssPqwwkfzsILMgUcmxKlWmNxI6YoC7du1ikFSC4kaSQ01DAgxyFtct8yN8xtpq9NyO00ikSWAgWR
```

### 3-3. Rewrite Rulesを設定

「Redirects/Rewrites」タブで以下を追加:

| Source | Destination | Action |
|--------|-------------|--------|
| `/*` | `/index.html` | Rewrite |

### 3-4. デプロイ開始

1. 「Create Static Site」をクリック
2. デプロイが開始されます（5-10分かかります）
3. 「Live」と表示されたら成功！
4. **フロントエンドURL**をメモ: `https://japan-ai-frontend.onrender.com`

---

## ステップ4: バックエンドのCORS設定を更新（5分）

### 4-1. 環境変数を更新

Renderのバックエンドサービス（japan-ai-backend）で:

1. 「Environment」タブを開く
2. `FRONTEND_URL` の値を更新:
   ```
   https://aishortfilmjapan.shop
   ```
3. 「Save Changes」をクリック
4. 自動的に再デプロイされます

---

## ステップ5: ValueDomainでDNS設定（5分）

### 5-1. ValueDomainにログイン

1. [ValueDomain](https://www.value-domain.com/)にログイン
2. 「ドメイン」→「DNS設定」を選択
3. `aishortfilmjapan.shop` を選択

### 5-2. DNS レコードを追加

以下のレコードを追加:

```
a @ 216.24.57.1
cname www japan-ai-frontend.onrender.com.
cname api japan-ai-backend.onrender.com.
```

**入力方法**:
```
a @ 216.24.57.1
cname www japan-ai-frontend.onrender.com.
cname api japan-ai-backend.onrender.com.
```

**⚠️ 注意**:
- `japan-ai-frontend.onrender.com.` の最後の `.` を忘れないでください
- `japan-ai-backend.onrender.com.` の最後の `.` を忘れないでください

### 5-3. 保存して反映

1. 「保存する」をクリック
2. DNS反映には**5分〜24時間**かかる場合があります

---

## ステップ6: Renderでカスタムドメインを設定（10分）

### 6-1. フロントエンドにドメインを追加

1. Renderダッシュボードで `japan-ai-frontend` を開く
2. 「Settings」→「Custom Domains」
3. 「Add Custom Domain」をクリック
4. 以下を追加:
   - `aishortfilmjapan.shop`
   - `www.aishortfilmjapan.shop`

### 6-2. バックエンドにサブドメインを追加

1. Renderダッシュボードで `japan-ai-backend` を開く
2. 「Settings」→「Custom Domains」
3. 「Add Custom Domain」をクリック
4. 以下を追加:
   - `api.aishortfilmjapan.shop`

### 6-3. SSL証明書の自動発行を確認

- Renderが自動的にSSL証明書を発行します（5-10分）
- 「Verified」と表示されたら完了！

---

## ステップ7: 動作確認（5分）

### 7-1. ブラウザで確認

以下のURLにアクセス:

1. **メインサイト**: https://aishortfilmjapan.shop
2. **WWW**: https://www.aishortfilmjapan.shop
3. **API**: https://api.aishortfilmjapan.shop/api/health

### 7-2. チェックリスト

- [ ] サイトが表示される
- [ ] HTTPSで接続されている（🔒マークが表示）
- [ ] 応募フォームが表示される
- [ ] 支払い方法アイコンが表示される（クレジットカード、Apple Pay、Google Pay）

---

## 🎉 完了！

おめでとうございます！本番環境のデプロイが完了しました。

### 📊 確認事項

1. **サイトURL**: https://aishortfilmjapan.shop
2. **API URL**: https://api.aishortfilmjapan.shop
3. **SSL**: 有効
4. **支払い**: Stripe（テストモード）

### ⚠️ 本番運用前の重要な対応

#### 1. Stripeを本番モードに切り替え

現在は**テストモード**です。実際の決済を受け付けるには:

1. [Stripe Dashboard](https://dashboard.stripe.com/)にログイン
2. 左上のトグルを「テストモード」→「本番モード」に切り替え
3. 「開発者」→「APIキー」から本番キーを取得
4. Renderの環境変数を更新:
   - `STRIPE_SECRET_KEY`: 本番のSecretキー
   - `VITE_STRIPE_PUBLISHABLE_KEY`: 本番のPublishableキー

#### 2. データベース導入（必須）

現在、応募データは**インメモリ**に保存されています。サーバー再起動でデータが消失するため、**本番環境では必ずデータベースを導入**してください。

**推奨**: MongoDB Atlas（無料）

詳細: [ISSUES_AND_IMPROVEMENTS.md](./ISSUES_AND_IMPROVEMENTS.md#データベース移行ガイドmongodb)

---

## 📞 サポート

問題が発生した場合:

**Email**: japanaishortfilmcompetition@gmail.com

---

**最終更新**: 2025年10月18日
**ドメイン**: aishortfilmjapan.shop

© 2025 JAPAN AI SHORT FILM COMPETITION. All rights reserved.
