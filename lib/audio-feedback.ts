// Web Audio API Sound Synthesizer for Booth Operations
// No external audio files, low latency, reliable offline

class AudioFeedback {
  private ctx: AudioContext | null = null

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }

    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume()

    return this.ctx
  }

  playSuccess() {
    try {
      const ctx = this.getContext()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"

      osc.frequency.setValueAtTime(587.33, now)
      osc.frequency.setValueAtTime(880, now + 0.1)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.35)
    } catch (error) {
      console.error("[Audio] Failed to play success sound:", error)
    }
  }

  playWarning() {
    try {
      const ctx = this.getContext()
      if (!ctx) return

      const now = ctx.currentTime
      const playBeep = (startTime: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = "triangle"
        osc.frequency.setValueAtTime(440, startTime)

        gain.gain.setValueAtTime(0.35, startTime)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + 0.12)
      }

      playBeep(now)
      playBeep(now + 0.15)
    } catch (error) {
      console.error("[Audio] Failed to play warning sound:", error)
    }
  }

  playError() {
    try {
      const ctx = this.getContext()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.3)

      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.3)
    } catch (error) {
      console.error("[Audio] Failed to play error sound:", error)
    }
  }
}

export const audioFeedback = new AudioFeedback()