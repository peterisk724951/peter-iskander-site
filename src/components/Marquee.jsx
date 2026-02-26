import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const sectionRef = useRef(null);

  const items = "DRAKE \u2014 21 SAVAGE \u2014 CENTRAL CEE \u2014 OFFSET \u2014 KODAK BLACK \u2014 ELLA MAI \u2014 LUCKY DAYE \u2014 DDG \u2014 LIL YACHTY \u2014 ";
  const repeated = items.repeat(5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven: rows move in opposite directions
      gsap.to(row1Ref.current, {
        x: -300,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      gsap.to(row2Ref.current, {
        x: 300,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-10 overflow-hidden border-y border-[#1e1e1e] bg-[#0a0a0a]"
    >
      <div ref={row1Ref} className="whitespace-nowrap mb-3">
        <span
          className="font-[Michroma] font-extrabold text-[clamp(2rem,5vw,4rem)] tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, #444 0%, #777 50%, #444 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {repeated}
        </span>
      </div>
      <div ref={row2Ref} className="whitespace-nowrap">
        <span
          className="font-[Michroma] font-extrabold text-[clamp(2rem,5vw,4rem)] tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, #2a2a2a 0%, #4a4a4a 50%, #2a2a2a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
