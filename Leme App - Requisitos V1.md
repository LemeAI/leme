# Leme App — Requisitos V1

Fontes: `Leme App - Escopo V1.md` · `spike-persistencia/RESULTADO.md` · `Leme App - Modelo de Negocio.md` · código em `leme/`.

Prioridade: **[E]** essencial · **[I]** importante · **[D]** desejável.
Suposições estão marcadas com **[PREMISSA]** no ponto em que afetam o requisito.

---

## 0. Glossário

| Termo | Significado neste produto |
|---|---|
| **Memória** | O conjunto de dados que um artefato guarda. Compartilhada por todos que abrem o link. |
| **Artefato** | O arquivo publicado **mais** a sua memória. Não é o arquivo sozinho. |
| **Chave** | Unidade de memória. Um par nome→valor. |
| **Dono** | Quem publicou o artefato. Paga, acompanha, exporta. |
| **Contribuidor** | Quem abre o link e edita. Não cria conta e não paga. |
| **Recipiente** | O formato do artefato. Na v1, HTML. |

---

## 1. O que será construído

**Memória compartilhada para artefatos de IA, começando por HTML.**

Um HTML gerado por IA hoje é uma página: atualiza e o que foi preenchido some. A v1 faz esse mesmo arquivo guardar dados — e guardar os mesmos dados para todo mundo que abre o link, sem que o arquivo seja alterado.

| | Hoje | v1 |
|---|---|---|
| O Leme entrega | Uma página com link | Uma ferramenta com memória compartilhada |
| Valor central | Não precisa hospedar | O dono não precisa consolidar à mão |
| Concorrente | Netlify, tiiny.host (grátis) | A planilha passada por email |

---

## 2. Entrega de valor

| | **Dono** | **Contribuidor** |
|---|---|---|
| Quem é | Quem sofre com o processo hoje | Quem precisa responder |
| O que quer | Parar de consolidar à mão | Sair dali rápido |
| O que valoriza | Ver tudo junto, saber quem falta, exportar | Não instalar, não criar conta, não entender nada |
| Quantos são | 1 por artefato | 10 a 50 por artefato |
| Paga | Sim | Nunca |

> **Conflito entre os dois se resolve sempre a favor do contribuidor.** Se ele precisar criar conta ou entender qualquer coisa, o artefato morre na primeira rodada e o dono volta para a planilha. O dono tolera atrito porque tem o problema; o contribuidor não tem problema nenhum — só um pedido de alguém.

---

## 3. Requisitos funcionais

### 3.1 Publicação e diagnóstico

**RF-01 [E]** — O sistema aceita upload de arquivo HTML e devolve um link público único. *Já existe; mantido.*

**RF-02 [E]** — No upload, o sistema analisa o HTML e classifica sua capacidade de memória em três categorias, informando o usuário em linguagem clara:

| Categoria | Critério | Sentido da mensagem |
|---|---|---|
| Memória automática | Usa `localStorage`/`sessionStorage` | "Guarda dados. Todos com o link veem o mesmo." |
| Memória de campos | Sem storage, mas tem `input`/`textarea`/`select` | "O que for preenchido nos campos fica salvo." |
| Sem memória | Estado apenas em memória de execução | "Funciona como página, mas o que for preenchido não fica." |

*Critério de aceite:* os 11 casos de `spike-persistencia/casos/` são classificados corretamente.

**RF-03 [E]** — O sistema nunca apresenta um artefato como capaz de guardar dados quando ele não é. *Falhar em silêncio custa a credibilidade do produto inteiro: o time preenche, perde tudo, e não volta.*

**RF-04 [I]** — A classificação de cada upload é registrada para análise agregada. *Origem: dimensiona a demanda pela transformação por IA, que está fora da v1.*

### 3.2 Memória compartilhada

**RF-10 [E]** — Toda leitura e escrita de `localStorage` e `sessionStorage` feita pelo artefato é redirecionada para a memória do artefato, sem alteração do arquivo original.
Cobre `getItem`/`setItem`/`removeItem`/`clear`, `length`, `key(i)`, acesso por propriedade direta (`localStorage.x = 1`) e alias (`const ls = window.localStorage`). *Origem: as cinco formas apareceram nos casos do spike.*

