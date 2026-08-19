import type { Dictionary } from "./en";

export const pt: Dictionary = {
  site: {
    name: "Leme",
    tagline: "Envie HTML gerado por IA e compartilhe com um link",
    description:
      "Envie arquivos HTML gerados por IA e compartilhe com qualquer pessoa através de um link. Colabore com comentários, sugestões e forks.",
  },
  nav: {
    plans: "Planos",
    blog: "Blog",
    myFiles: "Meus arquivos",
    newUpload: "Novo envio",
    signIn: "Entrar",
    signOut: "Sair",
  },
  home: {
    heroBadge: "HTML gerado por IA, pronto para compartilhar",
    heroTitle: "Transforme o que você cria com IA em páginas que qualquer um pode abrir",
    heroDescription:
      "Envie o HTML gerado pela sua ferramenta de IA favorita, obtenha um link compartilhável em segundos e permita que pessoas comentem, sugiram alterações ou façam um fork.",
    ctaUpload: "Enviar seu HTML",
    ctaPlans: "Ver planos",
    heroNote: "Não é necessário conta para testar — as páginas enviadas sem login ficam salvas neste navegador.",
    featureUpload: "Enviar",
    featureUploadDesc: "Arraste qualquer arquivo .html de até 2MB — sem build, sem configuração.",
    featureShare: "Compartilhar",
    featureShareDesc: "Cada envio ganha sua própria página e link, pronto para enviar.",
    featureCollaborate: "Colaborar",
    featureCollaborateDesc: "Visitantes podem comentar, sugerir alterações ou fazer um fork da página.",
    featureControl: "Manter o controle",
    featureControlDesc: "O plano gratuito tem limites e uma marca d'água; o Pro remove ambos.",
    howTitle: "Como funciona",
    howSubtitle: "Do prompt de IA ao link público em quatro passos.",
    step1: "Gerar",
    step1Desc: "Peça ao ChatGPT, Claude, Gemini ou qualquer assistente de IA um único arquivo HTML.",
    step2: "Salvar",
    step2Desc: "Copie o código HTML e salve como um arquivo .html no seu computador.",
    step3: "Enviar",
    step3Desc: "Arraste o arquivo para o Leme e adicione um título e descrição.",
    step4: "Compartilhar",
    step4Desc: "Obtenha um link público como leme.app/p/xyz e compartilhe em qualquer lugar.",
    toolsTitle: "Funciona com suas ferramentas de IA favoritas",
    toolsSubtitle: "Envie HTML gerado pelos assistentes de código e construtores de apps mais populares.",
    finalTitle: "Pronto para compartilhar o que você criou?",
    finalSubtitle: "Leva menos de um minuto — não é necessário cadastro para começar.",
  },
  footer: {
    product: "Produto",
    resources: "Recursos",
    social: "Social",
    features: "Funcionalidades",
    pricing: "Preços",
    useCases: "Casos de uso",
    about: "Sobre",
    blog: "Blog",
    faq: "FAQ",
    terms: "Termos",
    privacy: "Privacidade",
    contact: "Contato",
    rights: "Todos os direitos reservados.",
    madeFor: "Feito para HTML gerado por IA.",
  },
  pricing: {
    title: "Planos simples, sem pegadinhas",
    subtitle:
      "Use sem criar conta para testar rapidamente, crie uma conta gratuita para manter mais páginas, ou vá de Pro quando quiser manter tudo online sem limites.",
    noAccount: {
      name: "Sem conta",
      price: "$0",
      description: "Para testar rapidamente, sem cadastro.",
      features: {
        pages: "{count} página ativa por vez",
        expires: "Expira em {days} dias",
        watermark: "Com marca d'água",
      },
      cta: "Usar agora",
    },
    free: {
      name: "Gratuito",
      price: "$0",
      description: "Crie uma conta e tenha mais espaço.",
      features: {
        pages: "{count} páginas ativas ao mesmo tempo",
        expires: "Expira em {days} dias",
        watermark: "Com marca d'água",
      },
      cta: "Criar conta gratuita",
    },
    pro: {
      name: "Pro",
      description: "Para quem quer manter páginas online sem limites.",
      monthly: "Mensal",
      yearly: "Anual",
      priceUnitMonth: "mês",
      priceUnitYear: "ano",
      yearlySavings: "2 meses grátis em relação ao mensal",
      features: ["Páginas ativas ilimitadas", "Nunca expira", "Sem marca d'água"],
      cta: "Fazer upgrade para Pro",
      ctaLoading: "Redirecionando...",
    },
    footerNote: "Pagamentos processados com segurança pelo Stripe. Cancele a qualquer momento nas suas configurações de cobrança.",
  },
  common: {
    expiration: {
      expired: "expirado",
      oneDay: "expira em 1 dia",
      days: "expira em {count} dias",
    },
  },
  dashboard: {
    title: "Meu painel",
    newUpload: "+ Novo envio",
    activePages: "{active}/{max} páginas ativas",
    activePagesUnlimited: "{active} página(s) ativa(s) · sem limite",
    renewsOn: "Renova em {date}",
    cancelsAtPeriodEnd: " · cancela no fim do período",
    yearly: " · anual",
    monthly: " · mensal",
    limitReachedUpgrade: "Limite atingido — fazer upgrade",
    viewProPlan: "Ver plano Pro",
    billingSettings: "Configurações de cobrança",
    emptyState: "Você ainda não enviou nenhum HTML.",
    emptyStateLink: "Faça seu primeiro envio",
    views: "{count} visualizações",
    uploadedOn: "enviado em {date}",
  },
  mine: {
    title: "Meus envios",
    newUpload: "+ Novo envio",
    activePagesInBrowser: "{active}/{max} página(s) ativa(s) neste navegador",
    noAccount: "Sem conta",
    createAccountForSpace: "Crie uma conta gratuita para mais espaço",
    emptyState: "Nenhum envio salvo neste navegador ainda.",
    emptyStateLink: "Envie seu primeiro HTML",
    browserListWarning:
      "Esta lista é salva neste navegador — se você limpar os dados do site ou trocar de dispositivo, ela desaparece.",
    createAccountLink: "Crie uma conta",
    dontLoseUploads: "para não perder seus envios.",
    views: "{count} visualizações",
    uploadedOn: "enviado em {date}",
  },
  blog: {
    title: "Blog Leme",
    subtitle: "Dicas, tutoriais e novidades sobre publicar e compartilhar HTML gerado por IA.",
    readMore: "Ler mais \u2192",
    posts: [
      {
        slug: "how-to-publish-html-from-ai",
        title: "Como publicar HTML do ChatGPT, Claude e Gemini",
        excerpt:
          "Um guia passo a passo para exportar HTML dos assistentes de código de IA mais populares e publicá-lo online com um link compartilhável.",
        date: "2026-08-16",
      },
      {
        slug: "share-ai-landing-page-in-30-seconds",
        title: "Como compartilhar uma landing page gerada por IA em 30 segundos",
        excerpt:
          "Transforme um prompt em uma landing page ao vivo. Envie o HTML para o Leme e envie o link para qualquer pessoa.",
        date: "2026-08-16",
      },
      {
        slug: "collect-feedback-on-html-prototypes",
        title: "A melhor forma de coletar feedback em protótipos HTML",
        excerpt:
          "Por que comentários, sugestões e forks fazem do Leme uma ferramenta leve de feedback para protótipos gerados por IA.",
        date: "2026-08-16",
      },
    ],
  },
  about: {
    metadataDescription:
      "Conheça o Leme: uma forma simples de enviar páginas HTML geradas por IA e compartilhá-las com um link.",
    title: "Sobre o Leme",
    intro:
      "O Leme foi criado para todos que criam HTML com IA e precisam de uma forma rápida e confiável de compartilhar o resultado. Sem configuração de hospedagem, sem pipeline de build — apenas envie seu arquivo e receba um link que pode enviar para qualquer pessoa.",
    whyTitle: "Por que criamos",
    whyText:
      "Ferramentas de IA podem gerar páginas HTML completas em segundos, mas publicá-las ainda é mais difícil do que deveria. Queríamos um lugar onde você pudesse largar um arquivo, pegar um link e seguir em frente.",
    whatTitle: "O que você pode fazer",
    whatItems: [
      "Enviar arquivos HTML únicos até o limite do seu plano",
      "Obter uma página pública e um link compartilhável instantaneamente",
      "Receber comentários, sugestões e forks de visitantes",
      "Fazer upgrade para Pro para páginas ilimitadas e sem marca d'água",
    ],
    cta: "Ver planos",
  },
  features: {
    metadataDescription:
      "Descubra as funcionalidades do Leme: envie HTML, compartilhe links, colabore com comentários, sugestões e forks.",
    title: "Funcionalidades",
    subtitle: "Tudo o que você precisa para publicar e compartilhar páginas HTML geradas por IA.",
    items: [
      {
        title: "Envio instantâneo",
        description: "Arraste ou selecione um arquivo HTML e obtenha um link público em segundos.",
      },
      {
        title: "Páginas compartilháveis",
        description: "Cada envio se torna uma página limpa com sua própria URL, pronta para compartilhar em qualquer lugar.",
      },
      {
        title: "Colaboração",
        description: "Visitantes podem deixar comentários, sugestões ou fazer um fork da sua página para criar algo novo.",
      },
      {
        title: "Não requer conta",
        description: "Teste o Leme sem se cadastrar. Crie uma conta quando quiser manter mais páginas.",
      },
      {
        title: "Plano Pro",
        description: "Remova a marca d'água e mantenha páginas ilimitadas online para sempre.",
      },
      {
        title: "Cobrança simples",
        description: "Faça upgrade ou cancele a qualquer momento nas suas configurações de cobrança.",
      },
    ],
  },
  faq: {
    metadataDescription:
      "Perguntas frequentes sobre o Leme: envie HTML gerado por IA, compartilhe links, colabore e gerencie planos.",
    metadataOpenGraphTitle: "FAQ Leme — Respostas para as dúvidas mais comuns",
    title: "Perguntas Frequentes",
    subtitle: "Tudo o que você precisa saber sobre enviar, compartilhar e colaborar com o Leme.",
    stillQuestionsTitle: "Ainda tem dúvidas?",
    stillQuestionsText: "Envie um email para",
    items: [
      {
        question: "O que é o Leme?",
        answer:
          "O Leme é uma forma rápida de enviar arquivos HTML gerados por IA e publicá-los como páginas web compartilháveis. Você recebe um link público instantaneamente e os visitantes podem comentar, sugerir alterações ou fazer um fork da sua página.",
      },
      {
        question: "Como envio um arquivo HTML?",
        answer:
          "Vá para a página de envio, arraste ou selecione seu arquivo .html, adicione um título e uma descrição opcional e clique em Enviar. O Leme hospeda o arquivo e te dá um link público em segundos.",
      },
      {
        question: "Preciso de uma conta para usar o Leme?",
        answer:
          "Não. Você pode enviar sem se cadastrar. Envios anônimos são salvos no seu navegador, mas têm limites mais rígidos e expiram após alguns dias. Criar uma conta gratuita te dá mais páginas e retenção por mais tempo.",
      },
      {
        question: "Quais ferramentas de IA funcionam com o Leme?",
        answer:
          "Qualquer ferramenta que exporte um único arquivo .html funciona. Opções populares incluem ChatGPT, Claude, Gemini, v0, Lovable, Bolt, Replit e HTML escrito à mão a partir de qualquer gerador de código.",
      },
      {
        question: "Qual é o limite de tamanho do arquivo?",
        answer:
          "O limite atual de envio é 2 MB por arquivo. Isso cobre a maioria das landing pages, portfólios, dashboards e protótipos gerados por IA. Se o arquivo for maior, tente compactar imagens ou dividir a página.",
      },
      {
        question: "Posso compartilhar uma página com outra pessoa?",
        answer:
          "Sim. Cada página recebe um link público como leme.app/p/[id]. Você também pode criar um link de compartilhamento dedicado pela barra lateral, que é mais fácil de copiar e enviar.",
      },
      {
        question: "Como funciona a colaboração?",
        answer:
          "Visitantes com o link podem abrir a barra lateral e deixar comentários, sugestões ou forks. Forks criam uma nova cópia da página que o contribuidor pode editar e compartilhar de volta.",
      },
      {
        question: "O que acontece quando uma página expira?",
        answer:
          "Páginas gratuitas e anônimas expiram após o período de retenção do plano. Uma vez expirada, a página não fica mais disponível. Páginas Pro nunca expiram enquanto a assinatura estiver ativa.",
      },
      {
        question: "Qual a diferença entre o Gratuito e o Pro?",
        answer:
          "O plano Gratuito permite manter um pequeno número de páginas ativas com uma marca d'água do Leme. O plano Pro remove a marca d'água, remove o limite de páginas ativas e mantém as páginas online para sempre.",
      },
      {
        question: "Quanto custa o Pro?",
        answer:
          "O Leme Pro custa $9 por mês ou $90 por ano. O plano anual economiza o equivalente a dois meses em comparação com o pagamento mensal.",
      },
      {
        question: "Posso cancelar o Pro a qualquer momento?",
        answer:
          "Sim. Você pode cancelar a qualquer momento na página de cobrança. Seus benefícios Pro permanecem ativos até o fim do período de cobrança atual.",
      },
      {
        question: "Meu conteúdo enviado é público?",
        answer:
          "As páginas enviadas ao Leme são públicas por padrão através dos links compartilháveis. Qualquer pessoa com o link pode ver a página. Não envie conteúdo sensível, privado ou confidencial.",
      },
      {
        question: "Posso excluir uma página?",
        answer:
          "Sim. Se você criou a página estando logado, pode excluí-la no seu painel. Páginas anônimas estão vinculadas ao seu navegador e podem ser removidas na página Meus envios.",
      },
      {
        question: "O Leme funciona no celular?",
        answer:
          "Sim. O site do Leme é responsivo. Você pode enviar, visualizar e compartilhar páginas de qualquer navegador moderno em desktop, tablet ou celular.",
      },
      {
        question: "Posso usar meu próprio domínio?",
        answer:
          "Ainda não. Hoje cada página é hospedada sob leme.app. Domínios personalizados estão no roteiro para uma versão futura.",
      },
      {
        question: "O Leme suporta CSS, JavaScript e imagens dentro do HTML?",
        answer:
          "Sim. Um único arquivo .html que inclui CSS, JavaScript e imagens em base64 inline será renderizado corretamente. Ativos externos vinculados por URL podem carregar dependendo de CORS e disponibilidade.",
      },
      {
        question: "Como denuncio abuso ou conteúdo com direitos autorais?",
        answer:
          "Envie um email para hello@leme-app.com com o link da página e uma descrição. Revisamos denúncias e tomamos medidas contra conteúdo que viola nossos Termos de Serviço.",
      },
      {
        question: "Existe uma API pública?",
        answer: "Não. O Leme é projetado para envios manuais pela interface web. Acesso via API não está disponível.",
      },
      {
        question: "Quem criou o Leme?",
        answer:
          "O Leme foi criado por uma pequena equipe focada em tornar HTML gerado por IA fácil de publicar e compartilhar. Somos independentes, bootstrapped e financiados por clientes através de assinaturas Pro.",
      },
      {
        question: "Como entro em contato?",
        answer: "Envie um email para hello@leme-app.com ou entre em contato pelo Twitter / X e LinkedIn.",
      },
    ],
  },
  useCases: {
    metadataDescription:
      "Descubra como equipes e criadores usam o Leme para publicar e compartilhar páginas HTML geradas por IA: landing pages, portfólios, protótipos, dashboards e mais.",
    metadataOpenGraphTitle: "Casos de uso do Leme — Publique HTML gerado por IA para qualquer projeto",
    title: "O que você pode publicar com o Leme?",
    subtitle: "Qualquer arquivo HTML gerado por IA se torna uma página online compartilhável. Aqui estão as formas mais comuns de usar o Leme.",
    ctaTitle: "Tem um arquivo HTML pronto?",
    ctaSubtitle: "Envie agora e obtenha um link compartilhável em segundos.",
    ctaButton: "Enviar seu HTML",
    items: [
      {
        title: "Landing pages",
        description:
          "Gere uma landing page de marketing completa com um assistente de código de IA, envie para o Leme e compartilhe o link com sua equipe, clientes ou stakeholders em segundos.",
        keywords: ["landing page de IA", "compartilhar landing page", "hospedar landing page HTML"],
      },
      {
        title: "Portfólios",
        description:
          "Transforme um arquivo HTML único de um experimento de design ou projeto pessoal em uma peça de portfólio online. Perfeito para designers, desenvolvedores e estudantes que querem uma demonstração pública rápida.",
        keywords: ["portfólio de IA", "compartilhar portfólio HTML", "hospedar portfólio online"],
      },
      {
        title: "Protótipos e MVPs",
        description:
          "Construa um protótipo interativo com IA, publique no Leme e colete feedback através de comentários e sugestões sem precisar configurar um pipeline de deploy completo.",
        keywords: ["protótipo de IA", "hospedar protótipo HTML", "compartilhar MVP"],
      },
      {
        title: "Dashboards",
        description:
          "Publique HTML de dashboards gerados por IA com gráficos e tabelas para que a equipe possa visualizar o layout e a interação sem precisar de backend ou banco de dados conectado.",
        keywords: ["dashboard de IA", "hospedar dashboard HTML", "compartilhar dashboard"],
      },
      {
        title: "Newsletters e one-pagers",
        description:
          "Crie uma página de email ou anúncio bonita em uma única página com IA, hospede no Leme e compartilhe o link na sua newsletter, redes sociais ou chat.",
        keywords: ["one-pager de IA", "hospedar newsletter HTML", "compartilhar one-pager"],
      },
      {
        title: "Formulários e micro-apps",
        description:
          "Envie formulários HTML pequenos, calculadoras ou widgets interativos gerados por IA e compartilhe com um link direto. Ideal para experimentos rápidos e testes com usuários.",
        keywords: ["hospedar formulário de IA", "micro-app HTML", "compartilhar formulário HTML"],
      },
      {
        title: "Documentação e demonstrações",
        description:
          "Publique páginas de documentação técnica, demonstrações de componentes ou guias de estilo gerados a partir de prompts de IA para que sua equipe tenha uma referência online para revisar e discutir.",
        keywords: ["documentação de IA", "hospedar demonstração HTML", "compartilhar documentação"],
      },
      {
        title: "Páginas de eventos e campanhas",
        description:
          "Gere uma campanha sazonal ou página de evento com IA e publique instantaneamente. Atualize fazendo um fork da página e compartilhando a nova versão.",
        keywords: ["página de campanha de IA", "hospedar página de evento", "compartilhar campanha HTML"],
      },
    ],
  },
  aiLanding: {
    worksWith: "Funciona com {toolName}",
    howItWorks: "Como funciona",
    commonUseCases: "Casos de uso comuns",
    readyToPublish: "Pronto para publicar seu HTML do {toolName}?",
    ctaUpload: "Enviar seu HTML",
    noAccount: "Envie seu arquivo e obtenha um link público em segundos. Não é necessário conta para testar.",
    whyUseLeme: "Por que usar o Leme com {toolName}?",
    whyPoints: [
      "Obtenha um link público sem sair do navegador.",
      "Compartilhe a página com qualquer pessoa, mesmo que ela não tenha acesso ao {toolName}.",
      "Colete feedback, sugestões e forks de revisores.",
      "Mantenha páginas online para sempre com o Leme Pro.",
    ],
  },
  aiTools: {
    chatgpt: {
      metadataTitle: "Hospede e compartilhe HTML do ChatGPT",
      metadataDescription:
        "Envie HTML gerado pelo ChatGPT para o Leme e obtenha um link público compartilhável em segundos. Sem necessidade de configuração de hospedagem.",
      ogTitle: "Hospede HTML do ChatGPT — Leme",
      ogDescription: "Envie HTML gerado pelo ChatGPT e compartilhe com um link público.",
      headline: "Hospede e compartilhe HTML do ChatGPT",
      description:
        "O ChatGPT pode escrever landing pages, portfólios e protótipos completos em um único arquivo HTML. Envie esse arquivo para o Leme e obtenha um link público que pode ser compartilhado em qualquer lugar.",
      useCases: ["Landing pages do ChatGPT", "Portfólios do ChatGPT", "Protótipos do ChatGPT", "One-page sites do ChatGPT"],
      steps: [
        "Peça ao ChatGPT para gerar uma página HTML completa e de arquivo único com CSS inline. Por exemplo: 'Crie uma landing page responsiva para um produto SaaS em um único arquivo HTML.'",
        "Copie a resposta HTML completa e salve como page.html no seu computador.",
        "Abra o Leme, arraste o arquivo para o formulário de envio e adicione um título e descrição opcional.",
        "Clique em Enviar. O Leme hospeda a página e te dá um link público como leme.app/p/xyz.",
        "Compartilhe o link com colegas, clientes ou nas redes sociais. Visitantes também podem deixar comentários e sugestões.",
      ],
      schemaName: "Como publicar HTML do ChatGPT com o Leme",
      schemaDescription:
        "Guia passo a passo para enviar HTML gerado pelo ChatGPT para o Leme e obter um link público compartilhável.",
    },
    bolt: {
      metadataTitle: "Hospede e compartilhe HTML do Bolt",
      metadataDescription:
        "Envie HTML gerado pelo Bolt para o Leme e obtenha um link público compartilhável em segundos. Compartilhe protótipos e one-page sites do Bolt sem um deploy completo.",
      ogTitle: "Hospede HTML do Bolt — Leme",
      ogDescription: "Envie HTML gerado pelo Bolt e compartilhe com um link público.",
      headline: "Hospede e compartilhe HTML do Bolt",
      description:
        "O Bolt cria apps full-stack a partir de prompts. Exporte uma única página HTML ou snapshot do seu projeto Bolt e envie para o Leme para compartilhar uma visualização ao vivo instantaneamente.",
      useCases: ["Prévias de apps do Bolt", "Landing pages do Bolt", "Protótipos do Bolt", "Demonstrações compartilháveis do Bolt"],
      steps: [
        "Gere uma página ou app no Bolt. Escolha uma única tela ou landing page que possa ser exportada como um arquivo HTML independente.",
        "Copie ou exporte o código HTML e salve como page.html. Certifique-se de que estilos e scripts estejam inline para que o arquivo funcione sozinho.",
        "Envie o arquivo para o Leme e adicione um título e descrição.",
        "Clique em Enviar para obter um link público como leme.app/p/xyz.",
        "Compartilhe o link com stakeholders. Eles podem revisar, comentar, sugerir ou fazer um fork da página.",
      ],
      schemaName: "Como publicar HTML do Bolt com o Leme",
      schemaDescription:
        "Guia passo a passo para enviar HTML gerado pelo Bolt para o Leme e obter um link público compartilhável.",
    },
    claude: {
      metadataTitle: "Hospede e compartilhe HTML do Claude",
      metadataDescription:
        "Envie HTML gerado pelo Claude para o Leme e obtenha um link público compartilhável em segundos. Perfeito para Claude Artifacts e protótipos.",
      ogTitle: "Hospede HTML do Claude — Leme",
      ogDescription: "Envie HTML gerado pelo Claude e compartilhe com um link público.",
      headline: "Hospede e compartilhe HTML do Claude",
      description:
        "O Claude, incluindo Claude Artifacts, pode gerar páginas HTML polidas e componentes. Envie-os para o Leme para torná-los públicos e compartilháveis sem nenhum deploy.",
      useCases: ["Hospedagem de Claude Artifacts", "Protótipos do Claude", "Landing pages do Claude", "Demonstrações de componentes do Claude"],
      steps: [
        "Gere uma página ou artifact no Claude. Peça um único arquivo HTML auto-contido com CSS e JavaScript inline.",
        "Mude para a visualização de código no painel de Claude Artifact e copie o código HTML completo.",
        "Salve o código como page.html no seu computador.",
        "Envie o arquivo para o Leme, adicione um título e clique em Enviar.",
        "Copie o link público e compartilhe. Revisores podem deixar comentários, sugestões ou forks na barra lateral.",
      ],
      schemaName: "Como publicar HTML do Claude com o Leme",
      schemaDescription:
        "Guia passo a passo para enviar HTML gerado pelo Claude ou Claude Artifacts para o Leme e obter um link público compartilhável.",
    },
    gemini: {
      metadataTitle: "Hospede e compartilhe HTML do Gemini",
      metadataDescription:
        "Envie HTML gerado pelo Google Gemini para o Leme e obtenha um link público compartilhável em segundos. Sem necessidade de hospedagem ou build.",
      ogTitle: "Hospede HTML do Gemini — Leme",
      ogDescription: "Envie HTML gerado pelo Gemini e compartilhe com um link público.",
      headline: "Hospede e compartilhe HTML do Gemini",
      description:
        "O Gemini pode gerar páginas HTML, componentes e pequenos web apps. Envie o arquivo HTML gerado para o Leme e publique-o como uma página ao vivo com um link compartilhável.",
      useCases: ["Landing pages do Gemini", "Protótipos do Gemini", "Dashboards do Gemini", "One-page sites do Gemini"],
      steps: [
        "Peça ao Gemini para criar uma página HTML completa e de arquivo único. Por exemplo: 'Crie uma página de portfólio responsiva em um único arquivo HTML com CSS inline.'",
        "Copie o HTML gerado e salve como page.html.",
        "Abra o Leme e envie o arquivo. Adicione um título e descrição opcional para que visitantes entendam a página.",
        "Clique em Enviar e obtenha um link público como leme.app/p/xyz.",
        "Compartilhe o link. A barra lateral permite que visitantes colaborem com comentários, sugestões e forks.",
      ],
      schemaName: "Como publicar HTML do Gemini com o Leme",
      schemaDescription:
        "Guia passo a passo para enviar HTML gerado pelo Google Gemini para o Leme e obter um link público compartilhável.",
    },
    lovable: {
      metadataTitle: "Hospede e compartilhe HTML do Lovable",
      metadataDescription:
        "Envie HTML gerado pelo Lovable para o Leme e obtenha um link público compartilhável em segundos. Publique apps do Lovable como páginas independentes.",
      ogTitle: "Hospede HTML do Lovable — Leme",
      ogDescription: "Envie HTML gerado pelo Lovable e compartilhe com um link público.",
      headline: "Hospede e compartilhe HTML do Lovable",
      description:
        "O Lovable cria apps full-stack e páginas. Exporte um snapshot HTML único do seu projeto Lovable e envie para o Leme para uma prévia pública rápida.",
      useCases: ["Prévias de apps do Lovable", "Landing pages do Lovable", "Protótipos do Lovable", "Demonstrações compartilháveis do Lovable"],
      steps: [
        "Gere uma página ou app no Lovable. Foque em uma única tela ou landing page que funcione como um arquivo HTML independente.",
        "Exporte ou copie o código HTML e salve como page.html. Deixe CSS e JavaScript inline para que o arquivo funcione sozinho.",
        "Envie o arquivo para o Leme e preencha o título e descrição.",
        "Clique em Enviar para obter um link público.",
        "Compartilhe o link com revisores. Eles podem deixar comentários e sugestões sem precisar de acesso ao Lovable.",
      ],
      schemaName: "Como publicar HTML do Lovable com o Leme",
      schemaDescription:
        "Guia passo a passo para enviar HTML gerado pelo Lovable para o Leme e obter um link público compartilhável.",
    },
    v0: {
      metadataTitle: "Hospede e compartilhe HTML do v0",
      metadataDescription:
        "Envie HTML gerado pelo v0 para o Leme e obtenha um link público compartilhável em segundos. Compartilhe seus protótipos do v0 sem fazer deploy de um projeto completo.",
      ogTitle: "Hospede HTML do v0 — Leme",
      ogDescription: "Envie HTML gerado pelo v0 e compartilhe com um link público.",
      headline: "Hospede e compartilhe HTML do v0",
      description:
        "O v0 gera componentes React e HTML bonitos. Exporte um único arquivo HTML do v0 e envie para o Leme para compartilhar uma prévia ao vivo com qualquer pessoa.",
      useCases: ["Prévias de componentes do v0", "Landing pages do v0", "Protótipos do v0", "Demonstrações de UI do v0"],
      steps: [
        "Gere uma UI ou página no v0. Peça um único arquivo HTML auto-contido, ou exporte o código gerado e agrupe-o em um arquivo HTML.",
        "Copie o código HTML e salve como page.html.",
        "Envie o arquivo para o Leme e adicione um título e descrição claros.",
        "Clique em Enviar para obter um link público.",
        "Compartilhe o link e colete feedback através de comentários, sugestões e forks.",
      ],
      schemaName: "Como publicar HTML do v0 com o Leme",
      schemaDescription:
        "Guia passo a passo para enviar HTML gerado pelo v0 para o Leme e obter um link público compartilhável.",
    },
  },
  blogPosts: {
    howToPublish: {
      metadataTitle: "Como publicar HTML do ChatGPT, Claude e Gemini",
      metadataDescription:
        "Aprenda a exportar HTML do ChatGPT, Claude, Gemini e outros assistentes de código de IA e publicá-lo online com o Leme.",
      ogTitle: "Como publicar HTML do ChatGPT, Claude e Gemini",
      ogDescription: "Guia passo a passo para exportar HTML gerado por IA e compartilhá-lo com um link público.",
      title: "Como publicar HTML do ChatGPT, Claude e Gemini",
      subtitle:
        "Um guia passo a passo para exportar HTML dos assistentes de código de IA mais populares e publicá-lo online com um link compartilhável.",
      ctaTitle: "Experimente agora",
      ctaSubtitle: "Envie um arquivo HTML e obtenha um link compartilhável em segundos.",
      sections: [
        {
          type: "paragraph",
          content:
            "Assistentes de código de IA podem gerar páginas HTML completas em segundos. O problema é compartilhá-las. A maioria das pessoas cola o código em um arquivo local, abre no navegador e envia uma captura de tela. Funciona para uma olhada rápida, mas não é um link compartilhável de verdade.",
        },
        { type: "heading", content: "O fluxo de trabalho mais fácil" },
        {
          type: "list",
          items: [
            "Peça à IA uma página HTML de arquivo único. Por exemplo: 'Crie uma landing page para uma cafeteria em um único arquivo HTML com CSS inline.'",
            "Copie o código HTML gerado.",
            "Salve como page.html no seu computador.",
            "Vá para o envio do Leme e selecione o arquivo.",
            "Adicione um título e descrição opcional.",
            "Clique em Enviar. Você recebe um link público como leme.app/p/xyz.",
          ],
        },
        { type: "heading", content: "ChatGPT" },
        {
          type: "paragraph",
          content:
            "No ChatGPT, peça um arquivo HTML completo. Se a saída for muito longa, peça para continuar. Depois de ter o código completo, salve como .html e envie para o Leme. O ChatGPT Code Interpreter também pode gerar arquivos HTML diretamente se você pedir para escrever e exportar o arquivo.",
        },
        { type: "heading", content: "Claude" },
        {
          type: "paragraph",
          content:
            "O Claude Artifacts pode renderizar HTML e componentes React. Quando o Claude mostrar um artifact, clique na visualização de código, copie o HTML e salve. O Leme hospedará esse HTML exato e o tornará compartilhável com qualquer pessoa.",
        },
        { type: "heading", content: "Gemini" },
        {
          type: "paragraph",
          content:
            "O Gemini pode gerar snippets HTML em sua resposta. Peça um único arquivo HTML auto-contido com estilos inline. Copie o resultado, salve e envie para o Leme.",
        },
        { type: "heading", content: "Outras ferramentas" },
        {
          type: "paragraph",
          content:
            "O mesmo fluxo funciona para v0, Lovable, Bolt, Replit Agent e qualquer outra ferramenta que produza um único arquivo HTML. Se a ferramenta exportar um ZIP ou vários arquivos, primeiro combine o CSS e JavaScript no arquivo HTML e depois envie.",
        },
        { type: "heading", content: "O que torna o Leme útil" },
        {
          type: "list",
          items: [
            "Sem configuração de hospedagem.",
            "Link público instantâneo.",
            "Funciona em desktop e celular.",
            "Visitantes podem deixar comentários e sugestões.",
            "Gratuito para testar; Pro para páginas ilimitadas e sem marca d'água.",
          ],
        },
      ],
    },
    shareLandingPage: {
      metadataTitle: "Como compartilhar uma landing page gerada por IA em 30 segundos",
      metadataDescription:
        "Transforme um prompt em uma landing page ao vivo. Envie o HTML gerado por IA para o Leme e envie o link para qualquer pessoa.",
      ogTitle: "Como compartilhar uma landing page gerada por IA em 30 segundos",
      ogDescription: "Do prompt ao link público em menos de um minuto usando o Leme.",
      title: "Como compartilhar uma landing page gerada por IA em 30 segundos",
      subtitle: "Do prompt ao link público em menos de um minuto. Sem deploy, sem conta de hospedagem, sem build.",
      ctaTitle: "Crie sua landing page",
      ctaSubtitle: "Envie seu HTML gerado por IA e obtenha um link em segundos.",
      sections: [
        {
          type: "paragraph",
          content:
            "Landing pages são um dos melhores casos de uso para assistentes de código de IA. Você descreve seu produto, a IA escreve o copy, escolhe cores e constrói um layout responsivo. A única peça faltante é uma URL pública.",
        },
        { type: "heading", content: "O fluxo de 30 segundos" },
        {
          type: "list",
          items: [
            "Prompt da IA: 'Crie uma landing page responsiva para um SaaS que ajuda pessoas a compartilhar HTML gerado por IA. Arquivo HTML único, CSS inline, design moderno.'",
            "Salve a resposta como landing.html.",
            "Abra o envio do Leme.",
            "Solte o arquivo, adicione um título e clique em Enviar.",
            "Copie o link público e compartilhe.",
          ],
        },
        { type: "heading", content: "Por que isso vence outras opções" },
        {
          type: "list",
          items: [
            "GitHub Pages exige um repositório e um commit.",
            "Netlify Drop é ótimo para pastas, mas exagero para um único arquivo.",
            "Vercel é feito para frameworks, não arquivos HTML simples.",
            "O Leme foi feito exatamente para isso: um arquivo HTML, um link público.",
          ],
        },
        { type: "heading", content: "Compartilhe com contexto" },
        {
          type: "paragraph",
          content:
            "Quando você compartilha um link do Leme, visitantes podem abrir a barra lateral para ver o título, descrição e até deixar comentários. Isso o torna perfeito para feedback inicial, revisões de clientes e colaboração em equipe.",
        },
        { type: "heading", content: "Mantenha-a online para sempre" },
        {
          type: "paragraph",
          content:
            "Páginas gratuitas e anônimas expiram após um tempo. Se você quer uma landing page que fique online sem marcas d'água, faça upgrade para o Leme Pro para páginas ilimitadas e hospedagem permanente.",
        },
      ],
    },
    collectFeedback: {
      metadataTitle: "A melhor forma de coletar feedback em protótipos HTML",
      metadataDescription:
        "Por que comentários, sugestões e forks fazem do Leme uma ferramenta leve de feedback para protótipos HTML gerados por IA.",
      ogTitle: "A melhor forma de coletar feedback em protótipos HTML",
      ogDescription: "Colete comentários, sugestões e forks em protótipos HTML gerados por IA com o Leme.",
      title: "A melhor forma de coletar feedback em protótipos HTML",
      subtitle:
        "Por que comentários, sugestões e forks fazem do Leme uma ferramenta leve de feedback para protótipos gerados por IA.",
      ctaTitle: "Comece a coletar feedback",
      ctaSubtitle: "Envie seu protótipo e compartilhe com sua equipe.",
      sections: [
        {
          type: "paragraph",
          content:
            "Protótipos são feitos para ser revisados. Mas quando você compartilha um arquivo HTML por email ou Slack, recebe feedback vago como 'parece bom' ou 'muda o azul.' O Leme transforma um arquivo estático em uma superfície de revisão colaborativa.",
        },
        { type: "heading", content: "Três tipos de feedback" },
        {
          type: "list",
          items: [
            "Comentários: Pensamentos e reações gerais sobre a página toda ou uma ideia específica.",
            "Sugestões: Propostas concretas de mudança, como 'aumente o título' ou 'adicione uma seção de preços.'",
            "Forks: Um contribuidor pode criar uma cópia da página, editá-la e compartilhar a nova versão de volta. É o mais próximo de um pull request para uma página gerada por IA.",
          ],
        },
        { type: "heading", content: "Como usar" },
        {
          type: "list",
          items: [
            "Gere seu protótipo com um assistente de IA.",
            "Envie para o Leme.",
            "Compartilhe o link com revisores.",
            "Revisores abrem a barra lateral e adicionam comentários ou sugestões.",
            "Para mudanças maiores, peça a um revisor para fazer um fork da página e iterar.",
          ],
        },
        { type: "heading", content: "Quando usar o Leme em vez de Figma ou GitHub" },
        {
          type: "paragraph",
          content:
            "Figma é ótimo para design, e GitHub é ótimo para código. O Leme fica no meio: a página já é HTML ao vivo, mas você ainda precisa de feedback rápido antes de fazer um deploy completo. É ideal para projetos paralelos, prévias de clientes e experimentos pontuais gerados por IA.",
        },
        { type: "heading", content: "Mantenha um registro" },
        {
          type: "paragraph",
          content:
            "Como cada página tem sua própria URL, você pode compartilhar a versão A, depois a B, depois a C. Cada link é um snapshot. Revisores podem compará-las facilmente e você pode manter a melhor como versão final.",
        },
      ],
    },
  },
  terms: {
    metadataTitle: "Termos de Serviço",
    metadataDescription: "Termos de serviço para uso do Leme.",
    title: "Termos de Serviço",
    lastUpdated: "Última atualização: agosto de 2026",
    sections: [
      {
        title: "1. Aceitação dos Termos",
        paragraphs: [
          "Ao acessar ou usar o Leme, você concorda em estar vinculado a estes Termos de Serviço. Se não concordar, por favor não use o serviço.",
        ],
      },
      {
        title: "2. Descrição do Serviço",
        paragraphs: [
          "O Leme é uma plataforma que permite aos usuários enviar arquivos HTML, gerar links compartilháveis e colaborar através de comentários, sugestões e forks.",
        ],
      },
      {
        title: "3. Conteúdo do Usuário",
        paragraphs: [
          "Você mantém a propriedade de qualquer conteúdo que enviar. Ao enviar conteúdo, você concede ao Leme uma licença limitada para hospedar, exibir e compartilhar esse conteúdo conforme necessário para fornecer o serviço.",
          "Você é o único responsável pelo conteúdo que enviar. Não envie conteúdo ilegal, prejudicial, infrator ou que viole os direitos de outros.",
        ],
      },
      {
        title: "4. Usos Proibidos",
        paragraphs: [
          "Você não pode usar o Leme para distribuir malware, páginas de phishing, spam ou qualquer conteúdo que viole leis ou regulamentos aplicáveis.",
        ],
      },
      {
        title: "5. Assinaturas Pagas",
        paragraphs: [
          "O Leme oferece planos gratuitos e pagos. As assinaturas pagas são faturadas através do Stripe e podem ser canceladas a qualquer momento nas suas configurações de cobrança.",
        ],
      },
      {
        title: "6. Cancelamento",
        paragraphs: [
          "Reservamos o direito de suspender ou cancelar contas que violem estes termos ou abusem do serviço.",
        ],
      },
      {
        title: "7. Alterações nos Termos",
        paragraphs: [
          "Podemos atualizar estes termos de tempos em tempos. O uso continuado do serviço após as alterações constitui aceitação dos termos atualizados.",
        ],
      },
      {
        title: "8. Contato",
        paragraphs: [
          "Para dúvidas sobre estes termos, entre em contato conosco pela nossa página de contato.",
        ],
      },
    ],
  },
  privacy: {
    metadataTitle: "Política de Privacidade",
    metadataDescription: "Política de privacidade para usuários do Leme.",
    title: "Política de Privacidade",
    lastUpdated: "Última atualização: agosto de 2026",
    sections: [
      {
        title: "1. Informações que Coletamos",
        paragraphs: [
          "Quando você usa o Leme, podemos coletar informações que você fornece diretamente, como seu endereço de email ao entrar, e identificadores anônimos quando você envia sem uma conta.",
        ],
      },
      {
        title: "2. Conteúdo Enviado",
        paragraphs: [
          "Os arquivos HTML que você envia são armazenados com segurança para que possamos servi-los através de links compartilháveis. Não escaneamos ou usamos o conteúdo dos seus envios para fins publicitários.",
        ],
      },
      {
        title: "3. Autenticação",
        paragraphs: [
          "O Leme usa Firebase Authentication para login. Armazenamos um identificador único de usuário e seu endereço de email quando você se autentica.",
        ],
      },
      {
        title: "4. Pagamentos",
        paragraphs: [
          "Os pagamentos são processados pelo Stripe. Não armazenamos os dados do seu cartão de pagamento. O Stripe pode coletar informações necessárias para processar pagamentos sob sua própria política de privacidade.",
        ],
      },
      {
        title: "5. Cookies e Análises",
        paragraphs: [
          "Usamos cookies essenciais para mantê-lo logado e lembrar envios anônimos no seu navegador. Não usamos cookies de publicidade de terceiros.",
        ],
      },
      {
        title: "6. Retenção de Dados",
        paragraphs: [
          "As páginas enviadas são retidas de acordo com o seu plano. Páginas gratuitas e anônimas expiram após o período de retenção do plano. Páginas Pro são mantidas enquanto sua assinatura estiver ativa.",
        ],
      },
      {
        title: "7. Seus Direitos",
        paragraphs: [
          "Você pode excluir suas páginas enviadas a qualquer momento. Se tiver dúvidas sobre seus dados, entre em contato conosco pela nossa página de contato.",
        ],
      },
      {
        title: "8. Alterações nesta Política",
        paragraphs: [
          "Podemos atualizar esta política de privacidade de tempos em tempos. Alterações significativas serão publicadas nesta página.",
        ],
      },
    ],
  },
  login: {
    title: "Entrar",
    subtitle: "Acesse sua conta para gerenciar seus envios e links compartilháveis.",
    googleSignIn: "Entrar com Google",
    googleSignInLoading: "Abrindo Google...",
    or: "ou",
    magicLink: "Link mágico",
    emailAndPassword: "Email e senha",
    emailLabel: "Email",
    emailPlaceholder: "voce@email.com",
    passwordLabel: "Senha",
    passwordPlaceholder: "••••••••",
    sendMagicLink: "Enviar link mágico",
    sending: "Enviando...",
    signIn: "Entrar",
    createAccount: "Criar conta",
    pleaseWait: "Aguarde...",
    noAccount: "Não tem uma conta? Crie uma agora",
    hasAccount: "Já tem uma conta? Entre",
    magicLinkSent: "Link mágico enviado! Verifique sua caixa de entrada para continuar.",
  },
  auth: {
    codeErrorTitle: "Não foi possível confirmar seu login",
    codeErrorSubtitle:
      "O link pode ter expirado ou já sido usado. Tente entrar novamente.",
    codeErrorCta: "Voltar para o login",
    callbackConfirming: "Confirmando seu login...",
    callbackEmailPrompt: "Confirme seu email para finalizar o login",
    callbackError: "Este link pode ter expirado ou já sido usado.",
  },
  uploadLanding: {
    title: "Envie seu HTML",
    savedFile: "Seu arquivo salvo",
    savedFiles: "Seus arquivos salvos",
    noAccount: "Sem conta? Sem problema — seu envio fica salvo neste navegador, acesse depois em {link}.",
    myUploads: "Meus envios",
  },
  uploadForm: {
    fileLabel: "Arquivo HTML (.html, até 2MB)",
    titleLabel: "Título",
    titlePlaceholder: "Ex.: Landing page gerada com GPT",
    descriptionLabel: "Descrição (opcional)",
    descriptionPlaceholder: "Conte um pouco sobre este HTML...",
    uploading: "Enviando...",
    upload: "Enviar",
    errors: {
      notHtml: "Selecione um arquivo .html.",
      tooLarge: "O arquivo deve ter no máximo 2MB.",
      noFile: "Escolha um arquivo .html para enviar.",
      generic: "Erro de conexão ao enviar o arquivo.",
    },
  },
  planUpsell: {
    usage: "{active}/{max} páginas ativas usadas.",
    atLimit: "Você atingiu o limite de {max} página(s) ativa(s).",
    description: "O Pro remove o limite, tira a marca d'água e as páginas nunca expiram.",
    cta: "Fazer upgrade para Pro",
  },
  planLabels: {
    anonymous: "Anônimo",
    free: "Gratuito",
    pro: "Pro",
  },
  expiredNotice: {
    title: "Esta página expirou",
    description:
      "O plano do autor limita por quanto tempo a página fica online. Se você é o autor, faça upgrade para o plano Pro para evitar que suas páginas expirem.",
    cta: "Voltar para a home",
  },
  uploadsMenu: {
    title: "Seus envios",
    empty: "Você ainda não tem outros envios.",
    views: "{count} visualizações",
    viewingNow: "visualizando agora",
    deleteLabel: "Excluir envio",
    deleteConfirm: "Excluir \"{title}\"? A página, o link e os comentários somem de vez.",
    deleteError: "Não foi possível excluir o envio.",
    deleteTitle: "Excluir este envio?",
    deleteCta: "Excluir",
    cancel: "Cancelar",
  },
  billing: {
    title: "Cobrança",
    subtitle: "Gerencie seu plano, intervalo de cobrança e faturas.",
    subscription: {
      title: "Assinatura",
      freePlan: "Você está no plano Gratuito. Faça upgrade para o Pro para manter páginas online para sempre e remover a marca d'água.",
      viewPlans: "Ver planos",
      proTitle: "Plano Pro",
      billedAnnually: "Cobrança anual",
      billedMonthly: "Cobrança mensal",
      statusActive: "Ativo",
      statusCancelsSoon: "Cancela em breve",
      currentPeriodEnds: "Período atual termina",
      billingInterval: "Intervalo de cobrança",
      intervalYearly: "Anual",
      intervalMonthly: "Mensal",
      cancelWarning:
        "Seu plano Pro está programado para cancelar ao final do período de cobrança atual. Você pode reativá-lo antes disso para manter os benefícios.",
      syncing: "Sincronizando detalhes da assinatura...",
    },
    invoices: {
      title: "Histórico de faturas",
      loading: "Carregando faturas...",
      error: "Não foi possível carregar as faturas.",
      empty: "Nenhuma fatura ainda.",
      invoice: "Fatura",
      view: "Ver",
      statusPaid: "pago",
    },
    actions: {
      manageBilling: "Gerenciar cobrança",
      manageBillingLoading: "Abrindo...",
      cancelSubscription: "Cancelar assinatura",
      cancelling: "Cancelando...",
      cancelConfirm:
        "Tem certeza de que deseja cancelar seu plano Pro? Você manterá o acesso até o final do período de cobrança atual.",
      cancelConfirmTitle: "Cancelar o plano Pro?",
      cancelKeep: "Manter plano",
      cancelError: "Falha ao cancelar a assinatura.",
      upgradeToAnnual: "Mudar para anual",
      upgrading: "Abrindo checkout...",
      upgradeError: "Falha ao iniciar o upgrade.",
    },
  },
  pageViewer: {
    pageLink: "Link da página",
    views: "{count} visualizações",
    uploadedOn: "enviado em {date}",
    sourceNote: "via link compartilhado",
    reopenLabel: "Colaborar",
  },
  collapsibleSidebar: {
    show: "Mostrar barra lateral",
    hide: "Esconder barra lateral",
  },
  copyLink: {
    copy: "Copiar",
    copied: "Copiado!",
  },
  contributions: {
    typeComment: "Comentário",
    typeSuggestion: "Sugestão",
    typeFork: "Fork",
    authorPlaceholder: "Seu nome (opcional)",
    forkTitlePlaceholder: "Título do fork",
    forkHtmlLabel: "Edite o HTML antes de criar o fork:",
    commentPlaceholder: "Deixe um comentário...",
    suggestionPlaceholder: "Descreva sua sugestão...",
    forkMessagePlaceholder: "Mensagem sobre este fork (opcional)",
    submit: "Enviar",
    createFork: "Criar fork",
    submitting: "Enviando...",
    emptyState: "Nenhuma contribuição ainda. Seja o primeiro!",
    viewFork: "Ver fork →",
    error: "Erro de conexão ao enviar a contribuição.",
    forkOf: "Fork de {title}",
    forkDisabledHint: "Forks estão desabilitados para esta página.",
  },
  forkEditor: {
    title: "Fork de {title}",
    subtitle: "Edite o HTML com syntax highlighting e preview ao vivo antes de criar o fork.",
    close: "Fechar editor",
    htmlTab: "HTML",
    previewTab: "Preview",
    editTitle: "Título do fork",
    authorLabel: "Seu nome",
    messageLabel: "Mensagem sobre este fork (opcional)",
    iconLabel: "Ícone da página",
    iconEmoji: "Emoji",
    iconText: "Texto",
    iconColor: "Cor de fundo",
    cancel: "Cancelar",
    next: "Próximo",
    back: "Voltar",
    createFork: "Criar fork",
    creating: "Criando...",
    openEditor: "Abrir editor de HTML",
  },
  shareButton: {
    share: "Compartilhar",
    generating: "Gerando...",
    error: "Erro de conexão ao gerar o link.",
  },
  meta: {
    loginTitle: "Entrar",
    loginDescription:
      "Entre no Leme para gerenciar suas páginas HTML enviadas e seus links compartilháveis.",
    mineTitle: "Meus envios",
    mineDescription: "Veja seus envios anônimos no Leme.",
    dashboardTitle: "Painel",
    dashboardDescription:
      "Gerencie suas páginas HTML enviadas e seus links compartilháveis no Leme.",
    billingTitle: "Cobrança",
    billingDescription:
      "Gerencie sua assinatura Leme Pro, o intervalo de cobrança e as faturas.",
    newTitle: "Enviar HTML",
    newDescription:
      "Envie um arquivo HTML gerado por IA para o Leme e receba um link compartilhável.",
    pageNotFound: "Página não encontrada",
    sharedPageNotFound: "Página compartilhada não encontrada",
    untitledPage: "Página compartilhada",
    viewPageDescription: "Veja {title} no Leme.",
  },
  pageMemory: {
    title: "Memória compartilhada",
    loading: "Carregando memória compartilhada...",
    error: "Não foi possível carregar a memória compartilhada.",
    empty: "Nenhum dado salvo ainda. Abra esta página e edite um campo para vê-lo aqui.",
    filterPlaceholder: "Filtrar chaves ou valores...",
    exportCsv: "Exportar CSV",
  },
  newMemoryAlert: {
    message: "Novos dados foram adicionados a esta página.",
    reload: "Recarregar",
    dismiss: "Ignorar",
  },
  pageSettings: {
    title: "Configurações da página",
    proOnly: "Pro",
    contributions: "Permitir contribuições",
    contributionsHint: "Visitantes podem comentar e sugerir alterações nesta página.",
    forks: "Permitir forks",
    forksHint: "Visitantes podem fazer um fork desta página e compartilhar sua própria versão.",
    branding: "Mostrar header do Leme",
    brandingHint: "A barra do Leme continua visível acima da sua página.",
    saving: "Salvando...",
    error: "Não foi possível salvar as configurações.",
  },
  authErrors: {
    invalidEmail: "Esse endereço de email não parece válido.",
    userDisabled: "Esta conta foi desativada.",
    userNotFound: "Nenhuma conta encontrada com esse email.",
    wrongPassword: "Email ou senha incorretos.",
    invalidCredential: "Email ou senha incorretos.",
    emailAlreadyInUse: "Já existe uma conta com esse email. Tente entrar em vez disso.",
    weakPassword: "Escolha uma senha com pelo menos 6 caracteres.",
    tooManyRequests: "Muitas tentativas. Aguarde um momento e tente novamente.",
    networkRequestFailed: "Não foi possível alcançar o servidor. Verifique sua conexão.",
    popupBlocked: "Seu navegador bloqueou o popup de login. Permita popups e tente novamente.",
    unauthorizedDomain:
      "Este domínio não está autorizado no Firebase. Adicione-o em Authentication > Settings > Authorized domains.",
    operationNotAllowed:
      "Este método de login está desativado. Habilite-o em Authentication > Sign-in method no console do Firebase.",
    accountExistsWithDifferentCredential:
      "Você já tem uma conta com este email usando um método de login diferente. Entre desse jeito primeiro.",
    default: "Não foi possível completar o login. Tente novamente.",
    connectionError: "Não foi possível conectar. Verifique sua conexão com a internet e tente novamente.",
  },
};
