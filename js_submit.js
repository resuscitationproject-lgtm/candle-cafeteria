/**
 * Google Formsへデータを送信（JSONP方式 - CORS回避）
 */
async function submitToGoogleForm(data) {
    return new Promise((resolve, reject) => {
        // コールバック関数名
        const callbackName = 'jsonpCallback_' + Date.now();
        
        // グローバルコールバック関数を作成
        window[callbackName] = function(response) {
            delete window[callbackName];
            document.body.removeChild(script);
            
            if (response.success) {
                resolve(response);
            } else {
                reject(new Error(response.error || '送信に失敗しました'));
            }
        };
        
        // URLパラメータを構築
        const params = new URLSearchParams({
            callback: callbackName,
            type: data.type,
            name: data.name,
            category: data.category,
            price: data.price,
            contact: data.contact || '',
            memo: data.memo || ''
        });
        
        // scriptタグを作成してリクエスト送信
        const script = document.createElement('script');
        script.src = CONFIG.FORM_URL + '?' + params.toString();
        script.onerror = function() {
            delete window[callbackName];
            document.body.removeChild(script);
            reject(new Error('ネットワークエラー'));
        };
        
        document.body.appendChild(script);
        
        // タイムアウト設定（10秒）
        setTimeout(() => {
            if (window[callbackName]) {
                delete window[callbackName];
                document.body.removeChild(script);
                reject(new Error('タイムアウトしました'));
            }
        }, 10000);
    });
}

/**
 * ローカルストレージにバックアップ保存
 */
function saveToLocalStorage(data) {
    const key = 'enjin_backup_' + Date.now();
    localStorage.setItem(key, JSON.stringify(data));
}
