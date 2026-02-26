import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  {
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/e1/6e/6a/e16e6a89-3e6d-1936-1a9c-b51680bcd4c1/22UM1IM29132.rgb.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/52/e4/01/52e4019e-4075-893d-a0dd-80ee3ed1a4dd/mzaf_1509276887701592279.plus.aac.p.m4a",
  },
  {
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/5a/7f/ef/5a7fefe9-5b4c-c72b-2446-6d4a0bc1d819/196872591545.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/90/79/1f/90791f61-8124-57d0-4e27-4482cbf2d507/mzaf_9113101320896363307.plus.aac.p.m4a",
  },
  {
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f6/ca/c8/f6cac844-4d88-77a2-6b07-ae0f94e9fa23/23UM1IM01921.rgb.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9a/19/ca/9a19ca02-9f2e-f118-148a-0334bb15b3af/mzaf_16383957925107588189.plus.aac.p.m4a",
  },
  {
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a4/1d/a7/a41da7bd-af89-032c-2d7e-7bfb0d9d8692/22UMGIM32702.rgb.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/56/40/82/5640829a-1fda-2d3b-b154-11d0928f73e7/mzaf_797381037667514848.plus.aac.p.m4a",
  },
  {
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/76/94/0c/76940c84-28f7-4105-7330-1cc34ff4989e/196589507495.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d7/fa/db/d7fadb8a-b48c-65d7-576d-21d9a752c2ce/mzaf_11676231733142741014.plus.aac.p.m4a",
  },
  {
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8d/91/72/8d917204-4de8-784e-2133-62d11926aef1/4099964166279.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d8/f8/4c/d8f84cdb-2fe5-7477-6a2d-3d7539d1b76c/mzaf_4360755028805674460.plus.aac.p.m4a",
  },
];

const IDLE_SPEED = 0.3;
const NORMAL_VOLUME = 0.5;

