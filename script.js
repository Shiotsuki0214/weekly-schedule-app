// グローバル変数
let auth2;
let weekPlanData = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
};

// 週時程表データ（CSVから読み込んだデータをハードコード）
const timeSchedule = {
    monday: [
        { subject: '読書タイム', start: '8:10', end: '8:25' },
        { subject: '1時間目', start: '8:40', end: '9:25' },
        { subject: '2時間目', start: '9:30', end: '10:15' },
        { subject: '中休み', start: '10:15', end: '10:35' },
        { subject: '3時間目', start: '10:35', end: '11:20' },
        { subject: '4時間目', start: '11:25', end: '12:10' },
        { subject: '給食', start: '12:10', end: '12:50' },
        { subject: '昼休み', start: '12:50', end: '13:20' },
        { subject: '5時間目', start: '13:25', end: '14:10' },
        { subject: '6時間目', start: '14:15', end: '15:00' },
        { subject: '帰りの会', start: '15:00', end: '15:15' }
    ],
    tuesday: [
        { subject: '学び子（算数）', start: '8:10', end: '8:25' },
        { subject: '1時間目', start: '8:40', end: '9:25' },
        { subject: '2時間目', start: '9:30', end: '10:15' },
        { subject: '中休み', start: '10:15', end: '10:35' },
        { subject: '3時間目', start: '10:35', end: '11:20' },
        { subject: '4時間目', start: '11:25', end: '12:10' },
        { subject: '給食', start: '12:10', end: '12:50' },
        { subject: '昼休み', start: '12:50', end: '13:20' },
        { subject: '清掃', start: '13:25', end: '13:45' },
        { subject: '5時間目', start: '13:45', end: '14:30' },
        { subject: '6時間目', start: '14:35', end: '15:20' },
        { subject: '帰りの会', start: '15:20', end: '15:35' }
    ],
    wednesday: [
        { subject: 'フッ化物洗口', start: '8:10', end: '8:25' },
        { subject: '1時間目', start: '8:40', end: '9:25' },
        { subject: '2時間目', start: '9:30', end: '10:15' },
        { subject: '中休み', start: '10:15', end: '10:35' },
        { subject: '3時間目', start: '10:35', end: '11:20' },
        { subject: '4時間目', start: '11:25', end: '12:10' },
        { subject: '給食', start: '12:10', end: '12:50' },
        { subject: '昼休み', start: '12:50', end: '13:20' },
        { subject: '清掃', start: '13:25', end: '13:45' },
        { subject: '5時間目', start: '13:45', end: '14:30' },
        { subject: '帰りの会', start: '14:30', end: '14:45' }
    ],
    thursday: [
        { subject: '全校タイム', start: '8:10', end: '8:25' },
        { subject: '1時間目', start: '8:40', end: '9:25' },
        { subject: '2時間目', start: '9:30', end: '10:15' },
        { subject: '中休み', start: '10:15', end: '10:35' },
        { subject: '3時間目', start: '10:35', end: '11:20' },
        { subject: '4時間目', start: '11:25', end: '12:10' },
        { subject: '給食', start: '12:10', end: '12:50' },
        { subject: '昼休み', start: '12:50', end: '13:20' },
        { subject: '5時間目', start: '13:25', end: '14:10' },
        { subject: '6時間目', start: '14:15', end: '15:00' },
        { subject: '帰りの会', start: '15:00', end: '15:15' }
    ],
    friday: [
        { subject: '学び子（国語）', start: '8:10', end: '8:25' },
        { subject: '1時間目', start: '8:40', end: '9:25' },
        { subject: '2時間目', start: '9:30', end: '10:15' },
        { subject: '中休み', start: '10:15', end: '10:35' },
        { subject: '3時間目', start: '10:35', end: '11:20' },
        { subject: '4時間目', start: '11:25', end: '12:10' },
        { subject: '給食', start: '12:10', end: '12:50' },
        { subject: '昼休み', start: '12:50', end: '13:20' },
        { subject: '清掃', start: '13:25', end: '13:45' },
        { subject: '5時間目', start: '13:45', end: '14:30' },
        { subject: '6時間目', start: '14:35', end: '15:20' },
        { subject: '帰りの会', start: '15:20', end: '15:35' }
    ]
};

// DOMが読み込まれたら初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// アプリの初期化
function initializeApp() {
    // イベントリスナーの設定
    setupEventListeners();
    
    // 今週の月曜日を初期値として設定
    setDefaultWeekStartDate();
    
    // Google APIの初期化
    if (window.gapi) {
        handleClientLoad();
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // Google認証ボタン
    document.getElementById('authBtn').addEventListener('click', handleAuthClick);
    
    // ファイルアップロード
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    
    // ドラッグ&ドロップ
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    
    // OCR処理ボタン
    document.getElementById('ocrBtn').addEventListener('click', performOCR);
    
    // 登録ボタン
    document.getElementById('registerBtn').addEventListener('click', registerToGoogleServices);
}

// 今週の月曜日を初期値として設定
function setDefaultWeekStartDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    
    const dateStr = monday.toISOString().split('T')[0];
    document.getElementById('weekStartDate').value = dateStr;
}

