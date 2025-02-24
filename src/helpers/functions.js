export function getCoverPath(coverFileName) {
  return `./public/img/books/${coverFileName || 'book-placeholder.webp'}`
}
