import Image from "next/image";
import Link from "next/link";
import { LuSprout, LuHeart, LuLeaf, LuFlower2, LuGift } from "react-icons/lu";

const values = [
  {
    id: 1,
    icon: LuHeart,
    title: "Feito com carinho",
    description: "Cada peça é criada com atenção aos detalhes e muito afeto.",
  },
  {
    id: 2,
    icon: LuLeaf,
    title: "Natureza viva",
    description: "Levamos um pedacinho de verde para cada cantinho.",
  },
  {
    id: 3,
    icon: LuFlower2,
    title: "Artesanal",
    description: "Produção própria, feita à mão com dedicação.",
  },
  {
    id: 4,
    icon: LuGift,
    title: "Para celebrar",
    description: "Presentes, decoração e lembrancinhas para momentos especiais.",
  },
];

export default function Sobre() {
  return (
    <div>
      {/* Seção Hero */}
      <section className="relative bg-[#E3F2D3] overflow-hidden">
        <Image
          src="/images/about/fundo-sobre.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="relative container mx-auto px-6 py-20 md:py-28 text-center">
          <p className="flex items-center justify-center gap-2 text-[#22432E]/80 font-medium mb-4">
            <LuSprout size={20} />
            Nossa história
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#22432E] mb-6">
            Onde tudo começou
          </h1>
          <p className="text-[#22432E]/80 text-lg max-w-2xl mx-auto text-balance">
            Em 2020, na garagem de casa, começava a história do Meu Jardim.
          </p>
        </div>
      </section>

      {/* Seção Nossa trajetória */}
      <section className="bg-[#F8FBF6] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-6 text-gray-600 text-lg leading-relaxed">
            <p>
              O que nasceu como uma produção artesanal de vasos e arranjos foi
              crescendo pouco a pouco, sempre mantendo a essência que nos trouxe
              até aqui: fazer tudo com carinho, cuidado e atenção aos detalhes.
            </p>
            <p>
              Começamos criando vasos com suculentas e cactos e, com o tempo,
              ampliamos nosso trabalho para buquês, vasos personalizados e
              lembrancinhas para eventos.
            </p>
            <p>
              Cada criação do Meu Jardim é feita para levar um pedacinho de
              natureza, beleza e carinho para a vida de alguém — seja em um
              presente, na decoração de um ambiente ou em uma celebração
              especial.
            </p>
            <p className="font-serif text-2xl md:text-3xl font-bold text-[#3C6F4D] mt-4">
              Do nosso jardim para o seu. 🌱
            </p>
          </div>
        </div>
      </section>

      {/* Seção O que nos move */}
      <section className="bg-[#E4F1DC] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2f5e3c] text-center mb-12">
            O que nos move
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.id}
                  className="flex flex-col items-center text-center gap-4 px-6 py-8 bg-[#FCFDF8] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out h-full"
                >
                  <div className="p-3 rounded-full bg-[#EDF3E6]">
                    <Icon size={24} color="#3C6F4D" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2f5e3c]">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção Chamada para o catálogo */}
      <section className="bg-[#F8FBF6] py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3C6F4D] mb-4">
            Que tal levar um pouco de verde para casa?
          </h2>
          <p className="text-gray-600 mb-8 text-balance">
            Conheça nossas suculentas, cactos, vasos e buquês feitos com carinho.
          </p>
          <Link href="/catalogo">
            <button className="bg-[#3C6F4D] text-white py-3 px-10 rounded-full font-medium cursor-pointer hover:bg-[#2f5e3c] transition-colors duration-200">
              Ver catálogo
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
