import ffmpegPath from "ffmpeg-static"
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

// 1. Locate input file (accepts path from terminal argument, or checks common locations)
const defaultCandidates = [
  process.argv[2],
  path.resolve(process.cwd(), "opfbex25-highlights.webm"),
  path.resolve(process.cwd(), "public", "opfbex25-highlights.webm"),
]

const inputFile = defaultCandidates.find((f) => f && fs.existsSync(f))

if (!inputFile) {
  console.error("❌ Input video not found!")
  console.log("\nPlease either:")
  console.log("  1. Place 'opfbex25-highlights.webm' in the project root or public/ folder, OR")
  console.log('  2. Run: node scripts/compress-hero-loop.mjs "C:\\path\\to\\your\\downloaded.webm"\n')
  process.exit(1)
}

const outputDir = path.dirname(inputFile)
const outputFile = path.join(outputDir, "opfbex25-highlights-compressed.webm")

const originalSizeMb = (fs.statSync(inputFile).size / (1024 * 1024)).toFixed(2)
console.log(`\n🎬 Input file:      ${inputFile} (${originalSizeMb} MB)`)
console.log(`🎯 Output target:   ${outputFile}`)
console.log(`⚙️ Settings:        Audio removed (-an), 720p web scale, VP9 webm optimization...\n`)

// 2. FFmpeg compression arguments targeting 2 - 4 MB
const ffmpegArgs = [
  "-y",
  "-i", inputFile,
  "-an",                       // 🚫 REMOVE AUDIO (saves space & decodes faster)
  "-vf", "scale=-2:720",       // 📐 Scale to 720p height (crisp for background loop)
  "-c:v", "libvpx-vp9",        // 🎥 High-efficiency VP9 WebM codec
  "-b:v", "450k",              // ⚡ Target video bitrate
  "-minrate", "300k",
  "-maxrate", "600k",          // 🔒 Hard cap to prevent file spikes
  "-crf", "36",                // ⚖️ High visual quality constant rate factor
  "-deadline", "good",
  "-cpu-used", "3",            // 🚀 Fast multi-threaded compression
  outputFile,
]

const proc = spawn(ffmpegPath, ffmpegArgs, { stdio: "inherit" })

proc.on("close", (code) => {
  if (code === 0) {
    const finalSizeMb = (fs.statSync(outputFile).size / (1024 * 1024)).toFixed(2)
    const savings = ((1 - finalSizeMb / originalSizeMb) * 100).toFixed(1)

    console.log(`\n🎉 Successfully compressed!`)
    console.log(`📊 Original Size:   ${originalSizeMb} MB`)
    console.log(`📊 Compressed Size: ${finalSizeMb} MB (${savings}% bandwidth saved!)`)
    console.log(`\nNext step: Upload '${path.basename(outputFile)}' (renamed back to 'opfbex25-highlights.webm') to Supabase Storage -> assets bucket.`)
  } else {
    console.error(`\n❌ FFmpeg failed with exit code ${code}`)
  }
})