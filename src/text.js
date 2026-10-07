// Divide un texto en palabras animables.
// *texto* se resalta con <em>; "\n" fuerza salto de línea.
export function splitWords(text, start = 0) {
  let i = start;
  let inEm = false;

  const renderToken = (token) =>
    token.split('*').map((part, idx) => {
      if (idx > 0) inEm = !inEm;
      return part && inEm ? `<em>${part}</em>` : part;
    }).join('');

  return text.split('\n').map((line) =>
    line.split(/(\s+)/).map((token) => {
      if (!token.trim()) return token;
      return `<span class="w" style="--i:${i++}">${renderToken(token)}</span>`;
    }).join('')
  ).join('<br>');
}
