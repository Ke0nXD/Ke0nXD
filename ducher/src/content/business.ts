/**
 * ============================================================================
 * DU'CHER — FONTE ÚNICA DE VERDADE DO CONTEÚDO
 * ============================================================================
 *
 * Todo o site é gerado a partir deste arquivo. Para publicar, edite APENAS aqui.
 *
 * ⚠️  STATUS DE VERIFICAÇÃO DOS DADOS
 *
 * O ambiente de build não teve acesso de rede ao Instagram (@ducheroficial)
 * nem ao Google Maps — a política de egresso do contêiner bloqueia esses hosts
 * (403 no CONNECT). Portanto NADA aqui foi confirmado na fonte primária.
 *
 * Cada bloco abaixo está marcado com um destes selos:
 *
 *   [INDÍCIO]      Veio de busca web indireta. Plausível, NÃO confirmado.
 *   [PLACEHOLDER]  Inventado para dar forma ao layout. TROQUE ANTES DE PUBLICAR.
 *   [ESTRUTURAL]   Texto de marca/UX que funciona independente dos dados.
 *
 * Antes do deploy, percorra as ocorrências de PLACEHOLDER e INDÍCIO.
 * ============================================================================
 */

import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  Waves,
  Dumbbell,
  Moon,
  Gift,
  HeartHandshake,
  Ruler,
  ShieldCheck,
  Truck,
  Star,
  Store,
  Recycle,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* IDENTIDADE                                                                  */
/* -------------------------------------------------------------------------- */

export const brand = {
  /** [INDÍCIO] Grafia observada no handle/nome público: DU'CHER (@ducheroficial). */
  name: "DU'CHER",
  legalName: "DU'CHER",
  /** [ESTRUTURAL] */
  tagline: 'Lingerie, praia e fitness',
  slogan: 'A peça certa muda o jeito que você se olha.',
  shortDescription:
    'Curadoria de lingerie, moda praia e moda fitness com atendimento consultivo — para você sair da loja vestindo o tamanho certo, não o tamanho disponível.',
  /** [PLACEHOLDER] Trocar pelo domínio real antes do deploy. */
  siteUrl: 'https://ducher.com.br',
  /** [ESTRUTURAL] Ano de fundação — confirmar. */
  foundedYear: 2021,
} as const;

/* -------------------------------------------------------------------------- */
/* CONTATO                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ [PLACEHOLDER] TODOS os campos abaixo são fictícios.
 * O número de WhatsApp NÃO é real — substitua antes de publicar, senão os
 * botões de conversão levam a lugar nenhum.
 *
 * Formato do whatsapp: apenas dígitos, com DDI 55 + DDD + número.
 */
export const contact = {
  whatsapp: '5537900000000',
  phoneDisplay: '(37) 90000-0000',
  phoneHref: '+5537900000000',
  email: 'contato@ducher.com.br',
  instagram: 'https://www.instagram.com/ducheroficial/',
  instagramHandle: '@ducheroficial',
  address: {
    street: 'Avenida Brasil, 600',
    district: 'Centro',
    city: 'Lagoa da Prata',
    state: 'MG',
    postalCode: '35590-000',
    country: 'BR',
    /** [PLACEHOLDER] Coordenadas aproximadas do centro de Lagoa da Prata/MG. */
    lat: -20.0281,
    lng: -45.5461,
  },
  /** Link de rota — funciona com o endereço em texto, sem precisar de API key. */
  get mapsDirectionsUrl() {
    const q = encodeURIComponent(
      `${this.address.street}, ${this.address.district}, ${this.address.city} - ${this.address.state}`
    );
    return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  },
  get mapsEmbedUrl() {
    const q = encodeURIComponent(
      `${this.address.street}, ${this.address.district}, ${this.address.city} - ${this.address.state}`
    );
    return `https://www.google.com/maps?q=${q}&output=embed`;
  },
  get fullAddress() {
    return `${this.address.street} — ${this.address.district}, ${this.address.city}/${this.address.state}`;
  },
};

