# 🧪 ローカルホストでテストする方法

このガイドに従えば、**5分以内**にローカル環境でサイトをテストできます。

---

## 📋 前提条件

- [x] Node.jsがインストール済み
- [ ] MEGA.ioアカウント
- [ ] Stripeアカウント（テストモード）
- [ ] Gmailアカウント（2段階認証有効）

---

## ステップ1: 環境変数ファイルの作成（2分）

### 1-1. .envファイルを作成

コマンドプロンプトで以下を実行：

```bash
cd C:\Users\user\Desktop\jaisfc2
copy .env.example .env
```

### 1-2. .envファイルを編集

メモ帳で `C:\Users\user\Desktop\jaisfc2\.env` を開き、以下を設定：

```env
# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000

# MEGA.io Configuration
MEGA_EMAIL=あなたのMEGAメールアドレス
MEGA_PASSWORD=あなたのMEGAパスワード

# Stripe Configuration（テストモード）
STRIPE_SECRET_KEY=sk_test_51xxxxx（Stripeダッシュボードから取得）
STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx（Stripeダッシュボードから取得）

# Email Configuration (Gmail)
EMAIL_USER=あなたのGmailアドレス
EMAIL_PASSWORD=あなたのGmailアプリパスワード（16桁）
```

---

## ステップ2: 必要なアカウントを準備（テスト用）

### 2-1. MEGA.ioアカウント

