import React, { useState } from 'react';

const answers: Record<string, string> = {
  "hi": "Hello! How can I help you?",
  "help": "I can help you with stories, recipes, reminders, and controlling smart devices!",
  "kiko, tell a fairy tale!": "Once upon a time in a smart home, a little robot named KIKO made every family's life magical...",
  "kiko, show me a pasta recipe": "Here's a simple pasta recipe: 1) Boil water 2) Add pasta 3) Cook for 8-10 minutes 4) Drain and enjoy! Want a specific recipe?",
  "kiko, turn on the kitchen lights": "Turning on the kitchen lights! (Pretend the kitchen just got brighter ✨)"
};

function getAnswer(question: string) {
  const normalized = question.trim().toLowerCase();
  return answers[normalized] || "Sorry, I don't understand yet!";
}

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am KIKO. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const userInput = input.trim();
    if (!userInput) return;

    setMessages(msgs => [
      ...msgs,
      { sender: 'user', text: userInput },
      { sender: 'ai', text: getAnswer(userInput) }
    ]);
    setInput('');
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 12, background: '#232040', borderRadius: 18 }}>
      <h2 style={{ color: "#fff", textAlign: 'center', marginBottom: 12 }}>AI Chat</h2>
      <div style={{
        minHeight: 220,
        background: '#1B1833',
        borderRadius: 12,
        padding: 10,
        color: "#fff",
        marginBottom: 14,
        maxHeight: 320,
        overflowY: 'auto'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.sender === 'user' ? 'right' : 'left',
            marginBottom: 5,
            color: msg.sender === 'user' ? '#42FF86' : '#fff',
            fontWeight: msg.sender === 'user' ? 500 : 400
          }}>
            <b>{msg.sender === 'user' ? 'You' : 'KIKO'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #444', background: "#191838", color: "#fff" }}
        />
        <button type="submit" style={{ padding: 8, borderRadius: 8, background: "#42FF86", border: 'none', fontWeight: 600, color: "#191838" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
