'use client'; 

import Link from 'next/link';
import React, { useState, useEffect } from 'react'; 

export default function MateriasPage() {
  
  const [materias, setMaterias] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const guardado = localStorage.getItem('minhasMaterias');
        return guardado ? JSON.parse(guardado) : [];
      }
    } catch (error) {
      console.error("Falha ao ler o localStorage", error);
    }
    return [];
  });

  const [novaMateriaNome, setNovaMateriaNome] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('minhasMaterias', JSON.stringify(materias));
    } catch (error) {
      console.error("Falha ao salvar no localStorage", error);
    }
  }, [materias]);


  const criarId = (nome) => {
    return nome
      .toLowerCase()
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, '') 
      .replace(/\s+/g, '-'); 
  };

  const handleAdicionarMateria = (e) => {
    e.preventDefault(); 
    if (!novaMateriaNome.trim()) return; 

    const novoItem = {
      id: criarId(novaMateriaNome),
      nome: novaMateriaNome,
    };

    setMaterias(prev => [...prev, novoItem]); 
    setNovaMateriaNome(''); 
  };


  return (
    <section>
      <section className="cabecalho-pagina">
        <div className="titulo">
            <h1>Minhas Matérias</h1>
            <p>Gerencie as matérias que você está estudando.</p>
        </div>
      </section>

      <section className="quadros">
        <aside>
          <section className="quadro-esquerda">
            <h3 className="subtitulo">Adicionar Nova Matéria</h3>
            <form className="form-adicionar" onSubmit={handleAdicionarMateria}>
              <input
                type="text"
                className="dicionario-input" 
                placeholder="Nome da matéria (ex: Álgebra Linear)"
                value={novaMateriaNome}
                onChange={(e) => setNovaMateriaNome(e.target.value)}
              />
              <button type="submit" className="dicionario-botao">
                Adicionar
              </button>
            </form>
          </section>

          <section className="quadro-esquerda">
            <h3 className="subtitulo">Matérias Ativas</h3>
            
            {materias.length === 0 ? (
              <p className="escondido">Você ainda não adicionou nenhuma matéria.</p>
            ) : (
              <ul className="checklist">
                {materias.map(materia => (
                  <Link 
                    key={materia.id} 
                    href={`/materias/${materia.id}`} 
                    className="checklist-item"
                  >
                      <div className="checkbox-placeholder-materia"></div>
                      <span className="materia-nome">{materia.nome}</span>
                  </Link>
                ))}
              </ul>
            )}
            
          </section>
        </aside>

        <aside>
          <section className="quadro-direita">
              <h3 className="subtitulo">Dica</h3>
              <p className="escondido">
                Clique em uma matéria da lista para gerenciar tópicos, provas e exercícios.
              </p>
          </section>
        </aside>

      </section>
    </section>
  );
}