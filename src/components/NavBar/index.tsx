"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export function NavBar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hidden md:flex text-green-800 items-center justify-between mx-8 py-4">
      <Link href="/">
        <div>
          <p className="text-xl font-serif font-bold text-emerald-800 italic">
            Meu Jardim
          </p>
        </div>
      </Link>
      <div>
        <ul className="flex gap-4">
          <Link href="/catalogo">
            <li className="cursor-pointer hover:text-lime-600 transition-colors duration-200">
              Plantas
            </li>
          </Link>
          <Link href="/vasos">
            <li className="cursor-pointer hover:text-lime-600 transition-colors duration-200">
              Vasos
            </li>
          </Link>
          <Link href="/sobre">
            <li className="cursor-pointer hover:text-lime-600 transition-colors duration-200">
              Sobre
            </li>
          </Link>
          <Link href="/contato">
            <li className="cursor-pointer hover:text-lime-600 transition-colors duration-200">
              Contato
            </li>
          </Link>
          {session?.user?.isAdmin && (
            <Link href="/admin/produtos">
              <li className="cursor-pointer hover:text-lime-600 transition-colors duration-200">
                Admin
              </li>
            </Link>
          )}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="cursor-pointer">
          <IoIosSearch size={20} color="#3F6212" />
        </div>
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
        <Link href="/carrinho" aria-label="Ir para o carrinho de compras">
          <div className="border p-2 border-lime-200 relative rounded-sm">
            <div className="w-6 h-6 flex items-center justify-center text-white text-center absolute font-bold -top-2 -right-2 bg-lime-800 rounded-full z-10">
              {mounted ? totalItems : 0}
            </div>
            <div className="m-1 cursor-pointer">
              <FiShoppingBag color="#3F6212" size={20} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
