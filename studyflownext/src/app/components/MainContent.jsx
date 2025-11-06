'use client'; 

import React, { useState, useRef } from 'react';
import ProgressBar from './ProgressBar'; 

export default function MainContent() {
  // Estados para Tarefas e Metas (lista de objetos)
  const [tarefas, setTarefas] = useState([]);
  const [metas, setMetas] = useState([]);
  
  const totalTarefas = tarefas.length;
  const concluidasTarefas = tarefas.filter(t => t.concluida).length;
  const totalMetas = metas.length;
  const concluidasMetas = metas.filter(m => m.concluida).length;

  
  const estatisticasRef = useRef(null); 
  
  const contadorTarefasRef = useRef(0);
  const contadorMetasRef = useRef(0);

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
  

  const handleConcluirItem = (id, tipo) => {
    if (tipo === 'tarefas') {
      setTarefas(prev => 
        prev.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t)
      );
    } else if (tipo === 'metas') {
      setMetas(prev => 
        prev.map(m => m.id === id ? { ...m, concluida: !m.concluida } : m)
      );
    }
  };


  const CheckListItem = ({ item, tipo, onConcluir }) => (
    <div className="checklist-item">
      <input 
        type="checkbox" 
        id={item.id} 
        className="checkbox" 
        checked={item.concluida} 
        onChange={() => onConcluir(item.id, tipo)}
      />
      <label htmlFor={item.id} style={item.concluida ? { textDecoration: 'line-through', color: '#9ca3af' } : {}}>
        {item.texto}
      </label>
    </div>
  );


  return (
    <section>
        {/* Cabeçalho da página (sem alterações) */}
        <section className="cabecalho-pagina">
            <div className="titulo">
                <h1>Olá, Estudante!</h1>
                <p>Seja bem vindo ao seu espaço de estudos. Vamos fazer mais um dia produtivo!</p>
            </div>
            <button className="botao" onClick={handleAdicionarItem}>Novo +</button>
        </section>

        {/* Seção principal dividida em colunas */}
        <section className="quadros">
            {/* Coluna esquerda */}
            <aside>
                {/* Lista de tarefas do dia (sem alterações) */}
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

                {/* Lista de metas (sem alterações) */}
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
                
                {/* Estatísticas (TOTALMENTE SUBSTITUÍDO) */}
                <section className="quadro-direita">
                    <h3 className="subtitulo">Estatisticas</h3>
                    {/* A "ul" agora é apenas um container para os componentes ProgressBar */}
                    <div className="lista" ref={estatisticasRef} id="lista-eventos">
                        
                        {/* NOVO: Componente React para a barra de Tarefas */}
                        <ProgressBar
                            titulo="Progresso - Tarefas"
                            total={totalTarefas}
                            concluidos={concluidasTarefas}
                            cor="#3b82f6" 
                        />

                        {/* NOVO: Componente React para a barra de Metas */}
                         <ProgressBar
                            titulo="Progresso - Metas"
                            total={totalMetas}
                            concluidos={concluidasMetas}
                            cor="#10b981" /* Mudei a cor para diferenciar */
                        />

                    </div>
                </section>
            </aside>

            {/* Coluna direita (sem alterações) */}
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