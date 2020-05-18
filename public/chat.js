const socket = io.connect("http://localhost:4000");

let message = document.getElementById("message");
let handle = document.getElementById("handle");
let output = document.getElementById("output");
let btn = document.getElementById("send");
let feedback = document.getElementById("feedback");

btn.addEventListener("click", (evn) => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
});

handle.addEventListener("keypress", () => {
  message.value = "";
});

message.addEventListener("keypress", (evn) => {
  socket.emit("typing", handle.value);
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
