import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { whatsappUrl } from '@/lib/contact';
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  // A página de contato já oferece dois caminhos diretos para WhatsApp.
  // Esconder a bolha ali evita cobrir campos e botões em telas pequenas.
  if (pathname === '/contato') return null;
  return <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Atendimento GVS por WhatsApp" title="Fale com a GVS" className="fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7"/>
  </a>;
}
