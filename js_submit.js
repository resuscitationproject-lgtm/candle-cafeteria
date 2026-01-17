/**
 * Google Formsへデータを送信（GAS経由）
 */
async function submitToGoogleForm(data) {
    try {
        // GAS Web Appに送信
        const response = await fetch(CONFIG.FORM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: data.type,
                name: data.name,
                category: data.category,
                price: data.price,
                contact: data.contact || '',
                memo: data.memo || ''
            })
        });

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || '送信に失敗しました');
        }
        
        return true;

    } catch (error) {
        console.error('送信エラー:', error);
        throw error;
    }
}

/**
 * ローカルストレージにバックアップ保存
 * (送信失敗時の保険)
 */
function saveToLocalStorage(data) {
    const key = 'enjin_backup_' + Date.now();
    localStorage.setItem(key, JSON.stringify(data));
}
