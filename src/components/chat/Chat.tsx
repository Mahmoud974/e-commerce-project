"use client";
import { useEffect, useState, useRef } from "react";
import AWS from "aws-sdk";
import { FaComments } from "react-icons/fa";

export default function LexChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]); // Historique des messages
  const [lexRuntime, setLexRuntime] = useState<any>(null);
  const [open, setOpen] = useState(false); // Contrôle l'ouverture de la boîte
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuration AWS
    AWS.config.region = "eu-west-2";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "eu-west-2:6b95819f-3969-4424-bc1e-8fa9e9b4ab15", // Remplace par ton ID
    });

    // Crée une fois le client Lex
    setLexRuntime(new AWS.LexRuntime());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSendMessage = () => {
    if (!message || !lexRuntime) return;
    const userMsg = { from: "user" as const, text: message };
    setMessages((msgs) => [...msgs, userMsg]);
    const params = {
      botName: "BookTrip_frFR",
      botAlias: "moussa",
      inputText: message,
      userId: "chatbot-1",
    };
    setMessage("");
    lexRuntime.postText(params, (err: any, data: any) => {
      if (err) {
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: "Erreur : " + err.message },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { from: "bot", text: data.message || "(Pas de réponse)" },
        ]);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-16 h-16 bg-black hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-200 focus:outline-none border-4 border-white border-solid"
          aria-label="Ouvrir le chat"
        >
          <FaComments className="text-red-600" />
        </button>
      )}
      {/* Boîte de dialogue */}
      {open && (
        <div className="w-80 max-w-full">
          <div className="bg-black/95 rounded-xl shadow-2xl border border-red-700 flex flex-col h-96 animate-fade-in">
            <div className="px-4 py-2 border-b border-red-700  bg-red-700 rounded-t-xl flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white  flex items-center gap-2">
                <FaComments className="text-white " /> Chat avec Lex
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-red-500 text-xl font-bold px-2 focus:outline-none"
                aria-label="Fermer le chat"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 scrollbar-black bg-black">
              {messages.length === 0 && (
                <div className="text-gray-500 text-sm text-center mt-8">
                  Commence la conversation…
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow
                      ${
                        msg.from === "user"
                          ? "bg-red-600 text-white rounded-br-none"
                          : "bg-white text-red-500 rounded-bl-none border border-red-700"
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-2 border-t border-red-700 bg-black rounded-b-xl flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 text-white bg-black placeholder-gray-400"
                value={message}
                placeholder="Écris un message…"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow border border-white"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
