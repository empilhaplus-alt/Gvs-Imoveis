import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, BedDouble, Bath, CarFront, Home, MapPin, Maximize2, MessageCircle } from 'lucide-react';
import { getPublicProperty, categoryName, priceLabel, type Property } from '@/lib/properties';
import { whatsappUrl } from '@/lib/contact';
export default function ImovelDetalhe() {
 const { slug='' }=useParams();
 const [property,setProperty]=useState<Property|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [photo,setPhoto]=useState(0);
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
    <div className="rounded-2xl bg-secondary aspect-[4/3] overflow-hidden flex items-center justify-center">
    {property.image_urls.length>0?<img src={property.image_urls[photo]} className="w-full h-full object-cover" alt={'Imagem '+(photo+1)+' do imóvel '+property.title}/>:<Home className="w-20 h-20 text-muted-foreground/30"/>}
    </div>
    {property.image_urls.length>1&&<div className="flex gap-3 mt-4 overflow-x-auto pb-2">{property.image_urls.map((url,i)=><button key={url+i} onClick={()=>setPhoto(i)} type="button" aria-label={'Ver foto '+(i+1)} aria-pressed={photo===i} className={'w-24 h-20 shrink-0 rounded-lg overflow-hidden border-2 '+(photo===i?'border-accent':'border-transparent')}><img src={url} alt="" className="w-full h-full object-cover"/></button>)}</div>}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
      {[{Icon:BedDouble,value:property.bedrooms,label:'Quartos'},{Icon:Bath,value:property.bathrooms,label:'Banheiros'},{Icon:CarFront,value:property.parking,label:'Vagas'},{Icon:Maximize2,value:property.area_m2,label:'Área em m²'}].filter(x=>x.value!=null).map(x=><div key={x.label} className="rounded-xl border p-4"><x.Icon className="text-accent w-6 h-6"/><p className="text-xl font-bold mt-2">{x.value}</p><p className="text-sm text-muted-foreground">{x.label}</p></div>)}
    </div>
    <h2 className="font-serif text-2xl font-bold mt-9">Sobre o imóvel</h2>
    <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{property.description||'Solicite mais detalhes com nossa equipe.'}</p>
    {property.highlights.length>0&&<><h2 className="font-serif text-2xl font-bold mt-9">Destaques</h2><ul className="mt-4 list-disc list-inside text-muted-foreground space-y-2">{property.highlights.map((h,i)=><li key={i}>{h}</li>)}</ul></>}
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
