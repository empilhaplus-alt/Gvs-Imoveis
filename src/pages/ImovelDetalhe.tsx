import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, ArrowRight, BedDouble, Bath, CarFront, Home, MapPin, Maximize2, MessageCircle } from 'lucide-react';
import { getPublicProperty, categoryName, priceLabel, type Property } from '@/lib/properties';
import { whatsappUrl } from '@/lib/contact';
export default function ImovelDetalhe() {
 const { slug='' }=useParams();
 const [property,setProperty]=useState<Property|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [photo,setPhoto]=useState(0);
 const areaLabel=(area:number)=>area.toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:2});
 const goToPhoto=(direction:-1|1)=>{ if(!property?.image_urls.length)return; setPhoto(current=>(current+direction+property.image_urls.length)%property.image_urls.length); };
 const thumbnailPage=Math.floor(photo/5)*5;
 useEffect(()=>{let active=true;setLoading(true);setPhoto(0);getPublicProperty(slug).then(x=>{if(active)setProperty(x)}).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[slug]);
 return <Layout><div className="container py-10 md:py-14">
 <Link to="/imoveis/ofertas" className="inline-flex gap-2 items-center text-primary font-semibold hover:underline"><ArrowLeft className="w-4 h-4"/> Voltar às ofertas</Link>
 {loading && <p className="mt-12" role="status">Carregando informações...</p>}
 {error && <p role="alert" className="mt-10 text-destructive">Não foi possível carregar este imóvel: {error}</p>}
 {!loading && !error && !property && <div className="mt-10 rounded-xl border p-10"><h1 className="font-serif text-3xl font-bold">Imóvel não encontrado</h1><p className="text-muted-foreground mt-3">Esta oferta pode ter sido retirada ou ainda não está disponível ao público.</p></div>}
 {property && <>
  <p className="text-accent font-semibold mt-8">{categoryName(property.category)}</p>
  <h1 className="font-serif text-3xl md:text-5xl font-bold mt-2">{property.title}</h1>
  <p className="flex gap-2 items-center text-muted-foreground mt-4"><MapPin className="w-5 h-5"/>{[property.neighborhood,property.city].filter(Boolean).join(', ')}</p>
  <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(290px,0.6fr)] gap-8 mt-8">
   <div>
    <div
      className="relative rounded-2xl bg-secondary aspect-[4/3] overflow-hidden flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      role="region"
      aria-label="Galeria de fotografias do imóvel"
      tabIndex={property.image_urls.length>1?0:undefined}
      onKeyDown={event=>{
        if(event.key==='ArrowLeft'){event.preventDefault();goToPhoto(-1);}
        if(event.key==='ArrowRight'){event.preventDefault();goToPhoto(1);}
      }}
    >
      {property.image_urls.length>0
        ? <img src={property.image_urls[photo]} className="w-full h-full object-cover" alt={'Foto '+(photo+1)+' de '+property.image_urls.length+' do imóvel '+property.title}/>
        : <Home className="w-20 h-20 text-muted-foreground/30"/>}
      {property.image_urls.length>1&&<>
        <button type="button" onClick={()=>goToPhoto(-1)} aria-label="Foto anterior" className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background rounded-full p-3 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"><ArrowLeft className="w-5 h-5"/></button>
        <button type="button" onClick={()=>goToPhoto(1)} aria-label="Próxima foto" className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background rounded-full p-3 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"><ArrowRight className="w-5 h-5"/></button>
        <span className="absolute bottom-4 right-4 rounded-full bg-primary/85 text-white text-sm font-semibold px-3 py-1" aria-live="polite">{photo+1} / {property.image_urls.length}</span>
      </>}
    </div>
    {property.image_urls.length>1&&<div className="flex items-center gap-2 mt-4" aria-label="Miniaturas da galeria">
      <button type="button" onClick={()=>goToPhoto(-1)} aria-label="Voltar uma foto" className="shrink-0 rounded-lg border p-2 hover:bg-secondary"><ArrowLeft className="w-4 h-4"/></button>
      <div className="grid grid-cols-5 gap-2 flex-1 min-w-0">
        {property.image_urls.slice(thumbnailPage,thumbnailPage+5).map((url,i)=>{
          const index=thumbnailPage+i;
          return <button key={url+index} onClick={()=>setPhoto(index)} type="button" aria-label={'Selecionar foto '+(index+1)} aria-pressed={photo===index} className={'aspect-[4/3] min-w-0 rounded-lg overflow-hidden border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent '+(photo===index?'border-accent':'border-transparent')}><img src={url} alt="" loading="lazy" className="w-full h-full object-cover"/></button>;
        })}
      </div>
      <button type="button" onClick={()=>goToPhoto(1)} aria-label="Avançar uma foto" className="shrink-0 rounded-lg border p-2 hover:bg-secondary"><ArrowRight className="w-4 h-4"/></button>
    </div>}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
      {[{Icon:BedDouble,value:property.bedrooms,label:'Quartos'},{Icon:Bath,value:property.bathrooms,label:'Banheiros'},{Icon:CarFront,value:property.parking,label:'Vagas'},{Icon:Maximize2,value:property.area_m2,label:'Área em m²'}].filter(x=>x.value!=null).map(x=><div key={x.label} className="rounded-xl border p-4"><x.Icon className="text-accent w-6 h-6"/><p className="text-xl font-bold mt-2">{x.label==='Área em m²'?areaLabel(x.value as number):x.value}</p><p className="text-sm text-muted-foreground">{x.label}</p></div>)}
    </div>
    <h2 className="font-serif text-2xl font-bold mt-9">Sobre o imóvel</h2>
    <div className="mt-4 text-muted-foreground leading-relaxed space-y-4 max-w-prose">{(property.description?.trim()||'Solicite mais detalhes com nossa equipe.').split(/\n\s*\n/).filter(Boolean).map((paragraph,i)=><p key={i} className="whitespace-pre-line">{paragraph.trim()}</p>)}</div>
    {property.highlights.length>0&&<><h2 className="font-serif text-2xl font-bold mt-9">Destaques</h2><ul className="mt-4 grid sm:grid-cols-2 gap-3">{property.highlights.map((h,i)=><li key={i} className="flex gap-3 items-start rounded-xl bg-secondary/60 p-4 text-muted-foreground"><span aria-hidden="true" className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0"/>{h}</li>)}</ul></>}
   </div>
   <aside className="lg:sticky lg:top-28 self-start rounded-2xl border bg-card p-7 shadow-sm">
    <p className="text-sm text-muted-foreground">Valor anunciado</p><p className="font-serif font-bold text-3xl text-primary mt-2">{priceLabel(property.price)}</p>
    <p className="mt-5 text-muted-foreground text-sm">Código da oferta: {property.id.slice(0,8).toUpperCase()}</p>
    <a href={whatsappUrl('o imóvel '+property.title+' (código '+property.id.slice(0,8).toUpperCase()+')')} target="_blank" rel="noopener noreferrer" className="mt-6 bg-accent text-accent-foreground rounded-lg px-5 py-4 w-full inline-flex justify-center items-center font-semibold gap-2"><MessageCircle className="w-5 h-5"/> Tenho interesse neste imóvel</a>
    <p className="mt-5 text-xs text-muted-foreground leading-relaxed">Confirme disponibilidade, documentação, preço e condições com a equipe antes de qualquer compromisso.</p>
   </aside>
  </div>
 </>}
 </div></Layout>;
}
