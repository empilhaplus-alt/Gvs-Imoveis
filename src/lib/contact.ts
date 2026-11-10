export const company = {
  name: 'GVS Imóveis',
  subtitle: 'Imóveis e Consórcios',
  phone: '5521993441531',
  phoneDisplay: '(21) 99344-1531',
  email: 'contato@gvsimoveis.com.br',
  address: 'Rua Visconde de Pirajá, 414, sala 718 — Ipanema, Rio de Janeiro/RJ',
  creci: 'CRECI-RJ 10691-J',
};
export const whatsappUrl = (subject = 'Atendimento GVS') => 
  `https://wa.me/${company.phone}?text=${encodeURIComponent(`Olá! Gostaria de informações sobre ${subject}.`)}`;
