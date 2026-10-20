/** Line drawings for each sector. Every stroke carries .draw so it can be drawn on with DrawSVG. */
export default function SectorArt({ kind }: { kind: string }) {
  const common = {
    viewBox: "0 0 400 300",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "sector__art",
    "aria-hidden": true,
  };

  switch (kind) {
    case "steel":
      // A bundle of ribbed rebar in perspective.
      return (
        <svg {...common}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <path className="draw" d={`M${30 + i * 14} ${250 - i * 22} L${330 + i * 10} ${70 - i * 8}`} />
              {Array.from({ length: 14 }).map((_, k) => {
                const x = 30 + i * 14 + k * 21.4 + 10;
                const y = 250 - i * 22 - k * ((180 - i * 14) / 14) - 6;
                return <path key={k} className="draw draw--rib" d={`M${x - 3} ${y - 4} l6 8`} />;
              })}
            </g>
          ))}
          <circle className="draw" cx="335" cy="65" r="34" strokeDasharray="2 6" />
        </svg>
      );
    case "realestate":
      return (
        <svg {...common}>
          <path className="draw" d="M20 270 H380" />
          <path className="draw" d="M50 270 V120 H120 V270" />
          <path className="draw" d="M140 270 V50 H230 V270" />
          <path className="draw" d="M250 270 V150 L300 110 L350 150 V270" />
          {[0, 1, 2, 3, 4, 5].map((r) =>
            [0, 1, 2].map((c) => <path key={`${r}-${c}`} className="draw draw--rib" d={`M${155 + c * 25} ${75 + r * 30} h12`} />),
          )}
          {[0, 1, 2, 3].map((r) => <path key={r} className="draw draw--rib" d={`M70 ${145 + r * 30} h30`} />)}
          <path className="draw" d="M285 270 V215 H315 V270" />
          <path className="draw draw--rib" d="M185 50 V25 M185 25 l20 8 l-20 8" />
        </svg>
      );
    case "education":
      return (
        <svg {...common}>
          <path className="draw" d="M200 70 L360 140 L200 210 L40 140 Z" />
          <path className="draw" d="M110 172 V230 C110 255 290 255 290 230 V172" />
          <path className="draw" d="M360 140 V215" />
          <circle className="draw" cx="360" cy="222" r="7" />
          <path className="draw draw--rib" d="M200 110 L300 140" />
          <path className="draw draw--rib" d="M70 60 l10 -20 l10 20 M75 50 h10" />
          <path className="draw draw--rib" d="M310 50 a14 14 0 1 0 0.1 0" />
        </svg>
      );
    case "hospitality":
      return (
        <svg {...common}>
          <circle className="draw" cx="200" cy="140" r="52" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <path
                key={i}
                className="draw draw--rib"
                d={`M${200 + Math.cos(a) * 70} ${140 + Math.sin(a) * 70} L${200 + Math.cos(a) * 92} ${140 + Math.sin(a) * 92}`}
              />
            );
          })}
          {[0, 1, 2].map((i) => (
            <path key={i} className="draw" d={`M20 ${215 + i * 22} q30 -16 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0`} />
          ))}
        </svg>
      );
    case "investment":
      return (
        <svg {...common}>
          <path className="draw" d="M30 270 H380 M30 270 V30" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} className="draw" d={`M${70 + i * 52} 270 V${230 - i * 34} h26 V270`} />
          ))}
          <path className="draw" d="M60 210 L140 170 L200 185 L280 105 L360 60" />
          <path className="draw" d="M330 58 L362 58 L362 90" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path className="draw" d="M200 250 C120 195 60 150 60 95 C60 60 88 35 122 35 C155 35 180 55 200 85 C220 55 245 35 278 35 C312 35 340 60 340 95 C340 150 280 195 200 250 Z" />
          <path className="draw draw--rib" d="M200 250 V285" />
          <path className="draw draw--rib" d="M130 100 C140 80 160 75 175 85" />
          <circle className="draw" cx="200" cy="140" r="118" strokeDasharray="2 7" />
        </svg>
      );
  }
}
