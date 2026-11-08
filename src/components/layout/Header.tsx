import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, Phone } from 'lucide-react';
import { company, whatsappUrl } from '@/lib/contact';
const links = [{to:'/',label:'Início'},{to:'/imoveis',label:'Imóveis'},{to:'/consorcios',label:'Consórcios'},{to:'/sobre',label:'Sobre a GVS'},{to:'/contato',label:'Contato'}];
export default function Header(){
 const [open,setOpen]=useState(false);const {pathname}=useLocation();
 return <header className="fixed inset-x-0 top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
 <div className="container h-20 flex justify-between items-center gap-3">
 <Link to="/" className="flex items-center gap-2 shrink-0" onClick={()=>setOpen(false)}><div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center"><Building2 className="text-white w-6 h-6"/></div><div><div className="font-serif font-bold text-primary text-lg">{company.name}</div><div className="text-xs text-muted-foreground">{company.subtitle}</div></div></Link>
 <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">{links.map(x=><Link key={x.to} to={x.to} className={`text-sm font-medium hover:text-accent transition-colors ${pathname===x.to?'text-primary border-b-2 border-accent pb-1':'text-muted-foreground'}`}>{x.label}</Link>)}</nav>
 <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 rounded-lg px-4 py-3 bg-accent text-accent-foreground font-semibold text-sm"><Phone className="w-4 h-4"/>Fale conosco</a>
 <button type="button" className="lg:hidden p-2" onClick={()=>setOpen(!open)} aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open}>{open?<X/>:<Menu/>}</button></div>
 {open&&<nav className="lg:hidden container pb-4 flex flex-col gap-1 bg-background" aria-label="Navegação móvel">{links.map(x=><Link key={x.to} to={x.to} onClick={()=>setOpen(false)} className="py-3 px-3 rounded hover:bg-secondary">{x.label}</Link>)}<a className="py-3 px-3 bg-accent rounded text-accent-foreground font-semibold" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Fale conosco</a></nav>}</header>
}
