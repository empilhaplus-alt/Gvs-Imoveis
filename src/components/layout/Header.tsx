import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/lancamentos', label: 'Lançamentos' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const whatsappLink = 'https://wa.me/5521999999999?text=Olá! Gostaria de mais informações sobre os imóveis.';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-primary">Gvs Imóveis</span>
              <span className="text-xs text-muted-foreground -mt-1">Lançamentos Exclusivos</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href)
                    ? 'text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-accent'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Phone className="w-4 h-4" />
                Fale Conosco
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                <Button className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  <Phone className="w-4 h-4" />
                  Fale Conosco
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
