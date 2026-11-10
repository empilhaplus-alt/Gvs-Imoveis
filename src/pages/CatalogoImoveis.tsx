import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowRight, Building2, Home, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { listPublicProperties, categoryName, priceLabel, propertyCategories, type Property } from '@/lib/properties';
import { whatsappUrl } from '@/lib/contact';

export default function CatalogoImoveis() {
 const [items,setItems] = useState<Property[]>([]);
 const [loading,setLoading] = useState(true);
 const [error,setError] = useState('');
 const [params,setParams] = useSearchParams();
 const [search,setSearch] = useState('');
 const category=params.get('tipo')||'todos';
 useEffect(() => {let active=true;listPublicProperties().then(x=>{if(active)setItems(x)}).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);
 const filtered=useMemo(()=>items.filter(p=>(category==='todos'||p.category===category) &&
 (p.title+' '+p.neighborhood+' '+p.city+' '+p.kind).toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))),[items,category,search]);
 const setCategory=(value:string)=>setParams(value==='todos'?{}:{tipo:value});
 return <Layout>
  <section className="hero-gradient text-white py-12 md:py-20">
   <div className="container">
    <p className="text-accent font-semibold mb-3">GVS Imóveis • Portfólio</p>
    <h1 className="font-serif font-bold text-4xl md:text-5xl">Encontre o imóvel para seu próximo capítulo.</h1>
    <p className="text-white/85 text-lg mt-5 max-w-3xl">Explore imóveis novos, usados e lançamentos publicados pela GVS. Veja os detalhes e depois converse com um consultor sobre a oferta que mais interessou.</p>
   </div>
  </section>
  <section className="container py-12 md:py-16">
   <div className="flex gap-3 items-center mb-6"><SlidersHorizontal className="text-accent"/><h2 className="font-serif font-bold text-2xl">Imóveis disponíveis</h2></div>
   <div className="flex flex-col md:flex-row gap-3 mb-8">
    <label className="flex items-center gap-3 border rounded-xl px-4 flex-1 bg-background"><Search className="w-5 h-5 text-muted-foreground"/><span className="sr-only">Buscar por bairro, cidade ou imóvel</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por bairro, cidade ou imóvel" className="py-3 w-full outline-none bg-transparent" /></label>
    <label className="sr-only" htmlFor="filtro-categoria">Categoria</label>
    <select id="filtro-categoria" value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border bg-background px-4 py-3 min-w-[220px]"><option value="todos">Todas as categorias</option>{propertyCategories.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select>
   </div>
   {error && <div role="alert" className="border rounded-xl p-6 text-destructive">Não foi possível carregar o catálogo: {error}. Tente novamente mais tarde.</div>}
   {loading && <p className="text-muted-foreground py-12" role="status">Carregando imóveis...</p>}
   {!loading && !error && filtered.length===0 && <div className="rounded-2xl border bg-card p-10 md:p-14 text-center">
      <Building2 className="w-12 h-12 text-accent mx-auto"/>
      <h3 className="font-serif text-2xl font-bold mt-5">Nenhum imóvel encontrado nesta seleção</h3>
      <p className="text-muted-foreground max-w-lg mx-auto mt-3">Ainda não há ofertas publicadas com esses filtros. Nossa equipe pode ajudar você a encontrar opções disponíveis.</p>
      <a href={whatsappUrl('imóveis disponíveis')} target="_blank" rel="noopener noreferrer" className="inline-flex mt-6 bg-accent text-accent-foreground rounded-lg py-3 px-6 font-semibold">Consultar disponibilidade</a>
   </div>}
   {!loading && !error && filtered.length>0 && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filtered.map(p=><Link key={p.id} to={'/imoveis/'+p.slug} className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
     <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
       {p.image_urls[0]?<img src={p.image_urls[0]} loading="lazy" alt={'Fotografia do imóvel '+p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"/>:<div className="flex items-center justify-center h-full"><Home className="text-muted-foreground/40 w-16 h-16"/></div>}
       <span className="absolute left-4 top-4 bg-background/95 text-primary text-xs font-semibold rounded-full px-3 py-2">{categoryName(p.category)}</span>
     </div>
     <div className="p-6 flex flex-col flex-1">
      <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4"/>{[p.neighborhood,p.city].filter(Boolean).join(' • ')}</p>
      <h3 className="font-serif font-bold text-xl mt-3">{p.title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{[p.kind,p.bedrooms!=null?p.bedrooms+' quartos':'',p.area_m2!=null?p.area_m2.toLocaleString('pt-BR',{maximumFractionDigits:2})+' m²':''].filter(Boolean).join(' · ')}</p>
      <p className="text-primary font-bold text-xl mt-auto pt-5">{priceLabel(p.price)}</p>
      <span className="inline-flex items-center text-primary font-semibold gap-2 mt-4">Ver detalhes <ArrowRight className="w-4 h-4"/></span>
     </div>
    </Link>)}
   </div>}
  </section>
  <section className="bg-secondary/60 py-12"><div className="container flex flex-col md:flex-row gap-4 items-center justify-between"><div><h2 className="font-serif font-bold text-2xl">Ainda não encontrou o que procura?</h2><p className="text-muted-foreground mt-2">Converse sobre bairro, orçamento e características desejadas.</p></div><a href={whatsappUrl('um imóvel com características específicas')} target="_blank" rel="noopener noreferrer" className="bg-primary text-white rounded-lg px-6 py-3 font-semibold">Falar com a GVS</a></div></section>
 </Layout>;
}
