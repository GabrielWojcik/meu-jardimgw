import type { StaticImageData } from "next/image";

import vaso1 from "../images/flower/vaso-1.png";
import vaso2 from "../images/flower/vaso-2.png";
import vaso3 from "../images/flower/vaso-3.png";

interface PotProps {
  id: number;
  slug: string;
  image: StaticImageData;
  title: string;
  description: string;
  price: number;
  light: string;
  water: string;
  size: string;
  stock: number;
  href: string;
  category: string;
}

export const potMocks: PotProps[] = [
  {
    id: 101,
    slug: "vaso-ceramica-esmaltado",
    image: vaso1,
    title: "Vaso Cerâmica Esmaltado",
    description:
      "Acabamento esmaltado brilhante que valoriza qualquer planta em ambientes internos.",
    price: 74.9,
    light: "Uso Interno",
    water: "Com furo de drenagem",
    size: "16cm x 18cm",
    stock: 9,
    href: "/vasos",
    category: "Cerâmica",
  },
  {
    id: 102,
    slug: "vaso-cimento-queimado",
    image: vaso2,
    title: "Vaso Cimento Queimado",
    description:
      "Estilo industrial e muito resistente, ideal para varandas e áreas externas.",
    price: 129.9,
    light: "Interno/Externo",
    water: "Com furo de drenagem",
    size: "24cm x 26cm",
    stock: 4,
    href: "/vasos",
    category: "Cimento",
  },
  {
    id: 103,
    slug: "vaso-barro-rustico",
    image: vaso3,
    title: "Vaso de Barro Rústico",
    description:
      "Barro natural poroso que ajuda a regular a umidade do substrato.",
    price: 49.9,
    light: "Interno/Externo",
    water: "Com furo de drenagem",
    size: "14cm x 15cm",
    stock: 18,
    href: "/vasos",
    category: "Barro",
  },
  {
    id: 104,
    slug: "vaso-fibra-vidro-grande",
    image: vaso2,
    title: "Vaso Fibra de Vidro Grande",
    description:
      "Leve, durável e à prova de intempéries, perfeito para plantas de grande porte.",
    price: 289.9,
    light: "Interno/Externo",
    water: "Com furo de drenagem",
    size: "45cm x 50cm",
    stock: 2,
    href: "/vasos",
    category: "Fibra de Vidro",
  },
  {
    id: 105,
    slug: "cachepot-ceramica-minimalista",
    image: vaso1,
    title: "Cachepô Cerâmica Minimalista",
    description:
      "Linhas limpas em tom neutro, combina com qualquer decoração de interiores.",
    price: 89.9,
    light: "Uso Interno",
    water: "Sem furo (cachepô)",
    size: "18cm x 20cm",
    stock: 11,
    href: "/vasos",
    category: "Cerâmica",
  },
  {
    id: 106,
    slug: "vaso-barro-terracota",
    image: vaso3,
    title: "Vaso Terracota Clássico",
    description:
      "O clássico terracota que nunca sai de moda, ótimo para suculentas e cactos.",
    price: 39.9,
    light: "Interno/Externo",
    water: "Com furo de drenagem",
    size: "12cm x 12cm",
    stock: 25,
    href: "/vasos",
    category: "Barro",
  },
  {
    id: 107,
    slug: "vaso-cimento-trio",
    image: vaso1,
    title: "Trio de Vasos de Cimento",
    description:
      "Conjunto com três tamanhos para compor prateleiras e mesas de apoio.",
    price: 159.9,
    light: "Uso Interno",
    water: "Com furo de drenagem",
    size: "8cm, 11cm e 14cm",
    stock: 6,
    href: "/vasos",
    category: "Cimento",
  },
  {
    id: 108,
    slug: "vaso-fibra-vidro-autoirrigavel",
    image: vaso2,
    title: "Vaso Autoirrigável Fibra",
    description:
      "Reservatório interno que mantém o substrato úmido por mais tempo.",
    price: 199.9,
    light: "Interno/Externo",
    water: "Reservatório autoirrigável",
    size: "30cm x 32cm",
    stock: 7,
    href: "/vasos",
    category: "Fibra de Vidro",
  },
];
