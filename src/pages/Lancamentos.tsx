import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Building2, KeyRound, Construction, ArrowRight, SearchCheck, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';
import propertyImage from '@/assets/hero-bg.jpg';

const types = [
 { name:'Imóveis novos', icon:Building2, description:'Encontre alternativas de imóveis novos para morar ou investir.', category:'novo' },
 { name:'Imóveis usados', icon:KeyRound, description:'Procure imóveis existentes de acordo com localização, características e orçamento.', category:'usado' },
 { name:'Imóveis na planta', icon:Construction, description:'Conheça lançamentos e empreendimentos em diferentes fases de construção.', category:'lancamento' },
];
const steps = [
 { icon:SearchCheck, title:'Conte o que procura', text:'Informe região, tipo de imóvel, faixa de preço e características desejadas.' },
 { icon:MapPin, title:'Converse sobre as opções', text:'Nossa equipe verifica imóveis e condições disponíveis para o perfil informado.' },
 { icon:ShieldCheck, title:'Avalie com segurança', text:'Confirme documentação, informações e condições da negociação antes de decidir.' },
];
export default function Lancamentos() {
 return <Layout>
  <section className="hero-gradient text-white">
    <div className="container py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <p className="inline-flex bg-white/10 text-accent rounded-full px-4 py-2 font-semibold text-sm mb-6">Intermediação imobiliária</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Seu próximo imóvel começa com a escolha certa.</h1>
        <p className="text-white/85 text-lg mt-6 leading-relaxed">A GVS atua na intermediação de compra e venda de imóveis novos, usados e na planta. Conte com atendimento para encontrar oportunidades alinhadas ao seu objetivo.</p>
        <Link to="/imoveis/ofertas" className="inline-flex gap-2 items-center rounded-lg bg-accent text-accent-foreground font-semibold px-6 py-3 mt-8">Ver imóveis disponíveis <ArrowRight className="w-4 h-4"/></Link>
      </div>
      <div className="overflow-hidden rounded-2xl shadow-xl"><img src={propertyImage} alt="Fotografia ilustrativa de empreendimento imobiliário" className="w-full h-64 sm:h-80 lg:h-[420px] object-cover" decoding="async"/></div>
    </div>
  </section>
  <section className="py-16 md:py-20">
    <div className="container">
      <p className="text-accent font-semibold mb-2">Compra e venda</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Qual tipo de imóvel você procura?</h2>
      <p className="text-muted-foreground mb-9 max-w-2xl">Escolha a categoria mais próxima do seu interesse. A disponibilidade é confirmada individualmente pela equipe.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {types.map(item => <article className="rounded-2xl bg-card border p-7 flex flex-col shadow-sm" key={item.name}>
          <item.icon className="text-accent w-10 h-10"/>
          <h3 className="font-serif text-2xl font-bold mt-5">{item.name}</h3>
          <p className="text-muted-foreground mt-3 leading-relaxed flex-1">{item.description}</p>
          <Link to={"/imoveis/ofertas?tipo="+item.category} className="inline-flex gap-2 items-center font-semibold text-primary mt-7 hover:underline">Ver imóveis disponíveis <ArrowRight className="w-4 h-4"/></Link>
        </article>)}
      </div>
      <p className="text-xs text-muted-foreground mt-5">As imagens são ilustrativas. Imóveis, preços e condições dependem de confirmação de disponibilidade.</p>
    </div>
  </section>
  <section className="bg-secondary/60 py-16 md:py-20">
    <div className="container">
      <p className="text-accent font-semibold mb-2">Como atendemos</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-9">Da busca à decisão, com orientação.</h2>
      <div className="grid md:grid-cols-3 gap-5">{steps.map((step,i) => <article key={step.title} className="rounded-xl bg-card border p-6">
        <div className="flex items-center justify-between"><step.icon className="text-accent w-8 h-8"/><span className="text-2xl font-serif font-bold text-muted-foreground/40">0{i+1}</span></div>
        <h3 className="font-serif text-xl font-bold mt-5">{step.title}</h3><p className="text-sm text-muted-foreground mt-3 leading-relaxed">{step.text}</p>
      </article>)}</div>
    </div>
  </section>
  <section className="py-16 md:py-20">
    <div className="container grid lg:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-10">
        <h2 className="font-serif text-3xl font-bold">Quer vender seu imóvel?</h2>
        <p className="mt-4 text-white/80 leading-relaxed">Converse com nossa equipe sobre a intermediação da venda, localização e características do seu imóvel.</p>
        <a href={whatsappUrl('intermediação da venda de um imóvel')} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-6 py-3 font-semibold">Solicitar atendimento <ArrowRight className="w-4 h-4"/></a>
      </div>
      <div className="rounded-2xl border bg-card p-8 md:p-10">
        <MessageCircle className="w-8 h-8 text-accent"/>
        <h2 className="font-serif text-3xl font-bold mt-4">Prefere conversar primeiro?</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">Informe o tipo de imóvel, a região e sua faixa de orçamento. A GVS pode orientar sua próxima etapa.</p>
        <a href={whatsappUrl('orientação para comprar um imóvel')} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex gap-2 items-center text-primary font-semibold hover:underline">Falar com a GVS <ArrowRight className="w-4 h-4"/></a>
      </div>
    </div>
  </section>
 </Layout>;
}
