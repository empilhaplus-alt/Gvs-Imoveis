import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/properties';
import { Button } from '@/components/ui/button';

type StatusFilter = 'todos' | 'lancamento' | 'em-obras' | 'pronto';

const Lancamentos = () => {
  const [filter, setFilter] = useState<StatusFilter>('todos');

  const filteredProperties = filter === 'todos' 
    ? properties 
    : properties.filter(p => p.status === filter);

  const filters: { value: StatusFilter; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'lancamento', label: 'Lançamentos' },
    { value: 'em-obras', label: 'Em Obras' },
    { value: 'pronto', label: 'Prontos' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container text-center text-primary-foreground">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Lançamentos Imobiliários
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Confira os empreendimentos mais recentes e encontre o imóvel ideal para você e sua família.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-secondary/50 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? 'default' : 'outline'}
                onClick={() => setFilter(f.value)}
                className="min-w-[100px]"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          {filteredProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhum imóvel encontrado com o filtro selecionado.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Lancamentos;