function Vinyl({ exiting }) {
  const vinylRef = useRef(null);
  const rotation = useRef(0);
  const velocity = useRef(IDLE_SPEED);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);
  const lastTime = useRef(0);
  const animRef = useRef(null);
  const [coverIndex, setCoverIndex] = useState(0);
  const coverIndexRef = useRef(0);
  const lastCoverChange = useRef(0);

  // Audio — single element, start muted
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(true);
  const audioStarted = useRef(false);
  const audioEl = useRef(null);

  // Scratch sound via Web Audio API
  const scratchCtx = useRef(null);
  const scratchGain = useRef(null);
  const scratchFilter = useRef(null);
  const scratchSource = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = NORMAL_VOLUME;
    audio.muted = true;
    audio.preload = "auto";
    audioEl.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      if (scratchCtx.current) {
        scratchCtx.current.close().catch(() => {});
      }
    };
  }, []);

  // Fade out on exit
  useEffect(() => {
    if (exiting) {
      // Kill scratch sound immediately
      if (scratchGain.current && scratchCtx.current) {
        scratchGain.current.gain.linearRampToValueAtTime(
          0,
          scratchCtx.current.currentTime + 0.2
        );
      }
      if (!audioEl.current) return;
      const audio = audioEl.current;
      const fade = setInterval(() => {
        if (audio.volume > 0.03) {
          audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
          audio.pause();
          audio.volume = 0;
          clearInterval(fade);
        }
      }, 30);
    }
  }, [exiting]);

  const initScratch = useCallback(() => {
    if (scratchCtx.current) return;
    // Skip scratch sound on mobile
    if (window.innerWidth < 768) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    scratchCtx.current = ctx;

    // Generate noise buffer
    const len = ctx.sampleRate;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    scratchSource.current = source;
    scratchFilter.current = filter;
    scratchGain.current = gain;
  }, []);

  const playCurrentTrack = useCallback(() => {
    const track = tracks[coverIndexRef.current];
    if (!track?.preview || !audioEl.current) return;
    const audio = audioEl.current;
    audio.src = track.preview;
    audio.playbackRate = 1;
    audio.play().catch(() => {});
  }, []);

  const switchTrack = useCallback(() => {
    if (!audioStarted.current || !audioEl.current) return;
    const track = tracks[coverIndexRef.current];
    if (!track?.preview) {
      audioEl.current.pause();
      return;
    }
    audioEl.current.src = track.preview;
    audioEl.current.playbackRate = 1;
    audioEl.current.play().catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      mutedRef.current = next;
      if (audioEl.current) {
        audioEl.current.muted = next;
      }
      // Start audio on first unmute (user gesture required)
      if (!next && !audioStarted.current) {
        audioStarted.current = true;
        playCurrentTrack();
      }
      if (!next) initScratch();
      return next;
    });
  }, [playCurrentTrack, initScratch]);

  const getAngle = useCallback((e) => {
    const rect = vinylRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return Math.atan2(clientY - cy, clientX - cx);
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      isDragging.current = true;
      lastAngle.current = getAngle(e);
      lastTime.current = performance.now();
      velocity.current = 0;

      // Start audio + unmute on first vinyl touch
      if (!audioStarted.current) {
        audioStarted.current = true;
        playCurrentTrack();
      }
      initScratch();
      if (mutedRef.current) {
        mutedRef.current = false;
        setMuted(false);
        if (audioEl.current) audioEl.current.muted = false;
      }
    },
    [getAngle, playCurrentTrack, initScratch]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      const angle = getAngle(e);
      let delta = angle - lastAngle.current;
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;

      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 1);
      velocity.current = (delta * 1000) / dt;
      rotation.current += delta * (180 / Math.PI);
      lastAngle.current = angle;
      lastTime.current = now;
    },
    [getAngle]
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    const animate = () => {
      if (!isDragging.current) {
        // Smoothly decelerate back to idle speed
        velocity.current += (IDLE_SPEED - velocity.current) * 0.04;
      }
      rotation.current += velocity.current;

      if (vinylRef.current) {
        vinylRef.current.style.transform = `rotate(${rotation.current}deg)`;
      }

      // Scratch sound overlay — ramp up when dragging, silence when idle
      // Music stays at normal speed for smooth playback
      if (scratchGain.current && !mutedRef.current) {
        const t = scratchCtx.current.currentTime;
        if (isDragging.current) {
          const absVel = Math.abs(velocity.current);
          const intensity = Math.min(1, absVel / 2);
          scratchGain.current.gain.linearRampToValueAtTime(intensity * 0.15, t + 0.05);
          scratchFilter.current.frequency.linearRampToValueAtTime(
            400 + intensity * 2000,
            t + 0.05
          );
        } else {
          scratchGain.current.gain.linearRampToValueAtTime(0, t + 0.1);
        }
      }

      // Change cover every 360 degrees of cumulative spin
      const totalRotations = Math.floor(Math.abs(rotation.current) / 360);
      if (totalRotations !== lastCoverChange.current) {
        lastCoverChange.current = totalRotations;
        const newIdx = (coverIndexRef.current + 1) % tracks.length;
        coverIndexRef.current = newIdx;
        setCoverIndex(newIdx);
        switchTrack();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [onPointerMove, onPointerUp, switchTrack]);

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        {/* The spinning vinyl */}
        <div
          ref={vinylRef}
          className="absolute inset-0 rounded-full"
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
        >
          {/* Full-bleed album art */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              boxShadow:
                "0 0 80px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.3)",
            }}
          >
            <AnimatePresence>
              {tracks.map((track, i) => (
                i === coverIndex && (
                  <motion.img
                    key={i}
                    src={track.cover}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Vinyl grooves overlay */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
              repeating-radial-gradient(
                circle at center,
                transparent 0px,
                transparent 2px,
                rgba(0,0,0,0.25) 2px,
                rgba(0,0,0,0.25) 3px
              )
            `,
            }}
          />

          {/* Dark vignette */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, transparent 25%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Chrome outer rim */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "2px solid rgba(120,120,120,0.3)",
              background:
                "conic-gradient(from 0deg, rgba(180,180,180,0.06) 0%, transparent 25%, rgba(180,180,180,0.06) 50%, transparent 75%, rgba(180,180,180,0.06) 100%)",
            }}
          />

          {/* Light reflection streak */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
            }}
          />

          {/* Center hole */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, #222 0%, #111 60%, #0a0a0a 100%)",
                border: "1.5px solid rgba(100,100,100,0.3)",
                boxShadow: "0 0 10px rgba(0,0,0,0.8)",
              }}
            />
          </div>
        </div>

        {/* Tonearm hint glow */}
        <div
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-20 rounded-full pointer-events-none opacity-20"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(192,192,192,0.5), transparent)",
          }}
        />
      </div>

      {/* Sound toggle + tooltip */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#333] hover:border-[#555] bg-transparent transition-all duration-300 cursor-pointer"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
          <span className="font-[Urbanist] text-[9px] tracking-[0.15em] uppercase text-[#666]">
            {muted ? "Muted" : "Sound"}
          </span>
        </button>
        {muted && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-[Urbanist] text-[9px] text-[#555] font-light"
          >
            Tap to hear the music
          </motion.span>
        )}
      </div>
    </div>
  );
}

function SplashBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const animRef = useRef(null);
  const time = useRef(0);
  const smoke = useRef([]);
  const rings = useRef([]);
  const lastRing = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Initialize smoke particles
    for (let i = 0; i < 18; i++) {
      smoke.current.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 100 + Math.random() * 160,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: 0.015 + Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onTouchMove = (e) => {
      mouse.current.x = e.touches[0].clientX;
      mouse.current.y = e.touches[0].clientY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    const draw = () => {
      time.current += 0.006;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // --- Smoke / fog ---
      smoke.current.forEach((p) => {
        // Drift with organic movement
        p.x += p.vx + Math.sin(time.current * 0.8 + p.phase) * 0.4;
        p.y += p.vy + Math.cos(time.current * 0.5 + p.phase) * 0.3;

        // Cursor pushes smoke away
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (1 - dist / 300) * 0.6;
          p.x -= dx * force * 0.015;
          p.y -= dy * force * 0.015;
        }

        // Wrap
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        // Breathing radius
        const breathe = 0.85 + Math.sin(time.current * 0.4 + p.phase) * 0.15;
        const radius = p.r * breathe;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `rgba(180, 180, 180, ${p.alpha})`);
        grad.addColorStop(0.4, `rgba(140, 140, 140, ${p.alpha * 0.4})`);
        grad.addColorStop(1, "rgba(100, 100, 100, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Sound wave rings from center (vinyl position) ---
      // Spawn a new ring every ~1.8 seconds
      if (time.current - lastRing.current > 1.8) {
        lastRing.current = time.current;
        rings.current.push({ born: time.current });
      }

      rings.current = rings.current.filter((ring) => {
        const age = time.current - ring.born;
        const lifespan = 5;
        const progress = age / lifespan;
        if (progress > 1) return false;

        const maxR = Math.max(w, h) * 0.9;
        const radius = progress * maxR;
        const alpha = (1 - progress) * 0.07;

        // Draw ring with slight thickness variation
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 192, 192, ${alpha})`;
        ctx.lineWidth = 1 + (1 - progress) * 0.5;
        ctx.stroke();

        // Inner glow ring
        if (progress < 0.3) {
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(220, 220, 220, ${(1 - progress / 0.3) * 0.04})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.6 + i * 0.06,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AnimatedText({ text, custom = 0, className, style }) {
  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={custom + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "inline-block",
            ...style,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Intro({ onEnter }) {
  const [exiting, setExiting] = useState(false);

  const handleEnter = useCallback(() => {
    setExiting(true);
    setTimeout(onEnter, 1400);
  }, [onEnter]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          <SplashBackground />

          {/* Corner chrome accents */}
          <div className="absolute top-8 left-8 w-16 h-[1px] bg-gradient-to-r from-[#555] to-transparent" />
          <div className="absolute top-8 left-8 w-[1px] h-16 bg-gradient-to-b from-[#555] to-transparent" />
          <div className="absolute top-8 right-8 w-16 h-[1px] bg-gradient-to-l from-[#555] to-transparent" />
          <div className="absolute top-8 right-8 w-[1px] h-16 bg-gradient-to-b from-[#555] to-transparent" />
          <div className="absolute bottom-8 left-8 w-16 h-[1px] bg-gradient-to-r from-[#555] to-transparent" />
          <div className="absolute bottom-8 left-8 w-[1px] h-16 bg-gradient-to-t from-[#555] to-transparent" />
          <div className="absolute bottom-8 right-8 w-16 h-[1px] bg-gradient-to-l from-[#555] to-transparent" />
          <div className="absolute bottom-8 right-8 w-[1px] h-16 bg-gradient-to-t from-[#555] to-transparent" />

          <div className="relative z-10 flex flex-col items-center select-none px-6">
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{
                duration: 2,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-[Urbanist] text-[10px] text-[#555] uppercase font-light mb-2"
            >
              Music Producer
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="font-[Urbanist] text-[10px] text-[#444] tracking-[0.25em] uppercase font-light mb-8"
            >
              Houston, TX
            </motion.p>

            {/* Name */}
            <div className="mb-2">
              <AnimatedText
                text="PETER"
                custom={0}
                className="font-[Michroma] text-4xl sm:text-6xl md:text-[5.5rem] tracking-[0.08em] leading-[1]"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #999 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>
            <div className="mb-10">
              <AnimatedText
                text="ISKANDER"
                custom={5}
                className="font-[Michroma] text-4xl sm:text-6xl md:text-[5.5rem] tracking-[0.08em] leading-[1]"
                style={{
                  background:
                    "linear-gradient(180deg, #e0e0e0 0%, #c0c0c0 30%, #555 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>

            {/* Vinyl record */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.5,
                delay: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-4"
            >
              <Vinyl exiting={exiting} />
            </motion.div>

            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="font-[Urbanist] text-[9px] text-[#444] tracking-[0.25em] uppercase font-light mb-8"
            >
              Drag to spin
            </motion.p>

            {/* Enter button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 2.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={handleEnter}
              className="cursor-pointer"
            >
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#555] rounded-full hover:border-[#aaa] hover:bg-white/[0.03] transition-all duration-500"
                style={{
                  boxShadow: "0 0 20px rgba(192,192,192,0.06)",
                }}
              >
                <span className="font-[Urbanist] text-[10px] tracking-[0.3em] uppercase text-[#ccc]">
                  Enter
                </span>
                <span className="text-[#999] text-xs">&rarr;</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
