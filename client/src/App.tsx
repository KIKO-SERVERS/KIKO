import AIInterface from "./Components/AIInterface";

export default function App() {
  return (
    <div className="w-screen h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-6">KIKO AI</h1>
      <AIInterface />
    </div>
  );
}
