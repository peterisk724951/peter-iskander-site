import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialIcons = {
  Spotify: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  Instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  X: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Genius: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v16H4z" rx="2" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="currentColor" stroke="none" fontFamily="serif">G</text>
    </svg>
  ),
};

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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.target);
    await fetch("https://formspree.io/f/mbdawpve", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setSubmitting(false);
    setSubmitted(true);
  };

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
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
              once: true,
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
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              once: true,
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

              {submitted ? (
                <p className="font-[Urbanist] text-base text-[#c0c0c0] font-light">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
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
                      disabled={submitting}
                      className="font-[Urbanist] text-[14px] tracking-wider uppercase text-[#ccc] border border-[#555] hover:border-[#c0c0c0] hover:text-[#f2f0eb] rounded-full px-7 py-3 bg-transparent cursor-pointer transition-all duration-300 font-light disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
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
                  <span className="flex items-center gap-2.5 font-[Urbanist] text-[14px] text-[#707070] group-hover:text-[#f2f0eb] transition-colors duration-300 font-light">
                    <span className="text-[#555] group-hover:text-[#f2f0eb] transition-colors duration-300">
                      {socialIcons[social.name]}
                    </span>
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
