import {useMemo,useState,type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft,CalendarClock,ChartNoAxesColumn,Clock3,RefreshCcw,ShieldCheck,Users,Building2} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import {adminGranted,listAdminProperties,login,type Property} from '@/lib/properties';
import {interestStages,listInterests,type Interest} from '@/lib/interests';

const todayInBrazil=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const isOpen=(i:Interest)=>i.stage!=='concluido'&&i.stage!=='encerrado';
const displayDate=(d:string)=>d.split('-').reverse().join('/');
export default function DashboardComercial(){
 const[email,setEmail]=useState('');const[password,setPassword]=useState('');
 const[token,setToken]=useState('');const[rows,setRows]=useState<Interest[]>([]);const[properties,setProperties]=useState<Property[]>([]);
 const[busy,setBusy]=useState(false);const[error,setError]=useState('');
 const[period,setPeriod]=useState('todos');
 const today=todayInBrazil();
 const load=async(t:string)=>{const [interests,homes]=await Promise.all([listInterests(t),listAdminProperties(t)]);setRows(interests);setProperties(homes);};
 const signIn=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError('');
  try{const session=await login(email,password);
   if(!await adminGranted(session.access_token))throw new Error('Conta sem permissão administrativa.');
   await load(session.access_token);setToken(session.access_token);setPassword('');
  }catch(e){setError(e instanceof Error?e.message:'Não foi possível entrar.');}finally{setBusy(false);}
 };
 const refresh=async()=>{if(!token)return;setBusy(true);setError('');
  try{await load(token)}catch(e){setError(e instanceof Error?e.message:'Erro ao atualizar os dados.')}finally{setBusy(false);}
 };
 const selected=useMemo(()=>{
  if(period==='todos')return rows;
  const now=new Date();
  const cutoff=new Date(now.getTime()-(Number(period)*24*60*60*1000));
  return rows.filter(r=>new Date(r.created_at)>=cutoff);
 },[rows,period]);
 const stageCounts=interestStages.map(x=>({...x,count:selected.filter(i=>i.stage===x.value).length}));
 const overdue=selected.filter(i=>isOpen(i)&&i.next_contact_date&&i.next_contact_date<today).length;
 const dueToday=selected.filter(i=>isOpen(i)&&i.next_contact_date===today).length;
 const scheduled=selected.filter(i=>isOpen(i)&&i.next_contact_date&&i.next_contact_date>today).length;
 const withoutDate=selected.filter(i=>isOpen(i)&&!i.next_contact_date).length;
 const active=selected.filter(isOpen).length;
 const nameById=useMemo(()=>new Map(properties.map(x=>[x.id,x.title])),[properties]);
 const topProperties=useMemo(()=>{
  const map=new Map<string,number>();
  for(const row of selected){const key=row.property_id||'sem_imovel';map.set(key,(map.get(key)||0)+1);}
  return [...map.entries()].map(([id,count])=>({id,name:id==='sem_imovel'?'Imóvel não definido':nameById.get(id)||'Imóvel removido',count}))
   .sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name)).slice(0,8);
 },[selected,nameById]);
 const maxStage=Math.max(1,...stageCounts.map(x=>x.count));
 const maxProperty=Math.max(1,...topProperties.map(x=>x.count));
 const dueRows=selected.filter(i=>isOpen(i)&&i.next_contact_date&&i.next_contact_date<=today)
  .sort((a,b)=>(a.next_contact_date||'').localeCompare(b.next_contact_date||'')).slice(0,10);
 return <Layout>
 <section className="hero-gradient text-white py-12"><div className="container"><p className="text-accent font-semibold">Área restrita GVS</p>
 <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2">Dashboard comercial</h1>
 <p className="text-white/80 mt-3">Uma visão dos atendimentos registrados, das oportunidades e dos retornos que precisam de atenção.</p></div></section>
 <main className="container py-10">
 <Link to="/admin/interessados" className="inline-flex items-center gap-2 text-primary font-semibold mb-8"><ArrowLeft size={16}/> Voltar aos interessados</Link>
 {!token?<form onSubmit={signIn} className="max-w-lg mx-auto rounded-xl border bg-card p-7 space-y-5">
  <h2 className="font-serif text-2xl font-bold flex items-center gap-2"><ShieldCheck className="text-accent"/> Acesso administrativo</h2>
  <p className="text-sm text-muted-foreground">Use sua conta administrativa autorizada pela GVS. Os dados comerciais não são públicos.</p>
  <label className="block text-sm font-semibold">E-mail<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="block w-full mt-2 rounded-lg border bg-background p-3"/></label>
  <label className="block text-sm font-semibold">Senha<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="block w-full mt-2 rounded-lg border bg-background p-3"/></label>
  <button disabled={busy} className="w-full rounded-lg bg-primary text-white p-3 font-semibold disabled:opacity-50">Entrar</button>
 </form>:
 <div className="space-y-9">
  <div className="flex flex-wrap items-end justify-between gap-4">
   <div><h2 className="font-serif text-2xl font-bold">Visão geral</h2><p className="text-sm text-muted-foreground mt-1">Atualizado ao abrir ou clicar em Atualizar. Horário de referência: Brasília.</p></div>
   <div className="flex flex-wrap items-center gap-2">
   <label className="text-sm font-semibold">Período de entrada <select value={period} onChange={e=>setPeriod(e.target.value)} className="ml-2 p-2 border rounded-lg bg-background">
    <option value="todos">Todos os registros carregados</option><option value="7">Últimos 7 dias</option><option value="30">Últimos 30 dias</option><option value="90">Últimos 90 dias</option></select></label>
   <button type="button" disabled={busy} onClick={()=>void refresh()} className="inline-flex items-center gap-2 border rounded-lg px-4 py-2 disabled:opacity-50"><RefreshCcw size={16}/> Atualizar</button>
   <button type="button" onClick={()=>{setToken('');setRows([]);setProperties([]);}} className="rounded-lg border px-4 py-2">Sair</button>
   </div>
  </div>
  <p className="text-xs text-muted-foreground">Os indicadores são calculados sobre até 200 interessados mais recentes carregados do Supabase. O período filtra pela data de cadastro, não pela data da etapa. Não representam necessariamente toda a carteira histórica.</p>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
   {[
    {label:'Interessados',value:selected.length,icon:Users},
    {label:'Atendimentos ativos',value:active,icon:ChartNoAxesColumn},
    {label:'Retornos atrasados',value:overdue,icon:Clock3},
    {label:'Retornos para hoje',value:dueToday,icon:CalendarClock},
   ].map(card=><div key={card.label} className="rounded-xl border bg-card p-5">
     <card.icon className="w-6 h-6 text-accent mb-3"/><p className="text-sm text-muted-foreground">{card.label}</p>
     <p className="text-3xl font-serif font-bold mt-1 tabular-nums">{card.value}</p></div>)}
  </div>
  <div className="grid lg:grid-cols-2 gap-6">
   <section className="rounded-xl border bg-card p-6"><h3 className="font-serif text-2xl font-bold mb-5">Etapas de atendimento</h3>
    <div className="space-y-4">{stageCounts.map(x=><div key={x.value}>
     <div className="flex justify-between gap-3 text-sm mb-2"><span>{x.label}</span><strong className="tabular-nums">{x.count}</strong></div>
     <div className="h-3 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full" style={{width:(x.count/maxStage*100)+'%'}}/></div>
    </div>)}</div>
   </section>
   <section className="rounded-xl border bg-card p-6"><h3 className="font-serif text-2xl font-bold mb-5">Situação dos retornos</h3>
    <div className="grid grid-cols-2 gap-3">
    {[
      {label:'Atrasados',value:overdue},
      {label:'Hoje',value:dueToday},
      {label:'Futuros',value:scheduled},
      {label:'Sem data (ativos)',value:withoutDate},
    ].map(x=><div key={x.label} className="rounded-lg bg-secondary/50 p-4"><p className="text-sm text-muted-foreground">{x.label}</p><p className="font-serif font-bold text-2xl tabular-nums mt-2">{x.value}</p></div>)}
    </div><p className="text-xs text-muted-foreground mt-4">Atendimentos concluídos ou encerrados não entram na contagem de retornos pendentes.</p>
   </section>
  </div>
  <div className="grid lg:grid-cols-2 gap-6">
   <section className="rounded-xl border bg-card p-6"><h3 className="font-serif text-2xl font-bold flex items-center gap-2 mb-5"><Building2 className="text-accent"/> Imóveis com mais interessados</h3>
    {topProperties.length===0?<p className="text-muted-foreground text-sm">Nenhum interessado registrado no período.</p>:
     <div className="space-y-4">{topProperties.map(x=><div key={x.id}>
       <div className="flex justify-between gap-3 text-sm mb-2"><span className="break-words">{x.name}</span><strong>{x.count}</strong></div>
       <div className="h-3 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{width:(x.count/maxProperty*100)+'%'}}/></div>
      </div>)}</div>}
   </section>
   <section className="rounded-xl border bg-card p-6"><h3 className="font-serif text-2xl font-bold flex items-center gap-2 mb-5"><CalendarClock className="text-accent"/> Retornos prioritários</h3>
    {dueRows.length===0?<p className="text-muted-foreground text-sm">Nenhum retorno atrasado ou previsto para hoje no período.</p>:
      <div className="space-y-3">{dueRows.map(row=><div key={row.id} className="border rounded-lg p-3 flex flex-wrap justify-between items-center gap-2">
       <div><p className="font-semibold">{row.client_name}</p><p className="text-sm text-muted-foreground">{row.property_id?nameById.get(row.property_id)||'Imóvel removido':'Imóvel não definido'}</p></div>
       <span className={row.next_contact_date!<today?'text-destructive font-semibold text-sm':'text-primary font-semibold text-sm'}>{displayDate(row.next_contact_date!)}</span>
      </div>)}</div>}
    <Link to="/admin/interessados" className="inline-block mt-5 rounded-lg bg-primary text-white px-5 py-3 font-semibold">Gerenciar atendimentos</Link>
   </section>
  </div>
 </div>}
 {error&&<p role="alert" className="mt-6 p-4 border border-destructive rounded-lg text-destructive">{error}</p>}
 </main></Layout>;
}
