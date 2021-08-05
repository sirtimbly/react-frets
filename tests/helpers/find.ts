export const findByTagAndText = (
  container: Element,
  tag: string,
  html: string
): Element | undefined => {
  return Array.from(container.querySelectorAll(tag)).find(
    (x) => x.innerHTML === html
  )
}
