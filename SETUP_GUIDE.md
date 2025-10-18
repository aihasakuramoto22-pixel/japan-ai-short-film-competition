# 🚀 超初心者向け セットアップガイド

このガイドに従えば、**プログラミング未経験でも30分**でサイトを起動できます！

---

## 📋 目次
1. [準備するもの](#1-準備するもの)
2. [Node.jsをインストール](#2-nodejsをインストール)
3. [プロジェクトのセットアップ](#3-プロジェクトのセットアップ)
4. [各サービスの登録とキー取得](#4-各サービスの登録とキー取得)
5. [サーバーの起動](#5-サーバーの起動)
6. [よくあるエラー](#6-よくあるエラー)

---

## 1. 準備するもの

✅ パソコン（Windows / Mac / Linux）
✅ インターネット接続
✅ メールアドレス（Gmail推奨）
✅ 約30分の時間

---

## 2. Node.jsをインストール

### 2-1. Node.jsって何？
JavaScriptを動かすために必要なソフトウェアです。無料で使えます。

### 2-2. インストール手順

#### Windowsの場合

1. [https://nodejs.org/](https://nodejs.org/) を開く
2. 緑色の「**LTS（推奨版）**」ボタンをクリック
3. ダウンロードした「node-v〇〇-x64.msi」をダブルクリック
4. すべて「次へ」で進む（設定は変えなくてOK）
5. インストール完了！

#### Macの場合

1. [https://nodejs.org/](https://nodejs.org/) を開く
2. 緑色の「**LTS（推奨版）**」ボタンをクリック
3. ダウンロードした「node-v〇〇.pkg」をダブルクリック
4. すべて「続ける」で進む
5. インストール完了！

### 2-3. 確認方法

1. **コマンドプロンプト**（Windows）または **ターミナル**（Mac）を開く
   - Windows: `Windows キー` を押して「cmd」と入力して Enter
   - Mac: `Command + Space` で「ターミナル」と入力して Enter

2. 以下を入力して Enter キーを押す：
```bash
node --version
```

3. `v18.〇〇.〇` のような表示が出ればOK！

---

## 3. プロジェクトのセットアップ

### 3-1. プロジェクトフォルダに移動

コマンドプロンプト（またはターミナル）で以下を入力：

#### Windowsの場合
```bash
cd C:\Users\user\Desktop\jaisfc2
```

#### Macの場合
```bash
cd ~/Desktop/jaisfc2
```

**💡 ヒント**: フォルダをドラッグ&ドロップすれば自動で入力されます！

### 3-2. 必要なパッケージをインストール

以下のコマンドを入力して Enter：
```bash
npm install
```

**待ち時間**: 5〜10分（コーヒーブレイク☕）

画面に色々な文字が流れますが、**エラーが出なければOK**です！

### 3-3. 設定ファイルを作成

#### Windowsの場合
```bash
copy .env.example .env
```

#### Mac/Linuxの場合
```bash
cp .env.example .env
```

「1 個のファイルをコピーしました」と表示されればOK！

---

## 4. 各サービスの登録とキー取得

ここが一番重要！でも、画像付きで説明するので大丈夫です。

### 4-1. InfiniCloud（動画保存用）の設定 - 5分

#### 手順

**ステップ1**: Dropboxアカウントを作成
1. [https://www.dropbox.com/](https://www.dropbox.com/) にアクセス
2. 「無料で登録」をクリック
3. メールアドレスとパスワードを入力して登録

**ステップ2**: 開発者アプリを作成
1. [https://www.dropbox.com/developers/apps](https://www.dropbox.com/developers/apps) にアクセス
2. 「**Create app**」ボタンをクリック
3. 以下を選択：
   ```
   Choose an API: Scoped access
   Choose the type of access: Full Dropbox
   Name your app: JAISFC-Storage（好きな名前でOK）
   ```
4. 「**Create app**」をクリック

**ステップ3**: 権限を設定
1. 「**Permissions**」タブをクリック
2. 以下の3つにチェック：
   - ☑ `files.content.write`
   - ☑ `files.content.read`
   - ☑ `sharing.write`
3. 一番下の「**Submit**」ボタンをクリック

**ステップ4**: アクセストークンを取得
1. 「**Settings**」タブに戻る
2. 下にスクロールして「**Generated access token**」を見つける
3. 「**Generate**」ボタンをクリック
4. 表示された長い文字列（トークン）をコピー
   ```
   例: sl.B〇〇〇〇〇〇〇〇〇〇〇〇〇〇
   ```

**ステップ5**: .envファイルに貼り付け
1. メモ帳で `C:\Users\user\Desktop\jaisfc2\.env` を開く
2. 以下の行を探す：
   ```
   INFINICLOUD_ACCESS_TOKEN=your_dropbox_access_token_here
   ```
3. `your_dropbox_access_token_here` を削除して、コピーしたトークンを貼り付け：
   ```
   INFINICLOUD_ACCESS_TOKEN=sl.B〇〇〇〇〇〇〇〇〇〇〇〇〇〇
   ```
4. 保存して閉じる

---

### 4-2. PayPal（支払い処理用）の設定 - 5分

#### 手順

**ステップ1**: PayPal開発者アカウントを作成
1. [https://developer.paypal.com/](https://developer.paypal.com/) にアクセス
2. 「**Log in to Dashboard**」をクリック
3. PayPalアカウントでログイン（なければ無料で作成）

**ステップ2**: サンドボックスアプリを作成
1. 左メニューの「**Apps & Credentials**」をクリック
2. 上の「**Sandbox**」タブを選択（テスト環境）
3. 「**Create App**」ボタンをクリック
4. App Name に「JAISFC-Payment」と入力
5. 「**Create App**」をクリック

**ステップ3**: キーをコピー
1. 「**Client ID**」と書かれた長い文字列をコピー
   ```
   例: AXx〇〇〇〇〇〇〇〇〇〇〇〇〇〇
   ```
2. 「**Secret**」の「Show」をクリックして表示される文字列もコピー
   ```
   例: EL〇〇〇〇〇〇〇〇〇〇〇〇〇〇
   ```

**ステップ4**: .envファイルに貼り付け
1. `.env`ファイルを開く
2. 以下の2行を編集：
   ```
   PAYPAL_CLIENT_ID=AXx〇〇〇〇〇〇〇〇〇〇〇〇〇〇
   PAYPAL_CLIENT_SECRET=EL〇〇〇〇〇〇〇〇〇〇〇〇〇〇
   ```
3. 保存

---

### 4-3. Stripe（Apple Pay用）の設定 - 3分

#### 手順

**ステップ1**: Stripeアカウントを作成
1. [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register) にアクセス
2. メールアドレスを入力して「Create account」
3. メールの確認リンクをクリック

**ステップ2**: テストキーを取得
1. ダッシュボード左メニューの「**開発者**」→「**APIキー**」をクリック
2. 「**シークレットキー**」の右側にある「**表示**」をクリック
3. `sk_test_〇〇〇〇〇〇` で始まる文字列をコピー

**ステップ3**: .envファイルに貼り付け
1. `.env`ファイルを開く
2. 以下の行を編集：
   ```
   STRIPE_SECRET_KEY=sk_test_〇〇〇〇〇〇〇〇〇〇〇〇〇〇
   ```
3. 保存

---

### 4-4. Gmail（メール送信用）の設定 - 5分

#### 手順

**ステップ1**: 2段階認証を有効化
1. [https://myaccount.google.com/security](https://myaccount.google.com/security) にアクセス
2. 「Google へのログイン」セクションの「2段階認証プロセス」をクリック
3. 画面の指示に従って設定（スマホが必要です）

**ステップ2**: アプリパスワードを生成
1. [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) にアクセス
2. 「アプリを選択」→「その他（名前を入力）」
3. 「JAISFC」と入力して「生成」をクリック
4. 表示される **16桁のパスワード** をコピー（スペースは不要）
   ```
   例: abcd efgh ijkl mnop → abcdefghijklmnop
   ```

**ステップ3**: .envファイルに貼り付け
1. `.env`ファイルを開く
2. 以下の2行を編集：
   ```
   EMAIL_USER=あなたのGmailアドレス@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
3. 保存

---

## 5. サーバーの起動

あと少しで完成です！🎉

### 5-1. バックエンドサーバーを起動

**ターミナル1**を開いて、以下を入力：

```bash
cd C:\Users\user\Desktop\jaisfc2
npm run server
```

✅ **成功のサイン**:
```
Server is running on port 3001
Cloud Storage: InfiniCloud (Dropbox)
```

❌ **エラーが出たら**: [6. よくあるエラー](#6-よくあるエラー) を見てください

---

### 5-2. フロントエンドサーバーを起動

**新しいターミナル2**を開いて、以下を入力：

#### Windowsの場合
1. もう一度コマンドプロンプトを開く
2. 以下を入力：
```bash
cd C:\Users\user\Desktop\jaisfc2
npm run dev
```

#### Macの場合
1. ターミナルで「Command + T」を押す（新しいタブが開く）
2. 以下を入力：
```bash
cd ~/Desktop/jaisfc2
npm run dev
```

✅ **成功のサイン**:
```
  VITE v〇.〇.〇  ready in 〇〇〇 ms

  ➜  Local:   http://localhost:3000/
```

---

### 5-3. ブラウザで確認

1. ブラウザ（Chrome、Safari、Edgeなど）を開く
2. アドレスバーに以下を入力：
```
http://localhost:3000
```

3. **サイトが表示されれば完成です！**🎉

---

## 6. よくあるエラー

### ❌ エラー1: `npm: command not found`

**原因**: Node.jsがインストールされていない

**解決方法**:
1. [2. Node.jsをインストール](#2-nodejsをインストール) をもう一度実行
2. インストール後、ターミナルを**一度閉じて開き直す**

---

### ❌ エラー2: `Port 3000 is already in use`

**原因**: ポート3000が既に使用されている

**解決方法 - Windows**:
```bash
netstat -ano | findstr :3000
```
表示されたプロセスIDをメモして：
```bash
taskkill /PID [プロセスID] /F
```

**解決方法 - Mac**:
```bash
lsof -ti:3000 | xargs kill -9
```

---

### ❌ エラー3: `INFINICLOUD_ACCESS_TOKEN is not defined`

**原因**: 環境変数が正しく設定されていない

**解決方法**:
1. `.env` ファイルが `jaisfc2` フォルダ直下にあるか確認
2. `.env` を開いて以下を確認：
   - `INFINICLOUD_ACCESS_TOKEN=` の後にトークンが入っているか
   - 余計なスペースがないか
   - ファイルを保存したか
3. サーバーを再起動（Ctrl+C で止めて、もう一度 `npm run server`）

---

### ❌ エラー4: メールが送信されない

**原因**: Gmailの設定が間違っている

**解決方法**:
1. `.env` の `EMAIL_PASSWORD` を確認
   - 16桁（スペースなし）になっているか
   - 普通のGmailパスワードではなく「アプリパスワード」か
2. 2段階認証が有効になっているか確認

---

### ❌ エラー5: 動画がアップロードできない

**原因**: InfiniCloudの権限が不足

**解決方法**:
1. [Dropbox App Console](https://www.dropbox.com/developers/apps) にアクセス
2. 作成したアプリをクリック
3. 「Permissions」タブで以下がチェックされているか確認：
   - ☑ files.content.write
   - ☑ files.content.read
   - ☑ sharing.write
4. 「Submit」をクリック
5. 新しいアクセストークンを生成し直す

---

## 🎯 チェックリスト

すべて完了したか確認しましょう！

- [ ] Node.jsをインストールした
- [ ] `npm install` を実行した
- [ ] `.env` ファイルを作成した
- [ ] InfiniCloud (Dropbox) のトークンを設定した
- [ ] PayPalのClient IDとSecretを設定した
- [ ] StripeのSecretキーを設定した
- [ ] Gmailのアプリパスワードを設定した
- [ ] バックエンドサーバーが起動している (port 3001)
- [ ] フロントエンドサーバーが起動している (port 3000)
- [ ] ブラウザで http://localhost:3000 が開ける

---

## 📞 サポート

それでも解決しない場合:

1. **エラーメッセージをスクリーンショット**
2. **どこまで進んだか**をメモ
3. contact@jaisfc.com にメール

---

## 🎓 次のステップ

### サイトをカスタマイズしたい場合

- `src/components/AIFilmCompetition.jsx` - メインページ
- `src/components/AboutPage.jsx` - 説明ページ
- `tailwind.config.js` - デザイン設定

### 本番環境にデプロイしたい場合

1. `.env` の設定を本番用に変更
2. `PAYPAL_MODE=live` に変更
3. Stripeの本番キーを使用
4. Vercel、Netlify、Herokuなどにデプロイ

---

## 📚 用語集

| 用語 | 意味 |
|------|------|
| Node.js | JavaScriptを動かすソフトウェア |
| npm | パッケージ（ライブラリ）を管理するツール |
| ターミナル/コマンドプロンプト | 文字でコンピュータを操作する画面 |
| ポート | コンピュータの通信用の番号（3000, 3001など） |
| API | 他のサービスと連携するための仕組み |
| トークン/キー | サービスにアクセスするためのパスワード |
| .env | 秘密情報を保存するファイル |

---

**制作時間**: 合計30分
**難易度**: ⭐⭐☆☆☆（初心者OK）

頑張ってください！🚀
