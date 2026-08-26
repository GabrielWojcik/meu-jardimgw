"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export function NavBarMobile() {
  const { data: session } = useSession();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className="flex items-center justify-between mx-4 mb-4 py-4">
      <Link href="/">
        <div>
          <p className="text-3xl text-[#2f5e3c]">Meu Jardim</p>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        <div className="border p-2 border-lime-200 relative rounded-sm">
          <div className="m-1 cursor-pointer">
            {session?.user?.image ? (
              <Link href="/perfil">
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link href="/login">
                <FaRegUser color="#3F6212" size={20} />
              </Link>
            )}
          </div>
        </div>
        <RxHamburgerMenu size={24} onClick={() => setIsOpenMenu(true)} />
      </div>

      {isOpenMenu && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#E4F1DC] text-green-800 z-10">
          <div className="flex justify-end m-4">
            <IoClose size={24} onClick={() => setIsOpenMenu(false)} />
          </div>
          <div className="flex justify-center items-center h-full">
            <ul className="flex flex-col h-full gap-4">
              {session?.user?.name ? (
                <Link href="/perfil">Perfil</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
              <Link href="/">
                <li>Início</li>
              </Link>
              <Link href="/catalogo">
                <li>Plantas</li>
              </Link>
              <Link href="/vasos">
                <li>Vasos</li>
              </Link>
              <Link href="/sobre">
                <li>Sobre</li>
              </Link>
              <Link href="/contato">
                <li>Contato</li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
