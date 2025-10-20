# 🌐 Cloudflare DNS → Render 独自ドメイン設定ガイド（完全版）

このガイドに従えば、**30分以内**にCloudflareで管理するドメインをRenderにデプロイしたサイトに接続できます。

---

## 📋 前提条件

- [ ] GitHubアカウントを作成済み
- [ ] Renderアカウントを作成済み
- [ ] Cloudflareアカウントを作成（無料プランでOK）

---

## ステップ1: ドメインの取得（10分）

### オプション A: Cloudflare Registrarで取得（推奨）

Cloudflareで直接ドメインを購入すると、DNS設定が自動で完了します。

1. [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)にアクセス
2. ログイン後、「Domain Registration」を選択
3. 希望のドメイン名を検索（例: `japan-ai-film.com`）
4. 利用可能なドメインを選択して購入
5. **メリット**：
   - DNS設定が自動
   - WHOIS保護が無料
   - 原価で販売（追加料金なし）

### オプション B: 他のレジストラで取得してCloudflareに移管

お名前.com、ムームードメイン、ValueDomainなどで取得する場合：

1. 好きなレジストラでドメインを購入
2. 購入後、ステップ2でCloudflareに追加

**推奨レジストラ**:
- [お名前.com](https://www.onamae.com/) - 日本語、多様な支払い方法
- [ムームードメイン](https://muumuu-domain.com/) - 初心者向け
- [Google Domains](https://domains.google/) - シンプル（日本で利用可能）

---

## ステップ2: Cloudflareにドメインを追加（5分）

### 2-1. Cloudflareにログイン

1. [Cloudflare](https://dash.cloudflare.com/)にアクセス
2. アカウントにログイン

### 2-2. ドメインを追加

1. ダッシュボードで「**Add a Site**」をクリック
2. 取得したドメインを入力（例: `japan-ai-film.com`）
3. 「**Add site**」をクリック

### 2-3. プランを選択

1. 「**Free**」プランを選択
2. 「**Continue**」をクリック

### 2-4. DNS レコードのスキャン

- Cloudflareが既存のDNSレコードを自動スキャンします
- 「**Continue**」をクリック

### 2-5. ネームサーバーを変更

Cloudflareが提供する**2つのネームサーバー**が表示されます：

```
例:
alice.ns.cloudflare.com
bob.ns.cloudflare.com
```

**これをドメインレジストラで設定します**：

#### お名前.comの場合：

1. [お名前.com](https://www.onamae.com/)にログイン
2. 「ドメイン設定」→「ネームサーバーの変更」
3. 「他のネームサーバーを利用」を選択
4. Cloudflareの2つのネームサーバーを入力
5. 「確認」→「設定する」

#### ムームードメインの場合：

1. [ムームードメイン](https://muumuu-domain.com/)にログイン
2. 「ドメイン管理」→「ネームサーバ設定変更」
3. 「GMOペパボ以外のネームサーバを使用する」を選択
4. Cloudflareの2つのネームサーバーを入力
5. 「ネームサーバ設定変更」をクリック

#### ValueDomainの場合：

1. [ValueDomain](https://www.value-domain.com/)にログイン
2. 「ドメイン」→「ドメインの設定操作」
3. 対象ドメインの「ネームサーバー」をクリック
4. Cloudflareの2つのネームサーバーを入力
5. 「保存」をクリック

### 2-6. ネームサーバー変更の確認

- ネームサーバー変更は**最大24時間**かかる場合があります（通常は1-2時間）
- Cloudflareダッシュボードで「**Check nameservers**」をクリックして確認
- 完了すると、Cloudflareからメールが届きます

---

## ステップ3: Renderへのデプロイ（10分）

### 3-1. GitHubにコードをプッシュ（既に完了している場合はスキップ）

```bash
cd C:\Users\user\Desktop\jaisfc2

# 変更を確認
git status

# 削除されたファイルをステージング
git add -A

# コミット
git commit -m "Prepare for Cloudflare DNS setup"

# プッシュ
git push origin main
```

### 3-2. Renderでバックエンドをデプロイ

1. [Render](https://dashboard.render.com/)にログイン
2. 「**New +**」→「**Web Service**」をクリック
3. GitHubリポジトリ `japan-ai-short-film-competition` を選択
4. 以下を設定：

   ```
   Name: japan-ai-backend
   Environment: Node
   Region: Singapore（日本に近い）
   Branch: main
   Root Directory: (空白)
   Build Command: npm install
   Start Command: npm run server
   Instance Type: Free
   ```

5. 「**Advanced**」→「**Environment Variables**」で環境変数を追加：

   | Key | Value |
   |-----|-------|
   | `PORT` | `3001` |
   | `FRONTEND_URL` | `https://yoursite.com`（後で更新） |
   | `CLOUDFLARE_ACCOUNT_ID` | あなたのCloudflare Account ID |
   | `CLOUDFLARE_ACCESS_KEY_ID` | R2 Access Key ID |
   | `CLOUDFLARE_SECRET_ACCESS_KEY` | R2 Secret Access Key |
   | `R2_BUCKET_NAME` | あなたのR2バケット名 |
   | `PAYPAL_MODE` | `sandbox`（テスト）/`live`（本番） |
   | `PAYPAL_CLIENT_ID` | PayPal Client ID |
   | `PAYPAL_CLIENT_SECRET` | PayPal Secret |
   | `STRIPE_SECRET_KEY` | Stripe Secret Key |
   | `STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key |
   | `EMAIL_USER` | あなたのGmailアドレス |
   | `EMAIL_PASSWORD` | Gmailアプリパスワード |

6. 「**Create Web Service**」をクリック
7. デプロイ完了を待つ（5-10分）
8. **バックエンドのURL**をメモ：
   ```
   例: https://japan-ai-backend.onrender.com
   ```

### 3-3. Renderでフロントエンドをデプロイ

1. Renderダッシュボードで「**New +**」→「**Static Site**」をクリック
2. 同じGitHubリポジトリを選択
3. 以下を設定：

   ```
   Name: japan-ai-frontend
   Branch: main
   Root Directory: (空白)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. 「**Advanced**」→「**Environment Variables**」：

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://api.yoursite.com/api`（後で更新） |

5. 「**Create Static Site**」をクリック
6. デプロイ完了を待つ（3-5分）
7. **フロントエンドのURL**をメモ：
   ```
   例: https://japan-ai-frontend.onrender.com
   ```

---

## ステップ4: Cloudflare DNS設定（5分）

### 4-1. Cloudflareダッシュボードに移動

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にアクセス
2. あなたのドメイン（例: `japan-ai-film.com`）をクリック
3. 左メニューから「**DNS**」→「**Records**」を選択

### 4-2. DNS レコードを追加

以下の3つのレコードを追加します：

#### レコード 1: ルートドメイン（@）をフロントエンドに向ける

```
Type: CNAME
Name: @
Target: japan-ai-frontend.onrender.com
Proxy status: ✅ Proxied（オレンジの雲マーク）
TTL: Auto
```

**注意**: CNAMEレコードの `@` がエラーになる場合：
- 既存のAレコードやAAAAレコードを削除してください
- または、Aレコードを使用：
  ```
  Type: A
  Name: @
  IPv4 address: 216.24.57.1
  Proxy status: ✅ Proxied
  ```

#### レコード 2: www サブドメインをフロントエンドに向ける

```
Type: CNAME
Name: www
Target: japan-ai-frontend.onrender.com
Proxy status: ✅ Proxied
TTL: Auto
```

#### レコード 3: api サブドメインをバックエンドに向ける

```
Type: CNAME
Name: api
Target: japan-ai-backend.onrender.com
Proxy status: ✅ Proxied
TTL: Auto
```

### 4-3. SSL/TLS設定

1. 左メニューから「**SSL/TLS**」を選択
2. 「**Overview**」タブで暗号化モードを設定：
   ```
   Encryption mode: Full (strict)
   ```
3. これでHTTPS接続が自動で有効になります

### 4-4. DNS設定の確認

完了すると、DNS Recordsに以下が表示されます：

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| CNAME | @ | japan-ai-frontend.onrender.com | Proxied |
| CNAME | www | japan-ai-frontend.onrender.com | Proxied |
| CNAME | api | japan-ai-backend.onrender.com | Proxied |

---

## ステップ5: Renderでカスタムドメインを設定（5分）

### 5-1. フロントエンドにドメインを追加

1. Renderダッシュボードで「**japan-ai-frontend**」を選択
2. 「**Settings**」タブをクリック
3. 「**Custom Domain**」セクションまでスクロール
4. 「**Add Custom Domain**」をクリック
5. ドメインを入力：
   - `japan-ai-film.com`
6. 「**Save**」をクリック
7. 同じ手順で `www.japan-ai-film.com` も追加

### 5-2. バックエンドにサブドメインを追加

1. Renderダッシュボードで「**japan-ai-backend**」を選択
2. 「**Settings**」タブをクリック
3. 「**Custom Domain**」セクションまでスクロール
4. 「**Add Custom Domain**」をクリック
5. サブドメインを入力：
   - `api.japan-ai-film.com`
6. 「**Save**」をクリック

### 5-3. SSL証明書の自動発行を待つ

- Cloudflareが自動的にSSL証明書を提供するため、Render側での証明書発行は不要
- DNS伝播後、すぐにHTTPSでアクセス可能になります

---

## ステップ6: 環境変数の更新（5分）

### 6-1. バックエンドの環境変数を更新

1. Renderダッシュボードで「**japan-ai-backend**」を選択
2. 「**Environment**」タブをクリック
3. `FRONTEND_URL` を更新：
   ```
   FRONTEND_URL=https://japan-ai-film.com
   ```
4. 「**Save Changes**」をクリック
5. 自動的に再デプロイされます（2-3分）

### 6-2. フロントエンドの環境変数を更新

1. Renderダッシュボードで「**japan-ai-frontend**」を選択
2. 「**Environment**」タブをクリック
3. `VITE_API_URL` を更新：
   ```
   VITE_API_URL=https://api.japan-ai-film.com/api
   ```
4. 「**Save Changes**」をクリック
5. 自動的に再デプロイされます（3-5分）

---

## ステップ7: 動作確認（5分）

### 7-1. DNS伝播を確認

1. [WhatsMyDNS](https://www.whatsmydns.net/)にアクセス
2. あなたのドメイン（例: `japan-ai-film.com`）を入力
3. レコードタイプ「**CNAME**」を選択
4. 世界中のDNSサーバーで正しく設定されているか確認

### 7-2. サイトにアクセス

ブラウザで以下にアクセス：

1. **フロントエンド**: `https://japan-ai-film.com`
   - サイトが表示されることを確認
   - HTTPSが有効（鍵マーク）になっていることを確認

2. **www**: `https://www.japan-ai-film.com`
   - wwwでもアクセスできることを確認

3. **バックエンドAPI**: `https://api.japan-ai-film.com/api/health`
   - 以下のようなJSONが表示されればOK：
   ```json
   {
     "status": "ok",
     "cloudStorage": "Cloudflare R2",
     "paymentMethods": ["Stripe (Apple Pay, Credit Card)", "PayPal"]
   }
   ```

### 7-3. テスト応募

1. `https://japan-ai-film.com`にアクセス
2. 応募フォームを入力
3. テスト動画をアップロード（小さいファイルでOK）
4. 支払い処理を完了（テストモードの場合はテストカード使用）
5. 確認メールが届くことを確認

---

## 🎨 Cloudflare特有の設定（オプション）

### パフォーマンス最適化

#### Auto Minify（自動圧縮）

1. Cloudflareダッシュボードで「**Speed**」→「**Optimization**」
2. 「**Auto Minify**」で以下を有効化：
   - ✅ JavaScript
   - ✅ CSS
   - ✅ HTML

#### Brotli圧縮

1. 「**Speed**」→「**Optimization**」
2. 「**Brotli**」を有効化

#### キャッシュレベル

1. 「**Caching**」→「**Configuration**」
2. 「**Caching Level**」を「**Standard**」に設定

### セキュリティ強化

#### Always Use HTTPS

1. 「**SSL/TLS**」→「**Edge Certificates**」
2. 「**Always Use HTTPS**」を有効化
   - HTTPアクセスを自動的にHTTPSにリダイレクト

#### Automatic HTTPS Rewrites

1. 同じページで「**Automatic HTTPS Rewrites**」を有効化
   - HTTP URLを自動的にHTTPSに書き換え

---

## 🐛 トラブルシューティング

### ❌ ドメインにアクセスできない

**原因1**: ネームサーバーが変更されていない
- **解決**: レジストラ側でネームサーバー設定を確認
- **確認**: Cloudflareダッシュボードで「Active」と表示されているか

**原因2**: DNS設定が間違っている
- **解決**: Cloudflare DNS設定を再確認
  - CNAMEレコードのTargetが正しいか
  - Proxy status（オレンジの雲）が有効か

**原因3**: DNS伝播が完了していない
- **解決**: 最大24時間待つ（通常は1-2時間）
- **確認**: [WhatsMyDNS](https://www.whatsmydns.net/)で伝播状況を確認

---

### ❌ HTTPSエラー

**原因**: SSL/TLS設定が間違っている
- **解決**:
  1. Cloudflare → SSL/TLS → Overview
  2. Encryption mode を「**Full (strict)**」に変更
  3. 5分待ってから再度アクセス

---

### ❌ APIが動作しない（CORS エラー）

**原因**: バックエンドの`FRONTEND_URL`が間違っている
- **解決**:
  1. Render → japan-ai-backend → Environment
  2. `FRONTEND_URL`を正しいドメインに更新
  3. 保存して再デプロイを待つ

---

### ❌ Cloudflareのキャッシュが古い

**原因**: Cloudflareが古いバージョンをキャッシュしている
- **解決**:
  1. Cloudflare → Caching → Configuration
  2. 「**Purge Everything**」をクリック
  3. キャッシュがクリアされるまで数分待つ

---

## 📝 まとめ

### 設定後のURL構成

| 種類 | URL | 説明 |
|------|-----|------|
| フロントエンド | `https://japan-ai-film.com` | メインサイト |
| フロントエンド | `https://www.japan-ai-film.com` | wwwサブドメイン |
| バックエンドAPI | `https://api.japan-ai-film.com` | APIサーバー |
| ヘルスチェック | `https://api.japan-ai-film.com/api/health` | サーバー状態確認 |

### 完了チェックリスト

- [ ] ドメインを取得
- [ ] Cloudflareにドメインを追加
- [ ] ネームサーバーを変更
- [ ] GitHubにコードをプッシュ
- [ ] Renderにバックエンドをデプロイ
- [ ] Renderにフロントエンドをデプロイ
- [ ] Cloudflare DNSレコードを設定
- [ ] RenderでCustom Domainを追加
- [ ] SSL/TLS設定を「Full (strict)」に変更
- [ ] 環境変数を正しいドメインに更新
- [ ] サイトにアクセスして動作確認
- [ ] テスト応募を実施

---

## 🌟 Cloudflareを使うメリット

1. **無料のSSL証明書**（Let's Encryptより高速）
2. **CDN機能**（世界中のエッジサーバーから配信）
3. **DDoS保護**（無料プランでも基本的な保護あり）
4. **自動キャッシュ**（静的コンテンツを高速配信）
5. **Analytics**（トラフィック分析が無料）
6. **Page Rules**（リダイレクトやキャッシュルールを設定可能）

---

## 🎉 完了！

おめでとうございます！あなたのサイトはCloudflare DNS経由で独自ドメインで公開されました。

**あなたのサイト**: https://japan-ai-film.com

---

**作成日**: 2025年10月19日
**対象プロジェクト**: jaisfc2 - Cloudflare R2版
**DNS プロバイダー**: Cloudflare

---

© 2025 Japan AI Short Film Competition. All rights reserved.
