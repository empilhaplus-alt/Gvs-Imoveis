import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Compradora - Residencial Vista Mar',
    content: 'Atendimento excepcional! A equipe foi muito atenciosa e me ajudou a encontrar o apartamento perfeito. Recomendo demais!',
    rating: 5,
    image: null
  },
  {
    name: 'João Santos',
    role: 'Comprador - Jardins Residence',
    content: 'Profissionalismo do início ao fim. Todas as dúvidas foram esclarecidas e o processo de compra foi muito tranquilo.',
    rating: 5,
    image: null
  },
  {
    name: 'Ana Oliveira',
    role: 'Compradora - Parque das Águas',
    content: 'Realizei o sonho da casa própria graças à Gvs Imóveis. Condições excelentes e equipe muito capacitada.',
    rating: 5,
    image: null
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <p className="text-accent font-medium mb-2">Depoimentos</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-muted-foreground">
            A satisfação dos nossos clientes é nossa maior conquista.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className="bg-card p-8 rounded-xl card-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-serif text-lg font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Imóveis Vendidos</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-primary">15</p>
              <p className="text-sm text-muted-foreground">Anos de Mercado</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-4xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Parceiros Construtoras</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
