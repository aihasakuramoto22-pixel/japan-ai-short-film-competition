# 💯 完全無料デプロイガイド（ドメイン代なし）

**総費用：0円** で Japan AI Short Film Competition を公開できます！

---

## 🎯 完全無料構成

| 項目 | サービス | 費用 |
|------|---------|------|
| フロントエンド | Render Static Site | **0円** |
| バックエンド | Render Web Service | **0円** |
| ドメイン | Renderサブドメイン | **0円** |
| SSL証明書 | Render提供 | **0円** |
| ビデオストレージ | Cloudflare R2（10GB） | **0円** |
| Keep-Alive | UptimeRobot | **0円** |
| **合計** | | **0円** |

---

## 📋 使用するURL

独自ドメインの代わりに、Renderが提供する無料サブドメインを使用します：

```
フロントエンド: https://japan-ai-frontend.onrender.com
バックエンド API: https://japan-ai-backend.onrender.com
```

**メリット**:
- ✅ 完全無料（ドメイン代不要）
- ✅ SSL証明書が自動で有効（HTTPS）
- ✅ すぐに使える
- ✅ 設定が簡単

**デメリット**:
- ❌ URLが長い（覚えにくい）
- ❌ ブランディングが弱い
- ❌ 将来的にドメイン変更すると移行が必要

---

## ステップ1: GitHubにプッシュ（3分）

現在の変更をGitHubにプッシュします：

```bash
cd C:\Users\user\Desktop\jaisfc2

# 削除されたファイルを反映
git add -A

# コミット
git commit -m "Prepare for free deployment on Render"

# プッシュ
git push origin main
```

---

## ステップ2: Cloudflare R2セットアップ（10分）

### 2-1. Cloudflareアカウント作成

