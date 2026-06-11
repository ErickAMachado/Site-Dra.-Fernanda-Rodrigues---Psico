import type { Testimonial } from "@/types/database";

export const siteContent = {
  psychologistName: "Dra. Fernanda Rodrigues",
  hero: {
    title:
      "Cuidado psicológico para crianças e adolescentes com acolhimento, escuta e desenvolvimento",
    subtitle:
      "Atendimento voltado ao desenvolvimento emocional, social e comportamental de crianças e adolescentes, com experiência no acompanhamento de crianças autistas.",
    trustCard:
      "Atendimento psicológico para crianças, adolescentes e famílias",
  },
  about: {
    title: "Sobre a psicóloga",
    text: "Psicóloga dedicada ao atendimento de crianças e adolescentes, com atuação voltada ao desenvolvimento emocional, social e comportamental. Seu trabalho busca acolher cada criança em sua individualidade, respeitando seu tempo, sua história e suas necessidades.",
  },
  approach: {
    title: "Abordagem no atendimento",
    text: "O trabalho é conduzido com escuta atenta, vínculo seguro e linguagem adequada à idade de cada criança ou adolescente. Cada processo é construído de forma individual, com participação da família quando necessário.",
    items: [
      "Escuta acolhedora e respeito ao ritmo de cada criança",
      "Ambiente seguro para expressão emocional",
      "Comunicação clara com pais e responsáveis",
      "Intervenções baseadas em evidências e ética profissional",
    ],
  },
  autism: {
    title: "Experiência com crianças autistas",
    text: "Atuação com crianças autistas, buscando compreender suas necessidades individuais, fortalecer habilidades socioemocionais e apoiar a família no processo de desenvolvimento.",
  },
  bookingCta: {
    title: "Pronta para dar o primeiro passo?",
    text: "Agende uma conversa inicial para entender as necessidades da criança e esclarecer dúvidas sobre o processo terapêutico.",
  },
  contact: {
    title: "Quer entender se esse atendimento faz sentido para seu filho?",
    subtitle:
      "Envie uma mensagem curta. Respondemos pelo WhatsApp com acolhimento e clareza.",
    successMessage:
      "Recebemos seu contato. Em breve entraremos em contato pelo WhatsApp.",
  },
  faq: [
    {
      question: "A partir de qual idade é possível iniciar o atendimento?",
      answer:
        "O atendimento pode ser indicado conforme a necessidade de cada criança ou adolescente. Na conversa inicial, avaliamos juntos o momento mais adequado para iniciar.",
    },
    {
      question: "Os pais participam das sessões?",
      answer:
        "Sim, quando faz sentido para o processo. A participação dos responsáveis é importante para apoiar o desenvolvimento emocional e comportamental da criança.",
    },
    {
      question: "Como funciona a primeira consulta?",
      answer:
        "A primeira conversa é um momento para conhecer a família, entender a queixa principal e explicar como o acompanhamento psicológico pode ajudar.",
    },
    {
      question: "O atendimento é online ou presencial?",
      answer:
        "Informe aqui a modalidade oferecida (presencial, online ou ambas) para que os responsáveis saibam como agendar.",
    },
  ],
};

export const serviceAreas = [
  {
    title: "Crianças",
    description: "Acolhimento emocional e apoio ao desenvolvimento infantil.",
  },
  {
    title: "Adolescentes",
    description: "Escuta para fase de mudanças, identidade e relações.",
  },
  {
    title: "Orientação para pais",
    description: "Apoio para compreender e acompanhar o filho com mais segurança.",
  },
  {
    title: "Desenvolvimento emocional",
    description: "Fortalecimento da expressão e regulação das emoções.",
  },
  {
    title: "Habilidades sociais",
    description: "Desenvolvimento de comunicação, empatia e convivência.",
  },
  {
    title: "Acompanhamento de crianças autistas",
    description: "Atendimento individualizado respeitando necessidades específicas.",
  },
  {
    title: "Dificuldades comportamentais",
    description: "Compreensão e manejo de comportamentos desafiadores.",
  },
  {
    title: "Ansiedade infantil/adolescente",
    description: "Apoio para medos, preocupações e sintomas de ansiedade.",
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "mock-1",
    author_name: "Mariana S.",
    rating: 5,
    comment:
      "Encontramos acolhimento desde a primeira consulta. Nosso filho se sente seguro e nós, pais, nos sentimos orientados.",
    source: "Google",
    review_date: "2025-11-12",
    is_active: true,
    created_at: "2025-11-12T00:00:00.000Z",
  },
  {
    id: "mock-2",
    author_name: "Ricardo M.",
    rating: 5,
    comment:
      "Profissional atenciosa, comunicativa e muito respeitosa com nossa filha autista. Recomendamos de coração.",
    source: "Google",
    review_date: "2025-10-03",
    is_active: true,
    created_at: "2025-10-03T00:00:00.000Z",
  },
  {
    id: "mock-3",
    author_name: "Camila F.",
    rating: 5,
    comment:
      "Ambiente leve, escuta verdadeira e orientações claras para a família. Foi essencial no processo do nosso adolescente.",
    source: "Google",
    review_date: "2025-09-18",
    is_active: true,
    created_at: "2025-09-18T00:00:00.000Z",
  },
  {
    id: "mock-4",
    author_name: "Juliana P.",
    rating: 5,
    comment:
      "Atendimento humanizado e ético. Sentimos confiança para continuar o acompanhamento psicológico.",
    source: "Google",
    review_date: "2025-08-22",
    is_active: true,
    created_at: "2025-08-22T00:00:00.000Z",
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  const { createSupabaseClient } = await import("@/lib/supabaseClient");
  const supabase = createSupabaseClient();

  if (!supabase) {
    return mockTestimonials;
  }

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("review_date", { ascending: false });

  if (error || !data?.length) {
    return mockTestimonials;
  }

  return data;
}
