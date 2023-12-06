function lockedProfile() {
  const main = document.querySelector("#main");
  const uri = "http://localhost:3030/jsonstore/advanced/profiles/";

  async function createProfiles() {
    main.replaceChildren();
    const response = await fetch(uri);
    const data = await response.json();
    Object.values(data).forEach((obj) => {
      let template = createProfileCard(
        obj.username,
        obj._id,
        obj.email,
        obj.age
      );
      main.appendChild(template);
    });
  }
  createProfiles();

  function onShowMore(event) {
    const profileDiv = event.target.parentElement;
    const radioBtn = profileDiv.querySelector('input[type="radio"]:checked');
    if (radioBtn.value === "unlock") {
      const hiddenDiv = profileDiv.querySelector("#user1HiddenFields");
      hiddenDiv.style.display = "block";
      const hideItBtn = profileDiv.lastChild;
      hideItBtn.textContent = "Hide it";
      hideItBtn.removeEventListener("click", onShowMore);
      hideItBtn.addEventListener("click", onHide);
    }
  }

  function onHide(event) {
    const profileDiv = event.target.parentElement;
    const radioBtn = profileDiv.querySelector('input[type="radio"]:checked');
    if (radioBtn.value === "lock") {
      return;
    }
    const showBtn = profileDiv.lastChild;
    showBtn.textContent = "Show more";
    showBtn.removeEventListener("click", onHide);
    showBtn.addEventListener("click", onShowMore);
    const hiddenDiv = profileDiv.querySelector("#user1HiddenFields");
    hiddenDiv.style.display = "none";
  }

  function createProfileCard(name, id, email, age) {
    let text = `				
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="${id}" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="${id}" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value="${name}" disabled readonly />
        <div id="user1HiddenFields" style="display:none">
        <hr>
        <label>Email:</label>
        <input type="email" name="user1Email" value="${email}" disabled readonly />
        <label>Age:</label>
        <input type="email" name="user1Age" value="${age}" disabled readonly />
        </div>
        <button>Show more</button>`;

    let curDiv = document.createElement("div");
    curDiv.classList.add("profile");
    curDiv.innerHTML = text;
    let showMoreBtn = curDiv.querySelector("button");
    showMoreBtn.addEventListener("click", onShowMore);
    return curDiv;
  }
}
