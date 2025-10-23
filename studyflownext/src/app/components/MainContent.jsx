'use client'; // Indica que este componente deve ser renderizado no lado do cliente.

import React, { useState, useEffect, useRef } from 'react';



export default function MainContent() {
  // Estados para Tarefas e Metas (lista de objetos)
  const [tarefas, setTarefas] = useState([]);
  const [metas, setMetas] = useState([]);
  
  // Contadores para o progresso
  const totalTarefas = tarefas.length;
  const concluidasTarefas = tarefas.filter(t => t.concluida).length;
  const totalMetas = metas.length;
  const concluidasMetas = metas.filter(m => m.concluida).length;

  
  const barraTarefasRef = useRef(null);
  const barraMetasRef = useRef(null);
  const estatisticasRef = useRef(null);
  
  // Contadores para gerar IDs únicos (para fins de persistência/chave)
  const contadorTarefasRef = useRef(0);
  const contadorMetasRef = useRef(0);


  // Função que cria uma barra de progresso
  const criarBarra = (titulo, cor, ref) => {
    if (!estatisticasRef.current) return;
    
   
    const container = document.createElement("div");
    container.style.marginBottom = "16px";

    const label = document.createElement("p");
    label.textContent = titulo;
    label.style.margin = "0 0 6px";
    label.style.fontWeight = "500";

    const barraContainer = document.createElement("div");
    barraContainer.style.width = "100%";
    barraContainer.style.height = "20px";
    barraContainer.style.backgroundColor = "#e5e7eb";
    barraContainer.style.borderRadius = "10px";
    barraContainer.style.overflow = "hidden";

    const barra = document.createElement("div");
    barra.style.height = "100%";
    barra.style.width = "0%";
    barra.style.backgroundColor = cor;
    barra.style.transition = "width 0.3s ease";

    barraContainer.appendChild(barra);
    container.appendChild(label);
    container.appendChild(barraContainer);

    estatisticasRef.current.appendChild(container);
    ref.current = barra; // Salva a referência para o preenchimento da barra
  };
  
  // Inicialização das barras de progresso
  useEffect(() => {
    criarBarra("Progresso - Tarefas", "#3b82f6", barraTarefasRef);
    criarBarra("Progresso - Metas", "#3b82f6", barraMetasRef);
  }, []); // [] garante que rode apenas na montagem

  // Atualiza as barras de progresso sempre que as listas mudam
  useEffect(() => {
    const percTarefas = totalTarefas === 0 ? 0 : (concluidasTarefas / totalTarefas) * 100;
    const percMetas = totalMetas === 0 ? 0 : (concluidasMetas / totalMetas) * 100;

    if (barraTarefasRef.current) {
      barraTarefasRef.current.style.width = `${percTarefas}%`;
    }
    if (barraMetasRef.current) {
      barraMetasRef.current.style.width = `${percMetas}%`;
    }
  }, [totalTarefas, concluidasTarefas, totalMetas, concluidasMetas]);

  // Função para adicionar um novo item (chamada pelo onClick do botão)
  const handleAdicionarItem = () => {
    const escolha = prompt("Adicionar em: Tarefas ou Metas ?");
    if (!escolha) return;

    const texto = prompt("Digite a tarefa ou meta:");
    if (!texto) return;
    
    const tipo = escolha.toLowerCase();
    
    if (tipo === "tarefas") {
      contadorTarefasRef.current++;
      const novoItem = {
        id: `tarefa-${contadorTarefasRef.current}`,
        texto: texto,
        concluida: false
      };
      setTarefas(prev => [...prev, novoItem]);
    } else if (tipo === "metas") {
      contadorMetasRef.current++;
      const novoItem = {
        id: `meta-${contadorMetasRef.current}`,
        texto: texto,
        concluida: false
      };
      setMetas(prev => [...prev, novoItem]);
    } else {
      alert("Opção inválida.");
    }
  };
  
  // Função para marcar como concluído (chamada pelo onChange do checkbox)
  const handleConcluirItem = (id, tipo) => {
   
    if (tipo === 'tarefas') {
      setTarefas(prev => prev.filter(t => t.id !== id));
    } else if (tipo === 'metas') {
      setMetas(prev => prev.filter(m => m.id !== id));
    }
  };


  // Componente Auxiliar para renderizar um item 
  const CheckListItem = ({ item, tipo, onConcluir }) => (
    <div className="checklist-item">
      <input 
        type="checkbox" 
        id={item.id} 
        className="checkbox" 
        onChange={() => onConcluir(item.id, tipo)}
      />
      <label htmlFor={item.id}>{item.texto}</label>
    </div>
  );


  // Renderização do JSX
  return (
    <section>
        {/* Cabeçalho da página  */}
        <section className="cabecalho-pagina">
            <div className="titulo">
                <h1>Olá, Estudante!</h1>
                <p>Seja bem vindo ao seu espaço de estudos. Vamos fazer mais um dia produtivo!</p>
            </div>
            {/* Botão com o handler de clique */}
            <button className="botao" onClick={handleAdicionarItem}>Novo +</button>
        </section>

        {/* Seção principal dividida em colunas */}
        <section className="quadros">
            {/* Coluna esquerda */}
            <aside>
                {/* Lista de tarefas do dia */}
                <section className="quadro-esquerda">
                    <h3 className="subtitulo">Hoje <span className="escondido">• {totalTarefas} Tarefas</span></h3>
                    <form className="checklist" id="lista-tarefas">
                      {tarefas.map(t => (
                        <CheckListItem 
                          key={t.id} 
                          item={t} 
                          tipo="tarefas" 
                          onConcluir={handleConcluirItem} 
                        />
                      ))}
                    </form>
                </section>

                {/* Lista de metas */}
                <section className="quadro-esquerda">
                    <h3 className="subtitulo">Metas</h3>
                    <form className="checklist" id="lista-metas">
                      {metas.map(m => (
                        <CheckListItem 
                          key={m.id} 
                          item={m} 
                          tipo="metas" 
                          onConcluir={handleConcluirItem} 
                        />
                      ))}
                    </form>
                </section>
                
                {/* Estatísticas */}
                <section className="quadro-direita">
                    <h3 className="subtitulo">Estatisticas</h3>
                    <ul className="lista" ref={estatisticasRef} id="lista-eventos"></ul>
                </section>
            </aside>

            {/* Coluna direita */}
            <aside>
                {/* Mostra próxima tarefa */}
                <section className="quadro-direita">
                    <h3 className="subtitulo">Próxima tarefa</h3>
                    <p className="escondido">Revisar calculo I</p>
                </section>

                {/* Próximos eventos */}
                <section className="quadro-direita">
                    <h3 className="subtitulo">Próximos eventos</h3>
                    <ul className="lista">
                        <li className="lista-item">Prova de calculo</li>
                        <li className="lista-item">Prova de fisica</li>
                    </ul>
                </section>
            </aside>
        </section>
    </section>
  );
}