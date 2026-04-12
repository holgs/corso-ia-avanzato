import { useState, useEffect, useCallback } from "react";

/* ─── AInClasse Brand ─── */
const C = {
  navy: "#1B2A4A",
  navyLight: "#2A3D63",
  orange: "#E8732A",
  orangeLight: "#F4A261",
  cream: "#FFF8F0",
  creamDark: "#F0E6D6",
  white: "#FFFFFF",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  dark: "#0F1A2E",
};

/* ─── SLIDES DATA ─── */

const LEZIONE_2 = [
  /* 0 */ {
    type: "title",
    topLabel: "Corso IA Avanzato — Lezione 2",
    title: "Costruire con l'IA",
    subtitle: "Dal chatbot al vibe coding",
    date: "15 aprile 2026",
    footer: "ISI Piaggia — Viareggio",
  },
  /* 1 */ {
    type: "section",
    label: "BLOCCO 1",
    title: "Andiamo oltre\nil chatbot",
    icon: "🚀",
  },
  /* 2 */ {
    type: "spectrum",
    title: "Lo spettro dell'autonomia",
    items: [
      {
        emoji: "📚",
        name: "Chatbot",
        metaphor: "Enciclopedia parlante",
        does: "Risponde a domande",
        autonomy: "Zero",
        example: "\"Spiegami la fotosintesi\"",
        color: C.grayLight,
      },
      {
        emoji: "🧰",
        name: "Strumento",
        metaphor: "Assistente con cassetta attrezzi",
        does: "Risponde + agisce",
        autonomy: "Parziale — io chiedo, lui usa lo strumento",
        example: "\"Cerca online e fammi un grafico\"",
        color: C.orangeLight,
      },
      {
        emoji: "🤖",
        name: "Agente",
        metaphor: "Collaboratore autonomo",
        does: "Pianifica, decide, esegue",
        autonomy: "Graduabile — io scelgo il guinzaglio",
        example: "\"Organizza i file, prepara la verifica, mandala\"",
        color: C.orange,
      },
    ],
  },
  /* 3 */ {
    type: "question",
    title: "Voi dove vi siete fermati?",
    subtitle: "Dal vostro sondaggio pre-corso",
    note: "Solo 3 su 25 hanno mai fatto generare codice all'IA. Il 97% parte da zero. Partiamo da qui.",
  },
  /* 4 */ {
    type: "section",
    label: "BLOCCO 2",
    title: "Vibe coding",
    icon: "⚡",
  },
  /* 5 */ {
    type: "content",
    title: "Cos'è il vibe coding?",
    blocks: [
      {
        type: "quote",
        text: "\"Tu descrivi cosa vuoi. L'IA genera il codice. Tu supervisioni e guidi.\"",
        author: "Andrej Karpathy, febbraio 2025",
      },
      {
        type: "analogy",
        icon: "🪑",
        title: "L'analogia dell'artigiano",
        text: "È come avere un artigiano a cui spieghi il mobile che vuoi. Lui lo costruisce, tu dici: \"più largo\", \"cambia colore\", \"aggiungi un cassetto\". Non devi sapere usare la sega — ma devi sapere cosa ti serve.",
      },
    ],
  },
  /* 6 */ {
    type: "tools-grid",
    title: "Panorama strumenti",
    subtitle: "Cosa esiste oggi per costruire con l'IA",
    categories: [
      {
        label: "🆓 Nel browser, gratis",
        desc: "Generano codice direttamente nella chat",
        tools: ["Artifacts (Claude)", "Canvas (Gemini)", "Canvas (ChatGPT)"],
        highlight: true,
      },
      {
        label: "🏗️ Builder online",
        desc: "Da prompt ad app completa con database",
        tools: ["Lovable", "Bolt.new", "v0 (Vercel)"],
      },
      {
        label: "💻 Per sviluppatori",
        desc: "Lavorano su codebase reali",
        tools: ["Claude Code", "Codex (OpenAI)", "Cursor"],
      },
      {
        label: "🌐 Distribuzione",
        desc: "Mettere online quello che hai costruito",
        tools: ["Vercel", "Netlify"],
      },
    ],
  },
  /* 7 */ {
    type: "content",
    title: "Cosa posso costruire?",
    blocks: [
      {
        type: "three-cards",
        cards: [
          {
            emoji: "🗑️",
            title: "Usa e getta",
            text: "Un calcolatore veloce, un convertitore, un generatore di password. Lo usi e lo butti.",
          },
          {
            emoji: "🔄",
            title: "Tieni e riusa",
            text: "Un quiz per la tua materia, un timer per le interrogazioni, flashcard. Lo salvi e lo migliori.",
          },
          {
            emoji: "🌍",
            title: "Pubblica online",
            text: "L'agenda recupero docenti, un sito per la classe, uno strumento per il dipartimento.",
          },
        ],
      },
    ],
  },
  /* 8 */ {
    type: "demo",
    title: "Demo live",
    subtitle: "Costruiamo qualcosa insieme",
    steps: [
      "Apriamo Gemini Canvas (o Claude Artifacts)",
      "Prompt: descriviamo lo strumento che vogliamo",
      "Guardiamo il risultato",
      "\"Modifica X\" → risultato migliorato",
      "\"Aggiungi Y\" → iterazione",
    ],
    note: "Il ciclo: prompt → risultato → feedback → miglioramento",
  },
  /* 9 */ {
    type: "exercise",
    title: "Tocca a voi!",
    subtitle: "25 minuti — Costruite il vostro micro-strumento",
    instructions: "Pensate a qualcosa di utile per la vostra materia o il vostro lavoro. Usate Gemini o Claude.",
    suggestions: [
      "Quiz interattivo a scelta multipla",
      "Flashcard domanda/risposta",
      "Generatore casuale di esercizi",
      "Rubrica di valutazione interattiva",
      "Timer / cronometro per attività in classe",
      "Convertitore di unità (scienze, fisica)",
      "Randomizzatore per interrogazioni",
    ],
  },
  /* 10 */ {
    type: "content",
    title: "Condivisione",
    blocks: [
      {
        type: "text",
        text: "Chi vuole mostrare cosa ha costruito?",
      },
      {
        type: "analogy",
        icon: "🤔",
        title: "Domanda per tutti",
        text: "Cosa cambierebbe se poteste costruirvi i vostri strumenti digitali su misura?",
      },
    ],
  },
  /* 11 */ {
    type: "preview",
    title: "Prossima lezione",
    date: "22 aprile",
    items: [
      "📚 Gestire la conoscenza con gli LLM",
      "🛠️ Skill: insegnare all'IA come lavori tu",
      "🤖 Agenti: l'IA che fa cose per te",
    ],
  },
];