1. [MEGA.io](https://mega.io/)でアカウント作成
2. メールアドレスとパスワードを`.env`に設定

### 2-2. Stripeアカウント（テストモード）

1. [Stripe](https://dashboard.stripe.com/register)でアカウント作成
2. ダッシュボードで「**テストモード**」になっていることを確認（左上トグル）
3. 「開発者」→「APIキー」でテストキーを取得：
   - **公開可能キー**: `pk_test_51...`
   - **シークレットキー**: `sk_test_51...`（「表示」をクリック）
4. `.env`に貼り付け

### 2-3. Gmailアプリパスワード

1. Gmailで2段階認証を有効化
2. [アプリパスワード](https://myaccount.google.com/apppasswords)で新しいパスワードを生成
3. 16桁のパスワード（スペースなし）を`.env`に貼り付け

---

## ステップ3: 依存パッケージのインストール（1分）

```bash
cd C:\Users\user\Desktop\jaisfc2
npm install
```

---

## ステップ4: サーバー起動（1分）

### 4-1. バックエンドサーバーを起動

**ターミナル1**（新しいコマンドプロンプトウィンドウ）：

```bash
cd C:\Users\user\Desktop\jaisfc2
npm run server
```

**以下が表示されればOK**:
```
Server is running on port 3001
MEGA.io storage initialized successfully
Cloud Storage: MEGA.io
Payment Methods: Stripe (Credit Card, Apple Pay, Google Pay)
```

### 4-2. フロントエンドサーバーを起動

**ターミナル2**（別の新しいコマンドプロンプトウィンドウ）：

```bash
cd C:\Users\user\Desktop\jaisfc2
npm run dev
```

**以下が表示されればOK**:
```
VITE ready in XXXms
Local: http://localhost:3000
```

---

## ステップ5: ブラウザでテスト（1分）

1. ブラウザで **http://localhost:3000** を開く

2. **トップページが表示されることを確認**:
   - ヘッダー「Japan AI Short Film Competition」
   - 支払いアイコン: クレジット、Apple Pay、Google Pay

3. **テスト応募を実施**:

### 応募フォーム入力
```
メールアドレス: test@example.com
お名前: テスト太郎
作品タイトル: テスト作品
動画ファイル: 任意の動画ファイル（小さいファイルでOK）
```

### アップロード進捗を確認
- プログレスバーが表示される
- 「アップロード中...」→「処理中...」→「完了」

### Stripe支払いページに遷移
- `/payment` ページが表示される
- 支払い方法を選択できる

### テストカードで支払い
**Stripeテストカード**:
- カード番号: `4242 4242 4242 4242`
- 有効期限: `12/34`（任意の未来の日付）
- CVC: `123`（任意の3桁）
- 郵便番号: `123-4567`

### 成功ページを確認
- `/success` ページに遷移
- 「応募完了」メッセージが表示される

### 確認メールをチェック
- 設定したGmailアドレスに確認メールが届く
- MEGA.ioのリンクが含まれている

---

## ✅ 動作確認チェックリスト

- [ ] サーバーが起動した（port 3001）
- [ ] フロントエンドが起動した（port 3000）
- [ ] トップページが表示される
- [ ] 支払いアイコンが表示される（クレジット、Apple Pay、Google Pay）
- [ ] PayPalアイコンが**表示されない**
- [ ] 応募フォームが動作する
- [ ] ファイルアップロードが成功する
- [ ] `/payment` ページに遷移する
- [ ] Stripe支払いフォームが表示される
- [ ] テストカードで支払いができる
- [ ] `/success` ページに遷移する
- [ ] 確認メールが届く
- [ ] MEGA.ioにファイルがアップロードされている

---

## 🐛 トラブルシューティング

### ❌ サーバーが起動しない

**エラー**: `MEGA_EMAIL is not defined`

**解決**:
```bash
# .envファイルが存在するか確認
dir .env

# なければ作成
copy .env.example .env

# .envファイルを編集してMEGA.ioの認証情報を設定
```

---

### ❌ MEGA.ioに接続できない

**エラー**: `Failed to initialize MEGA.io storage`

**解決**:
1. MEGA.ioのメールアドレスとパスワードが正しいか確認
2. MEGA.ioアカウントが有効か確認
3. インターネット接続を確認

---

### ❌ Stripe支払いフォームが表示されない

**エラー**: ページが真っ白、またはエラーメッセージ

**解決**:
1. `.env`の`STRIPE_PUBLISHABLE_KEY`が設定されているか確認
2. フロントエンドの環境変数を設定:
   ```bash
   # プロジェクトルートに .env.local を作成
   echo VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key > .env.local

   # サーバーを再起動
   # Ctrl+C で停止 → npm run dev で再起動
   ```

---

### ❌ 支払いが完了しない

**エラー**: 「支払いの確認に失敗しました」

**解決**:
1. Stripeダッシュボードで「テストモード」になっているか確認
2. `STRIPE_SECRET_KEY`が`sk_test_`で始まっているか確認
3. バックエンドのログを確認（ターミナル1）

---

### ❌ メールが届かない

**解決**:
1. Gmailアプリパスワードが正しいか確認（16桁、スペースなし）
2. Gmailの2段階認証が有効か確認
3. 迷惑メールフォルダを確認
4. バックエンドのログでエラーを確認

---

## 🔧 環境変数の確認方法

サーバー起動時のログで確認できます：

```bash
# ターミナル1のログを確認
Server is running on port 3001
Deadline: 2025-11-30T23:59:59.000Z
Cloud Storage: MEGA.io
Payment Methods: Stripe (Credit Card, Apple Pay, Google Pay)
MEGA.io storage initialized successfully  ← これが表示されればOK
```

---

## 🔄 サーバーを停止・再起動する方法

### 停止
両方のターミナルで `Ctrl + C` を押す

### 再起動
```bash
# ターミナル1（バックエンド）
npm run server

# ターミナル2（フロントエンド）
npm run dev
```

---

## 📊 MEGA.ioでアップロードを確認

1. [MEGA.io](https://mega.io/)にログイン
2. フォルダ一覧で `JAISFC_Submissions` を確認
3. アップロードしたファイルが存在することを確認

---

## 🎯 テストが完了したら

### 本番環境へのデプロイ準備

1. ✅ ローカル環境で正常に動作することを確認
2. ✅ すべての機能をテスト
3. ✅ `PRODUCTION_DEPLOY.md`を参照してデプロイ

### Gitにコミット

```bash
cd C:\Users\user\Desktop\jaisfc2

git add .
git commit -m "Remove PayPal, add Stripe payment with Apple Pay and Google Pay support"
git push
```

---

## ⚡ クイックコマンド集

```bash
# プロジェクトに移動
cd C:\Users\user\Desktop\jaisfc2

# .envファイル作成
copy .env.example .env

# パッケージインストール
npm install

# バックエンド起動（ターミナル1）
npm run server

# フロントエンド起動（ターミナル2）
npm run dev

# ブラウザで開く
start http://localhost:3000
```

---

## 📞 サポート

問題が解決しない場合：

1. **ログを確認**: ターミナル1とターミナル2のエラーメッセージ
2. **環境変数を確認**: `.env`ファイルの内容
3. **パッケージを再インストール**:
   ```bash
   rm -rf node_modules
   npm install
   ```

---

## ✅ 完了！

ローカル環境でのテストが完了しました！

**次のステップ**:
- 本番環境へのデプロイ: `PRODUCTION_DEPLOY.md`
- ValueDomainの設定: `VALUEDOMAIN_SETUP.md`
- 改善内容の確認: `IMPROVEMENTS.md`

---

**作成日**: 2025年10月18日
**対象**: jaisfc2 - Stripe専用版

© 2025 Japan AI Short Film Competition. All rights reserved.
