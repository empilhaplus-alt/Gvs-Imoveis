import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const whatsappLink = 'https://wa.me/5521993441531?text=Olá! Gostaria de agendar uma visita.';

  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/50 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in text-shadow">
            Pronto para Encontrar
            <br />
            <span className="text-accent">Seu Novo Lar?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Entre em contato agora e receba atendimento personalizado de um de nossos consultores especializados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8">
                <Phone className="w-5 h-5 mr-2" />
                Falar pelo WhatsApp
              </Button>
            </a>
            <a href="/contato">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                Agendar Visita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/60 animate-fade-in animation-delay-400">
            Atendimento de segunda a sábado, das 9h às 18h
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
