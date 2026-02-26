import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Production",
    description:
      "Full-service music production from concept to master. Beats, arrangements, and complete compositions across any genre.",
  },
  {
    num: "02",
    title: "Mixing & Mastering",
    description:
      "Meticulous mixing and mastering to give your tracks the depth, clarity, and punch they deserve.",
  },
  {
    num: "03",
    title: "Sound Design",
    description:
      "Unique sonic textures, custom synth patches, and audio branding. Building sounds from the ground up.",
  },
  {
    num: "04",
    title: "Film & Media",
    description:
      "Original scores and compositions for film, TV, games, and advertising. Emotional storytelling through sound.",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef(null);

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

      const rows = itemsRef.current.children;
      gsap.fromTo(
        rows,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: itemsRef.current,
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
      id="services"
      ref={sectionRef}
      className="py-20 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-3">
            <p className="font-[Urbanist] text-[10px] tracking-[0.25em] uppercase text-[#505050] mb-4">
              Services
            </p>
            <div className="w-8 h-[1px] bg-[#2a2a2a]" />
          </div>
          <div className="md:col-span-8 md:col-start-5" ref={headingRef}>
            <h2
              className="font-[Michroma] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              What I can do for you
            </h2>
          </div>
        </div>

        <div ref={itemsRef} className="border-t border-[#222]">
          {services.map((service) => (
            <div
              key={service.num}
              className="group grid grid-cols-12 gap-4 py-10 md:py-16 border-b border-[#222] hover:border-[#444] transition-colors duration-500 cursor-default"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="font-[Urbanist] text-[10px] text-[#404040] tracking-wider">
                  {service.num}
                </span>
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3
                  className="font-[Michroma] font-bold text-2xl md:text-4xl tracking-tight"
                  style={{
                    background:
                      "linear-gradient(180deg, #f2f0eb 0%, #aaa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "none";
                    e.target.style.WebkitTextFillColor = "#d4d4d4";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background =
                      "linear-gradient(180deg, #f2f0eb 0%, #aaa 100%)";
                    e.target.style.WebkitBackgroundClip = "text";
                    e.target.style.WebkitTextFillColor = "transparent";
                  }}
                >
                  {service.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5 md:col-start-7">
                <p className="font-[Urbanist] text-[14px] text-[#707070] leading-[1.9] font-light mt-4 md:mt-1">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
