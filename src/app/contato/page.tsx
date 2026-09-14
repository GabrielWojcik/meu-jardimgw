import Image from "next/image";
import {
  LuLeaf,
  LuMessageCircle,
  LuInstagram,
  LuMail,
  LuClock,
  LuMapPin,
} from "react-icons/lu";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const channels = [
  {
    id: 1,
    icon: LuMessageCircle,
    title: "WhatsApp",
    description: "(41) 99820-6785",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    id: 2,
    icon: LuInstagram,
    title: "Instagram",
    description: "@meujardimgw",
    href: "https://www.instagram.com/meujardimgw/",
  },
  {
    id: 3,
    icon: LuMail,
    title: "Email",
    description: "mmeujardim@gmail.com",
    href: "mailto:mmeujardim@gmail.com",
  },
  {
    id: 4,
    icon: LuClock,
    title: "Horário de atendimento",
    description: "Seg a Sáb, das 9h às 18h",
    href: null,
  },
  {
    id: 5,
    icon: LuMapPin,
    title: "Atendimento",
    description: "Araucária, PR — Atendemos todo o Brasil",
    href: null,
  },
];

export default function Contato() {
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
            <LuLeaf size={20} />
            Fale conosco
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#22432E] mb-6">
            Entre em contato
          </h1>
          <p className="text-[#22432E]/80 text-lg max-w-2xl mx-auto text-balance">
            Tem dúvidas, sugestões ou quer encomendar algo especial? Adoramos
            ouvir você.
          </p>
        </div>
      </section>

      {/* Seção Outros canais */}
      <section className="bg-[#FCFDF8] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2f5e3c] mb-4">
              Nossos canais
            </h2>
            <p className="text-gray-600">
              Fale conosco pelas redes ou diretamente pelo WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const content = (
                <div className="flex items-center gap-4 p-5 bg-[#E4F1DC] rounded-xl h-full">
                  <div className="shrink-0 p-4 rounded-full bg-[#3C6F4D]">
                    <Icon size={24} color="#FFFFFF" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2f5e3c]">
                      {channel.title}
                    </h3>
                    <p className="text-gray-600">{channel.description}</p>
                  </div>
                </div>
              );

              if (!channel.href) {
                return (
                  <div key={channel.id} className="h-full">
                    {content}
                  </div>
                );
              }

              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full hover:opacity-90 transition-opacity duration-200"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
