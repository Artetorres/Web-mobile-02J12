'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function MateriaPage() {
  const params = useParams();
  const materiaId = params.materiaId; 
  

  const formatarId = (id) => {
    if (!id) return '';
    return id
      .split('-') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' ');
  };
  
  const tituloFormatado = formatarId(materiaId);

  return (
    <section>
      <section className="cabecalho-pagina">
        <div className="titulo">
            <h1>{tituloFormatado}</h1>
            <p>Aqui você pode gerenciar os tópicos, exercícios e provas de {tituloFormatado}.</p>
        </div>
      </section>

      <section className="quadros">
        <aside>
          <section className="quadro-esquerda">
              <h3 className="subtitulo">Próximo Tópico</h3>
              <p className="escondido">Funções de Múltiplas Variáveis</p>
          </section>

          <section className="quadro-esquerda">
              <h3 className="subtitulo">Notas e Progresso</h3>
              <p className="escondido">Média atual: 8.5</p>
          </section>
        </aside>

        <aside>
          <section className="quadro-direita">
              <h3 className="subtitulo">Próximas Avaliações</h3>
              <ul className="lista">
                  <li className="lista-item">Prova Final - 15/12</li>
                  <li className="lista-item">Trabalho em Grupo - 01/12</li>
              </ul>
          </section>
        </aside>
      </section>
    </section>
  );
}