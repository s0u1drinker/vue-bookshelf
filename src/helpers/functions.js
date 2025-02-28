/**
 * Возвращает путь к картинке с обложкой книги.
 * @param {String} coverFileName
 * @returns
 */
export function getCoverPath(coverFileName) {
  return `/public/img/books/${coverFileName || 'book-placeholder.webp'}`
}
