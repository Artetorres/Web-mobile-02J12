'use client'; 

import React, { useState, useRef } from 'react';
import ProgressBar from './ProgressBar'; 

export default function MainContent() {

  const [tarefas, setTarefas] = useState([]);
  const [metas, setMetas] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [dictLoading, setDictLoading] = useState(false);
  const [dictError, setDictError] = useState(null);

  
  const totalTarefas = tarefas.length;
  const concluidasTarefas = tarefas.filter(t => t.concluida).length;
  const totalMetas = metas.length;
  const concluidasMetas = metas.filter(m => m.concluida).length;
  
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
      const novoItem = { id: `tarefa-${contadorTarefasRef.current}`, texto: texto, concluida: false };
      setTarefas(prev => [...prev, novoItem]);
    } else if (tipo === "metas") {
      contadorMetasRef.current++;
      const novoItem = { id: `meta-${contadorMetasRef.current}`, texto: texto, concluida: false };
      setMetas(prev => [...prev, novoItem]);
    } else {
      alert("Opção inválida.");
    }
  };
  
  const handleConcluirItem = (id, tipo) => {
    if (tipo === 'tarefas') {
      setTarefas(prev => prev.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
    } else if (tipo === 'metas') {
      setMetas(prev => prev.map(m => m.id === id ? { ...m, concluida: !m.concluida } : m));
    }
  };

  const handleSearchDicionario = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setDictLoading(true);
    setSearchResult(null);
    setDictError(null);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      if (!response.ok) throw new Error('Palavra não encontrada ou falha na rede.');
      const data = await response.json();
      const definicao = data[0]?.meanings[0]?.definitions[0]?.definition;
      const fonetica = data[0]?.phonetic;
      if (definicao) {
        setSearchResult({ palavra: data[0].word, definicao: definicao, fonetica: fonetica });
      } else {
        throw new Error('Definição não encontrada na resposta.');
      }
    } catch (error) {
      setDictError(error.message);
    } finally {
      setDictLoading(false);
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
      <label 
        htmlFor={item.id} 
        className={item.concluida ? 'checklist-label-concluido' : ''}
      >
        {item.texto}
      </label>
    </div>
  );

  return (
    <section>
        <section className="cabecalho-pagina">
            <div className="titulo">
                <h1>Olá, Estudante!</h1>
                <p>Seja bem vindo ao seu espaço de estudos. Vamos fazer mais um dia produtivo!</p>
            </div>
            <button className="botao" onClick={handleAdicionarItem}>Novo +</button>
        </section>

        <section className="quadros">
            <aside>
                <section className="quadro-esquerda">
                    <h3 className="subtitulo">Hoje <span className="escondido">• {totalTarefas} Tarefas</span></h3>
                    <form className="checklist" id="lista-tarefas">
                      {tarefas.map(t => (
                        <CheckListItem key={t.id} item={t} tipo="tarefas" onConcluir={handleConcluirItem} />
                      ))}
                    </form>
                </section>

                <section className="quadro-esquerda">
                    <h3 className="subtitulo">Metas</h3>
                    <form className="checklist" id="lista-metas">
                      {metas.map(m => (
                        <CheckListItem key={m.id} item={m} tipo="metas" onConcluir={handleConcluirItem} />
                      ))}
                    </form>
                </section>
                
                <section className="quadro-direita">
                    <h3 className="subtitulo">Estatisticas</h3>
                    <div className="lista" id="lista-eventos">
                        <ProgressBar
                            titulo="Progresso - Tarefas"
                            total={totalTarefas}
                            concluidos={concluidasTarefas}
                            cor="#3b82f6" 
                        />
                         <ProgressBar
                            titulo="Progresso - Metas"
                            total={totalMetas}
                            concluidos={concluidasMetas}
                            cor="#10b981"
                        />
                    </div>
                </section>
            </aside>

            <aside>
                <section className="quadro-direita">
                    <h3 className="subtitulo">Dicionário (Inglês)</h3>
                    <form className="dicionario-form" onSubmit={handleSearchDicionario}>
                        <input 
                            type="text"
                            className="dicionario-input"
                            placeholder="Digite uma palavra..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="dicionario-botao" disabled={dictLoading}>
                            {dictLoading ? '...' : 'Buscar'}
                        </button>
                    </form>
                    
                    <div className="dicionario-resultado">
                        {dictLoading && <p>Carregando...</p>}
                        {dictError && <p className="dicionario-erro">{dictError}</p>}
                        {searchResult && (
                            <>
                                <h4>
                                  {searchResult.palavra} 
                                  <span>{searchResult.fonetica}</span>
                                </h4>
                                <p>{searchResult.definicao}</p>
                            </>
                        )}
                    </div>
                </section>
            </aside>
        </section>
    </section>
  );
}