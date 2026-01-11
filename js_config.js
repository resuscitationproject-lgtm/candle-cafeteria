// Google Forms 設定
// 以下のIDは実際のGoogle FormsのIDに置き換える
const CONFIG = {
  // Google FormsのURL (後で設定)
  FORM_URL: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
  
  // 各項目のentry ID (後で設定)
  ENTRY_IDS: {
    type: 'entry.123456789',        // 参加区分（初回/当日）
    name: 'entry.234567890',        // お名前
    category: 'entry.345678901',    // 区分（学生/社会人）
    price: 'entry.456789012',       // 料金
    contact: 'entry.567890123',     // 連絡先
    memo: 'entry.678901234',        // 備考
    timestamp: 'entry.789012345'    // タイムスタンプ
  }
};