/** [PLACEHOLDER] Horários fictícios. Confirmar no Google Meu Negócio. */
export const openingHours = [
  { label: 'Segunda a sexta', value: '09h00 — 18h00', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '09:00', closes: '18:00' },
  { label: 'Sábado', value: '09h00 — 13h00', days: ['Sa'], opens: '09:00', closes: '13:00' },
  { label: 'Domingo', value: 'Fechado', days: ['Su'], opens: null, closes: null },
] as const;

/* -------------------------------------------------------------------------- */
/* NAVEGAÇÃO                                                                   */
/* -------------------------------------------------------------------------- */

export const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Coleções', href: '#colecoes' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Atendimento', href: '#atendimento' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato' },
] as const;

/* -------------------------------------------------------------------------- */
/* SOBRE                                                                       */
/* -------------------------------------------------------------------------- */

/** [ESTRUTURAL] Narrativa de marca — ajustar aos fatos reais da loja. */
export const about = {
  eyebrow: 'Quem somos',
  title: 'Uma loja construída em cima de uma pergunta simples: serve mesmo?',
  paragraphs: [
    'A DU\'CHER nasceu no centro de Lagoa da Prata a partir de um incômodo que quase toda mulher conhece: sair da loja com uma peça bonita que, em casa, não serve. Alça que marca, bojo que sobra, elástico que aperta no lugar errado.',
    'Por isso o atendimento aqui começa pela medida, não pela arara. A gente entende o que você procura, mede quando faz sentido, e traz para o provador só o que tem chance real de funcionar no seu corpo — em vez de empurrar a peça que precisa sair do estoque.',
    'Trabalhamos com lingerie, moda praia e moda fitness de marcas selecionadas, com um recorte de grades que cobre do PP ao plus size. O resultado é o que a gente ouve com mais frequência no balcão: "nunca tinha achado um que servisse".',
  ],
  mission: {
    title: 'Missão',
    text: 'Fazer com que cada cliente saia vestindo o tamanho certo — com conforto, caimento e a segurança de quem se sente bem no próprio corpo.',
  },
  values: {
    title: 'Valores',
    text: 'Acolhimento sem julgamento, honestidade sobre o que serve e o que não serve, e respeito por todos os corpos que entram pela porta.',
  },
  vision: {
    title: 'Como trabalhamos',
    text: 'Curadoria criteriosa, provador reservado, orientação de caimento e pós-venda que atende de verdade quando algo precisa ser trocado.',
  },
  stats: [
    { value: '2021', label: 'Desde', hint: '[INDÍCIO] confirmar ano' },
    { value: 'PP–G4', label: 'Grade completa', hint: '[PLACEHOLDER]' },
    { value: '100%', label: 'Prova antes de levar', hint: '[ESTRUTURAL]' },
    { value: '7 dias', label: 'Troca facilitada', hint: '[PLACEHOLDER]' },
  ],
};

/* -------------------------------------------------------------------------- */
/* COLEÇÕES / SERVIÇOS                                                         */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

