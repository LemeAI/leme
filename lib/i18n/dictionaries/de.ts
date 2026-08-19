import type { Dictionary } from "./en";

export const de: Dictionary = {
  site: {
    name: "Leme",
    tagline: "KI-generiertes HTML hochladen und mit einem Link teilen",
    description:
      "Laden Sie KI-generierte HTML-Dateien hoch und teilen Sie sie mit jedem über einen Link. Kollaborieren Sie mit Kommentaren, Vorschlägen und Forks.",
  },
  nav: {
    plans: "Pläne",
    blog: "Blog",
    myFiles: "Meine Dateien",
    newUpload: "Neuer Upload",
    signIn: "Anmelden",
    signOut: "Abmelden",
  },
  home: {
    heroBadge: "KI-generiertes HTML, bereit zum Teilen",
    heroTitle: "Verwandeln Sie das, was Sie mit KI erstellen, in Seiten, die jeder öffnen kann",
    heroDescription:
      "Laden Sie das von Ihrem Lieblings-KI-Tool generierte HTML hoch, erhalten Sie in Sekunden einen teilbaren Link und lassen Sie andere kommentieren, Änderungen vorschlagen oder forken.",
    ctaUpload: "HTML hochladen",
    ctaPlans: "Pläne ansehen",
    heroNote: "Kein Konto nötig zum Testen — Seiten, die Sie ohne Anmeldung hochladen, bleiben in diesem Browser gespeichert.",
    featureUpload: "Hochladen",
    featureUploadDesc: "Ziehen Sie beliebige .html-Dateien bis 2 MB hinein — ohne Build, ohne Konfiguration.",
    featureShare: "Teilen",
    featureShareDesc: "Jeder Upload erhält seine eigene Seite und einen Link, bereit zum Versenden.",
    featureCollaborate: "Kollaborieren",
    featureCollaborateDesc: "Besucher können kommentieren, Änderungen vorschlagen oder Ihre Seite forken.",
    featureControl: "Kontrolle behalten",
    featureControlDesc: "Der kostenlose Plan hat Limits und ein Wasserzeichen; Pro entfernt beides.",
    howTitle: "So funktioniert es",
    howSubtitle: "Vom KI-Prompt zum öffentlichen Link in vier Schritten.",
    step1: "Generieren",
    step1Desc: "Bitten Sie ChatGPT, Claude, Gemini oder einen anderen KI-Assistenten um eine einzelne HTML-Datei.",
    step2: "Speichern",
    step2Desc: "Kopieren Sie den HTML-Code und speichern Sie ihn als .html-Datei auf Ihrem Computer.",
    step3: "Hochladen",
    step3Desc: "Ziehen Sie die Datei in Leme und fügen Sie Titel und Beschreibung hinzu.",
    step4: "Teilen",
    step4Desc: "Erhalten Sie einen öffentlichen Link wie leme.app/p/xyz und teilen Sie ihn überall.",
    toolsTitle: "Funktioniert mit Ihren Lieblings-KI-Tools",
    toolsSubtitle: "Laden Sie HTML hoch, das von den beliebtesten KI-Coding-Assistenten und App-Buildern generiert wurde.",
    finalTitle: "Bereit, das, was Sie gebaut haben, zu teilen?",
    finalSubtitle: "Es dauert weniger als eine Minute — keine Anmeldung erforderlich, um zu starten.",
  },
  footer: {
    product: "Produkt",
    resources: "Ressourcen",
    social: "Social",
    features: "Funktionen",
    pricing: "Preise",
    useCases: "Anwendungsfälle",
    about: "Über uns",
    blog: "Blog",
    faq: "FAQ",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutz",
    contact: "Kontakt",
    rights: "Alle Rechte vorbehalten.",
    madeFor: "Gemacht für KI-generiertes HTML.",
  },
  pricing: {
    title: "Einfache Pläne, ohne Tricks",
    subtitle:
      "Nutze es ohne Konto, um schnell zu testen, erstelle ein kostenloses Konto, um mehr Seiten zu speichern, oder wähle Pro, wenn du alles uneingeschränkt online halten möchtest.",
    noAccount: {
      name: "Ohne Konto",
      price: "$0",
      description: "Schnell testen, ohne Anmeldung.",
      features: {
        pages: "{count} aktive Seite zur gleichen Zeit",
        expires: "Läuft nach {days} Tagen ab",
        watermark: "Mit Wasserzeichen",
      },
      cta: "Jetzt nutzen",
    },
    free: {
      name: "Kostenlos",
      price: "$0",
      description: "Erstelle ein Konto und erhalte mehr Platz.",
      features: {
        pages: "{count} aktive Seiten gleichzeitig",
        expires: "Läuft nach {days} Tagen ab",
        watermark: "Mit Wasserzeichen",
      },
      cta: "Kostenloses Konto erstellen",
    },
    pro: {
      name: "Pro",
      description: "Für alle, die Seiten uneingeschränkt online halten möchten.",
      monthly: "Monatlich",
      yearly: "Jährlich",
      priceUnitMonth: "Monat",
      priceUnitYear: "Jahr",
      yearlySavings: "2 Monate geschenkt gegenüber monatlicher Zahlung",
      features: ["Unbegrenzte aktive Seiten", "Läuft nie ab", "Kein Wasserzeichen"],
      cta: "Upgrade auf Pro",
      ctaLoading: "Weiterleiten...",
    },
    footerNote: "Zahlungen werden sicher über Stripe abgewickelt. Jederzeit in den Abrechnungseinstellungen kündbar.",
  },
  common: {
    expiration: {
      expired: "abgelaufen",
      oneDay: "läuft in 1 Tag ab",
      days: "läuft in {count} Tagen ab",
    },
  },
  dashboard: {
    title: "Mein Dashboard",
    newUpload: "+ Neuer Upload",
    activePages: "{active}/{max} aktive Seiten",
    activePagesUnlimited: "{active} aktive Seite(n) · kein Limit",
    renewsOn: "Erneuert am {date}",
    cancelsAtPeriodEnd: " · kündigt zum Periodenende",
    yearly: " · jährlich",
    monthly: " · monatlich",
    limitReachedUpgrade: "Limit erreicht — upgraden",
    viewProPlan: "Pro-Plan ansehen",
    billingSettings: "Abrechnungseinstellungen",
    emptyState: "Du hast noch kein HTML hochgeladen.",
    emptyStateLink: "Mach deinen ersten Upload",
    views: "{count} Aufrufe",
    uploadedOn: "hochgeladen am {date}",
  },
  mine: {
    title: "Meine Uploads",
    newUpload: "+ Neuer Upload",
    activePagesInBrowser: "{active}/{max} aktive Seite(n) in diesem Browser",
    noAccount: "Kein Konto",
    createAccountForSpace: "Kostenloses Konto für mehr Speicher erstellen",
    emptyState: "Noch keine Uploads in diesem Browser gespeichert.",
    emptyStateLink: "Lade dein erstes HTML hoch",
    browserListWarning:
      "Diese Liste wird in diesem Browser gespeichert — wenn du die Seitendaten löschst oder das Gerät wechselst, ist sie weg.",
    createAccountLink: "Konto erstellen",
    dontLoseUploads: "damit du deine Uploads nicht verlierst.",
    views: "{count} Aufrufe",
    uploadedOn: "hochgeladen am {date}",
  },
  blog: {
    title: "Leme-Blog",
    subtitle: "Tipps, Tutorials und Neuigkeiten zum Veröffentlichen und Teilen von KI-generiertem HTML.",
    readMore: "Mehr lesen \u2192",
    posts: [
      {
        slug: "how-to-publish-html-from-ai",
        title: "So veröffentlichst du HTML aus ChatGPT, Claude und Gemini",
        excerpt:
          "Eine Schritt-für-Schritt-Anleitung zum Exportieren von HTML aus beliebten KI-Coding-Assistenten und zum Online-Veröffentlichen mit einem teilbaren Link.",
        date: "2026-08-16",
      },
      {
        slug: "share-ai-landing-page-in-30-seconds",
        title: "So teilst du eine KI-generierte Landing Page in 30 Sekunden",
        excerpt:
          "Verwandle einen Prompt in eine Live-Landing-Page. Lade das HTML bei Leme hoch und sende den Link an jeden.",
        date: "2026-08-16",
      },
      {
        slug: "collect-feedback-on-html-prototypes",
        title: "Der beste Weg, Feedback zu HTML-Prototypen zu sammeln",
        excerpt:
          "Warum Kommentare, Vorschläge und Forks Leme zu einem leichten Feedback-Tool für KI-generierte Prototypen machen.",
        date: "2026-08-16",
      },
    ],
  },
  about: {
    metadataDescription:
      "Erfahren Sie mehr über Leme: eine einfache Möglichkeit, KI-generierte HTML-Seiten hochzuladen und mit einem Link zu teilen.",
    title: "Über Leme",
    intro:
      "Leme wurde für alle gebaut, die HTML mit KI erstellen und eine schnelle, zuverlässige Möglichkeit brauchen, das Ergebnis zu teilen. Kein Hosting-Setup, keine Build-Pipeline — einfach die Datei hochladen und einen Link erhalten, den Sie an jeden senden können.",
    whyTitle: "Warum wir es gebaut haben",
    whyText:
      "KI-Tools können in Sekunden komplette HTML-Seiten generieren, aber deren Veröffentlichung ist immer noch schwieriger als nötig. Wir wollten einen Ort, an dem Sie eine Datei ablegen, einen Link kopieren und weitermachen können.",
    whatTitle: "Was Sie tun können",
    whatItems: [
      "Laden Sie einzelne HTML-Dateien bis zur Grenze Ihres Plans hoch",
      "Erhalten Sie sofort eine öffentliche Seite und einen teilbaren Link",
      "Erhalten Sie Kommentare, Vorschläge und Forks von Besuchern",
      "Upgrade auf Pro für unbegrenzte Seiten und kein Wasserzeichen",
    ],
    cta: "Pläne ansehen",
  },
  features: {
    metadataDescription:
      "Entdecken Sie die Funktionen von Leme: HTML hochladen, Links teilen, mit Kommentaren, Vorschlägen und Forks zusammenarbeiten.",
    title: "Funktionen",
    subtitle: "Alles, was Sie brauchen, um KI-generierte HTML-Seiten zu veröffentlichen und zu teilen.",
    items: [
      {
        title: "Sofortiges Hochladen",
        description: "Ziehen oder wählen Sie eine HTML-Datei und erhalten Sie in Sekunden einen öffentlichen Link.",
      },
      {
        title: "Teilbare Seiten",
        description: "Jeder Upload wird zu einer übersichtlichen Seite mit eigener URL, die überall geteilt werden kann.",
      },
      {
        title: "Zusammenarbeit",
        description: "Besucher können Kommentare, Vorschläge oder Forks hinterlassen, um Ihre Seite weiterzuentwickeln.",
      },
      {
        title: "Kein Konto erforderlich",
        description: "Testen Sie Leme ohne Anmeldung. Erstellen Sie ein Konto, wenn Sie mehr Seiten speichern möchten.",
      },
      {
        title: "Pro-Plan",
        description: "Entfernen Sie das Wasserzeichen und halten Sie unbegrenzt viele Seiten dauerhaft online.",
      },
      {
        title: "Einfache Abrechnung",
        description: "Upgraden oder kündigen Sie jederzeit in Ihren Abrechnungseinstellungen.",
      },
    ],
  },
  faq: {
    metadataDescription:
      "Häufig gestellte Fragen zu Leme: KI-generiertes HTML hochladen, Links teilen, zusammenarbeiten und Pläne verwalten.",
    metadataOpenGraphTitle: "Leme FAQ — Häufige Fragen beantwortet",
    title: "Häufig gestellte Fragen",
    subtitle: "Alles, was Sie über das Hochladen, Teilen und Zusammenarbeiten mit Leme wissen müssen.",
    stillQuestionsTitle: "Noch Fragen?",
    stillQuestionsText: "Senden Sie eine E-Mail an",
    items: [
      {
        question: "Was ist Leme?",
        answer:
          "Leme ist eine schnelle Möglichkeit, KI-generierte HTML-Dateien hochzuladen und sie als teilbare Webseiten zu veröffentlichen. Sie erhalten sofort einen öffentlichen Link, und Besucher können kommentieren, Änderungen vorschlagen oder Ihre Seite forken.",
      },
      {
        question: "Wie lade ich eine HTML-Datei hoch?",
        answer:
          "Gehen Sie zur Upload-Seite, ziehen oder wählen Sie Ihre .html-Datei, fügen Sie einen Titel und eine optionale Beschreibung hinzu und klicken Sie auf Hochladen. Leme hostet die Datei und gibt Ihnen in Sekunden einen öffentlichen Link.",
      },
      {
        question: "Brauche ich ein Konto, um Leme zu nutzen?",
        answer:
          "Nein. Sie können ohne Anmeldung hochladen. Anonyme Uploads werden in Ihrem Browser gespeichert, haben aber strengere Limits und laufen nach wenigen Tagen ab. Ein kostenloses Konto gibt Ihnen mehr Seiten und eine längere Aufbewahrung.",
      },
      {
        question: "Mit welchen KI-Tools funktioniert Leme?",
        answer:
          "Jedes Tool, das eine einzelne .html-Datei exportiert, funktioniert. Beliebte Optionen sind ChatGPT, Claude, Gemini, v0, Lovable, Bolt, Replit und handgeschriebenes HTML aus jedem Code-Generator.",
      },
      {
        question: "Wie hoch ist die Dateigrößenbegrenzung?",
        answer:
          "Das aktuelle Upload-Limit beträgt 2 MB pro Datei. Das deckt die meisten KI-generierten Landing Pages, Portfolios, Dashboards und Prototypen ab. Ist Ihre Datei größer, komprimieren Sie Bilder oder teilen Sie die Seite auf.",
      },
      {
        question: "Kann ich eine Seite mit anderen teilen?",
        answer:
          "Ja. Jede Seite erhält einen öffentlichen Link wie leme.app/p/[id]. Sie können auch einen dedizierten Freigabelink in der Seitenleiste erstellen, der sich einfacher kopieren und senden lässt.",
      },
      {
        question: "Wie funktioniert die Zusammenarbeit?",
        answer:
          "Besucher mit dem Link können die Seitenleiste öffnen und Kommentare, Vorschläge oder Forks hinterlassen. Forks erstellen eine neue Kopie der Seite, die der Mitwirkende bearbeiten und zurückteilen kann.",
      },
      {
        question: "Was passiert, wenn eine Seite abläuft?",
        answer:
          "Kostenlose und anonyme Seiten laufen nach ihrer Aufbewahrungsfrist ab. Sobald sie abgelaufen ist, ist die Seite nicht mehr einsehbar. Pro-Seiten laufen nie ab, solange das Abonnement aktiv ist.",
      },
      {
        question: "Was ist der Unterschied zwischen Free und Pro?",
        answer:
          "Der kostenlose Plan erlaubt eine kleine Anzahl aktiver Seiten mit Leme-Wasserzeichen. Der Pro-Plan entfernt das Wasserzeichen, hebt das Limit aktiver Seiten auf und hält Seiten dauerhaft online.",
      },
      {
        question: "Was kostet Pro?",
        answer:
          "Leme Pro kostet 9 $ pro Monat oder 90 $ pro Jahr. Der Jahresplan spart im Vergleich zur monatlichen Zahlung zwei Monate.",
      },
      {
        question: "Kann ich Pro jederzeit kündigen?",
        answer:
          "Ja. Sie können jederzeit auf der Abrechnungsseite kündigen. Ihre Pro-Vorteile bleiben bis zum Ende der aktuellen Abrechnungsperiode aktiv.",
      },
      {
        question: "Ist mein hochgeladener Inhalt öffentlich?",
        answer:
          "Auf Leme hochgeladene Seiten sind standardmäßig über ihre teilbaren Links öffentlich. Jeder mit dem Link kann die Seite ansehen. Laden Sie keine sensiblen, privaten oder vertraulichen Inhalte hoch.",
      },
      {
        question: "Kann ich eine Seite löschen?",
        answer:
          "Ja. Wenn Sie die Seite angemeldet erstellt haben, können Sie sie aus Ihrem Dashboard löschen. Anonyme Seiten sind an Ihren Browser gebunden und können auf der Seite Meine Uploads entfernt werden.",
      },
      {
        question: "Funktioniert Leme auf Mobilgeräten?",
        answer:
          "Ja. Die Leme-Website ist responsiv. Sie können Seiten von jedem modernen Browser auf Desktop, Tablet oder Mobil hochladen, ansehen und teilen.",
      },
      {
        question: "Kann ich meine eigene Domain verwenden?",
        answer:
          "Noch nicht. Derzeit wird jede Seite unter leme.app gehostet. Eigene Domains sind für eine zukünftige Version geplant.",
      },
      {
        question: "Unterstützt Leme CSS, JavaScript und Bilder innerhalb der HTML-Datei?",
        answer:
          "Ja. Eine einzelne .html-Datei mit inline CSS, JavaScript und Base64-Bildern wird korrekt gerendert. Externe Assets, die per URL verknüpft sind, können je nach CORS und Verfügbarkeit geladen werden.",
      },
      {
        question: "Wie melde ich Missbrauch oder urheberrechtlich geschützte Inhalte?",
        answer:
          "Senden Sie eine E-Mail an hello@leme-app.com mit dem Seitenlink und einer Beschreibung. Wir prüfen Meldungen und ergreifen Maßnahmen gegen Inhalte, die gegen unsere Nutzungsbedingungen verstoßen.",
      },
      {
        question: "Gibt es eine öffentliche API?",
        answer: "Nein. Leme ist für manuelle Uploads über die Web-Oberfläche konzipiert. API-Zugriff ist nicht verfügbar.",
      },
      {
        question: "Wer hat Leme gebaut?",
        answer:
          "Leme wurde von einem kleinen Team gebaut, das sich darauf konzentriert, KI-generiertes HTML einfach zu veröffentlichen und zu teilen. Wir sind unabhängig, bootstrapped und finanzieren uns durch Pro-Abonnements.",
      },
      {
        question: "Wie können Sie uns erreichen?",
        answer: "Schreiben Sie uns an hello@leme-app.com oder kontaktieren Sie uns über Twitter / X und LinkedIn.",
      },
    ],
  },
  aiLanding: {
    worksWith: "Funktioniert mit {toolName}",
    howItWorks: "So funktioniert es",
    commonUseCases: "Häufige Anwendungsfälle",
    readyToPublish: "Bereit, dein {toolName}-HTML zu veröffentlichen?",
    ctaUpload: "HTML hochladen",
    noAccount: "Lade deine Datei hoch und erhalte in Sekunden einen öffentlichen Link. Kein Konto erforderlich, um es auszuprobieren.",
    whyUseLeme: "Warum Leme mit {toolName} nutzen?",
    whyPoints: [
      "Erhalten Sie einen öffentlichen Link, ohne den Browser zu verlassen.",
      "Teilen Sie die Seite mit jedem, auch ohne {toolName}-Zugang.",
      "Sammeln Sie Feedback, Vorschläge und Forks von Reviewern.",
      "Halten Sie Seiten mit Leme Pro für immer online.",
    ],
  },
  aiTools: {
    chatgpt: {
      metadataTitle: "HTML von ChatGPT hosten und teilen",
      metadataDescription:
        "Laden Sie HTML, das von ChatGPT generiert wurde, bei Leme hoch und erhalten Sie in Sekunden einen öffentlichen teilbaren Link. Kein Hosting-Setup erforderlich.",
      ogTitle: "HTML von ChatGPT hosten — Leme",
      ogDescription: "Laden Sie ChatGPT-generiertes HTML hoch und teilen Sie es mit einem öffentlichen Link.",
      headline: "HTML von ChatGPT hosten und teilen",
      description:
        "ChatGPT kann komplette Landing Pages, Portfolios und Prototypen in einer einzelnen HTML-Datei schreiben. Laden Sie diese Datei bei Leme hoch und erhalten Sie einen öffentlichen Link, den Sie überall teilen können.",
      useCases: ["ChatGPT-Landing-Pages", "ChatGPT-Portfolios", "ChatGPT-Prototypen", "ChatGPT-One-Pager"],
      steps: [
        "Bitten Sie ChatGPT, eine komplette, einzelne HTML-Datei mit inline CSS zu generieren. Zum Beispiel: 'Erstelle eine responsive Landing Page für ein SaaS-Produkt in einer einzelnen HTML-Datei.'",
        "Kopieren Sie die vollständige HTML-Antwort und speichern Sie sie als page.html auf Ihrem Computer.",
        "Öffnen Sie Leme, ziehen Sie die Datei in das Upload-Formular und fügen Sie einen Titel sowie eine optionale Beschreibung hinzu.",
        "Klicken Sie auf Hochladen. Leme hostet die Seite und gibt Ihnen einen öffentlichen Link wie leme.app/p/xyz.",
        "Teilen Sie den Link mit Teamkollegen, Kunden oder in sozialen Medien. Besucher können auch Kommentare und Vorschläge hinterlassen.",
      ],
      schemaName: "So veröffentlichen Sie HTML von ChatGPT mit Leme",
      schemaDescription:
        "Schritt-für-Schritt-Anleitung zum Hochladen von ChatGPT-generiertem HTML bei Leme und zum Erhalten eines öffentlichen teilbaren Links.",
    },
    bolt: {
      metadataTitle: "HTML von Bolt hosten und teilen",
      metadataDescription:
        "Laden Sie HTML, das von Bolt generiert wurde, bei Leme hoch und erhalten Sie in Sekunden einen öffentlichen teilbaren Link. Teilen Sie Bolt-Prototypen und One-Pager ohne vollständiges Deployment.",
      ogTitle: "HTML von Bolt hosten — Leme",
      ogDescription: "Laden Sie Bolt-generiertes HTML hoch und teilen Sie es mit einem öffentlichen Link.",
      headline: "HTML von Bolt hosten und teilen",
      description:
        "Bolt erstellt Full-Stack-Apps aus Prompts. Exportieren Sie eine einzelne HTML-Seite oder einen Snapshot aus Ihrem Bolt-Projekt und laden Sie ihn bei Leme hoch, um sofort eine Live-Vorschau zu teilen.",
      useCases: ["Bolt-App-Vorschauen", "Bolt-Landing-Pages", "Bolt-Prototypen", "Bolt-teilbare Demos"],
      steps: [
        "Generieren Sie eine Seite oder App in Bolt. Wählen Sie einen einzelnen Screen oder eine Landing Page, die als eigenständige HTML-Datei exportiert werden kann.",
        "Kopieren oder exportieren Sie den HTML-Quellcode und speichern Sie ihn als page.html. Stellen Sie sicher, dass Styles und Scripts inline sind, damit die Datei allein funktioniert.",
        "Laden Sie die Datei bei Leme hoch und fügen Sie einen Titel und eine Beschreibung hinzu.",
        "Klicken Sie auf Hochladen, um einen öffentlichen Link wie leme.app/p/xyz zu erhalten.",
        "Teilen Sie den Link mit Stakeholdern. Diese können die Seite reviewen, kommentieren, Vorschläge machen oder forken.",
      ],
      schemaName: "So veröffentlichen Sie HTML von Bolt mit Leme",
      schemaDescription:
        "Schritt-für-Schritt-Anleitung zum Hochladen von Bolt-generiertem HTML bei Leme und zum Erhalten eines öffentlichen teilbaren Links.",
    },
    claude: {
      metadataTitle: "HTML von Claude hosten und teilen",
      metadataDescription:
        "Laden Sie HTML, das von Claude generiert wurde, bei Leme hoch und erhalten Sie in Sekunden einen öffentlichen teilbaren Link. Perfekt für Claude Artifacts und Prototypen.",
      ogTitle: "HTML von Claude hosten — Leme",
      ogDescription: "Laden Sie Claude-generiertes HTML hoch und teilen Sie es mit einem öffentlichen Link.",
      headline: "HTML von Claude hosten und teilen",
      description:
        "Claude, einschließlich Claude Artifacts, kann polierte HTML-Seiten und Komponenten generieren. Laden Sie sie bei Leme hoch, um sie öffentlich und teilbar zu machen — ohne Deployment.",
      useCases: ["Claude-Artifacts-Hosting", "Claude-Prototypen", "Claude-Landing-Pages", "Claude-Komponenten-Demos"],
      steps: [
        "Generieren Sie eine Seite oder ein Artifact in Claude. Bitten Sie um eine einzelne, in sich geschlossene HTML-Datei mit inline CSS und JavaScript.",
        "Wechseln Sie in der Claude-Artifact-Ansicht zur Code-Ansicht und kopieren Sie den vollständigen HTML-Quellcode.",
        "Speichern Sie den Code als page.html auf Ihrem Computer.",
        "Laden Sie die Datei bei Leme hoch, fügen Sie einen Titel hinzu und klicken Sie auf Hochladen.",
        "Kopieren Sie den öffentlichen Link und teilen Sie ihn. Reviewer können in der Seitenleiste Kommentare, Vorschläge oder Forks hinterlassen.",
      ],
      schemaName: "So veröffentlichen Sie HTML von Claude mit Leme",
      schemaDescription:
        "Schritt-für-Schritt-Anleitung zum Hochladen von Claude- oder Claude-Artifacts-generiertem HTML bei Leme und zum Erhalten eines öffentlichen teilbaren Links.",
    },
    gemini: {
      metadataTitle: "HTML von Gemini hosten und teilen",
      metadataDescription:
        "Laden Sie HTML, das von Google Gemini generiert wurde, bei Leme hoch und erhalten Sie in Sekunden einen öffentlichen teilbaren Link. Kein Hosting oder Build-Schritt erforderlich.",
      ogTitle: "HTML von Gemini hosten — Leme",
      ogDescription: "Laden Sie Gemini-generiertes HTML hoch und teilen Sie es mit einem öffentlichen Link.",
      headline: "HTML von Gemini hosten und teilen",
      description:
        "Gemini kann HTML-Seiten, Komponenten und kleine Web-Apps generieren. Laden Sie die generierte HTML-Datei bei Leme hoch und veröffentlichen Sie sie als Live-Seite mit teilbarem Link.",
      useCases: ["Gemini-Landing-Pages", "Gemini-Prototypen", "Gemini-Dashboards", "Gemini-One-Pager"],
      steps: [
        "Bitten Sie Gemini, eine komplette, einzelne HTML-Datei zu erstellen. Zum Beispiel: 'Erstelle eine responsive Portfolio-Seite in einer einzelnen HTML-Datei mit inline CSS.'",
        "Kopieren Sie das generierte HTML und speichern Sie es als page.html.",
        "Öffnen Sie Leme und laden Sie die Datei hoch. Fügen Sie einen Titel und eine optionale Beschreibung hinzu, damit Besucher die Seite verstehen.",
        "Klicken Sie auf Hochladen und erhalten Sie einen öffentlichen Link wie leme.app/p/xyz.",
        "Teilen Sie den Link. In der Seitenleiste können Besucher durch Kommentare, Vorschläge und Forks zusammenarbeiten.",
      ],
      schemaName: "So veröffentlichen Sie HTML von Gemini mit Leme",
      schemaDescription:
        "Schritt-für-Schritt-Anleitung zum Hochladen von Google Gemini-generiertem HTML bei Leme und zum Erhalten eines öffentlichen teilbaren Links.",
    },
    lovable: {
      metadataTitle: "HTML von Lovable hosten und teilen",
      metadataDescription:
        "Laden Sie HTML, das von Lovable generiert wurde, bei Leme hoch und erhalten Sie in Sekunden einen öffentlichen teilbaren Link. Veröffentlichen Sie Lovable-Apps als eigenständige Seiten.",
      ogTitle: "HTML von Lovable hosten — Leme",
      ogDescription: "Laden Sie Lovable-generiertes HTML hoch und teilen Sie es mit einem öffentlichen Link.",
      headline: "HTML von Lovable hosten und teilen",
      description:
        "Lovable baut Full-Stack-Apps und Seiten. Exportieren Sie einen einzelnen HTML-Snapshot aus Ihrem Lovable-Projekt und laden Sie ihn bei Leme hoch, um schnell eine öffentliche Vorschau zu erhalten.",
      useCases: ["Lovable-App-Vorschauen", "Lovable-Landing-Pages", "Lovable-Prototypen", "Lovable-teilbare Demos"],
      steps: [
        "Generieren Sie eine Seite oder App in Lovable. Konzentrieren Sie sich auf einen einzelnen Screen oder eine Landing Page, die als eigenständige HTML-Datei funktioniert.",
        "Exportieren oder kopieren Sie den HTML-Quellcode und speichern Sie ihn als page.html. CSS und JavaScript sollten inline sein, damit die Datei allein funktioniert.",
        "Laden Sie die Datei bei Leme hoch und füllen Sie Titel und Beschreibung aus.",
        "Klicken Sie auf Hochladen, um einen öffentlichen Link zu erhalten.",
        "Teilen Sie den Link mit Reviewern. Diese können Kommentare und Vorschläge hinterlassen, ohne Zugang zu Lovable zu brauchen.",
      ],
      schemaName: "So veröffentlichen Sie HTML von Lovable mit Leme",
      schemaDescription:
        "Schritt-für-Schritt-Anleitung zum Hochladen von Lovable-generiertem HTML bei Leme und zum Erhalten eines öffentlichen teilbaren Links.",
    },
    v0: {
      metadataTitle: "HTML von v0 hosten und teilen",
      metadataDescription:
        "Laden Sie HTML, das von v0 generiert wurde, bei Leme hoch und erhalten Sie in Sekunden einen öffentlichen teilbaren Link. Teilen Sie Ihre v0-Prototypen ohne ein vollständiges Deployment.",
      ogTitle: "HTML von v0 hosten — Leme",
      ogDescription: "Laden Sie v0-generiertes HTML hoch und teilen Sie es mit einem öffentlichen Link.",
      headline: "HTML von v0 hosten und teilen",
      description:
        "v0 generiert schöne React- und HTML-Komponenten. Exportieren Sie eine einzelne HTML-Datei aus v0 und laden Sie sie bei Leme hoch, um eine Live-Vorschau mit jedem zu teilen.",
      useCases: ["v0-Komponenten-Vorschauen", "v0-Landing-Pages", "v0-Prototypen", "v0-UI-Demos"],
      steps: [
        "Generieren Sie eine UI oder Seite in v0. Bitten Sie um eine einzelne, in sich geschlossene HTML-Datei, oder exportieren Sie den generierten Code und fassen Sie ihn zu einer HTML-Datei zusammen.",
        "Kopieren Sie den HTML-Quellcode und speichern Sie ihn als page.html.",
        "Laden Sie die Datei bei Leme hoch und fügen Sie einen klaren Titel und eine Beschreibung hinzu.",
        "Klicken Sie auf Hochladen, um einen öffentlichen Link zu erhalten.",
        "Teilen Sie den Link und sammeln Sie Feedback durch Kommentare, Vorschläge und Forks.",
      ],
      schemaName: "So veröffentlichen Sie HTML von v0 mit Leme",
      schemaDescription:
        "Schritt-für-Schritt-Anleitung zum Hochladen von v0-generiertem HTML bei Leme und zum Erhalten eines öffentlichen teilbaren Links.",
    },
  },
  useCases: {
    metadataDescription:
      "Entdecken Sie, wie Teams und Creator Leme nutzen, um KI-generierte HTML-Seiten für Landing Pages, Portfolios, Prototypen, Dashboards und mehr zu veröffentlichen und zu teilen.",
    metadataOpenGraphTitle: "Leme-Anwendungsfälle — KI-generiertes HTML für jedes Projekt veröffentlichen",
    title: "Was kannst du mit Leme veröffentlichen?",
    subtitle: "Jede KI-generierte HTML-Datei wird zu einer live, teilbaren Seite. Hier sind die häufigsten Anwendungsfälle für Leme.",
    ctaTitle: "Hast du bereits eine HTML-Datei bereit?",
    ctaSubtitle: "Lade sie jetzt hoch und erhalte in Sekunden einen teilbaren Link.",
    ctaButton: "HTML hochladen",
    items: [
      {
        title: "Landing Pages",
        description:
          "Generieren Sie mit einem KI-Coding-Assistenten eine komplette Marketing-Landing-Page, laden Sie sie bei Leme hoch und teilen Sie den Link in Sekunden mit Ihrem Team, Kunden oder Stakeholdern.",
        keywords: ["KI-Landing-Page", "Landing Page teilen", "HTML-Landing-Page hosten"],
      },
      {
        title: "Portfolios",
        description:
          "Verwandeln Sie eine einzelne HTML-Datei aus einem Design-Experiment oder persönlichen Projekt in ein live Portfolio. Perfekt für Designer, Entwickler und Studierende, die schnell eine öffentliche Demo brauchen.",
        keywords: ["KI-Portfolio", "Portfolio-HTML teilen", "Portfolio online hosten"],
      },
      {
        title: "Prototypen und MVPs",
        description:
          "Bauen Sie mit KI einen interaktiven Prototypen, veröffentlichen Sie ihn auf Leme und sammeln Sie Feedback durch Kommentare und Vorschläge — ohne eine vollständige Deployment-Pipeline einzurichten.",
        keywords: ["KI-Prototyp", "HTML-Prototyp-Hosting", "MVP teilen"],
      },
      {
        title: "Dashboards",
        description:
          "Veröffentlichen Sie KI-generiertes Dashboard-HTML mit Diagrammen und Tabellen, damit Teamkollegen Layout und Interaktionen previewen können, ohne dass Backend oder Datenbank verbunden sein müssen.",
        keywords: ["KI-Dashboard", "HTML-Dashboard-Hosting", "Dashboard teilen"],
      },
      {
        title: "Newsletter und One-Pager",
        description:
          "Erstellen Sie mit KI eine schöne One-Page-E-Mail oder Ankündigung, hosten Sie sie auf Leme und teilen Sie den Link in Ihrem Newsletter, in sozialen Medien oder im Chat.",
        keywords: ["KI-One-Pager", "HTML-Newsletter-Hosting", "One-Page-Site teilen"],
      },
      {
        title: "Formulare und Micro-Apps",
        description:
          "Laden Sie kleine HTML-Formulare, Rechner oder interaktive Widgets, die von KI generiert wurden, mit einem direkten Link hoch. Ideal für schnelle Experimente und User-Tests.",
        keywords: ["KI-Formular-Hosting", "HTML-Micro-App", "HTML-Formular teilen"],
      },
      {
        title: "Dokumentation und Demos",
        description:
          "Veröffentlichen Sie technische Dokumentationsseiten, Komponenten-Demos oder Styleguides, die aus KI-Prompts generiert wurden, damit Ihr Team eine Live-Referenz zum Reviewen und Diskutieren hat.",
        keywords: ["KI-Dokumentation", "HTML-Demo-Hosting", "Dokumentation teilen"],
      },
      {
        title: "Event- und Kampagnenseiten",
        description:
          "Generieren Sie mit KI eine saisonale Kampagne oder Event-Seite und veröffentlichen Sie sie sofort. Aktualisieren Sie durch Forken der Seite und Teilen der neuen Version.",
        keywords: ["KI-Kampagnenseite", "Event-Page-Hosting", "Kampagnen-HTML teilen"],
      },
    ],
  },
  blogPosts: {
    howToPublish: {
      metadataTitle: "So veröffentlichst du HTML aus ChatGPT, Claude und Gemini",
      metadataDescription:
        "Lerne, wie du HTML aus ChatGPT, Claude, Gemini und anderen KI-Coding-Assistenten exportierst und mit Leme online veröffentlichst.",
      ogTitle: "So veröffentlichst du HTML aus ChatGPT, Claude und Gemini",
      ogDescription: "Schritt-für-Schritt-Anleitung zum Exportieren von KI-generiertem HTML und Teilen mit einem öffentlichen Link.",
      title: "So veröffentlichst du HTML aus ChatGPT, Claude und Gemini",
      subtitle:
        "Eine Schritt-für-Schritt-Anleitung zum Exportieren von HTML aus beliebten KI-Coding-Assistenten und zum Online-Veröffentlichen mit einem teilbaren Link.",
      ctaTitle: "Jetzt ausprobieren",
      ctaSubtitle: "Lade eine HTML-Datei hoch und erhalte in Sekunden einen teilbaren Link.",
      sections: [
        {
          type: "paragraph",
          content:
            "KI-Coding-Assistenten können in Sekunden komplette HTML-Seiten generieren. Das Problem ist das Teilen. Die meisten fügen den Code in eine lokale Datei ein, öffnen sie im Browser und senden einen Screenshot. Das funktioniert für einen schnellen Blick, aber es ist kein echter teilbarer Link.",
        },
        { type: "heading", content: "Der einfachste Workflow" },
        {
          type: "list",
          items: [
            "Bitten Sie die KI um eine einzelne HTML-Datei. Zum Beispiel: 'Erstelle eine Landing Page für einen Coffee-Shop in einer einzelnen HTML-Datei mit inline CSS.'",
            "Kopieren Sie den generierten HTML-Code.",
            "Speichern Sie ihn als page.html auf Ihrem Computer.",
            "Gehen Sie zum Leme-Upload und wählen Sie die Datei aus.",
            "Fügen Sie einen Titel und eine optionale Beschreibung hinzu.",
            "Klicken Sie auf Hochladen. Sie erhalten einen öffentlichen Link wie leme.app/p/xyz.",
          ],
        },
        { type: "heading", content: "ChatGPT" },
        {
          type: "paragraph",
          content:
            "In ChatGPT bitten Sie um eine komplette HTML-Datei. Ist die Ausgabe zu lang, bitten Sie es fortzusetzen. Sobald Sie den vollständigen Code haben, speichern Sie ihn als .html und laden Sie ihn bei Leme hoch. ChatGPT Code Interpreter kann HTML-Dateien auch direkt generieren, wenn Sie ihn bitten, die Datei zu schreiben und zu exportieren.",
        },
        { type: "heading", content: "Claude" },
        {
          type: "paragraph",
          content:
            "Claude Artifacts können HTML- und React-Komponenten rendern. Wenn Claude ein Artifact anzeigt, klicken Sie auf die Code-Ansicht, kopieren Sie das HTML und speichern Sie es. Leme hostet genau dieses HTML und macht es für jeden teilbar.",
        },
        { type: "heading", content: "Gemini" },
        {
          type: "paragraph",
          content:
            "Gemini kann HTML-Snippets in seiner Antwort generieren. Bitten Sie um eine einzelne, in sich geschlossene HTML-Datei mit inline Styles. Kopieren Sie das Ergebnis, speichern Sie es und laden Sie es bei Leme hoch.",
        },
        { type: "heading", content: "Andere Tools" },
        {
          type: "paragraph",
          content:
            "Der gleiche Workflow funktioniert für v0, Lovable, Bolt, Replit Agent und jedes andere Tool, das eine einzelne HTML-Datei erzeugt. Exportiert das Tool ein ZIP oder mehrere Dateien, fassen Sie zuerst CSS und JavaScript in die HTML-Datei zusammen und laden Sie dann hoch.",
        },
        { type: "heading", content: "Was Leme so nützlich macht" },
        {
          type: "list",
          items: [
            "Kein Hosting-Setup.",
            "Sofortiger öffentlicher Link.",
            "Funktioniert auf Desktop und Mobil.",
            "Besucher können Kommentare und Vorschläge hinterlassen.",
            "Kostenlos testen; Pro für unbegrenzte Seiten und kein Wasserzeichen.",
          ],
        },
      ],
    },
    shareLandingPage: {
      metadataTitle: "So teilst du eine KI-generierte Landing Page in 30 Sekunden",
      metadataDescription:
        "Verwandle einen Prompt in eine live Landing Page. Lade das KI-generierte HTML bei Leme hoch und sende den Link an jeden.",
      ogTitle: "So teilst du eine KI-generierte Landing Page in 30 Sekunden",
      ogDescription: "Vom Prompt zum öffentlichen Link in unter einer Minute mit Leme.",
      title: "So teilst du eine KI-generierte Landing Page in 30 Sekunden",
      subtitle: "Vom Prompt zum öffentlichen Link in unter einer Minute. Kein Deployment, kein Hosting-Konto, kein Build-Schritt.",
      ctaTitle: "Erstelle deine Landing Page",
      ctaSubtitle: "Lade dein KI-generiertes HTML hoch und erhalte in Sekunden einen Link.",
      sections: [
        {
          type: "paragraph",
          content:
            "Landing Pages sind einer der besten Anwendungsfälle für KI-Coding-Assistenten. Sie beschreiben Ihr Produkt, die KI schreibt den Text, wählt Farben und baut ein responsive Layout. Das einzige fehlende Stück ist eine öffentliche URL.",
        },
        { type: "heading", content: "Der 30-Sekunden-Workflow" },
        {
          type: "list",
          items: [
            "Prompten Sie die KI: 'Erstelle eine responsive Landing Page für ein SaaS, das hilft, KI-generiertes HTML zu teilen. Einzelne HTML-Datei, inline CSS, modernes Design.'",
            "Speichern Sie die Antwort als landing.html.",
            "Öffnen Sie den Leme-Upload.",
            "Ziehen Sie die Datei hinein, fügen Sie einen Titel hinzu und klicken Sie auf Hochladen.",
            "Kopieren Sie den öffentlichen Link und teilen Sie ihn.",
          ],
        },
        { type: "heading", content: "Warum das besser ist als andere Optionen" },
        {
          type: "list",
          items: [
            "GitHub Pages erfordert ein Repository und einen Commit.",
            "Netlify Drop ist großartig für Ordner, aber overkill für eine einzelne Datei.",
            "Vercel ist für Frameworks gebaut, nicht für einfache HTML-Dateien.",
            "Leme ist genau dafür gemacht: eine HTML-Datei, ein öffentlicher Link.",
          ],
        },
        { type: "heading", content: "Mit Kontext teilen" },
        {
          type: "paragraph",
          content:
            "Wenn Sie einen Leme-Link teilen, können Besucher die Seitenleiste öffnen, um Titel, Beschreibung und sogar Kommentare zu hinterlassen. Das macht es perfekt für frühes Feedback, Kunden-Reviews und Team-Zusammenarbeit.",
        },
        { type: "heading", content: "Für immer online halten" },
        {
          type: "paragraph",
          content:
            "Kostenlose und anonyme Seiten laufen nach einer Weile ab. Wenn Sie eine Landing Page ohne Wasserzeichen dauerhaft online halten möchten, upgraden Sie auf Leme Pro für unbegrenzte Seiten und permanentes Hosting.",
        },
      ],
    },
    collectFeedback: {
      metadataTitle: "Der beste Weg, Feedback zu HTML-Prototypen zu sammeln",
      metadataDescription:
        "Warum Kommentare, Vorschläge und Forks Leme zu einem leichten Feedback-Tool für KI-generierte HTML-Prototypen machen.",
      ogTitle: "Der beste Weg, Feedback zu HTML-Prototypen zu sammeln",
      ogDescription: "Sammeln Sie Kommentare, Vorschläge und Forks zu KI-generierten HTML-Prototypen mit Leme.",
      title: "Der beste Weg, Feedback zu HTML-Prototypen zu sammeln",
      subtitle:
        "Warum Kommentare, Vorschläge und Forks Leme zu einem leichten Feedback-Tool für KI-generierte Prototypen machen.",
      ctaTitle: "Feedback sammeln",
      ctaSubtitle: "Lade deinen Prototypen hoch und teile ihn mit deinem Team.",
      sections: [
        {
          type: "paragraph",
          content:
            "Prototypen sind zum Reviewen da. Aber wenn Sie eine HTML-Datei per E-Mail oder Slack teilen, bekommen Sie vages Feedback wie 'sieht gut aus' oder 'ändere das Blau.' Leme verwandelt eine statische Datei in eine kollaborative Review-Oberfläche.",
        },
        { type: "heading", content: "Drei Arten von Feedback" },
        {
          type: "list",
          items: [
            "Kommentare: Allgemeine Gedanken und Reaktionen zur ganzen Seite oder einer bestimmten Idee.",
            "Vorschläge: Konkrete Änderungsvorschläge wie 'Headline vergrößern' oder 'Pricing-Bereich hinzufügen.'",
            "Forks: Ein Mitwirkender kann eine Kopie der Seite erstellen, sie bearbeiten und die neue Version zurückteilen. Das ist das nächste, was es für eine KI-generierte Seite an einen Pull Request gibt.",
          ],
        },
        { type: "heading", content: "So nutzt du es" },
        {
          type: "list",
          items: [
            "Generieren Sie Ihren Prototypen mit einem KI-Assistenten.",
            "Laden Sie ihn bei Leme hoch.",
            "Teilen Sie den Link mit Reviewern.",
            "Reviewer öffnen die Seitenleiste und fügen Kommentare oder Vorschläge hinzu.",
            "Für größere Änderungen bitten Sie einen Reviewer, die Seite zu forken und weiterzuentwickeln.",
          ],
        },
        { type: "heading", content: "Wann Leme statt Figma oder GitHub nutzen" },
        {
          type: "paragraph",
          content:
            "Figma ist großartig für Design, und GitHub ist großartig für Code. Leme liegt dazwischen: Die Seite ist bereits live HTML, aber Sie brauchen noch schnelles Feedback, bevor Sie sich für ein vollständiges Deployment entscheiden. Es ist ideal für Side-Projects, Kunden-Previews und einmalige Experimente, die mit KI generiert wurden.",
        },
        { type: "heading", content: "Eine Historie behalten" },
        {
          type: "paragraph",
          content:
            "Da jede Seite ihre eigene URL hat, können Sie Version A, dann Version B, dann Version C teilen. Jeder Link ist ein Snapshot. Reviewer können sie einfach vergleichen, und Sie können die beste als finale Version behalten.",
        },
      ],
    },
  },
  terms: {
    metadataTitle: "Nutzungsbedingungen",
    metadataDescription: "Nutzungsbedingungen für die Nutzung von Leme.",
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: August 2026",
    sections: [
      {
        title: "1. Annahme der Bedingungen",
        paragraphs: [
          "Durch den Zugriff auf oder die Nutzung von Leme erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie nicht einverstanden sind, nutzen Sie den Dienst bitte nicht.",
        ],
      },
      {
        title: "2. Beschreibung des Dienstes",
        paragraphs: [
          "Leme ist eine Plattform, die es Nutzern ermöglicht, HTML-Dateien hochzuladen, teilbare Links zu generieren und durch Kommentare, Vorschläge und Forks zusammenzuarbeiten.",
        ],
      },
      {
        title: "3. Nutzerinhalte",
        paragraphs: [
          "Sie behalten das Eigentum an allen Inhalten, die Sie hochladen. Durch das Hochladen gewähren Sie Leme eine eingeschränkte Lizenz, diese Inhalte nach Bedarf zu hosten, anzuzeigen und zu teilen, um den Dienst bereitzustellen.",
          "Sie sind allein verantwortlich für die von Ihnen hochgeladenen Inhalte. Laden Sie keine Inhalte hoch, die illegal, schädlich, urheberrechtlich verletzend oder Rechte anderer verletzend sind.",
        ],
      },
      {
        title: "4. Untersagte Nutzung",
        paragraphs: [
          "Sie dürfen Leme nicht verwenden, um Malware, Phishing-Seiten, Spam oder Inhalte zu verbreiten, die geltende Gesetze oder Vorschriften verletzen.",
        ],
      },
      {
        title: "5. Bezahlte Abonnements",
        paragraphs: [
          "Leme bietet kostenlose und kostenpflichtige Pläne an. Bezahlte Abonnements werden über Stripe abgerechnet und können jederzeit in Ihren Abrechnungseinstellungen gekündigt werden.",
        ],
      },
      {
        title: "6. Kündigung",
        paragraphs: [
          "Wir behalten uns das Recht vor, Konten, die gegen diese Bedingungen verstoßen oder den Dienst missbrauchen, zu sperren oder zu kündigen.",
        ],
      },
      {
        title: "7. Änderungen der Bedingungen",
        paragraphs: [
          "Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Die weitere Nutzung des Dienstes nach Änderungen gilt als Annahme der aktualisierten Bedingungen.",
        ],
      },
      {
        title: "8. Kontakt",
        paragraphs: [
          "Bei Fragen zu diesen Bedingungen kontaktieren Sie uns bitte über unsere Kontaktseite.",
        ],
      },
    ],
  },
  privacy: {
    metadataTitle: "Datenschutzerklärung",
    metadataDescription: "Datenschutzerklärung für Leme-Nutzer.",
    title: "Datenschutzerklärung",
    lastUpdated: "Zuletzt aktualisiert: August 2026",
    sections: [
      {
        title: "1. Informationen, die wir sammeln",
        paragraphs: [
          "Wenn Sie Leme nutzen, können wir Informationen sammeln, die Sie direkt angeben, wie Ihre E-Mail-Adresse bei der Anmeldung, sowie anonyme Kennungen, wenn Sie ohne Konto hochladen.",
        ],
      },
      {
        title: "2. Hochgeladene Inhalte",
        paragraphs: [
          "Die von Ihnen hochgeladenen HTML-Dateien werden sicher gespeichert, damit wir sie über teilbare Links ausliefern können. Wir scannen oder verwenden den Inhalt Ihrer Uploads nicht für Werbezwecke.",
        ],
      },
      {
        title: "3. Authentifizierung",
        paragraphs: [
          "Leme verwendet Firebase Authentication für die Anmeldung. Wir speichern eine eindeutige Benutzerkennung und Ihre E-Mail-Adresse, wenn Sie sich authentifizieren.",
        ],
      },
      {
        title: "4. Zahlungen",
        paragraphs: [
          "Zahlungen werden über Stripe abgewickelt. Wir speichern Ihre Zahlungskartendaten nicht. Stripe kann unter seiner eigenen Datenschutzerklärung Informationen sammeln, die für die Zahlungsabwicklung erforderlich sind.",
        ],
      },
      {
        title: "5. Cookies und Analysen",
        paragraphs: [
          "Wir verwenden essenzielle Cookies, um Sie angemeldet zu halten und anonyme Uploads in Ihrem Browser zu speichern. Wir verwenden keine Cookies von Drittanbietern für Werbung.",
        ],
      },
      {
        title: "6. Aufbewahrung von Daten",
        paragraphs: [
          "Hochgeladene Seiten werden gemäß Ihres Plans aufbewahrt. Kostenlose und anonyme Seiten laufen nach der Aufbewahrungsfrist des Plans ab. Pro-Seiten werden aufbewahrt, solange Ihr Abonnement aktiv ist.",
        ],
      },
      {
        title: "7. Ihre Rechte",
        paragraphs: [
          "Sie können Ihre hochgeladenen Seiten jederzeit löschen. Wenn Sie Fragen zu Ihren Daten haben, kontaktieren Sie uns über unsere Kontaktseite.",
        ],
      },
      {
        title: "8. Änderungen dieser Richtlinie",
        paragraphs: [
          "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wesentliche Änderungen werden auf dieser Seite veröffentlicht.",
        ],
      },
    ],
  },
  login: {
    title: "Anmelden",
    subtitle: "Melde dich an, um deine Uploads und teilbaren Links zu verwalten.",
    googleSignIn: "Mit Google anmelden",
    googleSignInLoading: "Google wird geöffnet...",
    or: "oder",
    magicLink: "Magic Link",
    emailAndPassword: "E-Mail und Passwort",
    emailLabel: "E-Mail",
    emailPlaceholder: "du@beispiel.de",
    passwordLabel: "Passwort",
    passwordPlaceholder: "••••••••",
    sendMagicLink: "Magic Link senden",
    sending: "Wird gesendet...",
    signIn: "Anmelden",
    createAccount: "Konto erstellen",
    pleaseWait: "Bitte warten...",
    noAccount: "Noch kein Konto? Erstelle jetzt eines",
    hasAccount: "Bereits ein Konto? Anmelden",
    magicLinkSent: "Magic Link gesendet! Prüfe deinen Posteingang, um fortzufahren.",
  },
  auth: {
    codeErrorTitle: "Wir konnten deine Anmeldung nicht bestätigen",
    codeErrorSubtitle:
      "Der Link ist möglicherweise abgelaufen oder bereits verwendet worden. Bitte versuche es erneut.",
    codeErrorCta: "Zurück zur Anmeldung",
    callbackConfirming: "Anmeldung wird bestätigt...",
    callbackEmailPrompt: "Bestätige deine E-Mail-Adresse, um die Anmeldung abzuschließen",
    callbackError: "Dieser Link ist möglicherweise abgelaufen oder bereits verwendet worden.",
  },
  uploadLanding: {
    title: "Lade dein HTML hoch",
    savedFile: "Deine gespeicherte Datei",
    savedFiles: "Deine gespeicherten Dateien",
    noAccount:
      "Kein Konto? Kein Problem — dein Upload bleibt in diesem Browser gespeichert und ist später unter {link} erreichbar.",
    myUploads: "Meine Uploads",
  },
  uploadForm: {
    fileLabel: "HTML-Datei (.html, bis 2MB)",
    titleLabel: "Titel",
    titlePlaceholder: "Z.B.: Mit GPT generierte Landing Page",
    descriptionLabel: "Beschreibung (optional)",
    descriptionPlaceholder: "Erzähle uns ein wenig über dieses HTML...",
    uploading: "Wird hochgeladen...",
    upload: "Hochladen",
    errors: {
      notHtml: "Wähle eine .html-Datei aus.",
      tooLarge: "Die Datei darf maximal 2MB groß sein.",
      noFile: "Wähle eine .html-Datei zum Hochladen aus.",
      generic: "Verbindungsfehler beim Hochladen der Datei.",
    },
  },
  planUpsell: {
    usage: "{active}/{max} aktive Seiten verwendet.",
    atLimit: "Du hast das Limit von {max} aktiver Seite(n) erreicht.",
    description: "Pro entfernt das Limit, entfernt das Wasserzeichen und Seiten laufen nie ab.",
    cta: "Upgrade auf Pro",
  },
  planLabels: {
    anonymous: "Anonym",
    free: "Kostenlos",
    pro: "Pro",
  },
  expiredNotice: {
    title: "Diese Seite ist abgelaufen",
    description:
      "Der Plan des Autors begrenzt, wie lange eine Seite online bleibt. Wenn du der Autor bist, upgrade auf Pro, damit deine Seiten nicht ablaufen.",
    cta: "Zurück zur Startseite",
  },
  uploadsMenu: {
    title: "Deine Uploads",
    empty: "Du hast noch keine anderen Uploads.",
    views: "{count} Aufrufe",
    viewingNow: "gerade angesehen",
    deleteLabel: "Upload löschen",
    deleteConfirm: "\"{title}\" löschen? Die Seite, ihr Link und ihre Kommentare sind endgültig weg.",
    deleteError: "Upload konnte nicht gelöscht werden.",
    deleteTitle: "Diesen Upload löschen?",
    deleteCta: "Löschen",
    cancel: "Abbrechen",
  },
  billing: {
    title: "Abrechnung",
    subtitle: "Verwalte deinen Plan, Abrechnungszeitraum und Rechnungen.",
    subscription: {
      title: "Abonnement",
      freePlan: "Du bist im Kostenlosen-Plan. Upgrade auf Pro, um deine Seiten dauerhaft online zu halten und das Wasserzeichen zu entfernen.",
      viewPlans: "Pläne ansehen",
      proTitle: "Pro-Plan",
      billedAnnually: "Jährlich abgerechnet",
      billedMonthly: "Monatlich abgerechnet",
      statusActive: "Aktiv",
      statusCancelsSoon: "Läuft bald ab",
      currentPeriodEnds: "Aktuelle Periode endet",
      billingInterval: "Abrechnungsintervall",
      intervalYearly: "Jährlich",
      intervalMonthly: "Monatlich",
      cancelWarning:
        "Dein Pro-Plan ist zum Ende der aktuellen Abrechnungsperiode zur Kündigung vorgesehen. Du kannst ihn vorher fortsetzen, um die Vorteile zu behalten.",
      syncing: "Abonnementdetails werden synchronisiert...",
    },
    invoices: {
      title: "Rechnungsverlauf",
      loading: "Rechnungen werden geladen...",
      error: "Rechnungen konnten nicht geladen werden.",
      empty: "Noch keine Rechnungen.",
      invoice: "Rechnung",
      view: "Ansehen",
      statusPaid: "bezahlt",
    },
    actions: {
      manageBilling: "Abrechnung verwalten",
      manageBillingLoading: "Wird geöffnet...",
      cancelSubscription: "Abonnement kündigen",
      cancelling: "Kündigen...",
      cancelConfirm:
        "Bist du sicher, dass du deinen Pro-Plan kündigen möchtest? Du behältst den Zugang bis zum Ende der aktuellen Abrechnungsperiode.",
      cancelConfirmTitle: "Pro-Abo kündigen?",
      cancelKeep: "Plan behalten",
      cancelError: "Abonnement konnte nicht gekündigt werden.",
      upgradeToAnnual: "Auf jährlich upgraden",
      upgrading: "Checkout wird geöffnet...",
      upgradeError: "Upgrade konnte nicht gestartet werden.",
    },
  },
  pageViewer: {
    pageLink: "Seitenlink",
    views: "{count} Aufrufe",
    uploadedOn: "hochgeladen am {date}",
    sourceNote: "über geteilten Link",
    reopenLabel: "Mitarbeiten",
  },
  collapsibleSidebar: {
    show: "Seitenleiste anzeigen",
    hide: "Seitenleiste ausblenden",
  },
  copyLink: {
    copy: "Kopieren",
    copied: "Kopiert!",
  },
  contributions: {
    typeComment: "Kommentar",
    typeSuggestion: "Vorschlag",
    typeFork: "Fork",
    authorPlaceholder: "Dein Name (optional)",
    forkTitlePlaceholder: "Fork-Titel",
    forkHtmlLabel: "HTML vor dem Erstellen des Forks bearbeiten:",
    commentPlaceholder: "Kommentar hinterlassen...",
    suggestionPlaceholder: "Beschreibe deinen Vorschlag...",
    forkMessagePlaceholder: "Nachricht zu diesem Fork (optional)",
    submit: "Absenden",
    createFork: "Fork erstellen",
    submitting: "Wird gesendet...",
    emptyState: "Noch keine Beiträge. Sei der Erste!",
    viewFork: "Fork ansehen →",
    error: "Verbindungsfehler beim Senden des Beitrags.",
    forkOf: "Fork von {title}",
    forkDisabledHint: "Forks sind für diese Seite deaktiviert.",
  },
  forkEditor: {
    title: "Fork von {title}",
    subtitle: "Bearbeite das HTML mit Syntax-Highlighting und Live-Vorschau, bevor du den Fork erstellst.",
    close: "Editor schließen",
    htmlTab: "HTML",
    previewTab: "Vorschau",
    editTitle: "Fork-Titel",
    authorLabel: "Dein Name",
    messageLabel: "Nachwort zum Fork (optional)",
    iconLabel: "Seitensymbol",
    iconEmoji: "Emoji",
    iconText: "Text",
    iconColor: "Hintergrundfarbe",
    cancel: "Abbrechen",
    next: "Weiter",
    back: "Zurück",
    createFork: "Fork erstellen",
    creating: "Wird erstellt...",
    openEditor: "HTML-Editor öffnen",
  },
  shareButton: {
    share: "Teilen",
    generating: "Wird generiert...",
    error: "Verbindungsfehler beim Erstellen des Links.",
  },
  meta: {
    loginTitle: "Anmelden",
    loginDescription:
      "Melde dich bei Leme an, um deine hochgeladenen HTML-Seiten und teilbaren Links zu verwalten.",
    mineTitle: "Meine Uploads",
    mineDescription: "Sieh dir deine anonymen Uploads bei Leme an.",
    dashboardTitle: "Dashboard",
    dashboardDescription:
      "Verwalte deine hochgeladenen HTML-Seiten und teilbaren Links bei Leme.",
    billingTitle: "Abrechnung",
    billingDescription:
      "Verwalte dein Leme-Pro-Abo, den Abrechnungszeitraum und deine Rechnungen.",
    newTitle: "HTML hochladen",
    newDescription:
      "Lade eine KI-generierte HTML-Datei bei Leme hoch und erhalte einen teilbaren Link.",
    pageNotFound: "Seite nicht gefunden",
    sharedPageNotFound: "Geteilte Seite nicht gefunden",
    untitledPage: "Geteilte Seite",
    viewPageDescription: "{title} bei Leme ansehen.",
  },
  pageMemory: {
    title: "Shared memory",
    loading: "Loading shared memory...",
    error: "Could not load shared memory.",
    empty: "No data stored yet. Open this page and edit a field to see it here.",
    filterPlaceholder: "Filter keys or values...",
    exportCsv: "Export CSV",
  },
  newMemoryAlert: {
    message: "New data has been added to this page.",
    reload: "Reload",
    dismiss: "Dismiss",
  },
  pageSettings: {
    title: "Seiteneinstellungen",
    proOnly: "Pro",
    contributions: "Beiträge zulassen",
    contributionsHint: "Besucher können kommentieren und Änderungen vorschlagen.",
    forks: "Forks zulassen",
    forksHint: "Besucher können diese Seite forken und ihre eigene Version teilen.",
    branding: "Leme-Header anzeigen",
    brandingHint: "Die Leme-Leiste bleibt über deiner Seite sichtbar.",
    saving: "Wird gespeichert...",
    error: "Einstellungen konnten nicht gespeichert werden.",
  },
  authErrors: {
    invalidEmail: "Diese E-Mail-Adresse scheint ungültig zu sein.",
    userDisabled: "Dieses Konto wurde deaktiviert.",
    userNotFound: "Kein Konto mit dieser E-Mail-Adresse gefunden.",
    wrongPassword: "Falsche E-Mail-Adresse oder Passwort.",
    invalidCredential: "Falsche E-Mail-Adresse oder Passwort.",
    emailAlreadyInUse: "Es gibt bereits ein Konto mit dieser E-Mail-Adresse. Melde dich stattdessen an.",
    weakPassword: "Wähle ein Passwort mit mindestens 6 Zeichen.",
    tooManyRequests: "Zu viele Versuche. Warte einen Moment und versuche es erneut.",
    networkRequestFailed: "Server konnte nicht erreicht werden. Überprüfe deine Verbindung.",
    popupBlocked: "Dein Browser hat das Anmelde-Popup blockiert. Erlaube Popups und versuche es erneut.",
    unauthorizedDomain: "Diese Domain ist in Firebase nicht autorisiert. Füge sie unter Authentication > Settings > Authorized domains hinzu.",
    operationNotAllowed: "Diese Anmeldemethode ist deaktiviert. Aktiviere sie unter Authentication > Sign-in method in der Firebase-Konsole.",
    accountExistsWithDifferentCredential: "Du hast bereits ein Konto mit dieser E-Mail-Adresse über eine andere Anmeldemethode. Melde dich zuerst auf diesem Weg an.",
    default: "Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es erneut.",
    connectionError: "Verbindung konnte nicht hergestellt werden. Überprüfe deine Internetverbindung und versuche es erneut.",
  },
};
