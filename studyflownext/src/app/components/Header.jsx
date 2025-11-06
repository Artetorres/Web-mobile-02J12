import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="cabecalho">
      <img src="/logo-triangular.png" alt="logo" />
      <nav className="menu">
        <Link href="/">Dashboard</Link>
        <Link href="/materias">Minhas Matérias</Link>
        <a>Minhas Metas</a>
        <a>Estatisticas</a>
        <a><img src="/usuario-de-perfil.png" alt="Perfil" /></a>
      </nav>
    </header>
  );
}