import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">Gvs Imóveis</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Especialistas em lançamentos imobiliários no Rio de Janeiro. 
              Realizamos o sonho da casa própria há mais de 15 anos.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/lancamentos', label: 'Lançamentos' },
                { href: '/sobre', label: 'Sobre Nós' },
                { href: '/contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>Consultoria Imobiliária</li>
              <li>Simulação de Financiamento</li>
              <li>Assessoria Jurídica</li>
              <li>Análise de Crédito</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/70">
                  Rua Visconde de Pirajá, 414 - Sala 818<br />
                  Ipanema, Rio de Janeiro - RJ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+5521993441531"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  (21) 99344-1531
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:contato@gvsimoveis.com.br"
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  contato@gvsimoveis.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {currentYear} Gvs Imóveis. Todos os direitos reservados.</p>
            <p>CRECI-RJ: 10691-J</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
