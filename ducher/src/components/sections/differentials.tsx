import { RevealGroup, RevealItem } from '@/components/common/reveal';
import { Section, SectionHeading } from '@/components/common/section';
import { differentials } from '@/content/business';

export function Differentials() {
  return (
    <Section id="diferenciais" ariaLabelledby="diferenciais-title" className="overflow-hidden">
      {/* Brilho decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[130px]"
      />

      <div className="container">
        <SectionHeading
          id="diferenciais-title"
          eyebrow="Por que aqui"
          title={
            <>
              O que muda quando a loja{' '}
              <span className="italic text-primary">presta atenção em você</span>
            </>
          }
          description="Não é discurso de vitrine. São as seis coisas que a gente ouve as clientes repetirem quando voltam."
        />

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {differentials.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title}>
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border bg-card/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lift">
                  {/* Gradiente que revela no hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-primary/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-5 font-display text-xl">{item.title}</h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