/** [INDÍCIO] Segmento (lingerie/praia/fitness) inferido de busca web. Confirmar. */
export const services: Service[] = [
  {
    slug: 'lingerie',
    icon: Sparkles,
    title: 'Lingerie',
    description:
      'Conjuntos, sutiãs e calcinhas escolhidos por caimento antes de estampa. Do primeiro sutiã ao modelo de sustentação, com orientação de medida real.',
    bullets: ['Conjuntos e peças avulsas', 'Sutiãs com e sem bojo', 'Modelagens de sustentação'],
    image: '/images/colecoes/lingerie.svg',
    imageAlt: "Composição de lingerie da DU'CHER em tons neutros",
  },
  {
    slug: 'moda-praia',
    icon: Waves,
    title: 'Moda praia',
    description:
      'Biquínis, maiôs e saídas pensados para quem quer entrar na água sem ficar ajustando a peça o tempo inteiro. Top e calcinha vendidos separados.',
    bullets: ['Biquínis com tamanhos avulsos', 'Maiôs e body', 'Saídas e kaftans'],
    image: '/images/colecoes/moda-praia.svg',
    imageAlt: "Peças de moda praia da DU'CHER",
  },
  {
    slug: 'moda-fitness',
    icon: Dumbbell,
    title: 'Moda fitness',
    description:
      'Tops com sustentação de verdade, leggings que não ficam transparentes no agachamento e tecidos que aguentam treino, suor e máquina de lavar.',
    bullets: ['Tops de alto impacto', 'Leggings sem transparência', 'Conjuntos e macaquinhos'],
    image: '/images/colecoes/moda-fitness.svg',
    imageAlt: "Conjunto de moda fitness da DU'CHER",
  },
  {
    slug: 'pijamas',
    icon: Moon,
    title: 'Pijamas & homewear',
    description:
      'Camisolas, conjuntos e peças de dormir em algodão e viscose — o tipo de conforto que você não quer tirar no fim de semana.',
    bullets: ['Camisolas e robes', 'Conjuntos de inverno e verão', 'Homewear do dia a dia'],
    image: '/images/colecoes/pijamas.svg',
    imageAlt: "Pijamas e homewear da DU'CHER",
  },
  {
    slug: 'consultoria',
    icon: Ruler,
    title: 'Consultoria de caimento',
    description:
      'Atendimento individual para descobrir seu tamanho real de sutiã e as modelagens que funcionam no seu corpo. Sem custo, com hora marcada.',
    bullets: ['Medição orientada', 'Teste de modelagens', 'Indicação por tipo de corpo'],
    image: '/images/colecoes/consultoria.svg',
    imageAlt: 'Atendimento consultivo de caimento',
  },
  {
    slug: 'presentes',
    icon: Gift,
    title: 'Presentes & kits',
    description:
      'Montagem de kits com embalagem pronta para presente, e vale-troca para quem tem medo de errar o tamanho de quem vai receber.',
    bullets: ['Kits montados na hora', 'Embalagem para presente', 'Vale-troca sem burocracia'],
    image: '/images/colecoes/presentes.svg',
    imageAlt: "Kit presente embalado da DU'CHER",
  },
];

/* -------------------------------------------------------------------------- */
/* DIFERENCIAIS                                                                */
/* -------------------------------------------------------------------------- */

export const differentials: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: HeartHandshake,
    title: 'Atendimento sem julgamento',
    text: 'Provador reservado, tempo para experimentar e uma pessoa por perto só quando você quiser. Nenhum corpo aqui é corpo errado.',
  },
  {
    icon: Ruler,
    title: 'Medida antes da venda',
    text: 'A gente confere seu tamanho real em vez de chutar pelo que você usava antes. É a diferença entre uma peça que serve e uma que fica na gaveta.',
  },
  {
    icon: Star,
    title: 'Curadoria, não catálogo',
    text: 'Compramos pouco e bem. Cada modelagem que entra na loja foi testada antes de virar estoque.',
  },
  {
    icon: Recycle,
    title: 'Troca descomplicada',
    text: 'Errou o tamanho? Volta aqui que a gente resolve — sem interrogatório e sem letra miúda.',
  },
  {
    icon: Truck,
    title: 'Entrega na região',
    text: 'Entrega em Lagoa da Prata e cidades vizinhas, e envio para o resto do Brasil quando você não puder vir até a loja.',
  },
  {
    icon: ShieldCheck,
    title: 'Peças com procedência',
    text: 'Trabalhamos com fornecedores conhecidos e assumimos defeito de fabricação. Nada de peça que descose na segunda lavagem.',
  },
];

/* -------------------------------------------------------------------------- */
/* GALERIA                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * [PLACEHOLDER] Substituir por fotos reais do Instagram @ducheroficial.
 * Coloque os arquivos em /public/images/galeria/ e atualize `src` + `alt`.
 * Mantenha `width`/`height` reais para evitar layout shift (CLS).
 */
