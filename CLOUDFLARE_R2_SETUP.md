# Cloudflare R2 セットアップガイド

このガイドでは、Cloudflare R2を使用して最大500MBの動画ファイルをアップロードするための設定方法を説明します。

## Cloudflare R2とは

Cloudflare R2は、S3互換のオブジェクトストレージサービスです。

**無料プランの特徴:**
- ストレージ: 10GB/月（無料）
- ダウンロード帯域: 無制限（無料）
- アップロード: 100万リクエスト/月（無料）
- ファイルサイズ制限: なし（500MB以上も対応可能）

## ステップ 1: Cloudflareアカウントの作成

1. [Cloudflare](https://dash.cloudflare.com/)にアクセス
2. アカウントを作成（メールアドレス認証が必要）
3. ログイン

## ステップ 2: R2バケットの作成

1. Cloudflareダッシュボードで、左側のメニューから「R2」を選択
2. 「Create bucket」をクリック
3. バケット名を入力（例: `japan-ai-film-competition`）
   - バケット名は一意である必要があります
   - 小文字、数字、ハイフンのみ使用可能
4. リージョンを選択（推奨: `Asia Pacific (APAC)` - 日本に近い）
5. 「Create bucket」をクリック

## ステップ 3: R2 APIトークンの作成

1. R2ダッシュボードで「Manage R2 API Tokens」をクリック
2. 「Create API token」をクリック
3. トークン名を入力（例: `jaisfc-production`）
4. Permissionsで「Object Read & Write」を選択
5. 「Create API token」をクリック
6. 以下の情報をコピーして安全に保存:
   - Access Key ID
   - Secret Access Key
   - Endpoint URL (例: `https://<account_id>.r2.cloudflarestorage.com`)

**⚠️ 重要:** Secret Access Keyは一度しか表示されません。必ずコピーして保存してください。

## ステップ 4: 環境変数の設定

### ローカル開発環境

プロジェクトルートに`.env`ファイルを作成し、以下の情報を入力:

```env
# Cloudflare R2 Configuration
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=japan-ai-film-competition

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 本番環境（Render.com）

1. Renderダッシュボードでウェブサービスを選択
2. 「Environment」タブを開く
3. 以下の環境変数を追加:

| Key | Value |
|-----|-------|
| `R2_ENDPOINT` | `https://<account_id>.r2.cloudflarestorage.com` |
| `R2_ACCESS_KEY_ID` | `your_access_key_id` |
| `R2_SECRET_ACCESS_KEY` | `your_secret_access_key` |
| `R2_BUCKET_NAME` | `japan-ai-film-competition` |

## ステップ 5: カスタムドメインの設定（オプション）

R2バケットにカスタムドメインを設定すると、より高速なダウンロードが可能になります。

1. R2バケットの設定画面を開く
2. 「Settings」タブを選択
3. 「Public Access」セクションで「Add Domain」をクリック
4. ドメイン名を入力（例: `files.yoursite.com`）
5. DNSレコードを設定:
   - Type: `CNAME`
   - Name: `files`
   - Value: 表示されたR2のドメイン

## ステップ 6: テスト

サーバーを起動してヘルスチェック:

```bash
# 依存関係のインストール
npm install

# サーバーの起動
npm run server
```

別のターミナルで:

```bash
curl http://localhost:3001/api/health
```

以下のような出力が表示されれば成功:

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

## トラブルシューティング

### "cloudStorageStatus": "not configured" エラー

環境変数が正しく設定されているか確認:

```bash
# 環境変数の確認（ローカル環境）
cat .env

# 値が設定されているか確認
echo $R2_ENDPOINT
```

### "UPLOAD_FAILED" エラー

1. R2バケット名が正しいか確認
2. APIトークンの権限が「Object Read & Write」になっているか確認
3. Endpointが正しいか確認（`https://`で始まる必要があります）

### アップロードは成功するが、動画が再生できない

1. presigned URLの有効期限を確認（現在は365日に設定）
2. R2バケットのPublic Accessを確認

## セキュリティ注意事項

1. `.env`ファイルは**絶対に**Gitにコミットしないでください
2. Secret Access Keyは秘密情報です。誰とも共有しないでください
3. 本番環境では環境変数を安全に管理してください
4. 定期的にAPIトークンを更新してください
5. 不要になったAPIトークンは削除してください

## 容量管理

無料プランの制限:
- ストレージ: 10GB/月
- ファイルサイズ: 最大500MB（設定により変更可能）
- 応募数の目安: 約20本の500MB動画

容量を超えた場合:
1. Cloudflareダッシュボードで使用状況を確認
2. 古いファイルを削除
3. 有料プランへのアップグレードを検討（$0.015/GB/月から）

## Cloudinary からの移行完了

以前はCloudinaryを使用していましたが、以下の理由でCloudflare R2に移行しました:

- **ファイルサイズ制限**: Cloudinary 100MB → R2 500MB
- **帯域幅**: Cloudinaryは制限あり → R2は無料で無制限
- **コスト**: より経済的
- **パフォーマンス**: Cloudflareのグローバルネットワークで高速配信

移行作業は完了しています。Cloudinaryの依存関係は削除済みです。
