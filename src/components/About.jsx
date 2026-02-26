import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import studioImg from "../assets/peter-studio.jpg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  ["2015", "Started Producing"],
  ["50+", "Releases"],
  ["2x", "RIAA Multi-Platinum"],
  ["1B+", "Streams Worldwide"],
  ["1x", "Grammy Nominated"],
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const statsRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slides up
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

      // Paragraphs stagger in
      gsap.fromTo(
        col1Ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: col1Ref.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        col2Ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: col2Ref.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        imgRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Stats counter animation
      const statEls = statsRef.current.querySelectorAll("[data-stat]");
      statEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-48 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          {/* Left column — label + photo */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <p className="font-[Urbanist] text-[10px] tracking-[0.25em] uppercase text-[#505050] mb-4">
                About
              </p>
              <div className="w-8 h-[1px] bg-[#2a2a2a] mb-8" />
              <div
                ref={imgRef}
                className="overflow-hidden rounded-xl border border-[#222]"
              >
                <img
                  src={studioImg}
                  alt="Peter Iskander in the studio"
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="md:col-span-8 md:col-start-5">
            <div ref={headingRef}>
              <h2
                className="font-[Michroma] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-16"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                From Houston to the World Stage
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div ref={col1Ref}>
                <p className="text-[#9e9e9e] leading-[1.9] text-[15px] font-light">
                  Peter Iskander is a Grammy-nominated, RIAA multi-platinum
                  music producer from Houston, TX who has quietly become one
                  of the most versatile names behind the boards. Since picking
                  up production in 2015, he's built a catalog that speaks for
                  itself — working with Drake, 21 Savage, Central Cee, Offset,
                  Kodak Black, Ella Mai, Lucky Daye, and more.
                </p>
              </div>
              <div ref={col2Ref}>
                <p className="text-[#9e9e9e] leading-[1.9] text-[15px] font-light">
                  In late 2019, Peter began connecting with some of the
                  industry's most respected producers — Boi-1da, OZ, 40 —
                  and stepped into rooms that shaped the sound of modern music.
                  His credits span Drake and 21 Savage's <em>Her Loss</em>,
                  Central Cee's <em>CAN'T RUSH GREATNESS</em>, and Offset's{" "}
                  <em>SET IT OFF</em>.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-12 border-t border-[#222]"
            >
              {stats.map(([value, label]) => (
                <div key={label} data-stat>
                  <p
                    className="font-[Michroma] font-bold text-4xl md:text-5xl tracking-tight mb-2"
                    style={{
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #888 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {value}
                  </p>
                  <p className="font-[Urbanist] text-[10px] tracking-[0.15em] uppercase text-[#505050]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Available badge */}
            <div className="mt-10 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c0c0c0] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c0c0c0]" />
              </span>
              <span className="font-[Urbanist] text-[10px] tracking-[0.12em] uppercase text-[#707070]">
                Available for projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
