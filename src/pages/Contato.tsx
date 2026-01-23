import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappLink = 'https://wa.me/5521999999999?text=Olá! Gostaria de mais informações sobre os imóveis.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', phone: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container text-center text-primary-foreground">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Entre em Contato
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Estamos prontos para ajudar você a encontrar o imóvel dos seus sonhos.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-fade-in">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                Fale Conosco
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow">
                  <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                    <p className="text-muted-foreground text-sm">
                      Av. das Américas, 4200 - Sala 301<br />
                      Barra da Tijuca, Rio de Janeiro - RJ<br />
                      CEP: 22640-102
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow">
                  <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                    <p className="text-muted-foreground text-sm">
                      <a href="tel:+5521999999999" className="hover:text-primary transition-colors">
                        (21) 99999-9999
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow">
                  <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                    <p className="text-muted-foreground text-sm">
                      <a href="mailto:contato@gvsimoveis.com.br" className="hover:text-primary transition-colors">
                        contato@gvsimoveis.com.br
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow">
                  <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horário</h3>
                    <p className="text-muted-foreground text-sm">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 9h às 13h
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-5 h-5" />
                  Falar pelo WhatsApp
                </Button>
              </a>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in animation-delay-300">
              <div className="bg-card p-8 rounded-2xl card-shadow">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Envie sua Mensagem
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Preencha o formulário e retornaremos em até 24 horas úteis.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Seu nome"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefone / WhatsApp *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(21) 99999-9999"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte-nos como podemos ajudar..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