const LEZIONE_3 = [
  /* 0 */ {
    type: "title",
    topLabel: "Corso IA Avanzato — Lezione 3",
    title: "L'IA che lavora\nper te",
    subtitle: "Conoscenza, skill, agenti",
    date: "22 aprile 2026",
    footer: "ISI Piaggia — Viareggio",
  },
  /* 1 */ {
    type: "section",
    label: "BLOCCO 1",
    title: "Gestire la conoscenza\ncon gli LLM",
    icon: "📚",
  },
  /* 2 */ {
    type: "content",
    title: "Il problema",
    blocks: [
      {
        type: "analogy",
        icon: "📖",
        title: "La biblioteca senza bibliotecario",
        text: "Avete una biblioteca personale enorme: appunti su Google Docs, PDF, email, foto di lavagne, quaderni. Ma non avete né un bibliotecario né un catalogo. Ogni volta che cercate qualcosa, rovesciamo tutto da capo.",
      },
      {
        type: "text",
        text: "Il sapere del docente è frammentato e non interrogabile. Ogni conversazione con l'IA riparte da zero.",
      },
    ],
  },
  /* 3 */ {
    type: "content",
    title: "Il pattern di Karpathy",
    blocks: [
      {
        type: "quote",
        text: "\"Spendo più token a manipolare conoscenza che a manipolare codice.\"",
        author: "Andrej Karpathy, aprile 2026",
      },
      {
        type: "text",
        text: "Invece di chiedere all'IA di riscoprire tutto da zero ogni volta (RAG), facciamo compilare la conoscenza una volta sola e la teniamo aggiornata.",
      },
    ],
  },
  /* 4 */ {
    type: "flow",
    title: "Il flusso: da materiale grezzo a wiki",
    steps: [
      {
        emoji: "📥",
        label: "raw/",
        desc: "Articoli, paper, appunti, foto, pagine web salvate",
      },
      {
        emoji: "⚙️",
        label: "LLM compila",
        desc: "L'IA legge tutto, sintetizza, collega i concetti, crea articoli",
      },
      {
        emoji: "📖",
        label: "wiki/",
        desc: "~100 articoli in Markdown, con backlink e indice. Interrogabile.",
      },
      {
        emoji: "💬",
        label: "Query",
        desc: "Fai domande complesse al tuo wiki. Le risposte si accumulano.",
      },
    ],
  },
  /* 5 */ {
    type: "content",
    title: "L'analogia del compilatore",
    blocks: [
      {
        type: "three-cards",
        cards: [
          {
            emoji: "📝",
            title: "Codice sorgente",
            text: "I tuoi appunti, articoli, materiali grezzi nella cartella raw/",
          },
          {
            emoji: "⚙️",
            title: "Compilatore",
            text: "L'LLM che legge, sintetizza, collega e struttura",
          },
          {
            emoji: "🖥️",
            title: "Programma",
            text: "Il wiki: articoli strutturati, interrogabili, che si accumulano",
          },
        ],
      },
      {
        type: "text",
        text: "Obsidian è il frontend: file Markdown, nessun lock-in, grafo visuale dei concetti collegati. Ma il wiki funziona con qualsiasi editor di testo.",
      },
    ],
  },
  /* 6 */ {
    type: "demo",
    title: "Demo: un vault di conoscenza",
    subtitle: "Obsidian + LLM wiki pattern",
    steps: [
      "Cartella raw/ → 5 fonti sulla didattica delle onde",
      "L'LLM ha compilato → wiki/ con articoli collegati",
      "Graph view: i concetti connessi visivamente",
      "Query: \"Quali sono le misconcezioni più comuni sulle onde?\"",
      "L'IA risponde usando il wiki, non inventando",
    ],
    note: "La conoscenza si accumula. Le tue esplorazioni arricchiscono il wiki.",
  },
  /* 7 */ {
    type: "content",
    title: "Casi d'uso per docenti",
    blocks: [
      {
        type: "three-cards",
        cards: [
          {
            emoji: "🔬",
            title: "Base disciplinare",
            text: "Tutti i materiali della tua materia: programmi, appunti, risorse. Interrogabili con domande complesse.",
          },
          {
            emoji: "🎯",
            title: "Strategie didattiche",
            text: "Raccolta di metodi, attività, esperienze. \"Cosa ha funzionato per insegnare X?\"",
          },
          {
            emoji: "📊",
            title: "Archivio verifiche",
            text: "Verifiche + analisi errori ricorrenti. \"Dove sbagliano di più in termodinamica?\"",
          },
        ],
      },
    ],
  },
  /* 8 */ {
    type: "section",
    label: "BLOCCO 2",
    title: "Skill: insegnare all'IA\ncome lavori tu",
    icon: "🛠️",
  },
  /* 9 */ {
    type: "content",
    title: "Cos'è una skill?",
    blocks: [
      {
        type: "analogy",
        icon: "👔",
        title: "Il neolaureato brillante",
        text: "Il chatbot è un neolaureato brillantissimo ma che non sa nulla del tuo lavoro. La skill è il manuale di procedure che gli dai il primo giorno: cosa fare, come farlo, con che formato, con che vincoli.",
      },
      {
        type: "text",
        text: "In pratica: un documento (Markdown o testo) con istruzioni dettagliate che l'IA segue ogni volta. Funziona su Claude (Skills), OpenAI (Custom GPT/Codex), Gemini (Gems).",
      },
    ],
  },
  /* 10 */ {
    type: "content",
    title: "Esempi di skill per docenti",
    blocks: [
      {
        type: "three-cards",
        cards: [
          {
            emoji: "📝",
            title: "Costruttore verifiche",
            text: "Materia, livello, n° domande, tipologia, criteri di valutazione. Genera verifiche coerenti ogni volta.",
          },
          {
            emoji: "🔍",
            title: "Analizzatore compiti",
            text: "Prende foto/PDF del compito, valuta secondo la tua rubrica, suggerisce feedback personalizzato.",
          },
          {
            emoji: "🔄",
            title: "Traduttore didattico",
            text: "Riscrive un testo scientifico al livello della tua classe. Mantiene rigore ma semplifica il linguaggio.",
          },
        ],
      },
    ],
  },
  /* 11 */ {
    type: "exercise",
    title: "Esercitazione: la tua prima skill",
    subtitle: "10 minuti — Scrivi le istruzioni per la tua IA",
    instructions: "In linguaggio naturale, scrivi le istruzioni che daresti a un assistente per svolgere un compito ricorrente del tuo lavoro.",
    suggestions: [
      "Che materia/contesto?",
      "Che compito deve svolgere?",
      "Che formato deve usare?",
      "Che vincoli deve rispettare?",
      "Come deve parlare? (tono, livello)",
      "Cosa NON deve fare?",
    ],
  },
  /* 12 */ {
    type: "section",
    label: "BLOCCO 3",
    title: "Agenti:\nl'IA che fa cose per te",
    icon: "🤖",
  },
  /* 13 */ {
    type: "content",
    title: "Lo spettro dell'autonomia (ripresa)",
    blocks: [
      {
        type: "text",
        text: "L'agente non aspetta che tu chieda. Pianifica, usa strumenti, decide il passo successivo. Tu decidi quanto lasciarlo fare: guinzaglio corto o lungo.",
      },
      {
        type: "analogy",
        icon: "🐕",
        title: "Il guinzaglio",
        text: "Un cane al guinzaglio corto: lo controlli passo passo. Al guinzaglio lungo: gli dai un obiettivo e lui trova la strada. Senza guinzaglio: devi fidarti molto. Gli agenti IA funzionano allo stesso modo.",
      },
    ],
  },
  /* 14 */ {
    type: "agents-table",
    title: "Panorama agenti — aprile 2026",
    agents: [
      {
        name: "Claude Cowork",
        what: "Agente desktop: lavora sui tuoi file, app, browser",
        who: "Chiunque (no codice richiesto)",
        cost: "Pro $20 / Max $100",
        highlight: true,
      },
      {
        name: "Dispatch",
        what: "Controllo remoto di Cowork dal telefono",
        who: "Chi usa Cowork",
        cost: "Incluso",
      },
      {
        name: "OpenClaw",
        what: "Agente open-source su Telegram, WhatsApp, Discord. 300K+ ★ su GitHub",
        who: "Chi smanetta un po'",
        cost: "Gratuito + API key LLM",
      },
      {
        name: "Hermes Agent",
        what: "Come OpenClaw ma si auto-migliora: crea skill da solo, impara dai propri errori",
        who: "Più tecnico",
        cost: "Gratuito + API key LLM",
      },
    ],
  },
  /* 15 */ {
    type: "demo",
    title: "Demo: Claude Cowork",
    subtitle: "L'agente che lavora mentre tu fai altro",
    steps: [
      "Assegno un task: \"Prendi questi 3 PDF di verifiche...\"",
      "\"...analizzali, crea un riepilogo degli errori per argomento\"",
      "Claude pianifica: legge i file, li analizza, produce il report",
      "Torno e trovo il risultato pronto",
      "Dispatch: posso fare tutto questo dal telefono",
    ],
    note: "L'IA non chatta. Lavora.",
  },
  /* 16 */ {
    type: "content",
    title: "Visione: il sistema che si accumula",
    blocks: [
      {
        type: "text",
        text: "Il percorso che stiamo costruendo non è una lista di strumenti. È un sistema dove ogni pezzo alimenta gli altri.",
      },
      {
        type: "flow-horizontal",
        items: ["Protocollo 4D", "Vibe coding", "Knowledge base", "Skill", "Agenti"],
      },
      {
        type: "quote",
        text: "\"Tra un anno molti di voi avranno un agente personale che conosce la vostra materia, i vostri studenti, il vostro stile.\"",
        author: "",
      },
    ],
  },
  /* 17 */ {
    type: "preview",
    title: "Prossimi passi",
    date: "Prossime lezioni",
    items: [
      "🔧 Approfondimento skill e custom GPT/Gems",
      "🎯 Progetto personale di ciascun docente",
    ],
  },
];

