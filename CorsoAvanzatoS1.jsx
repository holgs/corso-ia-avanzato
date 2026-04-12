import { useState, useEffect, useCallback } from "react";

// ─── Brand Piaggia ───
const C = {
  navy: "#1a2744",
  navyLight: "#243352",
  orange: "#e8803a",
  orangeLight: "#f5a623",
  cream: "#FFF8F0",
  white: "#ffffff",
  gray: "#94a3b8",
  grayDark: "#64748b",
  text: "#1e293b",
  greenSoft: "#34d399",
  violaSoft: "#a78bfa",
};

const FONT = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

// ─── SLIDES DATA ───
const SLIDES = [
  // ===== PART 1: INTRO =====
  {
    id: "title",
    layout: "title",
    part: 1,
    data: {
      title: "Corso IA Avanzato",
      subtitle: "Sessione 1 — Dal prompt al metodo",
      footer: "ISI Piaggia · Viareggio · Aprile 2026",
    },
  },
  {
    id: "benvenuto",
    layout: "centered",
    part: 1,
    data: {
      icon: "👋",
      title: "Benvenuti!",
      body: "Bello ritrovarsi e bello vedere facce nuove.\nQui c'è chi viene dal corso base e chi inizia oggi il percorso.\n\nNon importa da dove partite: questo corso è pensato per portarvi tutti un passo avanti, dal saper usare gli strumenti al saper pensare con gli strumenti.\n\nL'unico prerequisito è la curiosità.",
    },
  },
  {
    id: "sondaggio",
    layout: "bullets",
    part: 1,
    data: {
      title: "Cosa ci dice il sondaggio",
      subtitle: "Prime tendenze dalle vostre risposte (sondaggio ancora aperto)",
      items: [
        "ChatGPT e Gemini sono i vostri compagni di viaggio principali — quasi tutti li usate regolarmente. Qualcuno ha scoperto anche Claude, Perplexity e NotebookLM",
        "Nessuno ha un abbonamento a pagamento: lavorate tutti con le versioni gratuite, il che dimostra che si possono ottenere risultati anche senza spendere",
        "Usate l'IA soprattutto per creare verifiche, cercare informazioni, generare materiali e semplificare testi. Usi concreti e pragmatici — ottimo punto di partenza",
        "La maggior parte di voi organizza i propri materiali su Google Drive; alcuni non usano nessun sistema di organizzazione digitale. Ne riparleremo nelle prossime lezioni",
      ],
    },
  },
  {
    id: "percorso",
    layout: "grid4",
    part: 1,
    data: {
      title: "Il percorso in 4 incontri",
      items: [
        { num: "01", label: "Fondamenti\ne Contesto", desc: "Il framework AI Fluency (4D), il Documento di Contesto Didattico: insegnare all'IA chi siete e come lavorate", active: true },
        { num: "02", label: "Costruire\ncon l'IA", desc: "Dal chatbot al vibe coding: far generare strumenti, app e materiali interattivi descrivendo cosa volete", },
        { num: "03", label: "L'IA che\nlavora per te", desc: "Basi di conoscenza personali, skill personalizzate e agenti autonomi: sistemi che accumulano sapere nel tempo", },
        { num: "04", label: "Plenaria\ndi restituzione", desc: "Condivisione dei progetti, peer review tra colleghi, riflessioni collettive su come integrare l'IA nella scuola", },
      ],
    },
  },
  {
    id: "filo",
    layout: "centered",
    part: 1,
    data: {
      icon: "🧵",
      title: "Il filo conduttore",
      body: "Ogni incontro aggiunge un tassello.\nNon sono lezioni isolate ma un percorso cumulativo.\n\nOggi costruite il Contesto — il vostro «biglietto da visita» per l'IA.\nLa prossima volta lo userete per costruire strumenti.\nPoi per creare sistemi che lavorano al posto vostro.\nInfine, condividerete con i colleghi quello che avete creato.",
      highlight: "Dal chiedere al costruire.\nDal costruire al delegare.\nDal delegare al condividere.",
    },
  },
  {
    id: "oggi",
    layout: "split",
    part: 1,
    data: {
      title: "La sessione di oggi",
      left: {
        icon: "🔄",
        heading: "Parte 1 — Contesto",
        text: "Obiettivi del corso e programma\nRipasso dei concetti chiave\nGli strumenti che useremo\nIl framework AI Fluency (4D)",
        time: "~40 min",
      },
      right: {
        icon: "🎯",
        heading: "Parte 2 — Laboratorio",
        text: "Il Documento di Contesto Didattico\nL'IA vi intervista (esercitazione)\nRevisione e discussione\nAnteprima della prossima sessione",
        time: "~70 min",
      },
    },
  },
  {
    id: "ripasso",
    layout: "bullets",
    part: 1,
    data: {
      title: "Cosa sappiamo già",
      subtitle: "Concetti chiave dal corso base — ripasso rapido",
      items: [
        "Un LLM (Large Language Model) non «sa» le cose: calcola la sequenza di parole più probabile dato il contesto. Non ragiona, ma simula il ragionamento in modo molto convincente",
        "Il prompt è il volante, non il motore: la qualità di ciò che ottenete dipende dalla qualità di ciò che chiedete. Un prompt vago produce risultati vaghi",
        "Più contesto = risposte migliori. L'IA non vi conosce, non sa che materia insegnate, chi sono i vostri studenti, come preferite lavorare. Dovete dirglielo voi, ogni volta",
        "L'IA amplifica ciò che già sapete fare, non lo sostituisce. Se sapete progettare una buona lezione, l'IA vi aiuta a farlo più velocemente. Se non lo sapete, non compensa",
      ],
    },
  },
  {
    id: "metafora-gps",
    layout: "centered",
    part: 1,
    data: {
      icon: "🧭",
      title: "La metafora del GPS",
      body: "Nel corso base avete imparato a guidare l'auto.\nSapete accendere il motore, sterzare, frenare.\nSapete chiedere all'IA di fare cose semplici.\n\nNel corso avanzato imparerete\na programmare il navigatore.",
      highlight: "Dire all'IA non solo cosa fare,\nma come pensare, in quale contesto,\ncon quale stile, per quale obiettivo didattico.\n\nE soprattutto: costruire un sistema\nche non dovete riprogrammare ogni volta.",
    },
  },
  {
    id: "strumenti",
    layout: "tools",
    part: 1,
    data: {
      title: "I nostri strumenti",
      tools: [
        { name: "Claude", desc: "Ragionamento profondo, scrittura lunga, analisi critica. Eccellente per progettazione didattica e feedback strutturato", color: "#d97706" },
        { name: "Gemini", desc: "Integrazione nativa con Google (Docs, Sheets, Drive). Canvas per generare codice e artefatti visivi", color: "#4285f4" },
        { name: "ChatGPT", desc: "Il piu diffuso tra voi. Versatile, con GPT Store e generazione immagini. Canvas per codice e testi", color: "#10a37f" },
        { name: "Perplexity", desc: "Motore di ricerca potenziato dall'IA. Ideale per fact-checking e ricerca con fonti citate", color: "#7c3aed" },
      ],
      note: "Oggi ognuno userà lo strumento con cui si trova meglio.\nVi daremo un prompt ottimizzato per Claude, Gemini e ChatGPT.",
    },
  },
  // ===== PART 2: FRAMEWORK 4D =====
  {
    id: "transizione",
    layout: "transition",
    part: 2,
    data: {
      label: "PARTE 2",
      title: "Da strumenti a metodo",
      subtitle: "AI Fluency — Le 4D e il Documento di Contesto Didattico",
    },
  },
  {
    id: "problema",
    layout: "compare",
    part: 2,
    data: {
      title: "Il problema che risolviamo oggi",
      left: {
        label: "❌ Senza contesto",
        text: "\"Crea una verifica di matematica\nper la seconda superiore\"",
        result: "Risultato generico, piatto,\nva bene per tutti e per nessuno.\nDovrete riscrivere quasi tutto.\nTempo risparmiato: poco.",
      },
      right: {
        label: "✅ Con contesto",
        text: "\"Crea una verifica per la mia 2a\nliceo sportivo, con problemi\nlegati allo sport, usando il\nmetodo dialogico che preferisco\"",
        result: "Risultato calibrato e coerente\ncon il vostro stile. Richiede\nsolo ritocchi. L'IA diventa\nun vero partner di lavoro.",
      },
    },
  },
  {
    id: "framework4d",
    layout: "framework",
    part: 2,
    data: {
      title: "Il Framework delle 4D",
      subtitle: "AI Fluency — Da strumento di automazione a partner di pensiero",
      dimensions: [
        { letter: "D", word: "Delega", desc: "Decidere consapevolmente cosa affidare all'IA e cosa no. Richiede: consapevolezza del problema, conoscenza della piattaforma, e delega effettiva del compito", icon: "🎯" },
        { letter: "D", word: "Descrizione", desc: "Comunicare con contesto ricco e specifico. Tre aspetti: il prodotto finale desiderato, il processo da seguire, la performance (stile/tono) richiesta", icon: "📝" },
        { letter: "D", word: "Discernimento", desc: "Analisi critica costante degli output. Valutare in base alla propria esperienza e spiegare all'IA perché una proposta funziona o meno per i propri studenti", icon: "🔍" },
        { letter: "D", word: "Diligenza", desc: "Uso responsabile e trasparente: proteggere i dati sensibili, verificare i fatti, controllare i bias, documentare il ruolo svolto dall'IA nel processo", icon: "🛡️" },
      ],
    },
  },
  {
    id: "aumento",
    layout: "compare",
    part: 2,
    data: {
      title: "Il principio cardine: Aumento, non Automazione",
      left: {
        label: "🤖 Automazione",
        text: "\"Scrivi tu la verifica.\nIo la stampo e la consegno.\"\n\nL'IA fa tutto il lavoro.\nIo non ci metto nulla di mio.",
        result: "L'IA lavora PER te.\nTu sei fuori dal processo.\nIl risultato non ti rappresenta.",
      },
      right: {
        label: "🤝 Aumento (Augmentation)",
        text: "\"Lavoriamo insieme alla verifica.\nIo conosco i miei studenti e la materia.\nTu mi aiuti a strutturare e a\nvedere angoli che non avevo considerato.\"",
        result: "L'IA lavora CON te.\nTu resti al centro.\nIl risultato è migliore di quello\nche avresti fatto da solo.",
      },
    },
  },
  {
    id: "ciclo",
    layout: "centered",
    part: 2,
    data: {
      icon: "🔄",
      title: "Il ciclo Descrizione-Discernimento",
      body: "Descrizione e Discernimento non sono passi separati.\nLavorano insieme in un ciclo di feedback continuo,\nesattamente come la conversazione tra un architetto e un committente.",
      highlight: "Descrivi un'esigenza → ricevi una proposta → valutala criticamente\n→ spiega perché funziona o no → affina la descrizione → l'output migliora.\n\nPiù iterate questo ciclo, più l'IA impara a lavorare con voi.\nOggi lo sperimenterete in prima persona costruendo il vostro Contesto.",
    },
  },
  {
    id: "analogia-casa",
    layout: "quote",
    part: 2,
    data: {
      quote: "La planimetria è il terreno sono il Contesto.\nGli attrezzi in sicurezza sono le 4D.\nL'architettura è il Design del corso.\nL'arredamento sono i Materiali.\n\nL'IA non è l'architetto, quello sei tu.\nÈ un capocantiere instancabile\nche conosce a memoria ogni tua specifica iniziale.",
      attribution: "Analogia della casa — AI Fluency Framework",
    },
  },
  {
    id: "intervista",
    layout: "centered",
    part: 2,
    data: {
      icon: "🪞",
      title: "L'IA come specchio professionale",
      body: "Non vi chiederemo di sedervi e scrivere un documento da zero.\nChiederemo all'IA di intervistarvi, come farebbe un collega curioso\nche vuole capire davvero come lavorate.\n\nQuesto è Descrizione + Discernimento in azione.",
      highlight: "L'IA vi fa le domande giuste per far emergere\nciò che sapete già ma non avete mai messo nero su bianco:\nla vostra filosofia, i vostri metodi, i vincoli con cui convivete.\n\nVoi valutate ogni riformulazione, correggete, approfondite.\nIl risultato è un documento che vi rappresenta davvero.",
    },
  },
  {
    id: "insight",
    layout: "quote",
    part: 2,
    data: {
      quote: "L'intervista con l'IA non serve a dare risposte.\nServe a scoprire le domande giuste\nda farsi sulla propria pratica.\n\nIl documento che ne uscirà\nè il vostro primo atto di Delega consapevole:\ndecidete voi cosa condividere e cosa no.",
      attribution: "L'IA come strumento di auto-riflessione professionale",
    },
  },
  {
    id: "come-funziona",
    layout: "steps",
    part: 2,
    data: {
      title: "Come funziona l'esercitazione",
      steps: [
        { num: "1", text: "Aprite il vostro strumento IA preferito (ChatGPT, Gemini o Claude)" },
        { num: "2", text: "Incollate il prompt che vi daremo — ne abbiamo preparato uno per ciascun modello" },
        { num: "3", text: "Lasciatevi intervistare: l'IA vi farà una domanda alla volta, con calma" },
        { num: "4", text: "Rispondete con onesta. Se una domanda vi mette in difficolta, e un buon segno: state scavando" },
        { num: "5", text: "Alla fine l'IA sintetizzerà tutto in un Documento di Contesto strutturato" },
        { num: "6", text: "Rileggete con occhio critico (Discernimento!) e correggete ciò che non vi rappresenta" },
      ],
    },
  },
  {
    id: "consigli",
    layout: "tips",
    part: 2,
    data: {
      title: "Consigli per l'esercizio",
      tips: [
        { icon: "🐢", label: "Lentezza", text: "Non è una gara. L'obiettivo è lasciarsi guidare dall'IA per far emergere aspetti della propria didattica che di solito restano impliciti. Prendetevi il tempo che serve." },
        { icon: "🧠", label: "Discernimento", text: "Il documento finale è VOSTRO, non dell'IA. Se ha frainteso un valore pedagogico, se ha usato un tono che non vi rappresenta: correggetelo. Questo è Discernimento in azione." },
        { icon: "🔒", label: "Privacy", text: "Siate specifici negli esempi per ottenere un contesto ricco, ma non inserite mai dati sensibili o nomi reali degli studenti. Usate descrizioni generiche." },
        { icon: "💡", label: "Flessibilità", text: "E normale se alcuni aspetti della vostra pratica sono difficili da articolare. Il bello del processo e proprio questo: rendere esplicito ciò che di solito resta nella vostra testa." },
      ],
    },
  },
  {
    id: "prompt-scelta",
    layout: "tools",
    part: 2,
    data: {
      title: "Scegliete il vostro prompt",
      tools: [
        { name: "Claude", desc: "Dialogo naturale e fluido. Riformula cio che capisce dopo ogni risposta. Deduce il vostro tono preferito", color: "#d97706" },
        { name: "Gemini", desc: "Istruzioni piu esplicite e strutturate. Ideale per chi preferisce un percorso guidato passo-passo", color: "#4285f4" },
        { name: "ChatGPT", desc: "Struttura markdown chiara. Puo fare osservazioni spontanee e collegamenti inaspettati", color: "#10a37f" },
      ],
      note: "Tre versioni dello stesso prompt, ottimizzate per il «carattere» di ciascun modello.\nStesso obiettivo, stesso output finale. Scegliete quello con cui lavorate di solito.",
    },
  },
  {
    id: "prompt-claude",
    layout: "prompt",
    part: 2,
    data: {
      model: "Claude",
      color: "#d97706",
      preview: [
        "Agisci come un esperto Partner di Pensiero Pedagogico.",
        "Intervistami con UNA domanda alla volta, aspetta la risposta.",
        "Riformula brevemente ciò che hai capito dopo ogni risposta.",
        "Esplora: Delega, Descrizione, Discernimento, Diligenza.",
        "Se intravedi una tensione (es. ideali vs vincoli), esplorala.",
        "Chiedi cosa NON vorrei che l'IA facesse al posto mio.",
        "Dopo 8-12 scambi → genera il Documento di Contesto.",
      ],
    },
  },
  {
    id: "prompt-gemini",
    layout: "prompt",
    part: 2,
    data: {
      model: "Gemini",
      color: "#4285f4",
      preview: [
        "Sei un esperto Partner di Pensiero Pedagogico.",
        "UNA domanda alla volta. NON generare liste di domande.",
        "Conferma in 1-2 frasi ciò che hai capito, poi prosegui.",
        "NON scrivere il documento prima del mio esplicito OK.",
        "Esplora le 4D del framework AI Fluency + confini dell'IA.",
        "Se rispondo in modo generico → chiedi un esempio concreto.",
        "Documento finale in markdown strutturato, pronto da copiare.",
      ],
    },
  },
  {
    id: "prompt-chatgpt",
    layout: "prompt",
    part: 2,
    data: {
      model: "ChatGPT",
      color: "#10a37f",
      preview: [
        "Sei un esperto Partner di Pensiero Pedagogico.",
        "Una sola domanda alla volta — mai elenchi di domande.",
        "Riassumi in max 2 frasi, poi fai la domanda successiva.",
        "Se emerge qualcosa di interessante, fermati ad esplorarlo.",
        "Puoi fare osservazioni spontanee, poi torna all'intervista.",
        "Almeno 8 scambi prima di generare il documento.",
        "Formato markdown pulito, pronto da copiare-incollare.",
      ],
    },
  },
  {
    id: "handson",
    layout: "transition",
    part: 2,
    data: {
      label: "HANDS-ON",
      title: "E il vostro turno",
      subtitle: "45 minuti · Aprite il vostro strumento · Incollate il prompt · Lasciatevi guidare dall'intervista",
    },
  },
  {
    id: "wrapup",
    layout: "bullets",
    part: 2,
    data: {
      title: "Cosa portate a casa oggi",
      subtitle: "Tre cose concrete dalla sessione di oggi",
      items: [
        "Il vostro Documento di Contesto Didattico personale — un artefatto riutilizzabile che potete incollare all'inizio di ogni conversazione con l'IA per ottenere risposte calibrate su di voi",
        "Il framework AI Fluency (le 4D) come metodo per strutturare ogni interazione con l'IA: Delega consapevole, Descrizione ricca, Discernimento critico, Diligenza responsabile",
        "L'esperienza diretta dell'IA come strumento di auto-riflessione professionale: non solo risposte, ma domande che vi aiutano a chiarire la vostra pratica",
        "Anticipazione: la prossima volta (15 aprile) passiamo dal chiedere al costruire. Vibe coding, artefatti, strumenti su misura generati dall'IA. Portate un'idea di qualcosa che vi piacerebbe avere!",
      ],
    },
  },
  {
    id: "chiusura",
    layout: "title",
    part: 2,
    data: {
      title: "Grazie!",
      subtitle: "Domande, dubbi, curiosita?",
      footer: "Sessione 2 (15 aprile) → Costruire con l'IA: dal chatbot al vibe coding",
    },
  },
];

