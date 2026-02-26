import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const releases = [
  {
    title: "Gen Z Luv",
    artist: "Central Cee",
    album: "CAN'T RUSH GREATNESS",
    year: "2024",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/5a/7f/ef/5a7fefe9-5b4c-c72b-2446-6d4a0bc1d819/196872591545.jpg/600x600bb.jpg",
  },
  {
    title: "3AM on Glenwood",
    artist: "21 Savage",
    album: "Her Loss",
    year: "2022",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/e1/6e/6a/e16e6a89-3e6d-1936-1a9c-b51680bcd4c1/22UM1IM29132.rgb.jpg/600x600bb.jpg",
  },
  {
    title: "MANCHESTER",
    artist: "reezy",
    album: "LOYALTY OVER LOVE",
    year: "2021",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/2c/44/2d/2c442d50-2c10-fe37-f0bc-629fc3d45e1e/886449730209.jpg/600x600bb.jpg",
  },
  {
    title: "I'M ON",
    artist: "Offset",
    album: "SET IT OFF",
    year: "2023",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f6/ca/c8/f6cac844-4d88-77a2-6b07-ae0f94e9fa23/23UM1IM01921.rgb.jpg/600x600bb.jpg",
  },
  {
    title: "Shit Show",
    artist: "Kodak Black, Veeze & Lil Yachty",
    album: "Gift For the Streets",
    year: "2024",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/df/c8/04/dfc80404-bd5e-2755-a865-dd1d1a5303d2/24UM1IM41613.rgb.jpg/600x600bb.jpg",
  },
  {
    title: "A Mess",
    artist: "Ella Mai ft. Lucky Daye",
    album: "Heart On My Sleeve",
    year: "2022",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a4/1d/a7/a41da7bd-af89-032c-2d7e-7bfb0d9d8692/22UMGIM32702.rgb.jpg/600x600bb.jpg",
  },
  {
    title: "Bulletproof Maybach",
    artist: "DDG ft. Offset",
    album: "It's Not Me It's You",
    year: "2022",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/76/94/0c/76940c84-28f7-4105-7330-1cc34ff4989e/196589507495.jpg/600x600bb.jpg",
  },
  {
    title: "Kiss",
    artist: "Corbyn Besson",
    album: "HEAD FIRST",
    year: "2026",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8d/91/72/8d917204-4de8-784e-2133-62d11926aef1/4099964166279.jpg/600x600bb.jpg",
  },
  {
    title: "Post Oak Demon",
    artist: "Vory",
    album: "Post Oak Demon",
    year: "2026",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4d/49/ff/4d49ff54-22fc-79d9-869c-9a5e55836fd8/656465047960_cover.jpg/600x600bb.jpg",
  },
  {
    title: "Crazy Eyes",
    artist: "Alex Mali",
    album: "Sweet & Sour",
    year: "2019",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4f/02/a6/4f02a672-31d8-d052-ccb9-5f2178272916/888915942598_cover.jpg/600x600bb.jpg",
  },
  {
    title: "No Apologies",
    artist: "Alex Mali",
    album: "Iconic",
    year: "2021",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1c/19/83/1c198351-65b4-efb9-5bff-9f597b95d902/810061614012-0-0.jpg/600x600bb.jpg",
  },
  {
    title: "Heart Strings",
    artist: "Alex Mali",
    album: "Iconic",
    year: "2021",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1c/19/83/1c198351-65b4-efb9-5bff-9f597b95d902/810061614012-0-0.jpg/600x600bb.jpg",
  },
  {
    title: "Can't Let You Go",
    artist: "HENNESSY",
    album: "Can't Let You Go",
    year: "2022",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/3d/3b/10/3d3b1021-07d4-30a9-3ffb-950efe1cc708/196922214967_Cover.jpg/600x600bb.jpg",
  },
  {
    title: "SEVEN2TWO",
    artist: "Natalie Carr",
    album: "SEVEN2TWO",
    year: "2023",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/1e/15/98/1e159862-33fc-538c-b976-d662ae7ee898/816199.jpg/600x600bb.jpg",
  },
  {
    title: "it is what it is",
    artist: "Ayoub",
    album: "It Is What It Is",
    year: "2023",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/a7/a9/50/a7a95073-be8b-50fd-5c2a-1a6d8ba442c6/617513716177_cover.jpg/600x600bb.jpg",
  },
  {
    title: "Most",
    artist: "K. Forest",
    album: "Pray for a Beautiful Sky",
    year: "2023",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e6/47/86/e64786e7-7bd2-1a50-dd9f-3e1b9bd6fee2/859773572883_cover.jpg/600x600bb.jpg",
  },
  {
    title: ".BE YOURS",
    artist: "2forwOyNE",
    album: ".OVERSTIMULATED",
    year: "2024",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/c2/d4/cb/c2d4cbba-abfa-d655-47b2-337c8c639282/198861582855-copy-3f80f6f9.png/600x600bb.jpg",
  },
  {
    title: "S.I.C.",
    artist: "Shloob",
    album: "S.I.C.",
    year: "2025",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c4/a2/63/c4a2638a-01d8-2f08-93eb-efdbbc2b64a9/813659.jpg/600x600bb.jpg",
  },
  {
    title: "Lost Time.",
    artist: "Quentin Miller ft. Ant Clemons",
    album: "X.X.\u00B2",
    year: "2025",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e0/37/67/e03767eb-49ea-4205-865d-1ed663d80658/artwork.jpg/600x600bb.jpg",
  },
  {
    title: "No Longer Blind.",
    artist: "Quentin Miller",
    album: "X.X.\u00B2",
    year: "2025",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e0/37/67/e03767eb-49ea-4205-865d-1ed663d80658/artwork.jpg/600x600bb.jpg",
  },
  {
    title: "Girls Interlude",
    artist: "EB3N",
    album: "First Mistake",
    year: "2024",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b1/c1/b6/b1c1b69c-9d2c-0ced-ce7f-8b287ea5e855/artwork.jpg/600x600bb.jpg",
  },
  {
    title: "My Own Song / Cameras",
    artist: "Artie J",
    album: "Trap Girls Club 2",
    year: "2025",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/90/e6/b5/90e6b54d-47cc-72fd-b525-4927c4f01dc9/artwork.jpg/600x600bb.jpg",
  },
];

