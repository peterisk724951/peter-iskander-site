import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Discography from "./components/Discography";
import Listen from "./components/Listen";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered && <Intro onEnter={() => setEntered(true)} />}

      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Navbar />
            <Hero />
            <Marquee />
            <About />
            <Discography />
            <Listen />
            <Services />
            <Contact />
            <Footer />
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