export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export const gallery: GalleryItem[] = [
  { src: '/images/galeria/01.svg', alt: 'Vitrine da loja com peças da coleção de verão', width: 900, height: 1200, caption: 'Vitrine de verão' },
  { src: '/images/galeria/02.svg', alt: 'Detalhe de renda em conjunto de lingerie', width: 900, height: 900, caption: 'Detalhe em renda' },
  { src: '/images/galeria/03.svg', alt: 'Conjunto de moda fitness em tom terracota', width: 900, height: 1350, caption: 'Linha fitness' },
  { src: '/images/galeria/04.svg', alt: 'Biquíni de tricô sobre fundo claro', width: 900, height: 1100, caption: 'Moda praia' },
  { src: '/images/galeria/05.svg', alt: 'Ambiente interno da loja com araras organizadas', width: 900, height: 700, caption: 'Nossa loja' },
  { src: '/images/galeria/06.svg', alt: 'Kit presente com embalagem personalizada', width: 900, height: 1200, caption: 'Kit presente' },
  { src: '/images/galeria/07.svg', alt: 'Camisola de algodão dobrada sobre mesa de madeira', width: 900, height: 900, caption: 'Homewear' },
  { src: '/images/galeria/08.svg', alt: 'Provador com iluminação suave', width: 900, height: 1300, caption: 'Provador' },
  { src: '/images/galeria/09.svg', alt: 'Composição de peças da nova coleção', width: 900, height: 1000, caption: 'Nova coleção' },
];

/* -------------------------------------------------------------------------- */
/* DEPOIMENTOS                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ [PLACEHOLDER] ESTES DEPOIMENTOS SÃO FICTÍCIOS.
 *
 * Não foi possível ler as avaliações reais do Google Maps neste ambiente.
 * Publicar avaliação inventada como se fosse real é propaganda enganosa —
 * substitua por avaliações reais (com autorização) ANTES de colocar no ar,
 * ou remova a seção do `page.tsx`.
 *
 * Para cada avaliação real, copie: nome, nota, texto e data do Google.
 */
export const testimonialsArePlaceholder = true;

export type Testimonial = {
  name: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  source: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Ana Carolina M.',
    initials: 'AC',
    rating: 5,
    text: 'Fui pedir ajuda porque nunca achava sutiã que servisse. Descobri que usava dois números errados a vida inteira. Saí com dois conjuntos e a sensação de que finalmente alguém entendeu.',
    date: 'há 2 meses',
    source: 'Google',
  },
  {
    name: 'Juliana P.',
    initials: 'JP',
    rating: 5,
    text: 'Atendimento tranquilo, sem aquela pressão de vendedora em cima. Me deixaram provar com calma e ainda trocaram uma peça depois sem complicação nenhuma.',
    date: 'há 4 meses',
    source: 'Google',
  },
  {
    name: 'Fernanda S.',
    initials: 'FS',
    rating: 5,
    text: 'Comprei legging para treinar e é a primeira que não fica transparente no agachamento. Já voltei três vezes. Qualidade muito acima do que eu esperava para o preço.',
    date: 'há 1 mês',
    source: 'Google',
  },
  {
    name: 'Mariana L.',
    initials: 'ML',
    rating: 5,
    text: 'Precisava de um presente de última hora e montaram um kit lindo na hora, embalado e com vale-troca. Salvaram meu aniversário de casamento.',
    date: 'há 6 meses',
    source: 'Google',
  },
  {
    name: 'Patrícia R.',
    initials: 'PR',
    rating: 5,
    text: 'Sou plus size e sempre sofri para achar biquíni bonito no meu tamanho. Aqui achei três que eu gostei de verdade. Voltarei sempre.',
    date: 'há 3 meses',
    source: 'Google',
  },
];

/** [PLACEHOLDER] Ajustar para a nota e o total reais do Google. */
export const googleRating = {
  value: 5.0,
  count: 42,
  url: 'https://maps.app.goo.gl/9eWZ1zg37wucRaLBA',
};

/* -------------------------------------------------------------------------- */
/* PROCESSO                                                                    */
/* -------------------------------------------------------------------------- */

