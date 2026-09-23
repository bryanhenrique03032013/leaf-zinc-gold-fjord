import { useEffect, useMemo, useState } from "react";
import { Globe2, MapPin, Moon, Plus, Sun, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ZONES = [
  { id: "local", label: "Seu horário", city: "Local", zone: undefined },
  { id: "america-new-york", label: "Nova York", city: "Nova York", zone: "America/New_York" },
  { id: "america-sao-paulo", label: "São Paulo", city: "São Paulo", zone: "America/Sao_Paulo" },
  { id: "europe-london", label: "Londres", city: "Londres", zone: "Europe/London" },
  { id: "europe-paris", label: "Paris", city: "Paris", zone: "Europe/Paris" },
  { id: "asia-tokyo", label: "Tóquio", city: "Tóquio", zone: "Asia/Tokyo" },
  { id: "australia-sydney", label: "Sydney", city: "Sydney", zone: "Australia/Sydney" },
  { id: "asia-dubai", label: "Dubai", city: "Dubai", zone: "Asia/Dubai" },
] as const;

type ZoneId = (typeof ZONES)[number]["id"];

function formatTime(date: Date, zone: string | undefined, hour12: boolean) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(date);
}

function formatDate(date: Date, zone: string | undefined) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: zone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function zoneOffset(date: Date, zone: string | undefined) {
  if (!zone) return "Seu dispositivo";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value.replace("GMT", "UTC") ?? zone;
}

export function GameApp() {
  const [now, setNow] = useState(() => new Date());
  const [hour12, setHour12] = useState(false);
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState<ZoneId[]>(() => {
    try {
      const saved = localStorage.getItem("world-clock-zones");
      return saved ? (JSON.parse(saved) as ZoneId[]) : ["local", "america-sao-paulo", "europe-london", "asia-tokyo"];
    } catch {
      return ["local", "america-sao-paulo", "europe-london", "asia-tokyo"];
    }
  });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("world-clock-zones", JSON.stringify(selected));
  }, [selected]);

  const cards = useMemo(() => selected.map((id) => ZONES.find((zone) => zone.id === id)).filter(Boolean), [selected]);
  const available = ZONES.filter((zone) => !selected.includes(zone.id));

  function addZone(id: ZoneId) {
    if (selected.length >= 8 || selected.includes(id)) return;
    setSelected((items) => [...items, id]);
    setShowAdd(false);
  }

  function removeZone(id: ZoneId) {
    if (selected.length === 1) return;
    setSelected((items) => items.filter((item) => item !== id));
  }

  return (
    <div className={cn("clock-app min-h-dvh", dark && "clock-app-dark")}>
      <div className="clock-shell">
        <header className="clock-header">
          <div className="brand-lockup">
            <div className="brand-icon"><Globe2 size={22} strokeWidth={1.8} /></div>
            <div>
              <p className="eyebrow">PAINEL MUNDIAL</p>
              <h1>Agora</h1>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-button" type="button" onClick={() => setHour12((value) => !value)} aria-label="Alternar formato de hora">
              <span>{hour12 ? "12h" : "24h"}</span>
            </button>
            <button className="icon-button" type="button" onClick={() => setDark((value) => !value)} aria-label="Alternar tema">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main>
          <section className="hero-row">
            <div>
              <p className="eyebrow">HORÁRIO SINCRONIZADO</p>
              <p className="hero-time">{formatTime(now, undefined, hour12)}</p>
              <p className="hero-date">{formatDate(now, undefined)}</p>
            </div>
            <div className="live-pill"><span className="live-dot" /> Ao vivo</div>
          </section>

          <section className="toolbar">
            <div>
              <h2>Seus fusos</h2>
              <p>Veja o mundo no mesmo instante.</p>
            </div>
            <div className="add-wrap">
              <button className="add-button" type="button" onClick={() => setShowAdd((value) => !value)}>
                <Plus size={18} /> Adicionar cidade
              </button>
              {showAdd && (
                <div className="city-menu">
                  {available.length === 0 ? <p className="empty-menu">Todas as cidades já estão aqui.</p> : available.map((zone) => (
                    <button type="button" key={zone.id} onClick={() => addZone(zone.id)}>{zone.city}<span>{zone.zone ?? "Local"}</span></button>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="clock-grid" aria-label="Relógios por cidade">
            {cards.map((zone) => zone && (
              <article className={cn("clock-card", zone.id === "local" && "clock-card-featured")} key={zone.id}>
                <div className="card-topline">
                  <div className="city-title"><MapPin size={16} /><span>{zone.city}</span></div>
                  <button className="remove-button" type="button" onClick={() => removeZone(zone.id)} disabled={selected.length === 1} aria-label={`Remover ${zone.city}`}><Trash2 size={15} /></button>
                </div>
                <p className="card-time">{formatTime(now, zone.zone, hour12)}</p>
                <p className="card-date">{formatDate(now, zone.zone)}</p>
                <div className="card-footer"><span>{zone.zone ?? "Fuso do dispositivo"}</span><strong>{zoneOffset(now, zone.zone)}</strong></div>
              </article>
            ))}
          </section>
        </main>
        <footer><span>Atualiza automaticamente a cada segundo</span><span>Salvo neste dispositivo</span></footer>
      </div>
    </div>
  );
}
