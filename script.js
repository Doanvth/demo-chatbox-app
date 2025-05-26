const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

function addMess(content, sender){
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(content, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = content;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener("click", async()=>{
    const userMessage = userInput.value.trim();

    if(userMessage == "") return;
    addMessage(userMessage, "user");
    userInput.value = "";

    try{
        const response = await fetch("http://localhost:3000/api/get-ai-response", {
            method: "POST",
            
        })
    }catch{}
})
sendBtn.addEventListener("click", async () => {
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;

  // Hiển thị tin nhắn người dùng
  addMessage(userMessage, "user");
  userInput.value = "";

  try {
    const response = await fetch("http://localhost:3000/api/get-ai-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();

    // Hiển thị tin nhắn AI trả lời
    addMessage(data.reply, "ai");
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    addMessage("Có lỗi xảy ra khi kết nối API.", "ai");
  }
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
