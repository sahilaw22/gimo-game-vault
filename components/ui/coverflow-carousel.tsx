"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  account?: string;
  email?: string;
  password?: string;
  emailPass?: string;
  extra?: string;
  tags?: string[];
  meta?: { label: string; value: string }[];
  onOpenDetails?: () => void;
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  label?: string;
  className?: string;
  cardClassName?: string;
  onSelectSlide?: (index: number) => void;
}

export function CoverflowCarousel({
  slides,
  rotate = 40,
  depth = 0.55,
  perspective = 3.2,
  falloff = 0.55,
  fade = 0.1,
  cardWidth = "clamp(240px, 30vw, 380px)",
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = true,
  label = "Cover carousel",
  className,
  cardClassName,
  onSelectSlide,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  React.useEffect(() => {
    onSelectSlide?.(selected);
  }, [selected, onSelectSlide]);

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  // Auto advance every 3000ms (3 seconds) continuously
  React.useEffect(() => {
    if (isHovered || count <= 1) return;
    const timer = setInterval(() => {
      nudge(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, count, nudge]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const active = slides[selected];

  const handleCardClick = (index: number) => {
    if (index === selected && slides[index]?.onOpenDetails) {
      slides[index].onOpenDetails!();
    } else {
      goTo(index);
    }
  };

  return (
    <div
      className={cn("w-full relative px-2 sm:px-4", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-6 outline-none ring-ring focus-visible:ring-2 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "calc(var(--cf-card) * 0.5625)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onClick={() => handleCardClick(index)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={cn(
                  "absolute left-1/2 top-0 aspect-[16/9] overflow-hidden rounded-2xl bg-[#14171f] shadow-2xl will-change-transform cursor-pointer border border-zinc-800 hover:bg-[#1a1d26] hover:border-zinc-700/80 transition-all group",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thick Chevron Arrow Buttons without Background Box */}
        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={(e) => {
                e.stopPropagation();
                nudge(-1);
              }}
              className="absolute left-[-12px] sm:left-[-20px] top-1/2 z-[300] -translate-y-1/2 text-zinc-400 hover:text-white p-2 transition-all transform hover:scale-125"
            >
              <ChevronLeft className="w-8 h-8 stroke-[3.5]" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={(e) => {
                e.stopPropagation();
                nudge(1);
              }}
              className="absolute right-[-12px] sm:right-[-20px] top-1/2 z-[300] -translate-y-1/2 text-zinc-400 hover:text-white p-2 transition-all transform hover:scale-125"
            >
              <ChevronRight className="w-8 h-8 stroke-[3.5]" />
            </button>
          </>
        )}
      </div>

      {/* Active Featured Game Details Box (Left-Aligned Text Inside Border, View Details Outside) */}
      {showCaption && active?.title && (
        <div
          key={selected}
          className="mt-2 flex flex-col items-center px-4 duration-300 animate-in fade-in max-w-md mx-auto w-full space-y-2.5"
        >
          {/* White Game Title */}
          <h3 className="text-xl font-extrabold tracking-tight text-white uppercase text-center">
            {active.title}
          </h3>

          {/* Left Aligned Details Inside Border Box */}
          <div className="bg-[#12151c]/90 border border-zinc-800/90 rounded-2xl p-3.5 w-full shadow-xl font-mono text-xs space-y-1.5 text-left">
            {active.account && (
              <div className="flex items-center justify-between min-w-0">
                <span className="text-zinc-500 uppercase">Account / ID:</span>
                <span className="text-zinc-100 font-bold truncate ml-2">{active.account}</span>
              </div>
            )}
            {active.email && (
              <div className="flex items-center justify-between min-w-0">
                <span className="text-zinc-500 uppercase">Email:</span>
                <span className="text-zinc-200 truncate ml-2">{active.email}</span>
              </div>
            )}
            {active.extra && (
              <div className="flex items-center justify-between min-w-0 text-[11px]">
                <span className="text-zinc-500 uppercase">Notes:</span>
                <span className="text-zinc-400 truncate ml-2">{active.extra}</span>
              </div>
            )}
          </div>

          {/* View Details Button Outside the Border Box */}
          {active.onOpenDetails && (
            <button
              onClick={active.onOpenDetails}
              className="inline-flex items-center gap-1.5 text-xs font-mono bg-zinc-900 hover:bg-[#f0645d] text-zinc-200 hover:text-white px-5 py-2 rounded-full border border-zinc-800 transition-all shadow-md font-semibold"
            >
              <Eye className="w-3.5 h-3.5" /> View Details
            </button>
          )}

        </div>
      )}

      {showPagination && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                index === selected
                  ? "w-8 bg-[#f0645d] opacity-100 shadow-sm shadow-[#f0645d]/50"
                  : "w-2 bg-zinc-700 opacity-40 hover:opacity-80",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
