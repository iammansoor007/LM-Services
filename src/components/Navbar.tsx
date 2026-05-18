import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  X,
  Menu,
  Star,
  Calendar,
  Building2,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Phone,
  FileText,
  Wrench,
  Droplets,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Sun,
  Building,
  LayoutGrid,
  TreePine
} from "lucide-react";
import logo from "../assets/lmlogo.png";
import logo2nd from "../assets/lmlogo.png";
import completeData from "../src/data/completeData.json";

const iconMap = {
  Home: () => <Home className="h-5 w-5" />,
  Briefcase: () => <Briefcase className="h-5 w-5" />,
  Users: () => <Users className="h-5 w-5" />,
  MessageSquare: () => <MessageSquare className="h-5 w-5" />,
  Phone: () => <Phone className="h-5 w-5" />,
  Star: () => <Star className="h-5 w-5" />,
  Shield: () => <ShieldCheck className="h-5 w-5" />,
  FileText: () => <FileText className="h-5 w-5" />,
};

const serviceIconMap = {
  Home: () => <Home className="h-6 w-6 text-primary" />,
  Building2: () => <Building2 className="h-6 w-6 text-primary" />,
  Wrench: () => <Wrench className="h-6 w-6 text-primary" />,
  Droplets: () => <Droplets className="h-6 w-6 text-primary" />,
  Sparkles: () => <Sparkles className="h-6 w-6 text-primary" />,
  Sun: () => <Sun className="h-6 w-6 text-primary" />,
  Shield: () => <ShieldCheck className="h-6 w-6 text-primary" />,
  Building: () => <Building className="h-6 w-6 text-primary" />,
  LayoutGrid: () => <LayoutGrid className="h-6 w-6 text-primary" />,
  TreePine: () => <TreePine className="h-6 w-6 text-primary" />,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isHoveringMegaMenu, setIsHoveringMegaMenu] = useState(false);
  const lastScrollY = useRef(0);

  const navbarServices = completeData.navbar.services;
  const allServices = completeData.services.services;
  const { companyLinks, cta } = completeData.navbar;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesMouseEnter = () => setActiveMegaMenu("services");
  const handleServicesMouseLeave = () => {
    setTimeout(() => {
      if (!isHoveringMegaMenu) setActiveMegaMenu(null);
    }, 150);
  };

  return (
    <><nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform-gpu ${hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled
          ? "bg-white/80 backdrop-blur-md shadow-xl py-1 border-b border-white/20"
          : "bg-white/80 py-2"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <motion.a
          href="#"
          className="relative h-16 w-32 md:w-40"
          whileHover={{ scale: 1.02 }}
        >
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <button
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all text-black hover:bg-black/5`}
            >
              <Zap className="h-4 w-4" />
              Services
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMegaMenu === "services" ? "rotate-180" : ""}`} />
            </button>

            {/* Crystal Mega Menu */}
            <AnimatePresence>
              {activeMegaMenu === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  onMouseEnter={() => setIsHoveringMegaMenu(true)}
                  onMouseLeave={() => {
                    setIsHoveringMegaMenu(false);
                    setActiveMegaMenu(null);
                  }}
                  className="absolute left-0 top-full mt-4 w-[800px] bg-white/95 backdrop-blur-lg rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white/20 p-8 flex gap-8 transform-gpu"
                >
                  {/* Visual Feature Sidebar */}
                  <div className="w-64 bg-gradient-to-br from-primary to-primary/80 rounded-[1.5rem] p-8 text-white flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] pointer-events-none" />
                    <div className="relative z-10">
                      <Star className="h-8 w-8 mb-6 text-white/50" />
                      <h3 className="text-2xl font-bold uppercase italic tracking-tighter leading-none mb-4">
                        Top Rated <br /> Excellence
                      </h3>
                      <p className="text-white/70 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Over 200 Five-Star <br /> Google Reviews
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
                    >
                      View Gallery <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>

                  {/* Services Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {navbarServices.map((service) => {
                      const Icon = serviceIconMap[service.icon as keyof typeof serviceIconMap] || serviceIconMap.Home;
                      return (
                        <motion.a
                          key={service.title}
                          href="#services"
                          whileHover={{ x: 5 }}
                          className="p-5 rounded-[1.5rem] transition-all hover:bg-black/5 group"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              <Icon />
                            </div>
                            <h4 className="text-sm font-bold uppercase tracking-tight text-black group-hover:text-primary transition-colors">
                              {service.title}
                            </h4>
                          </div>
                          <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-widest">
                            Professional {service.title.split(' ')[0]} solutions for every project.
                          </p>
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {companyLinks
            .filter((link) => link.label !== "Services" && link.label !== "Home")
            .map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap] || iconMap.Home;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm uppercase tracking-widest transition-all text-black hover:bg-black/5`}
                >
                  <Icon />
                  {link.label}
                </a>
              );
            })}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-none text-sm font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
          >
            <Calendar className="h-4 w-4" />
            Free Quote
          </motion.a>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 rounded-full transition-all text-black"
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </div>
    </nav>

      {/* Professional Right-to-Left Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop with enhanced blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[55]"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] z-[60] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-border/50">
                <img src={logo2nd} alt="Logo" className="h-16 w-auto object-contain" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-black" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
                <div className="p-8 space-y-10">
                  {/* Services Megamenu Section */}
                  <div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">
                      Our Services
                    </h2>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                      {allServices.map((s, idx) => {
                        const Icon = serviceIconMap[s.icon as keyof typeof serviceIconMap] || serviceIconMap.Home;
                        return (
                          <motion.a
                            key={s.title}
                            href="#services"
                            onClick={() => setIsMenuOpen(false)}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.02 }}
                            className="group flex items-center gap-2.5 py-1.5 transition-all"
                          >
                            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all [&_svg]:h-4 [&_svg]:w-4">
                              <Icon />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-black group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {s.title}
                            </span>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Company Links Section */}
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">
                      Quick Links
                    </h2>
                    <div className="grid grid-cols-1 gap-1">
                      {companyLinks
                        .filter((l) => l.label !== "Home" && l.label !== "Services")
                        .map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl text-sm font-bold uppercase tracking-widest text-black/60 hover:text-black hover:bg-black/5 transition-all"
                          >
                            <ArrowRight className="h-4 w-4 text-primary" />
                            {l.label}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="p-8 bg-gray-50 border-t border-border/50">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  {cta.buttonText}
                </a>
                <p className="text-center text-[9px] text-muted-foreground uppercase font-bold tracking-[0.2em] mt-4">
                  Free Quote • Professional Service
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
