let list = [];
list = JSON.parse(localStorage.getItem("favlistarr"));

var favourite_container = document.getElementById("favourite-container");

console.log(list);

function display(heroId) {
  fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${heroId}?&ts=2&apikey=ae65d07d9a338e3c6f06471f5c3f2197&hash=f8add0de88b8d44f35dd9de8730bce26`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let hero = data.data.results[0];
      let div = document.createElement("div");

      div.innerHTML = `<img id="${heroId}" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="" />
        <h1>${hero.name}</h1>
        
        <button class="btn btn-primary" id="remove" type="submit" onclick="remove(${heroId})" value=${heroId}>Remove</button>
        `;

      favourite_container.append(div);
    });
}

function fetchList() {
  list.forEach((el) => {
    display(el);
  });
}

function remove(value) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      list.splice(i, 1);
    }
  }
  // console.log("remove running ")
  localStorage.setItem("favlistarr", JSON.stringify(list));
  favourite_container.innerHTML = "";
  fetchList();
}

fetchList();
