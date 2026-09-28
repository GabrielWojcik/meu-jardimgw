import { Button } from "antd";
import type { ButtonProps } from "antd";

/** Botão de ação primária padrão do painel admin (verde, arredondado, mais respiro interno) */
export function AdminButton({ className = "", type = "primary", size = "small", ...props }: ButtonProps) {
  return (
    <Button
      type={type}
      size={size}
      className={`!bg-[#2f5e3c] hover:!bg-[#254a30] !rounded-full !px-5 !py-4 ${className}`}
      {...props}
    />
  );
}
