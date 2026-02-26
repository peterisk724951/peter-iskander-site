import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Listen", href: "#listen" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },

  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 100 || y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/60 backdrop-blur-2xl border-b border-white/[0.04]"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-[Michroma] font-bold text-base tracking-normal text-[#f2f0eb] no-underline"
        >
          PETER ISKANDER
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-[Urbanist] text-[15px] text-[#999] hover:text-[#f2f0eb] transition-colors duration-300 no-underline font-light"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c0c0c0] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#f2f0eb] bg-transparent border-none cursor-pointer font-[Urbanist] text-xs tracking-widest uppercase"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-[Michroma] font-bold text-3xl tracking-tight text-[#f2f0eb] no-underline"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
