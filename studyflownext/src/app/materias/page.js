import Link from 'next/link';

export default function MateriasPage() {
  const materias = [
    { id: 'calculo-i', nome: 'Cálculo I' },
    { id: 'fisica-basica', nome: 'Física Básica' },
    { id: 'programacao-web', nome: 'Programação Web' },
  ];

  return (
    <section>
      {/* ... (cabeçalho da página) ... */}
      <section className="quadros">
        <aside>
          <section className="quadro-esquerda">
            <h3 className="subtitulo">Matérias Ativas</h3>
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
          </section>
        </aside>
      </section>
    </section>
  );
}