import { useState, useEffect, useCallback } from "react";

const C = {
  navy: "#1B2A4A", navyLight: "#2A3D63", orange: "#E8732A", orangeLight: "#F4A261",
  cream: "#FFF8F0", creamDark: "#F0E6D6", white: "#FFFFFF", gray: "#6B7280",
  grayLight: "#E5E7EB", dark: "#0F1A2E",
};

const LEZIONE_2 = [
  { type: "title", topLabel: "Corso IA Avanzato — Lezione 2", title: "Costruire con l'IA", subtitle: "Dal chatbot al vibe coding", date: "22 aprile 2026", footer: "IIS Carlo Piaggia — Viareggio" },
  { type: "section", label: "BLOCCO 1", title: "Andiamo oltre\nil chatbot", icon: "🚀" },
  { type: "spectrum", title: "Lo spettro dell'autonomia", items: [
    { emoji: "📚", name: "Chatbot", metaphor: "Enciclopedia parlante", does: "Risponde a domande", autonomy: "Zero", example: "\"Spiegami la fotosintesi\"", color: C.grayLight },
    { emoji: "🧰", name: "Strumento", metaphor: "Assistente con cassetta attrezzi", does: "Risponde + agisce", autonomy: "Parziale", example: "\"Cerca online e fammi un grafico\"", color: C.orangeLight },
    { emoji: "🤖", name: "Agente", metaphor: "Collaboratore autonomo", does: "Pianifica, decide, esegue", autonomy: "Graduabile", example: "\"Organizza i file e prepara la verifica\"", color: C.orange },
  ]},
  { type: "question", title: "Voi dove vi siete fermati?", subtitle: "Risultati dal form di pre-lezione", note: "→ Mostrare qui i risultati del Google Form" },
  { type: "section", label: "BLOCCO 2", title: "Vibe coding", icon: "⚡" },
  { type: "content", title: "Cos'è il vibe coding?", blocks: [
    { type: "quote", text: "\"Tu descrivi cosa vuoi. L'IA genera il codice. Tu supervisioni e guidi.\"", author: "Andrej Karpathy, febbraio 2025" },
    { type: "analogy", icon: "🪑", title: "L'analogia dell'artigiano", text: "È come avere un artigiano a cui spieghi il mobile che vuoi. Lui lo costruisce, tu dici: \"più largo\", \"cambia colore\". Non devi sapere usare la sega." },
  ]},
  { type: "tools-grid", title: "Panorama strumenti", subtitle: "Cosa esiste oggi per costruire con l'IA", categories: [
    { label: "🆓 Nel browser, gratis", desc: "Generano codice nella chat", tools: ["Artifacts (Claude)", "Canvas (Gemini)", "Canvas (ChatGPT)"], highlight: true },
    { label: "🏗️ Builder online", desc: "Da prompt ad app completa", tools: ["Lovable", "Bolt.new", "v0"] },
    { label: "💻 Per sviluppatori", desc: "Su codebase reali", tools: ["Claude Code", "Codex", "Cursor"] },
    { label: "🌐 Distribuzione", desc: "Mettere online", tools: ["Vercel", "Netlify"] },
  ]},
  { type: "content", title: "Cosa posso costruire?", blocks: [{ type: "three-cards", cards: [
    { emoji: "🗑️", title: "Usa e getta", text: "Calcolatore, convertitore, generatore password. Lo usi e lo butti." },
    { emoji: "🔄", title: "Tieni e riusa", text: "Quiz per la tua materia, timer interrogazioni, flashcard. Lo salvi e migliori." },
    { emoji: "🌍", title: "Pubblica online", text: "Agenda recupero, sito classe, strumento dipartimento." },
  ]}]},
  { type: "demo", title: "Demo live", subtitle: "Costruiamo qualcosa insieme", steps: ["Apriamo Gemini Canvas (o Claude Artifacts)", "Prompt: descriviamo lo strumento", "Guardiamo il risultato", "\"Modifica X\" → miglioramento", "\"Aggiungi Y\" → iterazione"], note: "Il ciclo: prompt → risultato → feedback → miglioramento" },
  { type: "exercise", title: "Tocca a voi!", subtitle: "25 min — Il vostro micro-strumento", instructions: "Pensate a qualcosa di utile per la vostra materia. Usate Gemini o Claude.", suggestions: ["Quiz a scelta multipla", "Flashcard domanda/risposta", "Generatore esercizi", "Rubrica valutazione", "Timer per attività", "Convertitore unità", "Randomizzatore interrogazioni"] },
  { type: "content", title: "Condivisione", blocks: [
    { type: "text", text: "Chi vuole mostrare cosa ha costruito?" },
    { type: "analogy", icon: "🤔", title: "Domanda per tutti", text: "Cosa cambierebbe se poteste costruirvi i vostri strumenti digitali su misura?" },
  ]},
  { type: "preview", title: "Prossima lezione", date: "29 aprile", items: ["📚 Gestire la conoscenza con gli LLM", "🛠️ Skill: insegnare all'IA come lavori tu", "🤖 Agenti: l'IA che fa cose per te"] },
];

