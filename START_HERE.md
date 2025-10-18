# 📖 はじめに - START HERE

**Japan AI Short Film Competition**のプロジェクトへようこそ！

このドキュメントは、プロジェクトの全体像を理解し、どのドキュメントを読むべきかを案内します。

---

## 🎯 あなたの目的は？

### 1. **とにかく早くローカル環境で動かしたい**
👉 **[LOCALHOST_TEST.md](./LOCALHOST_TEST.md)** を開く（5分で起動）

```bash
cd C:\Users\user\Desktop\jaisfc2
copy .env.example .env
notepad .env  # 必要な情報を入力
npm install
npm run server  # ターミナル1
npm run dev     # ターミナル2
```

---

### 2. **ゼロから本番環境まで完全にセットアップしたい**
👉 **[COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md)** を開く（60分コース）

以下をカバー：
- ✅ ローカル環境セットアップ
- ✅ 必要なアカウント作成（MEGA.io、Stripe、Gmail）
- ✅ Renderへのデプロイ
- ✅ ValueDomainドメイン接続
- ✅ トラブルシューティング

---

### 3. **ValueDomainのドメインを接続したい**
👉 **[VALUEDOMAIN_SETUP.md](./VALUEDOMAIN_SETUP.md)** を開く（20分）

以下をカバー：
- ✅ DNS設定方法
- ✅ Renderでのカスタムドメイン設定
- ✅ SSL証明書の設定
- ✅ 環境変数の更新

---

### 4. **本番環境へのデプロイ方法を知りたい**
👉 **[PRODUCTION_DEPLOY.md](./PRODUCTION_DEPLOY.md)** を開く

以下をカバー：
- ✅ Renderへのデプロイ（無料）
- ✅ Railwayへのデプロイ（$5/月）
- ✅ VPSへのデプロイ（上級者向け）

---

### 5. **コードの問題点や改善内容を知りたい**
👉 **[ISSUES_AND_IMPROVEMENTS.md](./ISSUES_AND_IMPROVEMENTS.md)** を開く

以下をカバー：
- 🔴 重大な問題（インメモリストレージなど）
- 🟡 改善推奨項目
- ✅ 実施済みの改善
- 📈 パフォーマンス測定結果
- 💾 データベース移行ガイド

---

### 6. **改善履歴を詳しく知りたい**
👉 **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** を開く

以下をカバー：
- Dropbox → MEGA.ioへの移行
- PayPal削除の経緯
- 軽量化の詳細
- セキュリティ強化

---

## 📚 ドキュメント構成

### 🚀 セットアップ・デプロイ系

| ドキュメント | 所要時間 | 対象者 |
|-------------|---------|--------|
| [LOCALHOST_TEST.md](./LOCALHOST_TEST.md) | 5分 | すぐに試したい人 |
| [COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md) | 60分 | 初心者・完全セットアップ |
| [VALUEDOMAIN_SETUP.md](./VALUEDOMAIN_SETUP.md) | 20分 | ドメイン接続 |
| [PRODUCTION_DEPLOY.md](./PRODUCTION_DEPLOY.md) | 30-60分 | 本番環境デプロイ |

### 📖 技術・改善系

| ドキュメント | 内容 |
|-------------|------|
| [ISSUES_AND_IMPROVEMENTS.md](./ISSUES_AND_IMPROVEMENTS.md) | 問題点と改善の詳細 |
| [IMPROVEMENTS.md](./IMPROVEMENTS.md) | 改善履歴 |
| [README.md](./README.md) | プロジェクト概要 |

---

## ⚡ クイックコマンド集

### ローカル環境

```bash
# プロジェクトに移動
cd C:\Users\user\Desktop\jaisfc2

# 環境設定
copy .env.example .env
notepad .env

# インストール
npm install

# 起動
npm run server  # バックエンド（ターミナル1）
npm run dev     # フロントエンド（ターミナル2）

# ブラウザで開く
start http://localhost:3000
```

### 本番環境準備

```bash
# Gitリポジトリ作成
git init
git add .
git commit -m "Initial commit"

# GitHubにプッシュ
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git push -u origin main
```

---

## 🔑 必要なアカウント

セットアップには以下のアカウントが必要です：