// Google API関連
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: CONFIG.API_KEY,
        clientId: CONFIG.CLIENT_ID,
        discoveryDocs: CONFIG.DISCOVERY_DOCS,
        scope: CONFIG.SCOPES
    }).then(() => {
        auth2 = gapi.auth2.getAuthInstance();
        auth2.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(auth2.isSignedIn.get());
    }).catch(error => {
        addLog('Google API初期化エラー: ' + error.message, 'error');
    });
}

function updateSigninStatus(isSignedIn) {
    const authBtn = document.getElementById('authBtn');
    const authStatus = document.getElementById('authStatus');
    
    if (isSignedIn) {
        authBtn.textContent = 'ログアウト';
        authStatus.textContent = 'ログイン済み';
        authStatus.className = 'status success';
        document.getElementById('ocrBtn').disabled = false;
    } else {
        authBtn.textContent = 'Googleアカウントでログイン';
        authStatus.textContent = '未ログイン';
        authStatus.className = 'status error';
        document.getElementById('ocrBtn').disabled = true;
    }
}

function handleAuthClick() {
    // auth2 が初期化されているか確認
    if (auth2) {
        if (auth2.isSignedIn.get()) {
            auth2.signOut();
        } else {
            auth2.signIn();
        }
    } else {
        // auth2 がまだ初期化されていない場合のログ
        addLog('Google認証がまだ初期化されていません。しばらくお待ちください。', 'warning');
        // 必要に応じて、認証ボタンを一時的に無効にするなどのUIフィードバックを追加
    }
}

// ファイル処理
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        addLog('画像ファイルを選択してください', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            displayImage(e.target.result);
            document.getElementById('ocrBtn').disabled = false;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function displayImage(src) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = `<img src="${src}" alt="週案画像">`;
}

// OCR処理
async function performOCR() {
    const img = document.querySelector('#imagePreview img');
    if (!img) {
        addLog('画像が選択されていません', 'error');
        return;
    }
    
    document.getElementById('ocrBtn').disabled = true;
    document.getElementById('ocrProgress').style.display = 'block';
    
    try {
        const worker = Tesseract.createWorker({
            logger: m => {
                if (m.status === 'recognizing text' && m.progress) {
                    updateProgress(Math.round(m.progress * 100));
                }
            }
        });
        
        await worker.load();
        await worker.loadLanguage('jpn');
        await worker.initialize('jpn');
        
        const { data: { text } } = await worker.recognize(img.src);
        await worker.terminate();
        
        document.getElementById('ocrResult').textContent = text;
        parseWeekPlan(text);
        
        document.getElementById('ocrProgress').style.display = 'none';
        document.getElementById('registerBtn').disabled = false;
        
        addLog('OCR処理が完了しました', 'success');
    } catch (error) {
        addLog('OCR処理エラー: ' + error.message, 'error');
        document.getElementById('ocrProgress').style.display = 'none';
    } finally {
        document.getElementById('ocrBtn').disabled = false;
    }
}

function updateProgress(percent) {
    const fill = document.querySelector('.progress-fill');
    const text = document.querySelector('.progress-text');
    fill.style.width = percent + '%';
    text.textContent = percent + '%';
}

// 週案データの解析
function parseWeekPlan(text) {
    // テキストから週案データを抽出
    const lines = text.split('\n');
    const subjects = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    };
    
    // 教科名のパターン
    const subjectPatterns = ['国語', '算数', '理科', '社会', '体育', '図工', '音楽', '家庭', '外国語', '道徳', '総合', '特活', '学活', '書写'];
    
    // 簡易的なパース（実際の画像に合わせて調整が必要）
    // ここでは仮の実装として、サンプルデータを設定
    subjects.monday = ['国語', '算数', '総合', '理科', '図工', '図工'];
    subjects.tuesday = ['算数', '国語', '社会', '体育', '理科', '委員会活動'];
    subjects.wednesday = ['特活', '国語', '算数', '外国語', '社会', ''];
    subjects.thursday = ['算数', '国語', '社会', '外国語', '音楽', '総合'];
    subjects.friday = ['国語', '算数', '家庭', '理科', '総合', '総合'];
    
    weekPlanData = subjects;
    displayWeekPlanEditor(subjects);
}

