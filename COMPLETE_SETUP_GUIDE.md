# 🚀 完全セットアップガイド - Japan AI Short Film Competition

このガイドは**初心者でも60分以内**にローカル環境から本番環境まで完全にセットアップできるよう設計されています。

---

## 📋 目次

1. [ローカル環境セットアップ](#ローカル環境セットアップ)（20分）
2. [本番環境デプロイ](#本番環境デプロイ)（30分）
3. [ValueDomainドメイン接続](#valuedomainドメイン接続)（10分）
4. [トラブルシューティング](#トラブルシューティング)

---

## ローカル環境セットアップ

### 前提条件

- ✅ Windows 10/11
- ✅ インターネット接続

### ステップ1: Node.jsのインストール（5分）

1. [Node.js公式サイト](https://nodejs.org/)にアクセス
2. **LTS版**（推奨版）をダウンロード
3. インストーラーを実行（すべてデフォルト設定でOK）
4. インストール確認：

```bash
node --version
npm --version
```

### ステップ2: 必要なアカウントの作成（10分）

#### 2-1. MEGA.ioアカウント

1. [MEGA.io](https://mega.io/)でアカウント作成
2. **無料で20GB**まで利用可能
3. メールアドレスとパスワードをメモ

#### 2-2. Stripeアカウント（テストモード）

1. [Stripe](https://dashboard.stripe.com/register)でアカウント作成
2. ダッシュボード左上が「**テストモード**」になっていることを確認
3. 「開発者」→「APIキー」を開く
4. 以下をコピー：
   - 公開可能キー: `pk_test_51...`
   - シークレットキー: `sk_test_51...`（「表示」をクリック）

#### 2-3. Gmailアプリパスワード

1. [Googleアカウント](https://myaccount.google.com/)にログイン
2. [2段階認証](https://myaccount.google.com/signinoptions/two-step-verification)を有効化
3. [アプリパスワード](https://myaccount.google.com/apppasswords)にアクセス
4. 「アプリを選択」→「その他」→「JAPAN AI SHORT FILM COMPETITION」
5. 16桁のパスワードをコピー（スペース除く）

### ステップ3: プロジェクトのセットアップ（5分）

```bash
# プロジェクトディレクトリに移動
cd C:\Users\user\Desktop\jaisfc2

# 依存パッケージをインストール
npm install

# .envファイルを作成
copy .env.example .env
```

### ステップ4: 環境変数の設定（3分）

メモ帳で `.env` を開き、以下を設定：

```env
# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000

# MEGA.io Configuration
MEGA_EMAIL=あなたのMEGAメールアドレス
MEGA_PASSWORD=あなたのMEGAパスワード

# Stripe Configuration（テストモード）
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx

# Email Configuration (Gmail)
EMAIL_USER=あなたのGmailアドレス
EMAIL_PASSWORD=16桁のアプリパスワード（スペースなし）
```

### ステップ5: サーバー起動（2分）

#### ターミナル1（バックエンド）

```bash
cd C:\Users\user\Desktop\jaisfc2
npm run server
```

**成功メッセージ**:
```
Server is running on port 3001
MEGA.io storage initialized successfully
Cloud Storage: MEGA.io
Payment Methods: Stripe (Credit Card, Apple Pay, Google Pay)
```

#### ターミナル2（フロントエンド）

新しいコマンドプロンプトウィンドウを開いて：

```bash
cd C:\Users\user\Desktop\jaisfc2
npm run dev
```

**成功メッセージ**:
```
VITE ready in XXXms
Local: http://localhost:3000
```

### ステップ6: ブラウザで確認

1. ブラウザで **http://localhost:3000** を開く
2. トップページが表示されることを確認
3. 支払いアイコン（クレジット、Apple Pay、Google Pay）が表示されることを確認

### テスト応募を実施

#### テストデータ

```
メールアドレス: test@example.com
お名前: テスト太郎
作品タイトル: テスト作品
動画ファイル: 任意の動画ファイル（小さいファイルでOK）
```

#### Stripeテストカード

```
カード番号: 4242 4242 4242 4242
有効期限: 12/34
CVC: 123
郵便番号: 123-4567
```

#### 確認事項

- ✅ ファイルアップロードが成功
- ✅ `/payment` ページに遷移
- ✅ Stripe支払いフォームが表示
- ✅ テストカードで支払い成功
- ✅ `/success` ページに遷移
- ✅ 確認メールが届く

---

## 本番環境デプロイ

### 準備: GitHubリポジトリ作成（10分）

#### ステップ1: Gitの初期化

```bash
cd C:\Users\user\Desktop\jaisfc2

# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit - JAPAN AI SHORT FILM COMPETITION"
```

#### ステップ2: GitHubにプッシュ

1. [GitHub](https://github.com/)にログイン
2. 「New repository」をクリック
3. リポジトリ名: `japan-ai-short-film-competition`
4. 「Create repository」をクリック
5. 表示されたコマンドを実行：

```bash
git remote add origin https://github.com/あなたのユーザー名/japan-ai-short-film-competition.git
git branch -M main
git push -u origin main
```

### Renderへのデプロイ（20分）

#### ステップ1: Renderアカウント作成

1. [Render](https://render.com/)にアクセス
2. 「Get Started for Free」をクリック
3. GitHubアカウントで連携

#### ステップ2: バックエンドのデプロイ

1. Renderダッシュボードで「**New +**」→「**Web Service**」
2. GitHubリポジトリ `japan-ai-short-film-competition` を選択
3. 設定：

```
Name: japan-ai-backend
Environment: Node
Region: Singapore
Branch: main
Build Command: npm install
Start Command: npm run server
Instance Type: Free
```

4. 環境変数を追加：

| Key | Value |
|-----|-------|
| `PORT` | `3001` |
| `FRONTEND_URL` | `https://yoursite.com`（後で変更） |
| `MEGA_EMAIL` | あなたのMEGAメールアドレス |
| `MEGA_PASSWORD` | あなたのMEGAパスワード |
| `STRIPE_SECRET_KEY` | `sk_live_...`（本番用） |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_...`（本番用） |
| `EMAIL_USER` | あなたのGmailアドレス |
| `EMAIL_PASSWORD` | Gmailアプリパスワード |

5. 「**Create Web Service**」をクリック
6. デプロイ完了を待つ（5-10分）
7. **バックエンドURL**をメモ: `https://japan-ai-backend.onrender.com`

#### ステップ3: フロントエンドのデプロイ

1. Renderダッシュボードで「**New +**」→「**Static Site**」
2. 同じGitHubリポジトリを選択
3. 設定：

```
Name: japan-ai-frontend
Branch: main
Build Command: npm install && npm run build
Publish Directory: dist
```

4. 環境変数を追加：

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://japan-ai-backend.onrender.com/api` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...`（本番用） |

5. 「**Create Static Site**」をクリック
6. デプロイ完了を待つ（3-5分）
7. **フロントエンドURL**をメモ: `https://japan-ai-frontend.onrender.com`

---

## ValueDomainドメイン接続

### ステップ1: ValueDomainでDNS設定（5分）

1. [ValueDomain](https://www.value-domain.com/)にログイン
2. 「ドメイン」→「ドメインの設定操作」
3. 対象ドメインの「**DNS/URL**」をクリック
4. 以下を設定：

```
a @ 216.24.57.1
cname www japan-ai-frontend.onrender.com.
cname api japan-ai-backend.onrender.com.
```

**注意**: 各行の最後にピリオド（`.`）を必ず付けてください！

5. 「保存する」をクリック

### ステップ2: Renderでカスタムドメイン設定（5分）

#### フロントエンド

1. Renderダッシュボードで「**japan-ai-frontend**」を選択
2. 「**Settings**」→「**Custom Domain**」
3. 以下を追加：
   - `yoursite.com`
   - `www.yoursite.com`

#### バックエンド

1. Renderダッシュボードで「**japan-ai-backend**」を選択
2. 「**Settings**」→「**Custom Domain**」
3. 以下を追加：
   - `api.yoursite.com`

### ステップ3: 環境変数の更新

#### バックエンド

1. Renderダッシュボードで「**japan-ai-backend**」を選択
2. 「**Environment**」タブ
3. `FRONTEND_URL` を更新：
   ```
   FRONTEND_URL=https://yoursite.com
   ```
4. 「**Save Changes**」→ 自動再デプロイ

#### フロントエンド

1. 「**japan-ai-frontend**」を選択
2. 「**Environment**」タブ
3. `VITE_API_URL` を確認/更新：
   ```
   VITE_API_URL=https://api.yoursite.com/api
   ```

### ステップ4: SSL証明書の発行を待つ

- Renderが自動的にLet's EncryptのSSL証明書を発行
- 通常**5-10分**で完了
- 「**Settings**」→「**Custom Domain**」で✅マークを確認

### ステップ5: 動作確認

1. `https://yoursite.com` にアクセス
2. HTTPSが有効（鍵マーク）を確認
3. テスト応募を実施
4. すべての機能が正常に動作することを確認

---

## トラブルシューティング

### ❌ ローカル環境

#### エラー: `MEGA storage not initialized`

**解決**:
1. `.env`ファイルの`MEGA_EMAIL`と`MEGA_PASSWORD`を確認
2. MEGA.ioアカウントが有効か確認
3. インターネット接続を確認

#### エラー: `Stripe publishable key is not defined`

**解決**:
```bash
# プロジェクトルートに.env.localを作成
echo VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key > .env.local

# サーバーを再起動
# Ctrl+C で停止 → npm run dev で再起動
```

### ❌ 本番環境

#### サイトにアクセスできない

**原因**: DNS設定が反映されていない

**解決**:
1. [WhatsMyDNS](https://www.whatsmydns.net/)で確認
2. 最大24時間待つ（通常は1時間以内）
3. ValueDomainのDNS設定を再確認

#### HTTPSエラー

**原因**: SSL証明書がまだ発行されていない

**解決**:
1. Render → Settings → Custom Domain で状態確認
2. 5-10分待つ
3. 緑の✅マークが表示されるまで待つ

#### APIが動作しない（CORSエラー）

**原因**: `FRONTEND_URL`が間違っている

**解決**:
1. Render → japan-ai-backend → Environment
2. `FRONTEND_URL`を`https://yoursite.com`に更新
3. 保存して再デプロイを待つ

---

## 📊 完成後の構成

| 種類 | URL | 説明 |
|------|-----|------|
| フロントエンド | `https://yoursite.com` | メインサイト |
| フロントエンド | `https://www.yoursite.com` | wwwサブドメイン |
| バックエンドAPI | `https://api.yoursite.com` | APIサーバー |
| ヘルスチェック | `https://api.yoursite.com/api/health` | サーバー状態 |

---

## ✅ セットアップ完了チェックリスト

### ローカル環境
- [ ] Node.jsインストール完了
- [ ] MEGA.ioアカウント作成
- [ ] Stripeアカウント作成（テストモード）
- [ ] Gmailアプリパスワード取得
- [ ] .envファイル設定完了
- [ ] サーバー起動成功
- [ ] ブラウザで表示確認
- [ ] テスト応募成功

### 本番環境
- [ ] GitHubリポジトリ作成
- [ ] Renderアカウント作成
- [ ] バックエンドデプロイ完了
- [ ] フロントエンドデプロイ完了
- [ ] Stripe本番キー設定
- [ ] 環境変数すべて設定
- [ ] デプロイ成功確認

### ドメイン接続
- [ ] ValueDomainでDNS設定
- [ ] Renderでカスタムドメイン追加
- [ ] SSL証明書発行完了
- [ ] HTTPSアクセス成功
- [ ] 全機能動作確認
- [ ] 本番テスト完了

---

## 🎯 次のステップ

1. **Google Analyticsの設定**
   - アクセス解析を開始

2. **バックアップ設定**
   - MEGA.ioのファイルを定期的にダウンロード

3. **パフォーマンス監視**
   - [Uptime Robot](https://uptimerobot.com/)で稼働監視

4. **セキュリティ強化**
   - 定期的なパッケージアップデート
   - ログの監視

---

## 💰 コスト見積もり

### 完全無料プラン
- Render: 無料
- MEGA.io: 20GB無料
- Stripe: 取引手数料のみ（3.6%）
- Gmail: 無料

**合計**: 月額 ¥0 + 取引手数料

### 推奨プラン
- Render: 無料
- MEGA.io Pro: 400GB €4.99/月（約¥750）
- Stripe: 取引手数料のみ
- ドメイン（ValueDomain): ¥1,000/年

**合計**: 月額 約¥750円 + ドメイン年額

---

## 📞 サポート

問題が発生した場合：

1. **ログを確認**: ターミナルのエラーメッセージ
2. **環境変数を確認**: `.env`ファイルの内容
3. **再起動を試す**: サーバーを停止して再起動
4. **パッケージ再インストール**:
   ```bash
   rm -rf node_modules
   npm install
   ```

---

**最終更新**: 2025年10月18日
**プロジェクト**: JAPAN AI SHORT FILM COMPETITION
**バージョン**: 2.0 - Stripe専用版

© 2025 JAPAN AI SHORT FILM COMPETITION. All rights reserved.
