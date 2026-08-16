import type { Dictionary } from "./en";

export const ja: Dictionary = {
  site: {
    name: "Leme",
    tagline: "AI生成のHTMLをアップロードしてリンクで共有",
    description:
      "AI生成のHTMLファイルをアップロードし、リンクを通じて誰とでも共有できます。コメント、提案、フォークで共同作業ができます。",
  },
  nav: {
    plans: "プラン",
    blog: "ブログ",
    myFiles: "マイファイル",
    newUpload: "新規アップロード",
    signIn: "サインイン",
    signOut: "サインアウト",
  },
  home: {
    heroBadge: "AI生成のHTMLを簡単に共有",
    heroTitle: "AIで作成したものを誰でも開けるページに変換",
    heroDescription:
      "お気に入りのAIツールで生成したHTMLをアップロードし、数秒で共有リンクを取得。コメント、変更提案、フォークを通じて共同作業できます。",
    ctaUpload: "HTMLをアップロード",
    ctaPlans: "プランを見る",
    heroNote: "お試しにアカウントは不要 — ログインせずにアップロードしたページはこのブラウザに保存されます。",
    featureUpload: "アップロード",
    featureUploadDesc: "最大2MBの.htmlファイルをドラッグ — ビルドや設定は不要。",
    featureShare: "共有",
    featureShareDesc: "すべてのアップロードに専用ページとリンクが作成されます。",
    featureCollaborate: "共同作業",
    featureCollaborateDesc: "訪問者がコメント、変更提案、フォークを残せます。",
    featureControl: "管理を保持",
    featureControlDesc: "無料プランには制限と透かしがあります。Proプランでは両方を削除。",
    howTitle: "使い方",
    howSubtitle: "AIプロンプトから公開リンクまで4ステップ。",
    step1: "生成",
    step1Desc: "ChatGPT、Claude、GeminiなどのAIアシスタントに単一のHTMLファイルを依頼します。",
    step2: "保存",
    step2Desc: "HTMLコードをコピーして、コンピュータに.htmlファイルとして保存します。",
    step3: "アップロード",
    step3Desc: "Lemeにファイルをドラッグし、タイトルと説明を追加します。",
    step4: "共有",
    step4Desc: "leme.app/p/xyzのような公開リンクを取得して、どこにでも共有します。",
    toolsTitle: "お気に入りのAIツールと連携",
    toolsSubtitle: "人気のAIコーディングアシスタントやアプリビルダーで生成したHTMLをアップロード。",
    finalTitle: "作成したものを共有する準備はできましたか？",
    finalSubtitle: "1分もかかりません — 開始にサインアップは不要です。",
  },
  footer: {
    product: "製品",
    resources: "リソース",
    social: "ソーシャル",
    features: "機能",
    pricing: "料金",
    useCases: "用途",
    about: "概要",
    blog: "ブログ",
    faq: "FAQ",
    terms: "規約",
    privacy: "プライバシー",
    contact: "お問い合わせ",
    rights: "All rights reserved.",
    madeFor: "AI生成のHTMLのために作られました。",
  },
  pricing: {
    title: "シンプルなプラン、追加条件なし",
    subtitle:
      "アカウントを作成せずにすぐ試せます。無料アカウントを作成してより多くのページを保持するか、すべてを制限なくオンラインに保ちたい場合はProプランをお選びください。",
    noAccount: {
      name: "アカウントなし",
      price: "$0",
      description: "サインアップなしですぐに試せます。",
      features: {
        pages: "同時にアクティブなページは{count}つ",
        expires: "{days}日後に期限切れ",
        watermark: "透かし付き",
      },
      cta: "今すぐ使う",
    },
    free: {
      name: "無料",
      price: "$0",
      description: "アカウントを作成して、より多くのスペースを手に入れます。",
      features: {
        pages: "同時に{count}ページまでアクティブ",
        expires: "{days}日後に期限切れ",
        watermark: "透かし付き",
      },
      cta: "無料アカウントを作成",
    },
    pro: {
      name: "Pro",
      description: "制限なくページをオンラインに保ちたい方に。",
      monthly: "月額",
      yearly: "年額",
      priceUnitMonth: "月",
      priceUnitYear: "年",
      yearlySavings: "月額払いと比べて2か月分無料",
      features: ["アクティブなページ数無制限", "期限切れなし", "透かしなし"],
      cta: "Proにアップグレード",
      ctaLoading: "リダイレクト中...",
    },
    footerNote: "お支払いはStripeで安全に処理されます。課金設定からいつでもキャンセルできます。",
  },
  common: {
    expiration: {
      expired: "期限切れ",
      oneDay: "1日後に期限切れ",
      days: "{count}日後に期限切れ",
    },
  },
  dashboard: {
    title: "マイダッシュボード",
    newUpload: "+ 新規アップロード",
    activePages: "{active}/{max} のアクティブページ",
    activePagesUnlimited: "{active} ページ（アクティブ） · 制限なし",
    renewsOn: "{date}に更新",
    cancelsAtPeriodEnd: " · 期間終了時にキャンセル",
    yearly: " · 年額",
    monthly: " · 月額",
    limitReachedUpgrade: "上限に達しました — アップグレード",
    viewProPlan: "Proプランを見る",
    billingSettings: "課金設定",
    emptyState: "まだHTMLをアップロードしていません。",
    emptyStateLink: "初めてのアップロード",
    views: "{count} 回の表示",
    uploadedOn: "{date}にアップロード",
  },
  mine: {
    title: "マイアップロード",
    newUpload: "+ 新規アップロード",
    activePagesInBrowser: "このブラウザで {active}/{max} ページ（アクティブ）",
    noAccount: "アカウントなし",
    createAccountForSpace: "より多くのスペースを得るために無料アカウントを作成",
    emptyState: "このブラウザに保存されたアップロードはまだありません。",
    emptyStateLink: "最初のHTMLをアップロード",
    browserListWarning:
      "このリストはこのブラウザに保存されます — サイトのデータを消去したり、デバイスを切り替えると消えます。",
    createAccountLink: "アカウントを作成",
    dontLoseUploads: "アップロードを失わないようにしてください。",
    views: "{count} 回の表示",
    uploadedOn: "{date}にアップロード",
  },
  blog: {
    title: "Lemeブログ",
    subtitle: "AI生成のHTMLを公開・共有するためのヒント、チュートリアル、最新情報。",
    readMore: "続きを読む \u2192",
    posts: [
      {
        slug: "how-to-publish-html-from-ai",
        title: "ChatGPT、Claude、GeminiからHTMLを公開する方法",
        excerpt:
          "人気のAIコーディングアシスタントからHTMLをエクスポートし、共有可能なリンクでオンラインに公開する手順を解説。",
        date: "2026-08-16",
      },
      {
        slug: "share-ai-landing-page-in-30-seconds",
        title: "AI生成のランディングページを30秒で共有する方法",
        excerpt:
          "プロンプトをライブのランディングページに変換。HTMLをLemeにアップロードして、誰にでもリンクを送りましょう。",
        date: "2026-08-16",
      },
      {
        slug: "collect-feedback-on-html-prototypes",
        title: "HTMLプロトタイプのフィードバックを集める最良の方法",
        excerpt:
          "コメント、提案、フォークが、AI生成プロトタイプのための軽量フィードバックツールとしてLemeを機能させる理由。",
        date: "2026-08-16",
      },
    ],
  },
  about: {
    metadataDescription:
      "Lemeについて：AI生成のHTMLページをアップロードし、リンクで簡単に共有するサービスです。",
    title: "Lemeについて",
    intro:
      "Lemeは、AIでHTMLを作成するすべての人が、結果を手早く確実に共有できるように作られました。ホスティングの設定も、ビルドパイプラインも不要 — ファイルをアップロードして、誰にでも送れるリンクを取得するだけです。",
    whyTitle: "作った理由",
    whyText:
      "AIツールは数秒で完成したHTMLページを生成できますが、それを公開する作業は未だに面倒です。ファイルを置いて、リンクを取って、終わり。そんな場所がほしかったんです。",
    whatTitle: "できること",
    whatItems: [
      "プランの上限内で単一のHTMLファイルをアップロード",
      "公開ページと共有可能なリンクを即座に取得",
      "訪問者からコメント、提案、フォークを受け取る",
      "Proプランにアップグレードして、ページ数無制限・透かしなしで利用",
    ],
    cta: "プランを見る",
  },
  features: {
    metadataDescription:
      "Lemeの機能をご覧ください：HTMLをアップロード、リンクを共有、コメント・提案・フォークで共同作業。",
    title: "機能",
    subtitle: "AI生成のHTMLページを公開・共有するために必要なものがすべて揃っています。",
    items: [
      {
        title: "即座のアップロード",
        description: "HTMLファイルをドラッグまたは選択するだけで、数秒で公開リンクを取得。",
      },
      {
        title: "共有可能なページ",
        description: "すべてのアップロードが、どこにでも共有できる専用URLのクリーンなページになります。",
      },
      {
        title: "共同作業",
        description: "訪問者はコメント、提案、または新しい作品へのフォークを残せます。",
      },
      {
        title: "アカウント不要",
        description: "サインアップせずにLemeをお試しいただけます。より多くのページを保持したいときにアカウントを作成してください。",
      },
      {
        title: "Proプラン",
        description: "透かしを削除して、無制限のページを永久に公開し続けられます。",
      },
      {
        title: "シンプルな請求",
        description: "課金設定から、いつでもアップグレードまたはキャンセルできます。",
      },
    ],
  },
  faq: {
    metadataDescription:
      "Lemeに関するよくある質問：AI生成のHTMLのアップロード、リンク共有、共同作業、プラン管理について。",
    metadataOpenGraphTitle: "Leme FAQ — よくある質問と回答",
    title: "よくある質問",
    subtitle: "Lemeでのアップロード、共有、共同作業に必要なことをすべて解説します。",
    stillQuestionsTitle: "まだ質問がありますか？",
    stillQuestionsText: "メールをお送りください：",
    items: [
      {
        question: "Lemeとは何ですか？",
        answer:
          "Lemeは、AI生成のHTMLファイルをアップロードして共有可能なウェブページとして公開する高速な方法です。公開リンクを即座に取得でき、訪問者はコメント、変更提案、フォークを残せます。",
      },
      {
        question: "HTMLファイルはどうアップロードしますか？",
        answer:
          "アップロードページを開き、.htmlファイルをドラッグまたは選択し、タイトルとオプションの説明を追加して「アップロード」をクリックします。Lemeがファイルをホスティングし、数秒で公開リンクを発行します。",
      },
      {
        question: "Lemeを使うにはアカウントが必要ですか？",
        answer:
          "いいえ。サインアップせずにアップロードできます。匿名アップロードはブラウザに保存されますが、制限が厳しく、数日後に期限切れになります。無料アカウントを作成すると、より多くのページと長期間の保持が可能です。",
      },
      {
        question: "どのAIツールがLemeと連携しますか？",
        answer:
          "単一の.htmlファイルをエクスポートできるツールなら何でも使えます。ChatGPT、Claude、Gemini、v0、Lovable、Bolt、Replit、その他のコード生成ツールが人気です。",
      },
      {
        question: "ファイルサイズの上限は？",
        answer:
          "現在の上限は1ファイルあたり2MBです。これはほとんどのAI生成ランディングページ、ポートフォリオ、ダッシュボード、プロトタイプをカバーします。サイズが大きい場合は、画像を圧縮するか、ページを分割してください。",
      },
      {
        question: "他の人とページを共有できますか？",
        answer:
          "はい。すべてのページにはleme.app/p/[id]のような公開リンクが付きます。サイドバーから専用の共有リンクを作成することもできます。コピーして送るだけです。",
      },
      {
        question: "共同作業はどのように機能しますか？",
        answer:
          "リンクを持った訪問者はサイドバーを開き、コメント、提案、フォークを残せます。フォークはページの新しいコピーを作成し、投稿者が編集して再度共有できます。",
      },
      {
        question: "ページの期限が切れるとどうなりますか？",
        answer:
          "無料・匿名ページはプランの保持期間後に期限切れになります。期限切れ後は閲覧できなくなります。Proページはサブスクリプションが有効な限り期限切れになりません。",
      },
      {
        question: "無料とProの違いは？",
        answer:
          "無料プランでは、Lemeの透かし付きで少数のアクティブページを保持できます。Proプランでは透かしとアクティブページ数の上限がなくなり、ページを永久に公開できます。",
      },
      {
        question: "Proの料金は？",
        answer:
          "Leme Proは月額9ドルまたは年額90ドルです。年額プランは月額払いと比べて2か月分お得です。",
      },
      {
        question: "Proはいつでもキャンセルできますか？",
        answer:
          "はい。課金ページからいつでもキャンセルできます。Proの特典は現在の請求期間の終了まで有効です。",
      },
      {
        question: "アップロードしたコンテンツは公開されますか？",
        answer:
          "はい。Lemeにアップロードしたページは、デフォルトで共有リンクを通じて公開されます。リンクを持つ誰もがページを閲覧できます。機密性、個人的、または秘密の情報はアップロードしないでください。",
      },
      {
        question: "ページを削除できますか？",
        answer:
          "はい。サインイン中に作成したページはダッシュボードから削除できます。匿名ページはブラウザに紐づくため、マイアップロードページから削除できます。",
      },
      {
        question: "モバイルでも使えますか？",
        answer:
          "はい。Lemeのサイトはレスポンシブ対応です。デスクトップ、タブレット、モバイルのどのモダンブラウザからでもアップロード、閲覧、共有できます。",
      },
      {
        question: "独自ドメインは使えますか？",
        answer:
          "まだ使えません。現在、すべてのページはleme.appの下でホスティングされます。独自ドメインは今後のリリースでロードマップに入っています。",
      },
      {
        question: "CSS、JavaScript、画像を含んだHTMLに対応していますか？",
        answer:
          "はい。インラインCSS、JavaScript、base64画像を含む単一の.htmlファイルは正しくレンダリングされます。URLでリンクされた外部アセットは、CORSと可用性次第で読み込まれる場合があります。",
      },
      {
        question: "悪用や著作権侵害を通報するには？",
        answer:
          "ページのリンクと状況を添えてhello@leme-app.comまでメールしてください。通報を確認し、利用規約に違反するコンテンツには対応します。",
      },
      {
        question: "公開APIはありますか？",
        answer: "いいえ。Lemeはウェブインターフェースから手動でアップロードするよう設計されています。APIアクセスは提供されていません。",
      },
      {
        question: "Lemeは誰が作りましたか？",
        answer:
          "Lemeは、AI生成のHTMLを簡単に公開・共有できるようにすることに集中した小さなチームによって作られました。私たちは独立系、自社資金、そしてPro購読者の支援を受けています。",
      },
      {
        question: "どうやって連絡できますか？",
        answer: "hello@leme-app.comまでメールを送るか、Twitter/XまたはLinkedInでお問い合わせください。",
      },
    ],
  },
  aiLanding: {
    worksWith: "{toolName}と連携",
    howItWorks: "使い方",
    commonUseCases: "よくある用途",
    readyToPublish: "{toolName}のHTMLを公開する準備はできましたか？",
    ctaUpload: "HTMLをアップロード",
    noAccount: "ファイルをアップロードして、数秒で公開リンクを取得。お試しにはアカウントは不要です。",
    whyUseLeme: "なぜLemeを{toolName}と組み合わせるのか？",
    whyPoints: [
      "ブラウザを離れることなく、公開リンクを取得。",
      "リンクを持っていれば、{toolName}へのアクセスがなくても誰とでもページを共有。",
      "レビューからフィードバック、提案、フォークを収集。",
      "Leme Proでページを永久に公開。",
    ],
  },
  aiTools: {
    chatgpt: {
      metadataTitle: "ChatGPTのHTMLをホスティングして共有",
      metadataDescription:
        "ChatGPTが生成したHTMLをLemeにアップロードして、数秒で公開の共有可能なリンクを取得。ホスティング設定は不要です。",
      ogTitle: "ChatGPTのHTMLをホスティング — Leme",
      ogDescription: "ChatGPTが生成したHTMLをアップロードして、公開リンクで共有しましょう。",
      headline: "ChatGPTのHTMLをホスティングして共有",
      description:
        "ChatGPTは、ランディングページ、ポートフォリオ、プロトタイプを単一のHTMLファイルで作成できます。そのファイルをLemeにアップロードして、どこにでも共有できる公開リンクを取得しましょう。",
      useCases: ["ChatGPTランディングページ", "ChatGPTポートフォリオ", "ChatGPTプロトタイプ", "ChatGPTワンページサイト"],
      steps: [
        "ChatGPTに、インラインCSS付きの単一ファイルHTMLページを作成するように依頼します。例：'SaaSプロダクトのレスポンシブランディングページを1つのHTMLファイルで作成して。'",
        "完全なHTMLレスポンスをコピーして、コンピュータ上にpage.htmlとして保存します。",
        "Lemeを開き、ファイルをアップロードフォームにドラッグし、タイトルとオプションの説明を追加します。",
        "アップロードをクリック。Lemeがページをホスティングし、leme.app/p/xyzのような公開リンクを発行します。",
        "チームメイト、クライアント、SNSでリンクを共有。訪問者はコメントや提案も残せます。",
      ],
      schemaName: "ChatGPTが生成したHTMLをLemeで公開する方法",
      schemaDescription:
        "ChatGPTが生成したHTMLをLemeにアップロードし、公開の共有可能なリンクを取得する手順です。",
    },
    bolt: {
      metadataTitle: "BoltのHTMLをホスティングして共有",
      metadataDescription:
        "Boltが生成したHTMLをLemeにアップロードして、数秒で公開の共有可能なリンクを取得。本番デプロイなしでBoltのプロトタイプやワンページサイトを共有できます。",
      ogTitle: "BoltのHTMLをホスティング — Leme",
      ogDescription: "Boltが生成したHTMLをアップロードして、公開リンクで共有しましょう。",
      headline: "BoltのHTMLをホスティングして共有",
      description:
        "Boltはプロンプトからフルスタックアプリを作成します。Boltプロジェクトから単一のHTMLページまたはスナップショットをエクスポートしてLemeにアップロードすれば、即座にライブプレビューを共有できます。",
      useCases: ["Boltアプリプレビュー", "Boltランディングページ", "Boltプロトタイプ", "Bolt共有可能デモ"],
      steps: [
        "Boltでページまたはアプリを生成します。単独のHTMLファイルとしてエクスポートできる1つの画面またはランディングページを選びます。",
        "HTMLソースをコピーまたはエクスポートしてpage.htmlとして保存します。スタイルとスクリプトがインラインになっていることを確認してください。",
        "ファイルをLemeにアップロードし、タイトルと説明を追加します。",
        "アップロードをクリックして、leme.app/p/xyzのような公開リンクを取得します。",
        "ステークホルダーにリンクを共有。レビュー、コメント、提案、フォークが可能です。",
      ],
      schemaName: "Boltが生成したHTMLをLemeで公開する方法",
      schemaDescription: "Boltが生成したHTMLをLemeにアップロードし、公開の共有可能なリンクを取得する手順です。",
    },
    claude: {
      metadataTitle: "ClaudeのHTMLをホスティングして共有",
      metadataDescription:
        "Claudeが生成したHTMLをLemeにアップロードして、数秒で公開の共有可能なリンクを取得。Claude Artifactsやプロトタイプに最適です。",
      ogTitle: "ClaudeのHTMLをホスティング — Leme",
      ogDescription: "Claudeが生成したHTMLをアップロードして、公開リンクで共有しましょう。",
      headline: "ClaudeのHTMLをホスティングして共有",
      description:
        "Claude（Claude Artifactsを含む）は、洗練されたHTMLページやコンポーネントを生成できます。それをLemeにアップロードすれば、デプロイなしで公開・共有できます。",
      useCases: ["Claude Artifactsのホスティング", "Claudeプロトタイプ", "Claudeランディングページ", "Claudeコンポーネントデモ"],
      steps: [
        "Claudeでページまたはアーティファクトを生成します。インラインCSSとJavaScriptを含む単一の自己完結型HTMLファイルを依頼してください。",
        "ClaudeのArtifactパネルでコードビューに切り替え、完全なHTMLソースをコピーします。",
        "そのコードをコンピュータ上にpage.htmlとして保存します。",
        "ファイルをLemeにアップロードし、タイトルを追加してアップロードをクリックします。",
        "公開リンクをコピーして共有。レビューアーはサイドバーからコメント、提案、フォークができます。",
      ],
      schemaName: "Claudeが生成したHTMLをLemeで公開する方法",
      schemaDescription:
        "ClaudeまたはClaude Artifactsが生成したHTMLをLemeにアップロードし、公開の共有可能なリンクを取得する手順です。",
    },
    gemini: {
      metadataTitle: "GeminiのHTMLをホスティングして共有",
      metadataDescription:
        "Google Geminiが生成したHTMLをLemeにアップロードして、数秒で公開の共有可能なリンクを取得。ホスティングやビルド工程は不要です。",
      ogTitle: "GeminiのHTMLをホスティング — Leme",
      ogDescription: "Geminiが生成したHTMLをアップロードして、公開リンクで共有しましょう。",
      headline: "GeminiのHTMLをホスティングして共有",
      description:
        "GeminiはHTMLページ、コンポーネント、小さなウェブアプリを生成できます。生成したHTMLファイルをLemeにアップロードして、共有可能なリンク付きのライブページとして公開しましょう。",
      useCases: ["Geminiランディングページ", "Geminiプロトタイプ", "Geminiダッシュボード", "Geminiワンページサイト"],
      steps: [
        "Geminiに、単一の自己完結型HTMLファイルを作成するように依頼します。例：'インラインCSS付きの1つのHTMLファイルで、レスポンシブポートフォリオページを作成して。'",
        "生成されたHTMLをコピーしてpage.htmlとして保存します。",
        "Lemeを開いてファイルをアップロードし、訪問者がページを理解できるようタイトルとオプションの説明を追加します。",
        "アップロードをクリックして、leme.app/p/xyzのような公開リンクを取得します。",
        "リンクを共有。訪問者はサイドバーからコメント、提案、フォークで共同作業できます。",
      ],
      schemaName: "Geminiが生成したHTMLをLemeで公開する方法",
      schemaDescription:
        "Google Geminiが生成したHTMLをLemeにアップロードし、公開の共有可能なリンクを取得する手順です。",
    },
    lovable: {
      metadataTitle: "LovableのHTMLをホスティングして共有",
      metadataDescription:
        "Lovableが生成したHTMLをLemeにアップロードして、数秒で公開の共有可能なリンクを取得。Lovableアプリを独立したページとして公開できます。",
      ogTitle: "LovableのHTMLをホスティング — Leme",
      ogDescription: "Lovableが生成したHTMLをアップロードして、公開リンクで共有しましょう。",
      headline: "LovableのHTMLをホスティングして共有",
      description:
        "Lovableはフルスタックアプリやページを作成します。Lovableプロジェクトから単一のHTMLスナップショットをエクスポートしてLemeにアップロードすれば、クイックな公開プレビューができます。",
      useCases: ["Lovableアプリプレビュー", "Lovableランディングページ", "Lovableプロトタイプ", "Lovable共有可能デモ"],
      steps: [
        "Lovableでページまたはアプリを生成します。単独のHTMLファイルとして機能する1つの画面またはランディングページを中心に作成します。",
        "HTMLソースをエクスポートまたはコピーしてpage.htmlとして保存します。CSSとJavaScriptをインラインにして、ファイルが単独で動作するようにします。",
        "ファイルをLemeにアップロードし、タイトルと説明を入力します。",
        "アップロードをクリックして、公開リンクを取得します。",
        "レビューアーにリンクを共有。Lovableへのアクセスがなくてもコメントや提案を残せます。",
      ],
      schemaName: "Lovableが生成したHTMLをLemeで公開する方法",
      schemaDescription: "Lovableが生成したHTMLをLemeにアップロードし、公開の共有可能なリンクを取得する手順です。",
    },
    v0: {
      metadataTitle: "v0のHTMLをホスティングして共有",
      metadataDescription:
        "v0が生成したHTMLをLemeにアップロードして、数秒で公開の共有可能なリンクを取得。フルプロジェクトをデプロイせずにv0のプロトタイプを共有できます。",
      ogTitle: "v0のHTMLをホスティング — Leme",
      ogDescription: "v0が生成したHTMLをアップロードして、公開リンクで共有しましょう。",
      headline: "v0のHTMLをホスティングして共有",
      description:
        "v0は美しいReactやHTMLコンポーネントを生成します。v0から単一のHTMLファイルをエクスポートしてLemeにアップロードすれば、誰にでもライブプレビューを共有できます。",
      useCases: ["v0コンポーネントプレビュー", "v0ランディングページ", "v0プロトタイプ", "v0 UIデモ"],
      steps: [
        "v0でUIまたはページを生成します。単一の自己完結型HTMLファイルを依頼するか、生成されたコードをエクスポートして1つのHTMLファイルにまとめます。",
        "HTMLソースをコピーしてpage.htmlとして保存します。",
        "ファイルをLemeにアップロードし、明確なタイトルと説明を追加します。",
        "アップロードをクリックして、公開リンクを取得します。",
        "リンクを共有し、コメント、提案、フォークを通じてフィードバックを収集します。",
      ],
      schemaName: "v0が生成したHTMLをLemeで公開する方法",
      schemaDescription: "v0が生成したHTMLをLemeにアップロードし、公開の共有可能なリンクを取得する手順です。",
    },
  },
  useCases: {
    metadataDescription:
      "チームやクリエイターがLemeを使って、ランディングページ、ポートフォリオ、プロトタイプ、ダッシュボードなどのAI生成HTMLページを公開・共有する方法をご覧ください。",
    metadataOpenGraphTitle: "Lemeの用途 — あらゆるプロジェクトのAI生成HTMLを公開",
    title: "Lemeで何を公開できますか？",
    subtitle: "AI生成のHTMLファイルは、ライブで共有可能なページに変わります。Lemeでよく使われている用途をご紹介します。",
    ctaTitle: "HTMLファイルは用意できましたか？",
    ctaSubtitle: "今すぐアップロードして、数秒で共有可能なリンクを取得しましょう。",
    ctaButton: "HTMLをアップロード",
    items: [
      {
        title: "ランディングページ",
        description:
          "AIコーディングアシスタントで完成したマーケティングランディングページを生成し、Lemeにアップロードして、チーム、クライアント、関係者に数秒でリンクを共有しましょう。",
        keywords: ["AIランディングページ", "ランディングページを共有", "HTMLランディングページをホスティング"],
      },
      {
        title: "ポートフォリオ",
        description:
          "デザイン実験や個人プロジェクトから生まれた単一のHTMLファイルを、ライブなポートフォリオ作品に変えます。クイックな公開デモが必要なデザイナー、開発者、学生に最適です。",
        keywords: ["AIポートフォリオ", "ポートフォリオHTMLを共有", "ポートフォリオをオンラインに"],
      },
      {
        title: "プロトタイプとMVP",
        description:
          "AIでインタラクティブなプロトタイプを作成し、Lemeで公開して、本格的なデプロイパイプラインを構築せずにコメントや提案を通じてフィードバックを収集しましょう。",
        keywords: ["AIプロトタイプ", "HTMLプロトタイプホスティング", "MVPを共有"],
      },
      {
        title: "ダッシュボード",
        description:
          "AI生成のダッシュボードHTMLをチャートやテーブル付きで公開し、チームメイトがバックエンドやデータベースを接続せずにレイアウトとインタラクションをプレビューできます。",
        keywords: ["AIダッシュボード", "HTMLダッシュボードホスティング", "ダッシュボードを共有"],
      },
      {
        title: "ニュースレターとワンページ",
        description:
          "AIで美しいワンページのメールや告知ページを作成し、Lemeでホスティングして、ニュースレター、SNS、チャットでリンクを共有しましょう。",
        keywords: ["AIワンページ", "HTMLニュースレターホスティング", "ワンページサイトを共有"],
      },
      {
        title: "フォームとマイクロアプリ",
        description:
          "AI生成の小さなHTMLフォーム、計算機、インタラクティブウィジェットをアップロードして、ダイレクトリンクで共有。クイックな実験やユーザーテストに最適です。",
        keywords: ["AIフォームホスティング", "HTMLマイクロアプリ", "HTMLフォームを共有"],
      },
      {
        title: "ドキュメントとデモ",
        description:
          "AIプロンプトから生成した技術ドキュメントページ、コンポーネントデモ、スタイルガイドを公開して、チームがレビュー・議論できるライブな参考資料にしましょう。",
        keywords: ["AIドキュメント", "HTMLデモホスティング", "ドキュメントを共有"],
      },
      {
        title: "イベント・キャンペーンページ",
        description:
          "AIで季節のキャンペーンやイベントページを生成し、即座に公開。ページをフォークして新しいバージョンを作成し、新しいリンクを共有することで更新できます。",
        keywords: ["AIキャンペーンページ", "イベントページホスティング", "キャンペーンHTMLを共有"],
      },
    ],
  },
  blogPosts: {
    howToPublish: {
      metadataTitle: "ChatGPT、Claude、GeminiからHTMLを公開する方法",
      metadataDescription:
        "ChatGPT、Claude、Gemini、その他のAIコーディングアシスタントからHTMLをエクスポートし、Lemeでオンラインに公開する方法を解説します。",
      ogTitle: "ChatGPT、Claude、GeminiからHTMLを公開する方法",
      ogDescription: "AI生成のHTMLをエクスポートして、公開リンクで共有する手順です。",
      title: "ChatGPT、Claude、GeminiからHTMLを公開する方法",
      subtitle:
        "人気のAIコーディングアシスタントからHTMLをエクスポートし、共有可能なリンクでオンラインに公開する手順を解説します。",
      ctaTitle: "今すぐ試す",
      ctaSubtitle: "HTMLファイルをアップロードして、数秒で共有可能なリンクを取得しましょう。",
      sections: [
        {
          type: "paragraph",
          content:
            "AIコーディングアシスタントは数秒で完成したHTMLページを生成できます。問題は共有方法です。多くの人は、ローカルファイルにコードを貼り付け、ブラウザで開き、スクリーンショットを送ります。それで一見は済みますが、本当の共有可能なリンクにはなりません。",
        },
        { type: "heading", content: "最も簡単なワークフロー" },
        {
          type: "list",
          items: [
            "AIに単一ファイルのHTMLページを依頼します。例：'コーヒーショップのランディングページを、インラインCSS付きの1つのHTMLファイルで作成して。'",
            "生成されたHTMLコードをコピーします。",
            "コンピュータ上にpage.htmlとして保存します。",
            "Lemeのアップロードページでそのファイルを選択します。",
            "タイトルとオプションの説明を追加します。",
            "アップロードをクリックします。leme.app/p/xyzのような公開リンクを取得できます。",
          ],
        },
        { type: "heading", content: "ChatGPT" },
        {
          type: "paragraph",
          content:
            "ChatGPTでは、完全なHTMLファイルを作成するように依頼してください。出力が長い場合は続きを出力するように依頼します。完全なコードを取得したら、.htmlとして保存してLemeにアップロードします。ChatGPTのコードインタープリタは、ファイルの作成とエクスポートを依頼すれば、HTMLファイルを直接生成することもできます。",
        },
        { type: "heading", content: "Claude" },
        {
          type: "paragraph",
          content:
            "Claude ArtifactsはHTMLやReactコンポーネントをレンダリングできます。Claudeがアーティファクトを表示したら、コードビューをクリックしてHTMLをコピーし、保存します。LemeがそのHTMLを正確にホスティングし、誰にでも共有可能にします。",
        },
        { type: "heading", content: "Gemini" },
        {
          type: "paragraph",
          content:
            "Geminiはレスポンス内にHTMLスニペットを生成できます。単一の自己完結型HTMLファイルで、インラインスタイル付きを依頼してください。結果をコピーして保存し、Lemeにアップロードします。",
        },
        { type: "heading", content: "その他のツール" },
        {
          type: "paragraph",
          content:
            "同じワークフローはv0、Lovable、Bolt、Replit Agent、その他単一のHTMLファイルを出力するツールでも使えます。ZIPや複数ファイルをエクスポートする場合は、まずCSSとJavaScriptをHTMLファイルに統合してからアップロードしてください。",
        },
        { type: "heading", content: "Lemeの便利な点" },
        {
          type: "list",
          items: [
            "ホスティング設定が不要。",
            "即座に公開リンクを取得。",
            "デスクトップとモバイルの両方で動作。",
            "訪問者がコメントや提案を残せる。",
            "無料でお試し可能。Proではページ数無制限・透かしなし。",
          ],
        },
      ],
    },
    shareLandingPage: {
      metadataTitle: "AI生成のランディングページを30秒で共有する方法",
      metadataDescription:
        "プロンプトをライブのランディングページに変換。AI生成のHTMLをLemeにアップロードして、誰にでもリンクを送りましょう。",
      ogTitle: "AI生成のランディングページを30秒で共有する方法",
      ogDescription: "Lemeを使えば1分以内にプロンプトから公開リンクへ。",
      title: "AI生成のランディングページを30秒で共有する方法",
      subtitle: "プロンプトから公開リンクまで1分未満。デプロイ、ホスティングアカウント、ビルド工程は不要です。",
      ctaTitle: "ランディングページを作成",
      ctaSubtitle: "AI生成のHTMLをアップロードして、数秒でリンクを取得しましょう。",
      sections: [
        {
          type: "paragraph",
          content:
            "ランディングページは、AIコーディングアシスタントの最も優れた用途の一つです。プロダクトを説明すると、AIがコピー、配色、レスポンシブレイアウトを作成します。足りないのは公開URLだけです。",
        },
        { type: "heading", content: "30秒のワークフロー" },
        {
          type: "list",
          items: [
            "AIにプロンプト：'AI生成のHTMLを共有するSaaSのレスポンシブランディングページを、単一のHTMLファイルで、インラインCSS、モダンなデザインで作成して。'",
            "レスポンスをlanding.htmlとして保存します。",
            "Lemeのアップロードページを開きます。",
            "ファイルをドロップしてタイトルを追加し、アップロードをクリックします。",
            "公開リンクをコピーして共有します。",
          ],
        },
        { type: "heading", content: "他の方法より優れている理由" },
        {
          type: "list",
          items: [
            "GitHub Pagesはリポジトリとコミットが必要。",
            "Netlify Dropはフォルダに最適ですが、単一ファイルには過剰です。",
            "Vercelはフレームワーク向けであり、単純なHTMLファイルには向いていません。",
            "Lemeはまさにこれのために作られています：1つのHTMLファイル、1つの公開リンク。",
          ],
        },
        { type: "heading", content: "文脈を持って共有" },
        {
          type: "paragraph",
          content:
            "Lemeのリンクを共有すると、訪問者はサイドバーを開いてページタイトル、説明、さらにコメントを残せます。これにより、早期のフィードバック、クライアントレビュー、チーム共同作業に最適です。",
        },
        { type: "heading", content: "永久に公開し続ける" },
        {
          type: "paragraph",
          content:
            "無料・匿名ページはしばらくすると期限切れになります。透かしなしで永久にライブなランディングページを保持したい場合は、Leme Proにアップグレードして無制限のページと恒久的なホスティングを手に入れましょう。",
        },
      ],
    },
    collectFeedback: {
      metadataTitle: "HTMLプロトタイプのフィードバックを集める最良の方法",
      metadataDescription:
        "コメント、提案、フォークが、AI生成のHTMLプロトタイプのための軽量フィードバックツールとしてLemeを機能させる理由。",
      ogTitle: "HTMLプロトタイプのフィードバックを集める最良の方法",
      ogDescription: "Lemeを使って、AI生成のHTMLプロトタイプにコメント、提案、フォークを集めましょう。",
      title: "HTMLプロトタイプのフィードバックを集める最良の方法",
      subtitle:
        "コメント、提案、フォークが、AI生成のプロトタイプのための軽量フィードバックツールとしてLemeを機能させる理由。",
      ctaTitle: "フィードバックを収集開始",
      ctaSubtitle: "プロトタイプをアップロードして、チームと共有しましょう。",
      sections: [
        {
          type: "paragraph",
          content:
            "プロトタイプはレビューされるためにあります。しかし、HTMLファイルをメールやSlackで共有すると、「いいね」「青を変えて」といった曖昧なフィードバックしか返ってきません。Lemeは静的なファイルを共同作業のレビュー画面に変えます。",
        },
        { type: "heading", content: "3種類のフィードバック" },
        {
          type: "list",
          items: [
            "コメント：ページ全体や特定のアイデアに対する一般的な感想や反応。",
            "提案：「見出しを大きくする」「料金セクションを追加する」など、具体的な変更案。",
            "フォーク：共同編集者がページのコピーを作成し、編集して新しいバージョンを共有し返せます。これは、AI生成ページにとってプルリクエストに最も近い仕組みです。",
          ],
        },
        { type: "heading", content: "使い方" },
        {
          type: "list",
          items: [
            "AIアシスタントでプロトタイプを生成します。",
            "Lemeにアップロードします。",
            "レビューアーにリンクを共有します。",
            "レビューアーはサイドバーを開いてコメントや提案を追加します。",
            "大きな変更が必要な場合は、レビューアーにページをフォークして反復させてください。",
          ],
        },
        { type: "heading", content: "FigmaやGitHubの代わりにLemeを使う場合" },
        {
          type: "paragraph",
          content:
            "Figmaはデザインに、GitHubはコードに優れています。Lemeはその中間に位置します：ページはすでにライブなHTMLですが、本番デプロイをコミットする前にクイックなフィードバックが必要です。AI生成のサイドプロジェクト、クライアントプレビュー、ワンオフ実験に最適です。",
        },
        { type: "heading", content: "記録を残す" },
        {
          type: "paragraph",
          content:
            "すべてのページに独自のURLがあるため、バージョンA、バージョンB、バージョンCとリンクを共有できます。各リンクはスナップショットです。レビューアーは簡単に比較でき、あなたは最良のものを最終版として残せます。",
        },
      ],
    },
  },
  terms: {
    metadataTitle: "利用規約",
    metadataDescription: "Lemeの利用規約です。",
    title: "利用規約",
    lastUpdated: "最終更新：2026年8月",
    sections: [
      {
        title: "1. 利用規約の同意",
        paragraphs: [
          "Lemeにアクセスまたは利用することで、本利用規約に拘束されることに同意したものとみなされます。同意できない場合は、サービスをご利用にならないでください。",
        ],
      },
      {
        title: "2. サービスの概要",
        paragraphs: [
          "Lemeは、ユーザーがHTMLファイルをアップロードし、共有可能なリンクを生成し、コメント、提案、フォークを通じて共同作業できるプラットフォームです。",
        ],
      },
      {
        title: "3. ユーザーコンテンツ",
        paragraphs: [
          "アップロードしたコンテンツの所有権はユーザーに帰属します。コンテンツをアップロードすることで、サービス提供に必要な範囲でLemeにホスティング、表示、共有するための限定的なライセンスを付与するものとします。",
          "アップロードしたコンテンツについて、ユーザー自身が全責任を負います。違法、有害、権利侵害、その他の違反となるコンテンツはアップロードしないでください。",
        ],
      },
      {
        title: "4. 禁止事項",
        paragraphs: [
          "Lemeを使ってマルウェア、フィッシングページ、スパム、または適用される法律・規制に違反するコンテンツを配布することはできません。",
        ],
      },
      {
        title: "5. 有料サブスクリプション",
        paragraphs: [
          "Lemeは無料プランと有料プランを提供します。有料サブスクリプションはStripeで請求され、課金設定からいつでもキャンセルできます。",
        ],
      },
      {
        title: "6. 利用停止",
        paragraphs: [
          "本規約に違反したり、サービスを悪用したりするアカウントを停止または終了する権利を留保します。",
        ],
      },
      {
        title: "7. 規約の変更",
        paragraphs: [
          "本規約は随時更新される場合があります。変更後もサービスを継続して利用することで、更新後の規約に同意したものとみなされます。",
        ],
      },
      {
        title: "8. お問い合わせ",
        paragraphs: [
          "本規約についてのご質問は、お問い合わせページからお問い合わせください。",
        ],
      },
    ],
  },
  privacy: {
    metadataTitle: "プライバシーポリシー",
    metadataDescription: "Lemeユーザーのためのプライバシーポリシーです。",
    title: "プライバシーポリシー",
    lastUpdated: "最終更新：2026年8月",
    sections: [
      {
        title: "1. 収集する情報",
        paragraphs: [
          "Lemeをご利用の際、サインイン時のメールアドレスなど、ユーザーが直接提供する情報、およびアカウントなしでアップロードした場合の匿名識別子を収集する場合があります。",
        ],
      },
      {
        title: "2. アップロードされたコンテンツ",
        paragraphs: [
          "アップロードされたHTMLファイルは、共有可能なリンクを通じて提供するために安全に保存されます。アップロードの内容を広告目的でスキャンまたは利用することはありません。",
        ],
      },
      {
        title: "3. 認証",
        paragraphs: [
          "LemeのサインインにはFirebase Authenticationを使用します。認証時に一意のユーザー識別子とメールアドレスを保存します。",
        ],
      },
      {
        title: "4. お支払い",
        paragraphs: [
          "お支払いはStripeで処理されます。カード番号の詳細はLemeで保存しません。Stripeは、自身のプライバシーポリシーに基づき、お支払い処理に必要な情報を収集する場合があります。",
        ],
      },
      {
        title: "5. Cookieとアナリティクス",
        paragraphs: [
          "サインイン状態の維持や、ブラウザでの匿名アップロードの記憶に必要な必須Cookieを使用します。第三者の広告Cookieは使用していません。",
        ],
      },
      {
        title: "6. データ保持",
        paragraphs: [
          "アップロードされたページは、プランに応じて保持されます。無料・匿名ページはプランの保持期間後に期限切れになります。Proページはサブスクリプションが有効な限り保持されます。",
        ],
      },
      {
        title: "7. ユーザーの権利",
        paragraphs: [
          "アップロードしたページはいつでも削除できます。データに関するご質問は、お問い合わせページからお問い合わせください。",
        ],
      },
      {
        title: "8. 本ポリシーの変更",
        paragraphs: [
          "本プライバシーポリシーは随時更新される場合があります。重要な変更は本ページに掲載します。",
        ],
      },
    ],
  },
  login: {
    title: "サインイン",
    subtitle: "アップロードや共有リンクを管理するには、アカウントにサインインしてください。",
    googleSignIn: "Googleでサインイン",
    googleSignInLoading: "Googleを開いています...",
    or: "または",
    magicLink: "マジックリンク",
    emailAndPassword: "メールアドレスとパスワード",
    emailLabel: "メールアドレス",
    emailPlaceholder: "you@email.com",
    passwordLabel: "パスワード",
    passwordPlaceholder: "••••••••",
    sendMagicLink: "マジックリンクを送信",
    sending: "送信中...",
    signIn: "サインイン",
    createAccount: "アカウントを作成",
    pleaseWait: "お待ちください...",
    noAccount: "アカウントをお持ちでないですか？今すぐ作成",
    hasAccount: "すでにアカウントをお持ちですか？サインイン",
    magicLinkSent: "マジックリンクを送信しました。受信箱を確認して続行してください。",
  },
  auth: {
    codeErrorTitle: "サインインを確認できませんでした",
    codeErrorSubtitle:
      "リンクの有効期限が切れているか、すでに使用されている可能性があります。もう一度サインインしてください。",
    codeErrorCta: "サインインに戻る",
    callbackConfirming: "サインインを確認中...",
    callbackEmailPrompt: "サインインを完了するため、メールアドレスを確認してください",
    callbackError: "このリンクの有効期限が切れているか、すでに使用されています。",
  },
  uploadLanding: {
    title: "HTMLをアップロード",
    savedFile: "保存されたファイル",
    savedFiles: "保存されたファイル",
    noAccount: "アカウントがなくても問題ありません — アップロードはこのブラウザに保存されるため、後で{link}からアクセスできます。",
    myUploads: "マイアップロード",
  },
  uploadForm: {
    fileLabel: "HTMLファイル（.html、最大2MB）",
    titleLabel: "タイトル",
    titlePlaceholder: "例：GPTで生成したランディングページ",
    descriptionLabel: "説明（任意）",
    descriptionPlaceholder: "このHTMLについて少し教えてください...",
    uploading: "アップロード中...",
    upload: "アップロード",
    errors: {
      notHtml: ".htmlファイルを選択してください。",
      tooLarge: "ファイルサイズは最大2MBまでです。",
      noFile: "アップロードする.htmlファイルを選択してください。",
      generic: "ファイルのアップロード中に接続エラーが発生しました。",
    },
  },
  planUpsell: {
    usage: "{active}/{max} のアクティブページを使用中。",
    atLimit: "{max}ページのアクティブ上限に達しました。",
    description: "Proプランでは上限を解除し、透かしを削除し、ページを永久に保持できます。",
    cta: "Proにアップグレード",
  },
  planLabels: {
    anonymous: "匿名",
    free: "無料",
    pro: "Pro",
  },
  expiredNotice: {
    title: "このページは期限切れです",
    description:
      "作者のプランによって、ページがオンラインに維持される期間が制限されています。作者であれば、Proプランにアップグレードしてページの期限切れを防ぎましょう。",
    cta: "ホームに戻る",
  },
  uploadsMenu: {
    title: "マイアップロード",
    empty: "他のアップロードはまだありません。",
    views: "{count} 回の表示",
    viewingNow: "現在表示中",
    deleteLabel: "アップロードを削除",
    deleteConfirm: "「{title}」を削除しますか？ページ、リンク、コメントは完全に失われます。",
    deleteError: "アップロードを削除できませんでした。",
    deleteTitle: "このアップロードを削除しますか？",
    deleteCta: "削除",
    cancel: "キャンセル",
  },
  billing: {
    title: "請求",
    subtitle: "プラン、請求サイクル、請求書を管理します。",
    subscription: {
      title: "サブスクリプション",
      freePlan: "現在は無料プランをご利用中です。ページを永久に保持し、透かしを削除するにはProプランにアップグレードしてください。",
      viewPlans: "プランを見る",
      proTitle: "Proプラン",
      billedAnnually: "年額請求",
      billedMonthly: "月額請求",
      statusActive: "有効",
      statusCancelsSoon: "キャンセル予定",
      currentPeriodEnds: "現在の期間終了",
      billingInterval: "請求サイクル",
      intervalYearly: "年額",
      intervalMonthly: "月額",
      cancelWarning: "Proプランは現在の請求期間終了時にキャンセルされる予定です。特典を維持するため、それまでに再開できます。",
      syncing: "サブスクリプション情報を同期中...",
    },
    invoices: {
      title: "請求書履歴",
      loading: "請求書を読み込み中...",
      error: "請求書を読み込めませんでした。",
      empty: "請求書はまだありません。",
      invoice: "請求書",
      view: "表示",
      statusPaid: "支払い済み",
    },
    actions: {
      manageBilling: "請求を管理",
      manageBillingLoading: "開いています...",
      cancelSubscription: "サブスクリプションをキャンセル",
      cancelling: "キャンセル中...",
      cancelConfirm:
        "Proプランをキャンセルしてもよろしいですか？現在の請求期間の終了までアクセスは維持されます。",
      cancelConfirmTitle: "Proプランを解約しますか？",
      cancelKeep: "プランを継続",
      cancelError: "サブスクリプションのキャンセルに失敗しました。",
      upgradeToAnnual: "年額に変更",
      upgrading: "チェックアウトを開いています...",
      upgradeError: "アップグレードの開始に失敗しました。",
    },
  },
  pageViewer: {
    pageLink: "ページリンク",
    views: "{count} 回表示",
    uploadedOn: "{date}にアップロード",
    sourceNote: "共有リンク経由",
    reopenLabel: "共同作業",
  },
  collapsibleSidebar: {
    show: "サイドバーを表示",
    hide: "サイドバーを隠す",
  },
  copyLink: {
    copy: "コピー",
    copied: "コピーしました！",
  },
  contributions: {
    typeComment: "コメント",
    typeSuggestion: "提案",
    typeFork: "フォーク",
    authorPlaceholder: "お名前（任意）",
    forkTitlePlaceholder: "フォークのタイトル",
    forkHtmlLabel: "フォーク作成前にHTMLを編集：",
    commentPlaceholder: "コメントを入力...",
    suggestionPlaceholder: "提案を記入...",
    forkMessagePlaceholder: "このフォークに関するメッセージ（任意）",
    submit: "送信",
    createFork: "フォークを作成",
    submitting: "送信中...",
    emptyState: "まだ投稿はありません。最初の投稿者になりましょう！",
    viewFork: "フォークを表示 →",
    error: "投稿の送信中に接続エラーが発生しました。",
    forkOf: "{title} のフォーク",
  },
  shareButton: {
    share: "共有",
    generating: "生成中...",
    error: "リンク生成中に接続エラーが発生しました。",
  },
  meta: {
    loginTitle: "サインイン",
    loginDescription:
      "Leme にサインインして、アップロードした HTML ページと共有リンクを管理しましょう。",
    mineTitle: "マイアップロード",
    mineDescription: "Leme での匿名アップロードを確認できます。",
    dashboardTitle: "ダッシュボード",
    dashboardDescription: "Leme でアップロードした HTML ページと共有リンクを管理します。",
    billingTitle: "請求",
    billingDescription: "Leme Pro のサブスクリプション、請求サイクル、請求書を管理します。",
    newTitle: "HTML をアップロード",
    newDescription:
      "AI が生成した HTML ファイルを Leme にアップロードして、共有リンクを取得しましょう。",
    pageNotFound: "ページが見つかりません",
    sharedPageNotFound: "共有ページが見つかりません",
    untitledPage: "共有ページ",
    viewPageDescription: "Leme で {title} を見る。",
  },
  pageSettings: {
    title: "ページ設定",
    proOnly: "Pro",
    contributions: "投稿を許可する",
    contributionsHint: "訪問者がコメント、提案、フォークを行えます。",
    branding: "Leme ヘッダーを表示",
    brandingHint: "ページの上に Leme のバーが表示されたままになります。",
    saving: "保存中...",
    error: "設定を保存できませんでした。",
  },
  authErrors: {
    invalidEmail: "メールアドレスの形式が正しくありません。",
    userDisabled: "このアカウントは無効化されています。",
    userNotFound: "このメールアドレスのアカウントが見つかりません。",
    wrongPassword: "メールアドレスまたはパスワードが正しくありません。",
    invalidCredential: "メールアドレスまたはパスワードが正しくありません。",
    emailAlreadyInUse: "このメールアドレスは既に登録されています。サインインを試してみてください。",
    weakPassword: "パスワードは6文字以上で設定してください。",
    tooManyRequests: "試行回数が多すぎます。しばらくしてから再試行してください。",
    networkRequestFailed: "サーバーに接続できませんでした。インターネット接続を確認してください。",
    popupBlocked: "ブラウザがサインイン用ポップアップをブロックしました。ポップアップを許可して再試行してください。",
    unauthorizedDomain: "このドメインはFirebaseで認証されていません。Authentication > Settings > Authorized domainsに追加してください。",
    operationNotAllowed: "このサインイン方法は無効になっています。FirebaseコンソールのAuthentication > Sign-in methodで有効にしてください。",
    accountExistsWithDifferentCredential: "このメールアドレスは別のサインイン方法で既に登録されています。まずその方法でサインインしてください。",
    default: "サインインを完了できませんでした。もう一度お試しください。",
    connectionError: "接続できませんでした。インターネット接続を確認して再試行してください。",
  },
};