export default function Discography() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Heading parallax
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Desktop: GSAP pinned horizontal scroll
      // Mobile: native horizontal swipe (no pin)
      if (!isMobile.current) {
        const cards = cardsRef.current;
        const totalScroll = cards.scrollWidth - window.innerWidth;

        gsap.to(cards, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef}>
      {/* Horizontal scroll container (heading inside so it pins together) */}
      <div ref={containerRef} className="relative overflow-x-auto md:overflow-hidden md:min-h-screen md:flex md:flex-col md:justify-center hide-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
        {/* Heading area */}
        <div className="px-6 md:px-12 pt-20 md:pt-0 pb-8 md:pb-6 max-w-[1600px] mx-auto w-full">
          <div ref={headingRef}>
            <p className="font-[Urbanist] text-[10px] tracking-[0.25em] uppercase text-[#505050] mb-5">
              Selected Credits
            </p>
            <h2
              className="font-[Michroma] font-bold text-5xl md:text-7xl tracking-tight leading-[1]"
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #808080 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The catalog
            </h2>
          </div>
        </div>
        <div
          ref={cardsRef}
          className="flex gap-6 md:gap-8 pl-6 md:pl-12 pr-6 md:pr-[40vw] py-6 md:py-8"
          style={{ width: "max-content" }}
        >
          {releases.map((release, i) => (
            <div
              key={release.title}
              className="group relative flex-shrink-0 w-[320px] md:w-[400px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Card background with album art or chrome placeholder */}
              <div className="relative aspect-[3/4] bg-[#1a1a1a] border border-[#252525] rounded-2xl overflow-hidden group-hover:border-[#c0c0c0]/30 transition-all duration-700">
                {release.cover ? (
                  /* Real album artwork */
                  <img
                    src={release.cover}
                    alt={`${release.title} - ${release.artist}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  /* Abstract chrome placeholder for missing artwork */
                  <>
                    <div
                      className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                      style={{
                        background: `
                          radial-gradient(ellipse at ${30 + i * 7}% ${40 + i * 5}%, rgba(192,192,192,0.12) 0%, transparent 50%),
                          radial-gradient(ellipse at ${70 - i * 5}% ${60 + i * 3}%, rgba(180,180,180,0.06) 0%, transparent 50%),
                          linear-gradient(${135 + i * 20}deg, #1a1a1a, #1f1f1f)
                        `,
                      }}
                    />
                    <div className="absolute top-6 left-6">
                      <span
                        className="font-[Michroma] font-extrabold text-8xl md:text-9xl leading-none"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border group-hover:w-48 group-hover:h-48 transition-all duration-1000"
                      style={{
                        borderColor: "rgba(192,192,192,0.08)",
                        background: `radial-gradient(circle, rgba(192,192,192,0.04) 0%, transparent 70%)`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full group-hover:w-24 group-hover:h-24 transition-all duration-1000"
                      style={{
                        background: `radial-gradient(circle, rgba(192,192,192,0.06) 0%, transparent 70%)`,
                      }}
                    />
                  </>
                )}

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/90 via-[#0f0f0f]/30 to-transparent group-hover:from-[#0f0f0f]/80 group-hover:via-[#0f0f0f]/20 transition-all duration-700" />

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-[Urbanist] text-[10px] tracking-[0.15em] uppercase text-[#c0c0c0] mb-2">
                    {release.year} &middot; {release.artist}
                  </p>
                  <h3
                    className="font-[Michroma] font-bold text-2xl md:text-3xl tracking-tight mb-1 group-hover:text-[#d4d4d4] transition-colors duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #c0c0c0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {release.title}
                  </h3>
                  <p className="font-[Urbanist] text-[13px] text-[#606060] font-light italic">
                    {release.album}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