// 週案エディターの表示
function displayWeekPlanEditor(data) {
    const editor = document.getElementById('weekPlanEditor');
    let html = '<table class="week-table"><thead><tr><th>時限</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th></tr></thead><tbody>';
    
    for (let i = 0; i < 6; i++) {
        html += `<tr><td>${i + 1}時間目</td>`;
        html += `<td><input type="text" value="${data.monday[i] || ''}" data-day="monday" data-period="${i}"></td>`;
        html += `<td><input type="text" value="${data.tuesday[i] || ''}" data-day="tuesday" data-period="${i}"></td>`;
        html += `<td><input type="text" value="${data.wednesday[i] || ''}" data-day="wednesday" data-period="${i}"></td>`;
        html += `<td><input type="text" value="${data.thursday[i] || ''}" data-day="thursday" data-period="${i}"></td>`;
        html += `<td><input type="text" value="${data.friday[i] || ''}" data-day="friday" data-period="${i}"></td>`;
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    editor.innerHTML = html;
    
    // 入力イベントの設定
    editor.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', (e) => {
            const day = e.target.dataset.day;
            const period = parseInt(e.target.dataset.period);
            weekPlanData[day][period] = e.target.value;
        });
    });
}

// Google Calendarとスプレッドシートへの登録
async function registerToGoogleServices() {
    const startDate = new Date(document.getElementById('weekStartDate').value);
    if (!startDate || isNaN(startDate.getTime())) {
        addLog('週の開始日を選択してください', 'error');
        return;
    }
    
    document.getElementById('registerBtn').disabled = true;
    const progressDiv = document.getElementById('registerProgress');
    progressDiv.textContent = '処理中...';
    
    try {
        // カレンダーへの登録
        await registerToCalendar(startDate);
        
        // スプレッドシートへの登録
        await registerToSpreadsheet(startDate);
        
        progressDiv.textContent = '登録が完了しました！';
        addLog('すべての処理が完了しました', 'success');
    } catch (error) {
        progressDiv.textContent = 'エラーが発生しました';
        addLog('登録エラー: ' + error.message, 'error');
    } finally {
        document.getElementById('registerBtn').disabled = false;
    }
}

// カレンダーへの登録
async function registerToCalendar(startDate) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dayNames = ['月', '火', '水', '木', '金'];
    
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const day = days[dayIndex];
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayIndex);
        
        const schedule = timeSchedule[day];
        const subjects = weekPlanData[day];
        
        for (let i = 0; i < 6; i++) {
            const period = schedule.find(s => s.subject === `${i + 1}時間目`);
            if (period && subjects[i]) {
                const event = {
                    summary: `${subjects[i]} (${i + 1}時間目)`,
                    start: {
                        dateTime: `${currentDate.toISOString().split('T')[0]}T${period.start}:00`,
                        timeZone: 'Asia/Tokyo'
                    },
                    end: {
                        dateTime: `${currentDate.toISOString().split('T')[0]}T${period.end}:00`,
                        timeZone: 'Asia/Tokyo'
                    }
                };
                
                try {
                    await gapi.client.calendar.events.insert({
                        calendarId: 'primary',
                        resource: event
                    });
                    addLog(`カレンダー登録: ${dayNames[dayIndex]}曜日 ${i + 1}時間目 ${subjects[i]}`, 'success');
                } catch (error) {
                    addLog(`カレンダー登録エラー: ${error.message}`, 'error');
                }
            }
        }
    }
}

// スプレッドシートへの登録
async function registerToSpreadsheet(startDate) {
    const spreadsheetId = CONFIG.SPREADSHEET_ID;
    
    // 教科ごとの時間数を集計
    const subjectCounts = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    
    days.forEach(day => {
        subjectCounts[day] = {};
        weekPlanData[day].forEach(subject => {
            if (subject) {
                subjectCounts[day][subject] = (subjectCounts[day][subject] || 0) + 1;
            }
        });
    });
    
    // データシートへの書き込み
    const dataRange = 'データ!A1';
    const dataValues = [['曜日', '教科', '時間数']];
    
    days.forEach((day, index) => {
        Object.entries(subjectCounts[day]).forEach(([subject, count]) => {
            dataValues.push([`${index + 2}日`, subject, count]);
        });
    });
    
    try {
        await gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: dataRange,
            valueInputOption: 'USER_ENTERED',
            resource: { values: dataValues }
        });
        
        addLog('スプレッドシート（データシート）への書き込み完了', 'success');
    } catch (error) {
        addLog(`スプレッドシート書き込みエラー: ${error.message}`, 'error');
    }
    
    // 週案シートへの書き込み
    const weekRange = '週案!A1';
    const weekValues = [['時限', '月', '火', '水', '木', '金']];
    
    for (let i = 0; i < 6; i++) {
        const row = [`${i + 1}時間目`];
        days.forEach(day => {
            row.push(weekPlanData[day][i] || '');
        });
        weekValues.push(row);
    }
    
    try {
        await gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: weekRange,
            valueInputOption: 'USER_ENTERED',
            resource: { values: weekValues }
        });
        
        addLog('スプレッドシート（週案シート）への書き込み完了', 'success');
    } catch (error) {
        addLog(`スプレッドシート書き込みエラー: ${error.message}`, 'error');
    }
}

// ログ出力
function addLog(message, type = 'info') {
    const logArea = document.getElementById('logArea');
    const timestamp = new Date().toLocaleTimeString('ja-JP');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${timestamp}] ${message}`;
    logArea.appendChild(logEntry);
    logArea.scrollTop = logArea.scrollHeight;
}