/* ─── SLIDE RENDERERS ─── */

function TitleSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", height: "100%", textAlign: "center", padding: "3rem",
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.dark} 100%)`,
    }}>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.85rem", fontWeight: 600,
        letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange,
        marginBottom: "1.5rem",
      }}>{slide.topLabel}</div>
      <h1 style={{
        fontFamily: "'EB Garamond'", fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
        fontWeight: 700, color: C.cream, lineHeight: 1.1,
        whiteSpace: "pre-line", margin: "0 0 1rem",
      }}>{slide.title}</h1>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "clamp(1rem, 2vw, 1.5rem)",
        color: C.orangeLight, marginBottom: "2rem",
      }}>{slide.subtitle}</div>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.9rem", color: C.gray,
      }}>{slide.date}</div>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.8rem", color: C.gray,
        marginTop: "0.3rem",
      }}>{slide.footer}</div>
    </div>
  );
}

function SectionSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", height: "100%", textAlign: "center",
      background: `linear-gradient(160deg, ${C.orange} 0%, ${C.orangeLight} 100%)`,
      padding: "3rem",
    }}>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.8rem", fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase", color: C.navy,
        marginBottom: "1rem", opacity: 0.7,
      }}>{slide.label}</div>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{slide.icon}</div>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "clamp(2rem, 4vw, 3.5rem)",
        fontWeight: 700, color: C.white, lineHeight: 1.15,
        whiteSpace: "pre-line",
      }}>{slide.title}</h2>
    </div>
  );
}

function SpectrumSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "1.4rem 2.2rem", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "2rem", fontWeight: 700,
        color: C.navy, margin: "0 0 2rem", textAlign: "center",
      }}>{slide.title}</h2>
      <div style={{
        display: "flex", gap: "1.5rem", flex: 1, alignItems: "stretch",
      }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{
            flex: 1, background: C.white, borderRadius: "1rem",
            padding: "1.5rem", display: "flex", flexDirection: "column",
            borderTop: `4px solid ${item.color}`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.emoji}</div>
            <div style={{
              fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "1.2rem",
              color: C.navy, marginBottom: "0.5rem",
            }}>{item.name}</div>
            <div style={{
              fontFamily: "'EB Garamond'", fontStyle: "italic", fontSize: "1rem",
              color: C.orange, marginBottom: "0.75rem",
            }}>{item.metaphor}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: C.navy, marginBottom: "0.3rem" }}>
              <strong>Fa:</strong> {item.does}
            </div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: C.navy, marginBottom: "0.3rem" }}>
              <strong>Autonomia:</strong> {item.autonomy}
            </div>
            <div style={{
              marginTop: "auto", padding: "0.6rem",
              background: C.creamDark, borderRadius: "0.5rem",
              fontFamily: "'JetBrains Mono'", fontSize: "0.75rem", color: C.navyLight,
            }}>{item.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", height: "100%", textAlign: "center",
      background: C.navy, padding: "3rem",
    }}>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
        fontWeight: 700, color: C.cream, marginBottom: "1rem",
      }}>{slide.title}</h2>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "1.1rem", color: C.orangeLight,
        marginBottom: "2rem",
      }}>{slide.subtitle}</div>
      {slide.note && <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.9rem", color: C.gray,
        padding: "1rem 1.5rem", border: `1px dashed ${C.gray}`,
        borderRadius: "0.75rem",
      }}>{slide.note}</div>}
    </div>
  );
}

function Block({ block }) {
  if (block.type === "quote") {
    return (
      <div style={{
        borderLeft: `4px solid ${C.orange}`, padding: "1rem 1.5rem",
        margin: "0.75rem 0", background: C.white, borderRadius: "0 0.75rem 0.75rem 0",
      }}>
        <div style={{
          fontFamily: "'EB Garamond'", fontSize: "1.15rem", fontStyle: "italic",
          color: C.navy, lineHeight: 1.5,
        }}>{block.text}</div>
        {block.author && <div style={{
          fontFamily: "'DM Sans'", fontSize: "0.8rem", color: C.orange,
          marginTop: "0.5rem", fontWeight: 600,
        }}>— {block.author}</div>}
      </div>
    );
  }
  if (block.type === "analogy") {
    return (
      <div style={{
        background: `linear-gradient(135deg, ${C.navy}08, ${C.orange}12)`,
        borderRadius: "1rem", padding: "1.25rem 1.5rem", margin: "0.75rem 0",
        border: `1px solid ${C.orange}30`,
      }}>
        <div style={{
          fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.95rem",
          color: C.navy, marginBottom: "0.4rem",
        }}>{block.icon} {block.title}</div>
        <div style={{
          fontFamily: "'DM Sans'", fontSize: "1rem", color: C.navyLight,
          lineHeight: 1.6,
        }}>{block.text}</div>
      </div>
    );
  }
  if (block.type === "text") {
    return (
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "1rem", color: C.navyLight,
        lineHeight: 1.65, margin: "0.75rem 0",
      }}>{block.text}</div>
    );
  }
  if (block.type === "three-cards") {
    return (
      <div style={{
        display: "flex", gap: "1rem", margin: "0.75rem 0",
      }}>
        {block.cards.map((card, i) => (
          <div key={i} style={{
            flex: 1, background: C.white, borderRadius: "0.75rem",
            padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            borderTop: `3px solid ${C.orange}`,
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{card.emoji}</div>
            <div style={{
              fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.95rem",
              color: C.navy, marginBottom: "0.4rem",
            }}>{card.title}</div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: "0.9rem", color: C.navyLight,
              lineHeight: 1.5,
            }}>{card.text}</div>
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "flow-horizontal") {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "0.5rem", margin: "1.5rem 0", flexWrap: "wrap",
      }}>
        {block.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              background: i === block.items.length - 1 ? C.orange : C.navy,
              color: C.white, padding: "0.6rem 1.2rem", borderRadius: "2rem",
              fontFamily: "'DM Sans'", fontWeight: 600, fontSize: "0.85rem",
            }}>{item}</div>
            {i < block.items.length - 1 && <span style={{ color: C.orange, fontSize: "1.2rem" }}>→</span>}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function ContentSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "1.4rem 2.2rem", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "1.8rem", fontWeight: 700,
        color: C.navy, margin: "0 0 1.5rem",
      }}>{slide.title}</h2>
      <div style={{ flex: 1, overflow: "auto" }}>
        {slide.blocks.map((block, i) => <Block key={i} block={block} />)}
      </div>
    </div>
  );
}

function ToolsGridSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "1.4rem 2.2rem", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "1.8rem", fontWeight: 700,
        color: C.navy, margin: "0 0 0.3rem",
      }}>{slide.title}</h2>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.9rem", color: C.gray,
        marginBottom: "1.5rem",
      }}>{slide.subtitle}</div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", flex: 1,
      }}>
        {slide.categories.map((cat, i) => (
          <div key={i} style={{
            background: cat.highlight ? C.navy : C.white,
            color: cat.highlight ? C.cream : C.navy,
            borderRadius: "1rem", padding: "1.25rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "1rem",
              marginBottom: "0.3rem",
            }}>{cat.label}</div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: "0.8rem",
              opacity: 0.7, marginBottom: "0.75rem",
            }}>{cat.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {cat.tools.map((tool, j) => (
                <span key={j} style={{
                  padding: "0.3rem 0.7rem", borderRadius: "1rem",
                  fontFamily: "'DM Sans'", fontSize: "0.75rem", fontWeight: 600,
                  background: cat.highlight ? C.orange : C.creamDark,
                  color: cat.highlight ? C.white : C.navy,
                }}>{tool}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      height: "100%", padding: "1.5rem 3rem",
      background: `linear-gradient(160deg, ${C.dark} 0%, ${C.navy} 100%)`,
    }}>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.75rem", fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase", color: C.orange,
        marginBottom: "0.5rem",
      }}>DEMO</div>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "2rem", fontWeight: 700,
        color: C.cream, margin: "0 0 0.3rem",
      }}>{slide.title}</h2>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.95rem", color: C.orangeLight,
        marginBottom: "2rem",
      }}>{slide.subtitle}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {slide.steps.map((step, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "50%",
              background: C.orange, color: C.white, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.85rem",
              flexShrink: 0,
            }}>{i + 1}</div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: "0.95rem", color: C.cream,
              lineHeight: 1.4,
            }}>{step}</div>
          </div>
        ))}
      </div>
      {slide.note && <div style={{
        marginTop: "2rem", padding: "0.75rem 1rem",
        borderLeft: `3px solid ${C.orange}`,
        fontFamily: "'DM Sans'", fontSize: "0.85rem", fontStyle: "italic",
        color: C.orangeLight,
      }}>{slide.note}</div>}
    </div>
  );
}

function ExerciseSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "1.4rem 2.2rem",
      background: `linear-gradient(135deg, ${C.cream} 0%, ${C.creamDark} 100%)`,
    }}>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.75rem", fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase", color: C.orange,
        marginBottom: "0.5rem",
      }}>ESERCITAZIONE</div>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "2rem", fontWeight: 700,
        color: C.navy, margin: "0 0 0.3rem",
      }}>{slide.title}</h2>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.9rem", color: C.gray,
        marginBottom: "1.5rem",
      }}>{slide.subtitle}</div>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "1rem", color: C.navyLight,
        marginBottom: "1.5rem", lineHeight: 1.5,
      }}>{slide.instructions}</div>
      <div style={{
        background: C.white, borderRadius: "1rem", padding: "1.5rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.85rem",
          color: C.navy, marginBottom: "0.75rem",
        }}>💡 Suggerimenti</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: slide.suggestions.length > 5 ? "1fr 1fr" : "1fr",
          gap: "0.5rem",
        }}>
          {slide.suggestions.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "'DM Sans'", fontSize: "0.95rem", color: C.navyLight,
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: C.orange, flexShrink: 0,
              }} />
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "1.4rem 2.2rem", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "1.8rem", fontWeight: 700,
        color: C.navy, margin: "0 0 2rem", textAlign: "center",
      }}>{slide.title}</h2>
      <div style={{
        display: "flex", alignItems: "stretch", gap: "0.5rem",
        flex: 1, justifyContent: "center",
      }}>
        {slide.steps.map((step, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <div style={{
              background: C.white, borderRadius: "1rem", padding: "1.5rem",
              textAlign: "center", width: "180px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              borderTop: `4px solid ${C.orange}`,
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{step.emoji}</div>
              <div style={{
                fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.95rem",
                color: C.navy, marginBottom: "0.3rem",
              }}>{step.label}</div>
              <div style={{
                fontFamily: "'DM Sans'", fontSize: "0.75rem", color: C.navyLight,
                lineHeight: 1.4,
              }}>{step.desc}</div>
            </div>
            {i < slide.steps.length - 1 && (
              <div style={{
                fontSize: "1.5rem", color: C.orange, fontWeight: 700,
              }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentsTableSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "1.2rem 2rem", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "1.8rem", fontWeight: 700,
        color: C.navy, margin: "0 0 1.5rem",
      }}>{slide.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        {slide.agents.map((agent, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "150px 1fr 160px 120px",
            gap: "1rem", alignItems: "center",
            background: agent.highlight ? C.navy : C.white,
            color: agent.highlight ? C.cream : C.navy,
            borderRadius: "0.75rem", padding: "1rem 1.25rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            borderLeft: agent.highlight ? `4px solid ${C.orange}` : "none",
          }}>
            <div style={{
              fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "0.95rem",
            }}>{agent.name}</div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: "0.9rem", lineHeight: 1.4,
              opacity: 0.85,
            }}>{agent.what}</div>
            <div style={{
              fontFamily: "'DM Sans'", fontSize: "0.75rem", opacity: 0.7,
            }}>{agent.who}</div>
            <div style={{
              fontFamily: "'JetBrains Mono'", fontSize: "0.75rem",
              color: agent.highlight ? C.orange : C.orange,
              fontWeight: 600,
            }}>{agent.cost}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewSlide({ slide }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", height: "100%", textAlign: "center",
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.dark} 100%)`,
      padding: "3rem",
    }}>
      <div style={{
        fontFamily: "'DM Sans'", fontSize: "0.8rem", fontWeight: 600,
        letterSpacing: "0.15em", textTransform: "uppercase", color: C.orange,
        marginBottom: "1rem",
      }}>{slide.date}</div>
      <h2 style={{
        fontFamily: "'EB Garamond'", fontSize: "2.5rem", fontWeight: 700,
        color: C.cream, margin: "0 0 2rem",
      }}>{slide.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{
            fontFamily: "'DM Sans'", fontSize: "1.1rem", color: C.creamDark,
          }}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function SlideRenderer({ slide }) {
  const renderers = {
    title: TitleSlide,
    section: SectionSlide,
    spectrum: SpectrumSlide,
    question: QuestionSlide,
    content: ContentSlide,
    "tools-grid": ToolsGridSlide,
    demo: DemoSlide,
    exercise: ExerciseSlide,
    flow: FlowSlide,
    "agents-table": AgentsTableSlide,
    preview: PreviewSlide,
  };
  const Comp = renderers[slide.type];
  return Comp ? <Comp slide={slide} /> : <div>Unknown slide type: {slide.type}</div>;
}


