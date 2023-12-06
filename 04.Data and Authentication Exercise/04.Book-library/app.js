const url = "http://localhost:3030/jsonstore/collections/books";
const loadBtn = document.querySelector("#loadBooks");
const tbody = document.querySelector("tbody");
tbody.addEventListener("click", onEditDelete);
loadBtn.addEventListener("click", onLoadBooks);
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);
const formH3 = form.querySelector("h3");
const formBtn = form.querySelector("button");

async function onLoadBooks() {
  const response = await fetch(url);
  const data = await response.json();
  const books = Object.entries(data);
  let htmlToAppend = "";
  books.forEach((book) => (htmlToAppend += createBookTr(book)));
  tbody.innerHTML = htmlToAppend;
}

function createBookTr(bookArr) {
  const book = `
    <tr>
    <td>${bookArr[1].title}</td>
    <td>${bookArr[1].author}</td>
    <td>
    <button data-id="${bookArr[0]}">Delete</button>
    <button data-id="${bookArr[0]}">Edit</button>
    </td>
    </tr>`;
  return book;
}

async function onSubmit(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  if (!formData.title || !formData.author) {
    return;
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(url, options);
    if (response.ok == false) {
      throw new Error("Error!");
    }
    form.reset();
    onLoadBooks();
  } catch (error) {
    console.log(error);
  }
}

function onEditDelete(event) {
  if (event.target.tagName != "BUTTON") {
    return;
  }
  const button = event.target;
  const id = button.dataset.id;
  const [bookTitle, bookAuthor, btns] = [
    ...button.parentElement.parentElement.children,
  ];

  if (button.textContent == "Delete") {
    onDelete();
  }
  if (button.textContent == "Edit") {
    form.elements["title"].value = bookTitle.textContent;
    form.elements["author"].value = bookAuthor.textContent;
    formH3.textContent = "Edit FORM";
    formBtn.textContent = "Save";
    form.removeEventListener("submit", onSubmit);
    form.addEventListener("submit", onSave);
  }

  async function onSave(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    if (!formData.title || !formData.author) {
      return;
    }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(url + "/" + id, options);
      if (response.ok == false) {
        throw new Error("Error!");
      }
      form.reset();
      formH3.textContent = "FORM";
      formBtn.textContent = "Submit";
      form.removeEventListener("submit", onSave);
      form.addEventListener("submit", onSubmit);
      onLoadBooks();
    } catch (error) {
      console.log(error);
    }
  }

  async function onDelete() {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url + "/" + id, options);
      if (response.ok == false) {
        throw new Error("Error!");
      }
      onLoadBooks();
    } catch (error) {
      console.log(error);
    }
  }
}