// ─── SLIDE LAYOUTS ───

function TitleSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.orange}15 0%, transparent 70%)`,
      }} />
      <div style={{
        position: "absolute", bottom: -50, left: -50,
        width: 300, height: 300, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.orange}10 0%, transparent 70%)`,
      }} />
      <h1 style={{
        fontFamily: FONT.display, fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
        color: C.white, margin: 0, fontWeight: 700, letterSpacing: "-0.02em",
        lineHeight: 1.1,
      }}>{data.title}</h1>
      <div style={{
        width: 80, height: 4, background: C.orange,
        margin: "24px 0", borderRadius: 2,
      }} />
      <p style={{
        fontFamily: FONT.body, fontSize: "clamp(1rem, 2vw, 1.5rem)",
        color: C.orange, margin: 0, fontWeight: 500,
      }}>{data.subtitle}</p>
      {data.footer && (
        <p style={{
          fontFamily: FONT.body, fontSize: "0.85rem",
          color: `${C.white}80`, position: "absolute", bottom: 40,
        }}>{data.footer}</p>
      )}
    </div>
  );
}

function CenteredSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "60px 80px", background: C.cream,
    }}>
      {data.icon && <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>{data.icon}</div>}
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(2rem, 3.5vw, 3rem)",
        color: C.navy, margin: "0 0 24px", fontWeight: 700, lineHeight: 1.2,
      }}>{data.title}</h2>
      <p style={{
        fontFamily: FONT.body, fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
        color: C.text, lineHeight: 1.7, whiteSpace: "pre-line", maxWidth: 700,
      }}>{data.body}</p>
      {data.highlight && (
        <div style={{
          marginTop: 32, padding: "24px 40px", borderRadius: 16,
          background: `${C.orange}12`, borderLeft: `4px solid ${C.orange}`,
        }}>
          <p style={{
            fontFamily: FONT.body, fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            color: C.navy, lineHeight: 1.7, whiteSpace: "pre-line", margin: 0,
            fontWeight: 500,
          }}>{data.highlight}</p>
        </div>
      )}
    </div>
  );
}

