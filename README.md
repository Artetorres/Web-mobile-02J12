# Web-mobile-02J12
projeto de web

# 1. Ideação
A primeira etapa para a criação do site foi a fase de ideação. Nesta etapa, reunimos
algumas ideias e necessidades para nós como estudantes e chegamos a conclusão de uma
dificuldade coletiva em organizar e gerenciar matérias e horários para estudar.
Foram levantadas questões como:\
\
Como organizar matérias e conteúdos de forma clara?\
\
Como acompanhar metas e prazos de estudos?\
\
Com base nessas necessidades, o grupo definiu que o site teria quatro seções principais:
Dashboard, Minhas Matérias, Minhas Metas e Estatísticas.

# 2. Caráter Extensionista
Este site pode ser considerado de caráter extensionista pois busca atender uma
necessidade real da comunidade acadêmica: a organização dos estudos.\
A ferramenta poderá ser utilizada por estudantes de diferentes níveis educacionais, promovendo inclusão
digital e acesso a recursos de planejamento e acompanhamento de desempenho
acadêmico.
Além disso, o projeto poderá ser expandido para colégios e universidades, auxiliando na
gestão de aprendizagem e fortalecendo o vínculo entre instituição e alunos.
/
## 3. Código
# 🚀 StudyFlow - Dashboard (Next.js/React)

Este projeto representa a migração de um dashboard simples (originalmente em HTML, CSS e JavaScript puro) para a arquitetura moderna de componentes React utilizando o framework Next.js (App Router).



/
### 3.1 Estrutura JSX (Componentes Next.js/React)

O código foi dividido em componentes reutilizáveis, seguindo o princípio de separação de responsabilidades (Single Responsibility Principle - SRP):
* Cabeçalho (`components/Header.jsx`): Contém o logotipo (agora referenciado via `/public`) e o menu de navegação. É importado no `layout.js`.
* Menu (`Header.jsx`): Links de acesso às seções (Dashboard, Minhas Matérias, Minhas Metas, Estatísticas e Perfil).
* Conteúdo principal (`components/MainContent.jsx`): É o componente **Client-side** principal, contendo toda a lógica de estado e a renderização dos quadros dinâmicos.
* Botão (`MainContent.jsx`): O botão 'Novo +' agora chama a função `handleAdicionarItem` para iniciar a lógica de estado.
* Quadros (`MainContent.jsx`): Organizam o layout, sendo preenchidos por mapeamento do estado (`tarefas.map`) e usando `useRef` para injetar as barras de progresso.
* Rodapé (`components/Footer.jsx`): Contém o aviso de direitos autorais. É importado no `layout.js`.

/
### 3.2 Estilização com CSS (app/globals.css)

Os estilos originais do `styleMain.css` foram copiados integralmente para o `app/globals.css`. Este arquivo é importado no `app/layout.js`, garantindo que os estilos sejam globais em toda a aplicação. Os principais pontos do estilo permanecem:
* Uso de variáveis (`:root`): Define cores padrão, sombras, espaçamento e limites de largura.
* Layout responsivo: Com uso de grid (`.quadros`) e *media queries* para ajustar em telas menores.
* Cabeçalho fixo: Mantém o menu visível no topo da página através da classe `.cabecalho` com `position: sticky; top: 0;`.
* Botão estilizado: O botão '.botao' usa `transition` para a mudança de cor no `hover`.
* Quadros (cards): Apresentam sombra (`var(--shadow)`), bordas arredondadas e espaçamento interno.
* Rodapé fixo: Sempre visível no final da tela através da classe `.rodape` com `position: fixed; bottom: 0;`.

/
### 3.3 Lógica com React/Next.js (`MainContent.jsx`)

A lógica foi refatorada do JS imperativo para o modelo de estado declarativo do React, mantendo a funcionalidade original:
* Gerenciamento de Estado: O **`useState`** (`tarefas`, `metas`) substitui as variáveis globais. O sistema re-renderiza a interface automaticamente quando o estado é atualizado.
* Lógica de Contagem: O **`useMemo`** é usado para calcular o progresso (`totalTarefas`, `concluidasMetas`) de forma eficiente, garantindo que o cálculo só ocorra quando o estado das listas mudar.
* Lógica de DOM (Mimetismo): O **`useRef`** e o **`useEffect`** são usados para criar e gerenciar as barras de progresso via manipulação direta do DOM, espelhando o comportamento do `mainScript.js` original, mas sob o controle do ciclo de vida do componente.
* Adição de Itens: A função `handleAdicionarItem` agora chama `setTarefas` ou `setMetas` (atualizando o estado), em vez de injetar HTML diretamente.
* Remoção/Conclusão: A função `handleConcluirItem` usa a função `filter()` para **remover o item do estado**, acionando uma nova renderização (que, por sua vez, dispara a atualização das barras via `useEffect`).

# 4.Grupo
João Henrique Pereira Amaral - RA: 10737510\
Heitor Assis Duenhas - RA: 10739294\
Github - https://github.com/Artetorres/Web-mobile-02J12
