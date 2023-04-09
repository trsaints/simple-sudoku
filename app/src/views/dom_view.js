export function getElement(element) {
  return document.querySelector(`[data-element="${element}"]`);
}
export function getElements(element) {
  return document.querySelectorAll(`[data-element="${element}"]`);
}

export function showElement(element) {
  const target = getElement(element);

  if (target.classList.contains("hidden")) {
    target.classList.remove("hidden");

    target.removeAttribute("aria-hidden");
  }
}

export function hideElement(element) {
  const target = getElement(element);

  if (!target.classList.contains("hidden")) {
    target.classList.add("hidden");

    target.setAttribute("aria-hidden", true);
  }
}

export function clearContent(element) {
  const target = getElement(element);

  const { firstChild } = target;

  console.log(target)

  while (firstChild) target.removeChild(firstChild);
}

export function showPopup(message) {
  const popup = getElement("popup");
  const warnMessage = getElement("warn-message");

  const reset = () => hideElement(popup);
  clearTimeout(reset);

  warnMessage.textContent = message;

  showElement(popup);

  setTimeout(reset, 3000);
}
