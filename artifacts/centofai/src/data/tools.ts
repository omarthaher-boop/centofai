export interface Tool {
  name: string;
  category: string;
  description: string;
  pricing: "Kostenlos" | "Freemium" | "Kostenpflichtig";
  audience: string;
  url: string;
  color: string;
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
  { name: "ChatGPT", category: "Text & Schreiben", description: "KI-Chatbot für Textgenerierung, Brainstorming und Coding-Hilfe", pricing: "Freemium", audience: "Alle", url: "https://chatgpt.com", color: "#10A37F" },
  { name: "Claude", category: "Text & Schreiben", description: "Fortgeschrittener KI-Assistent mit langer Kontextverarbeitung", pricing: "Freemium", audience: "Professionelle", url: "https://claude.ai", color: "#D97757" },
  { name: "Gemini", category: "Text & Schreiben", description: "Googles multimodale KI für Text, Bild und Code", pricing: "Freemium", audience: "Alle", url: "https://gemini.google.com", color: "#4285F4" },
  { name: "Perplexity", category: "Text & Schreiben", description: "KI-gestützte Suchmaschine mit Quellenangaben", pricing: "Freemium", audience: "Forscher", url: "https://perplexity.ai", color: "#22D3EE" },
  { name: "Jasper", category: "Text & Schreiben", description: "KI-Plattform für Marketing- und Werbetexte", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://jasper.ai", color: "#7C3AED" },
  { name: "Copy.ai", category: "Text & Schreiben", description: "Automatisierte Textgenerierung für Unternehmen", pricing: "Freemium", audience: "Unternehmen", url: "https://copy.ai", color: "#2563EB" },
  { name: "Writesonic", category: "Text & Schreiben", description: "KI-Tool für SEO-optimierte Inhalte", pricing: "Freemium", audience: "Content-Creator", url: "https://writesonic.com", color: "#F59E0B" },
  { name: "Notion AI", category: "Text & Schreiben", description: "KI-Features direkt in Notion für Notizen und Dokumente", pricing: "Kostenpflichtig", audience: "Teams", url: "https://notion.so", color: "#000000" },
  { name: "Grammarly", category: "Text & Schreiben", description: "Grammatik- und Stilprüfung mit KI-Unterstützung", pricing: "Freemium", audience: "Alle", url: "https://grammarly.com", color: "#38BDF8" },
  { name: "QuillBot", category: "Text & Schreiben", description: "Paraphrasier- und Zusammenfassungs-Tool", pricing: "Freemium", audience: "Studierende", url: "https://quillbot.com", color: "#4F46E5" },

  // Bildgenerierung & Design
  { name: "Midjourney", category: "Bildgenerierung & Design", description: "Kreative KI-Bildgenerierung mit herausragender Qualität", pricing: "Kostenpflichtig", audience: "Designer", url: "https://midjourney.com", color: "#7B68EE" },
  { name: "DALL\u00b7E 3", category: "Bildgenerierung & Design", description: "OpenAIs Bildgenerierung direkt in ChatGPT", pricing: "Freemium", audience: "Alle", url: "https://openai.com/dall-e", color: "#10A37F" },
  { name: "Stable Diffusion", category: "Bildgenerierung & Design", description: "Open-Source Bildgenerierung für lokale Nutzung", pricing: "Kostenlos", audience: "Entwickler", url: "https://stability.ai", color: "#EA580C" },
  { name: "Leonardo AI", category: "Bildgenerierung & Design", description: "KI-Bildgenerierung mit Fokus auf Gaming und 3D", pricing: "Freemium", audience: "Kreative", url: "https://leonardo.ai", color: "#8B5CF6" },
  { name: "Adobe Firefly", category: "Bildgenerierung & Design", description: "Adobe-integrative KI für kommerzielle Bilder", pricing: "Freemium", audience: "Designer", url: "https://adobe.com/firefly", color: "#FF0000" },
  { name: "Canva AI", category: "Bildgenerierung & Design", description: "KI-Design-Tools direkt im Canva-Editor", pricing: "Freemium", audience: "Alle", url: "https://canva.com", color: "#00C4CC" },
  { name: "Ideogram", category: "Bildgenerierung & Design", description: "Bildgenerierung mit exzellenter Text-Integration", pricing: "Freemium", audience: "Alle", url: "https://ideogram.ai", color: "#EC4899" },
  { name: "Krea AI", category: "Bildgenerierung & Design", description: "Echtzeit-Bildgenerierung und -bearbeitung", pricing: "Freemium", audience: "Kreative", url: "https://krea.ai", color: "#F97316" },

  // Video erstellen & bearbeiten
  { name: "Runway", category: "Video erstellen & bearbeiten", description: "Professionelle KI-Videobearbeitung und -generierung", pricing: "Kostenpflichtig", audience: "Filmemacher", url: "https://runwayml.com", color: "#1A1A1A" },
  { name: "Pika", category: "Video erstellen & bearbeiten", description: "KI-Text-zu-Video mit stilvollem Output", pricing: "Freemium", audience: "Creator", url: "https://pika.art", color: "#FBBF24" },
  { name: "Synthesia", category: "Video erstellen & bearbeiten", description: "KI-Avatar-Videos für Unternehmen", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://synthesia.io", color: "#3B82F6" },
  { name: "HeyGen", category: "Video erstellen & bearbeiten", description: "KI-gestützte Videoübersetzung und Avatare", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://heygen.com", color: "#8B5CF6" },
  { name: "Descript", category: "Video erstellen & bearbeiten", description: "Audio- und Videobearbeitung per Text", pricing: "Freemium", audience: "Podcaster", url: "https://descript.com", color: "#4F46E5" },
  { name: "InVideo AI", category: "Video erstellen & bearbeiten", description: "Automatische Videoerstellung aus Skripten", pricing: "Freemium", audience: "Social Media", url: "https://invideo.io", color: "#F59E0B" },

  // Website erstellen
  { name: "Framer AI", category: "Website erstellen", description: "KI-gestütztes Website-Design und Publishing", pricing: "Freemium", audience: "Designer", url: "https://framer.com", color: "#0055FF" },
  { name: "Wix AI", category: "Website erstellen", description: "KI-Website-Erstellung mit Drag-and-Drop", pricing: "Freemium", audience: "Anf\u00e4nger", url: "https://wix.com", color: "#FA5B0F" },
  { name: "Durable", category: "Website erstellen", description: "KI erstellt Websites in 30 Sekunden", pricing: "Kostenpflichtig", audience: "Selbstst\u00e4ndige", url: "https://durable.co", color: "#10B981" },
  { name: "Relume", category: "Website erstellen", description: "KI-gest\u00fctzte Webflow- und Figma-Komponenten", pricing: "Freemium", audience: "Designer", url: "https://relume.io", color: "#7C3AED" },
  { name: "Webflow AI", category: "Website erstellen", description: "KI-Assistent f\u00fcr Webflow-Websites", pricing: "Freemium", audience: "Webdesigner", url: "https://webflow.com", color: "#4353FF" },
  { name: "Lovable", category: "Website erstellen", description: "KI-Text-zu-Website mit Full-Stack-Funktionen", pricing: "Freemium", audience: "Entwickler", url: "https://lovable.dev", color: "#FF6B6B" },

  // App erstellen & No-Code
  { name: "Bolt.new", category: "App erstellen & No-Code", description: "KI-gest\u00fctzte Full-Stack-App-Entwicklung", pricing: "Freemium", audience: "Entwickler", url: "https://bolt.new", color: "#F59E0B" },
  { name: "Cursor", category: "App erstellen & No-Code", description: "KI-Code-Editor f\u00fcr schnellere Entwicklung", pricing: "Freemium", audience: "Entwickler", url: "https://cursor.com", color: "#1E1E1E" },
  { name: "Replit AI", category: "App erstellen & No-Code", description: "Online-IDE mit integrierter KI-Assistance", pricing: "Freemium", audience: "Entwickler", url: "https://replit.com", color: "#F26207" },
  { name: "Bubble", category: "App erstellen & No-Code", description: "No-Code App-Builder mit KI-Unterst\u00fctzung", pricing: "Freemium", audience: "Anf\u00e4nger", url: "https://bubble.io", color: "#0D47FF" },
  { name: "FlutterFlow AI", category: "App erstellen & No-Code", description: "KI-gest\u00fctzter Flutter-App-Builder", pricing: "Freemium", audience: "Entwickler", url: "https://flutterflow.io", color: "#FF6F61" },
  { name: "Glide", category: "App erstellen & No-Code", description: "Apps aus Google Sheets mit KI", pricing: "Freemium", audience: "Anf\u00e4nger", url: "https://glideapps.com", color: "#4CAF50" },
  { name: "Retool AI", category: "App erstellen & No-Code", description: "KI-gest\u00fctztes internes Tool-Building", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://retool.com", color: "#2563EB" },

  // Programmierung & Developer
  { name: "GitHub Copilot", category: "Programmierung & Developer", description: "KI-Code-Vervollst\u00e4ndigung direkt im Editor", pricing: "Kostenpflichtig", audience: "Entwickler", url: "https://github.com/copilot", color: "#6E5494" },
  { name: "Codeium", category: "Programmierung & Developer", description: "Kostenlose KI-Code-Completion", pricing: "Kostenlos", audience: "Entwickler", url: "https://codeium.com", color: "#09B6A2" },
  { name: "Tabnine", category: "Programmierung & Developer", description: "KI-gest\u00fctzte Code-Vervollst\u00e4ndigung", pricing: "Freemium", audience: "Entwickler", url: "https://tabnine.com", color: "#9D72FF" },
  { name: "v0 by Vercel", category: "Programmierung & Developer", description: "KI-Generierung von UI-Komponenten", pricing: "Freemium", audience: "Entwickler", url: "https://v0.dev", color: "#000000" },
  { name: "Sourcegraph Cody", category: "Programmierung & Developer", description: "KI-Code-Suche und -Verst\u00e4ndnis", pricing: "Freemium", audience: "Entwickler", url: "https://sourcegraph.com/cody", color: "#FF5543" },

  // Datenanalyse & BI
  { name: "Julius AI", category: "Datenanalyse & BI", description: "KI-gest\u00fctzte Datenanalyse und Visualisierung", pricing: "Freemium", audience: "Analysten", url: "https://julius.ai", color: "#3B82F6" },
  { name: "Rows AI", category: "Datenanalyse & BI", description: "Smarte Tabellenkalkulation mit KI", pricing: "Freemium", audience: "Business", url: "https://rows.com", color: "#F59E0B" },
  { name: "Akkio", category: "Datenanalyse & BI", description: "No-Code Machine Learning Plattform", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://akkio.com", color: "#10B981" },
  { name: "DataRobot", category: "Datenanalyse & BI", description: "Enterprise AI Platform f\u00fcr Datenanalyse", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://datarobot.com", color: "#2563EB" },
  { name: "Obviously AI", category: "Datenanalyse & BI", description: "No-Code Predictive Analytics", pricing: "Kostenpflichtig", audience: "Business", url: "https://obviously.ai", color: "#7C3AED" },

  // Finanzen & Investment
  { name: "AlphaSense", category: "Finanzen & Investment", description: "KI-gest\u00fctzte Markt- und Unternehmensrecherche", pricing: "Kostenpflichtig", audience: "Investoren", url: "https://alphasense.com", color: "#1E40AF" },
  { name: "Kavout", category: "Finanzen & Investment", description: "KI-Investment-Analyse und Scoring", pricing: "Kostenpflichtig", audience: "Investoren", url: "https://kavout.com", color: "#0F766E" },
  { name: "Numerai", category: "Finanzen & Investment", description: "KI-gest\u00fctzter Hedge-Fonds", pricing: "Kostenlos", audience: "Data Scientists", url: "https://numer.ai", color: "#FF0066" },
  { name: "FinChat", category: "Finanzen & Investment", description: "KI-Chat f\u00fcr Finanzdaten und Aktien", pricing: "Freemium", audience: "Investoren", url: "https://finchat.io", color: "#3B82F6" },
  { name: "Upstart", category: "Finanzen & Investment", description: "KI-gest\u00fctzte Kreditvergabe", pricing: "Kostenlos", audience: "Verbraucher", url: "https://upstart.com", color: "#6366F1" },

  // Marketing & Social Media
  { name: "HubSpot AI", category: "Marketing & Social Media", description: "KI-gest\u00fctztes Marketing-Automation", pricing: "Freemium", audience: "Unternehmen", url: "https://hubspot.com", color: "#FF7A59" },
  { name: "Semrush AI", category: "Marketing & Social Media", description: "KI-gest\u00fctztes SEO- und Marketing-Tool", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://semrush.com", color: "#00A4EF" },
  { name: "Surfer SEO", category: "Marketing & Social Media", description: "KI-gest\u00fctzte Content-Optimierung", pricing: "Kostenpflichtig", audience: "SEO-Experten", url: "https://surferseo.com", color: "#34D399" },
  { name: "AdCreative.ai", category: "Marketing & Social Media", description: "KI-generierte Werbeanzeigen", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://adcreative.ai", color: "#F59E0B" },
  { name: "Ocoya", category: "Marketing & Social Media", description: "KI-Social-Media-Management", pricing: "Kostenpflichtig", audience: "Social Media", url: "https://ocoya.com", color: "#EC4899" },
  { name: "Predis.ai", category: "Marketing & Social Media", description: "KI-Social-Media-Content-Erstellung", pricing: "Freemium", audience: "Creator", url: "https://predis.ai", color: "#F97316" },

  // Pr\u00e4sentationen & Dokumente
  { name: "Gamma", category: "Pr\u00e4sentationen & Dokumente", description: "KI-gest\u00fctzte Pr\u00e4sentationserstellung", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://gamma.app", color: "#6366F1" },
  { name: "Tome", category: "Pr\u00e4sentationen & Dokumente", description: "Storytelling-Plattform mit KI", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://tome.app", color: "#000000" },
  { name: "Beautiful.ai", category: "Pr\u00e4sentationen & Dokumente", description: "Smarte Pr\u00e4sentationsvorlagen mit KI", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://beautiful.ai", color: "#22D3EE" },
  { name: "Pitch", category: "Pr\u00e4sentationen & Dokumente", description: "Kollaborative Pr\u00e4sentationen mit KI", pricing: "Freemium", audience: "Teams", url: "https://pitch.com", color: "#7C3AED" },
  { name: "SlidesAI", category: "Pr\u00e4sentationen & Dokumente", description: "KI-Slides aus Text f\u00fcr Google Slides", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://slidesai.io", color: "#F59E0B" },

  // Audio, Stimme & Musik
  { name: "ElevenLabs", category: "Audio, Stimme & Musik", description: "Realistische KI-Stimmensynthese", pricing: "Freemium", audience: "Creator", url: "https://elevenlabs.io", color: "#4F46E5" },
  { name: "Murf AI", category: "Audio, Stimme & Musik", description: "KI-Stimmen f\u00fcr Voiceovers", pricing: "Freemium", audience: "Creator", url: "https://murf.ai", color: "#F59E0B" },
  { name: "Suno", category: "Audio, Stimme & Musik", description: "KI-Musikgenerierung aus Text", pricing: "Freemium", audience: "Musiker", url: "https://suno.com", color: "#10B981" },
  { name: "Udio", category: "Audio, Stimme & Musik", description: "KI-Musik und -Songgenerierung", pricing: "Freemium", audience: "Musiker", url: "https://udio.com", color: "#EC4899" },
  { name: "AIVA", category: "Audio, Stimme & Musik", description: "KI-Komposition f\u00fcr Soundtracks", pricing: "Freemium", audience: "Komponisten", url: "https://aiva.ai", color: "#6366F1" },
  { name: "Soundraw", category: "Audio, Stimme & Musik", description: "KI-generierte lizenzfreie Musik", pricing: "Kostenpflichtig", audience: "Creator", url: "https://soundraw.io", color: "#F97316" },

  // Automatisierung & Produktivit\u00e4t
  { name: "Zapier AI", category: "Automatisierung & Produktivit\u00e4t", description: "Workflow-Automatisierung mit KI", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://zapier.com", color: "#FF4A00" },
  { name: "Make", category: "Automatisierung & Produktivit\u00e4t", description: "Visuelle Workflow-Automatisierung", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://make.com", color: "#7B2D8E" },
  { name: "n8n", category: "Automatisierung & Produktivit\u00e4t", description: "Open-Source Workflow-Automatisierung", pricing: "Kostenlos", audience: "Entwickler", url: "https://n8n.io", color: "#FF6D5A" },
  { name: "Bardeen", category: "Automatisierung & Produktivit\u00e4t", description: "KI-Automatisierung im Browser", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://bardeen.ai", color: "#9D72FF" },
  { name: "Notion AI", category: "Automatisierung & Produktivit\u00e4t", description: "KI-Assistent f\u00fcr Notizen und Workflows", pricing: "Kostenpflichtig", audience: "Teams", url: "https://notion.so", color: "#000000" },
  { name: "ClickUp AI", category: "Automatisierung & Produktivit\u00e4t", description: "KI-gest\u00fctztes Projektmanagement", pricing: "Kostenpflichtig", audience: "Teams", url: "https://clickup.com", color: "#7B68EE" },

  // Recherche & Wissen
  { name: "Elicit", category: "Recherche & Wissen", description: "KI-gest\u00fctzte wissenschaftliche Recherche", pricing: "Freemium", audience: "Forscher", url: "https://elicit.org", color: "#2563EB" },
  { name: "Consensus", category: "Recherche & Wissen", description: "KI-Suchmaschine f\u00fcr wissenschaftliche Papers", pricing: "Freemium", audience: "Studierende", url: "https://consensus.app", color: "#10B981" },
  { name: "You.com", category: "Recherche & Wissen", description: "KI-Suchmaschine mit privaten Antworten", pricing: "Freemium", audience: "Alle", url: "https://you.com", color: "#6366F1" },
  { name: "Research Rabbit", category: "Recherche & Wissen", description: "KI-gest\u00fctztes Literatur-Mapping", pricing: "Kostenlos", audience: "Forscher", url: "https://researchrabbit.ai", color: "#F59E0B" },
  { name: "NotebookLM", category: "Recherche & Wissen", description: "Googles KI-Notizbuch f\u00fcr Dokumente", pricing: "Kostenlos", audience: "Studierende", url: "https://notebooklm.google.com", color: "#4285F4" },
  { name: "ChatPDF", category: "Recherche & Wissen", description: "KI-Chat mit PDF-Dokumenten", pricing: "Freemium", audience: "Studierende", url: "https://chatpdf.com", color: "#EF4444" },

  // Kundenservice & Chatbots
  { name: "Intercom AI", category: "Kundenservice & Chatbots", description: "KI-gest\u00fctzter Kundenservice", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://intercom.com", color: "#1F8DED" },
  { name: "Zendesk AI", category: "Kundenservice & Chatbots", description: "KI f\u00fcr Kundensupport-Automatisierung", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://zendesk.com", color: "#03363D" },
  { name: "Ada", category: "Kundenservice & Chatbots", description: "KI-Chatbot-Plattform f\u00fcr Enterprise", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://ada.cx", color: "#00B4D8" },
  { name: "Botpress", category: "Kundenservice & Chatbots", description: "Open-Source Chatbot-Builder", pricing: "Freemium", audience: "Entwickler", url: "https://botpress.com", color: "#3B82F6" },
  { name: "Manychat", category: "Kundenservice & Chatbots", description: "KI-Chatbots f\u00fcr Social Media", pricing: "Freemium", audience: "Marketer", url: "https://manychat.com", color: "#00AEEF" },

  // HR & Recruiting
  { name: "HireVue", category: "HR & Recruiting", description: "KI-gest\u00fctzte Video-Interviews", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://hirevue.com", color: "#0057B8" },
  { name: "Eightfold AI", category: "HR & Recruiting", description: "KI-Talent-Intelligence-Plattform", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://eightfold.ai", color: "#8B5CF6" },
  { name: "Textio", category: "HR & Recruiting", description: "KI-gest\u00fctztes Job-Beschreibungen-Schreiben", pricing: "Kostenpflichtig", audience: "HR", url: "https://textio.com", color: "#F59E0B" },
  { name: "SeekOut", category: "HR & Recruiting", description: "KI-gest\u00fctzte Talent-Suche", pricing: "Kostenpflichtig", audience: "Recruiter", url: "https://seekout.com", color: "#10B981" },

  // Recht & Vertr\u00e4ge
  { name: "Harvey AI", category: "Recht & Vertr\u00e4ge", description: "KI-Assistent f\u00fcr Anw\u00e4lte", pricing: "Kostenpflichtig", audience: "Anw\u00e4lte", url: "https://harvey.ai", color: "#1E3A5F" },
  { name: "Ironclad AI", category: "Recht & Vertr\u00e4ge", description: "KI-gest\u00fctztes Vertragsmanagement", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://ironcladapp.com", color: "#2563EB" },
  { name: "Evisort", category: "Recht & Vertr\u00e4ge", description: "KI-Analyse von Vertr\u00e4gen", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://evisort.com", color: "#7C3AED" },

  // Bildung & Lernen
  { name: "Khanmigo", category: "Bildung & Lernen", description: "KI-Tutor von Khan Academy", pricing: "Kostenlos", audience: "Studierende", url: "https://khanacademy.org", color: "#14BF96" },
  { name: "Duolingo Max", category: "Bildung & Lernen", description: "KI-gest\u00fctztes Sprachenlernen", pricing: "Kostenpflichtig", audience: "Sprachlerner", url: "https://duolingo.com", color: "#58CC02" },
  { name: "Coursera Coach", category: "Bildung & Lernen", description: "KI-Lernassistent auf Coursera", pricing: "Freemium", audience: "Studierende", url: "https://coursera.org", color: "#0056D2" },
  { name: "Brilliant AI", category: "Bildung & Lernen", description: "KI-gest\u00fctztes interaktives Lernen", pricing: "Kostenpflichtig", audience: "Studierende", url: "https://brilliant.org", color: "#00D4AA" },
  { name: "Wolfram Alpha", category: "Bildung & Lernen", description: "KI-Wissens-Engine f\u00fcr Mathe und Wissenschaft", pricing: "Freemium", audience: "Studierende", url: "https://wolframalpha.com", color: "#DD1100" },
];
