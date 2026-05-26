export interface Tool {
  name: string;
  category: string;
  description: string;
  pricing: "Kostenlos" | "Freemium" | "Kostenpflichtig";
  audience: string;
  url: string;
}

export const toolCategories = [
  "Text & Schreiben",
  "Bildgenerierung & Design",
  "Video erstellen & bearbeiten",
  "Website erstellen",
  "App erstellen & No-Code",
  "Programmierung & Developer",
  "Datenanalyse & BI",
  "Finanzen & Investment",
  "Marketing & Social Media",
  "Präsentationen & Dokumente",
  "Audio, Stimme & Musik",
  "Automatisierung & Produktivität",
  "Recherche & Wissen",
  "Kundenservice & Chatbots",
  "HR & Recruiting",
  "Recht & Verträge",
  "Bildung & Lernen",
] as const;

export const tools: Tool[] = [
  // Text & Schreiben
  { name: "ChatGPT", category: "Text & Schreiben", description: "KI-Chatbot für Textgenerierung, Brainstorming und Coding-Hilfe", pricing: "Freemium", audience: "Alle", url: "https://chatgpt.com" },
  { name: "Claude", category: "Text & Schreiben", description: "Fortgeschrittener KI-Assistent mit langer Kontextverarbeitung", pricing: "Freemium", audience: "Professionelle", url: "https://claude.ai" },
  { name: "Gemini", category: "Text & Schreiben", description: "Googles multimodale KI für Text, Bild und Code", pricing: "Freemium", audience: "Alle", url: "https://gemini.google.com" },
  { name: "Perplexity", category: "Text & Schreiben", description: "KI-gestützte Suchmaschine mit Quellenangaben", pricing: "Freemium", audience: "Forscher", url: "https://perplexity.ai" },
  { name: "Jasper", category: "Text & Schreiben", description: "KI-Plattform für Marketing- und Werbetexte", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://jasper.ai" },
  { name: "Copy.ai", category: "Text & Schreiben", description: "Automatisierte Textgenerierung für Unternehmen", pricing: "Freemium", audience: "Unternehmen", url: "https://copy.ai" },
  { name: "Writesonic", category: "Text & Schreiben", description: "KI-Tool für SEO-optimierte Inhalte", pricing: "Freemium", audience: "Content-Creator", url: "https://writesonic.com" },
  { name: "Notion AI", category: "Text & Schreiben", description: "KI-Features direkt in Notion für Notizen und Dokumente", pricing: "Kostenpflichtig", audience: "Teams", url: "https://notion.so" },
  { name: "Grammarly", category: "Text & Schreiben", description: "Grammatik- und Stilprüfung mit KI-Unterstützung", pricing: "Freemium", audience: "Alle", url: "https://grammarly.com" },
  { name: "QuillBot", category: "Text & Schreiben", description: "Paraphrasier- und Zusammenfassungs-Tool", pricing: "Freemium", audience: "Studierende", url: "https://quillbot.com" },

  // Bildgenerierung & Design
  { name: "Midjourney", category: "Bildgenerierung & Design", description: "Kreative KI-Bildgenerierung mit herausragender Qualität", pricing: "Kostenpflichtig", audience: "Designer", url: "https://midjourney.com" },
  { name: "DALL·E 3", category: "Bildgenerierung & Design", description: "OpenAIs Bildgenerierung direkt in ChatGPT", pricing: "Freemium", audience: "Alle", url: "https://openai.com/dall-e" },
  { name: "Stable Diffusion", category: "Bildgenerierung & Design", description: "Open-Source Bildgenerierung für lokale Nutzung", pricing: "Kostenlos", audience: "Entwickler", url: "https://stability.ai" },
  { name: "Leonardo AI", category: "Bildgenerierung & Design", description: "KI-Bildgenerierung mit Fokus auf Gaming und 3D", pricing: "Freemium", audience: "Kreative", url: "https://leonardo.ai" },
  { name: "Adobe Firefly", category: "Bildgenerierung & Design", description: "Adobe-integrative KI für kommerzielle Bilder", pricing: "Freemium", audience: "Designer", url: "https://adobe.com/firefly" },
  { name: "Canva AI", category: "Bildgenerierung & Design", description: "KI-Design-Tools direkt im Canva-Editor", pricing: "Freemium", audience: "Alle", url: "https://canva.com" },
  { name: "Ideogram", category: "Bildgenerierung & Design", description: "Bildgenerierung mit exzellenter Text-Integration", pricing: "Freemium", audience: "Alle", url: "https://ideogram.ai" },
  { name: "Krea AI", category: "Bildgenerierung & Design", description: "Echtzeit-Bildgenerierung und -bearbeitung", pricing: "Freemium", audience: "Kreative", url: "https://krea.ai" },

  // Video erstellen & bearbeiten
  { name: "Runway", category: "Video erstellen & bearbeiten", description: "Professionelle KI-Videobearbeitung und -generierung", pricing: "Kostenpflichtig", audience: "Filmemacher", url: "https://runwayml.com" },
  { name: "Pika", category: "Video erstellen & bearbeiten", description: "KI-Text-zu-Video mit stilvollem Output", pricing: "Freemium", audience: "Creator", url: "https://pika.art" },
  { name: "Synthesia", category: "Video erstellen & bearbeiten", description: "KI-Avatar-Videos für Unternehmen", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://synthesia.io" },
  { name: "HeyGen", category: "Video erstellen & bearbeiten", description: "KI-gestützte Videoübersetzung und Avatare", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://heygen.com" },
  { name: "Descript", category: "Video erstellen & bearbeiten", description: "Audio- und Videobearbeitung per Text", pricing: "Freemium", audience: "Podcaster", url: "https://descript.com" },
  { name: "InVideo AI", category: "Video erstellen & bearbeiten", description: "Automatische Videoerstellung aus Skripten", pricing: "Freemium", audience: "Social Media", url: "https://invideo.io" },

  // Website erstellen
  { name: "Framer AI", category: "Website erstellen", description: "KI-gestütztes Website-Design und Publishing", pricing: "Freemium", audience: "Designer", url: "https://framer.com" },
  { name: "Wix AI", category: "Website erstellen", description: "KI-Website-Erstellung mit Drag-and-Drop", pricing: "Freemium", audience: "Anfänger", url: "https://wix.com" },
  { name: "Durable", category: "Website erstellen", description: "KI erstellt Websites in 30 Sekunden", pricing: "Kostenpflichtig", audience: "Selbstständige", url: "https://durable.co" },
  { name: "Relume", category: "Website erstellen", description: "KI-gestützte Webflow- und Figma-Komponenten", pricing: "Freemium", audience: "Designer", url: "https://relume.io" },
  { name: "Webflow AI", category: "Website erstellen", description: "KI-Assistent für Webflow-Websites", pricing: "Freemium", audience: "Webdesigner", url: "https://webflow.com" },
  { name: "Lovable", category: "Website erstellen", description: "KI-Text-zu-Website mit Full-Stack-Funktionen", pricing: "Freemium", audience: "Entwickler", url: "https://lovable.dev" },

  // App erstellen & No-Code
  { name: "Bolt.new", category: "App erstellen & No-Code", description: "KI-gestützte Full-Stack-App-Entwicklung", pricing: "Freemium", audience: "Entwickler", url: "https://bolt.new" },
  { name: "Cursor", category: "App erstellen & No-Code", description: "KI-Code-Editor für schnellere Entwicklung", pricing: "Freemium", audience: "Entwickler", url: "https://cursor.com" },
  { name: "Replit AI", category: "App erstellen & No-Code", description: "Online-IDE mit integrierter KI-Assistance", pricing: "Freemium", audience: "Entwickler", url: "https://replit.com" },
  { name: "Bubble", category: "App erstellen & No-Code", description: "No-Code App-Builder mit KI-Unterstützung", pricing: "Freemium", audience: "Anfänger", url: "https://bubble.io" },
  { name: "FlutterFlow AI", category: "App erstellen & No-Code", description: "KI-gestützter Flutter-App-Builder", pricing: "Freemium", audience: "Entwickler", url: "https://flutterflow.io" },
  { name: "Glide", category: "App erstellen & No-Code", description: "Apps aus Google Sheets mit KI", pricing: "Freemium", audience: "Anfänger", url: "https://glideapps.com" },
  { name: "Retool AI", category: "App erstellen & No-Code", description: "KI-gestütztes internes Tool-Building", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://retool.com" },

  // Programmierung & Developer
  { name: "GitHub Copilot", category: "Programmierung & Developer", description: "KI-Code-Vervollständigung direkt im Editor", pricing: "Kostenpflichtig", audience: "Entwickler", url: "https://github.com/copilot" },
  { name: "Codeium", category: "Programmierung & Developer", description: "Kostenlose KI-Code-Completion", pricing: "Kostenlos", audience: "Entwickler", url: "https://codeium.com" },
  { name: "Tabnine", category: "Programmierung & Developer", description: "KI-gestützte Code-Vervollständigung", pricing: "Freemium", audience: "Entwickler", url: "https://tabnine.com" },
  { name: "v0 by Vercel", category: "Programmierung & Developer", description: "KI-Generierung von UI-Komponenten", pricing: "Freemium", audience: "Entwickler", url: "https://v0.dev" },
  { name: "Sourcegraph Cody", category: "Programmierung & Developer", description: "KI-Code-Suche und -Verständnis", pricing: "Freemium", audience: "Entwickler", url: "https://sourcegraph.com/cody" },

  // Datenanalyse & BI
  { name: "Julius AI", category: "Datenanalyse & BI", description: "KI-gestützte Datenanalyse und Visualisierung", pricing: "Freemium", audience: "Analysten", url: "https://julius.ai" },
  { name: "Rows AI", category: "Datenanalyse & BI", description: "Smarte Tabellenkalkulation mit KI", pricing: "Freemium", audience: "Business", url: "https://rows.com" },
  { name: "Akkio", category: "Datenanalyse & BI", description: "No-Code Machine Learning Plattform", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://akkio.com" },
  { name: "DataRobot", category: "Datenanalyse & BI", description: "Enterprise AI Platform für Datenanalyse", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://datarobot.com" },
  { name: "Obviously AI", category: "Datenanalyse & BI", description: "No-Code Predictive Analytics", pricing: "Kostenpflichtig", audience: "Business", url: "https://obviously.ai" },

  // Finanzen & Investment
  { name: "AlphaSense", category: "Finanzen & Investment", description: "KI-gestützte Markt- und Unternehmensrecherche", pricing: "Kostenpflichtig", audience: "Investoren", url: "https://alphasense.com" },
  { name: "Kavout", category: "Finanzen & Investment", description: "KI-Investment-Analyse und Scoring", pricing: "Kostenpflichtig", audience: "Investoren", url: "https://kavout.com" },
  { name: "Numerai", category: "Finanzen & Investment", description: "KI-gestützter Hedge-Fonds", pricing: "Kostenlos", audience: "Data Scientists", url: "https://numer.ai" },
  { name: "FinChat", category: "Finanzen & Investment", description: "KI-Chat für Finanzdaten und Aktien", pricing: "Freemium", audience: "Investoren", url: "https://finchat.io" },
  { name: "Upstart", category: "Finanzen & Investment", description: "KI-gestützte Kreditvergabe", pricing: "Kostenlos", audience: "Verbraucher", url: "https://upstart.com" },

  // Marketing & Social Media
  { name: "HubSpot AI", category: "Marketing & Social Media", description: "KI-gestütztes Marketing-Automation", pricing: "Freemium", audience: "Unternehmen", url: "https://hubspot.com" },
  { name: "Semrush AI", category: "Marketing & Social Media", description: "KI-gestütztes SEO- und Marketing-Tool", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://semrush.com" },
  { name: "Surfer SEO", category: "Marketing & Social Media", description: "KI-gestützte Content-Optimierung", pricing: "Kostenpflichtig", audience: "SEO-Experten", url: "https://surferseo.com" },
  { name: "AdCreative.ai", category: "Marketing & Social Media", description: "KI-generierte Werbeanzeigen", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://adcreative.ai" },
  { name: "Ocoya", category: "Marketing & Social Media", description: "KI-Social-Media-Management", pricing: "Kostenpflichtig", audience: "Social Media", url: "https://ocoya.com" },
  { name: "Predis.ai", category: "Marketing & Social Media", description: "KI-Social-Media-Content-Erstellung", pricing: "Freemium", audience: "Creator", url: "https://predis.ai" },

  // Präsentationen & Dokumente
  { name: "Gamma", category: "Präsentationen & Dokumente", description: "KI-gestützte Präsentationserstellung", pricing: "Freemium", audience: "Berufstätige", url: "https://gamma.app" },
  { name: "Tome", category: "Präsentationen & Dokumente", description: "Storytelling-Plattform mit KI", pricing: "Freemium", audience: "Berufstätige", url: "https://tome.app" },
  { name: "Beautiful.ai", category: "Präsentationen & Dokumente", description: "Smarte Präsentationsvorlagen mit KI", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://beautiful.ai" },
  { name: "Pitch", category: "Präsentationen & Dokumente", description: "Kollaborative Präsentationen mit KI", pricing: "Freemium", audience: "Teams", url: "https://pitch.com" },
  { name: "SlidesAI", category: "Präsentationen & Dokumente", description: "KI-Slides aus Text für Google Slides", pricing: "Freemium", audience: "Berufstätige", url: "https://slidesai.io" },

  // Audio, Stimme & Musik
  { name: "ElevenLabs", category: "Audio, Stimme & Musik", description: "Realistische KI-Stimmensynthese", pricing: "Freemium", audience: "Creator", url: "https://elevenlabs.io" },
  { name: "Murf AI", category: "Audio, Stimme & Musik", description: "KI-Stimmen für Voiceovers", pricing: "Freemium", audience: "Creator", url: "https://murf.ai" },
  { name: "Suno", category: "Audio, Stimme & Musik", description: "KI-Musikgenerierung aus Text", pricing: "Freemium", audience: "Musiker", url: "https://suno.com" },
  { name: "Udio", category: "Audio, Stimme & Musik", description: "KI-Musik und -Songgenerierung", pricing: "Freemium", audience: "Musiker", url: "https://udio.com" },
  { name: "AIVA", category: "Audio, Stimme & Musik", description: "KI-Komposition für Soundtracks", pricing: "Freemium", audience: "Komponisten", url: "https://aiva.ai" },
  { name: "Soundraw", category: "Audio, Stimme & Musik", description: "KI-generierte lizenzfreie Musik", pricing: "Kostenpflichtig", audience: "Creator", url: "https://soundraw.io" },

  // Automatisierung & Produktivität
  { name: "Zapier AI", category: "Automatisierung & Produktivität", description: "Workflow-Automatisierung mit KI", pricing: "Freemium", audience: "Berufstätige", url: "https://zapier.com" },
  { name: "Make", category: "Automatisierung & Produktivität", description: "Visuelle Workflow-Automatisierung", pricing: "Freemium", audience: "Berufstätige", url: "https://make.com" },
  { name: "n8n", category: "Automatisierung & Produktivität", description: "Open-Source Workflow-Automatisierung", pricing: "Kostenlos", audience: "Entwickler", url: "https://n8n.io" },
  { name: "Bardeen", category: "Automatisierung & Produktivität", description: "KI-Automatisierung im Browser", pricing: "Freemium", audience: "Berufstätige", url: "https://bardeen.ai" },
  { name: "Notion AI", category: "Automatisierung & Produktivität", description: "KI-Assistent für Notizen und Workflows", pricing: "Kostenpflichtig", audience: "Teams", url: "https://notion.so" },
  { name: "ClickUp AI", category: "Automatisierung & Produktivität", description: "KI-gestütztes Projektmanagement", pricing: "Kostenpflichtig", audience: "Teams", url: "https://clickup.com" },

  // Recherche & Wissen
  { name: "Elicit", category: "Recherche & Wissen", description: "KI-gestützte wissenschaftliche Recherche", pricing: "Freemium", audience: "Forscher", url: "https://elicit.org" },
  { name: "Consensus", category: "Recherche & Wissen", description: "KI-Suchmaschine für wissenschaftliche Papers", pricing: "Freemium", audience: "Studierende", url: "https://consensus.app" },
  { name: "You.com", category: "Recherche & Wissen", description: "KI-Suchmaschine mit privaten Antworten", pricing: "Freemium", audience: "Alle", url: "https://you.com" },
  { name: "Research Rabbit", category: "Recherche & Wissen", description: "KI-gestütztes Literatur-Mapping", pricing: "Kostenlos", audience: "Forscher", url: "https://researchrabbit.ai" },
  { name: "NotebookLM", category: "Recherche & Wissen", description: "Googles KI-Notizbuch für Dokumente", pricing: "Kostenlos", audience: "Studierende", url: "https://notebooklm.google.com" },
  { name: "ChatPDF", category: "Recherche & Wissen", description: "KI-Chat mit PDF-Dokumenten", pricing: "Freemium", audience: "Studierende", url: "https://chatpdf.com" },

  // Kundenservice & Chatbots
  { name: "Intercom AI", category: "Kundenservice & Chatbots", description: "KI-gestützter Kundenservice", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://intercom.com" },
  { name: "Zendesk AI", category: "Kundenservice & Chatbots", description: "KI für Kundensupport-Automatisierung", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://zendesk.com" },
  { name: "Ada", category: "Kundenservice & Chatbots", description: "KI-Chatbot-Plattform für Enterprise", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://ada.cx" },
  { name: "Botpress", category: "Kundenservice & Chatbots", description: "Open-Source Chatbot-Builder", pricing: "Freemium", audience: "Entwickler", url: "https://botpress.com" },
  { name: "Manychat", category: "Kundenservice & Chatbots", description: "KI-Chatbots für Social Media", pricing: "Freemium", audience: "Marketer", url: "https://manychat.com" },

  // HR & Recruiting
  { name: "HireVue", category: "HR & Recruiting", description: "KI-gestützte Video-Interviews", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://hirevue.com" },
  { name: "Eightfold AI", category: "HR & Recruiting", description: "KI-Talent-Intelligence-Plattform", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://eightfold.ai" },
  { name: "Textio", category: "HR & Recruiting", description: "KI-gestütztes Job-Beschreibungen-Schreiben", pricing: "Kostenpflichtig", audience: "HR", url: "https://textio.com" },
  { name: "SeekOut", category: "HR & Recruiting", description: "KI-gestützte Talent-Suche", pricing: "Kostenpflichtig", audience: "Recruiter", url: "https://seekout.com" },

  // Recht & Verträge
  { name: "Harvey AI", category: "Recht & Verträge", description: "KI-Assistent für Anwälte", pricing: "Kostenpflichtig", audience: "Anwälte", url: "https://harvey.ai" },
  { name: "Ironclad AI", category: "Recht & Verträge", description: "KI-gestütztes Vertragsmanagement", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://ironcladapp.com" },
  { name: "Evisort", category: "Recht & Verträge", description: "KI-Analyse von Verträgen", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://evisort.com" },

  // Bildung & Lernen
  { name: "Khanmigo", category: "Bildung & Lernen", description: "KI-Tutor von Khan Academy", pricing: "Kostenlos", audience: "Studierende", url: "https://khanacademy.org" },
  { name: "Duolingo Max", category: "Bildung & Lernen", description: "KI-gestütztes Sprachenlernen", pricing: "Kostenpflichtig", audience: "Sprachlerner", url: "https://duolingo.com" },
  { name: "Coursera Coach", category: "Bildung & Lernen", description: "KI-Lernassistent auf Coursera", pricing: "Freemium", audience: "Studierende", url: "https://coursera.org" },
  { name: "Brilliant AI", category: "Bildung & Lernen", description: "KI-gestütztes interaktives Lernen", pricing: "Kostenpflichtig", audience: "Studierende", url: "https://brilliant.org" },
  { name: "Wolfram Alpha", category: "Bildung & Lernen", description: "KI-Wissens-Engine für Mathe und Wissenschaft", pricing: "Freemium", audience: "Studierende", url: "https://wolframalpha.com" },
];
