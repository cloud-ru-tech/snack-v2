const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"]/g, char => ESCAPE_MAP[char]);
}

/**
 * Картинка-заглушка для фикстур stories — инлайн-SVG в `data:`-URI.
 *
 * Внешние сервисы-заглушки (`placehold.co` и подобные) в фикстурах не
 * используются: visual baseline снимается без гарантии сети, и не успевшая
 * загрузиться картинка молча фиксируется в эталоне как пустое место —
 * регрессия при этом выглядит как «так и было».
 *
 * @param width Ширина в пикселях.
 * @param height Высота в пикселях.
 * @param text Подпись по центру.
 */
export function placeholderImage(width: number, height: number, text: string): string {
  const fontSize = Math.max(12, Math.round(Math.min(width, height) / 8));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    '<rect width="100%" height="100%" fill="#e0e0e0"/>' +
    `<text x="50%" y="50%" fill="#9e9e9e" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" ` +
    `text-anchor="middle" dominant-baseline="central">${escapeXml(text)}</text>` +
    '</svg>';

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
