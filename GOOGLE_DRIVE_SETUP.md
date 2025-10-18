# Google Drive API セットアップガイド

このガイドでは、Google Drive APIを使用してファイルをアップロードするための設定方法を説明します。

## ステップ 1: Google Cloud Projectの作成

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクト名を入力（例: "JAISFC"）

## ステップ 2: Google Drive APIの有効化

1. 左側のメニューから「APIとサービス」→「ライブラリ」を選択
2. "Google Drive API"を検索
3. 「有効にする」をクリック

## ステップ 3: OAuth 2.0認証情報の作成

1. 「APIとサービス」→「認証情報」を選択
2. 「認証情報を作成」→「OAuthクライアントID」を選択
3. アプリケーションの種類: 「ウェブアプリケーション」
4. 名前: 任意の名前を入力
5. 承認済みのリダイレクトURI: `http://localhost:3001/oauth2callback` を追加
6. 「作成」をクリック
7. クライアントIDとクライアントシークレットをコピーして保存

## ステップ 4: Refresh Tokenの取得

### 方法1: OAuth Playgroundを使用（推奨）

1. [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)にアクセス
2. 右上の歯車アイコンをクリック
3. "Use your own OAuth credentials"にチェック
4. クライアントIDとクライアントシークレットを入力
5. 左側のリストから"Drive API v3"を選択
6. "https://www.googleapis.com/auth/drive.file"にチェック
7. "Authorize APIs"をクリック
8. Googleアカウントでログインして承認
9. "Exchange authorization code for tokens"をクリック
10. "Refresh token"をコピー

### 方法2: コマンドラインを使用

以下のスクリプトを`get-refresh-token.js`として保存:

\`\`\`javascript
import { google } from 'googleapis';
import readline from 'readline';

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'http://localhost:3001/oauth2callback'
);

const scopes = ['https://www.googleapis.com/auth/drive.file'];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('次のURLにアクセスしてください:');
console.log(url);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\\n認証コードを入力してください: ', async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('\\nRefresh Token:');
  console.log(tokens.refresh_token);
  rl.close();
});
\`\`\`

実行:
\`\`\`bash
node get-refresh-token.js
\`\`\`

## ステップ 5: 環境変数の設定

`.env`ファイルを作成し、以下の情報を入力:

\`\`\`env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/oauth2callback
GOOGLE_REFRESH_TOKEN=your_refresh_token
\`\`\`

## ステップ 6: テスト

サーバーを起動してヘルスチェック:

\`\`\`bash
npm run server
\`\`\`

別のターミナルで:

\`\`\`bash
curl http://localhost:3001/api/health
\`\`\`

ストレージ情報が表示されれば成功です！

## トラブルシューティング

### "insufficient permissions" エラー

- OAuth Playgroundで正しいスコープ（drive.file）を選択したか確認
- Refresh Tokenを再取得してください

### "invalid_grant" エラー

- Refresh Tokenの有効期限が切れている可能性があります
- 新しいRefresh Tokenを取得してください

### "Storage quota exceeded" エラー

- Google Driveの無料プラン: 15GB
- 容量を確認: [Google Drive Storage](https://drive.google.com/drive/quota)
- 不要なファイルを削除するか、Google Oneにアップグレード

## セキュリティ注意事項

1. `.env`ファイルは**絶対に**Gitにコミットしないでください
2. クライアントシークレットとRefresh Tokenは秘密情報です
3. 本番環境では環境変数を安全に管理してください
4. 定期的にアクセス権限を見直してください

## 容量管理

サーバーは以下の機能を実装しています:

- アップロード前に自動でストレージ容量をチェック
- 残り容量が100MB未満の場合はアップロードを拒否
- 使用率が90%を超えると警告ログを出力
- ヘルスチェックエンドポイントで容量状況を確認可能

定期的に容量を確認し、必要に応じてファイルを整理してください。
