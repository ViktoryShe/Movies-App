export function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  }
  const truncated = text.substr(0, maxLength)
  return truncated.substr(0, truncated.lastIndexOf(' ')) + '...'
}
