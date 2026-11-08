import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Home, CarFront, Bike, Wrench, BadgeCheck, ArrowRight, Info, CheckCircle2, MessageCircle, ClipboardCheck, Users } from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';

const categories = [
  { title: 'Consórcio de imóveis', icon: Home, kicker: 'Morar ou investir', description: 'Conheça alternativas de aquisição planejada para imóveis, conforme as regras de cada grupo.', examples: 'Casas, apartamentos e outros imóveis elegíveis.', id: 'imoveis' },
  { title: 'Consórcio de automóveis', icon: CarFront, kicker: 'Seu próximo veículo', description: 'Planeje a aquisição do seu automóvel com acompanhamento na escolha de um plano.', examples: 'Automóveis elegíveis conforme o contrato.', id: 'automoveis' },
  { title: 'Consórcio de motocicletas', icon: Bike, kicker: 'Sua próxima moto', description: 'Entenda as alternativas de consórcio para aquisição de motocicletas.', examples: 'Modelos elegíveis conforme o grupo contratado.', id: 'motocicletas' },
  { title: 'Consórcio de serviços', icon: Wrench, kicker: 'Projetos pessoais', description: 'Converse sobre modalidades destinadas à contratação de serviços elegíveis.', examples: 'Serviços previstos no regulamento do grupo.', id: 'servicos' },
];
const administrators = [
  { name: 'Embracon', monogram: 'E', description: 'Consulte as opções de consórcio comercializadas pela GVS com esta administradora.' },
  { name: 'Consórcio União', monogram: 'U', description: 'Conheça as modalidades e condições disponíveis para seu objetivo.' },
  { name: 'Consórcio Âncora', monogram: 'A', description: 'Converse sobre os grupos e planos disponíveis para contratação.' },
];
export default function Consorcios() {
  return <Layout>
    <section className="hero-gradient text-white">
      <div className="container py-16 md:py-24 max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 text-accent px-4 py-2 text-sm font-semibold mb-7"><BadgeCheck className="w-4 h-4"/> Representação comercial</div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">Consórcios para planejar suas <span className="text-accent">próximas conquistas</span></h1>
        <p className="text-lg md:text-xl mt-6 text-white/85 leading-relaxed max-w-3xl">A GVS representa comercialmente consórcios da Embracon, Consórcio União e Consórcio Âncora. Conheça as modalidades e tire suas dúvidas antes de contratar.</p>
        <div className="flex flex-wrap gap-3 mt-9">
          <a className="inline-flex items-center justify-center bg-accent text-accent-foreground rounded-lg py-3 px-6 font-semibold hover:brightness-95" href={whatsappUrl('consórcios')} target="_blank" rel="noopener noreferrer">Falar com um representante <ArrowRight className="w-4 h-4 ml-2"/></a>
          <a href="#modalidades" className="inline-flex items-center rounded-lg border border-white/50 px-6 py-3 font-semibold hover:bg-white/10">Ver modalidades</a>
        </div>
      </div>
    </section>
    <section id="modalidades" className="py-16 md:py-20 scroll-mt-24">
      <div className="container">
        <div className="mb-10 max-w-2xl"><p className="text-accent font-semibold mb-2">Encontre sua modalidade</p><h2 className="font-serif text-3xl md:text-4xl font-bold">Qual é o seu objetivo?</h2><p className="text-muted-foreground mt-4">Escolha uma categoria para iniciar um atendimento direcionado.</p></div>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((item) => <article key={item.id} className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
            <div className="bg-gradient-to-r from-primary to-primary/90 px-7 py-6 flex items-center justify-between">
              <span className="text-white/85 text-sm font-semibold tracking-wide">{item.kicker}</span>
              <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center"><item.icon aria-hidden="true" className="w-9 h-9 text-accent"/></div>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">{item.description}</p>
              <p className="mt-4 text-sm text-muted-foreground flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-accent"/>{item.examples}</p>
              <a className="inline-flex mt-auto pt-7 gap-2 items-center font-semibold text-primary hover:underline focus-visible:underline" href={whatsappUrl(item.title.toLowerCase())} target="_blank" rel="noopener noreferrer" aria-label={'Solicitar informações sobre '+item.title}>Solicitar informações <ArrowRight className="w-4 h-4"/></a>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="py-16 md:py-20 bg-secondary/60">
      <div className="container">
        <div className="max-w-3xl mb-9"><p className="text-accent font-semibold mb-2">Parceiros comerciais</p><h2 className="font-serif text-3xl md:text-4xl font-bold">Administradoras representadas</h2><p className="mt-4 text-muted-foreground">A GVS atua na comercialização de consórcios das administradoras abaixo. Modalidades e condições devem ser consultadas individualmente.</p></div>
        <div className="grid md:grid-cols-3 gap-5">
          {administrators.map((item) => <article key={item.name} className="bg-card rounded-2xl p-7 border shadow-sm flex flex-col">
            <div className="w-16 h-16 rounded-xl bg-primary text-accent flex justify-center items-center font-serif text-3xl font-bold" aria-hidden="true">{item.monogram}</div>
            <h3 className="font-serif text-2xl font-bold mt-5">{item.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">{item.description}</p>
            <a href={whatsappUrl('planos da '+item.name)} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center font-semibold text-primary mt-auto pt-6 hover:underline">Consultar planos <ArrowRight className="w-4 h-4"/></a>
          </article>)}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">As letras são identificadores visuais da página, não logotipos oficiais das administradoras.</p>
        <div className="flex gap-3 mt-10 p-5 md:p-6 border rounded-xl bg-background"><Info aria-hidden="true" className="shrink-0 w-6 h-6 text-accent"/><p className="text-sm text-muted-foreground leading-relaxed">A GVS atua como representante comercial e não é administradora de consórcios. A contemplação ocorre conforme as regras contratuais do grupo, por sorteio ou lance, sem garantia de prazo. Valores, taxas, condições e disponibilidade devem ser verificados na proposta e no contrato da administradora.</p></div>
      </div>
    </section>
    <section id="atendimento-consorcios" className="py-16 md:py-20 scroll-mt-24">
      <div className="container">
        <div className="rounded-2xl hero-gradient text-white p-8 md:p-12 grid lg:grid-cols-[1fr_auto] gap-7 items-center">
          <div><p className="text-accent font-semibold mb-3">Antes de contratar</p><h2 className="font-serif text-3xl md:text-4xl font-bold">Entenda o plano com clareza</h2><p className="text-white/85 mt-4 max-w-2xl">Converse sobre crédito, prazo, parcelas, taxas, lances, regras de contemplação e condições específicas do grupo.</p><div className="flex flex-wrap gap-5 mt-6 text-sm text-white/85"><span className="flex gap-2 items-center"><ClipboardCheck className="text-accent w-5 h-5"/> Informações do plano</span><span className="flex gap-2 items-center"><Users className="text-accent w-5 h-5"/> Atendimento personalizado</span></div></div>
          <Link to="/contato" className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 px-6 rounded-lg font-semibold"><MessageCircle className="w-5 h-5"/> Entrar em contato</Link>
        </div>
      </div>
    </section>
  </Layout>;
}
