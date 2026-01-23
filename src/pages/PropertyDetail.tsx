import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getPropertyBySlug } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Bed, Bath, Car, Maximize2, Calendar, Building2, 
  Phone, ArrowLeft, Check, MessageCircle 
} from 'lucide-react';

const statusLabels = {
  'lancamento': 'Lançamento',
  'em-obras': 'Em Obras',
  'pronto': 'Pronto para Morar'
};

const statusColors = {
  'lancamento': 'bg-accent text-accent-foreground',
  'em-obras': 'bg-primary text-primary-foreground',
  'pronto': 'bg-green-600 text-white'
};

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getPropertyBySlug(slug) : undefined;

  const whatsappLink = property 
    ? `https://wa.me/5521999999999?text=Olá! Gostaria de saber mais sobre o ${property.name}.`
    : 'https://wa.me/5521999999999?text=Olá! Gostaria de mais informações sobre os imóveis.';

  if (!property) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Imóvel não encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
            O imóvel que você está procurando não foi encontrado.
          </p>
          <Link to="/lancamentos">
            <Button>Ver Lançamentos</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container py-4">
          <Link to="/lancamentos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Lançamentos
          </Link>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <section className="py-8 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 aspect-[16/10] rounded-xl bg-muted overflow-hidden">
              <img 
                src={property.images[0]} 
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="aspect-[16/10] rounded-xl bg-muted overflow-hidden">
                <img 
                  src={property.images[1] || property.images[0]} 
                  alt={`${property.name} - Imagem 2`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[16/10] rounded-xl bg-muted overflow-hidden">
                <img 
                  src={property.images[2] || property.images[0]} 
                  alt={`${property.name} - Imagem 3`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Info */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <div className="animate-fade-in">
                <Badge className={`${statusColors[property.status]} mb-4`}>
                  {statusLabels[property.status]}
                </Badge>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {property.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{property.neighborhood}, {property.city}</span>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in animation-delay-100">
                <div className="p-4 bg-secondary/50 rounded-xl text-center">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-foreground">{property.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">Quartos</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl text-center">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-foreground">{property.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Banheiros</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl text-center">
                  <Car className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-foreground">{property.parkingSpots}</p>
                  <p className="text-xs text-muted-foreground">Vagas</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl text-center">
                  <Maximize2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-foreground">{property.area}</p>
                  <p className="text-xs text-muted-foreground">Área</p>
                </div>
              </div>

              {/* Description */}
              <div className="animate-fade-in animation-delay-200">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Sobre o Empreendimento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features List */}
              <div className="animate-fade-in animation-delay-300">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Diferenciais
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="animate-fade-in animation-delay-400">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Localização
                </h2>
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">
                    {property.location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card p-6 rounded-2xl card-shadow animate-fade-in">
                {/* Price */}
                <div className="pb-6 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Valor</p>
                  <p className="font-serif text-3xl font-bold text-primary">
                    {property.priceRange}
                  </p>
                </div>

                {/* Info */}
                <div className="py-6 space-y-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Construtora</p>
                      <p className="text-sm font-medium text-foreground">{property.constructionCompany}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Previsão de Entrega</p>
                      <p className="text-sm font-medium text-foreground">{property.deliveryDate}</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 space-y-3">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                      <MessageCircle className="w-5 h-5" />
                      Falar pelo WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+5521999999999">
                    <Button size="lg" variant="outline" className="w-full gap-2">
                      <Phone className="w-5 h-5" />
                      Ligar Agora
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Atendimento de segunda a sábado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PropertyDetail;
