'use client';

import React, { useState, useEffect } from 'react'; 
import { useParams } from 'next/navigation';

export default function MateriaPage() {
  const params = useParams();
  const materiaId = params.materiaId; 
  
  const CHAVE_TOPICOS = `topicos-${materiaId}`;
  const CHAVE_AVALIACOES = `avaliacoes-${materiaId}`;

  const carregarDados = (chave, valorPadrao) => {
    try {
      if (typeof window !== 'undefined') {
        const guardado = localStorage.getItem(chave);
        return guardado ? JSON.parse(guardado) : valorPadrao;
      }
    } catch (error) {
      console.error("Falha ao ler o localStorage", error);
    }
    return valorPadrao;
  };

  const [topicos, setTopicos] = useState(() => carregarDados(CHAVE_TOPICOS, []));
  const [avaliacoes, setAvaliacoes] = useState(() => carregarDados(CHAVE_AVALIACOES, []));

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_TOPICOS, JSON.stringify(topicos));
    } catch (error) {
      console.error("Falha ao salvar tópicos", error);
    }
  }, [topicos, CHAVE_TOPICOS]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_AVALIACOES, JSON.stringify(avaliacoes));
    } catch (error) {
      console.error("Falha ao salvar avaliações", error);
    }
  }, [avaliacoes, CHAVE_AVALIACOES]);


  const formatarId = (id) => {
    if (!id) return '';
    return id
      .split('-') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' ');
  };
  
  const tituloFormatado = formatarId(materiaId);

  const handleAdicionarTopico = () => {
    const nomeTopico = prompt("Qual tópico você quer adicionar?");
    if (!nomeTopico) return;
    setTopicos(prev => [...prev, nomeTopico]);
  };
  
  const handleAdicionarAvaliacao = () => {
    const nomeAvaliacao = prompt("Qual avaliação você quer adicionar? (ex: Prova 01 - 20/11)");
    if (!nomeAvaliacao) return;
    
    const novaAvaliacao = {
      id: Date.now(), 
      nome: nomeAvaliacao
    };
    setAvaliacoes(prev => [...prev, novaAvaliacao]);
  };

  const proximoTopico = topicos.length > 0 
    ? topicos[0] 
    : "Adicione seu primeiro tópico!";

  return (
    <section>
      <section className="cabecalho-pagina">
        <div className="titulo">
            <h1>{tituloFormatado}</h1>
            <p>Gerencie os tópicos, exercícios e provas de {tituloFormatado}.</p>
        </div>
        <button className="botao" onClick={handleAdicionarTopico}>Novo Tópico +</button>
      </section>

      <section className="quadros">
        <aside>
          {/* Tópicos */}
          <section className="quadro-esquerda">
              <h3 className="subtitulo">Próximo Tópico</h3>
              <p className="escondido">{proximoTopico}</p>
          </section>

          <section className="quadro-esquerda">
              <h3 className="subtitulo">Tópicos de Estudo</h3>
              {topicos.length === 0 ? (
                <p className="escondido">Ainda não há tópicos.</p>
              ) : (
                <ul className="lista">
                  {topicos.map((topico, index) => (
                    // NOVO: Aplicando classes no <li> e <button>
                    <li key={index} className="lista-item lista-item-gerenciador">
                      {topico}
                      <button 
                        onClick={() => {
                          if (confirm(`Concluir tópico: "${topico}"?`)) {
                            setTopicos(prev => prev.filter((_, i) => i !== index));
                          }
                        }}
                        className="btn-acao-lista btn-acao-concluir"
                        title="Concluir tópico"
                      >
                        ✓
                      </button>
                    </li>
                  ))}
                </ul>
              )}
          </section>
        </aside>

        <aside>
          <section className="quadro-direita">
              <h3 className="subtitulo">Próximas Avaliações</h3>
              
              {avaliacoes.length === 0 ? (
                <p className="escondido">Sem avaliações cadastradas.</p>
              ) : (
                <ul className="lista">
                  {avaliacoes.map(av => (
                    <li key={av.id} className="lista-item lista-item-gerenciador">
                      {av.nome}
                      <button
                         onClick={() => {
                          if (confirm(`Remover avaliação: "${av.nome}"?`)) {
                            setAvaliacoes(prev => prev.filter(a => a.id !== av.id));
                          }
                        }}
                         className="btn-acao-lista btn-acao-remover"
                         title="Remover avaliação"
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              
              <button 
                onClick={handleAdicionarAvaliacao}
                className="botao btn-full-bottom"
              >
                Nova Avaliação +
              </button>
          </section>
        </aside>
      </section>
    </section>
  );
}