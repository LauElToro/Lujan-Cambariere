/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Pause, Instagram, Mail, ArrowUpRight, ChevronRight, Volume2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from './lib/utils';

const IMAGES = {
  hero: "https://picsum.photos/seed/lujan-hero/1920/1080",
  manifesto: "https://picsum.photos/seed/craft-hands/1200/800",
  project: "https://picsum.photos/seed/weaving-detail/800/1200",
  artisan1: "https://picsum.photos/seed/artisan-1/600/800",
  artisan2: "https://picsum.photos/seed/artisan-2/600/800",
  artisan3: "https://picsum.photos/seed/artisan-3/600/800",
  gallery1: "https://picsum.photos/seed/clay-work/800/800",
  gallery2: "https://picsum.photos/seed/wood-carving/800/1000",
  gallery3: "https://picsum.photos/seed/textile-dye/1000/800",
  gallery4: "https://picsum.photos/seed/metal-work/800/1200",
  gallery5: "https://picsum.photos/seed/basket-weaving/1200/800",
};

const ARTISANS = [
  {
    name: "Juana Pérez",
    craft: "Master Weaver",
    image: IMAGES.artisan1,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    name: "Mateo Silva",
    craft: "Ceramic Artist",
    image: IMAGES.artisan2,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    name: "Elena Rocha",
    craft: "Textile Dyer",
    image: IMAGES.artisan3,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const PHILOSOPHY_POINTS = [
  {
    title: "Design as Meaning",
    text: "Objects are not just functional; they are talismans that carry the energy and magic of their creators."
  },
  {
    title: "The Value of Handmade",
    text: "Working with hands activates a visceral intelligence, a dance of fingers that recovers ancestral knowledge."
  },
  {
    title: "Latin America: Innovation Source",
    text: "A new paradigm where ethics prevails over aesthetics, and the South becomes the new North."
  }
];

function AudioPlayer({ artisan }: { artisan: typeof ARTISANS[0] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="group relative overflow-hidden bg-beige-100 p-6 transition-all hover:bg-beige-200">
      <div className="flex items-center gap-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-earth/20">
          <img 
            src={artisan.image} 
            alt={artisan.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-ink/20 opacity-0 transition-opacity group-hover:opacity-100"
          >
            {isPlaying ? <Pause className="text-white" /> : <Play className="text-white fill-white" />}
          </button>
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-medium">{artisan.name}</h4>
          <p className="text-sm uppercase tracking-widest text-earth">{artisan.craft}</p>
          <div className="mt-4 flex items-center gap-3">
            <Volume2 className="h-4 w-4 text-earth" />
            <div className="h-1 flex-1 rounded-full bg-beige-200">
              <motion.div 
                className="h-full rounded-full bg-earth"
                initial={{ width: 0 }}
                animate={{ width: isPlaying ? "100%" : "0%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={artisan.audio} 
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 mix-blend-difference">
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-white">LC</span>
        <div className="flex gap-8">
          {['Project', 'Voices', 'Archive', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-ink">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <img 
            src={IMAGES.hero} 
            alt="Craftsmanship Hero" 
            className="h-full w-full object-cover opacity-60 grayscale-[0.3]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-7xl font-light tracking-tight md:text-9xl">
              Luján Cambariere
            </h1>
            <p className="mt-6 text-lg font-light uppercase tracking-[0.4em] opacity-80 md:text-xl">
              Craft · Design · Identity
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">Scroll to explore</span>
            <div className="h-12 w-px bg-white/20" />
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="bg-beige-50 px-6 py-32 md:px-24 md:py-48">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-earth">Manifesto</span>
            <h2 className="mt-12 text-4xl font-light leading-tight text-ink md:text-6xl italic">
              "Objects as culture. <br />
              Craftsmanship as knowledge. <br />
              Identity through making."
            </h2>
          </motion.div>
        </div>
      </section>

      {/* The Project Section */}
      <section id="project" className="bg-beige-100 px-6 py-24 md:px-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={IMAGES.project} 
              alt="Project Documentation" 
              className="aspect-[3/4] w-full object-cover shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-earth">The Project</span>
            <h3 className="text-4xl font-light md:text-5xl">Documenting the Soul of Making</h3>
            <p className="text-lg leading-relaxed text-ink/70">
              A deep exploration into the heart of Latin American craftsmanship. Through rigorous research, 
              intimate documentation, and evocative storytelling, we bridge the gap between ancestral 
              tradition and contemporary design.
            </p>
            <div className="flex flex-col gap-4 pt-4">
              {['Research & Fieldwork', 'Visual Documentation', 'Cultural Storytelling'].map((item) => (
                <div key={item} className="flex items-center gap-4 border-b border-earth/10 pb-4">
                  <ChevronRight className="h-4 w-4 text-earth" />
                  <span className="text-sm font-medium uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Voices Section */}
      <section id="voices" className="bg-beige-50 px-6 py-32 md:px-24">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-earth">Voices</span>
          <h2 className="mt-4 text-4xl font-light md:text-5xl">The Artisans' Archive</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {ARTISANS.map((artisan, index) => (
            <motion.div
              key={artisan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AudioPlayer artisan={artisan} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="archive" className="bg-ink px-6 py-32 text-white md:px-24">
        <div className="mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-earth">Archive</span>
            <h2 className="mt-4 text-4xl font-light md:text-6xl">Process & Texture</h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-relaxed opacity-60">
            A visual study of materials and the human touch. Every object tells a story of patience and precision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-4 md:row-span-2"
          >
            <img src={IMAGES.gallery1} alt="Process 1" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-8"
          >
            <img src={IMAGES.gallery5} alt="Process 5" className="h-[400px] w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-4"
          >
            <img src={IMAGES.gallery2} alt="Process 2" className="h-[400px] w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-4"
          >
            <img src={IMAGES.gallery3} alt="Process 3" className="h-[400px] w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-beige-50 px-6 py-32 md:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-24 md:grid-cols-3">
            {PHILOSOPHY_POINTS.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="space-y-6"
              >
                <div className="h-px w-12 bg-earth" />
                <h3 className="text-2xl font-medium italic">{point.title}</h3>
                <p className="text-lg leading-relaxed text-ink/70">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="border-y border-earth/10 bg-beige-50 py-24">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-earth/50">Supported by</span>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-16 opacity-40 grayscale transition-opacity hover:opacity-100">
            <span className="text-2xl font-serif tracking-widest">BRITISH COUNCIL</span>
            <span className="text-2xl font-serif tracking-widest">EXPERIMENTA</span>
            <span className="text-2xl font-serif tracking-widest">MALBA</span>
            <span className="text-2xl font-serif tracking-widest">V&A MUSEUM</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-beige-100 px-6 py-32 md:px-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-5xl font-light md:text-7xl">Let's build <br /> together.</h2>
            <p className="max-w-md text-lg text-ink/60">
              We are looking for collaborators and institutions to support the documentation 
              and preservation of these vital cultural narratives.
            </p>
            <div className="flex gap-6">
              <a href="mailto:info@lujancambariere.com" className="group flex h-14 w-14 items-center justify-center rounded-full border border-earth/20 transition-all hover:bg-earth hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/lujancambariere" className="group flex h-14 w-14 items-center justify-center rounded-full border border-earth/20 transition-all hover:bg-earth hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col justify-end space-y-12">
            <button className="group flex items-center justify-between border-b border-ink/20 pb-8 text-3xl font-light transition-colors hover:border-earth">
              <span>Collaborate</span>
              <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <button className="group flex items-center justify-between border-b border-ink/20 pb-8 text-3xl font-light transition-colors hover:border-earth">
              <span>Support the Project</span>
              <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-beige-100 px-8 py-12 text-center border-t border-earth/5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-earth/60">
          © 2026 Luján Cambariere · All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
