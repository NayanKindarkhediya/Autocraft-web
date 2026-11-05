import { useOutletContext } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import Services from '../components/sections/Services';
import Work from '../components/sections/Work';
import WhyUs from '../components/sections/WhyUs';
import Process from '../components/sections/Process';
import Founder from '../components/sections/Founder';
import About from '../components/sections/About';
import TechWall from '../components/sections/TechWall';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

export default function Home() {
  const ctx = useOutletContext();
  useSEO({ description: 'AutoCraft Web builds websites, web apps and digital experiences crafted to make brands impossible to ignore.' });
  return (
    <>
      <Hero loaded={ctx?.loaded ?? true} />
      <Marquee />
      <Services />
      <Work />
      <WhyUs />
      <Process />
      <Founder />
      <About />
      <TechWall />
      <Testimonials />
      <Contact />
    </>
  );
}
