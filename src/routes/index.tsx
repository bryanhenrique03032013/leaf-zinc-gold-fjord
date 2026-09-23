import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GameApp } from "@/components/game/GameApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  if (!live) {
    return (
      <div className="paper-bg min-h-dvh text-ink">
        <p className="px-4 py-6 font-display text-lg">D.L.P.</p>
      </div>
    );
  }
  return <GameApp />;
}
