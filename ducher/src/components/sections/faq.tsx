import { MessageCircle } from 'lucide-react';

import { Reveal } from '@/components/common/reveal';
import { Section, SectionHeading } from '@/components/common/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { faq, waMessages, whatsappUrl } from '@/content/business';

export function Faq() {
  return (
    <Section id="duvidas" ariaLabelledby="duvidas-title">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="duvidas-title"
              align="left"
              eyebrow="Dúvidas frequentes"
              title={
                <>
                  Perguntas que a gente <span className="italic text-primary">ouve todo dia</span>
                </>
              }
              description="Se a sua não estiver aqui, é só chamar no WhatsApp — respondemos durante o horário da loja."
            />

            <Reveal delay={0.18} className="mt-8">
              <Button asChild variant="default">
                <a href={whatsappUrl(waMessages.general)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Tirar uma dúvida
                </a>
              </Button>
            </Reveal>
          </div>

          <Reveal direction="left" amount={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem key={item.question} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
