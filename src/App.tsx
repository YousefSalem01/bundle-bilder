import { MotionConfig } from "motion/react";
import { Builder } from "./components/builder/Builder";
import { ReviewPanel } from "./components/review/ReviewPanel";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-ink">
        <div className="mx-auto max-w-6xl tall-desktop:max-w-[1261px] px-4 py-8 sm:px-6 lg:py-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start tall-desktop:grid-cols-1 tall-desktop:items-stretch">
            <Builder />
            <div className="lg:sticky lg:top-6 tall-desktop:static">
              <ReviewPanel />
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
