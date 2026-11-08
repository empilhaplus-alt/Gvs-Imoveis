import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';
export default function WhatsAppButton(){return <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Atendimento GVS por WhatsApp" className="fixed z-50 bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg"><MessageCircle className="w-7 h-7"/></a>}
