import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

import { Logo } from '@/components/common/logo';
import { WhatsAppGlyph } from '@/components/common/whatsapp-fab';
import {
  brand,
  contact,
  navigation,
  services,
  waMessages,
  whatsappUrl,
} from '@/content/business';

const socials = [
  { icon: Instagram, label: 'Instagram', href: contact.instagram },
  { icon: WhatsAppGlyph, label: 'WhatsApp', href: whatsappUrl(waMessages.general) },
  { icon: Mail, label: 'E-mail', href: `mailto:${contact.email}` },
  { icon: Phone, label: 'Telefone', href: `tel:${contact.phoneHref}` },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-secondary/40">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Marca */}
          <div className="max-w-sm">
            <Logo className="h-10" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {brand.shortDescription}
            </p>

            <ul className="mt-6 flex items-center gap-2.5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    >
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mapa do site */}
          <nav aria-label="Mapa do site">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Navegação
            </h2>
            <ul className="mt-5 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coleções */}
          <nav aria-label="Coleções">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Coleções
            </h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={whatsappUrl(waMessages.service(service.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Contato
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {contact.address.street}
                  <br />
                  {contact.address.district}, {contact.address.city}/{contact.address.state}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${contact.phoneHref}`} className="transition-colors hover:text-primary">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-primary">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} {brand.legalName}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            {contact.address.city}/{contact.address.state} · {brand.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
