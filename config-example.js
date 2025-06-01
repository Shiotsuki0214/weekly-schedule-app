// Google API設定
// このファイルをconfig.jsという名前でコピーして、実際の値を入力してください
const CONFIG = {
    // Google Cloud Consoleで取得したAPIキー
    API_KEY: 'YOUR_API_KEY_HERE',
    
    // Google Cloud Consoleで取得したOAuth 2.0クライアントID
    CLIENT_ID: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com',
    
    // 使用するGoogle APIのスコープ
    SCOPES: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/spreadsheets',
    
    // Google APIのディスカバリードキュメント
    DISCOVERY_DOCS: [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        'https://sheets.googleapis.com/$discovery/rest?version=v4'
    ],
    
    // 更新対象のGoogleスプレッドシートID
    // URLの/d/と/editの間の文字列
    // 例: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
    SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE'
};