const LEZIONE_3 = [
  { type: "title", topLabel: "Corso IA Avanzato — Lezione 3", title: "L'IA che lavora\nper te", subtitle: "Conoscenza, skill, agenti", date: "29 aprile 2026", footer: "IIS Carlo Piaggia — Viareggio" },
  { type: "section", label: "BLOCCO 1", title: "Gestire la conoscenza\ncon gli LLM", icon: "📚" },
  { type: "content", title: "Il problema", blocks: [
    { type: "analogy", icon: "📖", title: "La biblioteca senza bibliotecario", text: "Avete una biblioteca enorme: appunti su Docs, PDF, email, foto di lavagne. Ma non avete né bibliotecario né catalogo. Ogni volta rovesciate tutto da capo." },
    { type: "text", text: "Il sapere del docente è frammentato e non interrogabile. Ogni conversazione con l'IA riparte da zero." },
  ]},
  { type: "content", title: "Il pattern di Karpathy", blocks: [
    { type: "quote", text: "\"Spendo più token a manipolare conoscenza che a manipolare codice.\"", author: "Andrej Karpathy, aprile 2026" },
    { type: "text", text: "Invece di chiedere all'IA di riscoprire tutto da zero (RAG), facciamo compilare la conoscenza una volta e la teniamo aggiornata." },
  ]},
  { type: "flow", title: "Il flusso: da materiale grezzo a wiki", steps: [
    { emoji: "📥", label: "raw/", desc: "Articoli, paper, appunti, foto" },
    { emoji: "⚙️", label: "LLM compila", desc: "Sintetizza, collega, crea articoli" },
    { emoji: "📖", label: "wiki/", desc: "Articoli Markdown con backlink e indice" },
    { emoji: "💬", label: "Query", desc: "Domande complesse, risposte che si accumulano" },
  ]},
  { type: "content", title: "L'analogia del compilatore", blocks: [
    { type: "three-cards", cards: [
      { emoji: "📝", title: "Codice sorgente", text: "I tuoi appunti e materiali grezzi in raw/" },
      { emoji: "⚙️", title: "Compilatore", text: "L'LLM che legge, sintetizza e struttura" },
      { emoji: "🖥️", title: "Programma", text: "Il wiki: interrogabile, che si accumula" },
    ]},
    { type: "text", text: "Obsidian è il frontend: file Markdown, nessun lock-in, grafo visuale dei concetti." },
  ]},
  { type: "demo", title: "Demo: vault di conoscenza", subtitle: "Obsidian + LLM wiki pattern", steps: ["raw/ → 5 fonti sulla didattica delle onde", "L'LLM ha compilato → wiki/ con articoli collegati", "Graph view: concetti connessi visivamente", "Query: \"Misconcezioni più comuni sulle onde?\"", "L'IA risponde dal wiki, non inventando"], note: "La conoscenza si accumula. Le tue esplorazioni arricchiscono il wiki." },
  { type: "content", title: "Casi d'uso per docenti", blocks: [{ type: "three-cards", cards: [
    { emoji: "🔬", title: "Base disciplinare", text: "Materiali della materia interrogabili con domande complesse." },
    { emoji: "🎯", title: "Strategie didattiche", text: "Metodi, attività, esperienze. \"Cosa ha funzionato per insegnare X?\"" },
    { emoji: "📊", title: "Archivio verifiche", text: "Verifiche + errori ricorrenti. \"Dove sbagliano in termodinamica?\"" },
  ]}]},
  { type: "section", label: "BLOCCO 2", title: "Skill: insegnare all'IA\ncome lavori tu", icon: "🛠️" },
  { type: "content", title: "Cos'è una skill?", blocks: [
    { type: "analogy", icon: "👔", title: "Il neolaureato brillante", text: "Il chatbot è un neolaureato brillantissimo che non sa nulla del tuo lavoro. La skill è il manuale di procedure del primo giorno." },
    { type: "text", text: "Un documento con istruzioni che l'IA segue ogni volta. Funziona su Claude (Skills), OpenAI (Custom GPT), Gemini (Gems)." },
  ]},
  { type: "content", title: "Esempi di skill per docenti", blocks: [{ type: "three-cards", cards: [
    { emoji: "📝", title: "Costruttore verifiche", text: "Materia, livello, n° domande, tipologia, criteri." },
    { emoji: "🔍", title: "Analizzatore compiti", text: "Foto/PDF → valuta secondo rubrica → feedback." },
    { emoji: "🔄", title: "Traduttore didattico", text: "Riscrive testo scientifico al livello della classe." },
  ]}]},
  { type: "exercise", title: "La tua prima skill", subtitle: "10 min — Scrivi le istruzioni per la tua IA", instructions: "In linguaggio naturale, scrivi le istruzioni per un compito ricorrente.", suggestions: ["Che materia/contesto?", "Che compito?", "Che formato?", "Che vincoli?", "Che tono?", "Cosa NON deve fare?"] },
  { type: "section", label: "BLOCCO 3", title: "Agenti:\nl'IA che fa cose per te", icon: "🤖" },
  { type: "content", title: "Lo spettro dell'autonomia", blocks: [
    { type: "analogy", icon: "🐕", title: "Il guinzaglio", text: "Guinzaglio corto: controlli passo passo. Lungo: dai un obiettivo. Senza: devi fidarti molto. Gli agenti IA funzionano allo stesso modo." },
  ]},
  { type: "agents-table", title: "Panorama agenti — aprile 2026", agents: [
    { name: "Claude Cowork", what: "Agente desktop su file, app, browser", who: "Chiunque (no codice)", cost: "Pro $20/Max $100", highlight: true },
    { name: "Dispatch", what: "Controllo remoto dal telefono", who: "Chi usa Cowork", cost: "Incluso" },
    { name: "OpenClaw", what: "Open-source su Telegram/WhatsApp. 300K+ ★", who: "Chi smanetta", cost: "Gratuito + API" },
    { name: "Hermes Agent", what: "Si auto-migliora, crea skill da solo", who: "Più tecnico", cost: "Gratuito + API" },
  ]},
  { type: "demo", title: "Demo: Claude Cowork", subtitle: "L'agente che lavora mentre tu fai altro", steps: ["Task: \"Prendi questi 3 PDF di verifiche...\"", "\"...analizzali, riepilogo errori per argomento\"", "Claude pianifica, legge, analizza, produce report", "Torno e trovo il risultato pronto", "Dispatch: tutto questo dal telefono"], note: "L'IA non chatta. Lavora." },
  { type: "content", title: "Il sistema che si accumula", blocks: [
    { type: "text", text: "Il percorso non è una lista di strumenti. È un sistema dove ogni pezzo alimenta gli altri." },
    { type: "flow-horizontal", items: ["Protocollo 4D", "Vibe coding", "Knowledge base", "Skill", "Agenti"] },
    { type: "quote", text: "\"Tra un anno molti di voi avranno un agente personale che conosce la vostra materia, i vostri studenti, il vostro stile.\"", author: "" },
  ]},
  { type: "preview", title: "Prossimi passi", date: "Prossime lezioni", items: ["🔧 Approfondimento skill e custom GPT/Gems", "🔗 Automazioni con IA (n8n, make.com)", "🎯 Progetto personale di ciascun docente"] },
];

function TitleSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", padding: "2rem", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.dark} 100%)` }}>
      <div style={{ fontFamily: "system-ui", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, marginBottom: "1rem" }}>{slide.topLabel}</div>
      <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 700, color: C.cream, lineHeight: 1.1, whiteSpace: "pre-line", margin: "0 0 0.75rem", fontFamily: "Georgia, serif" }}>{slide.title}</h1>
      <div style={{ fontSize: "clamp(0.9rem, 2vw, 1.3rem)", color: C.orangeLight, marginBottom: "1.5rem" }}>{slide.subtitle}</div>
      <div style={{ fontSize: "0.8rem", color: C.gray }}>{slide.date}</div>
      <div style={{ fontSize: "0.7rem", color: C.gray, marginTop: "0.2rem" }}>{slide.footer}</div>
    </div>
  );
}
function SectionSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", background: `linear-gradient(160deg, ${C.orange} 0%, ${C.orangeLight} 100%)`, padding: "2rem" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.navy, marginBottom: "0.75rem", opacity: 0.7 }}>{slide.label}</div>
      <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>{slide.icon}</div>
      <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)", fontWeight: 700, color: C.white, lineHeight: 1.15, whiteSpace: "pre-line", fontFamily: "Georgia, serif" }}>{slide.title}</h2>
    </div>
  );
}
function SpectrumSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem 2rem", background: C.cream }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: C.navy, margin: "0 0 1rem", textAlign: "center" }}>{slide.title}</h2>
      <div style={{ display: "flex", gap: "0.75rem", flex: 1 }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ flex: 1, background: C.white, borderRadius: "0.75rem", padding: "1rem", display: "flex", flexDirection: "column", borderTop: `3px solid ${item.color}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{item.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: C.navy, marginBottom: "0.3rem" }}>{item.name}</div>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.8rem", color: C.orange, marginBottom: "0.5rem" }}>{item.metaphor}</div>
            <div style={{ fontSize: "0.75rem", color: C.navy, marginBottom: "0.2rem" }}><strong>Fa:</strong> {item.does}</div>
            <div style={{ fontSize: "0.75rem", color: C.navy, marginBottom: "0.2rem" }}><strong>Autonomia:</strong> {item.autonomy}</div>
            <div style={{ marginTop: "auto", padding: "0.4rem", background: C.creamDark, borderRadius: "0.4rem", fontSize: "0.65rem", color: C.navyLight, fontFamily: "monospace" }}>{item.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function QuestionSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", background: C.navy, padding: "2rem" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2.8rem)", fontWeight: 700, color: C.cream, marginBottom: "0.75rem" }}>{slide.title}</h2>
      <div style={{ fontSize: "0.95rem", color: C.orangeLight, marginBottom: "1.5rem" }}>{slide.subtitle}</div>
      {slide.note && <div style={{ fontSize: "0.8rem", color: C.gray, padding: "0.75rem 1rem", border: `1px dashed ${C.gray}`, borderRadius: "0.5rem" }}>{slide.note}</div>}
    </div>
  );
}
function Block({ block }) {
  if (block.type === "quote") return (
    <div style={{ borderLeft: `3px solid ${C.orange}`, padding: "0.75rem 1rem", margin: "0.5rem 0", background: C.white, borderRadius: "0 0.5rem 0.5rem 0" }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", fontStyle: "italic", color: C.navy, lineHeight: 1.5 }}>{block.text}</div>
      {block.author && <div style={{ fontSize: "0.7rem", color: C.orange, marginTop: "0.3rem", fontWeight: 600 }}>— {block.author}</div>}
    </div>
  );
  if (block.type === "analogy") return (
    <div style={{ background: `${C.orange}10`, borderRadius: "0.75rem", padding: "0.75rem 1rem", margin: "0.5rem 0", border: `1px solid ${C.orange}30` }}>
      <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.navy, marginBottom: "0.3rem" }}>{block.icon} {block.title}</div>
      <div style={{ fontSize: "0.8rem", color: C.navyLight, lineHeight: 1.5 }}>{block.text}</div>
    </div>
  );
  if (block.type === "text") return <div style={{ fontSize: "0.85rem", color: C.navyLight, lineHeight: 1.6, margin: "0.5rem 0" }}>{block.text}</div>;
  if (block.type === "three-cards") return (
    <div style={{ display: "flex", gap: "0.5rem", margin: "0.5rem 0" }}>
      {block.cards.map((c, i) => (
        <div key={i} style={{ flex: 1, background: C.white, borderRadius: "0.5rem", padding: "0.75rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderTop: `2px solid ${C.orange}` }}>
          <div style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>{c.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.navy, marginBottom: "0.2rem" }}>{c.title}</div>
          <div style={{ fontSize: "0.7rem", color: C.navyLight, lineHeight: 1.4 }}>{c.text}</div>
        </div>
      ))}
    </div>
  );
  if (block.type === "flow-horizontal") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", margin: "1rem 0", flexWrap: "wrap" }}>
      {block.items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <div style={{ background: i === block.items.length - 1 ? C.orange : C.navy, color: C.white, padding: "0.4rem 0.8rem", borderRadius: "1.5rem", fontSize: "0.7rem", fontWeight: 600 }}>{item}</div>
          {i < block.items.length - 1 && <span style={{ color: C.orange, fontSize: "1rem" }}>→</span>}
        </div>
      ))}
    </div>
  );
  return null;
}
function ContentSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem 2rem", background: C.cream }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.navy, margin: "0 0 1rem" }}>{slide.title}</h2>
      <div style={{ flex: 1, overflow: "auto" }}>{slide.blocks.map((b, i) => <Block key={i} block={b} />)}</div>
    </div>
  );
}
function ToolsGridSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem 2rem", background: C.cream }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.navy, margin: "0 0 0.2rem" }}>{slide.title}</h2>
      <div style={{ fontSize: "0.8rem", color: C.gray, marginBottom: "1rem" }}>{slide.subtitle}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", flex: 1 }}>
        {slide.categories.map((cat, i) => (
          <div key={i} style={{ background: cat.highlight ? C.navy : C.white, color: cat.highlight ? C.cream : C.navy, borderRadius: "0.75rem", padding: "0.75rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.2rem" }}>{cat.label}</div>
            <div style={{ fontSize: "0.7rem", opacity: 0.7, marginBottom: "0.5rem" }}>{cat.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              {cat.tools.map((t, j) => <span key={j} style={{ padding: "0.2rem 0.5rem", borderRadius: "1rem", fontSize: "0.65rem", fontWeight: 600, background: cat.highlight ? C.orange : C.creamDark, color: cat.highlight ? C.white : C.navy }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function DemoSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "1.5rem 2.5rem", background: `linear-gradient(160deg, ${C.dark} 0%, ${C.navy} 100%)` }}>
      <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.orange, marginBottom: "0.3rem" }}>DEMO</div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: C.cream, margin: "0 0 0.2rem" }}>{slide.title}</h2>
      <div style={{ fontSize: "0.85rem", color: C.orangeLight, marginBottom: "1.25rem" }}>{slide.subtitle}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {slide.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: C.orange, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.7rem", flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: "0.8rem", color: C.cream, lineHeight: 1.3 }}>{s}</div>
          </div>
        ))}
      </div>
      {slide.note && <div style={{ marginTop: "1.25rem", padding: "0.5rem 0.75rem", borderLeft: `2px solid ${C.orange}`, fontSize: "0.75rem", fontStyle: "italic", color: C.orangeLight }}>{slide.note}</div>}
    </div>
  );
}
function ExerciseSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem 2rem", background: `linear-gradient(135deg, ${C.cream} 0%, ${C.creamDark} 100%)` }}>
      <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.orange, marginBottom: "0.3rem" }}>ESERCITAZIONE</div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.navy, margin: "0 0 0.2rem" }}>{slide.title}</h2>
      <div style={{ fontSize: "0.8rem", color: C.gray, marginBottom: "0.75rem" }}>{slide.subtitle}</div>
      <div style={{ fontSize: "0.85rem", color: C.navyLight, marginBottom: "0.75rem", lineHeight: 1.4 }}>{slide.instructions}</div>
      <div style={{ background: C.white, borderRadius: "0.75rem", padding: "1rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <div style={{ fontWeight: 700, fontSize: "0.75rem", color: C.navy, marginBottom: "0.5rem" }}>💡 Suggerimenti</div>
        <div style={{ display: "grid", gridTemplateColumns: slide.suggestions.length > 5 ? "1fr 1fr" : "1fr", gap: "0.3rem" }}>
          {slide.suggestions.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: C.navyLight }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.orange, flexShrink: 0 }} />{s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function FlowSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem 2rem", background: C.cream }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.navy, margin: "0 0 1.25rem", textAlign: "center" }}>{slide.title}</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flex: 1, justifyContent: "center" }}>
        {slide.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <div style={{ background: C.white, borderRadius: "0.75rem", padding: "1rem", textAlign: "center", width: "140px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", borderTop: `3px solid ${C.orange}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "0.8rem", color: C.navy, marginBottom: "0.2rem" }}>{s.label}</div>
              <div style={{ fontSize: "0.65rem", color: C.navyLight, lineHeight: 1.3 }}>{s.desc}</div>
            </div>
            {i < slide.steps.length - 1 && <div style={{ fontSize: "1.2rem", color: C.orange, fontWeight: 700 }}>→</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
function AgentsTableSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem 2rem", background: C.cream }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: C.navy, margin: "0 0 1rem" }}>{slide.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
        {slide.agents.map((a, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 130px 90px", gap: "0.5rem", alignItems: "center", background: a.highlight ? C.navy : C.white, color: a.highlight ? C.cream : C.navy, borderRadius: "0.5rem", padding: "0.6rem 0.75rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderLeft: a.highlight ? `3px solid ${C.orange}` : "none" }}>
            <div style={{ fontWeight: 700, fontSize: "0.8rem" }}>{a.name}</div>
            <div style={{ fontSize: "0.7rem", lineHeight: 1.3, opacity: 0.85 }}>{a.what}</div>
            <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>{a.who}</div>
            <div style={{ fontSize: "0.65rem", color: C.orange, fontWeight: 600, fontFamily: "monospace" }}>{a.cost}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function PreviewSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.dark} 100%)`, padding: "2rem" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, marginBottom: "0.75rem" }}>{slide.date}</div>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 700, color: C.cream, margin: "0 0 1.5rem" }}>{slide.title}</h2>
      {slide.items.map((item, i) => <div key={i} style={{ fontSize: "1rem", color: C.creamDark, marginBottom: "0.4rem" }}>{item}</div>)}
    </div>
  );
}

const renderers = { title: TitleSlide, section: SectionSlide, spectrum: SpectrumSlide, question: QuestionSlide, content: ContentSlide, "tools-grid": ToolsGridSlide, demo: DemoSlide, exercise: ExerciseSlide, flow: FlowSlide, "agents-table": AgentsTableSlide, preview: PreviewSlide };
function SlideRenderer({ slide }) { const R = renderers[slide.type]; return R ? <R slide={slide} /> : null; }

export default function App() {
  const [lecture, setLecture] = useState(null);
  const [si, setSi] = useState(0);
  const slides = lecture === 2 ? LEZIONE_2 : lecture === 3 ? LEZIONE_3 : [];
  const total = slides.length;
  const goNext = useCallback(() => setSi(i => Math.min(i + 1, total - 1)), [total]);
  const goPrev = useCallback(() => setSi(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") { setLecture(null); setSi(0); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goNext, goPrev]);

  if (!lecture) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: `linear-gradient(135deg, ${C.navy} 0%, ${C.dark} 100%)`, padding: "2rem" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: C.orange, marginBottom: "0.75rem" }}>Corso IA Avanzato</div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 700, color: C.cream, marginBottom: "2rem" }}>Scegli la lezione</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {[{ n: 2, t: "Costruire con l'IA", d: "22 aprile", s: "Vibe coding, artefatti, strumenti" }, { n: 3, t: "L'IA che lavora per te", d: "29 aprile", s: "Conoscenza, skill, agenti" }].map(l => (
          <button key={l.n} onClick={() => { setLecture(l.n); setSi(0); }} style={{ background: C.white, border: "none", borderRadius: "1rem", padding: "1.5rem 2rem", cursor: "pointer", width: "260px", textAlign: "left", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange, marginBottom: "0.3rem" }}>Lezione {l.n} — {l.d}</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 700, color: C.navy, marginBottom: "0.3rem" }}>{l.t}</div>
            <div style={{ fontSize: "0.75rem", color: C.gray }}>{l.s}</div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: C.dark }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "0.5rem" }}>
        <div style={{ width: "100%", maxWidth: "900px", aspectRatio: "16/9", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <SlideRenderer slide={slides[si]} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.3rem 1.5rem 0.75rem" }}>
        <button onClick={() => { setLecture(null); setSi(0); }} style={{ background: "transparent", border: `1px solid ${C.gray}`, color: C.gray, padding: "0.3rem 0.75rem", borderRadius: "0.4rem", cursor: "pointer", fontSize: "0.7rem" }}>← Menu</button>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button onClick={goPrev} disabled={si === 0} style={{ background: si === 0 ? "transparent" : C.navy, color: si === 0 ? C.gray : C.cream, border: "none", borderRadius: "0.4rem", padding: "0.35rem 0.75rem", cursor: si === 0 ? "default" : "pointer", fontSize: "0.75rem" }}>‹</button>
          <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: C.gray }}>{si + 1}/{total}</span>
          <button onClick={goNext} disabled={si === total - 1} style={{ background: si === total - 1 ? "transparent" : C.orange, color: si === total - 1 ? C.gray : C.white, border: "none", borderRadius: "0.4rem", padding: "0.35rem 0.75rem", cursor: si === total - 1 ? "default" : "pointer", fontSize: "0.75rem" }}>›</button>
        </div>
        <span style={{ fontSize: "0.6rem", color: C.gray }}>← → naviga · ESC menu</span>
      </div>
    </div>
  );
}
