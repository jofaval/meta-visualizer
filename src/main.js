/**
 * @param {Event} evt
 * @returns {{
 *   url: string,
 *   getCoverImgUrl: boolean,
 * }}
 */
function parseFormData(evt) {
  const formData = new FormData(evt.target);

  const url = formData.get("url");
  const getCoverImgUrl = !!formData.get("getCoverImgUrl");

  return { url, getCoverImgUrl };
}

/**
 * @param {{
 *   url: string,
 *   getCoverImgUrl: boolean,
 * }} data
 */
async function getUrlContent({ url, getCoverImgUrl }) {
  console.log({ url });
  const response = await fetch({ url: new URL(url) });
  console.log({ response });
  const content = await response.text();
  console.log({ content });
  return content;
}

/**
 * @param {string} content
 * @returns {{
 *   coverUrl: string,
 *   title: string,
 *   description: string,
 * }}
 */
async function getDataFromUrlContent(content) {
  return new Promise((resolve) => {
    resolve({
      coverUrl: "https://picsum.photos/id/237/200/300",
      description: "nope",
      title: "nope",
    });
  });
}

/**
 * @param {string} title
 */
function renderTitle(title) {
  const titleElement =
    document.querySelector("#resultVisualizer h3") ??
    document.createElement("h3");
  titleElement.classList.add("meta-title");
  titleElement.innerText = title;
  return titleElement;
}

/**
 * @param {string} description
 */
function renderDescription(description) {
  const descriptionElement =
    document.querySelector("#resultVisualizer p") ??
    document.createElement("p");
  descriptionElement.classList.add("meta-description");
  descriptionElement.innerText = description;
  return descriptionElement;
}

/**
 * @param {string} cover
 * @param {string?} alt
 */
function renderCover(cover, alt) {
  const imageElement =
    document.querySelector("#resultVisualizer img") ??
    document.createElement("img");
  imageElement.classList.add("meta-image");
  imageElement.src = cover;
  imageElement.alt = alt ?? "Cover image";
  return imageElement;
}

/**
 * @param {{
 *   coverUrl: string,
 *   title: string,
 *   description: string,
 * }} data
 */
function generateHtmlFromContentData(data) {
  const container = document.createElement("div");
  container.classList.add("container");

  container.appendChild(renderCover(data.coverUrl));
  container.appendChild(renderTitle(data.title));
  container.appendChild(renderDescription(data.description));

  return container;
}

/**
 * @param {{
 *   coverUrl: string,
 *   title: string,
 *   description: string,
 * }} data
 */
function render(contentData) {
  const renderContent = generateHtmlFromContentData(contentData);
  document.querySelector("#resultVisualizer").appendChild(renderContent);
}

/**
 * @param {Event} evt
 */
function handleSubmit(evt) {
  const event = evt || window.event;
  event.preventDefault();

  try {
    (async () => {
      const formData = parseFormData(evt);
      const contentData = await getDataFromUrlContent(
        await getUrlContent(formData)
      );
      render(contentData);
    })();
  } catch (error) {
    console.error(error);
  }

  return false;
}

(() => {
  const form = document.getElementById("metaDetailsForm");
  form.addEventListener("submit", handleSubmit);
})();
