export default function CitiesBar() {
  const cities = [
    "Moreno Valley",
    "Riverside",
    "Ontario",
    "Rancho Cucamonga",
    "San Bernardino",
    "Fontana",
    "Corona",
    "Temecula",
  ];

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#3A3A3A",
          }}
        >
          Serving dental offices across Southern California
        </span>

        {/* City list */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {cities.map((city, i) => (
            <span key={city} style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#5A5A5A",
                  whiteSpace: "nowrap",
                }}
              >
                {city}
              </span>
              {i < cities.length - 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    backgroundColor: "rgba(192,192,192,0.3)",
                    margin: "0 14px",
                    flexShrink: 0,
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
