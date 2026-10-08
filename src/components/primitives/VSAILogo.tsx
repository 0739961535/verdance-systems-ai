import { Logo } from "@/components/brand/LogoMark";

/** Back-compat wrapper: the Verdance mark (and optional wordmark). */
export function VSAILogo({ size = 36, className = "", withWordmark = false }: { size?: number; className?: string; withWordmark?: boolean }) {
  return (
    <span className={className}>
      <Logo size={size} wordmark={withWordmark} />
    </span>
  );
}
