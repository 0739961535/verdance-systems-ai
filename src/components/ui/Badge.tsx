type BadgeVariant = "blue" | "teal" | "ghost" | "gold" | "gradient";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  blue: "bg-[rgba(30,143,255,0.12)] text-[#5AAEFF] border border-[rgba(30,143,255,0.25)]",
  teal: "bg-[rgba(0,212,200,0.10)] text-[#00D4C8] border border-[rgba(0,212,200,0.25)]",
  ghost: "bg-[rgba(var(--hairline-rgb),0.05)] text-[#8A9AB0] border border-[rgba(var(--hairline-rgb),0.10)]",
  gold: "bg-[rgba(201,168,76,0.12)] text-[#C9A84C] border border-[rgba(201,168,76,0.25)]",
  gradient:
    "bg-gradient-to-r from-[rgba(30,143,255,0.15)] to-[rgba(0,212,200,0.10)] text-[#E8EDF5] border border-[rgba(0,212,200,0.20)]",
};

const dotClasses: Record<BadgeVariant, string> = {
  blue: "bg-[#1E8FFF]",
  teal: "bg-[#00D4C8]",
  ghost: "bg-[#8A9AB0]",
  gold: "bg-[#C9A84C]",
  gradient: "bg-gradient-to-r from-[#1E8FFF] to-[#00D4C8]",
};

export function Badge({ variant = "blue", children, dot = false, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClasses[variant]} animate-[glow-pulse_2s_ease-in-out_infinite]`}
        />
      )}
      {children}
    </span>
  );
}
