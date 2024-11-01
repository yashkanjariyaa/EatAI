import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // Simulate a bot response (optional)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a bot response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-placeholder">
            <div className="question">
              Got a question about your diet, health tips, or recipe ideas?
            </div>
            <div className="prompts">
              <div className="prompt">5min Recipes</div>
              <div className="prompt">Nutrients comparison</div>
              <div className="prompt">Diet plan</div>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "user" ? "user" : "bot"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
