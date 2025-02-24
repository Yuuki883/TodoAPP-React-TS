export function formatDateJST(dateString: string): string {
  // dateString を Date 型に変換
  const date = new Date(dateString);

  // 日本語 (ja-JP)、タイムゾーン (Asia/Tokyo) を指定し、
  // 年/月/日/曜日/時/分 などをまとめてロケール依存で出力
  return date.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short', // (月) (火) などを表示
    hour: '2-digit',
    minute: '2-digit',
  });
}