function Grid4Slide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: "0 0 40px", fontWeight: 700,
      }}>{data.title}</h2>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 20, flex: 1,
      }}>
        {data.items.map((item, i) => (
          <div key={i} style={{
            background: item.active ? C.navy : C.white,
            borderRadius: 16, padding: "28px 32px",
            border: item.active ? "none" : `1px solid ${C.navy}15`,
            display: "flex", flexDirection: "column",
            transition: "all 0.3s ease",
          }}>
            <span style={{
              fontFamily: FONT.mono, fontSize: "0.8rem",
              color: item.active ? C.orange : C.gray,
              fontWeight: 600, marginBottom: 8,
            }}>{item.num}</span>
            <h3 style={{
              fontFamily: FONT.display, fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: item.active ? C.white : C.navy,
              margin: "0 0 8px", fontWeight: 700, whiteSpace: "pre-line", lineHeight: 1.3,
            }}>{item.label}</h3>
            <p style={{
              fontFamily: FONT.body, fontSize: "0.9rem",
              color: item.active ? `${C.white}cc` : C.grayDark,
              margin: 0, lineHeight: 1.5,
            }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SplitSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: "0 0 40px", fontWeight: 700,
      }}>{data.title}</h2>
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        {[data.left, data.right].map((side, i) => (
          <div key={i} style={{
            flex: 1, background: C.white, borderRadius: 16,
            padding: "36px 32px", border: `1px solid ${C.navy}10`,
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{side.icon}</div>
            <h3 style={{
              fontFamily: FONT.display, fontSize: "1.5rem",
              color: C.navy, margin: "0 0 16px", fontWeight: 700,
            }}>{side.heading}</h3>
            <p style={{
              fontFamily: FONT.body, fontSize: "1.05rem",
              color: C.text, whiteSpace: "pre-line", lineHeight: 1.7, flex: 1,
            }}>{side.text}</p>
            <span style={{
              fontFamily: FONT.mono, fontSize: "0.8rem",
              color: C.orange, fontWeight: 600, marginTop: 12,
            }}>{side.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BulletsSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: 0, fontWeight: 700,
      }}>{data.title}</h2>
      {data.subtitle && <p style={{
        fontFamily: FONT.body, fontSize: "1rem", color: C.grayDark,
        margin: "8px 0 32px",
      }}>{data.subtitle}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: data.subtitle ? 0 : 32 }}>
        {data.items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 16,
            background: C.white, borderRadius: 12, padding: "20px 24px",
            border: `1px solid ${C.navy}08`,
          }}>
            <div style={{
              minWidth: 32, height: 32, borderRadius: "50%",
              background: `${C.orange}15`, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontFamily: FONT.mono, fontSize: "0.8rem",
              color: C.orange, fontWeight: 700,
            }}>{i + 1}</div>
            <p style={{
              fontFamily: FONT.body, fontSize: "1.1rem",
              color: C.text, margin: 0, lineHeight: 1.5,
            }}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransitionSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      background: `linear-gradient(135deg, ${C.navy} 0%, #2a1a44 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 30% 50%, ${C.orange}20 0%, transparent 60%)`,
      }} />
      <span style={{
        fontFamily: FONT.mono, fontSize: "0.85rem", letterSpacing: "0.2em",
        color: C.orange, marginBottom: 16, fontWeight: 600,
      }}>{data.label}</span>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
        color: C.white, margin: "0 0 20px", fontWeight: 700,
        lineHeight: 1.1,
      }}>{data.title}</h2>
      <p style={{
        fontFamily: FONT.body, fontSize: "clamp(1rem, 2vw, 1.3rem)",
        color: `${C.white}bb`, maxWidth: 600,
      }}>{data.subtitle}</p>
    </div>
  );
}

function CompareSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: "0 0 36px", fontWeight: 700,
      }}>{data.title}</h2>
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        {[data.left, data.right].map((side, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 16, overflow: "hidden",
            border: `2px solid ${i === 0 ? "#ef444440" : "#22c55e40"}`,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              padding: "14px 20px",
              background: i === 0 ? "#fef2f2" : "#f0fdf4",
              fontFamily: FONT.body, fontWeight: 600,
              fontSize: "1rem", color: i === 0 ? "#dc2626" : "#16a34a",
            }}>{side.label}</div>
            <div style={{
              flex: 1, padding: "24px 24px 20px",
              background: C.white, display: "flex", flexDirection: "column",
            }}>
              <div style={{
                fontFamily: FONT.mono, fontSize: "0.9rem",
                background: `${C.navy}08`, borderRadius: 8, padding: "16px",
                color: C.navy, whiteSpace: "pre-line", lineHeight: 1.6,
                marginBottom: 16,
              }}>{side.text}</div>
              <p style={{
                fontFamily: FONT.body, fontSize: "1rem",
                color: C.grayDark, lineHeight: 1.6, margin: 0, marginTop: "auto",
                fontStyle: "italic",
              }}>{side.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrameworkSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: 0, fontWeight: 700,
      }}>{data.title}</h2>
      <p style={{
        fontFamily: FONT.body, fontSize: "1rem", color: C.grayDark,
        margin: "6px 0 28px",
      }}>{data.subtitle}</p>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 16, flex: 1,
      }}>
        {data.dimensions.map((d, i) => (
          <div key={i} style={{
            background: C.white, borderRadius: 16,
            padding: "24px 28px", border: `1px solid ${C.navy}10`,
            display: "flex", gap: 16, alignItems: "flex-start",
          }}>
            <div style={{
              minWidth: 56, height: 56, borderRadius: 12,
              background: `${C.orange}15`, display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "1.5rem" }}>{d.icon}</span>
            </div>
            <div>
              <h3 style={{
                fontFamily: FONT.display, fontSize: "1.3rem",
                color: C.navy, margin: "0 0 4px", fontWeight: 700,
              }}>
                <span style={{ color: C.orange }}>{d.letter}</span>
                {d.word.slice(1)}
              </h3>
              <p style={{
                fontFamily: FONT.body, fontSize: "0.95rem",
                color: C.grayDark, margin: 0, lineHeight: 1.5,
              }}>{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "60px 80px", background: C.navy,
      position: "relative",
    }}>
      <div style={{
        fontFamily: FONT.display, fontSize: "8rem",
        color: `${C.orange}30`, position: "absolute",
        top: 40, left: 60, lineHeight: 1,
      }}>"</div>
      <p style={{
        fontFamily: FONT.display, fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
        color: C.white, lineHeight: 1.6, whiteSpace: "pre-line",
        maxWidth: 750, fontWeight: 400, fontStyle: "italic",
      }}>{data.quote}</p>
      <div style={{
        width: 60, height: 3, background: C.orange,
        margin: "28px 0 16px", borderRadius: 2,
      }} />
      <p style={{
        fontFamily: FONT.body, fontSize: "0.95rem",
        color: C.orange, fontWeight: 500,
      }}>{data.attribution}</p>
    </div>
  );
}

function StepsSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: "0 0 36px", fontWeight: 700,
      }}>{data.title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "center" }}>
        {data.steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 20,
          }}>
            <div style={{
              minWidth: 44, height: 44, borderRadius: "50%",
              background: C.navy, display: "flex",
              alignItems: "center", justifyContent: "center",
              fontFamily: FONT.mono, fontSize: "0.9rem",
              color: C.orange, fontWeight: 700,
            }}>{s.num}</div>
            {i < data.steps.length - 1 && (
              <div style={{
                position: "absolute", left: 81, marginTop: 52,
                width: 2, height: 12, background: `${C.navy}20`,
              }} />
            )}
            <p style={{
              fontFamily: FONT.body, fontSize: "1.15rem",
              color: C.text, margin: 0, fontWeight: 500,
            }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TipsSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: "0 0 32px", fontWeight: 700,
      }}>{data.title}</h2>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 16, flex: 1,
      }}>
        {data.tips.map((t, i) => (
          <div key={i} style={{
            background: C.white, borderRadius: 16,
            padding: "24px", border: `1px solid ${C.navy}10`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: "1.8rem" }}>{t.icon}</span>
              <h3 style={{
                fontFamily: FONT.display, fontSize: "1.2rem",
                color: C.navy, margin: 0, fontWeight: 700,
              }}>{t.label}</h3>
            </div>
            <p style={{
              fontFamily: FONT.body, fontSize: "0.95rem",
              color: C.grayDark, margin: 0, lineHeight: 1.6,
            }}>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <h2 style={{
        fontFamily: FONT.display, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
        color: C.navy, margin: "0 0 28px", fontWeight: 700,
      }}>{data.title}</h2>
      <div style={{ display: "flex", gap: 16, flex: 1 }}>
        {data.tools.map((t, i) => (
          <div key={i} style={{
            flex: 1, background: C.white, borderRadius: 16,
            padding: "28px 24px", border: `1px solid ${C.navy}10`,
            borderTop: `4px solid ${t.color}`,
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: FONT.display, fontSize: "1.4rem",
              color: C.navy, margin: "0 0 10px", fontWeight: 700,
            }}>{t.name}</h3>
            <p style={{
              fontFamily: FONT.body, fontSize: "0.95rem",
              color: C.grayDark, margin: 0, lineHeight: 1.5,
            }}>{t.desc}</p>
          </div>
        ))}
      </div>
      {data.note && (
        <p style={{
          fontFamily: FONT.body, fontSize: "0.9rem",
          color: C.grayDark, textAlign: "center", marginTop: 20,
          whiteSpace: "pre-line", lineHeight: 1.6,
        }}>{data.note}</p>
      )}
    </div>
  );
}

function PromptSlide({ data }) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      padding: "50px 60px", background: C.cream,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: data.color,
        }} />
        <h2 style={{
          fontFamily: FONT.display, fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          color: C.navy, margin: 0, fontWeight: 700,
        }}>Prompt per {data.model}</h2>
      </div>
      <div style={{
        flex: 1, background: C.navy, borderRadius: 16,
        padding: "32px 36px", overflow: "auto",
      }}>
        <p style={{
          fontFamily: FONT.mono, fontSize: "0.75rem",
          color: C.gray, margin: "0 0 16px",
          textTransform: "uppercase", letterSpacing: "0.15em",
        }}>Punti chiave del prompt</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.preview.map((line, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <span style={{
                fontFamily: FONT.mono, fontSize: "0.8rem",
                color: `${data.color}cc`, minWidth: 20, textAlign: "right",
              }}>{i + 1}</span>
              <p style={{
                fontFamily: FONT.body, fontSize: "1rem",
                color: `${C.white}dd`, margin: 0, lineHeight: 1.5,
              }}>{line}</p>
            </div>
          ))}
        </div>
      </div>
      <p style={{
        fontFamily: FONT.body, fontSize: "0.85rem",
        color: C.grayDark, textAlign: "center", marginTop: 16,
      }}>Il prompt completo è nel materiale condiviso</p>
    </div>
  );
}

