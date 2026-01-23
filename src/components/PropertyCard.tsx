import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Car, Maximize2 } from 'lucide-react';
import { Property } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

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

const PropertyCard = ({ property, className = '' }: PropertyCardProps) => {
  return (
    <article className={`group bg-card rounded-xl overflow-hidden card-shadow hover-lift ${className}`}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className={`absolute top-4 left-4 ${statusColors[property.status]}`}>
          {statusLabels[property.status]}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{property.neighborhood}, {property.city}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {property.name}
        </h3>

        {/* Short Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {property.shortDescription}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 py-4 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} Quartos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} Banho{property.bathrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="w-4 h-4" />
            <span>{property.parkingSpots} Vaga{property.parkingSpots > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">A partir de</p>
            <p className="font-serif text-lg font-bold text-primary">{property.priceRange.replace('A partir de ', '')}</p>
          </div>
          <Link to={`/imovel/${property.slug}`}>
            <Button variant="default" size="sm">
              Saiba Mais
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
