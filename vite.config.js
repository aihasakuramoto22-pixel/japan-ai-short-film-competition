import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  build: {
    // 軽量化設定
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // console.logを削除
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // console関数を完全削除
        passes: 2 // 圧縮を2回実行してさらに最適化
      },
      mangle: {
        safari10: true // Safari 10対応
      }
    },
    rollupOptions: {
      output: {
        // チャンク分割で初期ロードを高速化
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'stripe': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'icons': ['lucide-react'],
          'http': ['axios']
        },
        // ファイル名の最適化
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // ビルド最適化
    target: 'es2015', // 古いブラウザ対応（IEを除く）
    cssCodeSplit: true, // CSSを分割
    sourcemap: false, // 本番環境でソースマップを無効化
    chunkSizeWarningLimit: 1000,
    // アセット最適化
    assetsInlineLimit: 4096 // 4KB以下の画像をインライン化
  },
  // 開発サーバーの最適化
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios', 'lucide-react']
  }
})