**RF-11 [E]** — A memória pertence ao **artefato**, não ao usuário nem ao navegador. Duas pessoas diferentes abrindo o mesmo link veem e editam os mesmos dados.

> **Este é o requisito central.** Se a memória for implementada por usuário, o produto vira uma cópia pior do navegador e a v1 não entrega valor nenhum. Todo o resto do documento depende dele.

**RF-12 [E]** — O conteúdo de campos de formulário (`input`, `textarea`, `select`) é persistido automaticamente, sem exigir cooperação do HTML. Campos de senha e de arquivo são ignorados.

**RF-13 [E]** — O sistema expõe uma API explícita de memória para artefatos escritos sabendo que o Leme existe (ler, gravar, observar mudança).

**RF-14 [E]** — Alterações feitas por um contribuidor ficam visíveis aos demais em até **10 segundos** **[PREMISSA]**, sem ação manual. Quando o artefato não se atualizar sozinho, a interface do Leme oferece aviso de dados novos com opção de recarregar.
*Nota para o dev:* o Leme controla a sincronização da memória, mas não controla se o artefato re-renderiza — isso depende do HTML. Por isso o aviso precisa existir.

**RF-15 [E]** — Quando a memória muda por ação de outra pessoa, o sistema dispara o evento nativo `storage`. *Artefatos que já escutam esse evento passam a se atualizar sem código adicional.*

**RF-16 [I]** — Quando dois contribuidores alteram a mesma chave, a última escrita prevalece **e o fato fica visível** para quem foi sobrescrito. *Conflito silencioso em ferramenta de time gera perda de confiança difícil de recuperar.*

### 3.3 Identidade e autoria

**RF-20 [E]** — O contribuidor edita um artefato sem criar conta e sem fazer login. *Requisito que conflitar com este perde.*

**RF-21 [E]** — Na primeira edição, o sistema pede apenas um nome de exibição — sem senha, email ou verificação — e o guarda no navegador para as próximas visitas.

**RF-22 [E]** — Cada chave da memória registra quem alterou por último e quando.

**RF-23 [I]** — O sistema registra o domínio de email do dono e, quando disponível, dos contribuidores. *Origem comercial: é o gatilho de prospecção descrito em `Leme App - Modelo de Negocio.md`.*

### 3.4 Painel do dono

**RF-30 [E]** — O dono tem, por artefato, uma tela que responde três perguntas: quem já contribuiu · o que mudou por último · como exportar.

**RF-31 [I]** — O painel lista contribuidores com a data da última contribuição, para o dono saber quem falta.

### 3.5 Exportação

**RF-40 [E]** — O dono exporta toda a memória do artefato em CSV. *Sem isso a v1 não fecha o ciclo: o dono preencheu um formulário bonito e continua consolidando à mão — exatamente o problema que veio resolver.*

**RF-41 [I]** — A exportação inclui, por chave: valor, quem alterou por último e quando.

### 3.6 Primeira experiência

**RF-50 [E]** — Existe um artefato de exemplo funcional, acessível em um clique, sem upload e sem conta. *A maioria de quem chega não tem arquivo HTML na mão e hoje não consegue experimentar nada.*

**RF-51 [E]** — Logo após o upload, o sistema conduz o usuário a experimentar a memória compartilhada: editar, abrir uma segunda visão e ver o dado do outro lado. *O valor da v1 não pode depender de descoberta espontânea — sem viver esse momento, o usuário conclui que o Leme é hospedagem, que é grátis em outros dez lugares.*

**RF-52 [I]** — A visualização do artefato deixa explícito que os dados são compartilhados com quem tem o link.

---

## 4. Requisitos não funcionais

### 4.1 Compatibilidade — o maior risco técnico

**RNF-01 [E]** — A injeção da memória não pode quebrar um artefato que funcionava antes. Se qualquer parte do mecanismo falhar, o artefato continua renderizando, ainda que sem memória.
*Critério de aceite:* com o serviço de memória indisponível, o artefato abre como página estática funcional — nunca tela em branco ou erro.

