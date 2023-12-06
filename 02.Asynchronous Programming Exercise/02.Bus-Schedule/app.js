function solve() {
  const departBtn = document.querySelector("#depart");
  const arriveBtn = document.querySelector("#arrive");
  const infoSpan = document.querySelector("#info span");
  const baseURI = "http://localhost:3030/jsonstore/bus/schedule/";

  let busStop = "depot";
  let currentStop = "";

  async function depart() {
    try {
      const response = await fetch(baseURI + busStop);
      const data = await response.json();
      currentStop = data.name;
      busStop = data.next;
      infoSpan.textContent = `Next stop ${currentStop}`;
      departBtn.disabled = true;
      arriveBtn.disabled = false;
    } catch (error) {
      infoSpan.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  function arrive() {
    infoSpan.textContent = `Arriving at ${currentStop}`;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
