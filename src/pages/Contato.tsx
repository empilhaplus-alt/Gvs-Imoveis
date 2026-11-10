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
    <p className="text-accent font-semibold mb-3">Atendimento GVS</p><h1 className="font-serif text-4xl md:text-5xl font-bold">Vamos conversar sobre seu objetivo?</h1>
    <p className="text-white/85 mt-5 text-lg max-w-3xl">Comprar ou vender um imóvel, conhecer consórcios ou tirar uma dúvida: escolha o assunto para chegar ao atendimento adequado.</p>
  </div></section>
  <section className="py-14 md:py-20"><div className="container max-w-6xl grid lg:grid-cols-2 gap-8 xl:gap-12">
    <div>
      <h2 className="font-serif text-3xl font-bold mb-6">Fale com a GVS</h2>
      <p className="text-muted-foreground mb-8 max-w-lg">Nosso atendimento inicial acontece pelo WhatsApp. Você pode enviar uma mensagem direta ou preencher o formulário ao lado para adiantar o assunto.</p>
      <div className="space-y-5">
        <p className="flex gap-3 items-start text-muted-foreground"><MapPin className="text-accent shrink-0 w-6 h-6"/>{company.address}</p>
        <a href={'tel:+'+company.phone} className="flex gap-3 text-muted-foreground hover:text-primary"><Phone className="text-accent shrink-0 w-6 h-6"/>{company.phoneDisplay}</a>
        <a href={'mailto:'+company.email} className="flex gap-3 text-muted-foreground hover:text-primary break-all"><Mail className="text-accent shrink-0 w-6 h-6"/>{company.email}</a>
      </div>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"><MessageCircle className="w-5 h-5"/> Abrir WhatsApp</a>
    </div>
    <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
      <h2 className="font-serif text-2xl font-bold">Prepare sua mensagem</h2>
      <p className="text-sm text-muted-foreground mt-2 mb-6">O formulário não envia seus dados automaticamente. Ele abre uma mensagem editável no WhatsApp, que você poderá revisar antes de enviar.</p>
      <form onSubmit={submit} className="space-y-5">
        <label className="block text-sm font-semibold">Seu nome<input type="text" autoComplete="name" className="mt-2 w-full rounded-lg border bg-background px-4 py-3 font-normal" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/></label>
        <label className="block text-sm font-semibold">Assunto<select className="mt-2 w-full rounded-lg border bg-background px-4 py-3 font-normal" value={subject} onChange={e=>setSubject(e.target.value)}>{subjects.map(x=><option key={x}>{x}</option>)}</select></label>
        <label className="block text-sm font-semibold">Mensagem (opcional)<textarea className="mt-2 w-full rounded-lg border bg-background px-4 py-3 font-normal" rows={4} maxLength={1000} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Conte brevemente o que você procura"/></label>
        <button className="w-full rounded-lg bg-accent text-accent-foreground font-semibold py-3 px-4 inline-flex gap-2 items-center justify-center" type="submit">Continuar no WhatsApp <ArrowRight className="w-4 h-4"/></button>
        <p className="text-xs text-muted-foreground">Suas informações não são armazenadas por este formulário. A conversa será iniciada somente se você enviar a mensagem no WhatsApp.</p>
      </form>
    </div>
  </div></section>
 </Layout>;
}
