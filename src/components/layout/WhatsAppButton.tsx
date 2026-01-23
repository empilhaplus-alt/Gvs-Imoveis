import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const whatsappLink = 'https://wa.me/5521999999999?text=Olá! Gostaria de mais informações sobre os imóveis.';

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <div className="relative">
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
        
        {/* Button */}
        <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Fale pelo WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-foreground" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
