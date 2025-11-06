import React from 'react';

export default function ProgressBar({ titulo, total, concluidos, cor = "#3b82f6" }) {
  
  // Calcula a porcentagem
  const percentage = total === 0 ? 0 : (concluidos / total) * 100;

  return (
    <div style={{ marginBottom: "16px" }}>
      <p style={{ margin: "0 0 6px", fontWeight: "500" }}>
        {titulo} ({concluidos}/{total})
      </p>
      <div 
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#e5e7eb",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        {/* A barra de preenchimento */}
        <div 
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: cor,
            transition: "width 0.3s ease"
          }}
        />
      </div>
    </div>
  );
}