**RNF-02 [E]** — O mecanismo funciona em Chrome, Safari e Firefox atuais, desktop e mobile, validado com automação de navegador real. *O spike rodou em jsdom; CSP, iframe sandbox e Shadow DOM não foram exercitados.*

**RNF-03 [E]** — A leitura da memória é síncrona do ponto de vista do artefato, e o estado inicial está disponível antes da execução de qualquer script do arquivo. *`localStorage` é síncrono por definição; é essa restrição que obriga a injeção do estado inicial junto com a página.*

**RNF-04 [I]** — O mecanismo convive com HTML que use `<iframe>`, Shadow DOM, módulos ES e CSP declarada no próprio arquivo — ou degrada de forma previsível e informada.

### 4.2 Integridade da memória

**RNF-10 [E]** — Nenhuma alteração confirmada na interface é perdida. Escritas pendentes são enviadas antes de a aba ser fechada ou ocultada. *A escrita é otimista e agrupada; sem isso, quem digita e fecha perde o dado sem aviso.*

**RNF-11 [E]** — Em queda de rede, as alterações são reenviadas ao reconectar ou o usuário é avisado de que não foram salvas. Silêncio não é comportamento aceitável.

**RNF-12 [I]** — Escritas são idempotentes e por chave, para que reenvio não corrompa a memória.

### 4.3 Desempenho e capacidade

**RNF-20 [E]** — A memória por artefato tem limite explícito de **1 MB** **[PREMISSA]**, com aviso ao se aproximar e comportamento definido ao atingir. *O estado inicial viaja junto com a página; cresce com os dados.*

**RNF-21 [E]** — A memória não acrescenta mais de **300 ms** **[PREMISSA]** ao carregamento do artefato, com memória de tamanho típico.

**RNF-22 [I]** — Escritas frequentes são agrupadas antes do envio, para não gerar uma requisição por tecla digitada.

**RNF-23 [I]** — O sistema suporta **50 contribuidores simultâneos** **[PREMISSA]** no mesmo artefato sem degradação perceptível. *Referência: o planilhão de capex tem dezenas de áreas preenchendo ao mesmo tempo perto do prazo.*

### 4.4 Segurança e isolamento

**RNF-30 [E]** — O HTML publicado é código de terceiro não confiável e permanece isolado do domínio do Leme, como já ocorre hoje.

**RNF-31 [E]** — A credencial usada pelo artefato para acessar a memória é escopada ao próprio artefato, sem alcance sobre outros artefatos nem sobre a sessão do usuário. *O artefato executa código arbitrário: qualquer credencial nele deve ser tratada como pública.*

**RNF-32 [E]** — Há limite de taxa de escrita por artefato e por origem, para que um HTML malicioso ou com laço infinito não sobrecarregue o serviço.

**RNF-33 [I]** — O conteúdo da memória é tratado como dado, nunca interpretado como código — nem ao voltar para o artefato, nem no painel do dono.

### 4.5 Privacidade e retenção

**RNF-40 [E]** — Os termos de uso explicitam onde a memória fica, por quanto tempo, e que qualquer pessoa com o link a acessa.

**RNF-41 [E]** — Artefatos e memórias do plano gratuito expiram, com aviso prévio ao dono. *Retenção curta passa a ter função de proteção, não só de monetização.*

**RNF-42 [I]** — No upload, o sistema pergunta se o artefato conterá informação confidencial e registra a resposta. *Proteção jurídica e, de quebra, sinal de qualificação comercial.*

**RNF-43 [E]** — O dono apaga definitivamente um artefato e toda a sua memória.

### 4.6 Observabilidade

**RNF-50 [E]** — O sistema mede, por artefato: contribuidores distintos, edições, exportações e retorno do mesmo contribuidor após 24 h.

**RNF-51 [E]** — É possível apurar a métrica principal da v1: **% de artefatos com edição de mais de uma pessoa.** *É a prova de que virou ferramenta de time, e não página publicada.*

**RNF-52 [I]** — É possível apurar o número de pessoas distintas por domínio de email tocando artefatos. *Origem comercial: é o gatilho da conversa corporativa.*

