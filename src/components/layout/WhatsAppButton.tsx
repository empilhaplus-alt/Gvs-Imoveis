import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { whatsappUrl } from '@/lib/contact';

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setFormVisible(false);
    if (pathname !== '/consorcios') return;

    const section = document.getElementById('atendimento-consorcios');
    if (!section) return;

    // Oculta o botão flutuante enquanto o formulário está visível,
    // inclusive ao rolar a página ou redimensionar a janela.
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -36px 0px', threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  // Contato já possui acesso direto ao WhatsApp.
  if (pathname === '/contato' || (pathname === '/consorcios' && formVisible)) return null;

  return <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Atendimento GVS por WhatsApp" title="Fale com a GVS" className="fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7"/>
  </a>;
}
