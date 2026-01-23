import Layout from '@/components/layout/Layout';
import { Shield, Users, Award, Target, Heart, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Transparência',
    description: 'Clareza em todas as etapas do processo de compra.'
  },
  {
    icon: Heart,
    title: 'Compromisso',
    description: 'Dedicação total à realização do seu sonho.'
  },
  {
    icon: Target,
    title: 'Excelência',
    description: 'Busca constante pela qualidade no atendimento.'
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description: 'Sempre atualizados com as melhores práticas do mercado.'
  }
];

const team = [
  { name: 'Ricardo Mendes', role: 'Diretor Comercial' },
  { name: 'Fernanda Costa', role: 'Gerente de Vendas' },
  { name: 'Bruno Almeida', role: 'Consultor Sênior' },
];

const Sobre = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container text-center text-primary-foreground">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Sobre a Gvs Imóveis
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Há mais de 15 anos realizando o sonho da casa própria no Rio de Janeiro.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="text-accent font-medium mb-2">Nossa História</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Uma Trajetória de Sucesso e Confiança
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A GVS Imóveis nasceu com a missão de transformar a experiência no 
                  mercado imobiliário, oferecendo atendimento personalizado e soluções 
                  inteligentes para compra, venda e locação de imóveis.
                </p>
                <p>
                  Com anos de experiência no setor, nosso time de especialistas trabalha com 
                  transparência, profissionalismo e foco total na satisfação dos clientes. 
                  Acreditamos que um bom negócio imobiliário vai além da transação: ele deve
                  proporcionar segurança, conforto e valorização patrimonial.
                </p>
                <p>
                  Seja para morar ou investir, estamos prontos para ajudar você a encontrar o 
                  que entendem as necessidades de cada cliente e oferecem soluções personalizadas para 
                  cada perfil.
                </p>
              </div>
            </div>
            <div className="animate-fade-in animation-delay-300">
              <div className="aspect-[4/3] rounded-2xl bg-secondary flex items-center justify-center card-shadow">
                <div className="text-center p-8">
                  <Award className="w-16 h-16 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground">Foto da Equipe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          {/* Missão */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-accent font-medium mb-2">Nossa Missão</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Realizar Sonhos com Excelência
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Proporcionar a melhor experiência na aquisição do imóvel ideal, oferecendo 
              atendimento personalizado, segurança jurídica e as melhores condições do mercado, 
              transformando sonhos em realidade.
            </p>
          </div>

          {/* Valores */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="text-center p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-20 hero-gradient">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-primary-foreground">
            <div className="animate-fade-in">
              <p className="font-serif text-5xl font-bold text-accent mb-2">500+</p>
              <p className="text-primary-foreground/80">Imóveis Vendidos</p>
            </div>
            <div className="animate-fade-in animation-delay-100">
              <p className="font-serif text-5xl font-bold text-accent mb-2">15</p>
              <p className="text-primary-foreground/80">Anos de Mercado</p>
            </div>
            <div className="animate-fade-in animation-delay-200">
              <p className="font-serif text-5xl font-bold text-accent mb-2">50+</p>
              <p className="text-primary-foreground/80">Parceiros</p>
            </div>
            <div className="animate-fade-in animation-delay-300">
              <p className="font-serif text-5xl font-bold text-accent mb-2">98%</p>
              <p className="text-primary-foreground/80">Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-accent font-medium mb-2">Nossa Equipe</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Profissionais Dedicados
            </h2>
            <p className="text-muted-foreground">
              Conheça os especialistas que vão ajudar você a encontrar o imóvel perfeito.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center p-6 bg-card rounded-xl card-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