| サービス | 用途 | 無料プラン |
|---------|------|-----------|
| [MEGA.io](https://mega.io/) | 動画ストレージ | 20GB |
| [Stripe](https://stripe.com/) | 決済処理 | あり（取引手数料のみ） |
| [Gmail](https://gmail.com/) | メール送信 | あり |
| [Render](https://render.com/) | ホスティング（推奨） | あり |
| [GitHub](https://github.com/) | コード管理 | あり |
| [ValueDomain](https://www.value-domain.com/) | ドメイン（オプション） | 有料 |

---

## 📋 チェックリスト

### ローカル環境
- [ ] Node.jsをインストール
- [ ] MEGA.ioアカウント作成
- [ ] Stripeアカウント作成（テストモード）
- [ ] Gmailアプリパスワード取得
- [ ] .envファイル設定
- [ ] `npm install`実行
- [ ] サーバー起動成功
- [ ] ブラウザで表示確認

### 本番環境
- [ ] GitHubリポジトリ作成
- [ ] Renderアカウント作成
- [ ] バックエンドデプロイ
- [ ] フロントエンドデプロイ
- [ ] 環境変数設定（本番用）
- [ ] Stripe本番キー設定
- [ ] 動作確認

### ドメイン接続（オプション）
- [ ] ValueDomainでDNS設定
- [ ] Renderでカスタムドメイン追加
- [ ] SSL証明書発行確認
- [ ] HTTPSアクセス確認

---

## 🎓 学習パス

### 初心者向け
1. **[LOCALHOST_TEST.md](./LOCALHOST_TEST.md)** - まず動かしてみる
2. **[COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md)** - 全体像を理解
3. **[VALUEDOMAIN_SETUP.md](./VALUEDOMAIN_SETUP.md)** - ドメイン接続
4. **[README.md](./README.md)** - プロジェクト詳細

### 中級者向け
1. **[PRODUCTION_DEPLOY.md](./PRODUCTION_DEPLOY.md)** - デプロイ詳細
2. **[ISSUES_AND_IMPROVEMENTS.md](./ISSUES_AND_IMPROVEMENTS.md)** - 問題点を理解
3. コードを読む - `server.js`、`src/components/`
4. データベース移行を検討

### 上級者向け
1. **[ISSUES_AND_IMPROVEMENTS.md](./ISSUES_AND_IMPROVEMENTS.md)** - 全問題を把握
2. データベース移行実施（MongoDB/PostgreSQL）
3. CDN導入（Cloudflare）
4. パフォーマンス最適化
5. セキュリティ監査

---

## 💡 よくある質問

### Q: どのドキュメントから読めばいい？
A: 目的によります。上記の「あなたの目的は？」セクションを参照してください。

### Q: 本番環境にデプロイする前に何をすべき？
A:
1. ローカル環境で完全にテスト
2. [ISSUES_AND_IMPROVEMENTS.md](./ISSUES_AND_IMPROVEMENTS.md)の重大な問題を確認
3. データベース移行を検討（インメモリは本番環境で使用不可）

### Q: 無料で使える？
A: はい！以下は無料です：
- MEGA.io: 20GB
- Stripe: 取引手数料のみ
- Gmail: 無料
- Render: 無料プラン
- GitHub: 無料

ドメイン（ValueDomain）のみ有料です（年間¥1,000程度）。

### Q: サポートは受けられる？
A: はい！以下にご連絡ください：

**Email**: japanaishortfilmcompetition@gmail.com

---

## 📞 困ったときは

1. **該当するドキュメントのトラブルシューティングを確認**
2. **ログを確認**（ターミナルのエラーメッセージ）
3. **環境変数を確認**（`.env`ファイル）
4. **サポートに連絡**: japanaishortfilmcompetition@gmail.com

---

## 🚀 次のステップ

準備ができたら、以下のいずれかのドキュメントを開いてください：

- **すぐ試す**: [LOCALHOST_TEST.md](./LOCALHOST_TEST.md)
- **完全セットアップ**: [COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md)
- **技術詳細**: [ISSUES_AND_IMPROVEMENTS.md](./ISSUES_AND_IMPROVEMENTS.md)

---

**最終更新**: 2025年10月18日
**バージョン**: v2.0

© 2025 JAPAN AI SHORT FILM COMPETITION. All rights reserved.
