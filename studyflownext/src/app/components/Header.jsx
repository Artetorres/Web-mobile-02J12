import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="cabecalho">
      <Link href="/">
        <img src="/Logo.png" alt="StudyFlow Logo" className="header-logo" />
      </Link>
      
      <nav className="menu">
        <Link href="/">Dashboard</Link>
        <Link href="/materias">Minhas Matérias</Link>
        <a className="perfil-link">
          <img src="/Perfil.png" alt="Perfil" className="perfil-icone" />
        </a>
      </nav>
    </header>
  );
}