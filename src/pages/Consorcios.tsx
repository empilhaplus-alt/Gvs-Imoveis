import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Home, CarFront, Bike, Wrench, BadgeCheck, ArrowRight, Info, CheckCircle2, MessageCircle, ClipboardCheck, Users, ChevronDown, ShieldCheck, CalendarClock, FileText, SearchCheck, Phone, Sparkles } from 'lucide-react';
import { whatsappUrl, company } from '@/lib/contact';
import houseImage from '@/assets/hero-bg.jpg';

const categories = [
  {
    id: 'imoveis', title: 'Consórcio de imóveis', icon: Home, kicker: 'Morar ou investir',
    description: 'Para quem deseja planejar a compra de uma casa, apartamento ou outro imóvel elegível.',
    detail: 'O tipo de imóvel, a utilização do crédito e as condições dependem das regras contratuais.',
    image: houseImage, alt: 'Fotografia ilustrativa de imóvel residencial',
  },
  {
    id: 'automoveis', title: 'Consórcio de automóveis', icon: CarFront, kicker: 'Seu próximo carro',
    description: 'Uma alternativa para organizar a compra de um automóvel sem depender de uma aquisição imediata.',
    detail: 'Consulte os modelos elegíveis, o crédito e as condições de cada grupo.',
    image: 'https://images.unsplash.com/photo-1758411898423-f8a6062a7b8d?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=70&w=900',
    alt: 'Fotografia ilustrativa de automóvel branco',
  },
  {
    id: 'motocicletas', title: 'Consórcio de motocicletas', icon: Bike, kicker: 'Sua próxima moto',
    description: 'Conheça possibilidades para planejar a aquisição de uma motocicleta.',
    detail: 'A elegibilidade do bem depende da modalidade e do regulamento do grupo.',
    image: 'https://images.unsplash.com/photo-1640987293202-65edb38868d3?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=70&w=900',
    alt: 'Fotografia ilustrativa de motocicleta',
  },
  {
    id: 'servicos', title: 'Consórcio de serviços', icon: Wrench, kicker: 'Projetos que saem do papel',
    description: 'Planeje a contratação de serviços que estejam previstos na categoria do grupo.',
    detail: 'Informe o serviço desejado para verificarmos as opções e regras disponíveis.',
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=70&w=900',
    alt: 'Fotografia ilustrativa de profissionais realizando um serviço',
  },
];

const administrators = [
  { name: 'Embracon', letter: 'E', text: 'Consulte com a GVS os grupos, créditos e condições comercializados desta administradora.' },
  { name: 'Consórcio União', letter: 'U', text: 'Veja as alternativas de planos disponíveis para o seu objetivo.' },
  { name: 'Consórcio Âncora', letter: 'A', text: 'Solicite informações sobre modalidades e regras dos grupos ofertados.' },
];

const steps = [
  { number: '01', title: 'Converse sobre seu objetivo', text: 'Conte o que deseja adquirir e qual parcela cabe no seu planejamento.', icon: Users },
  { number: '02', title: 'Compare as condições', text: 'Avalie crédito, duração, taxa de administração e demais custos previstos.', icon: SearchCheck },
  { number: '03', title: 'Conheça as regras do grupo', text: 'Entenda as assembleias, o sorteio, os lances e o regulamento antes de aderir.', icon: FileText },
  { number: '04', title: 'Planeje a utilização do crédito', text: 'Após a contemplação e o atendimento das exigências, o crédito pode ser utilizado conforme o contrato.', icon: CalendarClock },
];

const questions = [
  { q: 'Consórcio é a mesma coisa que financiamento?', a: 'Não. No consórcio, participantes formam um grupo de autofinanciamento administrado por empresa autorizada. O crédito depende da contemplação. No financiamento, a liberação e as condições seguem outra estrutura contratual.' },
  { q: 'Como funciona a contemplação?', a: 'A contemplação acontece por sorteio ou lance, conforme as regras do grupo e a existência de recursos. Não há garantia de contemplação imediata nem em prazo específico.' },
  { q: 'Existe cobrança de juros?', a: 'O consórcio não utiliza juros remuneratórios de financiamento, mas possui taxa de administração e pode ter fundo de reserva, seguro e outros encargos previstos no contrato. Atrasos podem gerar encargos.' },
  { q: 'Posso escolher o bem ou serviço depois?', a: 'Em regra, após a contemplação é possível escolher o fornecedor e o bem ou serviço dentro da categoria contratada, desde que sejam cumpridas as condições do contrato e da administradora.' },
  { q: 'O que devo conferir antes de contratar?', a: 'Verifique se a administradora está autorizada a funcionar, leia o contrato e regulamento, confira o valor total do plano, as regras de reajuste, de contemplação e de restituição.' },
];