1. [Cloudflare](https://dash.cloudflare.com/sign-up)にアクセス
2. メールアドレスとパスワードで無料アカウント作成
3. メール確認

### 2-2. R2バケット作成

1. Cloudflareダッシュボードで「**R2**」をクリック
2. 「**Create bucket**」をクリック
3. バケット名を入力：`jaisfc-videos`
4. Location: **Automatic**
5. 「**Create bucket**」をクリック

### 2-3. R2 APIトークン取得

1. 「**Manage R2 API Tokens**」をクリック
2. 「**Create API token**」をクリック
3. 以下を設定：
   ```
   Token name: jaisfc-upload
   Permissions: Object Read & Write
   TTL: Forever
   ```
4. 「**Create API Token**」をクリック
5. 以下の情報をメモ：
   - **Access Key ID**
   - **Secret Access Key**
   - **Account ID**（ダッシュボード右上に表示）

⚠️ **重要**: Secret Access Keyは1回しか表示されないので、必ずメモしてください！

### 2-4. R2の無料枠

```
✅ 月間10GB ストレージ無料
✅ 月間100万回 Class A操作（アップロード）無料
✅ 月間1000万回 Class B操作（ダウンロード）無料
```

通常の応募コンテストであれば、無料枠で十分です。

---

## ステップ3: Renderでバックエンドをデプロイ（10分）

### 3-1. Renderアカウント作成

1. [Render](https://dashboard.render.com/register)にアクセス
2. 「**Sign up with GitHub**」をクリック
3. GitHubアカウントで連携

### 3-2. バックエンドをデプロイ

1. Renderダッシュボードで「**New +**」→「**Web Service**」をクリック

2. GitHubリポジトリ `japan-ai-short-film-competition` を選択
   - 見つからない場合：「**Configure account**」→リポジトリへのアクセスを許可

3. 以下を設定：

   ```
   Name: japan-ai-backend
   Environment: Node
   Region: Singapore（日本に近い）
   Branch: main
   Root Directory: (空白のまま)
   Build Command: npm install
   Start Command: npm run server
   Instance Type: Free
   ```

4. 「**Advanced**」をクリックして環境変数を追加：

   | Key | Value | 説明 |
   |-----|-------|------|
   | `PORT` | `3001` | サーバーポート |
   | `FRONTEND_URL` | `https://japan-ai-frontend.onrender.com` | フロントエンドURL（後で更新） |
   | `CLOUDFLARE_ACCOUNT_ID` | `あなたのAccount ID` | R2のAccount ID |
   | `CLOUDFLARE_ACCESS_KEY_ID` | `あなたのAccess Key` | R2のAccess Key |
   | `CLOUDFLARE_SECRET_ACCESS_KEY` | `あなたのSecret Key` | R2のSecret Access Key |
   | `R2_BUCKET_NAME` | `jaisfc-videos` | R2バケット名 |
   | `PAYPAL_MODE` | `sandbox` | テストモード（本番時は`live`） |
   | `PAYPAL_CLIENT_ID` | `（PayPal SandboxのClient ID）` | PayPalテスト用 |
   | `PAYPAL_CLIENT_SECRET` | `（PayPal SandboxのSecret）` | PayPalテスト用 |
   | `STRIPE_SECRET_KEY` | `sk_test_...` | Stripeテストキー |
   | `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Stripeテストキー |
   | `EMAIL_USER` | `あなたのGmail` | 通知メール送信用 |
   | `EMAIL_PASSWORD` | `Gmailアプリパスワード` | Gmail認証用 |

5. 「**Create Web Service**」をクリック

6. **デプロイ完了を待つ**（5-10分）
   - ログに「Server is running on port 3001」と表示されればOK

7. **バックエンドのURLをメモ**：
   ```
   例: https://japan-ai-backend.onrender.com
   ```

---

## ステップ4: Renderでフロントエンドをデプロイ（10分）

### 4-1. フロントエンドをデプロイ

1. Renderダッシュボードで「**New +**」→「**Static Site**」をクリック

2. 同じGitHubリポジトリ `japan-ai-short-film-competition` を選択

3. 以下を設定：

   ```
   Name: japan-ai-frontend
   Branch: main
   Root Directory: (空白のまま)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. 「**Advanced**」→「**Environment Variables**」で環境変数を追加：

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://japan-ai-backend.onrender.com/api` |

   ⚠️ **重要**: 上記のURLは、ステップ3-2でメモしたバックエンドのURLに `/api` を追加したものです！

5. 「**Create Static Site**」をクリック

6. **デプロイ完了を待つ**（3-5分）

7. **フロントエンドのURLをメモ**：
   ```
   例: https://japan-ai-frontend.onrender.com
   ```

---

## ステップ5: 環境変数の更新（3分）

フロントエンドのURLが確定したので、バックエンドの環境変数を更新します。

### 5-1. バックエンドの`FRONTEND_URL`を更新

1. Renderダッシュボードで「**japan-ai-backend**」を選択
2. 「**Environment**」タブをクリック
3. `FRONTEND_URL` を更新：
   ```
   FRONTEND_URL=https://japan-ai-frontend.onrender.com
   ```
   （上記はステップ4-1でメモしたフロントエンドのURL）

4. 「**Save Changes**」をクリック
5. 自動的に再デプロイされます（2-3分待つ）

---

## ステップ6: UptimeRobotでスリープ対策（5分）

Renderの無料プランは15分間リクエストがないとスリープするので、UptimeRobotで定期的にアクセスします。

### 6-1. UptimeRobotアカウント作成

1. [UptimeRobot](https://uptimerobot.com/)にアクセス
2. 「**Free Sign Up**」をクリック
3. メールアドレスとパスワードで登録
4. 確認メールのリンクをクリック

### 6-2. モニターを追加

1. ダッシュボードで「**+ Add New Monitor**」をクリック

2. 以下を設定：
   ```
   Monitor Type: HTTP(s)
   Friendly Name: JAISFC Backend
   URL: https://japan-ai-backend.onrender.com/api/health
   Monitoring Interval: 5 minutes
   ```
   （URLは、ステップ3-2でメモしたバックエンドのURLに `/api/health` を追加）

3. 「**Create Monitor**」をクリック

4. **完了！** これで5分ごとにバックエンドにアクセスし、スリープを防ぎます。

---

## ステップ7: 動作確認（5分）

### 7-1. バックエンドの動作確認

ブラウザで以下にアクセス：

```
https://japan-ai-backend.onrender.com/api/health
```

以下のようなJSONが表示されればOK：

```json
{
  "status": "ok",
  "cloudStorage": "Cloudflare R2",
  "paymentMethods": ["Stripe (Apple Pay, Credit Card)", "PayPal"]
}
```

### 7-2. フロントエンドの動作確認

ブラウザで以下にアクセス：

```
https://japan-ai-frontend.onrender.com
```

サイトが表示されることを確認：
- ✅ ページが読み込まれる
- ✅ HTTPSが有効（鍵マーク）
- ✅ 言語切り替えが動作する
- ✅ 応募フォームが表示される

### 7-3. テスト応募（オプション）

1. フロントエンドにアクセス
2. 応募フォームを入力
3. 小さいテスト動画をアップロード（10MB以下推奨）
4. Stripeのテストカード番号を使用：
   ```
   カード番号: 4242 4242 4242 4242
   有効期限: 任意の未来の日付（例: 12/25）
   CVC: 任意の3桁（例: 123）
   ```
5. 支払い完了後、確認メールが届くか確認

---

## 📊 完全無料構成のまとめ

### あなたのサイトURL

```
🌐 メインサイト:
https://japan-ai-frontend.onrender.com

📡 バックエンドAPI:
https://japan-ai-backend.onrender.com
```

### 無料枠の制限

| サービス | 無料枠 | 制限 |
|---------|--------|------|
| **Render（バックエンド）** | 月750時間 | 15分間アクセスなしでスリープ<br>（UptimeRobotで解決済み） |
| **Render（フロントエンド）** | 無制限 | 月100GBまで転送無料 |
| **Cloudflare R2** | 月10GB | ストレージ10GB無料<br>アップロード100万回/月無料<br>ダウンロード1000万回/月無料 |
| **UptimeRobot** | 50サイト監視 | 5分ごとにチェック |

### 制限を超えたら？

**通常の応募コンテストであれば無料枠で十分です！**

もし制限を超えた場合の対応：

1. **Render有料プラン**: $7/月〜
   - スリープなし
   - より高速

2. **Cloudflare R2**: 超過分のみ課金
   - 10GB超過: $0.015/GB/月
   - 非常に安い

3. **独自ドメイン追加**: 年間1,000円〜
   - より信頼性の高いURL

---

## 🎉 完了チェックリスト

- [ ] GitHubにコードをプッシュ
- [ ] Cloudflare R2バケットを作成
- [ ] R2 APIトークンを取得
- [ ] Renderにバックエンドをデプロイ
- [ ] Renderにフロントエンドをデプロイ
- [ ] バックエンドの`FRONTEND_URL`を更新
- [ ] UptimeRobotでモニター設定
- [ ] バックエンドAPI動作確認（/api/health）
- [ ] フロントエンド動作確認
- [ ] テスト応募を実施

---

## 🚀 次のステップ

### すぐにできること（無料）

1. **カスタムURLを設定**
   - Renderの設定でURLを変更可能（例: `jaisfc.onrender.com`）

2. **SNSでシェア**
   - TwitterやFacebookでサイトを宣伝

3. **応募を開始**
   - 本番用のStripe/PayPalキーに変更
   - `PAYPAL_MODE`を`live`に変更

### 将来的に検討（有料）

1. **独自ドメイン取得**（年間1,000円〜）
   - よりプロフェッショナルなURL
   - ブランディング向上

2. **Render有料プラン**（$7/月〜）
   - スリープなし
   - より高速な応答

---

## 💡 よくある質問

### Q: Renderのサブドメインは変更できますか？

A: **はい**。Renderの設定で変更可能です：
1. Render → サービスを選択 → Settings
2. 「Service Name」を変更
3. URLが自動的に更新されます

### Q: 無料でどれくらいの応募を処理できますか？

A: **月間数百〜数千件の応募**は問題なく処理できます。
- Render: 月750時間（常時稼働可能）
- Cloudflare R2: 月10GB（動画200本程度、1本50MBの場合）

### Q: 商用利用は可能ですか？

A: **はい**。すべてのサービスで商用利用が許可されています。

### Q: 後から独自ドメインに変更できますか？

A: **はい**。いつでも独自ドメインを追加できます。
- Cloudflare DNSガイドを参照してください

---

## 🎊 おめでとうございます！

**完全無料**で Japan AI Short Film Competition が公開されました！

**あなたのサイト**:
👉 https://japan-ai-frontend.onrender.com

---

**作成日**: 2025年10月19日
**総費用**: **0円**
**対象**: 完全無料でサイトを運営したい方

---

© 2025 Japan AI Short Film Competition. All rights reserved.
