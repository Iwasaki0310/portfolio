import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Profile from "@/components/Profile";
import Studies from "@/components/Studies";
import Works from "@/components/Works";
import Skills from "@/components/Skills";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Preloader />
      <Header />
      <Hero />
      <Marquee />
      <Profile />
      <Studies />
      <Works />
      <Skills />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
