import Layout from '@/components/layout/Layout';
import { Building2, Handshake, ShieldCheck, MessageSquareText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company } from '@/lib/contact';
const pillars=[
 {icon:Building2,title:'Intermediação imobiliária',text:'Atuação na compra e venda de imóveis novos, usados e na planta, com credenciamento imobiliário no CRECI.'},
 {icon:Handshake,title:'Representação de consórcios',text:'Comercialização de consórcios de imóveis, automóveis, motocicletas e serviços das administradoras Embracon, União e Âncora.'},
 {icon:ShieldCheck,title:'Informação responsável',text:'Apresentação das condições e regras de cada produto com clareza, sem prometer resultados ou contemplação.'},
 {icon:MessageSquareText,title:'Atendimento personalizado',text:'Conversas orientadas pelo objetivo, necessidades e planejamento do cliente.'},
];
export default function Sobre() {
 return <Layout>
  <section className="hero-gradient py-16 md:py-24 text-white">
    <div className="container max-w-5xl">
      <p className="text-accent font-semibold mb-3">Sobre a GVS</p>
      <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Uma empresa. Duas formas de ajudar você a conquistar.</h1>
      <p className="text-white/85 text-lg leading-relaxed mt-6 max-w-3xl">Reunimos a intermediação imobiliária e a representação comercial de consórcios para atender objetivos diferentes com informação e proximidade.</p>
    </div>
  </section>
  <section className="py-16 md:py-20">
    <div className="container max-w-6xl grid lg:grid-cols-2 gap-8">
      <article className="bg-card rounded-2xl border p-8 md:p-10"><Building2 className="text-accent w-10 h-10"/><h2 className="font-serif text-3xl font-bold mt-5">Imóveis</h2><p className="text-muted-foreground mt-4 leading-relaxed">A {company.name} atua na intermediação imobiliária de imóveis novos, usados e na planta. Nosso trabalho inclui compreender o perfil de quem deseja comprar ou vender e orientar a busca e a negociação conforme as condições disponíveis.</p><Link to="/imoveis" className="inline-flex gap-2 items-center mt-7 font-semibold text-primary hover:underline">Conhecer a atuação imobiliária <ArrowRight className="w-4 h-4"/></Link></article>
      <article className="bg-card rounded-2xl border p-8 md:p-10"><Handshake className="text-accent w-10 h-10"/><h2 className="font-serif text-3xl font-bold mt-5">Consórcios</h2><p className="text-muted-foreground mt-4 leading-relaxed">Como representante comercial, a GVS ajuda clientes a conhecer modalidades e planos das administradoras representadas. A gestão dos grupos, as regras de contemplação e os contratos são responsabilidade das respectivas administradoras.</p><Link to="/consorcios" className="inline-flex gap-2 items-center mt-7 font-semibold text-primary hover:underline">Entender nossas opções <ArrowRight className="w-4 h-4"/></Link></article>
    </div>
  </section>
  <section className="py-16 md:py-20 bg-secondary/60"><div className="container max-w-6xl">
    <p className="text-accent font-semibold mb-2">Nosso compromisso</p><h2 className="font-serif text-3xl md:text-4xl font-bold mb-9">Clareza do primeiro contato à decisão.</h2>
    <div className="grid md:grid-cols-2 gap-5">{pillars.map(p=><article key={p.title} className="border bg-card rounded-xl p-7"><p.icon className="w-9 h-9 text-accent"/><h3 className="font-serif text-xl font-bold mt-4">{p.title}</h3><p className="text-muted-foreground mt-3 leading-relaxed">{p.text}</p></article>)}</div>
  </div></section>
  <section className="py-12"><div className="container max-w-6xl flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
    <div><h2 className="font-serif text-2xl font-bold">Converse com a GVS</h2><p className="text-muted-foreground mt-2">Conte o seu objetivo. Nossa equipe orientará o próximo passo.</p></div><Link to="/contato" className="inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 px-6 font-semibold">Entrar em contato <ArrowRight className="w-4 h-4"/></Link>
  </div></section>
 </Layout>;
}
