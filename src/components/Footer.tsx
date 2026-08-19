import Link from "next/link";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";

export function Footer() {
  return (
    <div className="bg-[#2e6841] p-8 flex flex-col justify-center md:flex-row md:justify-between ">
      <div className="max-w-[200px] text-gray-300 flex flex-col gap-4 mb-4">
        <strong className="text-white">Meu Jardim</strong>
        <p className="text-balance">
          Sua loja especializada em plantas, suculentas, cactos, vasos e muito
          mais para trazer mais verde para sua vida.
        </p>
      </div>
      <div className="text-gray-300 flex flex-col gap-4 mb-4">
        <strong className="text-white">Links Rápidos</strong>
        <ul className="flex flex-col gap-2">
          <Link href="/">
            <li>Início</li>
          </Link>
          <Link href="/plantas">
            <li>Plantas</li>
          </Link>
          <Link href="/vasos">
            <li>Vasos</li>
          </Link>
          <Link href="/sobre">
            <li>Sobre Nós</li>
          </Link>
          <Link href="/contato">
            <li>Contato</li>
          </Link>
        </ul>
      </div>
      <div className="text-gray-300 flex flex-col gap-4 mb-4">
        <strong className="text-white">Categorias</strong>
        <ul className="flex flex-col gap-2">
          <li>Suculentas</li>
          <li>Cactos</li>
          <li>Rosas</li>
          <li>Vasos</li>
          <li>Acessórios</li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-gray-300 mb-4">
        <strong className="text-white">Contato</strong>
        <ul>
          <li className="flex items-center gap-2">
            <FiPhone size={16} color="#34c274" />
            (41) 99820-6785
          </li>
          <li className="flex items-center gap-2">
            <FaRegEnvelope size={16} color="#34c274" />
            contato@meujardim.com
          </li>
        </ul>
      </div>
    </div>
  );
}
