window.addEventListener("load", loadStudents);

const url = "http://localhost:3030/jsonstore/collections/students";
const form = document.querySelector("#form");
form.addEventListener("submit", onSubmit);
const notification = document.querySelector(".notification");
const submitBtn = document.querySelector("#submit");
const tbody = document.querySelector("tbody");

async function onSubmit(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.facultyNumber ||
    !formData.grade
  ) {
    notification.textContent = "Missing credentials!";
    return;
  }
  if (isNaN(formData.grade) || isNaN(formData.facultyNumber)) {
    notification.textContent = "Faculty number and grade must be numbers!";
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
    loadStudents();
  } catch (error) {
    notification.textContent = "Unable to create student!";
  }
}

async function loadStudents() {
  const response = await fetch(url);
  const data = await response.json();
  const students = Object.values(data);
  let htmlToAppend = "";
  students.forEach((student) => {
    htmlToAppend += createStudent(student);
  });
  tbody.innerHTML = htmlToAppend;
}

function createStudent(studentObj) {
  const student = `
<tr>
    <td>${studentObj.firstName}</td>
    <td>${studentObj.lastName}</td>
    <td>${studentObj.facultyNumber}</td>
    <td>${studentObj.grade}</td>
</tr>`;
  return student;
}

/*<tr>
<td> firstname</td>
<td> lastname</td>
<td> fNumber</td>
<td> grade</td>
</tr>

*/
