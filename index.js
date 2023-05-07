var search = document.getElementById("search-box");

var container = document.getElementById("container");

var submit_btn = document.getElementById("submit-btn");

var list_container = document.getElementById("list");

let hero_arr = [];

function removeElements() {
  list_container.innerHTML = "";
}

function displayWords(value) {
  search.value = value;
  removeElements();
}

search.addEventListener("keyup", async () => {
  removeElements();
  if (search.value.length < 4) {
    return false;
  }
  const url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=2&apikey=ae65d07d9a338e3c6f06471f5c3f2197&hash=f8add0de88b8d44f35dd9de8730bce26&nameStartsWith=${search.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, search.value.length) + "</b>";
    word += name.substr(search.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    list_container.appendChild(div);
  });
});

search.addEventListener("keypress", function (e) {
  let url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=2&apikey=ae65d07d9a338e3c6f06471f5c3f2197&hash=f8add0de88b8d44f35dd9de8730bce26&name=${search.value}`;

  if (e.key === "Enter") {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        var ele = data.data.results;
        loadDetails(ele[0].id);
      });
  }
});

submit_btn.addEventListener("click", function (e) {
  let url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=2&apikey=ae65d07d9a338e3c6f06471f5c3f2197&hash=f8add0de88b8d44f35dd9de8730bce26&name=${search.value}`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      var ele = data.data.results;
      loadDetails(ele[0].id);
    });
});

// public key = ae65d07d9a338e3c6f06471f5c3f2197;

// privatekey=
// e7e51453b965841c3010282de12f3292d8e9a45d;

function loadDetails(heroId) {
  fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${heroId}?&ts=2&apikey=ae65d07d9a338e3c6f06471f5c3f2197&hash=f8add0de88b8d44f35dd9de8730bce26`
  )
    .then((res) => res.json())
    .then((data) => {
      let hero = data.data.results[0];
      let div = document.createElement("div");
      container.innerHTML = "";
      div.innerHTML = `<img id="${heroId}" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="" />
      <h1>${hero.name}</h1>
      <p>${hero.description}</p>
      <button class="btn btn-primary" id="fav" type="submit" onclick="favpush(${heroId})" value=${heroId}>Favourite</button>
      `;

      container.append(div);

      let char_cliclk = document.getElementById(heroId);
      char_cliclk.addEventListener("click", function () {
        window.open(hero.urls[0].url);
      });
    });
}

function favpush(favid) {
  console.log(favid);
  if (hero_arr.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
  }
  hero_arr.push(favid);
  // console.log(data.id + data.name);
  console.log(hero_arr);
  localStorage.setItem("favlistarr", JSON.stringify(hero_arr));
}
