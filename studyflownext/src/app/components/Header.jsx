import React from 'react';

export default function Header() {
  return (
    <header className="cabecalho">
      <img src="/logo-triangular.png" alt="logo" />
      <nav className="menu">
        <a href="/">Dashboard</a>
        <a>Minhas Matérias</a>
        <a>Minhas Metas</a>
        <a>Estatisticas</a>
        <a><img src="/usuario-de-perfil.png" alt="Perfil" /></a>
      </nav>
    </header>
  );
}