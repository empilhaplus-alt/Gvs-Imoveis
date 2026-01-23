import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProperties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';

const FeaturedProperties = () => {
  const featuredProperties = getFeaturedProperties();

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="animate-fade-in">
            <p className="text-accent font-medium mb-2">Oportunidades Exclusivas</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Lançamentos em Destaque
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Conheça os empreendimentos mais procurados com condições especiais de lançamento.
            </p>
          </div>
          <Link to="/lancamentos" className="animate-fade-in animation-delay-200">
            <Button variant="outline" className="gap-2">
              Ver Todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, index) => (
            <div
              key={property.id}
              className={`animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
