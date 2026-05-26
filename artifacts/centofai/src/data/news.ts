export interface NewsItem {
  title: string;
  description: string;
  source: string;
  date: string;
  url: string;
  category: string;
}

export const newsItems: NewsItem[] = [
  {
    title: "OpenAI kündigt GPT-5 mit multimodalem Reasoning an",
    description: "Das nächste große Modell von OpenAI soll erhebliche Fortschritte im logischen Denken und der wissenschaftlichen Problemlösung bieten.",
    source: "OpenAI Blog",
    date: "2026-05-20",
    url: "https://openai.com/blog",
    category: "OpenAI",
  },
  {
    title: "Google DeepMind erreicht neuen Meilenstein bei Protein-Faltung",
    description: "AlphaFold 3 erweitert die Vorhersage auf DNA, RNA und kleine Moleküle – ein Durchbruch für die Medizinforschung.",
    source: "Google DeepMind",
    date: "2026-05-18",
    url: "https://deepmind.google/discover/blog/",
    category: "Google",
  },
  {
    title: "Anthropic veröffentlicht Claude 4 mit erweitertem Kontext",
    description: "Claude 4 verarbeitet bis zu 1 Million Token Kontext und bietet verbesserte Analyse-Fähigkeiten für Unternehmen.",
    source: "Anthropic",
    date: "2026-05-15",
    url: "https://www.anthropic.com/news",
    category: "Forschung",
  },
  {
    title: "NVIDIA stellt neue KI-Chip-Architektur Blackwell Ultra vor",
    description: "Die nächste Generation von KI-Beschleunigern verspricht doppelte Energieeffizienz bei gleichzeitig höherer Rechenleistung.",
    source: "NVIDIA Blog",
    date: "2026-05-12",
    url: "https://blogs.nvidia.com/",
    category: "Tools",
  },
  {
    title: "EU-KI-Gesetz: Neue Regulierungen für KI-Systeme treten in Kraft",
    description: "Das europäische KI-Gesetz definiert Risikoklassen und Anforderungen für KI-Anwendungen in der EU.",
    source: "MIT Technology Review",
    date: "2026-05-10",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/",
    category: "Business",
  },
  {
    title: "Midjourney v8 ermöglicht 4K-Video-Generierung in Echtzeit",
    description: "Die neue Version von Midjourney unterstützt nahtlosen Übergang von Bild zu Video mit konsistentem Stil.",
    source: "The Verge",
    date: "2026-05-08",
    url: "https://www.theverge.com/ai-artificial-intelligence/",
    category: "Startups",
  },
  {
    title: "Microsoft integriert Copilot tief in Windows 12",
    description: "Die nächste Windows-Version bietet systemweite KI-Assistance mit lokalem und Cloud-Processing.",
    source: "Microsoft AI Blog",
    date: "2026-05-05",
    url: "https://blogs.microsoft.com/ai/",
    category: "OpenAI",
  },
  {
    title: "Hugging Face startet Open-Source-KI-Agent-Plattform",
    description: "Die neue Plattform ermöglicht es Entwicklern, KI-Agenten zu erstellen, teilen und monetarisieren.",
    source: "Hugging Face Blog",
    date: "2026-05-03",
    url: "https://huggingface.co/blog",
    category: "Startups",
  },
  {
    title: "Perplexity führt Echtzeit-Forschungs-Agent ein",
    description: "Der neue Agent kann autonom recherchieren, Quellen prüfen und ausführliche Berichte erstellen.",
    source: "TechCrunch AI",
    date: "2026-04-28",
    url: "https://techcrunch.com/category/artificial-intelligence/",
    category: "Tools",
  },
  {
    title: "AI Startup erreicht 10 Milliarden Dollar Bewertung",
    description: "Ein europäisches KI-Startup hat eine der größten Finanzierungsrunden in der Geschichte der europäischen Tech-Szene abgeschlossen.",
    source: "VentureBeat",
    date: "2026-04-25",
    url: "https://venturebeat.com/ai/",
    category: "Business",
  },
  {
    title: "OpenAI kündigt kostenlosen Bildungszugang für Universitäten an",
    description: "Studierende und Forscher erhalten kostenlosen Zugang zu GPT-5 für wissenschaftliche Zwecke.",
    source: "OpenAI Blog",
    date: "2026-04-22",
    url: "https://openai.com/blog",
    category: "OpenAI",
  },
  {
    title: "Google Gemini 2.5 Pro übertrifft menschliche Benchmarks",
    description: "Das neue Modell erreicht Spitzenwerte in Mathematik, Code und wissenschaftlichem Reasoning.",
    source: "Google DeepMind",
    date: "2026-04-20",
    url: "https://deepmind.google/discover/blog/",
    category: "Google",
  },
];

export const newsCategories = ["Alle", "OpenAI", "Google", "Startups", "Tools", "Forschung", "Business"];
