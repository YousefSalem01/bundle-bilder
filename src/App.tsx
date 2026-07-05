import { Builder } from "./components/builder/Builder";
import { ReviewPanel } from "./components/review/ReviewPanel";

function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <h1 className="mb-8 text-center font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Let&apos;s get started!
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <Builder />
          <div className="lg:sticky lg:top-6">
            <ReviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
