import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  Zap,
  Smartphone,
  Shield,
  Home,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Cpu,
  Wifi,
  Lightbulb,
  Lock,
  MessageSquare,
  Mail,
  Calendar,
  ArrowRight,
  Database,
  ExternalLink
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para lidar com o scroll suave (VERSÃO CORRIGIDA PARA MOBILE)
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false); // Fecha o menu mobile

    // Pequeno delay para garantir que o menu fechou antes do scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80; // Ajuste para o header fixo
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deep-navy/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-neon-blue/30 rounded-full border-t-neon-blue"
              />
              <div className="w-2 h-2 bg-neon-orange rounded-full shadow-[0_0_10px_var(--color-neon-orange)]" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider">
              AL <span className="text-neon-blue font-light">Casa Inteligente</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Soluções', 'Vantagens', 'Packs', 'Sobre'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-orange transition-all group-hover:w-full" />
              </a>
            ))}

            {/* Botão Simular */}
            <a
              href="https://alcasainteligente.github.io/equipamentos/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-neon-blue/10 border border-neon-blue/50 text-neon-blue hover:bg-neon-blue hover:text-white transition-all duration-300 rounded-sm uppercase text-xs tracking-widest font-bold flex items-center gap-2 group"
            >
              <Database className="w-4 h-4" />
              Simular
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="px-5 py-2 bg-neon-orange/10 border border-neon-orange/50 text-neon-orange hover:bg-neon-orange hover:text-white transition-all duration-300 rounded-sm uppercase text-xs tracking-widest font-bold flex items-center gap-2 group"
            >
              Agendar Visita
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-deep-navy border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-8 space-y-4">
              {['Soluções', 'Vantagens', 'Packs', 'Sobre'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                  className="block text-gray-300 hover:text-neon-blue py-2 font-display uppercase tracking-widest"
                >
                  {item}
                </a>
              ))}

              {/* Botão Simular no mobile */}
              <a
                href="https://alcasainteligente.github.io/equipamentos/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-neon-blue/10 border border-neon-blue/50 text-neon-blue font-bold uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Database className="w-4 h-4" />
                  Simular
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="block w-full text-center py-3 bg-neon-orange text-white font-bold uppercase tracking-widest mt-4"
              >
                Agendar Visita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Função para scroll suave (VERSÃO CORRIGIDA)
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0a1a3a_0%,#050A14_70%)]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />

      {/* Animated Grid/HUD */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Orbital Rings */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-neon-blue/10 rounded-full border-t-neon-blue/50 border-r-transparent"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-neon-orange/10 rounded-full border-b-neon-orange/50 border-l-transparent"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-gray-300">Sistema Online • Pronto para integrar</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          CASA <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">INTELIGENTE</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-400 text-glow">SEM OBRAS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Instalação de domótica no Montijo, Margem Sul e Lisboa.
          <br />
          <span className="text-white font-medium">Mais conforto. Mais segurança. Controlo total.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
            className="px-6 py-3 bg-neon-orange text-white text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 orange-glow clip-path-slant relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Agendar Visita Gratuita <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <a
            href="#soluções"
            onClick={(e) => handleScroll(e, 'soluções')}
            className="px-6 py-3 bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-300"
          >
            Descobrir Soluções
          </a>
        </motion.div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="flex flex-col gap-2 font-mono text-[10px] text-neon-blue/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 border border-neon-blue" />
            <span>SYS.STATUS: NOMINAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-blue/50" />
            <span>CONN: SECURE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-panel p-8 relative group overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
      <Icon className="w-24 h-24 text-neon-blue" />
    </div>

    <div className="relative z-10">
      <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center mb-6 border border-neon-blue/20 group-hover:border-neon-blue/50 transition-colors">
        <Icon className="w-6 h-6 text-neon-blue" />
      </div>
      <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-neon-blue transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>

    {/* HUD Corners */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neon-blue/30" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neon-blue/30" />

    {/* Hover Glow */}
    <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

const Solutions = () => {
  return (
    <section id="soluções" className="py-24 relative bg-deep-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-neon-blue/20 blur-3xl opacity-20" />
            <img
              src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop"
              alt="Smart Home Control"
              className="relative rounded-sm border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* HUD Overlay on Image */}
            <div className="absolute inset-0 border border-white/10 pointer-events-none">
              <div className="absolute top-4 left-4 font-mono text-xs text-neon-blue bg-black/50 px-2 py-1 backdrop-blur-sm">
                CAM_01 // LIVING_ROOM
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-white">REC</span>
              </div>
            </div>
          </motion.div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-12 bg-neon-orange" />
              <span className="text-neon-orange uppercase tracking-widest text-sm font-bold">Sem Obras</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Instalação Inteligente <br />
              <span className="text-gray-500">Zero Complicações</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Muitos clientes procuram automação, mas temem as obras. Nós resolvemos isso.
              Instalamos sistemas de casa inteligente sem partir paredes e integramos os equipamentos que já tem.
            </p>

            <div className="space-y-4">
              {[
                "Moradias novas e usadas",
                "Apartamentos recentes",
                "Projetos de investidores",
                "Empresas de construção"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-blue" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="vantagens" className="grid md:grid-cols-3 gap-6 scroll-mt-24">
          <FeatureCard
            icon={Lightbulb}
            title="Iluminação Inteligente"
            description="Crie ambientes personalizados. Mais relaxante, mais funcional, mais elegante. Tudo controlado por voz ou app."
            delay={0}
          />
          <FeatureCard
            icon={Shield}
            title="Segurança Avançada"
            description="Simule presença quando está fora, monitorize a sua casa e receba alertas em tempo real no seu smartphone."
            delay={0.2}
          />
          <FeatureCard
            icon={Cpu}
            title="Automação Total"
            description="Rotinas que trabalham por si. 'Quero chegar a casa e já estar tudo preparado.' Nós tornamos isso realidade."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-24 relative bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Sobre a AL Casa Inteligente</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              A AL Casa Inteligente é especializada em instalação de domótica no Montijo, Margem Sul e Lisboa.
              O nosso objetivo é simples: Fazer a sua casa trabalhar para si.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Instalação sem obras",
                "Integração com sistemas existentes",
                "Atendimento personalizado",
                "Suporte pós-instalação",
                "Visita técnica gratuita"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-neon-orange rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-neon-orange/10 blur-3xl opacity-20" />
            <div className="glass-panel p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-neon-orange/20 flex items-center justify-center text-neon-orange">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Tecnologia de Ponta</h4>
                  <p className="text-xs text-gray-500">Protocolos Seguros</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic">
                "Transformamos casas comuns em lares inteligentes, seguros e eficientes, sem a dor de cabeça das obras tradicionais."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Packs = () => {
  const packs = [
    {
      name: "Essencial",
      desc: "Entrada no mundo da casa inteligente",
      features: ["Iluminação inteligente (1 divisão)", "Controlo de estore (1 divisão)", "Controlo através do smartphone", "Programações automáticas"],
      highlight: false
    },
    {
      name: "Conforto",
      desc: "Uma casa que se adapta a si",
      features: ["Iluminação Multi-divisão", "Controlo de Estores", "Cenários e rotinas inteligentes", "(Noite, Cinema, Chegar a casa)", "Assistente de voz"],
      highlight: true
    },
    {
      name: "Premium",
      desc: "Experiência completa de automação",
      features: ["Casa Toda Conectada", "Segurança & Videovigilância", "Integração Multimédia", "Sensores (movimento, porta, janela)", "Painel de Controlo Central"],
      highlight: false
    }
  ];

  return (
    <section id="packs" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-deep-navy" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Packs Casa Inteligente</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Soluções adaptadas a diferentes necessidades. Do essencial ao premium, qualidade garantida.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packs.map((pack, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative p-8 border ${pack.highlight ? 'border-neon-orange bg-neon-orange/5' : 'border-white/10 bg-white/5'} backdrop-blur-md flex flex-col`}
            >
              {pack.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-orange text-white text-xs font-bold uppercase tracking-widest">
                  Mais Popular
                </div>
              )}

              <h3 className="font-display text-2xl font-bold mb-2">{pack.name}</h3>
              <p className="text-gray-400 text-sm mb-8 h-10">{pack.desc}</p>

              <ul className="space-y-4 mb-8 flex-1">
                {pack.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 ${pack.highlight ? 'text-neon-orange' : 'text-neon-blue'}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeout(() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      const yOffset = -80;
                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className={`w-full py-2.5 text-center font-bold uppercase tracking-widest text-xs border transition-all duration-300 ${pack.highlight
                  ? 'bg-neon-orange border-neon-orange text-white hover:bg-orange-600'
                  : 'border-white/20 text-white hover:bg-white/10'
                  }`}
              >
                Saber Mais
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold mb-12 text-center">O Que Dizem os Nossos Clientes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: "Super satisfeito com a automatização da minha casa!", author: "Joel Malta", loc: "Montijo" },
            { quote: "Excelente profissionalismo. Transformaram a minha sala completamente.", author: "Ana Costa", loc: "Montijo" },
            { quote: "Com alguns LED’s e Alexa fiquei com 3 ambientes na minha sala.", author: "Sara", loc: "Lisboa" }
          ].map((t, i) => (
            <div key={i} className="p-6 border-l-2 border-neon-blue bg-white/5">
              <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-orange/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 md:p-12 border border-neon-orange/30 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Pronto para o Futuro?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Agende agora a sua visita técnica gratuita e descubra como transformar a sua casa com automação residencial sem complicações.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <a
              href="https://wa.me/351917807428"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3 bg-neon-orange text-white text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 orange-glow flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Agendar via WhatsApp
            </a>
            <a
              href="mailto:al.casa.inteligente@proton.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3 bg-transparent border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Enviar Email
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center border-t border-white/10 pt-8">
            {[
              { label: "Área", val: "Montijo e arredores, Margem Sul e Lisboa" },
              { label: "Visita", val: "Gratuita" }
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-sm font-bold text-white break-words">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "A instalação de casa inteligente exige obras?", a: "Não. Trabalhamos com soluções que evitam partir paredes, utilizando módulos que se integram nas caixas de aparelhagem existentes." },
    { q: "Posso automatizar uma casa já pronta?", a: "Sim. A maioria dos nossos projetos são em casas já concluídas. Adaptamos a tecnologia à sua casa atual." },
    { q: "A automação residencial é difícil de usar?", a: "Não. O sistema é configurado para ser simples e intuitivo. Ensinamos tudo o que precisa de saber após a instalação." }
  ];

  return (
    <section className="py-24 bg-deep-navy border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-white/5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-gray-200">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-neon-blue transition-transform ${openIndex === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-neon-orange rounded-full" />
        <span className="font-display font-bold tracking-wider text-lg">AL Casa Inteligente</span>
      </div>
      <div className="text-gray-500 text-sm text-center md:text-right">
        <p>&copy; {new Date().getFullYear()} AL Casa Inteligente. Todos os direitos reservados.</p>
        <p className="mt-1">Montijo • Margem Sul • Lisboa</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-deep-navy min-h-screen text-white selection:bg-neon-orange selection:text-white font-sans">
      <Navbar />
      <Hero />
      <Solutions />
      <Packs />
      <About />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
}