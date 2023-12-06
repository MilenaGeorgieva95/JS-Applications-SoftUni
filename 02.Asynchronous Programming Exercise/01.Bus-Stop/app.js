async function getInfo() {
  const input = document.querySelector("#stopId");
  const stopName = document.querySelector("#stopName");
  const resultUl = document.querySelector("#buses");

  const url = `http://localhost:3030/jsonstore/bus/businfo/${input.value}`;

  try {
    resultUl.replaceChildren();

    const response = await fetch(url);
    if (response.status != 200) {
      throw "Error";
    }
    const data = await response.json();
    if (!data.name || !data.buses) {
      throw "Error";
    }
    stopName.textContent = data.name;
    for (let [busId, time] of Object.entries(data.buses)) {
      let text = `Bus ${busId} arrives in ${time} minutes`;
      let newLi = document.createElement("li");
      newLi.textContent = text;
      resultUl.appendChild(newLi);
    }
  } catch (error) {
    input.value = "";
    stopName.textContent = error;
  }
}
