'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Select, Textarea } from '@/components/ui/field';
import { contact, services } from '@/content/business';

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Digite seu nome.')
    .max(80, 'Nome muito longo.'),
  phone: z
    .string()
    .trim()
    .min(10, 'Informe um telefone com DDD.')
    .max(20, 'Telefone muito longo.')
    .regex(/^[\d\s()+-]+$/, 'Use apenas números, espaços e os sinais ( ) + -'),
  interest: z.string().min(1, 'Escolha uma opção.'),
  message: z
    .string()
    .trim()
    .min(10, 'Conte um pouco mais — pelo menos 10 caracteres.')
    .max(1000, 'Mensagem muito longa.'),
  // Campo-isca invisível: bots preenchem, humanos não.
  website: z.string().max(0, 'Envio bloqueado.').optional(),
});

type FormValues = z.infer<typeof schema>;

/**
 * O formulário não depende de backend: monta uma mensagem estruturada e
 * abre o WhatsApp da loja. Se um dia existir uma API, basta trocar o corpo
 * de `onSubmit` — a validação e os estados de UI continuam iguais.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', interest: '', message: '', website: '' },
  });

  const onSubmit = async (values: FormValues) => {
    const text = [
      `Olá! Vim pelo site da DU'CHER.`,
      '',
      `*Nome:* ${values.name}`,
      `*Telefone:* ${values.phone}`,
      `*Interesse:* ${values.interest}`,
      '',
      values.message,
    ].join('\n');

    window.open(
      `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setSent(true);
    reset();
    window.setTimeout(() => setSent(false), 7000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — escondido de humanos, não de bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          <span id="name-error">
            <FieldError>{errors.name?.message}</FieldError>
          </span>
        </div>

        <div>
          <Label htmlFor="phone">WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(37) 90000-0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          <span id="phone-error">
            <FieldError>{errors.phone?.message}</FieldError>
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="interest">Sobre o que é?</Label>
        <Select
          id="interest"
          aria-invalid={!!errors.interest}
          aria-describedby={errors.interest ? 'interest-error' : undefined}
          defaultValue=""
          {...register('interest')}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Outro assunto">Outro assunto</option>
        </Select>
        <span id="interest-error">
          <FieldError>{errors.interest?.message}</FieldError>
        </span>
      </div>

      <div>
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          placeholder="Conte o que você procura, seu tamanho habitual, ou só diga que não faz ideia — a gente ajuda."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        <span id="message-error">
          <FieldError>{errors.message?.message}</FieldError>
        </span>
      </div>

      <Button type="submit" size="lg" variant="default" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            Enviar pelo WhatsApp
          </>
        )}
      </Button>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Ao enviar, abrimos uma conversa no WhatsApp com os dados já preenchidos. Nada é armazenado
        neste site.
      </p>

      {/* Confirmação — anunciada por leitores de tela. */}
      <div aria-live="polite" className="min-h-0">
        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/8 px-4 py-3 text-sm text-foreground"
            >
              <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
              Conversa aberta no WhatsApp. Se não abriu, verifique o bloqueador de pop-ups.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
