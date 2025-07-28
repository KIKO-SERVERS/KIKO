import { useState } from "react";

export default function AIInterface() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    const fakeReply = `🤖 Ответ ИИ на: "${query}"`;
    setResponse(fakeReply);
    setInput("");
  };

  // будем считать валидным любой непустой ввод
  const isValid = input.length > 0;

  return (
    <div className="w-full max-w-lg bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">🧠 AI Коммуникатор</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введите запрос..."
          className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

       <button
        type="submit"
        disabled={!isValid}
        className="
          px-4 py-2 rounded-md font-medium transition-colors duration-200
         disabled:bg-blue-600 disabled:text-white disabled:hover:bg-blue-700
          bg-gray-200 text-gray-400 cursor-not-allowed
        "
      >
      Отправить
      </button>



        <button
          type="button"
          onClick={() => alert("🎤 Голосовой ввод скоро")}
          title="Голосовой ввод"
          className="p-2 border border-gray-400 rounded-md hover:bg-gray-100"
        >
          🎤
        </button>
      </form>

      {response && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-700 whitespace-pre-line">
          {response}
        </div>
      )}
    </div>
  );
}
