import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Handshake, Home, CarFront, Bike, ClipboardList, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { whatsappUrl } from '@/lib/contact';
import heroImage from '@/assets/hero-bg.jpg';

const categories = [
  { icon: Home, label: 'Imóveis', description: 'Planeje a compra da sua casa ou apartamento.' },
  { icon: CarFront, label: 'Automóveis', description: 'Organize o caminho para trocar ou comprar seu carro.' },
  { icon: Bike, label: 'Motocicletas', description: 'Conheça opções para sua próxima moto.' },
  { icon: ClipboardList, label: 'Serviços', description: 'Planeje projetos e serviços elegíveis ao consórcio.' },
];

const passos = [
  { title: 'Conte o que você quer conquistar', description: 'Um imóvel, um carro ou um novo projeto? Começamos pelo seu objetivo, não por uma oferta pronta.' },
  { title: 'Descubra as possibilidades', description: 'Entenda opções disponíveis, valores, condições e os cuidados que fazem diferença na decisão.' },
  { title: 'Decida com mais segurança', description: 'Avance quando tiver clareza sobre o que cabe no seu planejamento e sobre as regras da contratação.' },
];

export default function Index() {
  return (
    <Layout>
      <section className="hero-gradient text-primary-foreground">
        <div className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-accent">GVS Imóveis e Consórcios • Atendimento personalizado</p>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Seu próximo imóvel merece mais que vontade. <span className="text-accent">Merece um bom plano.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
              Quer comprar um imóvel, trocar de carro ou construir patrimônio? A GVS ajuda você a conhecer opções de imóveis e consórcios, comparar condições e escolher o próximo passo com confiança.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">
              Atendimento com experiência comercial de mais de 20 anos no mercado de consórcios. Sem promessas de contemplação: com orientação e condições explicadas.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={whatsappUrl('ajuda para planejar a compra de um imóvel')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-bold text-accent-foreground transition hover:brightness-95">
                <MessageCircle className="h-5 w-5" /> Quero conversar sobre meu plano
              </a>
              <Link to="/consorcios" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/60 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Conhecer consórcios <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/70">Comece com uma conversa. A contratação depende da análise das condições e do contrato.</p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img src={heroImage} alt="Imagem ilustrativa de empreendimento residencial" className="h-[340px] w-full object-cover lg:h-[470px]" />
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="container">
          <div className="mx-auto mb-11 max-w-3xl text-center">
            <p className="font-semibold text-accent">Seu objetivo. Sua escolha.</p>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">Qual conquista você quer tirar do papel?</h2>
            <p className="mt-4 text-muted-foreground">Você não precisa conhecer todos os caminhos. Precisa encontrar um que combine com seus planos.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
              <img src={heroImage} alt="Empreendimento residencial ilustrativo" loading="lazy" className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col p-7">
                <Building2 className="h-10 w-10 text-accent" />
                <h3 className="mt-4 font-serif text-2xl font-bold">Quero encontrar um imóvel</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">Casa própria, mudança ou investimento? Conheça imóveis novos, usados e na planta e converse sobre localização, características e disponibilidade.</p>
                <Link to="/imoveis/ofertas" className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline">Ver imóveis disponíveis <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
            <article className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
              <img src="/gvs-consorcios-700.webp" alt="Ilustração de imóvel, carro, moto e serviços" loading="lazy" className="h-48 w-full bg-primary object-contain px-8 py-2" />
              <div className="flex flex-1 flex-col p-7">
                <Handshake className="h-10 w-10 text-accent" />
                <h3 className="mt-4 font-serif text-2xl font-bold">Quero planejar minha compra com consórcio</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">Descubra possibilidades de crédito e parcelas para seu objetivo, entenda taxas e regras de contemplação e avalie alternativas antes de assumir um compromisso.</p>
                <Link to="/consorcios" className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline">Conhecer minhas opções <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold text-accent">Antes de decidir</p>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">Uma boa conversa pode evitar uma escolha cara.</h2>
            <p className="mt-4 text-muted-foreground">Não oferecemos uma resposta igual para todos. Entendemos seu objetivo e mostramos o que vale conferir.</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {passos.map((passo, i) => (
              <article key={passo.title} className="rounded-xl border bg-card p-6">
                <span className="text-sm font-bold text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl font-bold">{passo.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{passo.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="container">
          <h2 className="text-center font-serif text-3xl font-bold md:text-4xl">O que você pode planejar com consórcio?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">Existem modalidades diferentes para objetivos diferentes. O plano e a elegibilidade variam conforme a administradora.</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(item => (
              <Link key={item.label} to="/consorcios" className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <item.icon className="h-9 w-9 text-accent" />
                <h3 className="mt-4 font-serif text-xl font-bold">{item.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Ver possibilidades <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> Consórcio não tem juros de financiamento, mas tem taxa de administração e pode ter outros encargos, além de reajustes. A contemplação depende de sorteio ou lance, sem prazo garantido.
          </p>
        </div>
      </section>

      <section className="hero-gradient py-16 text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="font-semibold text-accent">O próximo passo pode começar hoje</p>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Seu objetivo é importante demais para ficar só na intenção.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">Conte o que você quer conquistar e receba uma orientação inicial para comparar possibilidades, sem precisar escolher um plano às cegas.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappUrl('uma conversa sobre consórcio ou compra de imóvel')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-bold text-accent-foreground">
              <MessageCircle className="h-5 w-5" /> Quero falar com a GVS
            </a>
            <a href="https://mci-consorcio.epsacore.com.br/p/gvsimoveis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-7 py-3.5 font-semibold text-white hover:bg-white/10">
              <CheckCircle2 className="h-5 w-5" /> Fazer diagnóstico gratuito
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
