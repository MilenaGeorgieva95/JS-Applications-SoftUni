function lockedProfile() {
  const main = document.querySelector("#main");
  const uri = "http://localhost:3030/jsonstore/advanced/profiles/";

  async function createProfiles() {
    main.replaceChildren();
    const response = await fetch(uri);
    const data = await response.json();
    Object.values(data).forEach((obj) => {
      let template = createProfileCard(obj.username, obj._id);
      main.appendChild(template);
    });
  }
  createProfiles();

  async function onShowMore(event) {
    const profileDiv = event.target.parentElement;
    const radioBtn = profileDiv.querySelector('input[type="radio"]:checked');
    if (radioBtn.value === "unlock") {
      const profileUri = uri + radioBtn.name;
      const response = await fetch(profileUri);
      const data = await response.json();
      const detailsDiv = createDetailsCard(data.email, data.age);
      profileDiv.lastChild.remove();
      profileDiv.appendChild(detailsDiv);
      const hideItBtn = document.createElement("button");
      hideItBtn.textContent = "Hide it";
      hideItBtn.addEventListener("click", onHide);
      profileDiv.appendChild(hideItBtn);
    }
  }

  function onHide(event) {
    const profileDiv = event.target.parentElement;
    const radioBtn = profileDiv.querySelector('input[type="radio"]:checked');
    if (radioBtn.value === "lock") {
      return;
    }
    profileDiv.lastChild.remove();
    profileDiv.lastChild.remove();
    const showBtn = document.createElement("button");
    showBtn.textContent = "Show more";
    showBtn.addEventListener("click", onShowMore);
    profileDiv.appendChild(showBtn);
  }

  function createProfileCard(name, id) {
    let text = `				
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="${id}" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="${id}" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value="${name}" disabled readonly />
        <button>Show more</button>`;

    let curDiv = document.createElement("div");
    curDiv.classList.add("profile");
    curDiv.innerHTML = text;
    let showMoreBtn = curDiv.querySelector("button");
    showMoreBtn.addEventListener("click", onShowMore);
    return curDiv;
  }

  function createDetailsCard(email, age) {
    let text2 = `
    <hr>
    <label>Email:</label>
    <input type="email" name="user1Email" value="${email}" disabled readonly />
    <label>Age:</label>
    <input type="email" name="user1Age" value="${age}" disabled readonly />`;

    let detailsDiv = document.createElement("div");
    detailsDiv.classList.add("user1HiddenFields");
    detailsDiv.innerHTML = text2;
    return detailsDiv;
  }
}
