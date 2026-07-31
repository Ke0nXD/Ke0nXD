import { Clock, Instagram, Mail, MapPin, Navigation, Phone } from 'lucide-react';

import { Reveal, RevealGroup, RevealItem } from '@/components/common/reveal';
import { Section, SectionHeading } from '@/components/common/section';
import { WhatsAppGlyph } from '@/components/common/whatsapp-fab';
import { Button } from '@/components/ui/button';
import { contact, openingHours, waMessages, whatsappUrl } from '@/content/business';
import { ContactForm } from './contact-form';

const channels = [
  {
    icon: WhatsAppGlyph,
    label: 'WhatsApp',
    value: contact.phoneDisplay,
    href: whatsappUrl(waMessages.general),
    external: true,
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: contact.phoneDisplay,
    href: `tel:${contact.phoneHref}`,
    external: false,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: contact.instagramHandle,
    href: contact.instagram,
    external: true,
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: contact.email,
    href: `mailto:${contact.email}`,
    external: false,
  },
];

export function Contact() {
  return (
    <Section id="contato" ariaLabelledby="contato-title">
      <div className="container">
        <SectionHeading
          id="contato-title"
          eyebrow="Contato"
          title={
            <>
              Passe na loja ou <span className="italic text-primary">chame no WhatsApp</span>
            </>
          }
          description={`Estamos na ${contact.address.street}, no ${contact.address.district} de ${contact.address.city}. Atendimento reservado sob agendamento.`}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Coluna de informações */}
          <div className="space-y-6">
            <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <RevealItem key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noopener noreferrer' : undefined}
                      className="group flex h-full items-center gap-4 rounded-3xl border border-border bg-card/60 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-soft"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-400 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {channel.label}
                        </span>
                        <span className="block truncate text-sm font-medium">{channel.value}</span>
                      </span>
                    </a>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-card/60 p-6">
                <h3 className="flex items-center gap-2.5 font-display text-xl">
                  <MapPin className="size-5 text-primary" aria-hidden="true" />
                  Endereço
                </h3>
                <address className="mt-3 not-italic leading-relaxed text-muted-foreground">
                  {contact.address.street}
                  <br />
                  {contact.address.district} — {contact.address.city}/{contact.address.state}
                  <br />
                  CEP {contact.address.postalCode}
                </address>
                <Button asChild variant="outline" size="sm" className="mt-5">
                  <a href={contact.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation aria-hidden="true" />
                    Traçar rota
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-3xl border border-border bg-card/60 p-6">
                <h3 className="flex items-center gap-2.5 font-display text-xl">
                  <Clock className="size-5 text-primary" aria-hidden="true" />
                  Horário de funcionamento
                </h3>
                <dl className="mt-4 space-y-2.5">
                  {openingHours.map((slot) => (
                    <div
                      key={slot.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2.5 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-muted-foreground">{slot.label}</dt>
                      <dd className="text-sm font-medium tabular-nums">{slot.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
                <iframe
                  src={contact.mapsEmbedUrl}
                  title={`Mapa com a localização da DU'CHER em ${contact.address.city}`}
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block border-0 grayscale-[35%] transition-all duration-700 hover:grayscale-0"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          {/* Formulário */}
          <Reveal direction="left" amount={0.1}>
            <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-soft sm:p-8 lg:sticky lg:top-28">
              <h3 className="font-display text-2xl">Fale com a gente</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Preencha e continuamos a conversa no WhatsApp — sem cadastro, sem espera.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
