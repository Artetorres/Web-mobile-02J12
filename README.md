# Web-mobile-02J12

## Projeto de desenvolvimento web-mobile.

# StudyFlow - Dashboard (Next.js/React)

Este projeto é uma aplicação de dashboard de estudos construída com Next.js (App Router) e React. O objetivo é fornecer aos estudantes uma ferramenta para organizar tarefas, metas e matérias acadêmicas, incluindo funcionalidades de persistência de dados via localStorage e consumo de API externa.

# 1. Ideação

A primeira etapa para a criação do site foi a fase de ideação. Nesta etapa, reunimos algumas ideias e necessidades para nós como estudantes e chegamos a conclusão de uma dificuldade coletiva em organizar e gerenciar matérias e horários para estudar./
Foram levantadas questões como:/

Como organizar matérias e conteúdos de forma clara?/

Como acompanhar metas e prazos de estudos?/

Com base nessas necessidades, o grupo definiu que o site teria seções principais para: Dashboard (visão geral), Minhas Matérias (gerenciamento de disciplinas) e um Dicionário (ferramenta de apoio).

# 2. Caráter Extensionista

Este site pode ser considerado de caráter extensionista pois busca atender uma necessidade real da comunidade acadêmica: a organização dos estudos./
A ferramenta poderá ser utilizada por estudantes de diferentes níveis educacionais, promovendo inclusão digital e acesso a recursos de planejamento e acompanhamento de desempenho acadêmico./
Além disso, o projeto poderá ser expandido para colégios e universidades, auxiliando na gestão de aprendizagem e fortalecendo o vínculo entre instituição e alunos.

# 3. Código e Estrutura

A aplicação foi desenvolvida utilizando o App Router do Next.js, com uma estrutura baseada em componentes "client-side" ('use client') para interatividade e gerenciamento de estado.

## 3.1 Estrutura de Arquivos (App Router)

*app/layout.js: Define o layout raiz (RootLayout), importando o Header, Footer e o arquivo de estilos global (globals.css).

*app/page.js: Página principal (Dashboard), que renderiza o componente MainContent.

*app/materias/page.js: Página "Minhas Matérias", responsável por listar e permitir a criação de novas matérias.

*app/materias/[materiaId]/page.js: Rota dinâmica que exibe os detalhes (tópicos, avaliações) de uma matéria específica.

*app/components/: Diretório para componentes reutilizáveis.

## 3.2 Componentes Reutilizáveis

*components/Header.jsx: Contém o logotipo e o menu de navegação principal, utilizando o componente <Link> do Next.js para navegação entre a Dashboard (/) e "Minhas Matérias" (/materias).

*components/Footer.jsx: Rodapé fixo da aplicação.

*components/ProgressBar.jsx: Um componente de UI isolado que recebe titulo, total, e concluidos como props para renderizar uma barra de progresso visual. A estilização é feita via inline styles.

## 3.3 Gerenciamento de Estado (Client-side)

Todo o estado interativo da aplicação (listas de tarefas, metas, matérias, tópicos) é gerenciado no lado do cliente:

*useState: Utilizado para gerenciar todos os dados dinâmicos, como as listas de tarefas e metas em MainContent.jsx, ou a lista de materias em app/materias/page.js.

*useEffect e localStorage: Para persistir os dados do usuário, a aplicação utiliza localStorage. O hook useEffect é usado para salvar os dados (ex: localStorage.setItem) sempre que o estado (ex: materias) é alterado. Os dados são carregados do localStorage na inicialização do estado do useState.

*useRef: Utilizado em MainContent.jsx (contadorTarefasRef, contadorMetasRef) para gerar IDs únicos para novos itens sem causar re-renderizações.

## 3.4 Estilização com CSS (app/globals.css)

Toda a estilização do projeto é centralizada no arquivo app/globals.css, importado no layout.js.

*CSS Variables (:root): Define a paleta de cores, sombras, e espaçamentos, permitindo um design consistente.

*Layout Responsivo: Utiliza grid (.quadros) e media queries (@media (max-width: 900px)) para adaptar o layout de duas colunas para uma única coluna em telas menores.

*Layout Fixo: O cabeçalho (.cabecalho) e o rodapé (.rodape) utilizam position: sticky e position: fixed, respectivamente, para se manterem visíveis durante a rolagem.

# 4. Funcionalidades Adicionais

## 4.1 Consumo de API (Dicionário Inglês)

A página principal (MainContent.jsx) inclui uma funcionalidade de dicionário de inglês que consome uma API pública.

*Endpoint: https://api.dictionaryapi.dev/api/v2/entries/en/{palavra}.

*Implementação: A função handleSearchDicionario é async e utiliza fetch para buscar a definição da palavra.

*Estado de UI: O componente gerencia o estado da requisição com useState (dictLoading, dictError, searchResult), exibindo mensagens de "Carregando...", tratando erros, ou mostrando o resultado (palavra, fonética e definição).

## 4.2 Rotas Dinâmicas (Minhas Matérias)

O projeto implementa rotas dinâmicas para o gerenciamento individual de cada matéria.

*Criação (app/materias/page.js): O usuário pode adicionar uma nova matéria. Uma função (criarId) converte o nome (ex: "Álgebra Linear") em um "slug" (ex: algebra-linear) usado como ID.

*Navegação: A página utiliza o <Link> do Next.js para criar links dinâmicos: <Link href={'/materias/${materia.id}'}>.

*Página Dinâmica (app/materias/[materiaId]/page.js):

  *Utiliza o hook useParams do next/navigation para extrair o materiaId (o "slug") da URL.

  *Este materiaId é então usado para formatar o título da página e, crucialmente, para criar chaves únicas no localStorage (ex: CHAVE_TOPICOS =   'topicos-${materiaId}').

*Isso permite que cada página de matéria armazene e gerencie seus próprios tópicos e avaliações de forma isolada.

## 5. Grupo

João Henrique Pereira Amaral - RA: 10737510/
Heitor Assis Duenhas - RA: 10739294/
Github - https://github.com/Artetorres/Web-mobile-02J12
