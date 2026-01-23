import { ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-building.jpg';
const HeroSection = () => {
  const whatsappLink = 'https://wa.me/5521999999999?text=Olá! Gostaria de mais informações sobre os lançamentos imobiliários.';

  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Especialistas em Lançamentos</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-shadow">
              Seu novo lar
              <br />
              <span className="text-accent">começa aqui</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
              Encontre o imóvel dos seus sonhos com condições exclusivas de lançamento. 
              Atendimento personalizado e as melhores oportunidades do mercado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8">
                  Fale com um Consultor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="/lancamentos">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                  Ver Lançamentos
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-primary-foreground/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">+500</p>
                  <p className="text-xs text-primary-foreground/60">Imóveis Vendidos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">15 Anos</p>
                  <p className="text-xs text-primary-foreground/60">de Experiência</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">24h</p>
                  <p className="text-xs text-primary-foreground/60">Atendimento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Illustration Area */}
          <div className="hidden lg:block relative animate-fade-in animation-delay-300">
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Empreendimento de luxo Gvs Imóveis" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl animate-float">
                <p className="text-xs text-muted-foreground mb-1">Condições especiais</p>
                <p className="font-serif text-2xl font-bold text-primary">Entrada facilitada</p>
                <p className="text-sm text-accent font-medium">Até 48x para entrada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
