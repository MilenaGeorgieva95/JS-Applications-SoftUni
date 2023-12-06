function attachEvents() {
  const phonebookUl = document.querySelector("#phonebook");
  phonebookUl.addEventListener("click", onDelete);
  const loadBtn = document.querySelector("#btnLoad");
  const createBtn = document.querySelector("#btnCreate");
  createBtn.addEventListener("click", onCreate);
  const person = document.querySelector("#person");
  const phone = document.querySelector("#phone");
  const baseUrl = "http://localhost:3030/jsonstore/phonebook";

  loadBtn.addEventListener("click", onLoad);

  async function onLoad() {
    phonebookUl.replaceChildren();
    const response = await fetch(baseUrl);
    const data = await response.json();
    const dataArr = Object.values(data);

    dataArr.forEach((person) => {
      console.log(person);
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.dataset.id = person._id;
      const newLi = document.createElement("li");
      newLi.textContent = `${person.person}: ${person.phone}`;
      newLi.appendChild(deleteBtn);
      phonebookUl.appendChild(newLi);
    });
  }

  async function onDelete(event) {
    if (event.target.tagName == "BUTTON") {
      const li = event.target.parentElement;
      const url = baseUrl + "/" + event.target.dataset.id;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      li.remove();
    }
  }

  async function onCreate() {
    if (!person.value || !phone.value) {
      return;
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person: person.value,
        phone: phone.value,
      }),
    });

    person.value = "";
    phone.value = "";
    onLoad();
  }
}

attachEvents();
