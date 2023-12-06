const userDiv = document.querySelector("#user");
userDiv.style.display = "none";
const guestDiv = document.querySelector("#guest");
const pEmail = document.querySelector(".email");
const aLogout = document.querySelector("a#logout");
aLogout.addEventListener("click", onLogout);
const loadBtn = document.querySelector("button.load");
loadBtn.addEventListener("click", onLoad);
const divCatches = document.querySelector("div#catches");
divCatches.innerHTML = "";
const addForm = document.querySelector("form#addForm");
const addBtn = document.querySelector("button.add");
addForm.addEventListener("submit", onAdd);
addForm.reset();

if (sessionStorage.accessToken != null) {
  guestDiv.style.display = "none";
  userDiv.style.display = "inline";
  pEmail.firstElementChild.textContent = sessionStorage.getItem("email");
  addBtn.disabled = false;
}

async function onLogout() {
  try {
    const response = await fetch("http://localhost:3030/users/logout", {
      headers: {
        "X-Authorization": sessionStorage.getItem("accessToken"),
      },
    });
    if (response.status !== 204) {
      throw new Error(response.status);
    }
    sessionStorage.clear();
    window.location = "./index.html";
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoad() {
  try {
    const response = await fetch("http://localhost:3030/data/catches");
    if (response.ok !== true) {
      throw new Error(response.status);
    }
    const data = await response.json();
    const catches = data.map((el) => createCatch(el));
    divCatches.replaceChildren(...catches);
  } catch (error) {
    alert(error.message);
  }
}

function createCatch(catchObj) {
  let disabled = "disabled";
  if (
    catchObj._ownerId === sessionStorage.getItem("id") &&
    sessionStorage.accessToken != null
  ) {
    disabled = "";
  }
  const div = document.createElement("div");
  div.classList.add("catch");
  div.setAttribute("data-id", catchObj._ownerId);
  div.setAttribute("data-catchid", catchObj._id);
  const content = `
<label>Angler</label>
<input type="text" class="angler" value="${catchObj.angler}" ${disabled}>
<label>Weight</label>
<input type="text" class="weight" value="${catchObj.weight}" ${disabled}>
<label>Species</label>
<input type="text" class="species" value="${catchObj.species}" ${disabled}>
<label>Location</label>
<input type="text" class="location" value="${catchObj.location}" ${disabled}>
<label>Bait</label>
<input type="text" class="bait" value="${catchObj.bait}" ${disabled}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${catchObj.captureTime}" ${disabled}>
`;
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("update");
  updateBtn.textContent = "Update";
  updateBtn.disabled = true;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.textContent = "Delete";
  deleteBtn.disabled = true;
  if (
    catchObj._ownerId === sessionStorage.getItem("id") &&
    sessionStorage.getItem("accessToken") != null
  ) {
    updateBtn.addEventListener("click", onUpdate);
    deleteBtn.addEventListener("click", onDelete);
    updateBtn.disabled = false;
    deleteBtn.disabled = false;
  }
  div.innerHTML = content;
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  return div;
}

async function onUpdate(event) {
  const catchId = event.target.parentElement.dataset.catchid;
  const catchParent = event.target.parentElement;
  const [angler, weight, species, location, bait, captureTime] = Array.from(
    catchParent.querySelectorAll("input")
  );
  const upCatch = {
    angler: angler.value,
    weight: weight.value,
    species: species.value,
    location: location.value,
    bait: bait.value,
    captureTime: captureTime.value,
  };

  try {
    const result = await fetch(
      "http://localhost:3030/data/catches/" + catchId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": sessionStorage.getItem("accessToken"),
        },
        body: JSON.stringify(upCatch),
      }
    );
    if (result.ok != true) {
      const err = await result.json();
      throw new Error(err.message);
    }
    const data = await result.json();
    onLoad();
    return data;
  } catch (error) {
    alert(error.message);
  }
}

async function onDelete(e) {
  const catchId = e.target.parentElement.dataset.catchid;
  try {
    const res = await fetch("http://localhost:3030/data/catches/" + catchId, {
      method: "delete",
      headers: {
        "X-Authorization": sessionStorage.getItem("accessToken"),
      },
    });
    if (res.ok != true) {
      const err = await res.json();
      throw new Error(err.message);
    }
    const data = await res.json();
    onLoad();
    return data;
  } catch (error) {
    alert(error.message);
  }
}

async function onAdd(e) {
  e.preventDefault();
  const formData = new FormData(addForm);
  if ([...formData.entries()].some((x) => x[1] === "")) {
    alert("Input field is empty");
    return;
  }

  const newCatch = {
    angler: formData.get("angler"),
    bait: formData.get("bait"),
    captureTime: formData.get("captureTime"),
    location: formData.get("location"),
    species: formData.get("species"),
    weight: formData.get("weight"),
  };
  try {
    const res = await fetch("http://localhost:3030/data/catches", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newCatch),
    });
    if (res.ok != true) {
      const err = await res.json();
      throw new Error(err.message);
    }
    const data = await res.json();
    addForm.reset();
    onLoad();
  } catch (error) {
    alert(error.message);
  }
}
