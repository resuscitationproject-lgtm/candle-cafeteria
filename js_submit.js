/**
 * Google Formsへデータを送信
 */
async function submitToGoogleForm(data) {
  const formData = new FormData();
  
  // エントリーIDに値を設定
  formData.append(CONFIG.ENTRY_IDS.type, data.type);
  formData.append(CONFIG.ENTRY_IDS.name, data.name);
  formData.append(CONFIG.ENTRY_IDS.category, data.category);
  formData.append(CONFIG.ENTRY_IDS.price, data.price);
  formData.append(CONFIG.ENTRY_IDS.contact, data.contact || '');
  formData.append(CONFIG.ENTRY_IDS.memo, data.memo || '');
  
  try {
    // Google Formsに送信（CORS制限を回避するためno-corsモード）
    await fetch(CONFIG.FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
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
