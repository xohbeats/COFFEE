const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (userText === '') return;

  // Show user message
  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  userMsg.innerText = userText;
  chatBox.appendChild(userMsg);
  input.value = '';

  // Simulated bot response
  setTimeout(() => {
    const botReply = document.createElement('div');
    botReply.className = 'bot-message';
    botReply.innerText = getBotResponse(userText);
    chatBox.appendChild(botReply);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 800);
});

function getBotResponse(input) {
  // Calm, empathetic AI replies (you can expand this later or connect it to a backend)
  if (input.includes('tired') || input.includes('exhausted')) {
    return "Totally get that. Let's take it one breath at a time. What's draining you the most?";
  }
  if (input.includes('sad') || input.includes('low')) {
    return "I'm really glad you shared that. Want to talk about what's been weighing on you?";
  }
  if (input.includes('happy') || input.includes('good')) {
    return "Love that. What's bringing you peace lately?";
  }
  return "Thanks for sharing — I'm here to listen and help you center your thoughts.";
}