/* ─── Scale-to-fit: la slide è sempre 1280×720 e viene scalata ─── */
function useSlideScale(reservedH = 51) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const avW = window.innerWidth;
      const avH = window.innerHeight - reservedH;
      setScale(Math.min(avW / 1280, avH / 720));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [reservedH]);
  return scale;
}
/* ─── MAIN APP ─── */

export default function CorsoIAAvanzato({ initialLesson = null, onBack }) {
  const [lecture, setLecture] = useState(initialLesson); // null = menu, 2 or 3
  const scale = useSlideScale(52); // bottom bar ~52px
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = lecture === 2 ? LEZIONE_2 : lecture === 3 ? LEZIONE_3 : [];
  const total = slides.length;

  const goNext = useCallback(() => {
    setSlideIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "Escape") {
        setLecture(null);
        setSlideIndex(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Menu
  if (lecture === null) {
    return (
      <div style={{
        width: "100vw", height: "100vh", display: "flex",
        flexDirection: "column", justifyContent: "center", alignItems: "center",
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.dark} 100%)`,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.2em",
          textTransform: "uppercase", color: C.orange, marginBottom: "1rem",
        }}>Corso IA Avanzato</div>
        <h1 style={{
          fontFamily: "'EB Garamond'", fontSize: "3rem", fontWeight: 700,
          color: C.cream, marginBottom: "3rem",
        }}>Scegli la lezione</h1>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { n: 2, title: "Costruire con l'IA", date: "15 aprile", sub: "Vibe coding, artefatti, strumenti" },
            { n: 3, title: "L'IA che lavora per te", date: "22 aprile", sub: "Conoscenza, skill, agenti" },
          ].map((l) => (
            <button
              key={l.n}
              onClick={() => { setLecture(l.n); setSlideIndex(0); }}
              style={{
                background: C.white, border: "none", borderRadius: "1.25rem",
                padding: "2rem 2.5rem", cursor: "pointer",
                width: "300px", textAlign: "left",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              <div style={{
                fontFamily: "'DM Sans'", fontSize: "0.75rem", fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: C.orange, marginBottom: "0.5rem",
              }}>Lezione {l.n} — {l.date}</div>
              <div style={{
                fontFamily: "'EB Garamond'", fontSize: "1.5rem", fontWeight: 700,
                color: C.navy, marginBottom: "0.5rem",
              }}>{l.title}</div>
              <div style={{
                fontFamily: "'DM Sans'", fontSize: "0.85rem", color: C.gray,
              }}>{l.sub}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Presentation
  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: C.dark, display: "flex", flexDirection: "column",
    }}>
      {/* Slide area — scale-to-fit 1280×720 */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{
          width: 1280, height: 720,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}>
          <SlideRenderer slide={slides[slideIndex]} />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.5rem 2rem 1rem",
      }}>
        <button
          onClick={() => { if (initialLesson !== null && onBack) { onBack(); } else { setLecture(null); setSlideIndex(0); } }}
          style={{
            background: "transparent", border: `1px solid ${C.gray}`,
            color: C.gray, padding: "0.4rem 1rem", borderRadius: "0.5rem",
            cursor: "pointer", fontFamily: "'DM Sans'", fontSize: "0.8rem",
          }}
        >
          ← Menu
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
        }}>
          <button
            onClick={goPrev}
            disabled={slideIndex === 0}
            style={{
              background: slideIndex === 0 ? "transparent" : C.navy,
              color: slideIndex === 0 ? C.gray : C.cream,
              border: "none", borderRadius: "0.5rem",
              padding: "0.5rem 1rem", cursor: slideIndex === 0 ? "default" : "pointer",
              fontFamily: "'DM Sans'", fontSize: "0.85rem",
            }}
          >
            ‹ Prec
          </button>
          <span style={{
            fontFamily: "'JetBrains Mono'", fontSize: "0.8rem", color: C.gray,
          }}>
            {slideIndex + 1} / {total}
          </span>
          <button
            onClick={goNext}
            disabled={slideIndex === total - 1}
            style={{
              background: slideIndex === total - 1 ? "transparent" : C.orange,
              color: slideIndex === total - 1 ? C.gray : C.white,
              border: "none", borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              cursor: slideIndex === total - 1 ? "default" : "pointer",
              fontFamily: "'DM Sans'", fontSize: "0.85rem",
            }}
          >
            Succ ›
          </button>
        </div>

        <div style={{
          fontFamily: "'DM Sans'", fontSize: "0.75rem", color: C.gray,
        }}>
          ← → per navigare · ESC per tornare
        </div>
      </div>
    </div>
  );
}
