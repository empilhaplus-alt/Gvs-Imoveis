import {useMemo,useState,type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft,CalendarClock,CheckCircle2,MessageCircle,Plus,RefreshCcw,ShieldCheck,Trash2} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import {adminGranted,listAdminProperties,login,type Property} from '@/lib/properties';
import {addInterest,deleteInterest,interestSources,interestStages,listInterests,updateInterest,type Interest,type InterestInput,type InterestStage} from '@/lib/interests';

const blank=():InterestInput=>({property_id:null,client_name:'',client_phone:'',source:'whatsapp',stage:'novo',
 notes:'',contact_context:'Contato iniciado pelo próprio cliente',next_contact_date:null});
const todayBR=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const isOpen=(stage:InterestStage)=>stage!=='concluido'&&stage!=='encerrado';
const followUpState=(row:Interest,today:string)=>{
 if(!isOpen(row.stage)||!row.next_contact_date)return 'none';
 if(row.next_contact_date<today)return 'overdue';
 if(row.next_contact_date===today)return 'today';
 return 'scheduled';
};
const prettyDate=(date:string)=>date.split('-').reverse().join('/');
export default function AdminInteressados(){
 const[email,setEmail]=useState('');const[password,setPassword]=useState('');
 const[token,setToken]=useState('');const[userId,setUserId]=useState('');
 const[properties,setProperties]=useState<Property[]>([]);const[interests,setInterests]=useState<Interest[]>([]);
 const[form,setForm]=useState<InterestInput>(blank);const[filter,setFilter]=useState('todos');const[followUpFilter,setFollowUpFilter]=useState('todos');
 const[busy,setBusy]=useState(false);const[error,setError]=useState('');const[notice,setNotice]=useState('');
 const authenticated=Boolean(token&&userId);
 const names=useMemo(()=>new Map(properties.map(p=>[p.id,p.title])),[properties]);
 const today=todayBR();
 const pending=interests.filter(i=>['overdue','today'].includes(followUpState(i,today))).length;
 const overdue=interests.filter(i=>followUpState(i,today)==='overdue').length;
 const filtered=useMemo(()=>{
  const priority=(row:Interest)=>{const value=followUpState(row,today);return value==='overdue'?0:value==='today'?1:value==='scheduled'?2:3;};
  return interests.filter(i=>(filter==='todos'||i.stage===filter)&&(followUpFilter==='todos'||followUpState(i,today)===followUpFilter))
    .sort((a,b)=>priority(a)-priority(b)||((a.next_contact_date||'9999-12-31').localeCompare(b.next_contact_date||'9999-12-31'))||b.created_at.localeCompare(a.created_at));
 },[interests,filter,followUpFilter,today]);
 const reload=async(t:string)=>{const [p,i]=await Promise.all([listAdminProperties(t),listInterests(t)]);setProperties(p);setInterests(i);};
 const signIn=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError('');setNotice('');
   try{const s=await login(email,password);if(!await adminGranted(s.access_token))throw new Error('Conta sem permissão administrativa.');
     await reload(s.access_token);setToken(s.access_token);setUserId(s.user.id);setPassword('');setNotice('Acesso autorizado.');
   }catch(e){setError(e instanceof Error?e.message:'Falha no login.')}finally{setBusy(false)}
 };
 const create=async(e:FormEvent)=>{e.preventDefault();if(!authenticated)return;
   setBusy(true);setError('');setNotice('');
   try{const name=form.client_name.trim(),phone=form.client_phone.trim();
     if(name.length<2||!/^\+?[0-9 ()-]{8,24}$/.test(phone))throw new Error('Informe nome e telefone válidos.');
     await addInterest({...form,client_name:name,client_phone:phone,notes:form.notes.trim(),contact_context:form.contact_context.trim()},token,userId);
     setForm(blank());await reload(token);setNotice('Interessado registrado.');
   }catch(e){setError(e instanceof Error?e.message:'Erro ao salvar.')}finally{setBusy(false)}
 };
 const patch=async(row:Interest,data:Partial<Interest>)=>{
   if(!authenticated)return;setBusy(true);setError('');setNotice('');
   try{await updateInterest({...row,...data},token);await reload(token);setNotice('Atendimento atualizado.');}
   catch(e){setError(e instanceof Error?e.message:'Erro ao atualizar.')}finally{setBusy(false)}
 };
 const remove=async(row:Interest)=>{
   if(!authenticated||!confirm('Excluir permanentemente o registro de '+row.client_name+'?'))return;
   setBusy(true);setError('');
   try{await deleteInterest(row.id,token);await reload(token);setNotice('Registro excluído.');}
   catch(e){setError(e instanceof Error?e.message:'Erro ao excluir.')}finally{setBusy(false)}
 };
 const msgLink=(row:Interest)=>'https://wa.me/'+row.client_phone.replace(/\D/g,'')+'?text='+encodeURIComponent('Olá, '+row.client_name+'. Aqui é da GVS Imóveis. Podemos continuar nosso atendimento?');
 return <Layout>
 <section className="hero-gradient py-12 text-white"><div className="container">
   <p className="text-accent font-semibold">Área restrita GVS</p><h1 className="font-serif text-3xl md:text-4xl font-bold mt-2">Acompanhamento de interessados</h1>
   <p className="text-white/80 mt-3">Organize contatos recebidos, próximas conversas e negociações de imóveis.</p>
 </div></section>
 <main className="container py-10">
  <Link to="/admin/imoveis" className="inline-flex items-center gap-2 text-primary font-semibold mb-8"><ArrowLeft size={16}/> Voltar aos imóveis</Link>
  {!authenticated&&<form onSubmit={signIn} className="max-w-lg mx-auto rounded-xl border bg-card p-7 space-y-5">
    <h2 className="font-serif text-2xl font-bold flex items-center gap-2"><ShieldCheck className="text-accent"/> Acesso administrativo</h2>
    <p className="text-muted-foreground text-sm">Entre com sua conta administrativa já autorizada pela GVS.</p>
    <label className="block text-sm font-semibold">E-mail<input className="block w-full mt-2 rounded-lg border bg-background p-3" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/></label>
    <label className="block text-sm font-semibold">Senha<input className="block w-full mt-2 rounded-lg border bg-background p-3" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label>
    <button disabled={busy} className="w-full rounded-lg bg-primary text-white p-3 font-semibold disabled:opacity-50">Entrar</button>
  </form>}
  {authenticated&&<div className="space-y-10">
    <div className="flex flex-wrap gap-3 items-center justify-between">
      <div><h2 className="font-serif text-2xl font-bold">Carteira de atendimentos</h2><p className="text-sm text-muted-foreground mt-2">{interests.length} contato(s) registrado(s) · {pending} retorno(s) pendente(s) · {overdue} atrasado(s)</p></div>
      <div className="flex gap-2"><button type="button" onClick={()=>void reload(token).catch(e=>setError(e.message))} className="border rounded-lg px-4 py-2 inline-flex gap-2 items-center"><RefreshCcw size={16}/> Atualizar</button>
      <button type="button" onClick={()=>{setToken('');setUserId('');setInterests([]);setProperties([])}} className="border rounded-lg px-4 py-2">Sair</button></div>
    </div>
    <form onSubmit={create} className="border rounded-2xl p-6 md:p-8 bg-card space-y-5">
      <h2 className="font-serif text-2xl font-bold flex items-center gap-2"><Plus className="text-accent"/> Registrar atendimento recebido</h2>
      <p className="text-sm text-muted-foreground">Cadastre apenas pessoas que procuraram a GVS ou autorizaram contato. O clique público no WhatsApp não registra dados automaticamente.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm font-semibold">Nome *<input required minLength={2} maxLength={120} value={form.client_name} onChange={e=>setForm({...form,client_name:e.target.value})} className="mt-2 w-full border rounded-lg p-3 bg-background" placeholder="Nome do interessado"/></label>
        <label className="block text-sm font-semibold">Telefone/WhatsApp *<input required type="tel" maxLength={24} value={form.client_phone} onChange={e=>setForm({...form,client_phone:e.target.value})} className="mt-2 w-full border rounded-lg p-3 bg-background" placeholder="+55 21 99999-9999"/></label>
        <label className="block text-sm font-semibold">Imóvel<select value={form.property_id||''} onChange={e=>setForm({...form,property_id:e.target.value||null})} className="mt-2 w-full border rounded-lg p-3 bg-background"><option value="">Ainda não definido</option>{properties.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
        <label className="block text-sm font-semibold">Origem<select value={form.source} onChange={e=>setForm({...form,source:e.target.value as InterestInput['source']})} className="mt-2 w-full border rounded-lg p-3 bg-background">{interestSources.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label>
        <label className="block text-sm font-semibold">Próximo contato (opcional)<input type="date" value={form.next_contact_date||''} onChange={e=>setForm({...form,next_contact_date:e.target.value||null})} className="mt-2 w-full border rounded-lg p-3 bg-background"/></label>
        <label className="block text-sm font-semibold md:col-span-2">Contexto do contato *<input required minLength={5} maxLength={300} value={form.contact_context} onChange={e=>setForm({...form,contact_context:e.target.value})} className="mt-2 w-full border rounded-lg p-3 bg-background" placeholder="Ex.: cliente solicitou informações pelo WhatsApp"/></label>
        <label className="block text-sm font-semibold md:col-span-2">Observações internas<textarea rows={3} maxLength={2000} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="mt-2 w-full border rounded-lg p-3 bg-background" placeholder="Resumo do interesse, próximos passos; evite dados sensíveis."/></label>
      </div>
      <button type="submit" disabled={busy} className="bg-accent text-accent-foreground font-semibold rounded-lg p-3 px-6 inline-flex items-center gap-2 disabled:opacity-50"><Plus size={18}/> Salvar interessado</button>
    </form>
    <section><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5"><h2 className="font-serif text-2xl font-bold">Acompanhamento</h2>
      <label className="text-sm font-semibold">Filtrar por etapa <select className="ml-2 rounded-lg border p-2 bg-background" value={filter} onChange={e=>setFilter(e.target.value)}><option value="todos">Todas</option>{interestStages.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label></div>
      <div className="flex flex-wrap items-center gap-3 mb-5"><CalendarClock size={18} className="text-accent"/><label className="text-sm font-semibold">Próximos contatos <select className="ml-2 rounded-lg border p-2 bg-background" value={followUpFilter} onChange={e=>setFollowUpFilter(e.target.value)}><option value="todos">Todos</option><option value="overdue">Atrasados</option><option value="today">Hoje</option><option value="scheduled">Agendados</option><option value="none">Sem pendência ativa</option></select></label></div>
      {filtered.length===0?<p className="p-8 rounded-xl border text-muted-foreground">Nenhum interessado encontrado nesta seleção.</p>:
       <div className="grid lg:grid-cols-2 gap-5">{filtered.map(row=><article key={row.id} className="rounded-xl border bg-card p-6 space-y-4">
        <div><h3 className="font-serif font-bold text-xl">{row.client_name}</h3><p className="text-sm text-muted-foreground mt-1">{row.client_phone} · {row.source}</p><p className="text-sm mt-2">{row.property_id?names.get(row.property_id)||'Imóvel não disponível':'Imóvel não definido'}</p><p className="text-xs text-muted-foreground mt-1">Recebido em {new Date(row.created_at).toLocaleString('pt-BR')}</p></div>
        <label className="block text-sm font-semibold">Etapa<select value={row.stage} disabled={busy} onChange={e=>void patch(row,{stage:e.target.value as InterestStage})} className="block mt-2 w-full border rounded-lg bg-background p-3">{interestStages.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label>
        <div className="space-y-2"><label className="block text-sm font-semibold">Próximo contato<input type="date" disabled={busy} value={row.next_contact_date||''} onChange={e=>void patch(row,{next_contact_date:e.target.value||null})} className="block mt-2 w-full rounded-lg border bg-background p-3"/></label>
        {followUpState(row,today)==='overdue'&&<p className="text-sm font-semibold text-destructive" role="status">Retorno atrasado desde {prettyDate(row.next_contact_date!)}</p>}
        {followUpState(row,today)==='today'&&<p className="text-sm font-semibold text-primary" role="status">Retorno previsto para hoje</p>}
        {followUpState(row,today)==='scheduled'&&<p className="text-sm text-muted-foreground">Retorno agendado para {prettyDate(row.next_contact_date!)}</p>}
        {!isOpen(row.stage)&&row.next_contact_date&&<p className="text-xs text-muted-foreground">Atendimento encerrado; data mantida apenas para consulta.</p>}
        </div><p className="text-xs text-muted-foreground">Origem do consentimento/contato: {row.contact_context}</p>
        <label className="block text-sm font-semibold">Observações<textarea key={row.id+row.updated_at} defaultValue={row.notes} maxLength={2000} rows={3} onBlur={e=>{if(e.target.value!==row.notes)void patch(row,{notes:e.target.value})}} className="mt-2 block w-full border bg-background rounded-lg p-3"/></label>
        <div className="flex flex-wrap gap-2"><a href={msgLink(row)} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center rounded-lg bg-primary text-white p-3 font-semibold"><MessageCircle size={17}/> Abrir WhatsApp</a>
          <button type="button" disabled={busy} onClick={()=>void remove(row)} className="border border-destructive/40 text-destructive rounded-lg px-4 py-3 inline-flex gap-2 items-center"><Trash2 size={17}/> Excluir</button></div>
       </article>)}</div>}
    </section>
  </div>}
  {notice&&<p role="status" className="mt-7 rounded-lg border p-4 text-primary flex items-center gap-2"><CheckCircle2 size={18}/>{notice}</p>}
  {error&&<p role="alert" className="mt-7 rounded-lg border border-destructive p-4 text-destructive">{error}</p>}
 </main>
 </Layout>;
}