export const processSteps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: HeartHandshake,
    title: 'Contato',
    text: 'Você chama no WhatsApp ou passa na loja. Conta o que procura — ou só diz que não faz ideia, também funciona.',
  },
  {
    icon: Ruler,
    title: 'Curadoria',
    text: 'A gente confere sua medida e separa as modelagens com chance real de servir, dentro do que você quer gastar.',
  },
  {
    icon: Store,
    title: 'Prova e ajuste',
    text: 'Provador reservado, sem pressa. Se nada agradar, você sai sem levar nada e sem constrangimento.',
  },
  {
    icon: Gift,
    title: 'Entrega',
    text: 'Leva na hora, recebe em casa ou retira depois. Com embalagem de presente, se for o caso.',
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faq: { question: string; answer: string }[] = [
  {
    question: 'Preciso saber meu tamanho antes de ir?',
    answer:
      'Não. A maior parte das clientes chega achando que usa um número e sai usando outro. A gente confere a medida na loja, sem custo e sem compromisso de compra.',
  },
  {
    question: 'Vocês têm tamanhos plus size?',
    answer:
      'Sim. Trabalhamos com grade ampliada em lingerie, moda praia e fitness. Se a peça que você quiser não estiver no seu tamanho em estoque, encomendamos com o fornecedor.',
  },
  {
    question: 'Dá para trocar se não servir?',
    answer:
      'Dá. Peças sem uso, com etiqueta e comprovante podem ser trocadas em até 7 dias. Por questão de higiene, calcinhas e biquínis (parte de baixo) não são trocados — por isso insistimos tanto na prova antes.',
  },
  {
    question: 'É possível comprar sem ir até a loja?',
    answer:
      'Sim. Atendemos por WhatsApp com fotos e vídeos das peças, tiramos dúvidas de medida por lá e enviamos para a sua casa. Em Lagoa da Prata a entrega é local; para outras cidades, enviamos pelos Correios ou transportadora.',
  },
  {
    question: 'Quais formas de pagamento vocês aceitam?',
    answer:
      'Pix, dinheiro, débito e crédito parcelado. As condições de parcelamento a gente combina no atendimento, conforme o valor da compra.',
  },
  {
    question: 'Consigo atendimento reservado, fora do movimento?',
    answer:
      'Consegue. Agende pelo WhatsApp e reservamos um horário com provador livre e atendimento exclusivo — útil para quem quer mais privacidade ou vai montar um enxoval.',
  },
  {
    question: 'Vocês montam presentes?',
    answer:
      'Montamos. Escolhemos as peças com você (ou por conta própria, se você preferir surpresa), embalamos para presente e mandamos junto um vale-troca — assim quem recebe pode ajustar o tamanho sem constrangimento.',
  },
];

/* -------------------------------------------------------------------------- */
/* CTA / MENSAGENS PRONTAS                                                     */
/* -------------------------------------------------------------------------- */

export const waMessages = {
  general: 'Olá! Vim pelo site da DU\'CHER e gostaria de mais informações.',
  quote: 'Olá! Vim pelo site e gostaria de um atendimento personalizado.',
  service: (title: string) =>
    `Olá! Vim pelo site e tenho interesse na linha de ${title}. Pode me ajudar?`,
  schedule: 'Olá! Gostaria de agendar um horário de atendimento reservado.',
};

export function whatsappUrl(message: string = waMessages.general) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* -------------------------------------------------------------------------- */
/* SEO                                                                         */
/* -------------------------------------------------------------------------- */

export const seo = {
  title: "DU'CHER — Lingerie, Moda Praia e Fitness em Lagoa da Prata/MG",
  titleTemplate: "%s | DU'CHER",
  description:
    "Loja de lingerie, moda praia e moda fitness em Lagoa da Prata/MG. Atendimento consultivo, medição de caimento e grade do PP ao plus size. Fale conosco no WhatsApp.",
  keywords: [
    'lingerie Lagoa da Prata',
    'moda praia Lagoa da Prata',
    'moda fitness Lagoa da Prata',
    'loja de lingerie MG',
    'biquíni Lagoa da Prata',
    'sutiã tamanho certo',
    'lingerie plus size',
    'pijamas Lagoa da Prata',
    "DU'CHER",
    'ducheroficial',
  ],
  /** PNG gerado em build por src/app/opengraph-image.tsx. */
  ogImage: '/opengraph-image',
  locale: 'pt_BR',
};
