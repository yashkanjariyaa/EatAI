import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; 

interface Message {
  id: string;
  text: string;
  sender?: "user" | "bot";
}

const ChatInterface: React.FC = () => {
  const [currentUserMessage, setCurrentUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  const handleEventSource = (eventSource: EventSource) => {
    eventSource.onmessage = (event) => {
      const message = event.data;

      if (message === "[END]") {
        setIsBotTyping(false);
        eventSource.close();
      } else if (message.startsWith("[ERROR]")) {
        console.error("Error: ", message.slice(7));
        setIsBotTyping(false);
        eventSource.close();
      } else {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.sender === "bot") {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, text: lastMessage.text + message },
            ];
          } else {
            return [...prev, { id: `bot-${Date.now()}`, text: message, sender: "bot" }];
          }
        });
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed: ", error);
      setIsBotTyping(false);
      eventSource.close();
    };
  };

  const sendMessage = async () => {
    if (input.trim()) {
      setCurrentUserMessage(input);
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, text: input, sender: "user" },
      ]);
      setInput("");
      setIsBotTyping(true);

      try {
        await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const eventSource = new EventSource("http://localhost:5000/chat");
        handleEventSource(eventSource);
      } catch (error) {
        console.error("Failed to send message: ", error);
        setIsBotTyping(false);
      }
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      {messages.length === 0 && currentUserMessage === "" ? (
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
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.sender}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
            </div>
          ))}
        </div>
      )}
      {isBotTyping && <div className="chat-message bot">Thinking...</div>}
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          aria-label="Type a message"
        />
        <button onClick={sendMessage} aria-label="Send message">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
