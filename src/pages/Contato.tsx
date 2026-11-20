import { useState, type FormEvent } from 'react';
import Layout from '@/components/layout/Layout';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { company, whatsappUrl } from '@/lib/contact';
const subjects=['Comprar imóvel','Vender imóvel','Consórcio de imóvel','Consórcio de automóvel','Consórcio de motocicleta','Consórcio de serviços','Outro assunto'];
export default function Contato(){
 const [subject,setSubject]=useState(subjects[0]);
 const [name,setName]=useState('');
 const [message,setMessage]=useState('');
 const submit=(e:FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   const text=['Olá! Meu nome é '+name.trim()+'.','Assunto: '+subject+'.',message.trim()?'Mensagem: '+message.trim():''].filter(Boolean).join('\n');
   window.open('https://wa.me/'+company.phone+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
 };
 return <Layout>
  <section className="hero-gradient py-14 md:py-20 text-white"><div className="container max-w-6xl">
    <p className="text-accent font-semibold mb-3">Atendimento GVS</p><h1 className="font-serif text-4xl md:text-5xl font-bold">Você tem um objetivo. Vamos encontrar por onde começar?</h1>
    <p className="text-white/85 mt-5 text-lg max-w-3xl">Quer comprar um imóvel, trocar de carro ou comparar planos de consórcio? Diga o que procura e fale diretamente com a GVS pelo WhatsApp.</p>
  </div></section>
  <section className="py-14 md:py-20"><div className="container max-w-6xl grid lg:grid-cols-2 gap-8 xl:gap-12">
    <div>
      <h2 className="font-serif text-3xl font-bold mb-6">Converse com quem pode orientar sua escolha</h2>
      <p className="text-muted-foreground mb-8 max-w-lg">Você não precisa chegar com tudo decidido. Conte seu objetivo, sua faixa de orçamento e a principal dúvida. A GVS ajuda você a entender os próximos passos.</p>
      <div className="space-y-5">
        <p className="flex gap-3 items-start text-muted-foreground"><MapPin className="text-accent shrink-0 w-6 h-6"/>{company.address}</p>
        <a href={'tel:+'+company.phone} className="flex gap-3 text-muted-foreground hover:text-primary"><Phone className="text-accent shrink-0 w-6 h-6"/>{company.phoneDisplay}</a>
        <a href={'mailto:'+company.email} className="flex gap-3 text-muted-foreground hover:text-primary break-all"><Mail className="text-accent shrink-0 w-6 h-6"/>{company.email}</a>
      </div>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"><MessageCircle className="w-5 h-5"/> Quero conversar agora</a>
    </div>
    <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
      <h2 className="font-serif text-2xl font-bold">Conte o que você quer conquistar</h2>
      <p className="text-sm text-muted-foreground mt-2 mb-6">Em poucos campos, prepare sua conversa com a GVS. Você revisa a mensagem antes de enviá-la pelo WhatsApp.</p>
      <form onSubmit={submit} className="space-y-5">
        <label className="block text-sm font-semibold">Seu nome<input type="text" autoComplete="name" className="mt-2 w-full rounded-lg border bg-background px-4 py-3 font-normal" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/></label>
        <label className="block text-sm font-semibold">Assunto<select className="mt-2 w-full rounded-lg border bg-background px-4 py-3 font-normal" value={subject} onChange={e=>setSubject(e.target.value)}>{subjects.map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="block text-sm font-semibold">Mensagem (opcional)<textarea className="mt-2 w-full rounded-lg border bg-background px-4 py-3 font-normal" rows={4} maxLength={1000} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ex.: Quero comprar meu primeiro apartamento e entender minhas opções"/></label>
        <button className="w-full rounded-lg bg-accent text-accent-foreground font-semibold py-3 px-4 inline-flex gap-2 items-center justify-center" type="submit">Conversar com a GVS no WhatsApp <ArrowRight className="w-4 h-4"/></button>
        <p className="text-xs text-muted-foreground">Suas informações não são armazenadas por este formulário. A conversa será iniciada somente se você enviar a mensagem no WhatsApp.</p>
      </form>
    </div>
  </div></section>
 </Layout>;
}
