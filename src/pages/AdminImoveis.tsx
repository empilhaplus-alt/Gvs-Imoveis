import { useCallback, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, Building2, ImagePlus, LogOut, Pencil, Plus, Save, Trash2, ShieldCheck } from 'lucide-react';
import { adminGranted, categoryName, listAdminProperties, login, priceLabel, propertyCategories, removeProperty, saveProperty, slugify, uploadPhoto, type Property, type PropertyDraft, type PropertyCategory, type PropertyStatus } from '@/lib/properties';
import { Link } from 'react-router-dom';

const empty = ():PropertyDraft=>({
 title:'',slug:'',category:'lancamento',kind:'Apartamento',city:'Rio de Janeiro',
 neighborhood:'',address_summary:'',price:null,bedrooms:null,bathrooms:null,parking:null,area_m2:null,
 description:'',highlights:[],image_urls:[],status:'rascunho',featured:false,
});
function numberOrNull(value:string) {if(value.trim()==='')return null;const n=Number(value.replace(',','.'));return Number.isFinite(n)?n:null;}
export default function AdminImoveis() {
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [token,setToken]=useState('');
 const [authorized,setAuthorized]=useState(false);
 const [rows,setRows]=useState<Property[]>([]);
 const [currentId,setCurrentId]=useState<string|undefined>();
 const [draft,setDraft]=useState<PropertyDraft>(empty);
 const [highlightsText,setHighlightsText]=useState('');
 const [busy,setBusy]=useState(false);
 const [status,setStatus]=useState('');
 const [error,setError]=useState('');
 const [editing,setEditing]=useState(false);
 const load = useCallback(async (t:string)=>setRows(await listAdminProperties(t)),[]);
 const signIn=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();setBusy(true);setError('');setStatus('');
  try {
    const session=await login(email,password);
    const allowed=await adminGranted(session.access_token);
    if(!allowed) {setError('Este usuário não tem autorização para administrar imóveis. Solicite liberação ao responsável pela GVS.');return;}
    setToken(session.access_token);setAuthorized(true);await load(session.access_token);setStatus('Acesso administrativo autorizado.');
  }catch(e){setError(e instanceof Error?e.message:'Falha na autenticação.')}finally{setBusy(false)}
 };
 const clear=()=>{setDraft(empty());setCurrentId(undefined);setHighlightsText('');setEditing(true);setError('');setStatus('')};
 const edit=(row:Property)=>{
  const {id,created_at,updated_at,...fields}=row;
  setDraft(fields);setCurrentId(id);setHighlightsText(row.highlights.join('\n'));setEditing(true);setError('');setStatus('');
 };
 const save=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();if(!token)return;setBusy(true);setError('');setStatus('');
  try {
   const normalized={...draft,
    title:draft.title.trim(),slug:slugify(draft.slug||draft.title),city:draft.city.trim(),
    neighborhood:draft.neighborhood.trim(),description:draft.description.trim(),
    highlights:highlightsText.split('\n').map(x=>x.trim()).filter(Boolean),
   };
   if(normalized.status==='publicado'&&(!normalized.image_urls.length||!normalized.description||!normalized.city||!normalized.neighborhood))
    throw new Error('Para publicar, informe bairro, cidade, descrição e ao menos uma foto real.');
   const saved=await saveProperty(normalized,token,currentId);
   setCurrentId(saved.id);const {id,created_at,updated_at,...fields}=saved;setDraft(fields);
   await load(token);setStatus('Imóvel salvo com sucesso.');setEditing(false);
  }catch(e){setError(e instanceof Error?e.message:'Não foi possível salvar o imóvel.')}finally{setBusy(false)}
 };
 const remove=async(row:Property)=>{
  if(!token||!window.confirm('Excluir definitivamente o imóvel "'+row.title+'"?'))return;
  setBusy(true);setError('');
  try{await removeProperty(row.id,token);await load(token);setStatus('Imóvel excluído.');if(currentId===row.id)setEditing(false)}
  catch(e){setError(e instanceof Error?e.message:'Erro ao excluir.')}finally{setBusy(false)}
 };
 const addPhotos=async(files:FileList|null)=>{
  if(!files||!token)return;
  setBusy(true);setError('');setStatus('');
  try {
   if(files.length+draft.image_urls.length>12)throw new Error('São permitidas até 12 fotos por imóvel.');
   const photos:string[]=[];
   for(const file of Array.from(files)) photos.push(await uploadPhoto(file,token));
   setDraft(d=>({...d,image_urls:[...d.image_urls,...photos]}));setStatus('Fotos enviadas. Salve o cadastro para associá-las ao imóvel.');
  }catch(e){setError(e instanceof Error?e.message:'Erro ao enviar as fotos.')}finally{setBusy(false)}
 };
 const set=(field:keyof PropertyDraft,value:unknown)=>setDraft(d=>({...d,[field]:value}));
 return <Layout>
  <section className="hero-gradient text-white py-12"><div className="container"><p className="text-accent font-semibold">Área restrita GVS</p><h1 className="font-serif text-3xl md:text-4xl font-bold mt-2">Administração de imóveis</h1><p className="text-white/80 mt-3">Cadastre ofertas reais, revise informações e publique somente após confirmar a disponibilidade.</p></div></section>
  <div className="container py-10">
   {!authorized&&<div className="max-w-md mx-auto rounded-2xl border p-7 bg-card shadow-sm">
    <div className="flex gap-2 items-center"><ShieldCheck className="text-accent"/><h2 className="font-serif font-bold text-2xl">Acesso autorizado</h2></div>
    <p className="text-muted-foreground text-sm mt-3">Entre com uma conta cadastrada no Supabase e previamente habilitada pela administração da GVS.</p>
    <form onSubmit={signIn} className="mt-6 space-y-4">
     <label className="block text-sm font-semibold">E-mail<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-lg p-3 mt-2 bg-background"/></label>
     <label className="block text-sm font-semibold">Senha<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-lg p-3 mt-2 bg-background"/></label>
     <button type="submit" disabled={busy} className="w-full bg-primary text-white rounded-lg py-3 font-semibold disabled:opacity-50">{busy?'Verificando...':'Entrar no painel'}</button>
    </form>
   </div>}
   {authorized&&<div>
     <div className="flex flex-wrap items-center gap-3 justify-between mb-8">
       <h2 className="font-serif text-2xl font-bold">Ofertas cadastradas</h2>
       <div className="flex flex-wrap gap-2"><Link to="/admin/interessados" className="inline-flex items-center rounded-lg border bg-background px-5 py-3 font-semibold">Acompanhar interessados</Link><button onClick={clear} className="inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-5 py-3 font-semibold"><Plus className="w-5 h-5"/> Novo imóvel</button><button onClick={()=>{setToken('');setAuthorized(false);setPassword('');setRows([]);setEditing(false)}} className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 font-medium"><LogOut className="w-4 h-4"/> Sair</button></div>
     </div>
     {!editing&&<div className="space-y-3">{rows.length===0?<div className="border rounded-2xl p-10 text-center text-muted-foreground"><Building2 className="w-12 h-12 mx-auto mb-4"/>Nenhum imóvel cadastrado. Clique em Novo imóvel para começar.</div>:rows.map(row=><article key={row.id} className="border bg-card rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
       <div className="w-full sm:w-28 h-28 bg-secondary rounded-lg overflow-hidden shrink-0">{row.image_urls[0]&&<img src={row.image_urls[0]} className="w-full h-full object-cover" alt=""/>}</div>
       <div className="flex-1"><p className="font-serif text-xl font-bold">{row.title}</p><p className="text-sm text-muted-foreground">{categoryName(row.category)} · {row.neighborhood}, {row.city} · {priceLabel(row.price)}</p><p className="text-sm mt-2">Status: <strong>{row.status}</strong>{row.featured?' · Destaque':''}</p></div>
       <div className="flex gap-2"><button onClick={()=>edit(row)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white"><Pencil className="w-4 h-4"/> Editar</button><button onClick={()=>remove(row)} aria-label={'Excluir '+row.title} className="p-3 border rounded-lg text-destructive"><Trash2 className="w-4 h-4"/></button></div>
      </article>)}</div>}
     {editing&&<form onSubmit={save} className="rounded-2xl bg-card border p-5 sm:p-8">
       <div className="flex justify-between items-center gap-3 mb-7"><h3 className="font-serif text-2xl font-bold">{currentId?'Editar imóvel':'Cadastrar imóvel'}</h3><button type="button" onClick={()=>setEditing(false)} className="rounded-lg border px-4 py-2">Voltar</button></div>
       <div className="grid sm:grid-cols-2 gap-5">
        <label className="block text-sm font-semibold sm:col-span-2">Título do imóvel *<input required minLength={5} maxLength={180} value={draft.title} onChange={e=>set('title',e.target.value)} className="mt-2 w-full border bg-background rounded-lg p-3" placeholder="Ex.: Apartamento de 2 quartos em Ipanema"/></label>
        <label className="block text-sm font-semibold">Código amigável (URL)<input value={draft.slug} onChange={e=>set('slug',slugify(e.target.value))} className="mt-2 w-full border bg-background rounded-lg p-3" placeholder="Gerado a partir do título"/></label>
        <label className="block text-sm font-semibold">Categoria *<select value={draft.category} onChange={e=>set('category',e.target.value as PropertyCategory)} className="mt-2 w-full border bg-background rounded-lg p-3">{propertyCategories.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label>
        <label className="block text-sm font-semibold">Tipo de imóvel<input value={draft.kind} onChange={e=>set('kind',e.target.value)} className="mt-2 w-full border bg-background rounded-lg p-3" placeholder="Apartamento, casa, cobertura..."/></label>
        <label className="block text-sm font-semibold">Bairro<input value={draft.neighborhood} onChange={e=>set('neighborhood',e.target.value)} className="mt-2 w-full border bg-background rounded-lg p-3"/></label>
        <label className="block text-sm font-semibold">Cidade<input value={draft.city} onChange={e=>set('city',e.target.value)} className="mt-2 w-full border bg-background rounded-lg p-3"/></label>
        <label className="block text-sm font-semibold">Referência de localização (sem dados privados)<input value={draft.address_summary} onChange={e=>set('address_summary',e.target.value)} className="mt-2 w-full border bg-background rounded-lg p-3" placeholder="Próximo à praia, metrô..."/></label>
        <label className="block text-sm font-semibold">Preço em reais (sem separadores)<input inputMode="decimal" type="number" min="0" step="0.01" value={draft.price??''} onChange={e=>set('price',numberOrNull(e.target.value))} className="mt-2 w-full border bg-background rounded-lg p-3" placeholder="Ex.: 850000"/></label>
        {([['bedrooms','Quartos'],['bathrooms','Banheiros'],['parking','Vagas'],['area_m2','Área privativa (m²)']] as const).map(([field,label])=><label key={field} className="block text-sm font-semibold">{label}<input type="number" min="0" step={field==='area_m2'?'0.01':'1'} value={draft[field]??''} onChange={e=>set(field,numberOrNull(e.target.value))} className="mt-2 w-full border bg-background rounded-lg p-3"/></label>)}
        <label className="block text-sm font-semibold sm:col-span-2">Descrição do imóvel<textarea value={draft.description} onChange={e=>set('description',e.target.value)} rows={5} className="mt-2 w-full border bg-background rounded-lg p-3" placeholder="Descreva o imóvel, diferenciais e informações verificadas."/></label>
        <label className="block text-sm font-semibold sm:col-span-2">Destaques (um por linha)<textarea value={highlightsText} onChange={e=>setHighlightsText(e.target.value)} rows={3} className="mt-2 w-full border bg-background rounded-lg p-3" placeholder="Próximo ao metrô&#10;Varanda"/></label>
       </div>
       <div className="mt-7"><label className="inline-flex items-center gap-2 font-semibold cursor-pointer border rounded-lg px-5 py-3"><ImagePlus className="w-5 h-5 text-accent"/> Enviar fotografias <input type="file" multiple accept="image/png,image/jpeg,image/webp" onChange={e=>{void addPhotos(e.target.files);e.target.value=''}} className="sr-only" disabled={busy}/></label><p className="text-xs text-muted-foreground mt-2">Até 12 imagens JPG, PNG ou WebP, cada uma com até 5 MB. Publique apenas fotos com direito de uso.</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3 mt-4">{draft.image_urls.map((url,i)=><div key={url+i} className="relative aspect-square overflow-hidden rounded-lg border"><img src={url} alt={'Foto '+(i+1)} className="w-full h-full object-cover"/><button type="button" onClick={()=>set('image_urls',draft.image_urls.filter((_,j)=>i!==j))} className="absolute top-1 right-1 rounded bg-white text-destructive px-2 py-1 text-xs">Remover</button></div>)}</div>
       </div>
       <div className="mt-7 flex flex-col sm:flex-row gap-5 sm:items-end">
        <label className="block text-sm font-semibold">Publicação<select value={draft.status} onChange={e=>set('status',e.target.value as PropertyStatus)} className="block mt-2 border bg-background rounded-lg p-3"><option value="rascunho">Rascunho (privado)</option><option value="publicado">Publicado (público)</option><option value="indisponivel">Indisponível (privado)</option></select></label>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={draft.featured} onChange={e=>set('featured',e.target.checked)}/> Destacar no catálogo</label>
       </div>
       <p className="mt-5 text-sm text-muted-foreground">Antes de publicar, confirme autorização, preço, características, documentação e disponibilidade. A publicação é uma ação explícita.</p>
       <button type="submit" disabled={busy} className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-7 py-3 font-semibold disabled:opacity-50"><Save className="w-5 h-5"/> {busy?'Salvando...':'Salvar imóvel'}</button>
     </form>}
     <p className="text-xs text-muted-foreground mt-7">Somente usuários autorizados pela GVS podem cadastrar, alterar ou publicar imóveis. As fotos públicas continuam acessíveis mesmo que a oferta fique indisponível; não envie documentos confidenciais.</p>
   </div>}
   {status&&<p role="status" className="mt-5 border rounded-lg p-4 text-primary">{status}</p>}
   {error&&<p role="alert" className="mt-5 border border-destructive rounded-lg p-4 text-destructive">{error}</p>}
   <Link to="/imoveis/ofertas" className="inline-flex items-center gap-2 mt-8 text-primary hover:underline"><ArrowLeft className="w-4 h-4"/> Ver catálogo público</Link>
  </div>
 </Layout>;
}
