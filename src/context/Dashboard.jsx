import React from "react";
import { Search, FileStack } from "lucide-react";

const Dashboard = () => {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-cyan/70">
            <FileStack className="h-4 w-4 text-ink" />
          </div>
          <span className="font-display text-lg font-bold text-white">
            DocAI
          </span>
        </div>

        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface/60 px-3 py-2"
        >
          <Search className="h-4 w-4 text-mist/50" />
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="w-40 bg-transparent text-sm text-white placeholder-mist/40 outline-none sm:w-56"
          />
        </form>
      </div>
    </nav>
  );
};

export default Dashboard;
