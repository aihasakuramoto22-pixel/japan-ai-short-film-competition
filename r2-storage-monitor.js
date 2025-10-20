// R2ストレージ監視機能コード片
// server.jsのDEADLINE定義の後に追加してください

// R2ストレージ使用量をチェックする関数
async function checkR2StorageUsage(r2Client, bucketName) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const response = await r2Client.send(command);
    const objects = response.Contents || [];

    // 合計サイズを計算（バイト単位）
    const totalBytes = objects.reduce((sum, obj) => sum + (obj.Size || 0), 0);
    const totalGB = (totalBytes / (1024 * 1024 * 1024)).toFixed(2);

    console.log(`R2 Storage Usage: ${totalGB} GB / 10 GB`);

    // 警告レベルをチェック
    const usagePercent = (totalBytes / (10 * 1024 * 1024 * 1024)) * 100;

    if (usagePercent >= 90) {
      console.error(`🔴 CRITICAL: R2 storage at ${usagePercent.toFixed(1)}%`);
      // 新規アップロードを停止
      return { allowed: false, usage: totalGB, limit: 10, usagePercent: usagePercent.toFixed(1) };
    } else if (usagePercent >= 80) {
      console.warn(`🟡 WARNING: R2 storage at ${usagePercent.toFixed(1)}%`);
      return { allowed: true, usage: totalGB, limit: 10, usagePercent: usagePercent.toFixed(1), warning: true };
    }

    return { allowed: true, usage: totalGB, limit: 10, usagePercent: usagePercent.toFixed(1) };
  } catch (error) {
    console.error('Failed to check R2 storage:', error);
    return { allowed: true, usage: 0, limit: 10, usagePercent: 0 };
  }
}

// 警告メール送信関数
async function sendStorageWarningEmail(transporter, emailUser, currentGB, usagePercent) {
  const mailOptions = {
    from: emailUser,
    to: emailUser, // 運営者自身に送信
    subject: '⚠️ R2ストレージ警告: 80%到達',
    text: `
R2ストレージ使用量が80%に到達しました。

現在の使用量: ${currentGB} GB / 10 GB (${usagePercent}%)

対策:
1. 古い動画ファイルを削除
2. 不要なファイルを削除
3. ストレージをクリーンアップ

管理画面: https://dash.cloudflare.com/ → R2 → japan-ai-film-competition

このメールは自動送信されています。
Japan AI Short Film Competition 運営システム
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Storage warning email sent');
  } catch (error) {
    console.error('Failed to send warning email:', error);
  }
}