// ─── Layout Router ───
function SlideContent({ slide }) {
  const L = {
    title: TitleSlide,
    centered: CenteredSlide,
    grid4: Grid4Slide,
    split: SplitSlide,
    bullets: BulletsSlide,
    transition: TransitionSlide,
    compare: CompareSlide,
    framework: FrameworkSlide,
    quote: QuoteSlide,
    steps: StepsSlide,
    tips: TipsSlide,
    tools: ToolsSlide,
    prompt: PromptSlide,
  };
  const Comp = L[slide.layout];
  return Comp ? <Comp data={slide.data} /> : null;
}

// ─── MAIN COMPONENT ───
export default function CorsoAvanzatoS1({ onBack }) {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const go = useCallback((dir) => {
    setCurrent(prev => Math.max(0, Math.min(total - 1, prev + dir)));
  }, [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
      if (e.key === "Home") { e.preventDefault(); setCurrent(0); }
      if (e.key === "End") { e.preventDefault(); setCurrent(total - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, total]);

  const slide = SLIDES[current];
  const progress = ((current + 1) / total) * 100;

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      background: C.navy, display: "flex", flexDirection: "column",
      fontFamily: FONT.body,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Progress bar */}
      <div style={{ height: 3, background: `${C.white}15`, flexShrink: 0 }}>
        <div style={{
          height: "100%", background: C.orange,
          width: `${progress}%`, transition: "width 0.3s ease",
        }} />
      </div>

      {/* Slide area */}
      <div style={{
        flex: 1, position: "relative", overflow: "hidden",
        margin: "0 auto", width: "100%", maxWidth: "100%",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          transition: "opacity 0.25s ease",
        }}>
          <SlideContent slide={slide} />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        height: 48, background: `${C.navy}f0`, borderTop: `1px solid ${C.white}10`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {onBack && (
            <button onClick={onBack} style={{
              background: "transparent", border: `1px solid ${C.white}25`,
              color: `${C.white}70`, padding: "4px 12px", borderRadius: 6,
              cursor: "pointer", fontFamily: FONT.body, fontSize: "0.8rem",
            }}>
              ← Menu
            </button>
          )}
          <span style={{
            fontFamily: FONT.mono, fontSize: "0.75rem",
            color: `${C.white}60`,
          }}>
            {slide.part === 1 ? "INTRO" : "AI FLUENCY — 4D"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => go(-1)} style={{
            background: "none", border: `1px solid ${C.white}20`,
            color: C.white, padding: "4px 12px", borderRadius: 6,
            cursor: "pointer", fontFamily: FONT.body, fontSize: "0.85rem",
          }}>←</button>
          <span style={{
            fontFamily: FONT.mono, fontSize: "0.8rem",
            color: `${C.white}80`, minWidth: 60, textAlign: "center",
          }}>{current + 1} / {total}</span>
          <button onClick={() => go(1)} style={{
            background: "none", border: `1px solid ${C.white}20`,
            color: C.white, padding: "4px 12px", borderRadius: 6,
            cursor: "pointer", fontFamily: FONT.body, fontSize: "0.85rem",
          }}>→</button>
        </div>
        <span style={{
          fontFamily: FONT.mono, fontSize: "0.75rem",
          color: `${C.white}40`,
        }}>
          ← → SPACE
        </span>
      </div>
    </div>
  );
}
