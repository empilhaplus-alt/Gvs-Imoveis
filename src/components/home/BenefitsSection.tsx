import { Shield, Users, Calculator, FileCheck, Clock, HeadphonesIcon } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Segurança na Compra',
    description: 'Assessoria jurídica completa e documentação 100% verificada em todas as transações.'
  },
  {
    icon: Calculator,
    title: 'Simulação de Financiamento',
    description: 'Analisamos as melhores condições de crédito de acordo com o seu perfil.'
  },
  {
    icon: Users,
    title: 'Atendimento Personalizado',
    description: 'Consultores especializados para encontrar o imóvel ideal para você.'
  },
  {
    icon: FileCheck,
    title: 'Análise de Crédito Gratuita',
    description: 'Verificamos sua capacidade de financiamento sem compromisso.'
  },
  {
    icon: Clock,
    title: 'Condições de Lançamento',
    description: 'Acesso antecipado aos melhores preços e condições exclusivas.'
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Completo',
    description: 'Acompanhamento em todas as etapas, da escolha à entrega das chaves.'
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <p className="text-accent font-medium mb-2">Por que escolher a Gvs Imóveis?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benefícios de Comprar Conosco
          </h2>
          <p className="text-muted-foreground">
            Há mais de 15 anos realizando o sonho da casa própria com segurança e transparência.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group p-8 bg-card rounded-xl card-shadow hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
