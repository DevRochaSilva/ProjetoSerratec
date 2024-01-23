function StatusDisplay({ status }) {
  function handleColorStatus(value) {
    if (value === "Atenção") return "var(--amarelo-atencao)";
    if (value === "Sucesso") return "var(--verde-sucesso)";
    if (value === "Perigo") return "var(--vermelho-perigo)";
  }

  return (
    <div
      title={status}
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: handleColorStatus(status),
      }}
    ></div>
  );
}

export default StatusDisplay;
