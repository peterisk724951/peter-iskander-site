import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const credits = [
  "Drake",
  "21 Savage",
  "Central Cee",
  "Offset",
  "Kodak Black",
  "Ella Mai",
  "Lucky Daye",
  "DDG",
];

const heroCovers = [
  "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/5a/7f/ef/5a7fefe9-5b4c-c72b-2446-6d4a0bc1d819/196872591545.jpg/600x600bb.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/e1/6e/6a/e16e6a89-3e6d-1936-1a9c-b51680bcd4c1/22UM1IM29132.rgb.jpg/600x600bb.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/2c/44/2d/2c442d50-2c10-fe37-f0bc-629fc3d45e1e/886449730209.jpg/600x600bb.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f6/ca/c8/f6cac844-4d88-77a2-6b07-ae0f94e9fa23/23UM1IM01921.rgb.jpg/600x600bb.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/df/c8/04/dfc80404-bd5e-2755-a865-dd1d1a5303d2/24UM1IM41613.rgb.jpg/600x600bb.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a4/1d/a7/a41da7bd-af89-032c-2d7e-7bfb0d9d8692/22UMGIM32702.rgb.jpg/600x600bb.jpg",
];

const stats = [
  { value: "1B+", label: "Streams" },
  { value: "#1", label: "Billboard" },
  { value: "Multi", label: "Platinum" },
  { value: "Top 40", label: "Hot 100" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const lastRef = useRef(null);
  const taglineRef = useRef(null);
  const creditsRef = useRef(null);
  const ctaRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        nameRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power4.out" }
      )
        .fromTo(
          lastRef.current,
          { y: 100, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power4.out" },
          "-=1.1"
        )
        .fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          creditsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // Right side: stagger in tiles then stats
      if (rightRef.current) {
        const tiles = rightRef.current.querySelectorAll("[data-tile]");
        const statEls = rightRef.current.querySelectorAll("[data-stat]");

        gsap.fromTo(
          tiles,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            delay: 0.8,
          }
        );

        gsap.fromTo(
          statEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            delay: 1.4,
          }
        );
      }

      // Scroll-driven parallax
      gsap.fromTo(
        nameRef.current,
        { y: 0, opacity: 1, scale: 1 },
        {
          y: -120,
          opacity: 0.2,
          scale: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        lastRef.current,
        { y: 0, opacity: 1, scale: 1 },
        {
          y: -80,
          opacity: 0.1,
          scale: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        [taglineRef.current, creditsRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        {
          y: -40,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "20% top",
            end: "60% top",
            scrub: 1,
          },
        }
      );

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { y: 0, opacity: 1 },
          {
            y: -60,
            opacity: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "10% top",
              end: "50% top",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen md:min-h-[120vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-20 max-w-[1600px] mx-auto w-full grid md:grid-cols-12 gap-8 items-center">
        {/* Left — text content */}
        <div className="md:col-span-7">
          {/* Name block */}
          <div className="mb-6">
            <div className="overflow-hidden">
              <h1
                ref={nameRef}
                className="font-[Michroma] font-extrabold text-[clamp(2.5rem,9vw,8rem)] leading-[0.88] tracking-tight"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Peter
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                ref={lastRef}
                className="font-[Michroma] font-extrabold text-[clamp(2.5rem,9vw,8rem)] leading-[0.88] tracking-tight"
                style={{
                  background:
                    "linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 40%, #666 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Iskander
              </h1>
            </div>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="font-[Urbanist] text-[13px] md:text-[15px] text-[#707070] max-w-lg leading-relaxed font-light mb-10"
          >
            Multi-genre producer from Houston, TX — crafting for the biggest
            names in music. Every sound intentional.
          </p>

          {/* Credits row */}
          <div ref={creditsRef} className="flex items-center gap-4 flex-wrap mb-10">
            <span className="font-[Urbanist] text-[10px] tracking-[0.2em] uppercase text-[#606060]">
              Credits include
            </span>
            <div className="h-[1px] w-6 bg-[#2a2a2a]" />
            {credits.map((name, i) => (
              <span key={name} className="flex items-center gap-4">
                <span className="font-[Urbanist] text-[13px] text-[#808080] font-light hover:text-[#d4d4d4] transition-colors duration-300 cursor-default">
                  {name}
                </span>
                {i < credits.length - 1 && (
                  <span className="text-[#2a2a2a] text-[8px]">&bull;</span>
                )}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex items-center gap-8">
            <a
              href="#work"
              className="group flex items-center gap-3 font-[Urbanist] text-[12px] tracking-[0.15em] uppercase text-[#f2f0eb] no-underline"
            >
              <span className="relative">
                Explore work
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#c0c0c0] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
              </span>
            </a>
            <a
              href="#contact"
              className="font-[Urbanist] text-[12px] tracking-[0.15em] uppercase text-[#707070] no-underline hover:text-[#f2f0eb] transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Right — album art grid + stats */}
        <div ref={rightRef} className="md:col-span-5 relative">
          {/* Staggered album art grid */}
          <div className="relative grid grid-cols-3 gap-3 mb-8">
            {heroCovers.map((cover, i) => (
              <div
                key={i}
                data-tile
                className="group relative aspect-square overflow-hidden rounded-lg border border-[#222] hover:border-[#c0c0c0]/30 transition-all duration-500"
              >
                <img
                  src={cover}
                  alt={[
                    "CAN'T RUSH GREATNESS by Central Cee",
                    "Her Loss by Drake & 21 Savage",
                    "LOYALTY OVER LOVE by reezy",
                    "SET IT OFF by Offset",
                    "Gift For the Streets by Kodak Black",
                    "Heart On My Sleeve by Ella Mai",
                  ][i]}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#222]">
            {stats.map(({ value, label }) => (
              <div key={label} data-stat className="text-center flex-1">
                <p
                  className="font-[Michroma] text-lg sm:text-2xl lg:text-3xl tracking-tight mb-1"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #888 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </p>
                <p className="font-[Urbanist] text-[9px] tracking-[0.15em] uppercase text-[#707070]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Fade edges on grid */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0f0f0f] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-[calc(100%-80px)] bg-gradient-to-l from-[#0f0f0f] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0f0f0f] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
