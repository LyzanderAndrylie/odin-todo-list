export const htmlToElement = function convertHtmlStringToElement(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

export const htmlToElements = function convertHtmlStringToElements(
  html: string,
) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.childNodes;
};
