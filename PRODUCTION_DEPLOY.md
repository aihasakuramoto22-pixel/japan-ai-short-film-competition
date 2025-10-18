# 🚀 本番環境デプロイガイド - 初心者向け

このガイドは**完全初心者でも30分以内**に本番環境へデプロイできるよう設計されています。

---

## 📋 デプロイ前のチェックリスト

- [ ] MEGA.ioアカウントを作成済み
- [ ] PayPalアカウント（本番用）を作成済み
- [ ] Stripeアカウント（本番用）を作成済み
- [ ] Gmailアカウントを作成済み
- [ ] デプロイ先のサーバー（Render/Railway/Vercel等）のアカウントを作成済み

---

## 方法1: Renderへのデプロイ（推奨・完全無料）

### なぜRenderか？
- ✅ 完全無料プランあり
- ✅ 設定が簡単
- ✅ 自動デプロイ対応
- ✅ HTTPSが自動で有効

### ステップ1: Gitリポジトリの準備（10分）

1. **GitHubアカウントを作成**
   - [GitHub](https://github.com/)にアクセスしてアカウント作成

2. **プロジェクトをGitHubにアップロード**
   ```bash
   cd C:\Users\user\Desktop\jaisfc2
   git init
   git add .
   git commit -m "Initial commit for production deployment"
   ```

3. **GitHubに新しいリポジトリを作成**
   - GitHubで「New repository」をクリック
   - リポジトリ名: `jaisfc-production`
   - Public または Private を選択
   - 「Create repository」をクリック

4. **ローカルからGitHubへプッシュ**
   ```bash
   git remote add origin https://github.com/あなたのユーザー名/jaisfc-production.git
   git branch -M main
   git push -u origin main
   ```

### ステップ2: Renderでのセットアップ（15分）

1. **Renderアカウント作成**
   - [Render](https://render.com/)にアクセス
   - 「Get Started for Free」をクリック
   - GitHubアカウントで連携

2. **新しいWebサービスを作成**
   - ダッシュボードで「New +」→「Web Service」をクリック
   - GitHubリポジトリ `jaisfc-production` を選択
   - 以下を設定：
     ```
     Name: jaisfc-app
     Environment: Node
     Region: Singapore（日本に近い）
     Branch: main
     Build Command: npm install && npm run build
     Start Command: npm run server
     Instance Type: Free
     ```

3. **環境変数を設定**
   - 「Environment」タブをクリック
   - 以下の環境変数を追加：

   ```
   PORT=3001
   FRONTEND_URL=https://jaisfc-app.onrender.com

   MEGA_EMAIL=あなたのMEGAメールアドレス
   MEGA_PASSWORD=あなたのMEGAパスワード

   PAYPAL_MODE=live
   PAYPAL_CLIENT_ID=本番用PayPal Client ID
   PAYPAL_CLIENT_SECRET=本番用PayPal Secret

   STRIPE_SECRET_KEY=本番用Stripe Secret Key
   STRIPE_PUBLISHABLE_KEY=本番用Stripe Publishable Key

   EMAIL_USER=あなたのGmailアドレス
   EMAIL_PASSWORD=Gmailアプリパスワード
   ```

4. **デプロイ開始**
   - 「Create Web Service」をクリック
   - 自動でビルドとデプロイが開始されます（5-10分）

5. **フロントエンドのデプロイ**
   - Renderで「New +」→「Static Site」をクリック
   - 同じGitHubリポジトリを選択
   - 以下を設定：
     ```
     Name: jaisfc-frontend
     Build Command: npm install && npm run build
     Publish Directory: dist
     ```
   - 「Advanced」→「Environment Variables」で以下を追加：
     ```
     VITE_API_URL=https://jaisfc-app.onrender.com/api
     ```

### ステップ3: 動作確認（5分）

1. **サービスのURLを確認**
   - Renderダッシュボードで `jaisfc-frontend` のURLをコピー
   - 例: `https://jaisfc-frontend.onrender.com`

2. **ブラウザでアクセス**
   - URLをブラウザで開く
   - フォームが表示されることを確認

3. **テスト応募を実施**
   - テストファイルをアップロード
   - PayPalまたはStripeで支払い（テストカード使用可能）
   - 確認メールが届くことを確認

---

## 方法2: Railwayへのデプロイ（簡単・$5/月）

### ステップ1: Railwayアカウント作成

1. [Railway](https://railway.app/)にアクセス
2. GitHubアカウントで連携
3. 新しいプロジェクトを作成

### ステップ2: デプロイ設定

1. **GitHubリポジトリを接続**
   - 「Deploy from GitHub repo」を選択
   - `jaisfc-production` を選択

2. **環境変数を設定**
   - 「Variables」タブで上記の環境変数を追加

3. **カスタムドメイン設定（オプション）**
   - 「Settings」→「Domains」で独自ドメインを設定可能

---

## 方法3: VPSへのデプロイ（上級者向け）

### 推奨VPS
- DigitalOcean ($6/月)
- Linode ($5/月)
- AWS Lightsail ($3.5/月)

### 基本的な手順

1. **VPSにSSH接続**
   ```bash
   ssh root@あなたのサーバーIP
   ```

2. **Node.jsとnpmをインストール**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **PM2をインストール（プロセス管理）**
   ```bash
   npm install -g pm2
   ```

4. **プロジェクトをクローン**
   ```bash
   git clone https://github.com/あなたのユーザー名/jaisfc-production.git
   cd jaisfc-production
   npm install
   ```

5. **環境変数を設定**
   ```bash
   nano .env
   # 環境変数を貼り付け
   ```

6. **ビルド実行**
   ```bash
   npm run build
   ```

7. **PM2でサーバー起動**
   ```bash
   pm2 start server.js --name jaisfc-server
   pm2 startup
   pm2 save
   ```

8. **Nginxのセットアップ（リバースプロキシ）**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/jaisfc
   ```

   以下を設定：
   ```nginx
   server {
       listen 80;
       server_name あなたのドメイン.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/jaisfc /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **SSL証明書の設定（Let's Encrypt）**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d あなたのドメイン.com
   ```

---

## 🔒 本番環境セキュリティチェックリスト

デプロイ後、以下を確認してください：

- [ ] `.env`ファイルがGitHubにコミットされていない（`.gitignore`に追加済み）
- [ ] HTTPSが有効になっている
- [ ] PayPalが`live`モードになっている
- [ ] Stripeが本番キーを使用している
- [ ] MEGA.ioのパスワードが強力である
- [ ] Gmailの2段階認証が有効
- [ ] レート制限が正しく動作している
- [ ] CSPヘッダーが設定されている

---

## 📊 本番環境のモニタリング

### ログの確認

**Render:**
- ダッシュボードの「Logs」タブで確認

**Railway:**
- プロジェクトの「Deployments」→「View Logs」

**VPS (PM2):**
```bash
pm2 logs jaisfc-server
pm2 monit
```

### パフォーマンス監視

- [Uptime Robot](https://uptimerobot.com/) - サイトの稼働監視（無料）
- [Google Analytics](https://analytics.google.com/) - アクセス解析
- [Sentry](https://sentry.io/) - エラー追跡

---

## 🐛 トラブルシューティング

### デプロイ後にサイトが表示されない

**原因**: ビルドエラーまたは環境変数の設定ミス

**解決策**:
1. デプロイログを確認
2. 環境変数が正しく設定されているか確認
3. `FRONTEND_URL`が正しいURLになっているか確認

### アップロードが失敗する

**原因**: MEGA.ioの認証エラー

**解決策**:
1. `MEGA_EMAIL`と`MEGA_PASSWORD`が正しいか確認
2. MEGA.ioアカウントの容量が十分か確認
3. サーバーログで詳細なエラーメッセージを確認

### 支払いが完了しない

**原因**: PayPal/Stripeの本番キーが正しくない

**解決策**:
1. PayPalの`PAYPAL_MODE`が`live`になっているか確認
2. Stripeの本番キー（`sk_live_...`と`pk_live_...`）を使用しているか確認
3. PayPal/Stripeダッシュボードでトランザクションログを確認

### メールが送信されない

**原因**: Gmailアプリパスワードの設定ミス

**解決策**:
1. Gmailの2段階認証が有効になっているか確認
2. アプリパスワードを再生成して設定
3. `EMAIL_USER`と`EMAIL_PASSWORD`が正しいか確認

---

## 📈 スケーリング（アクセス増加への対応）

### データベースの導入

現在はインメモリストレージを使用していますが、アクセスが増えたらデータベースを導入：

**推奨データベース**:
- MongoDB Atlas（無料プランあり）
- PostgreSQL（Render/Railwayで無料提供）

**実装手順**:
1. MongoDBまたはPostgreSQLをセットアップ
2. `server.js`の`submissions` Mapをデータベースに置き換え
3. 環境変数に`DATABASE_URL`を追加

### CDNの導入

静的ファイルの配信を高速化：

- Cloudflare（無料）
- AWS CloudFront

---

## 💰 コスト見積もり

### 完全無料プラン
- **Render**: 無料（制限あり）
- **MEGA.io**: 20GB無料
- **PayPal**: 取引手数料のみ
- **Stripe**: 取引手数料のみ

**合計**: 月額 ¥0 + 取引手数料

### 推奨プラン（安定運用）
- **Railway**: $5/月
- **MEGA.io**: 20GB無料または400GB €4.99/月
- **ドメイン**: ¥1,000/年

**合計**: 月額 約¥700円

### プロフェッショナルプラン
- **VPS (DigitalOcean)**: $12/月
- **MEGA.io Pro**: 400GB €4.99/月
- **ドメイン**: ¥1,000/年
- **MongoDB Atlas**: 無料

**合計**: 月額 約¥2,000円

---

## 🎯 デプロイ後のチェックリスト

- [ ] サイトがHTTPSでアクセス可能
- [ ] 応募フォームが正常に動作
- [ ] ファイルアップロードが成功
- [ ] PayPal支払いが成功
- [ ] Stripe（Apple Pay）支払いが成功
- [ ] 確認メールが届く
- [ ] MEGA.ioにファイルが保存される
- [ ] レスポンシブデザインが正常
- [ ] ページ遷移が正常
- [ ] エラーハンドリングが正常

---

## 📞 サポート

デプロイで問題が発生した場合：

1. **ログを確認**: エラーメッセージを特定
2. **環境変数を確認**: すべて正しく設定されているか
3. **ドキュメントを確認**: 各サービスの公式ドキュメント
4. **コミュニティに質問**: Stack Overflow、GitHubのIssues

---

## ✅ 完了！

おめでとうございます！あなたのサイトは本番環境で動作しています。

**次のステップ**:
1. Google Analyticsを設定してアクセス解析
2. 定期的にログを確認してエラーチェック
3. バックアップ体制を整える
4. パフォーマンスを監視して最適化

---

© 2025 Japan AI Short Film Competition. All rights reserved.