**RNF-53 [I]** — Falhas do mecanismo em artefatos reais são registradas junto com o padrão de HTML que as causou.

### 4.7 Portabilidade

**RNF-60 [I]** — O mecanismo de memória é separável do aplicativo público, de modo a poder ser implantado dentro da infraestrutura de um cliente sem carregar o resto do produto. *Origem comercial: `Precificacao/Leme - Contexto de Precificacao.md` — a Leme mantém o motor genérico. O motor é o ativo.*

---

## 5. Fora de escopo

Explícito, porque tudo aqui parece razoável isoladamente — e é por parecer razoável que vaza para dentro da entrega e a atrasa.

- Entrada por planilha ou qualquer recipiente que não seja HTML
- Transformação por IA de artefatos sem memória
- SSO, permissão por grupo, auditoria corporativa, multi-tenant — *é o produto corporativo, e roda na infraestrutura do cliente*
- Notificação, prazo de preenchimento, travamento de artefato
- Domínio próprio, analytics, senha na página — *briga de hospedagem, que está perdida*
- Editor de HTML dentro do Leme
- Aplicativo móvel
- Resolução automática de conflito (merge, CRDT)

**Dívida assumida:** histórico completo, versões e desfazer. A v1 guarda o estado atual e o último autor. Uma memória que só guarda o agora é uma variável, não uma memória — a v1 entrega a versão mais rasa possível e isso precisa ser resolvido na v2.

---

## 6. Riscos

### Verificado no spike

- **Estado em memória de execução não persiste, e nunca vai persistir por interceptação.** Não é limitação de implementação: não se intercepta variável dentro de closure a partir de fora. As instruções de artifacts do Claude proíbem `localStorage`, então artefato do Claude cai sempre nesse caso. Mitigação na v1: RF-02 e RF-03 comunicam com honestidade. Resolver de fato exige transformação, que está fora do escopo.
- **HTML que usa storage persiste em 100% das formas de acesso testadas.** O mecanismo funciona.

### Suposto — não verificado

- **O spike rodou em jsdom, não em navegador real.** CSP, iframe sandbox, Shadow DOM e HTML pesado não foram exercitados. É a diferença entre "funciona no teste" e "funciona no cliente" — RNF-02 existe para fechar isso, e nenhuma demo comercial deve acontecer antes.
- **Conflito de escrita simultânea não foi testado.** Com dezenas de contribuidores perto de um prazo, vai acontecer.
- **Volume de memória não foi testado.** O limite de 1 MB é estimativa, não medição.

### Risco de negócio e jurídico

- **Dados corporativos reais em SaaS público.** Se a v1 funcionar, capex, headcount e projeções vão parar num serviço hospedado fora da empresa. Isso é simultaneamente a razão da venda corporativa existir e uma exposição real — um incidente com nome de cliente grande mata o produto antes de ele existir. RNF-40 a RNF-43 reduzem, não eliminam.

⚠️ *Este documento não substitui avaliação jurídica. Responsabilidade sobre dado de terceiro e adequação à LGPD precisam de análise profissional antes de promover uso corporativo do plano gratuito.*

---

## 7. Decisões pendentes que bloqueiam

1. **Quem pode escrever na memória?** Hoje o desenho é: qualquer pessoa com o link edita os dados de todos. É intencional para o caso do time, mas um link vazado corrompe o trabalho de dezenas de pessoas. A v1 aceita isso, ou escrita exige um segredo separado do link de leitura? *Muda o modelo de dados e o fluxo de compartilhamento.*
2. **Qual é o limite do plano gratuito?** Não pode ser número de contribuidores — isso quebra o modelo de negócio. Provavelmente artefatos ativos, tamanho de memória ou retenção. *Muda `lib/plans.ts` e a narrativa da página de planos.*
3. **O que acontece ao atingir o limite de memória?** Bloquear escrita, descartar o mais antigo, ou degradar avisando? *Sem decisão, o comportamento vai emergir por acidente no pior momento.*
4. **O nome de exibição é confiável?** Sem verificação, qualquer um se diz qualquer coisa — e o painel do dono vai apresentar isso como autoria. Aceitável para a v1, mas precisa ser decisão consciente e visível na interface.
