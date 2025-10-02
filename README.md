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
# 3.Código
## 3.1 Estrutura HTML (main.html)
 O arquivo **HTML** é a base da aplicação, responsável por estruturar o conteúdo que será exibido no navegador. No documento enviado temos os seguintes elementos principais: \
• Cabeçalho (header): Contém o logotipo e o menu de navegação.\ 
• Menu (nav): Links de acesso às seções (Dashboard, Minhas Matérias, Minhas Metas, Estatísticas e Perfil).\ 
• Conteúdo principal (main): Possui as seções de apresentação e os quadros de tarefas, metas e estatísticas.\ 
• Botão (button 'Novo +'): Permite adicionar novas tarefas ou metas. \
• Quadros (section/aside): Organizam o layout, exibindo tarefas, metas, estatísticas e eventos.\ 
• Rodapé (footer): Contém o aviso de direitos autorais do sistema. 

## 3.2 Estilização com CSS (styleMain.css)
O arquivo **CSS** define o estilo visual da página. Ele controla cores, espaçamento, tipografia e posicionamento dos elementos. Os principais pontos são:\
• Uso de variáveis (root): Define cores padrão, sombras, espaçamento e limites de largura.\ 
• Layout responsivo: Com uso de grid e media queries para ajustar em telas menores.\ 
• Cabeçalho fixo: Mantém o menu visível no topo da página.\ 
• Botão estilizado: O botão 'Novo +' muda de cor ao passar o mouse (hover).\
• Quadros (cards): Apresentam sombra, bordas arredondadas e espaçamento interno.\ 
• Rodapé fixo: Sempre visível no final da tela.

## 3.3 Funcionalidade com JavaScript (mainScript.js)
O arquivo **JavaScript** adiciona interatividade à aplicação. No documento enviado, ele é responsável por:\ 
• Esperar o carregamento da página (DOMContentLoaded) antes de rodar o código.\ 
• Selecionar os elementos principais (botão, listas de tarefas e metas, estatísticas).\ 
• Criar barras de progresso dinâmicas para tarefas e metas.\ 
• Adicionar itens (tarefas ou metas) com prompts de texto.\ 
• Remover itens quando concluídos (checkbox marcado).\ 
• Atualizar automaticamente as barras de progresso com base nas tarefas/metas concluídas. 

# 4.Grupo
João Henrique Pereira Amaral - RA: 10737510\
Heitor Assis Duenhas - RA: 10739294\
Github - https://github.com/Artetorres/Web-mobile-02J12
