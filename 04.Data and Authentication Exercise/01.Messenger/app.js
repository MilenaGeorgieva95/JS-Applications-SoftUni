function attachEvents() {
  const messagesText = document.querySelector("#main textarea");
  const uri = "http://localhost:3030/jsonstore/messenger";
  const [author, content, submitBtn, refreshBtn] = [
    ...document.querySelectorAll("#controls input"),
  ];

  if (messagesText.value == "") {
    loadMsgs();
  }
  submitBtn.addEventListener("click", onSubmitMsg);
  refreshBtn.addEventListener("click", loadMsgs);

  async function loadMsgs() {
    messagesText.value = "";
    try {
      const response = await fetch(uri);
      if (response.ok == false) {
        throw new Error("Could not load messages");
      }
      const data = await response.json();
      let text = [];
      Object.values(data).forEach((message) => {
        text.push(`${message.author}: ${message.content}`);
      });
      messagesText.value = text.join("\n");
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmitMsg() {
    if (!author.value || !content.value) {
      return;
    }
    const newMessage = {
      author: author.value,
      content: content.value,
    };
    const options = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    };
    try {
      const response = await fetch(uri, options);
      if (response.ok == false) {
        throw new Error("Could not send message!");
      }
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
    author.value = "";
    content.value = "";
    loadMsgs();
  }
}

attachEvents();
