# 週案管理システム

週案の画像をアップロードして、Googleカレンダーとスプレッドシートに自動登録するWebアプリケーションです。

## 機能

- 📸 週案画像のOCR読み取り
- 📅 Googleカレンダーへの自動登録
- 📊 Googleスプレッドシートへの実施時間数の自動入力
- ✏️ 読み取り結果の手動編集機能
- 🔐 Google OAuth認証によるセキュリティ

## セットアップ手順

### 1. Google Cloud Consoleでの準備

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成
3. 以下のAPIを有効化：
   - Google Calendar API
   - Google Sheets API

### 2. 認証情報の作成

1. 「APIとサービス」→「認証情報」へ移動
2. 「認証情報を作成」→「APIキー」を選択してAPIキーを作成
3. 「認証情報を作成」→「OAuth クライアント ID」を選択
   - アプリケーションの種類：「ウェブアプリケーション」
   - 承認済みのJavaScriptオリジン：`https://[YOUR-GITHUB-USERNAME].github.io`
   - 承認済みのリダイレクトURI：同上

### 3. スプレッドシートの準備

1. 対象のGoogleスプレッドシートを開く
2. 以下のシートを作成：
   - 「データ」シート：教科の実施時間数を記録
   - 「週案」シート：週案データを記録
3. URLから`SPREADSHEET_ID`を取得（`/d/`と`/edit`の間の文字列）

### 4. ファイルの設定

1. `config.example.js`を`config.js`にコピー
2. 以下の値を設定：
   ```javascript
   const CONFIG = {
       API_KEY: 'YOUR_API_KEY_HERE',
       CLIENT_ID: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com',
       SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE'
   };
   ```

### 5. GitHub Pagesでの公開

1. GitHubリポジトリを作成
2. すべてのファイルをアップロード：
   - index.html
   - styles.css
   - script.js
   - config.js（.gitignoreに追加推奨）
   - config.example.js
3. リポジトリの設定でGitHub Pagesを有効化
4. `https://[YOUR-GITHUB-USERNAME].github.io/[REPOSITORY-NAME]/`でアクセス

## 使い方

1. **Google認証**
   - 「Googleアカウントでログイン」ボタンをクリック
   - Googleアカウントで認証

2. **画像アップロード**
   - 週案の画像をドラッグ&ドロップまたはクリックしてアップロード

3. **OCR処理**
   - 「画像を解析」ボタンをクリック
   - 処理完了まで待機（進捗バーで確認可能）

4. **データ確認・編集**
   - OCR結果を確認し、必要に応じて手動で修正

5. **登録実行**
   - 週の開始日（月曜日）を選択
   - 「登録実行」ボタンをクリック

## ファイル構成

```
weekly-planner/
├── index.html          # メインのHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # メインのJavaScriptロジック
├── config.js           # API設定（要作成）
├── config.example.js   # API設定のサンプル
└── README.md          # このファイル
```

## セキュリティに関する注意

- `config.js`ファイルには機密情報が含まれるため、`.gitignore`に追加することを推奨
- APIキーには適切な制限（HTTPリファラー制限など）を設定
- 本番環境ではサーバーサイドでの実装を推奨

## トラブルシューティング

### OCRが正しく動作しない場合
- 画像が鮮明であることを確認
- 文字が水平に配置されているか確認
- 日本語のOCRライブラリが正しく読み込まれているか確認

### Google API関連のエラー
- APIが有効化されているか確認
- 認証情報が正しく設定されているか確認
- スコープが適切に設定されているか確認

### スプレッドシートへの書き込みエラー
- スプレッドシートIDが正しいか確認
- アクセス権限があるか確認
- シート名が正しいか確認

## 技術スタック

- **OCR**: Tesseract.js
- **認証**: Google OAuth 2.0
- **API**: Google Calendar API, Google Sheets API
- **ホスティング**: GitHub Pages

## ライセンス

MIT License

## 作者

[Your Name]

## 更新履歴

- 2025-06-01: 初版リリース