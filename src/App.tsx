import { useState } from "react";
import { Button } from "./components/ui/button";
import MessageCard from "./components/ui/MessageCard";
import ollama from "ollama";

type Message = {
  role: "assisten" | "user";
  content: string;
};

function App() {
  const [messages, setMessage] = useState<Message[]>([
    {
      role: "assisten",
      content: "Hello! How can I assist you today?"
    }
  ]);

  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { role: "user", content: input };
      setMessage((prevMessage) => [...prevMessage, newMessage]);

      const { message } = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [newMessage],
        stream: false
      });
      setMessage((prevMessage) => [
        ...prevMessage,
        { role: "assisten", content: message.content }
      ]);

      setInput("");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen w-full flex justify-center items-center">
      <main className="flex-grow overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 h-full flex flex-col  rounded-lg ">
          <div className="flex-grow overflow-y-auto p-4 my-4 flex flex-col space-y-4">
            {messages.map((message, index) => (
              <MessageCard
                key={index}
                role={message.role}
                message={message.content}
              />
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-4 border-t "
          >
            <textarea
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded-md px-4 py-2 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="ml-4 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md py-2 px-4"
            >
              Send
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
