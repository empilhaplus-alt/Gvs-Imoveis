import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Lancamentos from './pages/Lancamentos';
import Consorcios from './pages/Consorcios';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';
import CatalogoImoveis from './pages/CatalogoImoveis';
import ImovelDetalhe from './pages/ImovelDetalhe';
import AdminImoveis from './pages/AdminImoveis';
import AdminInteressados from './pages/AdminInteressados';
const queryClient = new QueryClient();
export default function App(){return <QueryClientProvider client={queryClient}><TooltipProvider><Toaster/><Sonner/><BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Routes><Route path="/" element={<Index/>}/><Route path="/imoveis" element={<Lancamentos/>}/><Route path="/lancamentos" element={<Lancamentos/>}/><Route path="/imoveis/ofertas" element={<CatalogoImoveis/>}/><Route path="/imoveis/:slug" element={<ImovelDetalhe/>}/><Route path="/admin/imoveis" element={<AdminImoveis/>}/><Route path="/admin/interessados" element={<AdminInteressados/>}/><Route path="/consorcios" element={<Consorcios/>}/><Route path="/sobre" element={<Sobre/>}/><Route path="/contato" element={<Contato/>}/><Route path="*" element={<NotFound/>}/></Routes></BrowserRouter></TooltipProvider></QueryClientProvider>}
