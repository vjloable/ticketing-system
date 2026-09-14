import fs from "fs"
import path from "path"
import { createClient } from "@supabase/supabase-js"

// Load env config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const csvPath = path.join(process.cwd(), "lib", "OPFBEX 2026 - EXPO REGISTRATION (Responses) - Form Responses 1.csv")

if (!fs.existsSync(csvPath)) {
  console.error("❌ CSV file not found at:", csvPath)
  process.exit(1)
}

const content = fs.readFileSync(csvPath, "utf8")

// Robust CSV parser supporting quotes & multiline fields
function parseCSV(text) {
  const rows = []
  let currentRow = []
  let currentField = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentField)
      currentField = ""
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i++
      currentRow.push(currentField)
      if (currentRow.some((f) => f.trim().length > 0)) {
        rows.push(currentRow)
      }
      currentRow = []
      currentField = ""
    } else {
      currentField += char
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField)
    if (currentRow.some((f) => f.trim().length > 0)) rows.push(currentRow)
  }
  return rows
}

async function runImport() {
  console.log("🚀 Starting Google Forms responses migration...")

  const rows = parseCSV(content)
  console.log(`📄 Total raw rows found: ${rows.length}`)

  const records = []
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const submittedAt = row[0]?.trim()
    const fullName = row[1]?.trim()
    const email = (row[2]?.trim() || row[12]?.trim() || "").toLowerCase()
    const phone = row[3]?.trim()
    const organization = row[4]?.trim() || null
    const jobTitle = row[5]?.trim() || null
    const cityProvince = row[6]?.trim() || null
    const age = row[7]?.trim() || null
    const purposes = row[8]?.trim() || null
    const daysAttending = row[9]?.trim() || null
    const howDidYouHear = row[10]?.trim() || null

    if (email && fullName) {
      records.push({
        submitted_at: submittedAt && !isNaN(Date.parse(submittedAt)) ? new Date(submittedAt).toISOString() : new Date().toISOString(),
        full_name: fullName,
        email: email,
        phone: phone || null,
        organization: organization,
        job_title: jobTitle,
        city_province: cityProvince,
        age: age,
        purposes: purposes,
        days_attending: daysAttending,
        how_did_you_hear: howDidYouHear,
      })
    }
  }

  console.log(`✨ Processed ${records.length} clean attendee records for import.`)

  // Batch insert in chunks of 50
  const chunkSize = 50
  let totalInserted = 0

  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize)
    const { error } = await supabase.from("google_forms_registrants").insert(chunk)

    if (error) {
      console.error(`❌ Error importing batch ${i} to ${i + chunk.length}:`, error.message)
    } else {
      totalInserted += chunk.length
      console.log(`✅ Imported ${totalInserted} / ${records.length} records...`)
    }
  }

  console.log(`\n🎉 Migration Complete! Successfully ingested ${totalInserted} Google Forms registrants into Supabase.`)
}

runImport().catch((err) => {
  console.error("Fatal error during import:", err)
})