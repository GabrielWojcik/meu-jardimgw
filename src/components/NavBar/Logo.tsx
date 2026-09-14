import Link from "next/link";
import { Sprout } from "lucide-react";

interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white ${
          compact ? "h-9 w-9" : "h-10 w-10"
        }`}
      >
        <Sprout size={compact ? 18 : 20} />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-bold text-emerald-900 ${compact ? "text-base" : "text-lg"}`}
        >
          Meu Jardim
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Cactos e Suculentas
        </span>
      </span>
    </Link>
  );
}
