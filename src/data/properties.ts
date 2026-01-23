import property1 from '@/assets/casa-destaque.jpg';
import property2 from '@/assets/imovel-2.jpg';
import property3 from '@/assets/imovel-3.jpg';
import property4 from '@/assets/imovel-4.jpg';
import property5 from '@/assets/imovel-5.jpg';
import property6 from '@/assets/imovel-6.jpg';

export interface Property {
  id: string;
  slug: string;
  name: string;
  neighborhood: string;
  city: string;
  priceRange: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  parkingSpots: number;
  status: 'lancamento' | 'em-obras' | 'pronto';
  description: string;
  shortDescription: string;
  features: string[];
  images: string[];
  location: {
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  constructionCompany: string;
  deliveryDate: string;
}

export const properties: Property[] = [
  {
    id: '1',
    slug: 'residencial-vista-mar',
    name: 'Residencial Vista Mar',
    neighborhood: 'Barra da Tijuca',
    city: 'Rio de Janeiro',
    priceRange: 'A partir de R$ 650.000',
    bedrooms: 3,
    bathrooms: 2,
    area: '85m² a 120m²',
    parkingSpots: 2,
    status: 'lancamento',
    description: 'O Residencial Vista Mar é o mais novo empreendimento da região, oferecendo apartamentos com acabamento premium e vista privilegiada para o mar. Com infraestrutura completa de lazer e localização estratégica, é a escolha perfeita para quem busca qualidade de vida.',
    shortDescription: 'Apartamentos com vista para o mar e acabamento premium.',
    features: [
      'Piscina adulto e infantil',
      'Academia equipada',
      'Salão de festas',
      'Playground',
      'Churrasqueira',
      'Portaria 24h',
      'Bicicletário',
      'Pet place'
    ],
    images: [property1, property1, property1],
    location: {
      address: 'Av. das Américas, 12000 - Barra da Tijuca, Rio de Janeiro - RJ'
    },
    constructionCompany: 'Construtora Premium',
    deliveryDate: 'Dezembro/2026'
  },
  {
    id: '2',
    slug: 'jardins-residence',
    name: 'Jardins Residence',
    neighborhood: 'Recreio dos Bandeirantes',
    city: 'Rio de Janeiro',
    priceRange: 'A partir de R$ 420.000',
    bedrooms: 2,
    bathrooms: 1,
    area: '55m² a 75m²',
    parkingSpots: 1,
    status: 'em-obras',
    description: 'O Jardins Residence combina modernidade e natureza em um só lugar. Com apartamentos funcionais e áreas verdes exuberantes, é ideal para famílias que buscam tranquilidade sem abrir mão da praticidade.',
    shortDescription: 'Modernidade e natureza em perfeita harmonia.',
    features: [
      'Área verde preservada',
      'Piscina com deck',
      'Espaço gourmet',
      'Playground',
      'Quadra poliesportiva',
      'Portaria 24h'
    ],
    images: [property2, property2, property2],
    location: {
      address: 'Rua das Palmeiras, 500 - Recreio dos Bandeirantes, Rio de Janeiro - RJ'
    },
    constructionCompany: 'Construtora Jardins',
    deliveryDate: 'Junho/2025'
  },
  {
    id: '3',
    slug: 'parque-das-aguas',
    name: 'Parque das Águas',
    neighborhood: 'Jacarepaguá',
    city: 'Rio de Janeiro',
    priceRange: 'A partir de R$ 280.000',
    bedrooms: 2,
    bathrooms: 1,
    area: '45m² a 60m²',
    parkingSpots: 1,
    status: 'pronto',
    description: 'Pronto para morar! O Parque das Águas oferece a oportunidade de sair do aluguel com condições especiais. Apartamentos novos com infraestrutura completa em uma das regiões que mais cresce no Rio.',
    shortDescription: 'Pronto para morar com condições especiais de pagamento.',
    features: [
      'Piscina',
      'Salão de jogos',
      'Academia',
      'Portaria 24h',
      'Varanda gourmet',
      'Espaço kids'
    ],
    images: [property3, property3, property3],
    location: {
      address: 'Estrada do Gabinal, 800 - Jacarepaguá, Rio de Janeiro - RJ'
    },
    constructionCompany: 'Construtora Aqua',
    deliveryDate: 'Pronto para morar'
  },
  {
    id: '4',
    slug: 'torre-elegance',
    name: 'Torre Elegance',
    neighborhood: 'Tijuca',
    city: 'Rio de Janeiro',
    priceRange: 'A partir de R$ 520.000',
    bedrooms: 3,
    bathrooms: 2,
    area: '80m² a 110m²',
    parkingSpots: 2,
    status: 'lancamento',
    description: 'Sofisticação e tradição se encontram na Torre Elegance. Localizado em um dos bairros mais tradicionais do Rio, oferece apartamentos amplos com acabamento de alto padrão e fácil acesso a toda cidade.',
    shortDescription: 'Sofisticação no coração da Tijuca.',
    features: [
      'Hall de entrada decorado',
      'Piscina aquecida',
      'Spa com sauna',
      'Salão de festas gourmet',
      'Home office compartilhado',
      'Portaria blindada'
    ],
    images: [property4, property4, property4],
    location: {
      address: 'Rua Conde de Bonfim, 1200 - Tijuca, Rio de Janeiro - RJ'
    },
    constructionCompany: 'Construtora Elite',
    deliveryDate: 'Março/2027'
  },
  {
    id: '5',
    slug: 'solar-do-campo',
    name: 'Solar do Campo',
    neighborhood: 'Campo Grande',
    city: 'Rio de Janeiro',
    priceRange: 'A partir de R$ 195.000',
    bedrooms: 2,
    bathrooms: 1,
    area: '42m² a 55m²',
    parkingSpots: 1,
    status: 'em-obras',
    description: 'O Solar do Campo é a oportunidade de realizar o sonho da casa própria com parcelas que cabem no seu bolso. Com financiamento facilitado e entrada parcelada, saia do aluguel e invista no seu futuro.',
    shortDescription: 'Seu sonho ao alcance do seu bolso.',
    features: [
      'Condomínio fechado',
      'Playground',
      'Salão de festas',
      'Portaria 24h',
      'Vaga coberta'
    ],
    images: [property5, property5, property5],
    location: {
      address: 'Av. Santa Cruz, 4500 - Campo Grande, Rio de Janeiro - RJ'
    },
    constructionCompany: 'Construtora Popular',
    deliveryDate: 'Setembro/2025'
  },
  {
    id: '6',
    slug: 'natura-garden',
    name: 'Natura Garden',
    neighborhood: 'Vargem Grande',
    city: 'Rio de Janeiro',
    priceRange: 'A partir de R$ 380.000',
    bedrooms: 2,
    bathrooms: 2,
    area: '60m² a 85m²',
    parkingSpots: 1,
    status: 'lancamento',
    description: 'Viva cercado de natureza no Natura Garden. Empreendimento sustentável com captação de água da chuva, painéis solares nas áreas comuns e muito verde. O melhor para quem valoriza qualidade de vida e sustentabilidade.',
    shortDescription: 'Viva em harmonia com a natureza.',
    features: [
      'Projeto sustentável',
      'Horta comunitária',
      'Trilha ecológica',
      'Piscina natural',
      'Espaço zen',
      'Bicicletário',
      'Carregador para carros elétricos'
    ],
    images: [property6, property6, property6],
    location: {
      address: 'Estrada dos Bandeirantes, 22000 - Vargem Grande, Rio de Janeiro - RJ'
    },
    constructionCompany: 'Construtora Verde',
    deliveryDate: 'Dezembro/2026'
  }
];

export const getPropertyBySlug = (slug: string): Property | undefined => {
  return properties.find(p => p.slug === slug);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.slice(0, 3);
};