"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { EVENT_CONFIG } from "@/lib/event-config"

const MAX_MESSAGE_LENGTH = 1500
const COOLDOWN_SECONDS = 30

export default function FeedbackPage() {
  const [attendeeType, setAttendeeType] = useState<string>("visitor")
  const [rating, setRating] = useState<number>(3)
  const [wouldRecommend, setWouldRecommend] = useState<string>("Yes")
  const [category, setCategory] = useState<string>("General")
  const [message, setMessage] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)

  // Role-specific fields
  const [companyName, setCompanyName] = useState<string>("")
  const [boothNumber, setBoothNumber] = useState<string>("")
  const [footTrafficRating, setFootTrafficRating] = useState<string>("Good")
  const [reAttendNextYear, setReAttendNextYear] = useState<string>("Yes")

  // Security: Honeypot field (hidden from humans, filled by bots)
  const [honeypot, setHoneypot] = useState<string>("")

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // UX: Auto-populate if user is already logged into the ticketing system
  useEffect(() => {
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || "")
        if (user.user_metadata?.fullName) {
          setFullName(user.user_metadata.fullName)
        }
      }
    }
    checkUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    // 1. Bot Trap check: Silent reject if honeypot is touched
    if (honeypot.trim().length > 0) {
      console.warn("Spambot detected via honeypot.")
      setSubmitted(true)
      return
    }

    // 2. Cooldown check
    const lastSubmitTime = localStorage.getItem("opfbex_feedback_ts")
    if (lastSubmitTime && Date.now() - Number(lastSubmitTime) < COOLDOWN_SECONDS * 1000) {
      setErrorMsg(`Please wait a few seconds before submitting again.`)
      return
    }

    // 3. Validation
    const cleanMessage = message.trim()
    if (!cleanMessage) {
      setErrorMsg("Please provide your feedback or suggestions.")
      return
    }

    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      setErrorMsg(`Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`)
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("feedback").insert([
        {
          attendee_type: attendeeType,
          rating,
          category,
          message: cleanMessage,
          would_recommend: wouldRecommend,
          full_name: isAnonymous ? null : (fullName.trim() || null),
          email: isAnonymous ? null : (email.trim() || null),
          company_name: attendeeType !== "visitor" ? (companyName.trim() || null) : null,
          booth_number: attendeeType === "exhibitor" ? (boothNumber.trim() || null) : null,
          re_attend_next_year: attendeeType !== "visitor" ? reAttendNextYear : null,
          details: {
            footTrafficSatisfaction: attendeeType === "exhibitor" ? footTrafficRating : undefined,
          },
        },
      ])

      if (error) throw error

      // Save submission timestamp for cooldown
      localStorage.setItem("opfbex_feedback_ts", Date.now().toString())
      setSubmitted(true)
    } catch (err: any) {
      console.error("Error submitting feedback:", err)
      setErrorMsg("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const CATEGORY_OPTIONS: Record<string, string[]> = {
    visitor: [
      "General Experience",
      "Food Tastings & Variety",
      "Culinary Cup & Stage Demos",
      "Venue, AC & Facilities",
      "Registration & Ticketing",
      "Other Suggestions",
    ],
    exhibitor: [
      "Foot Traffic & Visitor Engagement",
      "Ingress, Egress & Logistics",
      "Booth Structure & Electricity",
      "Venue Cleanliness & Security",
      "Floor Layout & Booth Location",
      "Other Concerns",
    ],
    sponsor: [
      "Brand Exposure & Signage",
      "Stage & Program Recognition",
      "VIP & Hospitality Services",
      "Event Coordination & Management",
      "Other Suggestions",
    ],
    partner: [
      "Partnership Coordination",
      "Event Promotion & Marketing",
      "Venue Support",
      "Other",
    ],
    other: ["General Feedback", "Other Suggestions"],
  }

  return (
    <div className="min-h-screen bg-grape-950 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-display text-2xl font-black tracking-tight text-marigold">
              {EVENT_CONFIG.shortName}
            </span>
          </Link>
          <h1 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
            Feedback & Suggestions
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Help us improve {EVENT_CONFIG.shortName}! We value your thoughts and experience.
          </p>
        </div>

        {submitted ? (
          /* Thank You State */
          <div className="border border-basil/30 bg-basil/10 p-8 text-center backdrop-blur-sm shadow-xl">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="font-display text-2xl font-bold text-basil">Thank You!</h2>
            <p className="mt-2 text-sm text-white/70">
              Your feedback has been received. Thank you for helping us make OPFBEX 2026 even better!
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false)
                  setMessage("")
                }}
                className="border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
              >
                Submit Another Response
              </button>
              <Link
                href="/"
                className="border border-marigold bg-marigold px-4 py-2 text-xs font-bold uppercase tracking-wider text-grape-950 hover:bg-transparent hover:text-marigold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="border border-white/15 bg-grape-900 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            {errorMsg && (
              <div className="border border-chili/30 bg-chili/10 p-3 text-xs text-chili">
                {errorMsg}
              </div>
            )}

            {/* HONEYPOT ANTI-SPAM (Hidden from humans) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_url">Leave this empty</label>
              <input
                id="website_url"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Attendee Role */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                I am attending as a:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {["visitor", "exhibitor", "sponsor", "partner", "other"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAttendeeType(type)}
                    className={`py-2 px-2 text-xs font-bold uppercase tracking-wider border text-center transition-colors cursor-pointer ${
                      attendeeType === type
                        ? "border-marigold bg-marigold text-grape-950"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/40"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* CONDITIONAL: Exhibitor & Sponsor Company Info */}
            {attendeeType !== "visitor" && attendeeType !== "other" && (
              <div className="border border-marigold/30 bg-marigold/5 p-4 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-marigold">
                  {attendeeType === "exhibitor" ? "Exhibitor Details" : "Organization Details"}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">
                      Company / Brand Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Pampanga Delights"
                      className="w-full border border-white/15 bg-grape-950 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-marigold focus:outline-none"
                    />
                  </div>

                  {attendeeType === "exhibitor" && (
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">
                        Booth No. (Optional)
                      </label>
                      <input
                        type="text"
                        value={boothNumber}
                        onChange={(e) => setBoothNumber(e.target.value)}
                        placeholder="e.g. A-14, Food-02"
                        className="w-full border border-white/15 bg-grape-950 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-marigold focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Exhibitor Specific: Foot Traffic rating */}
                {attendeeType === "exhibitor" && (
                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">
                      Foot Traffic & Buyer Engagement at your booth:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Slow", "Moderate", "Good", "Outstanding"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFootTrafficRating(lvl)}
                          className={`py-1 text-[11px] font-medium border text-center transition-colors cursor-pointer ${
                            footTrafficRating === lvl
                              ? "border-marigold bg-marigold/20 text-marigold font-bold"
                              : "border-white/15 bg-white/5 text-white/60 hover:border-white/30"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Future Interest: Will you join again in 2027? */}
                <div>
                  <label className="block text-[11px] font-semibold text-white/70 mb-1">
                    Would you consider {attendeeType === "exhibitor" ? "exhibiting" : "partnering"} again for OPFBEX 2027?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Yes", "Maybe", "No"].map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => setReAttendNextYear(choice)}
                        className={`py-1 text-[11px] font-semibold border text-center transition-colors cursor-pointer ${
                          reAttendNextYear === choice
                            ? "border-basil bg-basil/20 text-basil"
                            : "border-white/15 bg-white/5 text-white/60 hover:border-white/30"
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Overall Rating */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                Overall Experience:
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`flex-1 py-2 text-lg border text-center transition-all cursor-pointer ${
                      rating >= star
                        ? "border-marigold bg-marigold/20 text-marigold font-bold"
                        : "border-white/15 bg-white/5 text-white/30"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>1 - Needs Improvement</span>
                <span>5 - Outstanding</span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                Topic / Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-white/15 bg-grape-950 px-3 py-2 text-sm text-white focus:border-marigold focus:outline-none"
              >
                {(CATEGORY_OPTIONS[attendeeType] || CATEGORY_OPTIONS.visitor).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Comments / Message */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Your Comments or Suggestions *
                </label>
                <span className={`text-[10px] ${message.length > MAX_MESSAGE_LENGTH ? "text-chili" : "text-white/40"}`}>
                  {message.length} / {MAX_MESSAGE_LENGTH}
                </span>
              </div>
              <textarea
                required
                rows={4}
                maxLength={MAX_MESSAGE_LENGTH}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you loved or what we can improve..."
                className="w-full border border-white/15 bg-grape-950 p-3 text-sm text-white placeholder-white/30 focus:border-marigold focus:outline-none"
              />
            </div>

            {/* NPS: Would Recommend */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                Would you recommend OPFBEX to colleagues or friends?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Yes", "Maybe", "No"].map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setWouldRecommend(choice)}
                    className={`py-1.5 text-xs font-semibold border text-center transition-colors cursor-pointer ${
                      wouldRecommend === choice
                        ? "border-basil bg-basil/20 text-basil"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Personal Info */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Contact Information
                </span>
                <label className="flex items-center gap-2 text-xs text-white/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="accent-marigold"
                  />
                  Submit anonymously
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-white/50 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full border border-white/15 bg-grape-950 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-marigold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-white/50 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full border border-white/15 bg-grape-950 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-marigold focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border border-marigold bg-marigold py-3 text-xs font-black uppercase tracking-widest text-grape-950 transition-colors hover:bg-transparent hover:text-marigold disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}