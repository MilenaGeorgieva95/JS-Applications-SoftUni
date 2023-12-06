function attachEvents() {
  const selectCategory = document.querySelector("#selectCategory");
  const loadBtn = document.querySelector("#btnLoadPosts");
  loadBtn.addEventListener("click", onLoad);
  const selectToView = document.querySelector("#posts");
  const viewBtn = document.querySelector("#btnViewPost");
  viewBtn.addEventListener("click", onView);
  const ulPostdetails = document.querySelector("#details");

  async function onLoad() {
    const url = `https://swapi.dev/api/${selectCategory.value}`;
    try {
      const response = await fetch(url);
      if (response.ok == false) {
        throw response.status + response.statusText;
      }
      const data = await response.json();
      selectToView.replaceChildren();
      let counter = 1;
      for (let person of data.results) {
        let newOption = document.createElement("option");
        newOption.textContent = person.name;
        newOption.value = counter;
        counter++;
        selectToView.appendChild(newOption);
      }
    } catch (error) {
      ulPostdetails.replaceChildren();
      let errorLi = document.createElement("li");
      errorLi.textContent = "Error occured: " + error;
      ulPostdetails.appendChild(detailsLi);
    }
  }

  async function onView() {
    const url = `https://swapi.dev/api/${selectCategory.value}/${selectToView.value}/`;

    try {
      const response = await fetch(url);
      if (response.ok == false) {
        throw response.status + response.statusText;
      }
      const data = await response.json();

      ulPostdetails.replaceChildren();
      for (let key in data) {
        let detailsLi = document.createElement("li");
        detailsLi.textContent = key + " : " + data[key];
        ulPostdetails.appendChild(detailsLi);
      }
    } catch (error) {
      ulPostdetails.replaceChildren();
      let errorLi = document.createElement("li");
      errorLi.textContent = "Error occured: " + error;
      ulPostdetails.appendChild(errorLi);
    }
  }
}
