import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Differentials } from '@/components/sections/differentials';
import { Faq } from '@/components/sections/faq';
import { Gallery } from '@/components/sections/gallery';
import { Hero } from '@/components/sections/hero';
import { Process } from '@/components/sections/process';
import { Services } from '@/components/sections/services';
import { Testimonials } from '@/components/sections/testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Differentials />
      <Gallery />
      <Testimonials />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
