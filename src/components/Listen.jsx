import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Listen() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
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
      id="listen"
      ref={sectionRef}
      className="py-20 md:py-48 px-6 md:px-12 bg-[#0a0a0a]"
    >
      <div ref={contentRef} className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-14">
          <div className="md:col-span-3">
            <p className="font-[Urbanist] text-[10px] tracking-[0.25em] uppercase text-[#505050] mb-4">
              Listen
            </p>
            <div className="w-8 h-[1px] bg-[#2a2a2a]" />
          </div>

          <div className="md:col-span-8 md:col-start-5 text-center">
            <h2
              className="font-[Michroma] font-bold text-4xl md:text-6xl tracking-tight leading-[1.05]"
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hear the Work
            </h2>
            <p className="font-[Urbanist] text-[13px] text-[#606060] font-light mt-4">
              Official Apple Music Playlist
            </p>
          </div>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="450"
            style={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "12px",
              background: "transparent",
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src="https://embed.music.apple.com/us/playlist/peter-iskander-the-producers/pl.d8090ca461974bfd94c95bc0c29fc66b?theme=dark"
          />
        </div>
      </div>
    </section>
  );
}
