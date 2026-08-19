import type { Dictionary } from "./en";

export const fr: Dictionary = {
  site: {
    name: "Leme",
    tagline: "Téléchargez du HTML généré par l'IA et partagez-le avec un lien",
    description:
      "Téléchargez des fichiers HTML générés par l'IA et partagez-les avec n'importe qui via un lien. Collaborez avec des commentaires, des suggestions et des forks.",
  },
  nav: {
    plans: "Forfaits",
    blog: "Blog",
    myFiles: "Mes fichiers",
    newUpload: "Nouvel envoi",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
  },
  home: {
    heroBadge: "HTML généré par l'IA, prêt à être partagé",
    heroTitle: "Transformez ce que vous construisez avec l'IA en pages que tout le monde peut ouvrir",
    heroDescription:
      "Téléchargez le HTML généré par votre outil d'IA préféré, obtenez un lien partageable en quelques secondes et laissez les gens commenter, suggérer des modifications ou faire un fork.",
    ctaUpload: "Télécharger votre HTML",
    ctaPlans: "Voir les forfaits",
    heroNote: "Aucun compte nécessaire pour essayer — les pages téléchargées sans connexion restent enregistrées dans ce navigateur.",
    featureUpload: "Télécharger",
    featureUploadDesc: "Glissez n'importe quel fichier .html jusqu'à 2 Mo — pas de build, pas de configuration.",
    featureShare: "Partager",
    featureShareDesc: "Chaque téléchargement obtient sa propre page et son lien, prêt à être envoyé.",
    featureCollaborate: "Collaborer",
    featureCollaborateDesc: "Les visiteurs peuvent commenter, suggérer des modifications ou faire un fork de votre page.",
    featureControl: "Garder le contrôle",
    featureControlDesc: "Le plan gratuit a des limites et un filigrane ; Pro supprime les deux.",
    howTitle: "Comment ça marche",
    howSubtitle: "D'un prompt IA à un lien public en quatre étapes.",
    step1: "Générer",
    step1Desc: "Demandez à ChatGPT, Claude, Gemini ou tout autre assistant IA un seul fichier HTML.",
    step2: "Enregistrer",
    step2Desc: "Copiez le code HTML et enregistrez-le sous forme de fichier .html sur votre ordinateur.",
    step3: "Télécharger",
    step3Desc: "Glissez le fichier dans Leme et ajoutez un titre et une description.",
    step4: "Partager",
    step4Desc: "Obtenez un lien public comme leme.app/p/xyz et partagez-le où vous voulez.",
    toolsTitle: "Fonctionne avec vos outils d'IA préférés",
    toolsSubtitle: "Téléchargez du HTML généré par les assistants de code et les constructeurs d'applications les plus populaires.",
    finalTitle: "Prêt à partager ce que vous avez construit ?",
    finalSubtitle: "Ça prend moins d'une minute — aucune inscription requise pour commencer.",
  },
  footer: {
    product: "Produit",
    resources: "Ressources",
    social: "Social",
    features: "Fonctionnalités",
    pricing: "Tarifs",
    useCases: "Cas d'usage",
    about: "À propos",
    blog: "Blog",
    faq: "FAQ",
    terms: "Conditions",
    privacy: "Confidentialité",
    contact: "Contact",
    rights: "Tous droits réservés.",
    madeFor: "Conçu pour le HTML généré par l'IA.",
  },
  pricing: {
    title: "Forfaits simples, sans surprises",
    subtitle:
      "Utilisez sans créer de compte pour tester rapidement, créez un compte gratuit pour conserver plus de pages, ou passez à Pro pour tout garder en ligne sans limite.",
    noAccount: {
      name: "Sans compte",
      price: "$0",
      description: "Pour tester rapidement, sans inscription.",
      features: {
        pages: "{count} page active à la fois",
        expires: "Expire dans {days} jours",
        watermark: "Avec filigrane",
      },
      cta: "Utiliser maintenant",
    },
    free: {
      name: "Gratuit",
      price: "$0",
      description: "Créez un compte et obtenez plus d'espace.",
      features: {
        pages: "{count} pages actives en même temps",
        expires: "Expire dans {days} jours",
        watermark: "Avec filigrane",
      },
      cta: "Créer un compte gratuit",
    },
    pro: {
      name: "Pro",
      description: "Pour ceux qui veulent garder des pages en ligne sans limite.",
      monthly: "Mensuel",
      yearly: "Annuel",
      priceUnitMonth: "mois",
      priceUnitYear: "an",
      yearlySavings: "2 mois gratuits par rapport au paiement mensuel",
      features: ["Pages actives illimitées", "N'expire jamais", "Pas de filigrane"],
      cta: "Passer à Pro",
      ctaLoading: "Redirection...",
    },
    footerNote: "Les paiements sont traités en toute sécurité par Stripe. Annulez à tout moment dans vos paramètres de facturation.",
  },
  common: {
    expiration: {
      expired: "expiré",
      oneDay: "expire dans 1 jour",
      days: "expire dans {count} jours",
    },
  },
  dashboard: {
    title: "Mon tableau de bord",
    newUpload: "+ Nouvel envoi",
    activePages: "{active}/{max} pages actives",
    activePagesUnlimited: "{active} page(s) active(s) · sans limite",
    renewsOn: "Renouvelé le {date}",
    cancelsAtPeriodEnd: " · annule à la fin de la période",
    yearly: " · annuel",
    monthly: " · mensuel",
    limitReachedUpgrade: "Limite atteinte — upgrader",
    viewProPlan: "Voir le forfait Pro",
    billingSettings: "Paramètres de facturation",
    emptyState: "Vous n'avez encore envoyé aucun HTML.",
    emptyStateLink: "Faites votre premier envoi",
    views: "{count} vues",
    uploadedOn: "envoyé le {date}",
  },
  mine: {
    title: "Mes envois",
    newUpload: "+ Nouvel envoi",
    activePagesInBrowser: "{active}/{max} page(s) active(s) dans ce navigateur",
    noAccount: "Sans compte",
    createAccountForSpace: "Créez un compte gratuit pour plus d'espace",
    emptyState: "Aucun envoi enregistré dans ce navigateur pour l'instant.",
    emptyStateLink: "Envoyez votre premier HTML",
    browserListWarning:
      "Cette liste est enregistrée dans ce navigateur — si vous effacez les données du site ou changez d'appareil, elle disparaît.",
    createAccountLink: "Créer un compte",
    dontLoseUploads: "pour ne pas perdre vos envois.",
    views: "{count} vues",
    uploadedOn: "envoyé le {date}",
  },
  blog: {
    title: "Blog Leme",
    subtitle: "Conseils, tutoriels et actualités sur la publication et le partage de HTML généré par l'IA.",
    readMore: "Lire la suite \u2192",
    posts: [
      {
        slug: "how-to-publish-html-from-ai",
        title: "Comment publier du HTML depuis ChatGPT, Claude et Gemini",
        excerpt:
          "Un guide étape par étape pour exporter du HTML depuis les assistants de code IA les plus populaires et le publier en ligne avec un lien partageable.",
        date: "2026-08-16",
      },
      {
        slug: "share-ai-landing-page-in-30-seconds",
        title: "Comment partager une landing page générée par l'IA en 30 secondes",
        excerpt:
          "Transformez un prompt en une landing page en ligne. Envoyez le HTML à Leme et transmettez le lien à n'importe qui.",
        date: "2026-08-16",
      },
      {
        slug: "collect-feedback-on-html-prototypes",
        title: "La meilleure façon de collecter des retours sur des prototypes HTML",
        excerpt:
          "Pourquoi les commentaires, suggestions et forks font de Leme un outil de feedback léger pour les prototypes générés par l'IA.",
        date: "2026-08-16",
      },
    ],
  },
  about: {
    metadataDescription:
      "Découvrez Leme : un moyen simple de télécharger des pages HTML générées par l'IA et de les partager via un lien.",
    title: "À propos de Leme",
    intro:
      "Leme a été conçu pour tous ceux qui créent du HTML avec l'IA et ont besoin d'un moyen rapide et fiable de partager le résultat. Pas d'hébergement à configurer, pas de pipeline de build — il suffit d'envoyer votre fichier et d'obtenir un lien à partager avec tout le monde.",
    whyTitle: "Pourquoi nous l'avons créé",
    whyText:
      "Les outils d'IA peuvent générer des pages HTML complètes en quelques secondes, mais les publier reste plus compliqué que nécessaire. Nous voulions un endroit où vous pouvez déposer un fichier, récupérer un lien et passer à autre chose.",
    whatTitle: "Ce que vous pouvez faire",
    whatItems: [
      "Envoyer des fichiers HTML uniques jusqu'à la limite de votre forfait",
      "Obtenir une page publique et un lien partageable instantanément",
      "Recevoir des commentaires, suggestions et forks de la part des visiteurs",
      "Passer à Pro pour des pages illimitées et sans filigrane",
    ],
    cta: "Voir les forfaits",
  },
  features: {
    metadataDescription:
      "Découvrez les fonctionnalités de Leme : envoi de HTML, liens partageables, collaboration avec commentaires, suggestions et forks.",
    title: "Fonctionnalités",
    subtitle: "Tout ce dont vous avez besoin pour publier et partager des pages HTML générées par l'IA.",
    items: [
      {
        title: "Envoi instantané",
        description: "Glissez ou sélectionnez un fichier HTML et obtenez un lien public en quelques secondes.",
      },
      {
        title: "Pages partageables",
        description: "Chaque envoi devient une page propre avec sa propre URL, prête à être partagée partout.",
      },
      {
        title: "Collaboration",
        description: "Les visiteurs peuvent laisser des commentaires, des suggestions ou faire un fork de votre page pour créer quelque chose de nouveau.",
      },
      {
        title: "Aucun compte requis",
        description: "Essayez Leme sans vous inscrire. Créez un compte lorsque vous souhaitez conserver plus de pages.",
      },
      {
        title: "Forfait Pro",
        description: "Supprimez le filigrane et gardez un nombre illimité de pages en ligne pour toujours.",
      },
      {
        title: "Facturation simple",
        description: "Passez à Pro ou annulez à tout moment depuis vos paramètres de facturation.",
      },
    ],
  },
  faq: {
    metadataDescription:
      "Questions fréquentes sur Leme : envoyer du HTML généré par l'IA, partager des liens, collaborer et gérer les forfaits.",
    metadataOpenGraphTitle: "FAQ Leme — Les questions courantes et leurs réponses",
    title: "Questions fréquentes",
    subtitle: "Tout ce que vous devez savoir sur l'envoi, le partage et la collaboration avec Leme.",
    stillQuestionsTitle: "Vous avez encore des questions ?",
    stillQuestionsText: "Envoyez un email à",
    items: [
      {
        question: "Qu'est-ce que Leme ?",
        answer:
          "Leme est un moyen rapide de télécharger des fichiers HTML générés par l'IA et de les publier comme des pages web partageables. Vous obtenez un lien public instantanément et les visiteurs peuvent commenter, suggérer des modifications ou faire un fork de votre page.",
      },
      {
        question: "Comment télécharger un fichier HTML ?",
        answer:
          "Rendez-vous sur la page d'envoi, glissez ou sélectionnez votre fichier .html, ajoutez un titre et une description optionnelle, puis cliquez sur Télécharger. Leme héberge le fichier et vous donne un lien public en quelques secondes.",
      },
      {
        question: "Dois-je créer un compte pour utiliser Leme ?",
        answer:
          "Non. Vous pouvez télécharger sans vous connecter. Les envois anonymes sont enregistrés dans votre navigateur, mais ils ont des limites plus strictes et expirent après quelques jours. Créer un compte gratuit vous donne plus de pages et une durée de conservation plus longue.",
      },
      {
        question: "Quels outils d'IA fonctionnent avec Leme ?",
        answer:
          "Tout outil capable d'exporter un seul fichier .html fonctionne. Les options populaires incluent ChatGPT, Claude, Gemini, v0, Lovable, Bolt, Replit et le HTML codé à la main à partir de n'importe quel générateur de code.",
      },
      {
        question: "Quelle est la limite de taille de fichier ?",
        answer:
          "La limite actuelle d'envoi est de 2 Mo par fichier. Cela couvre la plupart des landing pages, portfolios, tableaux de bord et prototypes générés par l'IA. Si votre fichier est plus volumineux, essayez de compresser les images ou de diviser la page.",
      },
      {
        question: "Puis-je partager une page avec quelqu'un d'autre ?",
        answer:
          "Oui. Chaque page obtient un lien public de type leme.app/p/[id]. Vous pouvez aussi créer un lien de partage dédié depuis la barre latérale, plus facile à copier et à envoyer.",
      },
      {
        question: "Comment fonctionne la collaboration ?",
        answer:
          "Les visiteurs disposant du lien peuvent ouvrir la barre latérale et laisser des commentaires, des suggestions ou des forks. Les forks créent une nouvelle copie de la page que le contributeur peut modifier et renvoyer.",
      },
      {
        question: "Que se passe-t-il quand une page expire ?",
        answer:
          "Les pages gratuites et anonymes expirent après la période de conservation de leur forfait. Une fois expirée, la page n'est plus visible. Les pages Pro n'expirent jamais tant que l'abonnement est actif.",
      },
      {
        question: "Quelle est la différence entre le forfait Gratuit et Pro ?",
        answer:
          "Le forfait Gratuit vous permet de conserver un petit nombre de pages actives avec un filigrane Leme. Le forfait Pro supprime le filigrane, enlève la limite de pages actives et garde les pages en ligne pour toujours.",
      },
      {
        question: "Combien coûte le forfait Pro ?",
        answer:
          "Leme Pro coûte 9 $ par mois ou 90 $ par an. L'abonnement annuel permet d'économiser l'équivalent de deux mois par rapport au paiement mensuel.",
      },
      {
        question: "Puis-je annuler Pro à tout moment ?",
        answer:
          "Oui. Vous pouvez annuler depuis la page de facturation à tout moment. Vos avantages Pro restent actifs jusqu'à la fin de la période de facturation en cours.",
      },
      {
        question: "Le contenu que je télécharge est-il public ?",
        answer:
          "Les pages téléchargées sur Leme sont publiques par défaut via leurs liens partageables. Toute personne disposant du lien peut voir la page. Ne téléchargez pas de contenu sensible, privé ou confidentiel.",
      },
      {
        question: "Puis-je supprimer une page ?",
        answer:
          "Oui. Si vous avez créé la page en étant connecté, vous pouvez la supprimer depuis votre tableau de bord. Les pages anonymes sont liées à votre navigateur et peuvent être retirées depuis la page Mes envois.",
      },
      {
        question: "Leme fonctionne-t-il sur mobile ?",
        answer:
          "Oui. Le site Leme est responsive. Vous pouvez envoyer, consulter et partager des pages depuis n'importe quel navigateur moderne sur ordinateur, tablette ou mobile.",
      },
      {
        question: "Puis-je utiliser mon propre domaine ?",
        answer:
          "Pas encore. Aujourd'hui, chaque page est hébergée sous leme.app. Les domaines personnalisés sont dans la roadmap pour une future version.",
      },
      {
        question: "Leme prend-il en charge le CSS, JavaScript et les images intégrés au HTML ?",
        answer:
          "Oui. Un seul fichier .html contenant du CSS, du JavaScript et des images en base64 en ligne s'affichera correctement. Les ressources externes liées par URL peuvent se charger selon les règles CORS et leur disponibilité.",
      },
      {
        question: "Comment signaler un abus ou un contenu protégé par le droit d'auteur ?",
        answer:
          "Envoyez un email à hello@leme-app.com avec le lien de la page et une description. Nous examinons les signalements et prenons des mesures contre les contenus qui violent nos Conditions de Service.",
      },
      {
        question: "Existe-t-il une API publique ?",
        answer: "Non. Leme est conçu pour les envois manuels via l'interface web. L'accès par API n'est pas disponible.",
      },
      {
        question: "Qui a créé Leme ?",
        answer:
          "Leme a été créé par une petite équipe déterminée à rendre le HTML généré par l'IA facile à publier et à partager. Nous sommes indépendants, autofinancés et financés par nos clients grâce aux abonnements Pro.",
      },
      {
        question: "Comment nous contacter ?",
        answer: "Écrivez-nous à hello@leme-app.com ou contactez-nous sur Twitter / X et LinkedIn.",
      },
    ],
  },
  aiLanding: {
    worksWith: "Fonctionne avec {toolName}",
    howItWorks: "Comment ça marche",
    commonUseCases: "Cas d'usage courants",
    readyToPublish: "Prêt à publier votre HTML {toolName} ?",
    ctaUpload: "Télécharger votre HTML",
    noAccount: "Téléchargez votre fichier et obtenez un lien public en quelques secondes. Aucun compte requis pour essayer.",
    whyUseLeme: "Pourquoi utiliser Leme avec {toolName} ?",
    whyPoints: [
      "Obtenez un lien public sans quitter votre navigateur.",
      "Partagez la page avec n'importe qui, même si la personne n'a pas accès à {toolName}.",
      "Collectez les retours, suggestions et forks des relecteurs.",
      "Gardez les pages en ligne pour toujours avec Leme Pro.",
    ],
  },
  aiTools: {
    chatgpt: {
      metadataTitle: "Hébergez et partagez du HTML depuis ChatGPT",
      metadataDescription:
        "Téléchargez du HTML généré par ChatGPT sur Leme et obtenez un lien public partageable en quelques secondes. Aucune configuration d'hébergement requise.",
      ogTitle: "Héberger du HTML depuis ChatGPT — Leme",
      ogDescription: "Téléchargez du HTML généré par ChatGPT et partagez-le avec un lien public.",
      headline: "Hébergez et partagez du HTML depuis ChatGPT",
      description:
        "ChatGPT peut écrire des landing pages, des portfolios et des prototypes complets dans un seul fichier HTML. Téléchargez ce fichier sur Leme et obtenez un lien public que vous pouvez partager partout.",
      useCases: ["Landing pages ChatGPT", "Portfolios ChatGPT", "Prototypes ChatGPT", "Sites one-page ChatGPT"],
      steps: [
        "Demandez à ChatGPT de générer une page HTML complète et autonome avec du CSS en ligne. Par exemple : 'Créez une landing page responsive pour un produit SaaS dans un seul fichier HTML.'",
        "Copiez la réponse HTML complète et enregistrez-la sous forme de page.html sur votre ordinateur.",
        "Ouvrez Leme, glissez le fichier dans le formulaire d'envoi et ajoutez un titre et une description optionnelle.",
        "Cliquez sur Télécharger. Leme héberge la page et vous donne un lien public comme leme.app/p/xyz.",
        "Partagez le lien avec vos collègues, clients ou sur les réseaux sociaux. Les visiteurs peuvent aussi laisser des commentaires et des suggestions.",
      ],
      schemaName: "Comment publier du HTML depuis ChatGPT avec Leme",
      schemaDescription:
        "Guide étape par étape pour télécharger du HTML généré par ChatGPT sur Leme et obtenir un lien public partageable.",
    },
    bolt: {
      metadataTitle: "Hébergez et partagez du HTML depuis Bolt",
      metadataDescription:
        "Téléchargez du HTML généré par Bolt sur Leme et obtenez un lien public partageable en quelques secondes. Partagez des prototypes et des sites one-page Bolt sans déploiement complet.",
      ogTitle: "Héberger du HTML depuis Bolt — Leme",
      ogDescription: "Téléchargez du HTML généré par Bolt et partagez-le avec un lien public.",
      headline: "Hébergez et partagez du HTML depuis Bolt",
      description:
        "Bolt crée des applications full-stack à partir de prompts. Exportez une seule page HTML ou un snapshot de votre projet Bolt et téléchargez-le sur Leme pour partager un aperçu en ligne instantanément.",
      useCases: ["Aperçus d'applications Bolt", "Landing pages Bolt", "Prototypes Bolt", "Démos partageables Bolt"],
      steps: [
        "Générez une page ou une application dans Bolt. Choisissez un écran unique ou une landing page pouvant être exportée comme un fichier HTML autonome.",
        "Copiez ou exportez le code source HTML et enregistrez-le sous forme de page.html. Assurez-vous que les styles et les scripts sont en ligne pour que le fichier fonctionne seul.",
        "Téléchargez le fichier sur Leme et ajoutez un titre et une description.",
        "Cliquez sur Télécharger pour obtenir un lien public comme leme.app/p/xyz.",
        "Partagez le lien avec les parties prenantes. Ils peuvent relire, commenter, suggérer ou faire un fork de la page.",
      ],
      schemaName: "Comment publier du HTML depuis Bolt avec Leme",
      schemaDescription:
        "Guide étape par étape pour télécharger du HTML généré par Bolt sur Leme et obtenir un lien public partageable.",
    },
    claude: {
      metadataTitle: "Hébergez et partagez du HTML depuis Claude",
      metadataDescription:
        "Téléchargez du HTML généré par Claude sur Leme et obtenez un lien public partageable en quelques secondes. Parfait pour les Claude Artifacts et les prototypes.",
      ogTitle: "Héberger du HTML depuis Claude — Leme",
      ogDescription: "Téléchargez du HTML généré par Claude et partagez-le avec un lien public.",
      headline: "Hébergez et partagez du HTML depuis Claude",
      description:
        "Claude, y compris Claude Artifacts, peut générer des pages HTML et des composants soignés. Téléchargez-les sur Leme pour les rendre publics et partageables sans aucun déploiement.",
      useCases: ["Hébergement de Claude Artifacts", "Prototypes Claude", "Landing pages Claude", "Démos de composants Claude"],
      steps: [
        "Générez une page ou un artifact dans Claude. Demandez un seul fichier HTML autonome avec du CSS et du JavaScript en ligne.",
        "Passez en vue code dans le panneau Claude Artifact et copiez le code source HTML complet.",
        "Enregistrez le code sous forme de page.html sur votre ordinateur.",
        "Téléchargez le fichier sur Leme, ajoutez un titre et cliquez sur Télécharger.",
        "Copiez le lien public et partagez-le. Les relecteurs peuvent laisser des commentaires, des suggestions ou des forks dans la barre latérale.",
      ],
      schemaName: "Comment publier du HTML depuis Claude avec Leme",
      schemaDescription:
        "Guide étape par étape pour télécharger du HTML généré par Claude ou Claude Artifacts sur Leme et obtenir un lien public partageable.",
    },
    gemini: {
      metadataTitle: "Hébergez et partagez du HTML depuis Gemini",
      metadataDescription:
        "Téléchargez du HTML généré par Google Gemini sur Leme et obtenez un lien public partageable en quelques secondes. Aucune étape d'hébergement ou de build requise.",
      ogTitle: "Héberger du HTML depuis Gemini — Leme",
      ogDescription: "Téléchargez du HTML généré par Gemini et partagez-le avec un lien public.",
      headline: "Hébergez et partagez du HTML depuis Gemini",
      description:
        "Gemini peut générer des pages HTML, des composants et de petites applications web. Téléchargez le fichier HTML généré sur Leme et publiez-le comme une page en ligne avec un lien partageable.",
      useCases: ["Landing pages Gemini", "Prototypes Gemini", "Tableaux de bord Gemini", "Sites one-page Gemini"],
      steps: [
        "Demandez à Gemini de créer une page HTML complète et autonome. Par exemple : 'Créez une page de portfolio responsive dans un seul fichier HTML avec du CSS en ligne.'",
        "Copiez le HTML généré et enregistrez-le sous forme de page.html.",
        "Ouvrez Leme et téléchargez le fichier. Ajoutez un titre et une description optionnelle pour aider les visiteurs à comprendre la page.",
        "Cliquez sur Télécharger et obtenez un lien public comme leme.app/p/xyz.",
        "Partagez le lien. La barre latérale permet aux visiteurs de collaborer avec des commentaires, des suggestions et des forks.",
      ],
      schemaName: "Comment publier du HTML depuis Gemini avec Leme",
      schemaDescription:
        "Guide étape par étape pour télécharger du HTML généré par Google Gemini sur Leme et obtenir un lien public partageable.",
    },
    lovable: {
      metadataTitle: "Hébergez et partagez du HTML depuis Lovable",
      metadataDescription:
        "Téléchargez du HTML généré par Lovable sur Leme et obtenez un lien public partageable en quelques secondes. Publiez des applications Lovable comme pages autonomes.",
      ogTitle: "Héberger du HTML depuis Lovable — Leme",
      ogDescription: "Téléchargez du HTML généré par Lovable et partagez-le avec un lien public.",
      headline: "Hébergez et partagez du HTML depuis Lovable",
      description:
        "Lovable crée des applications et des pages full-stack. Exportez un snapshot HTML unique de votre projet Lovable et téléchargez-le sur Leme pour un aperçu public rapide.",
      useCases: ["Aperçus d'applications Lovable", "Landing pages Lovable", "Prototypes Lovable", "Démos partageables Lovable"],
      steps: [
        "Générez une page ou une application dans Lovable. Concentrez-vous sur un écran unique ou une landing page qui fonctionne comme un fichier HTML autonome.",
        "Exportez ou copiez le code source HTML et enregistrez-le sous forme de page.html. Intégrez le CSS et le JavaScript en ligne pour que le fichier fonctionne seul.",
        "Téléchargez le fichier sur Leme et remplissez le titre et la description.",
        "Cliquez sur Télécharger pour obtenir un lien public.",
        "Partagez le lien avec les relecteurs. Ils peuvent laisser des commentaires et des suggestions sans avoir besoin d'un accès Lovable.",
      ],
      schemaName: "Comment publier du HTML depuis Lovable avec Leme",
      schemaDescription:
        "Guide étape par étape pour télécharger du HTML généré par Lovable sur Leme et obtenir un lien public partageable.",
    },
    v0: {
      metadataTitle: "Hébergez et partagez du HTML depuis v0",
      metadataDescription:
        "Téléchargez du HTML généré par v0 sur Leme et obtenez un lien public partageable en quelques secondes. Partagez vos prototypes v0 sans déployer un projet complet.",
      ogTitle: "Héberger du HTML depuis v0 — Leme",
      ogDescription: "Téléchargez du HTML généré par v0 et partagez-le avec un lien public.",
      headline: "Hébergez et partagez du HTML depuis v0",
      description:
        "v0 génère de beaux composants React et HTML. Exportez un seul fichier HTML depuis v0 et téléchargez-le sur Leme pour partager un aperçu en ligne avec n'importe qui.",
      useCases: ["Aperçus de composants v0", "Landing pages v0", "Prototypes v0", "Démos d'interface v0"],
      steps: [
        "Générez une interface ou une page dans v0. Demandez un seul fichier HTML autonome, ou exportez le code généré et regroupez-le dans un fichier HTML.",
        "Copiez le code source HTML et enregistrez-le sous forme de page.html.",
        "Téléchargez le fichier sur Leme et ajoutez un titre et une description clairs.",
        "Cliquez sur Télécharger pour obtenir un lien public.",
        "Partagez le lien et collectez les retours via des commentaires, des suggestions et des forks.",
      ],
      schemaName: "Comment publier du HTML depuis v0 avec Leme",
      schemaDescription:
        "Guide étape par étape pour télécharger du HTML généré par v0 sur Leme et obtenir un lien public partageable.",
    },
  },
  useCases: {
    metadataDescription:
      "Découvrez comment les équipes et les créateurs utilisent Leme pour publier et partager des pages HTML générées par l'IA : landing pages, portfolios, prototypes, tableaux de bord et plus encore.",
    metadataOpenGraphTitle: "Cas d'usage Leme — Publiez du HTML généré par l'IA pour n'importe quel projet",
    title: "Que pouvez-vous publier avec Leme ?",
    subtitle:
      "Tout fichier HTML généré par l'IA devient une page en ligne et partageable. Voici les façons les plus courantes d'utiliser Leme.",
    ctaTitle: "Vous avez un fichier HTML prêt ?",
    ctaSubtitle: "Téléchargez-le maintenant et obtenez un lien partageable en quelques secondes.",
    ctaButton: "Télécharger votre HTML",
    items: [
      {
        title: "Landing pages",
        description:
          "Générez une landing page marketing complète avec un assistant de code IA, puis téléchargez-la sur Leme et partagez le lien avec votre équipe, vos clients ou vos parties prenantes en quelques secondes.",
        keywords: ["landing page IA", "partager une landing page", "héberger une landing page HTML"],
      },
      {
        title: "Portfolios",
        description:
          "Transformez un fichier HTML unique issu d'une expérimentation de design ou d'un projet personnel en un portfolio en ligne. Idéal pour les designers, développeurs et étudiants qui veulent une démo publique rapide.",
        keywords: ["portfolio IA", "partager un portfolio HTML", "héberger un portfolio en ligne"],
      },
      {
        title: "Prototypes et MVPs",
        description:
          "Construisez un prototype interactif avec l'IA, publiez-le sur Leme et collectez des retours via des commentaires et des suggestions sans mettre en place un pipeline de déploiement complet.",
        keywords: ["prototype IA", "hébergement de prototype HTML", "partager un MVP"],
      },
      {
        title: "Tableaux de bord",
        description:
          "Publiez des tableaux de bord HTML générés par l'IA avec des graphiques et des tableaux pour que vos collègues puissent prévisualiser la mise en page et l'interaction sans avoir besoin d'un backend ou d'une base de données connectée.",
        keywords: ["tableau de bord IA", "hébergement de tableau de bord HTML", "partager un tableau de bord"],
      },
      {
        title: "Newsletters et one-pagers",
        description:
          "Créez une belle page email ou une annonce avec l'IA, hébergez-la sur Leme et partagez le lien dans votre newsletter, vos réseaux sociaux ou votre chat.",
        keywords: ["one-pager IA", "hébergement de newsletter HTML", "partager un site one-page"],
      },
      {
        title: "Formulaires et micro-apps",
        description:
          "Téléchargez des petits formulaires HTML, des calculateurs ou des widgets interactifs générés par l'IA et partagez-les avec un lien direct. Idéal pour des expérimentations et des tests utilisateurs rapides.",
        keywords: ["hébergement de formulaire IA", "micro-app HTML", "partager un formulaire HTML"],
      },
      {
        title: "Documentation et démos",
        description:
          "Publiez des pages de documentation technique, des démos de composants ou des guides de style générés à partir de prompts IA pour que votre équipe dispose d'une référence en ligne à relire et à discuter.",
        keywords: ["documentation IA", "hébergement de démo HTML", "partager de la documentation"],
      },
      {
        title: "Pages d'événements et de campagnes",
        description:
          "Générez une page de campagne saisonnière ou d'événement avec l'IA et publiez-la instantanément. Mettez à jour en faisant un fork de la page et en partageant la nouvelle version.",
        keywords: ["page de campagne IA", "hébergement de page d'événement", "partager une campagne HTML"],
      },
    ],
  },
  blogPosts: {
    howToPublish: {
      metadataTitle: "Comment publier du HTML depuis ChatGPT, Claude et Gemini",
      metadataDescription:
        "Apprenez à exporter du HTML depuis ChatGPT, Claude, Gemini et d'autres assistants de code IA et à le publier en ligne avec Leme.",
      ogTitle: "Comment publier du HTML depuis ChatGPT, Claude et Gemini",
      ogDescription: "Guide étape par étape pour exporter du HTML généré par l'IA et le partager avec un lien public.",
      title: "Comment publier du HTML depuis ChatGPT, Claude et Gemini",
      subtitle:
        "Un guide étape par étape pour exporter du HTML depuis les assistants de code IA les plus populaires et le publier en ligne avec un lien partageable.",
      ctaTitle: "Essayez maintenant",
      ctaSubtitle: "Téléchargez un fichier HTML et obtenez un lien partageable en quelques secondes.",
      sections: [
        {
          type: "paragraph",
          content:
            "Les assistants de code IA peuvent générer des pages HTML complètes en quelques secondes. Le problème, c'est les partager. La plupart des gens collent le code dans un fichier local, l'ouvrent dans un navigateur et envoient une capture d'écran. Ça fonctionne pour un aperçu rapide, mais ce n'est pas un vrai lien partageable.",
        },
        { type: "heading", content: "Le workflow le plus simple" },
        {
          type: "list",
          items: [
            "Demandez à l'IA une page HTML en un seul fichier. Par exemple : 'Créez une landing page pour un café dans un seul fichier HTML avec du CSS en ligne.'",
            "Copiez le code HTML généré.",
            "Enregistrez-le sous forme de page.html sur votre ordinateur.",
            "Rendez-vous sur la page d'envoi de Leme et sélectionnez le fichier.",
            "Ajoutez un titre et une description optionnelle.",
            "Cliquez sur Télécharger. Vous obtenez un lien public comme leme.app/p/xyz.",
          ],
        },
        { type: "heading", content: "ChatGPT" },
        {
          type: "paragraph",
          content:
            "Dans ChatGPT, demandez un fichier HTML complet. Si la réponse est trop longue, demandez à l'IA de continuer. Une fois que vous avez le code complet, enregistrez-le sous forme de .html et téléchargez-le sur Leme. ChatGPT Code Interpreter peut aussi générer des fichiers HTML directement si vous lui demandez d'écrire et d'exporter le fichier.",
        },
        { type: "heading", content: "Claude" },
        {
          type: "paragraph",
          content:
            "Claude Artifacts peut afficher des composants HTML et React. Lorsque Claude affiche un artifact, cliquez sur la vue code, copiez le HTML et enregistrez-le. Leme héberge exactement ce HTML et le rend partageable avec n'importe qui.",
        },
        { type: "heading", content: "Gemini" },
        {
          type: "paragraph",
          content:
            "Gemini peut générer des extraits de HTML dans sa réponse. Demandez un seul fichier HTML autonome avec des styles en ligne. Copiez le résultat, enregistrez-le et téléchargez-le sur Leme.",
        },
        { type: "heading", content: "Autres outils" },
        {
          type: "paragraph",
          content:
            "Le même workflow fonctionne pour v0, Lovable, Bolt, Replit Agent et tout autre outil qui produit un seul fichier HTML. Si l'outil exporte un ZIP ou plusieurs fichiers, combinez d'abord le CSS et le JavaScript dans le fichier HTML, puis téléchargez-le.",
        },
        { type: "heading", content: "Ce qui rend Leme utile" },
        {
          type: "list",
          items: [
            "Aucune configuration d'hébergement.",
            "Lien public instantané.",
            "Fonctionne sur ordinateur et mobile.",
            "Les visiteurs peuvent laisser des commentaires et des suggestions.",
            "Gratuit pour essayer ; Pro pour des pages illimitées et sans filigrane.",
          ],
        },
      ],
    },
    shareLandingPage: {
      metadataTitle: "Comment partager une landing page générée par l'IA en 30 secondes",
      metadataDescription:
        "Transformez un prompt en une landing page en ligne. Téléchargez le HTML généré par l'IA sur Leme et envoyez le lien à n'importe qui.",
      ogTitle: "Comment partager une landing page générée par l'IA en 30 secondes",
      ogDescription: "De l'invite à un lien public en moins d'une minute avec Leme.",
      title: "Comment partager une landing page générée par l'IA en 30 secondes",
      subtitle:
        "De l'invite au lien public en moins d'une minute. Pas de déploiement, pas de compte d'hébergement, pas d'étape de build.",
      ctaTitle: "Créez votre landing page",
      ctaSubtitle: "Téléchargez votre HTML généré par l'IA et obtenez un lien en quelques secondes.",
      sections: [
        {
          type: "paragraph",
          content:
            "Les landing pages sont l'un des meilleurs cas d'usage pour les assistants de code IA. Vous décrivez votre produit, l'IA rédige le texte, choisit les couleurs et construit une mise en page responsive. Il ne manque plus qu'une URL publique.",
        },
        { type: "heading", content: "Le workflow en 30 secondes" },
        {
          type: "list",
          items: [
            "Demandez à l'IA : 'Créez une landing page responsive pour un SaaS qui aide les gens à partager du HTML généré par l'IA. Un seul fichier HTML, CSS en ligne, design moderne.'",
            "Enregistrez la réponse sous forme de landing.html.",
            "Ouvrez la page d'envoi de Leme.",
            "Glissez le fichier, ajoutez un titre et cliquez sur Télécharger.",
            "Copiez le lien public et partagez-le.",
          ],
        },
        { type: "heading", content: "Pourquoi c'est mieux que les autres options" },
        {
          type: "list",
          items: [
            "GitHub Pages nécessite un dépôt et un commit.",
            "Netlify Drop est excellent pour les dossiers, mais exagéré pour un seul fichier.",
            "Vercel est conçu pour les frameworks, pas pour les fichiers HTML bruts.",
            "Leme est exactement fait pour ça : un fichier HTML, un lien public.",
          ],
        },
        { type: "heading", content: "Partagez avec du contexte" },
        {
          type: "paragraph",
          content:
            "Lorsque vous partagez un lien Leme, les visiteurs peuvent ouvrir la barre latérale pour voir le titre, la description et même laisser des commentaires. C'est parfait pour recueillir des retours précoces, valider des idées clients et collaborer en équipe.",
        },
        { type: "heading", content: "Gardez-la en ligne pour toujours" },
        {
          type: "paragraph",
          content:
            "Les pages gratuites et anonymes expirent au bout d'un moment. Si vous voulez une landing page qui reste en ligne sans filigrane, passez à Leme Pro pour des pages illimitées et un hébergement permanent.",
        },
      ],
    },
    collectFeedback: {
      metadataTitle: "La meilleure façon de collecter des retours sur des prototypes HTML",
      metadataDescription:
        "Pourquoi les commentaires, suggestions et forks font de Leme un outil de feedback léger pour les prototypes HTML générés par l'IA.",
      ogTitle: "La meilleure façon de collecter des retours sur des prototypes HTML",
      ogDescription: "Collectez des commentaires, suggestions et forks sur des prototypes HTML générés par l'IA avec Leme.",
      title: "La meilleure façon de collecter des retours sur des prototypes HTML",
      subtitle:
        "Pourquoi les commentaires, suggestions et forks font de Leme un outil de feedback léger pour les prototypes générés par l'IA.",
      ctaTitle: "Commencez à collecter des retours",
      ctaSubtitle: "Téléchargez votre prototype et partagez-le avec votre équipe.",
      sections: [
        {
          type: "paragraph",
          content:
            "Les prototypes sont faits pour être relus. Mais lorsque vous partagez un fichier HTML par email ou Slack, vous obtenez des retours flous du type 'ça a l'air bien' ou 'change le bleu'. Leme transforme un fichier statique en une surface de relecture collaborative.",
        },
        { type: "heading", content: "Trois types de retours" },
        {
          type: "list",
          items: [
            "Commentaires : réflexions et réactions générales sur la page ou une idée spécifique.",
            "Suggestions : propositions de changement concrètes, comme 'agrandir le titre' ou 'ajouter une section de tarifs'.",
            "Forks : un contributeur peut créer une copie de la page, la modifier et renvoyer la nouvelle version. C'est l'équivalent le plus proche d'une pull request pour une page générée par l'IA.",
          ],
        },
        { type: "heading", content: "Comment l'utiliser" },
        {
          type: "list",
          items: [
            "Générez votre prototype avec un assistant IA.",
            "Téléchargez-le sur Leme.",
            "Partagez le lien avec les relecteurs.",
            "Les relecteurs ouvrent la barre latérale et ajoutent des commentaires ou des suggestions.",
            "Pour des changements plus importants, demandez à un relecteur de faire un fork de la page et d'itérer.",
          ],
        },
        { type: "heading", content: "Quand utiliser Leme plutôt que Figma ou GitHub" },
        {
          type: "paragraph",
          content:
            "Figma est excellent pour le design, et GitHub est excellent pour le code. Leme se situe entre les deux : la page est déjà du HTML en ligne, mais vous avez encore besoin d'un retour rapide avant de passer à un déploiement complet. C'est idéal pour les projets annexes, les aperçus clients et les expérimentations ponctuelles générées par l'IA.",
        },
        { type: "heading", content: "Gardez un historique" },
        {
          type: "paragraph",
          content:
            "Comme chaque page a sa propre URL, vous pouvez partager la version A, puis la version B, puis la version C. Chaque lien est un instantané. Les relecteurs peuvent les comparer facilement, et vous pouvez conserver la meilleure comme version finale.",
        },
      ],
    },
  },
  terms: {
    metadataTitle: "Conditions d'utilisation",
    metadataDescription: "Conditions d'utilisation du service Leme.",
    title: "Conditions d'utilisation",
    lastUpdated: "Dernière mise à jour : août 2026",
    sections: [
      {
        title: "1. Acceptation des conditions",
        paragraphs: [
          "En accédant ou en utilisant Leme, vous acceptez d'être lié par ces Conditions d'utilisation. Si vous n'êtes pas d'accord, veuillez ne pas utiliser le service.",
        ],
      },
      {
        title: "2. Description du service",
        paragraphs: [
          "Leme est une plateforme qui permet aux utilisateurs de télécharger des fichiers HTML, de générer des liens partageables et de collaborer via des commentaires, des suggestions et des forks.",
        ],
      },
      {
        title: "3. Contenu utilisateur",
        paragraphs: [
          "Vous conservez la propriété de tout contenu que vous téléchargez. En téléchargeant du contenu, vous accordez à Leme une licence limitée pour héberger, afficher et partager ce contenu dans la mesure nécessaire à la fourniture du service.",
          "Vous êtes seul responsable du contenu que vous téléchargez. Ne téléchargez pas de contenu illégal, nuisible, portant atteinte aux droits d'autrui ou violant les droits des autres.",
        ],
      },
      {
        title: "4. Utilisations interdites",
        paragraphs: [
          "Vous ne pouvez pas utiliser Leme pour distribuer des logiciels malveillants, des pages de phishing, du spam ou tout contenu violant les lois ou réglementations applicables.",
        ],
      },
      {
        title: "5. Abonnements payants",
        paragraphs: [
          "Leme propose des forfaits gratuits et payants. Les abonnements payants sont facturés via Stripe et peuvent être annulés à tout moment depuis vos paramètres de facturation.",
        ],
      },
      {
        title: "6. Résiliation",
        paragraphs: [
          "Nous nous réservons le droit de suspendre ou de résilier les comptes qui violent ces conditions ou abusent du service.",
        ],
      },
      {
        title: "7. Modifications des conditions",
        paragraphs: [
          "Nous pouvons mettre à jour ces conditions de temps à autre. L'utilisation continue du service après modification constitue l'acceptation des conditions mises à jour.",
        ],
      },
      {
        title: "8. Contact",
        paragraphs: [
          "Pour toute question concernant ces conditions, veuillez nous contacter via notre page de contact.",
        ],
      },
    ],
  },
  privacy: {
    metadataTitle: "Politique de confidentialité",
    metadataDescription: "Politique de confidentialité pour les utilisateurs de Leme.",
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour : août 2026",
    sections: [
      {
        title: "1. Informations que nous collectons",
        paragraphs: [
          "Lorsque vous utilisez Leme, nous pouvons collecter les informations que vous fournissez directement, comme votre adresse email lors de la connexion, ainsi que des identifiants anonymes lorsque vous téléchargez sans compte.",
        ],
      },
      {
        title: "2. Contenu téléchargé",
        paragraphs: [
          "Les fichiers HTML que vous téléchargez sont stockés en toute sécurité afin que nous puissions les servir via des liens partageables. Nous ne scanons pas le contenu de vos envois et ne l'utilisons pas à des fins publicitaires.",
        ],
      },
      {
        title: "3. Authentification",
        paragraphs: [
          "Leme utilise Firebase Authentication pour la connexion. Nous stockons un identifiant utilisateur unique et votre adresse email lorsque vous vous authentifiez.",
        ],
      },
      {
        title: "4. Paiements",
        paragraphs: [
          "Les paiements sont traités par Stripe. Nous ne stockons pas les détails de votre carte de paiement. Stripe peut collecter les informations nécessaires au traitement des paiements sous sa propre politique de confidentialité.",
        ],
      },
      {
        title: "5. Cookies et analyses",
        paragraphs: [
          "Nous utilisons des cookies essentiels pour vous maintenir connecté et mémoriser les envois anonymes dans votre navigateur. Nous n'utilisons pas de cookies publicitaires tiers.",
        ],
      },
      {
        title: "6. Conservation des données",
        paragraphs: [
          "Les pages téléchargées sont conservées selon votre forfait. Les pages gratuites et anonymes expirent après la période de conservation du forfait. Les pages Pro sont conservées tant que votre abonnement est actif.",
        ],
      },
      {
        title: "7. Vos droits",
        paragraphs: [
          "Vous pouvez supprimer vos pages téléchargées à tout moment. Si vous avez des questions sur vos données, contactez-nous via notre page de contact.",
        ],
      },
      {
        title: "8. Modifications de cette politique",
        paragraphs: [
          "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Les changements importants seront publiés sur cette page.",
        ],
      },
    ],
  },
  login: {
    title: "Se connecter",
    subtitle: "Accédez à votre compte pour gérer vos envois et partager vos liens.",
    googleSignIn: "Se connecter avec Google",
    googleSignInLoading: "Ouverture de Google...",
    or: "ou",
    magicLink: "Lien magique",
    emailAndPassword: "Email et mot de passe",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "••••••••",
    sendMagicLink: "Envoyer un lien magique",
    sending: "Envoi en cours...",
    signIn: "Se connecter",
    createAccount: "Créer un compte",
    pleaseWait: "Veuillez patienter...",
    noAccount: "Vous n'avez pas de compte ? Créez-en un maintenant",
    hasAccount: "Vous avez déjà un compte ? Connectez-vous",
    magicLinkSent: "Lien magique envoyé ! Consultez votre boîte de réception pour continuer.",
  },
  auth: {
    codeErrorTitle: "Nous n'avons pas pu confirmer votre connexion",
    codeErrorSubtitle:
      "Le lien a peut-être expiré ou a déjà été utilisé. Veuillez réessayer de vous connecter.",
    codeErrorCta: "Retour à la connexion",
    callbackConfirming: "Confirmation de votre connexion...",
    callbackEmailPrompt: "Confirmez votre email pour terminer la connexion",
    callbackError: "Ce lien a peut-être expiré ou a déjà été utilisé.",
  },
  uploadLanding: {
    title: "Téléchargez votre HTML",
    savedFile: "Votre fichier enregistré",
    savedFiles: "Vos fichiers enregistrés",
    noAccount:
      "Pas de compte ? Pas de problème — votre envoi reste enregistré dans ce navigateur, vous pouvez y accéder plus tard via {link}.",
    myUploads: "Mes envois",
  },
  uploadForm: {
    fileLabel: "Fichier HTML (.html, jusqu'à 2Mo)",
    titleLabel: "Titre",
    titlePlaceholder: "Ex : Landing page générée avec GPT",
    descriptionLabel: "Description (optionnelle)",
    descriptionPlaceholder: "Dites-nous un peu ce que contient ce HTML...",
    uploading: "Envoi en cours...",
    upload: "Envoyer",
    errors: {
      notHtml: "Sélectionnez un fichier .html.",
      tooLarge: "Le fichier doit faire au maximum 2Mo.",
      noFile: "Choisissez un fichier .html à envoyer.",
      generic: "Erreur de connexion lors de l'envoi du fichier.",
    },
  },
  planUpsell: {
    usage: "{active}/{max} pages actives utilisées.",
    atLimit: "Vous avez atteint la limite de {max} page(s) active(s).",
    description: "Pro supprime la limite, retire le filigrane et les pages n'expirent jamais.",
    cta: "Passer à Pro",
  },
  planLabels: {
    anonymous: "Anonyme",
    free: "Gratuit",
    pro: "Pro",
  },
  expiredNotice: {
    title: "Cette page a expiré",
    description:
      "Le plan de l'auteur limite la durée de vie d'une page. Si vous êtes l'auteur, passez au forfait Pro pour empêcher vos pages d'expirer.",
    cta: "Retour à l'accueil",
  },
  uploadsMenu: {
    title: "Vos envois",
    empty: "Vous n'avez pas encore d'autres envois.",
    views: "{count} vues",
    viewingNow: "en cours de visualisation",
    deleteLabel: "Supprimer l'envoi",
    deleteConfirm: "Supprimer \"{title}\" ? La page, son lien et ses commentaires disparaissent définitivement.",
    deleteError: "Impossible de supprimer l'envoi.",
    deleteTitle: "Supprimer cet envoi ?",
    deleteCta: "Supprimer",
    cancel: "Annuler",
  },
  billing: {
    title: "Facturation",
    subtitle: "Gérez votre forfait, la période de facturation et vos factures.",
    subscription: {
      title: "Abonnement",
      freePlan: "Vous êtes sur le forfait Gratuit. Passez à Pro pour conserver vos pages indéfiniment et supprimer le filigrane.",
      viewPlans: "Voir les forfaits",
      proTitle: "Forfait Pro",
      billedAnnually: "Facturé annuellement",
      billedMonthly: "Facturé mensuellement",
      statusActive: "Actif",
      statusCancelsSoon: "Se termine bientôt",
      currentPeriodEnds: "Période en cours se termine le",
      billingInterval: "Période de facturation",
      intervalYearly: "Annuel",
      intervalMonthly: "Mensuel",
      cancelWarning:
        "Votre forfait Pro est programmé pour se terminer à la fin de la période de facturation en cours. Vous pouvez le réactiver d'ici là pour conserver les avantages.",
      syncing: "Synchronisation des détails de l'abonnement...",
    },
    invoices: {
      title: "Historique des factures",
      loading: "Chargement des factures...",
      error: "Impossible de charger les factures.",
      empty: "Aucune facture pour le moment.",
      invoice: "Facture",
      view: "Voir",
      statusPaid: "payée",
    },
    actions: {
      manageBilling: "Gérer la facturation",
      manageBillingLoading: "Ouverture...",
      cancelSubscription: "Résilier l'abonnement",
      cancelling: "Résiliation en cours...",
      cancelConfirm:
        "Êtes-vous sûr de vouloir résilier votre forfait Pro ? Vous garderez l'accès jusqu'à la fin de la période de facturation en cours.",
      cancelConfirmTitle: "Annuler le forfait Pro ?",
      cancelKeep: "Garder le forfait",
      cancelError: "Échec de la résiliation de l'abonnement.",
      upgradeToAnnual: "Passer à l'annuel",
      upgrading: "Ouverture du paiement...",
      upgradeError: "Échec du démarrage de la mise à niveau.",
    },
  },
  pageViewer: {
    pageLink: "Lien de la page",
    views: "{count} vues",
    uploadedOn: "téléchargé le {date}",
    sourceNote: "via lien partagé",
    reopenLabel: "Collaborer",
  },
  collapsibleSidebar: {
    show: "Afficher la barre latérale",
    hide: "Masquer la barre latérale",
  },
  copyLink: {
    copy: "Copier",
    copied: "Copié !",
  },
  contributions: {
    typeComment: "Commentaire",
    typeSuggestion: "Suggestion",
    typeFork: "Fork",
    authorPlaceholder: "Votre nom (optionnel)",
    forkTitlePlaceholder: "Titre du fork",
    forkHtmlLabel: "Modifiez le HTML avant de créer le fork :",
    commentPlaceholder: "Laissez un commentaire...",
    suggestionPlaceholder: "Décrivez votre suggestion...",
    forkMessagePlaceholder: "Message à propos de ce fork (optionnel)",
    submit: "Soumettre",
    createFork: "Créer un fork",
    submitting: "Envoi en cours...",
    emptyState: "Aucune contribution pour l'instant. Soyez le premier !",
    viewFork: "Voir le fork →",
    error: "Erreur de connexion lors de l'envoi de la contribution.",
    forkOf: "Fork de {title}",
  },
  forkEditor: {
    title: "Fork de {title}",
    subtitle: "Modifiez le HTML avec coloration syntaxique et aperçu en direct avant de créer le fork.",
    close: "Fermer l'éditeur",
    htmlTab: "HTML",
    previewTab: "Aperçu",
    editTitle: "Titre du fork",
    authorLabel: "Votre nom",
    messageLabel: "Message sur ce fork (facultatif)",
    iconLabel: "Icône de la page",
    iconEmoji: "Emoji",
    iconText: "Texte",
    iconColor: "Couleur d'arrière-plan",
    cancel: "Annuler",
    createFork: "Créer le fork",
    creating: "Création...",
    openEditor: "Ouvrir l'éditeur HTML",
  },
  shareButton: {
    share: "Partager",
    generating: "Génération en cours...",
    error: "Erreur de connexion lors de la génération du lien.",
  },
  meta: {
    loginTitle: "Se connecter",
    loginDescription:
      "Connectez-vous à Leme pour gérer vos pages HTML envoyées et vos liens de partage.",
    mineTitle: "Mes envois",
    mineDescription: "Consultez vos envois anonymes sur Leme.",
    dashboardTitle: "Tableau de bord",
    dashboardDescription:
      "Gérez vos pages HTML envoyées et vos liens de partage sur Leme.",
    billingTitle: "Facturation",
    billingDescription:
      "Gérez votre abonnement Leme Pro, la période de facturation et vos factures.",
    newTitle: "Envoyer un HTML",
    newDescription:
      "Envoyez un fichier HTML généré par IA sur Leme et obtenez un lien à partager.",
    pageNotFound: "Page introuvable",
    sharedPageNotFound: "Page partagée introuvable",
    untitledPage: "Page partagée",
    viewPageDescription: "Voir {title} sur Leme.",
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
    title: "Réglages de la page",
    proOnly: "Pro",
    contributions: "Autoriser les contributions",
    contributionsHint: "Les visiteurs peuvent commenter, suggérer des changements ou forker cette page.",
    branding: "Afficher l'en-tête Leme",
    brandingHint: "La barre Leme reste visible au-dessus de votre page.",
    saving: "Enregistrement...",
    error: "Impossible d'enregistrer les réglages.",
  },
  authErrors: {
    invalidEmail: "Cette adresse e-mail ne semble pas valide.",
    userDisabled: "Ce compte a été désactivé.",
    userNotFound: "Aucun compte trouvé avec cette adresse e-mail.",
    wrongPassword: "E-mail ou mot de passe incorrect.",
    invalidCredential: "E-mail ou mot de passe incorrect.",
    emailAlreadyInUse: "Un compte existe déjà avec cette adresse e-mail. Essayez plutôt de vous connecter.",
    weakPassword: "Choisissez un mot de passe d'au moins 6 caractères.",
    tooManyRequests: "Trop de tentatives. Attendez un moment et réessayez.",
    networkRequestFailed: "Impossible de joindre le serveur. Vérifiez votre connexion.",
    popupBlocked: "Votre navigateur a bloqué la fenêtre de connexion. Autorisez les popups et réessayez.",
    unauthorizedDomain: "Ce domaine n'est pas autorisé dans Firebase. Ajoutez-le dans Authentification > Paramètres > Domaines autorisés.",
    operationNotAllowed: "Cette méthode de connexion est désactivée. Activez-la dans Authentification > Méthode de connexion de la console Firebase.",
    accountExistsWithDifferentCredential: "Vous avez déjà un compte avec cette adresse e-mail via une autre méthode de connexion. Connectez-vous d'abord de cette façon.",
    default: "Impossible de terminer la connexion. Veuillez réessayer.",
    connectionError: "Impossible de se connecter. Vérifiez votre connexion internet et réessayez.",
  },
};
