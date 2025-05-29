const socket = io();

const send = document.querySelector("#send-message");
const allMessages = document.querySelector("#all-messages");

// Obtener el nombre del usuario desde la cookie
const getUsernameFromCookie = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="));
  return cookie ? cookie.split("=")[1] : null;
};

const currentUser = getUsernameFromCookie();

send.addEventListener("click", () => {
  const message = document.querySelector("#message");
  socket.emit("message", message.value);
  message.value = "";
});

socket.on("message", ({ user, message }) => {
  const isCurrentUser = user === currentUser;
  const messageClass = isCurrentUser ? "user" : "other";

  const msg = document.createRange().createContextualFragment(`
    <div class="message ${messageClass}">
      <div class="image-container">
        <img src="/img/perfil.jpg">
      </div>
      <div class="message-body">
        <div class="user-info">
          <span class="username">${user}</span>
          <span class="time">Hace 1 minuto</span>
        </div>
        <p>${message}</p>
      </div>
    </div>
  `);

  allMessages.append(msg);
  allMessages.scrollTop = allMessages.scrollHeight; // auto scroll al final
});
