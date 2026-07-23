interface AmbientGlowProps {
  color?: "blue" | "teal" | "both";
  size?: number;
  x?: string;
  y?: string;
  opacity?: number;
  className?: string;
}

export function AmbientGlow({ color = "blue", size = 600, x = "50%", y = "50%", opacity = 1, className = "" }: AmbientGlowProps) {
  if (color === "both") {
    return (
      <>
        <div
          className={`absolute pointer-events-none rounded-full ${className}`}
          style={{
            width: size, height: size,
            left: x, top: y,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(30,143,255,${0.14 * opacity}) 0%, transparent 70%)`,
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: size * 0.8, height: size * 0.8,
            left: `calc(${x} + ${size * 0.15}px)`, top: `calc(${y} + ${size * 0.05}px)`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(0,212,200,${0.10 * opacity}) 0%, transparent 70%)`,
            filter: "blur(2px)",
          }}
        />
      </>
    );
  }

  const gradientColor = color === "blue" ? `rgba(30,143,255,${0.16 * opacity})` : `rgba(0,212,200,${0.12 * opacity})`;

  return (
    <div
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{
        width: size, height: size,
        left: x, top: y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
        filter: "blur(2px)",
      }}
    />
  );
}
