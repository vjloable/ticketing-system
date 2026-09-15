import ffmpegPath from "ffmpeg-static"
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

const publicDir = path.resolve(process.cwd(), "public")

function compressFile(inputFile, outputFile, args) {
  return new Promise((resolve, reject) => {
    console.log(`\n⏳ Compressing: ${path.basename(inputFile)} -> ${path.basename(outputFile)}...`)
    const proc = spawn(ffmpegPath, ["-y", "-i", inputFile, ...args, outputFile], {
      stdio: "inherit",
    })
    proc.on("close", (code) => {
      if (code === 0) {
        const stats = fs.statSync(outputFile)
        const mb = (stats.size / (1024 * 1024)).toFixed(2)
        console.log(`✅ Finished: ${path.basename(outputFile)} (${mb} MB)`)
        resolve()
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`))
      }
    })
  })
}

async function run() {
  const mp4In = path.join(publicDir, "opfbex25-highlights.mp4")
  const mp4Out = path.join(publicDir, "opfbex25-highlights-compressed.mp4")

  const webmIn = path.join(publicDir, "opfbex25-highlights.webm")
  const webmOut = path.join(publicDir, "opfbex25-highlights-compressed.webm")

  // 1. Compress MP4 (Capped bitrate target: ~38 MB)
  if (fs.existsSync(mp4In)) {
    await compressFile(mp4In, mp4Out, [
      "-c:v", "libx264",
      "-b:v", "1000k",
      "-maxrate", "1200k",
      "-bufsize", "2000k",
      "-crf", "28",
      "-preset", "fast",
      "-movflags", "+faststart",
      "-c:a", "aac",
      "-b:a", "96k",
    ])
  }

  // 2. Compress WebM (Capped bitrate target: ~35 MB)
  if (fs.existsSync(webmIn)) {
    await compressFile(webmIn, webmOut, [
      "-c:v", "libvpx-vp9",
      "-b:v", "950k",
      "-crf", "34",
      "-c:a", "libopus",
      "-b:a", "64k",
    ])
  }

  console.log("\n🎉 Done! You can now replace the originals or upload the compressed files directly to Supabase.")
}

run().catch((err) => {
  console.error("Compression failed:", err)
})