# ⚡ クイックスタートガイド - ValueDomain版

**所要時間**: 20分

---

## 📋 必要なもの

- [x] ValueDomainで取得したドメイン
- [ ] GitHubアカウント
- [ ] Renderアカウント（無料）
- [ ] MEGA.ioアカウント
- [ ] PayPalアカウント
- [ ] Stripeアカウント
- [ ] Gmailアカウント

---

## 🚀 5ステップでデプロイ

### ステップ1: GitHubにプッシュ（5分）

```bash
cd C:\Users\user\Desktop\jaisfc2
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/あなたのユーザー名/jaisfc-production.git
git push -u origin main
```

### ステップ2: Renderでバックエンドをデプロイ（5分）

1. [Render](https://render.com/)でアカウント作成
2. 「New +」→「Web Service」
3. GitHubリポジトリ選択
4. 設定：
   - Name: `jaisfc-backend`
   - Build: `npm install`
   - Start: `npm run server`
5. 環境変数を追加（`.env.production.example`参照）

### ステップ3: Renderでフロントエンドをデプロイ（3分）

1. 「New +」→「Static Site」
2. GitHubリポジトリ選択
3. 設定：
   - Name: `jaisfc-frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`
   - 環境変数: `VITE_API_URL=https://api.yoursite.com/api`

### ステップ4: ValueDomainでDNS設定（5分）

ValueDomainのDNS設定画面で：

```
a @ 216.24.57.1
cname www jaisfc-frontend.onrender.com.
cname api jaisfc-backend.onrender.com.
```

### ステップ5: Renderでドメインを追加（2分）

1. **フロントエンド**: Settings → Custom Domain → `yoursite.com`
2. **バックエンド**: Settings → Custom Domain → `api.yoursite.com`
3. SSL証明書の発行を待つ（5-10分）

---

## ✅ 完了！

サイトにアクセス: `https://yoursite.com`

---

## 📚 詳細ガイド

- **フルガイド**: `VALUEDOMAIN_SETUP.md`を参照
- **本番環境**: `PRODUCTION_DEPLOY.md`を参照
- **改善レポート**: `IMPROVEMENTS.md`を参照

---

## 🐛 問題が発生したら？

1. **DNS設定**: 最大24時間待つ（通常1時間以内）
2. **SSL証明書**: Renderで5-10分待つ
3. **API エラー**: 環境変数`FRONTEND_URL`を確認
4. **詳細**: `VALUEDOMAIN_SETUP.md`のトラブルシューティングを参照

---

© 2025 Japan AI Short Film Competition
