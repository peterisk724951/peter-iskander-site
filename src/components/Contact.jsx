import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: "Spotify", href: "https://open.spotify.com/playlist/5cqkVsslOxda5lMkNIBhgS?si=0ca70ba39e9245f6" },
  { name: "Instagram", href: "https://instagram.com/peteiskander" },
  { name: "X", href: "https://x.com/peterisk_" },
  { name: "Genius", href: "https://genius.com/artists/Peter-iskander" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big heading reveals word by word feel
      gsap.fromTo(
        headingRef.current,
        { y: 100, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Socials stagger
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }

      // Form stagger
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              end: "top 55%",
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
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-48 px-6 md:px-12 bg-[#0a0a0a]"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-8">
            <p className="font-[Urbanist] text-[10px] tracking-[0.25em] uppercase text-[#505050] mb-10">
              Get in Touch
            </p>

            <div ref={headingRef}>
              <h2
                className="font-[Michroma] font-extrabold text-5xl md:text-7xl lg:text-[8rem] tracking-tight leading-[0.92] mb-12"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #666 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Business
                <br />
                inquiries
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 40%, #666 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  welcome.
                </span>
              </h2>
            </div>

            <a
              href="mailto:hello@peteriskander.com"
              className="group inline-flex items-center gap-3 font-[Urbanist] text-base md:text-lg text-[#c0c0c0] no-underline"
            >
              <span className="relative">
                hello@peteriskander.com
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#c0c0c0]/30 group-hover:bg-[#c0c0c0] transition-colors duration-400" />
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
              </span>
            </a>

            <div className="mt-16">
              <p className="font-[Urbanist] text-[10px] tracking-[0.2em] uppercase text-[#707070] mb-10">
                Serious inquiries only — no samples or music submissions
              </p>

              <form
                ref={formRef}
                action="https://formspree.io/f/mbdawpve"
                method="POST"
                className="flex flex-col gap-6 max-w-xl"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="bg-transparent border-0 border-b border-[#333] focus:border-[#c0c0c0] outline-none font-[Urbanist] font-light text-[#f2f0eb] placeholder:text-[#606060] py-3 text-sm transition-colors duration-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="bg-transparent border-0 border-b border-[#333] focus:border-[#c0c0c0] outline-none font-[Urbanist] font-light text-[#f2f0eb] placeholder:text-[#606060] py-3 text-sm transition-colors duration-300"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="bg-transparent border-0 border-b border-[#333] focus:border-[#c0c0c0] outline-none font-[Urbanist] font-light text-[#f2f0eb] placeholder:text-[#606060] py-3 text-sm transition-colors duration-300"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                  className="bg-transparent border-0 border-b border-[#333] focus:border-[#c0c0c0] outline-none font-[Urbanist] font-light text-[#f2f0eb] placeholder:text-[#606060] py-3 text-sm transition-colors duration-300 resize-none"
                />
                <div>
                  <button
                    type="submit"
                    className="font-[Urbanist] text-[14px] tracking-wider uppercase text-[#ccc] border border-[#555] hover:border-[#c0c0c0] hover:text-[#f2f0eb] rounded-full px-7 py-3 bg-transparent cursor-pointer transition-all duration-300 font-light"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-10 flex flex-col justify-end">
            <p className="font-[Urbanist] text-[10px] tracking-[0.25em] uppercase text-[#505050] mb-6">
              Elsewhere
            </p>

            <div ref={linksRef} className="flex flex-col">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group flex items-center justify-between py-4 border-b border-[#1e1e1e] hover:border-[#333] transition-colors duration-400 no-underline"
                >
                  <span className="font-[Urbanist] text-[14px] text-[#707070] group-hover:text-[#f2f0eb] transition-colors duration-300 font-light">
                    {social.name}
                  </span>
                  <span className="text-[#333] group-hover:text-[#c0c0c0] group-hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
