import { useEffect, useRef, useState } from 'react';
import {
  Play,
  Instagram,
  TrendingUp,
  Video,
  Sparkles,
  ArrowRight,
  X,
  Film,
  Zap,
  Target,
  CheckCircle2,
} from 'lucide-react';

const VIDEO_MARQUEE = [
  '/videos/IMG_5939.mp4',
  '/videos/IMG_6009.mp4',
  '/videos/IMG_6042.mp4',
  '/videos/IMG_6155.mp4',
  '/videos/IMG_6572.mp4',
  '/videos/IMG_6613.MP4',
  '/videos/IMG_6935.MP4',
  '/videos/IMG_6936.MP4',
  '/videos/IMG_6796.mp4',
  '/videos/IMG_5663.mp4',
  '/videos/IMG_6941.mp4',
  '/videos/IMG_6944.mp4',
];

function App() {
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef({ dragging: false, startX: 0, startOffset: 0, moved: 0 });

  // Scorrimento automatico verso sinistra + sbloccato al passaggio del mouse
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 60; // px al secondo
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const half = track.scrollWidth / 2;
      if (!pausedRef.current) offsetRef.current += SPEED * dt;
      if (half > 0) {
        offsetRef.current = ((offsetRef.current % half) + half) % half;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rotella del mouse -> scorrimento orizzontale della striscia
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      offsetRef.current += delta;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
      moved: 0,
    };
    pausedRef.current = true;
  };

  const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.dragging) return;
    if (e.buttons === 0) {
      drag.dragging = false;
      return;
    }
    const dx = e.clientX - drag.startX;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    offsetRef.current = drag.startOffset - dx;
  };

  const endDrag = () => {
    dragRef.current.dragging = false;
  };

  // Invio del form via FormSubmit: l'email arriva a stefanoschifanographic@gmail.com
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const projectType = String(data.get('projectType') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !projectType || !message) {
      setFormError('Please fill in every field before sending.');
      return;
    }

    setFormError('');
    setFormSending(true);
    try {
      const res = await fetch(
        'https://formsubmit.co/ajax/stefanoschifanographic@gmail.com',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name,
            email,
            'Project type': projectType,
            message,
            _subject: `New project request from ${name}`,
            _template: 'table',
            _captcha: 'false',
          }),
        },
      );
      if (!res.ok) throw new Error('Request failed');
      setFormSent(true);
    } catch {
      setFormError(
        'Something went wrong. Please try again or email me directly at stefanoschifanographic@gmail.com.',
      );
    } finally {
      setFormSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden">
      {/* SFUMATURA IN ALTO ALLO SCORRIMENTO */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-32 bg-gradient-to-b from-black to-transparent" />

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col pt-32 pb-16 overflow-hidden"
      >
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-700/15 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_75%)]" />
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 w-full">
          <div>
            <p className="Stiledicaratterenormale mb-3">
              Social Media Manager/Video Editor
            </p>
            <h1 className="Stiledicaratterenormale1 leading-[1.1] mb-6">
              StefanoGraphicagent
            </h1>
            <p className="text-sm text-gray-500 mb-3">
              Hi, I'm Stefano, 27 years old, based in Italy 🇮🇹
            </p>
            <p className="text-base text-gray-400 max-w-xl mb-8 leading-relaxed">
              I create videos that grab attention and social strategies that grow
              your brand. Cinematic editing, reels that convert, content that
              drives real engagement.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#videos"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-red-900/40 hover:shadow-red-700/60 hover:scale-105"
              >
                <Play className="w-5 h-5" /> Show Portfolio
              </a>
              <a
                href="https://www.instagram.com/stefanographicagent?psln=bmdjbnR3cHhrcmxl&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-700 hover:border-red-500 hover:text-red-400 px-7 py-3.5 rounded-full font-semibold transition-all duration-300"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              {[
                { num: '150+', label: 'Videos created' },
                { num: '1M+', label: 'Views' },
                { num: '120+', label: 'Happy clients' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{s.num}</div>
                  <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VIDEO MARQUEE */}
        <div
          id="videos"
          ref={marqueeRef}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            endDrag();
          }}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          style={{ touchAction: 'pan-y' }}
          className="relative w-full mt-16 scroll-mt-28 overflow-hidden cursor-grab select-none"
        >
          <div ref={trackRef} className="flex w-max">
            {[...VIDEO_MARQUEE, ...VIDEO_MARQUEE].map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={(e) => {
                  if (dragRef.current.moved > 6) {
                    e.preventDefault();
                    return;
                  }
                  setActiveVideo(src);
                }}
                aria-label="Riproduci video"
                className="group relative shrink-0 mr-4 w-40 md:w-56 aspect-[9/16] rounded-2xl overflow-hidden border border-red-600/30 bg-zinc-900"
              >
                <video
                  src={src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="border-y border-zinc-900 bg-zinc-950/50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-600 mb-6">
            They chose my services
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {['/logos/logo-bianco-centrato.svg', '/logos/logo-pizza.svg'].map((src) => (
              <img
                key={src}
                src={src}
                alt="Client logo"
                className="h-6 md:h-7 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="servizi" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-3">
              Services
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Everything you need to
              <span className="text-red-500"> dominate social</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From strategy to the final edit, a complete service to grow your
              online presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: 'Video Editing',
                desc: 'Professional editing with cinematic pacing, color grading and refined sound design for every platform.',
                tags: ['Reel', 'Shorts', 'TikTok'],
              },
              {
                icon: TrendingUp,
                title: 'Social Media Management',
                desc: 'Editorial strategy, content calendar and full management of your social channels.',
                tags: ['Strategy', 'Calendar', 'Analytics'],
              },
              {
                icon: Zap,
                title: 'Short-form Content',
                desc: 'Reels and shorts built for virality, with powerful hooks and pacing that keeps viewers watching.',
                tags: ['Hook', 'Script', 'Trend'],
              },
              {
                icon: Film,
                title: 'Video Promo',
                desc: 'Corporate videos, product promos and brand campaigns with broadcast quality.',
                tags: ['Brand', 'Promo', 'Ads'],
              },
              {
                icon: Target,
                title: 'Content Strategy',
                desc: 'Audience analysis, positioning and a results-driven content plan.',
                tags: ['Social SEO', 'Pillar', 'KPI'],
              },
              {
                icon: Sparkles,
                title: 'Motion Graphics',
                desc: 'Animations, titles and motion graphics that elevate your brand.',
                tags: ['After Effects', 'Logo Reveal', 'Lower Third'],
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-7 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/20"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
                  <s.icon className="w-6 h-6 text-red-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-gray-400 border border-zinc-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-red-500 text-sm font-semibold uppercase tracking-wider mb-3">
              Process
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              How I work, step by step
            </h2>
            <p className="text-gray-400 text-lg">
              A structured workflow from first brief to final delivery, so you
              always know exactly what happens next.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', icon: Zap, title: 'Brief', desc: 'In-depth analysis of your brand, goals and target audience.' },
              { num: '02', icon: Target, title: 'Strategy', desc: 'Tailored editorial plan, content calendar and creative concept.' },
              { num: '03', icon: Film, title: 'Production', desc: 'Professional editing, color grading and sound design.' },
              { num: '04', icon: CheckCircle2, title: 'Delivery', desc: 'Platform-optimized exports, delivered on schedule.' },
            ].map((step) => (
              <div
                key={step.num}
                className="group relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 transition-all duration-300 hover:border-red-600/50 hover:bg-zinc-900/70 hover:-translate-y-1"
              >
                <span className="pointer-events-none select-none absolute -top-2 right-3 text-6xl font-bold leading-none text-zinc-800/60 transition-colors duration-300 group-hover:text-red-900/50">
                  {step.num}
                </span>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-6 shadow-lg shadow-red-900/40">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTATTI */}
      <section id="contatti" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Ready to make your
            <span className="text-red-500"> brand</span> take off?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Tell me about your project: I'll get back to you within 24 hours with
            a tailored proposal.
          </p>

          {formSent ? (
            <div className="bg-zinc-900/70 border border-red-600/40 rounded-2xl p-10 max-w-md mx-auto">
              <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Message sent!</h3>
              <p className="text-gray-400 text-sm">
                Thanks for your interest. I'll be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 text-left max-w-2xl mx-auto backdrop-blur"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-black/60 border border-zinc-700 focus:border-red-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-black/60 border border-zinc-700 focus:border-red-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">
                  Project type
                </label>
                <select
                  required
                  name="projectType"
                  defaultValue=""
                  className="w-full bg-black/60 border border-zinc-700 focus:border-red-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Video Editing</option>
                  <option>Social Media Management</option>
                  <option>Short-form / Reel</option>
                  <option>Video Promo / Corporate</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-black/60 border border-zinc-700 focus:border-red-500 rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
                />
              </div>

              {formError && (
                <p className="text-sm text-red-400 mb-4" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={formSending}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed px-7 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-red-900/40 hover:shadow-red-700/60 hover:scale-[1.02]"
              >
                {formSending ? 'Sending...' : 'Send request'}{' '}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-5 mt-10">
            <a
              href="#"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full border border-zinc-700 hover:border-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="Stiledicaratterenormale1 !text-[28px]">StefanoGraphicagent</p>
          <p className="text-xs text-gray-600">
            © Social Media Manager &amp; Video Editor. All rights reserved.
          </p>
        </div>
      </footer>

      {/* VIDEO LIGHTBOX */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            aria-label="Chiudi"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <video
            src={activeVideo}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}

export default App;
