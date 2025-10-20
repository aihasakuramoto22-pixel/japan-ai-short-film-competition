# 🔄 Render無料プラン：スリープ対策ガイド

Renderの無料プランでは、15分間リクエストがないとサービスがスリープ状態になります。
このガイドでは、**完全無料**でスリープを防ぐ方法を紹介します。

---

## 方法1: UptimeRobot（推奨・完全無料）

### 特徴
- ✅ 完全無料（50サイトまで監視可能）
- ✅ 5分ごとにサイトにアクセス
- ✅ ダウンタイムをメールで通知
- ✅ 設定が簡単

### 設定手順（3分）

1. **UptimeRobotにアクセス**
   - [UptimeRobot](https://uptimerobot.com/)にアクセス
   - 「Free Sign Up」をクリック

2. **アカウント作成**
   - メールアドレスを入力
   - パスワードを設定
   - 確認メールのリンクをクリック

3. **モニターを追加**
   - ダッシュボードで「+ Add New Monitor」をクリック
   - 以下を設定：
     ```
     Monitor Type: HTTP(s)
     Friendly Name: JAISFC Backend
     URL: https://api.yoursite.com/api/health
     Monitoring Interval: 5 minutes
     ```
   - 「Create Monitor」をクリック

4. **完了！**
   - これで5分ごとにバックエンドにアクセスするようになります
   - スリープすることがなくなります

---

## 方法2: Cloudflare Workers（無料・上級者向け）

### 特徴
- ✅ 完全無料（1日100,000リクエストまで）
- ✅ 1分ごとにアクセス可能
- ⚠️ JavaScriptコードを書く必要あり

### 設定手順（10分）

1. **Cloudflare Workersにアクセス**
   - Cloudflareダッシュボードで「Workers & Pages」をクリック
   - 「Create application」→「Create Worker」

2. **Workerコードを作成**

```javascript
// Keep-Alive Worker for Render Free Plan
export default {
  async scheduled(event, env, ctx) {
    // バックエンドのヘルスチェックエンドポイントにアクセス
    const url = 'https://api.yoursite.com/api/health';

    try {
      const response = await fetch(url);
      console.log(`Keep-alive ping: ${response.status}`);
    } catch (error) {
      console.error('Keep-alive failed:', error);
    }
  },
};
```

3. **Cronトリガーを設定**
   - 「Triggers」タブをクリック
   - 「Add Cron Trigger」をクリック
   - Cron式を入力：
     ```
     */5 * * * *
     ```
     （5分ごとに実行）
   - 「Save」をクリック

4. **デプロイ**
   - 「Save and Deploy」をクリック

---

## 方法3: GitHub Actions（無料・エンジニア向け）

### 特徴
- ✅ 完全無料（月2,000分まで）
- ✅ GitHubに統合
- ⚠️ YAMLファイルを作成する必要あり

### 設定手順

1. **ワークフローファイルを作成**

`.github/workflows/keepalive.yml` を作成：

```yaml
name: Keep Render Service Alive

on:
  schedule:
    # 5分ごとに実行（UTC時間）
    - cron: '*/5 * * * *'
  workflow_dispatch: # 手動実行も可能

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Backend
        run: |
          curl -f https://api.yoursite.com/api/health || exit 1
      - name: Log Success
        if: success()
        run: echo "Backend is alive!"
```

2. **GitHubにプッシュ**

```bash
git add .github/workflows/keepalive.yml
git commit -m "Add keep-alive workflow for Render"
git push
```

3. **確認**
   - GitHubリポジトリの「Actions」タブで実行状況を確認

---

## 📊 各方法の比較

| 方法 | 設定難易度 | 実行間隔 | 無料枠 | 推奨度 |
|------|----------|---------|--------|--------|
| **UptimeRobot** | ⭐ 簡単 | 5分 | 50サイト | ⭐⭐⭐⭐⭐ |
| **Cloudflare Workers** | ⭐⭐⭐ 中級 | 1分 | 100,000リクエスト/日 | ⭐⭐⭐⭐ |
| **GitHub Actions** | ⭐⭐ やや難 | 5分 | 2,000分/月 | ⭐⭐⭐ |

---

## ⚠️ 注意事項

### Renderの無料プラン制限

- **月750時間まで**（約31日 = 常時稼働可能）
- Keep-aliveを使用しても、月750時間を超えると停止します
- 通常の使用では問題ありません

### 有料プランにアップグレードする場合

もし将来的にトラフィックが増えたら、Renderの有料プラン（$7/月〜）を検討：
- スリープなし
- より高速なCPU
- より多くのメモリ

---

## 🎯 推奨設定

**初心者の方**:
→ **UptimeRobot**を使用（設定が一番簡単）

**Cloudflareを既に使っている方**:
→ **Cloudflare Workers**を使用（統合管理が便利）

**GitHubに慣れている方**:
→ **GitHub Actions**を使用（コードと一緒に管理）

---

## 🎉 完了！

これでRenderの無料プランでもサービスがスリープすることなく、常時稼働できます。

**推奨**: まずUptimeRobotで試してみてください（最も簡単で確実です）

---

**作成日**: 2025年10月19日
**対象**: Render無料プランユーザー

---

© 2025 Japan AI Short Film Competition. All rights reserved.
