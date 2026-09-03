import { FiBox } from "react-icons/fi";

export function Requested() {
  return (
    <div className="border border-[#CDE4D6] rounded-md px-6 py-1">
      <div className="py-6">
        <p className="text-2xl font-bold text-[#004D40]">Meus pedidos</p>
        <p className="text-sm">Acompanhe o status dos seus pedidos</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 my-4">
        <FiBox size={48} color="#004D40" />
        <p>Em breve você poderá acompanhar seus pedidos por aqui</p>
      </div>
    </div>
  );
}
