"use client";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import { GoGear } from "react-icons/go";

import { Favorites } from "./components/favorites";
import { Requested } from "./components/requested";

export default function Perfil() {
  const { data: session } = useSession();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Pedidos",
      children: <Requested />,
    },
    {
      key: "2",
      label: "Favoritos",
      children: <Favorites />,
    },
    {
      key: "3",
      label: "Endereços",
      children: "Endereços",
    },
    {
      key: "4",
      label: "Configurações",
      children: "Configurações",
    },
  ];

  return (
    <div className="p-4 h-screen flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {session?.user?.image && (
          <div className="flex items-center gap-2">
            <Image
              src={session.user.image}
              alt="Foto do usuário"
              width={64}
              height={64}
              className="rounded-full"
            />
            <p className="text-2xl text-[#23432F]">
              {session?.user?.name ?? "Nome não disponível"}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3 md:flex-row">
          <button
            className="border border-[#CDE4D6] py-2 px-4 rounded-md flex gap-2 items-center text-[#23432F] cursor-pointer 
             hover:bg-[#CDE4D6] transition-colors duration-200"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <CiLogout color="#23432F" />
            <span>Sair</span>
          </button>

          <button
            className="border border-[#CDE4D6] py-2 px-4 rounded-md flex gap-2 items-center text-[#23432F] cursor-pointer
             hover:bg-[#CDE4D6] transition-colors duration-200"
            onClick={() => console.log("Editar Perfil")}
          >
            <GoGear color="#23432F" />
            <span>Editar Perfil</span>
          </button>
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}
