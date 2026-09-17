"use client"

import { useState } from "react"
import { Section } from "./Section"

export function FoodForwardForumSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const pillars = [
    {
      no: "01",
      name: "Food Security",
      question: "Can we feed our people?",
      accent: "text-emerald-400",
      border: "hover:border-emerald-400/50",
      desc: "Strengthening food security, resilient local supply chains, and localized farm-to-kitchen continuity.",
    },
    {
      no: "02",
      name: "Food Sustainability",
      question: "Can we sustain our food systems for generations?",
      accent: "text-lime",
      border: "hover:border-lime/50",
      desc: "Advancing zero-waste practices, eco-packaging, and regenerative agriculture across the foodservice sector.",
    },
    {
      no: "03",
      name: "Food Technology",
      question: "Can we innovate how food is produced, moved, and consumed?",
      accent: "text-marigold",
      border: "hover:border-marigold/50",
      desc: "Harnessing smart kitchen automation, AgTech, cold-chain modernization, and digitized operations.",
    },
    {
      no: "04",
      name: "Food Investment",
      question: "Can we build businesses and attract capital to make it all happen?",
      accent: "text-tangerine",
      border: "hover:border-tangerine/50",
      desc: "Unlocking culinary capital, MSME enterprise incubation, and investment infrastructure for food brands.",
    },
    {
      no: "05",
      name: "Food Tourism",
      question: "Can food become a driver of destination, culture, and growth?",
      accent: "text-basil",
      border: "hover:border-basil/50",
      desc: "Expanding gastro-tourism, preserving culinary heritage, and cementing Pampanga as a culinary beacon.",
    },
  ]

  const speakers = [
    {
      name: "Pruds Garcia",
      role: "President",
      organization: "Mekeni Food Corporation",
      topic: "Building Filipino Food Brands for the Future",
      accent: "border-emerald-400/40 text-emerald-400",
      badge: "Industry Leader",
    },
    {
      name: "Jun Sy",
      role: "President",
      organization: "TAO Corporation",
      topic: "Scaling Filipino Businesses: From Local to Bigger Markets",
      accent: "border-marigold/40 text-marigold",
      badge: "Enterprise Scale",
    },
    {
      name: "Mark Villaflor",
      role: "President",
      organization: "DARA Consulting",
      topic: "Innovation, Technology & the Future of Business",
      accent: "border-emerald-400/40 text-emerald-400",
      badge: "Digital & FoodTech",
    },
    {
      name: "Dr. Richard Daenos",
      role: "Regional Director",
      organization: "Department of Tourism — Region III",
      topic: "Food, Destinations & the Tourism Economy",
      accent: "border-lime/40 text-lime",
      badge: "Gastro-Tourism",
    },
    {
      name: "Usec. Arrey Perez",
      role: "Undersecretary",
      organization: "Department of Agriculture",
      topic: "Agriculture, Food Security & Future of Philippine Food",
      accent: "border-tangerine/40 text-tangerine",
      badge: "National Policy",
    },
    {
      name: "Felix Niño Asuncion",
      role: "President & Fellowship Director",
      organization: "AF Ventures Inc. · Pampanga Business Circle",
      topic: "The Entrepreneur’s Role in Building What’s Next",
      accent: "border-marigold/40 text-marigold",
      badge: "Venture & Capital",
    },
  ]

  const totalSlides = speakers.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <Section
      id="food-forward-forum"
      index="04"
      label="Leadership Conference"
      title="Food Forward Forum 2026"
      action={
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-emerald-400 font-bold">
            Sept 19 · 2:00 PM – 5:00 PM
          </span>
          <span className="eyebrow border border-white/20 bg-white/5 px-3.5 py-1.5 text-white/80">
            SMX Clark Meeting Room 1
          </span>
        </div>
      }
    >
      <div className="space-y-10">
        {/* Food Forward Hero Showcase (Botanical White Canvas) */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-700/30 bg-linear-to-br from-[#ffffff] via-[#f3f9f5] to-[#e4f4eb] p-8 sm:p-12 text-emerald-950 shadow-2xl ring-1 ring-white/20">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-emerald-700 via-amber-500 to-emerald-700" />
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/45 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl" />

          {/* Sub-Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/15 pb-5 mb-8">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="eyebrow text-emerald-950 font-black tracking-wider text-xs">
                Co-Presented by Pampanga Business Circle
              </span>
            </div>
            <div className="text-xs uppercase tracking-widest text-amber-800 font-mono font-bold">
              Theme: &ldquo;From Farm to Business to Community&rdquo;
            </div>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left: Logo & Badges */}
            <div className="flex flex-col items-start lg:col-span-5 space-y-6">
              <div className="w-full flex items-center justify-center lg:justify-start py-2">
                <img
                  src="/food-forward-forum-logo.webp"
                  alt="Food Forward Forum 2026"
                  className="h-32 sm:h-40 md:h-46 w-auto max-w-full object-contain drop-shadow-[0_10px_25px_rgba(6,78,59,0.12)] transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="border border-emerald-700/35 bg-emerald-700/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-900 rounded-sm">
                  Thought Leadership
                </span>
                <span className="border border-amber-600/40 bg-amber-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 rounded-sm">
                  AgTech &amp; Gastro-Tourism
                </span>
                <span className="border border-emerald-950/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950 rounded-sm shadow-xs">
                  Executive Summit
                </span>
              </div>
            </div>

            {/* Right: Quoted Headline & Narrative */}
            <div className="flex flex-col justify-between space-y-6 lg:col-span-7 lg:border-l lg:border-emerald-900/15 lg:pl-10">
              <div>
                <div className="eyebrow text-emerald-700 font-extrabold tracking-widest text-xs">
                  The Premier Industry Dialogue
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-emerald-950">
                  &ldquo;Shaping the Future of Food &amp; Beverage in Central Luzon.&rdquo;
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-emerald-900/80 font-normal">
                  The Food Forward Forum convenes leading industrialists, policy makers, agricultural innovators,
                  and restaurateurs. Together, we analyze high-impact strategies across supply security,
                  sustainable gastronomy, food-tech infrastructure, and Pampanga&apos;s global positioning.
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-900/15 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-emerald-950 text-sm">
                    Saturday, Sept 19, 2026 · 2:00 PM – 5:00 PM
                  </div>
                  <div className="text-emerald-800/70 mt-0.5">
                    Meeting Room 1, SMX Convention Center Clark
                  </div>
                </div>
                <div className="flex items-center gap-2 border border-emerald-800/30 bg-emerald-800/10 px-3.5 py-1.5 rounded-sm font-bold uppercase tracking-wider text-xs text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>VIP, Sponsor &amp; Forum Delegates</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Framework Pillars */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="font-display text-xl font-bold text-white">
                Food Forward Framework
              </h4>
              <p className="text-xs text-white/50">
                Farm → Food → Business → Innovation → Destination → Community
              </p>
            </div>
            <span className="eyebrow text-emerald-400 hidden sm:inline-block">5 Strategic Pillars</span>
          </div>

          <div className="grid border-t border-l border-white/12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((p) => (
              <div
                key={p.no}
                className={`border-b border-r border-white/12 bg-grape-950/60 p-5 transition-all hover:bg-emerald-950/30 ${p.border}`}
              >
                <div className={`font-display text-xl font-black ${p.accent}`}>
                  {p.no}
                </div>
                <div className="mt-2 font-display text-base font-bold text-white">
                  {p.name}
                </div>
                <div className="mt-1 text-[11px] italic text-marigold font-medium">
                  {p.question}
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-white/60">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Keynote Speaker Carousel */}
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-xl font-bold text-white">
                Distinguished Keynote Speakers &amp; Panelists
              </h4>
              <p className="text-xs text-white/50">
                Industry leaders and pioneers shaping Central Luzon&apos;s culinary future
              </p>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center gap-3">
              <span className="eyebrow text-emerald-400 font-bold text-xs">
                {currentSlide + 1} / {totalSlides}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous speaker"
                  className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5 text-sm font-bold text-white transition-all hover:border-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-400 cursor-pointer"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next speaker"
                  className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/5 text-sm font-bold text-white transition-all hover:border-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-400 cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Desktop & Tablet Carousel Viewport */}
          <div className="grid border-t border-l border-white/12 grid-cols-1 md:grid-cols-3">
            {[0, 1, 2].map((offset) => {
              const speakerIndex = (currentSlide + offset) % totalSlides
              const s = speakers[speakerIndex]

              return (
                <div
                  key={`${s.name}-${speakerIndex}`}
                  className="group flex flex-col justify-between border-b border-r border-white/12 bg-grape-900/40 p-6 transition-all duration-300 hover:bg-emerald-950/30 hover:border-emerald-400/50"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center border font-display text-xs font-black ${s.accent} bg-white/5`}>
                        {s.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <span className="border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {s.badge}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h5 className="font-display text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {s.name}
                      </h5>
                      <div className="text-[11px] font-semibold text-white/70">
                        {s.role}
                      </div>
                      <div className="mt-2 text-xs font-bold text-marigold">
                        {s.organization}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/8 pt-3">
                    <div className="eyebrow text-[9px] text-emerald-400/80 font-bold">Keynote Topic</div>
                    <p className="mt-1 text-xs italic text-white/75 leading-snug">
                      &ldquo;{s.topic}&rdquo;
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Slide Indicator Dots */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {speakers.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all cursor-pointer rounded-full ${
                  currentSlide === idx
                    ? "w-6 bg-emerald-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}