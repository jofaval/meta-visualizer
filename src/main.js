/**
 *
 * @param {*} url
 */
function getUrlContent(url) {}

function getDataFromUrlContent() {}

function generateHtmlFromData(params) {}

/**
 *
 * @param {Event} evt
 * @returns
 */
function handleSubmit(evt) {
  const event = evt || window.event;

  event.preventDefault();

  return false;
}

(() => {
  const form = document.getElementById("metaDetailsForm");
  form.addEventListener("submit", handleSubmit);
})();
