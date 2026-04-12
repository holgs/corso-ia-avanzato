import { useState } from "react";
import CorsoAvanzatoS1 from "./CorsoAvanzatoS1.jsx";
import CorsoIAAvanzato from "./CorsoIAAvanzato.jsx";

const C = {
  navy: "#1B2A4A",
  navyLight: "#2A3D63",
  orange: "#E8732A",
  orangeLight: "#F4A261",
  cream: "#FFF8F0",
  white: "#FFFFFF",
  gray: "#6B7280",
  dark: "#0F1A2E",
};

const LEZIONI = [
  {
    id: 1,
    data: "13 aprile",
    dataBreve: "13/4",
    titolo: "Dal prompt al metodo",
    sub: "Framework 4D · Documento di Contesto Didattico",
    component: "s1",
  },
  {
    id: 2,
    data: "15 aprile",
    dataBreve: "15/4",
    titolo: "Costruire con l'IA",
    sub: "Vibe coding · artefatti · strumenti su misura",
    component: "iaa",
    lesson: 2,
  },
  {
    id: 3,
    data: "22 aprile",
    dataBreve: "22/4",
    titolo: "L'IA che lavora per te",
    sub: "Conoscenza · skill · agenti",
    component: "iaa",
    lesson: 3,
  },
];

export default function App() {
  const [active, setActive] = useState(null); // null | lezione config

  const goBack = () => setActive(null);

  if (active !== null) {
    if (active.component === "s1") {
      return <CorsoAvanzatoS1 onBack={goBack} />;
    }
    return <CorsoIAAvanzato initialLesson={active.lesson} onBack={goBack} />;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${C.dark} 0%, ${C.navy} 60%, ${C.navyLight} 100%)`,
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* sfondo decorativo */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.orange}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.orangeLight}12 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* header */}
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: C.orange,
          marginBottom: "1rem",
        }}
      >
        Corso IA Avanzato · IIS Carlo Piaggia · Viareggio
      </div>

      <h1
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: 700,
          color: C.cream,
          margin: "0 0 0.5rem",
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        Scegli la lezione
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: `${C.cream}80`,
          margin: "0 0 3rem",
          textAlign: "center",
        }}
      >
        Aprile 2026 · tre incontri · un percorso
      </p>

      {/* card lezioni */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "0 1rem",
          maxWidth: 960,
        }}
      >
        {LEZIONI.map((l) => (
          <LezioneCard key={l.id} lezione={l} onClick={() => setActive(l)} />
        ))}
      </div>

      {/* hint tastiera */}
      <p
        style={{
          position: "absolute",
          bottom: 24,
          fontSize: "0.75rem",
          color: `${C.cream}30`,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        ← → SPACE · ESC per tornare al menu
      </p>
    </div>
  );
}

function LezioneCard({ lezione, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.white : `${C.white}f0`,
        border: hovered ? `2px solid ${C.orange}` : `2px solid transparent`,
        borderRadius: "1.25rem",
        padding: "2rem 2.25rem",
        cursor: "pointer",
        width: 260,
        textAlign: "left",
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${C.orange}40`
          : "0 6px 24px rgba(0,0,0,0.25)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.22s ease",
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: C.orange,
          marginBottom: "0.4rem",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Lezione {lezione.id} · {lezione.data}
      </div>
      <div
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "1.45rem",
          fontWeight: 700,
          color: C.navy,
          marginBottom: "0.5rem",
          lineHeight: 1.25,
        }}
      >
        {lezione.titolo}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: C.gray,
          lineHeight: 1.45,
        }}
      >
        {lezione.sub}
      </div>
      <div
        style={{
          marginTop: "1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: C.orange,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Apri {hovered ? "→" : "›"}
      </div>
    </button>
  );
}
