import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const LOGOS_DIR = path.join(process.cwd(), 'public', 'business_logos')
const BRAND_DATA_PATH = path.join(process.cwd(), 'lib', 'brand-data.ts')
const KEEP_PNG = process.argv.includes('--keep-png')

function getAllPngFiles(dir) {
  let results = []
  if (!fs.existsSync(dir)) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results = results.concat(getAllPngFiles(fullPath))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      results.push(fullPath)
    }
  }
  return results
}

async function convertLogos() {
  console.log('🔍 Scanning for PNG logos in public/business_logos...\n')
  const pngFiles = getAllPngFiles(LOGOS_DIR)

  if (pngFiles.length === 0) {
    console.log('✨ No PNG files found to convert.')
    return
  }

  console.log(`🚀 Found ${pngFiles.length} PNG logos. Converting to WebP...\n`)

  let totalOriginalSize = 0
  let totalConvertedSize = 0
  let successCount = 0

  for (const pngPath of pngFiles) {
    const webpPath = pngPath.replace(/\.png$/i, '.webp')
    const originalSize = fs.statSync(pngPath).size
    totalOriginalSize += originalSize

    try {
      await sharp(pngPath)
        .webp({ quality: 90, effort: 4 })
        .toFile(webpPath)

      const convertedSize = fs.statSync(webpPath).size
      totalConvertedSize += convertedSize
      successCount++

      const savings = (((originalSize - convertedSize) / originalSize) * 100).toFixed(1)
      const relPath = path.relative(process.cwd(), pngPath)
      console.log(`✅ [${savings}% smaller] ${relPath} ➔ .webp`)

      // Remove original PNG unless --keep-png was specified
      if (!KEEP_PNG) {
        fs.unlinkSync(pngPath)
      }
    } catch (err) {
      console.error(`❌ Failed to convert ${pngPath}:`, err.message)
    }
  }

  const totalSavedMb = ((totalOriginalSize - totalConvertedSize) / (1024 * 1024)).toFixed(2)
  const totalPercent = (((totalOriginalSize - totalConvertedSize) / totalOriginalSize) * 100).toFixed(1)

  console.log(`\n🎉 Successfully converted ${successCount} logos to WebP!`)
  console.log(`📉 Total space saved: ${totalSavedMb} MB (${totalPercent}% reduction)`)

  // Automatically update lib/brand-data.ts
  if (fs.existsSync(BRAND_DATA_PATH)) {
    console.log('\n📝 Updating lib/brand-data.ts with .webp extensions...')
    let content = fs.readFileSync(BRAND_DATA_PATH, 'utf8')
    content = content.replace(/\.png/g, '.webp')
    fs.writeFileSync(BRAND_DATA_PATH, content, 'utf8')
    console.log('✅ lib/brand-data.ts updated successfully!')
  }
}

convertLogos()