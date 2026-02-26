import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "Sonic Voyage",
    description:
      "10 original compositional loops spanning trap, R&B, latin & more. 24-bit WAV, BPM-labeled, mixed with headroom. Hassle-free clearance.",
    price: "$29",
    cover: "/COVER.png",
    href: "#",
  },
];

export default function Products() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="w-full max-w-[680px]">
            <p className="font-[Urbanist] text-[10px] tracking-[0.25em] uppercase text-[#505050] mb-4">
              Products
            </p>
            <div className="w-8 h-[1px] bg-[#2a2a2a] mb-8" />
            <div ref={headingRef}>
              <h2
                className="font-[Michroma] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Loop Kits
              </h2>
            </div>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-col items-center"
        >
          {products.map((product) => (
            <div
              key={product.title}
              className="w-full max-w-[680px]"
            >
              <div className="group bg-[#1a1a1a] border border-[#222] rounded-2xl overflow-hidden hover:border-[#444] transition-all duration-500">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-56 sm:min-w-[224px] aspect-square sm:aspect-auto bg-[#141414] overflow-hidden flex-shrink-0">
                    {product.cover ? (
                      <img
                        src={product.cover}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-[Urbanist] text-[13px] text-[#333] font-light tracking-wider uppercase">
                          Artwork Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3
                        className="font-[Michroma] font-bold text-lg md:text-xl tracking-tight mb-3"
                        style={{
                          background:
                            "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {product.title}
                      </h3>
                      <p className="font-[Urbanist] text-[12px] text-[#505050] font-light tracking-wide mb-3">
                        Peter Iskander
                      </p>
                      <p className="font-[Urbanist] text-[13px] text-[#707070] leading-[1.8] font-light mb-5">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-5">
                      <span
                        className="font-[Michroma] text-xl md:text-2xl tracking-tight"
                        style={{
                          background:
                            "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {product.price}
                      </span>
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[Urbanist] text-[14px] tracking-wider uppercase text-[#999] border border-[#333] hover:border-[#c0c0c0] hover:text-[#f2f0eb] rounded-full px-7 py-3 no-underline transition-all duration-300 font-light"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>

                <div className="px-2 pb-4 pt-7">
                  <button
                    onClick={() => setPreviewOpen(!previewOpen)}
                    className="flex items-center gap-2.5 bg-transparent border border-[#333] hover:border-[#c0c0c0] rounded-full px-5 py-2.5 cursor-pointer transition-all duration-300 group/btn"
                  >
                    <span className="font-[Urbanist] text-[12px] tracking-wider uppercase text-[#999] group-hover/btn:text-[#f2f0eb] transition-colors duration-300 font-light">
                      Hear the Kit
                    </span>
                    <motion.span
                      animate={{ rotate: previewOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[#999] text-[9px] group-hover/btn:text-[#f2f0eb] transition-colors duration-300"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {previewOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 rounded-lg overflow-hidden">
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/St4YmtW7-IY"
                              title="Sonic Voyage Preview"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
