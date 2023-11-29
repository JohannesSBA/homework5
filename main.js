const key = "tISsSGyGxYAyRgIduPy6QAYekGppvxvQ";
const secret = "jd2AK6YIbQ8Tzqxv";

const result = document.getElementById("result");
const length = document.getElementById("length");
const desc = document.getElementById("desc");

function changeClass() {
  var left = document.querySelector("#left");
  var right = document.querySelector("#right");
  left.classList.replace("left", "leftAfter");
  right.classList.replace("right", "rightAfter");
}

function submitForm() {
  let inputValue = document.getElementById("textInput").value;
  execute(inputValue);
  changeClass();
}

function execute(input) {
  result.innerHTML = "";
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${input}&sort=newest&api-key=${key}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    })
    .then((data) => {
      length.innerHTML = `<p>There are ${data.response.docs.length} articles on ${input}</p>`;
      desc.innerHTML = `<p>Click On the Cards to Go to the Article</p>`;

      data.response.docs.forEach(function (article, index) {
        setTimeout(function () {
          const articleElement = document.createElement("div");
          articleElement.className = "articleCard newArticle"; 
          articleElement.innerHTML = `<a href="${
            article.web_url
          }" target="_blank"><div class="articleCardContent"> <h4>${
            article.headline.main
          }</h4> 
            <div class="info"><small>${
              article.byline.original ? article.byline.original : "By unknown"
            }</small> <small>${article.pub_date}<small> <small>${
            article.section_name
          }<small> <small>Source: ${article.source}</small> <small>Type: ${
            article.type_of_article
          }</small></div>
            <small class="abstract">${article.abstract}</small>
            <div class="link"></div>
            </div></a>`;

          result.appendChild(articleElement);
          articleElement.classList.add("fadeInUp");
        }, 500 * index);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// web_url
// :
// "https://www.nytimes.com/2023/11/28/dining/bold-flavors-in-fast-dishes.html"

// word_count
// :
// 539