// Valores informados em reais inteiros; nunca guardar dados financeiros no navegador.
const formatMoney = (digits: string) => digits
  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(digits))
  : '';
const onlyDigits = (value: string) => value.replace(/\D/g, '').slice(0, 12);

export default function Consorcios() {
  const [interest, setInterest] = useState('Consórcio de imóveis');
  const [creditAmount, setCreditAmount] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [creditFocused, setCreditFocused] = useState(false);
  const [budgetFocused, setBudgetFocused] = useState(false);
  const [goal, setGoal] = useState('');
  const [desiredTimeframe, setDesiredTimeframe] = useState('');
  const consultMessage = [
    'Olá! Gostaria de um atendimento da GVS sobre consórcios.',
    'Modalidade: ' + interest,
    creditAmount ? 'Crédito pretendido: ' + formatMoney(creditAmount) : '',
    monthlyBudget ? 'Parcela mensal pretendida: ' + formatMoney(monthlyBudget) : '',
    desiredTimeframe ? 'Prazo desejado: ' + desiredTimeframe + ' (expectativa, sem garantia de contemplação)' : '',
    goal.trim() ? 'Objetivo: ' + goal.trim() : '',
    'Gostaria de conhecer as opções disponíveis das administradoras representadas.'
  ].filter(Boolean).join('\n');
  const consultUrl = 'https://wa.me/' + company.phone + '?text=' + encodeURIComponent(consultMessage);

  return <Layout>
    <section className="hero-gradient text-white overflow-hidden">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 xl:gap-12 items-center">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 text-accent px-4 py-2 text-sm font-semibold mb-6"><BadgeCheck className="w-4 h-4"/> Representação comercial</div>
            <h1 className="font-serif text-4xl md:text-5xl xl:text-[3.25rem] font-bold leading-[1.12]">Consórcios para planejar suas <span className="text-accent">próximas conquistas</span></h1>
            <p className="text-base sm:text-lg mt-6 text-white/85 leading-relaxed">Planeje suas conquistas com quem mais entende de consórcios. A GVS oferece atendimento personalizado para ajudar você a encontrar o plano mais adequado aos seus objetivos. Somos representantes da Embracon, Consórcio União e Consórcio Âncora.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a className="inline-flex items-center justify-center bg-accent text-accent-foreground rounded-lg py-3 px-5 font-semibold hover:brightness-95" href={whatsappUrl('consórcios')} target="_blank" rel="noopener noreferrer">Falar com um representante <ArrowRight className="w-4 h-4 ml-2"/></a>
              <a href="#modalidades" className="inline-flex items-center rounded-lg border border-white/50 px-5 py-3 font-semibold hover:bg-white/10">Ver modalidades</a>
            </div>
          </div>
          <div className="relative w-full max-w-[480px] mx-auto lg:max-w-none lg:justify-self-end">
            <img
              src="/gvs-consorcios-700.webp"
              onError={(event) => {
                const img = event.currentTarget;
                if (!img.src.endsWith('/gvs-consorcios-ilustracao.svg')) img.src = '/gvs-consorcios-ilustracao.svg';
              }}
              alt="Ilustração com casa, automóvel, motocicleta e ferramentas representando serviços"
              width="700" height="700" decoding="async"
              className="block w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-primary text-white border-t border-white/10">
      <div className="container py-5 grid sm:grid-cols-3 gap-4 sm:gap-6">
        <p className="flex gap-3 items-center text-sm"><ShieldCheck className="text-accent w-6 h-6 shrink-0"/> Intermediação por representante comercial</p>
        <p className="flex gap-3 items-center text-sm"><ClipboardCheck className="text-accent w-6 h-6 shrink-0"/> Análise das condições antes da adesão</p>
        <p className="flex gap-3 items-center text-sm"><MessageCircle className="text-accent w-6 h-6 shrink-0"/> Atendimento por assunto no WhatsApp</p>
      </div>
    </section>

    <section id="modalidades" className="py-16 md:py-24 scroll-mt-24">
      <div className="container">
        <div className="max-w-3xl mb-11">
          <p className="text-accent font-semibold mb-2">Um plano para cada objetivo</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">O que você quer conquistar?</h2>
          <p className="text-muted-foreground mt-4 text-lg">Conheça as modalidades, explore possibilidades e fale diretamente com um representante da GVS.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((item) => <article key={item.id} className="group bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col">
            <div className="relative aspect-[16/9] bg-primary overflow-hidden">
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent" aria-hidden="true"/>
              <div className="absolute left-5 bottom-5 flex items-center gap-2 text-white text-sm font-semibold"><span className="rounded-lg bg-accent text-accent-foreground p-2"><item.icon className="w-5 h-5"/></span>{item.kicker}</div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed mt-3">{item.description}</p>
              <p className="text-sm text-muted-foreground mt-4 flex gap-2"><CheckCircle2 className="text-accent w-5 h-5 shrink-0"/>{item.detail}</p>
              <a href={whatsappUrl(item.title.toLowerCase())} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 font-semibold text-primary inline-flex gap-2 items-center hover:underline">Consultar opções <ArrowRight className="w-4 h-4"/></a>
            </div>
          </article>)}
        </div>
        <p className="text-xs text-muted-foreground mt-4">Imagens ilustrativas. Os bens e serviços mostrados não representam ofertas, disponibilidade ou condições comerciais específicas.</p>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary/60">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <p className="text-accent font-semibold mb-2">Entenda antes de decidir</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Como funciona o consórcio?</h2>
          <p className="text-muted-foreground text-lg mt-4">Consórcio é uma modalidade de autofinanciamento em grupo. A administradora organiza o grupo e a contemplação ocorre conforme o contrato, por sorteio ou lance.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => <article key={step.number} className="rounded-xl bg-background border p-6">
            <div className="flex items-center justify-between"><span className="font-serif text-3xl font-bold text-accent">{step.number}</span><step.icon className="text-primary w-7 h-7"/></div>
            <h3 className="font-serif text-xl font-bold mt-5">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3">{step.text}</p>
          </article>)}
        </div>
        <div className="mt-9 bg-primary text-white rounded-2xl p-6 md:p-8 flex items-start gap-4">
          <Info className="text-accent w-7 h-7 shrink-0"/>
          <div><p className="font-bold text-lg">Contemplação não tem data garantida</p><p className="text-white/80 mt-2 leading-relaxed">Antes de contratar, confira taxas, reajustes, regras de sorteio, lance e utilização do crédito. Consórcio é um compromisso financeiro que exige planejamento.</p></div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 items-center">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
            <p className="text-accent font-semibold mb-3">O diferencial da GVS</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight">Mais opções para você tomar uma boa decisão.</h2>
            <p className="text-white/85 mt-5 leading-relaxed text-lg">Na GVS, seu planejamento começa com uma conversa. Entendemos o que você deseja conquistar, avaliamos suas necessidades e apresentamos opções disponíveis entre as administradoras que representamos.</p>
            <p className="text-white/75 mt-4 leading-relaxed">Você pode conhecer alternativas da Embracon, Consórcio União e Consórcio Âncora, conforme os planos e modalidades efetivamente ofertados.</p>
            <a className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-6 py-3 font-semibold hover:brightness-95" href={whatsappUrl('comparar opções de consórcio disponíveis')} target="_blank" rel="noopener noreferrer">Conversar sobre minhas opções <ArrowRight className="w-4 h-4"/></a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <article className="rounded-xl border p-6 bg-card"><Users className="w-8 h-8 text-accent"/><h3 className="font-serif text-xl font-bold mt-4">Escuta primeiro</h3><p className="text-sm text-muted-foreground mt-2">O atendimento começa pelo seu objetivo, não por uma oferta genérica.</p></article>
            <article className="rounded-xl border p-6 bg-card"><SearchCheck className="w-8 h-8 text-accent"/><h3 className="font-serif text-xl font-bold mt-4">Opções disponíveis</h3><p className="text-sm text-muted-foreground mt-2">Entenda as alternativas das administradoras representadas.</p></article>
            <article className="rounded-xl border p-6 bg-card"><FileText className="w-8 h-8 text-accent"/><h3 className="font-serif text-xl font-bold mt-4">Condições explicadas</h3><p className="text-sm text-muted-foreground mt-2">Avalie taxas, prazos, reajustes e regras do grupo antes de decidir.</p></article>
            <article className="rounded-xl border p-6 bg-card"><ShieldCheck className="w-8 h-8 text-accent"/><h3 className="font-serif text-xl font-bold mt-4">Decisão consciente</h3><p className="text-sm text-muted-foreground mt-2">Sem promessa de contemplação imediata ou prazo garantido.</p></article>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-10 items-center">
        <div>
          <p className="text-accent font-semibold mb-2">Atendimento que começa ouvindo você</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Não é só escolher uma parcela. É entender seu objetivo.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mt-5">Comprar um imóvel, trocar de carro ou realizar um projeto são decisões diferentes. Por isso, a conversa começa pelo valor de crédito, pelo prazo desejado e pela sua capacidade de pagamento.</p>
          <ul className="mt-7 space-y-4">
            {['Qual bem ou serviço você pretende adquirir?', 'Qual valor de crédito faz sentido para seu plano?', 'Quanto você pode comprometer por mês?', 'O que você precisa saber sobre prazo, lance e contemplação?'].map(q => <li key={q} className="flex gap-3 items-start"><CheckCircle2 className="text-accent shrink-0 w-5 h-5 mt-0.5"/><span>{q}</span></li>)}
          </ul>
          <a href={whatsappUrl('um atendimento para avaliar meu objetivo de consórcio')} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg font-semibold px-6 py-3">Conversar sobre meu objetivo <ArrowRight className="w-4 h-4"/></a>
        </div>
        <div className="relative rounded-2xl overflow-hidden min-h-[300px] lg:min-h-[480px]">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=80" alt="Fotografia ilustrativa de profissionais em reunião de atendimento" loading="lazy" className="w-full h-full absolute inset-0 object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" aria-hidden="true"/>
          <div className="relative min-h-[300px] lg:min-h-[480px] flex items-end p-7 md:p-10">
            <p className="font-serif text-2xl md:text-3xl font-semibold text-white max-w-sm">Atendimento para transformar objetivos em escolhas conscientes.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary/60">
      <div className="container">
        <div className="max-w-3xl mb-10">
          <p className="text-accent font-semibold mb-2">Administradoras representadas</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Opções para comparar com orientação</h2>
          <p className="text-muted-foreground mt-4">A GVS representa comercialmente Embracon, Consórcio União e Consórcio Âncora. A oferta de modalidades e planos depende de cada administradora.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {administrators.map((item) => <article key={item.name} className="rounded-2xl border bg-background p-7 flex flex-col shadow-sm">
            <div className="rounded-xl w-16 h-16 bg-primary text-accent font-serif text-3xl font-bold flex items-center justify-center" aria-hidden="true">{item.letter}</div>
            <h3 className="font-serif text-2xl font-bold mt-5">{item.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground mt-3">{item.text}</p>
            <a href={whatsappUrl('planos da ' + item.name)} target="_blank" rel="noopener noreferrer" className="mt-auto pt-6 text-primary font-semibold inline-flex items-center gap-2 hover:underline">Consultar planos <ArrowRight className="w-4 h-4"/></a>
          </article>)}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">As letras são identificadores visuais, não logotipos das administradoras.</p>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10">
        <div><p className="text-accent font-semibold mb-2">Perguntas frequentes</p><h2 className="font-serif text-3xl md:text-4xl font-bold">Consórcio sem dúvidas</h2><p className="text-muted-foreground mt-4">Respostas para ajudar você a avaliar uma proposta com clareza.</p>
          <a href="https://www.bcb.gov.br/meubc/faqs/s/consorcio" target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 text-primary font-semibold mt-6 hover:underline">Consultar orientações do Banco Central <ArrowRight className="w-4 h-4"/></a>
        </div>
        <div className="space-y-3">
          {questions.map((item) => <details key={item.q} className="group border bg-card rounded-xl p-5 open:shadow-sm">
            <summary className="cursor-pointer font-semibold flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">{item.q}<ChevronDown aria-hidden="true" className="w-5 h-5 shrink-0 text-accent group-open:rotate-180 transition-transform"/></summary>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </details>)}
        </div>
      </div>
    </section>

    <section id="atendimento-consorcios" className="py-16 md:py-24 bg-secondary/60 scroll-mt-24">
      <div className="container">
        <div className="hero-gradient text-white rounded-2xl p-7 md:p-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] items-center gap-9">
          <div>
            <p className="text-accent font-semibold mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5"/> Vamos conversar?</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Sua próxima conquista começa com um bom planejamento.</h2>
            <p className="text-white/85 mt-5 leading-relaxed">Escolha o que procura e fale com a GVS. Um representante poderá apresentar as modalidades e condições disponíveis para avaliação.</p>
            <div className="flex flex-wrap gap-4 mt-7 text-sm text-white/85"><span className="flex items-center gap-2"><ClipboardCheck className="w-5 h-5 text-accent"/> Informações claras</span><span className="flex items-center gap-2"><Users className="w-5 h-5 text-accent"/> Atendimento personalizado</span></div>
          </div>
          <div className="bg-white text-foreground rounded-2xl p-6 md:p-8">
            <label htmlFor="objetivo-consorcio" className="block font-semibold mb-3">Qual é o seu objetivo?</label>
            <select id="objetivo-consorcio" value={interest} onChange={e => setInterest(e.target.value)} className="w-full rounded-lg border border-border bg-background text-foreground p-3">
              {categories.map(item => <option key={item.id} value={item.title}>{item.title}</option>)}
            </select>
            <label htmlFor="credito-consorcio" className="block font-semibold mt-4 mb-2 text-sm">Crédito pretendido (opcional)</label>
            <input id="credito-consorcio" type="text" inputMode="decimal" maxLength={25} value={creditFocused ? creditAmount : formatMoney(creditAmount)} onFocus={() => setCreditFocused(true)} onBlur={() => setCreditFocused(false)} onChange={e => setCreditAmount(onlyDigits(e.target.value))} placeholder="Ex.: R$ 150.000" className="w-full rounded-lg border border-border bg-background text-foreground p-3"/>
            <label htmlFor="parcela-consorcio" className="block font-semibold mt-4 mb-2 text-sm">Parcela mensal confortável (opcional)</label>
            <input id="parcela-consorcio" type="text" inputMode="decimal" maxLength={25} value={budgetFocused ? monthlyBudget : formatMoney(monthlyBudget)} onFocus={() => setBudgetFocused(true)} onBlur={() => setBudgetFocused(false)} onChange={e => setMonthlyBudget(onlyDigits(e.target.value))} placeholder="Ex.: R$ 900" className="w-full rounded-lg border border-border bg-background text-foreground p-3"/>
            <label htmlFor="prazo-consorcio" className="block font-semibold mt-4 mb-2 text-sm">Quando você pretende adquirir o bem? (opcional)</label>
            <select id="prazo-consorcio" value={desiredTimeframe} onChange={e => setDesiredTimeframe(e.target.value)} className="w-full rounded-lg border border-border bg-background text-foreground p-3">
              <option value="">Prefiro não informar</option>
              <option value="Até 6 meses">Até 6 meses</option>
              <option value="De 6 a 12 meses">De 6 a 12 meses</option>
              <option value="De 1 a 2 anos">De 1 a 2 anos</option>
              <option value="Mais de 2 anos">Mais de 2 anos</option>
              <option value="Sem prazo definido">Sem prazo definido</option>
            </select>
            <p className="mt-2 text-xs text-muted-foreground">Esse prazo serve apenas para orientar o atendimento. Não representa previsão ou garantia de contemplação.</p>
            <label htmlFor="objetivo-detalhe" className="block font-semibold mt-4 mb-2 text-sm">Conte um pouco mais (opcional)</label>
            <textarea id="objetivo-detalhe" rows={3} maxLength={400} value={goal} onChange={e => setGoal(e.target.value)} placeholder="Ex.: pretendo comprar meu primeiro apartamento" className="w-full rounded-lg border border-border bg-background text-foreground p-3 resize-y"/>
            <a href={consultUrl} target="_blank" rel="noopener noreferrer" className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-lg py-3 px-4 font-semibold"><Phone className="w-4 h-4"/> Preparar conversa no WhatsApp</a>
            <p className="text-xs text-muted-foreground mt-3">Suas respostas são usadas apenas para preparar a mensagem. Nenhum dado é armazenado neste site. Você pode revisar antes de enviar; não há contratação nesta página.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 mt-7 text-xs text-muted-foreground"><Info className="w-5 h-5 shrink-0 text-accent"/><p>A GVS é representante comercial e não administradora de consórcios. A contemplação ocorre por sorteio ou lance, conforme regras contratuais e disponibilidade de recursos do grupo, sem garantia de prazo. Valores, taxas, reajustes, condições e elegibilidade devem ser conferidos diretamente na proposta e no contrato da administradora.</p></div>
      </div>
    </section>
  </Layout>;
}
