/**
 * 名前が履歴に存在するかチェック（JSONP方式）
 */
async function checkNameExists(name) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonpCallback_' + Date.now();
        
        window[callbackName] = function(response) {
            delete window[callbackName];
            document.body.removeChild(script);
            
            if (response.success) {
                resolve(response.exists);
            } else {
                reject(new Error(response.error || 'チェックに失敗しました'));
            }
        };
        
        const params = new URLSearchParams({
            callback: callbackName,
            action: 'checkName',
            name: name
        });
        
        const script = document.createElement('script');
        script.src = CONFIG.FORM_URL + '?' + params.toString();
        script.onerror = function() {
            delete window[callbackName];
            document.body.removeChild(script);
            reject(new Error('ネットワークエラー'));
        };
        
        document.body.appendChild(script);
        
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
 * Google Formsへデータを送信（JSONP方式 - CORS回避）
 */
async function submitToGoogleForm(data) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonpCallback_' + Date.now();
        
        window[callbackName] = function(response) {
            delete window[callbackName];
            document.body.removeChild(script);
            
            if (response.success) {
                resolve(response);
            } else {
                reject(new Error(response.error || '送信に失敗しました'));
            }
        };
        
        const params = new URLSearchParams({
            callback: callbackName,
            type: data.type,
            name: data.name,
            affiliation: data.affiliation || '',
            category: data.category,
            price: data.price,
            contact: data.contact || '',
            memo: data.memo || ''
        });
        
        const script = document.createElement('script');
        script.src = CONFIG.FORM_URL + '?' + params.toString();
        script.onerror = function() {
            delete window[callbackName];
            document.body.removeChild(script);
            reject(new Error('ネットワークエラー'));
        };
        
        document.body.appendChild(script);
        
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
