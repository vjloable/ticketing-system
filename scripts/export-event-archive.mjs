import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://epgezqrigtwjngppxpyh.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper to paginate through Supabase to bypass 1,000-row limit
async function fetchAllRows(table, selectColumns) {
  let allRows = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(selectColumns)
      .range(from, from + batchSize - 1);

    if (error) {
      console.error(`Error fetching ${table}:`, error.message);
      break;
    }
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < batchSize) break;
    from += batchSize;
  }
  return allRows;
}

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

async function main() {
  console.log("📦 Starting OPFBEX 2026 Archive Extraction...");

  const archiveDir = path.resolve("archive");
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  // 1. Fetch Passes
  console.log("⏳ Exporting all passes...");
  const passes = await fetchAllRows(
    "passes",
    "id, ticket_code, pass_type, status, form_data, checked_in_at, checked_in_day1_at, checked_in_day2_at, created_at"
  );
  console.log(`✅ Loaded ${passes.length} pass records.`);

  // 2. Fetch Google Forms
  console.log("⏳ Exporting Google Forms registrants...");
  const gforms = await fetchAllRows("google_forms_registrants", "*");
  console.log(`✅ Loaded ${gforms.length} Google Forms records.`);

  // 3. Fetch Feedback
  console.log("⏳ Exporting submitted feedback...");
  const feedback = await fetchAllRows("feedback", "*");
  console.log(`✅ Loaded ${feedback.length} feedback submissions.`);

  // Save Raw JSON snapshots
  fs.writeFileSync(path.join(archiveDir, "passes_raw.json"), JSON.stringify(passes, null, 2));
  fs.writeFileSync(path.join(archiveDir, "gforms_raw.json"), JSON.stringify(gforms, null, 2));
  fs.writeFileSync(path.join(archiveDir, "feedback_raw.json"), JSON.stringify(feedback, null, 2));

  // 4. Generate Master Attendees CSV
  const masterHeaders = [
    "Ticket Code",
    "Pass Type",
    "Full Name",
    "Email",
    "Phone",
    "Organization / School",
    "Job Title",
    "City / Province",
    "Age Group",
    "Purposes",
    "Days Attending",
    "Status",
    "Attended Day 1",
    "Day 1 Check-In Time",
    "Attended Day 2",
    "Day 2 Check-In Time",
    "Registration Date",
  ];

  const csvRows = [masterHeaders.join(",")];

  passes.forEach((p) => {
    const fd = p.form_data || {};
    const purposes = Array.isArray(fd.purposes) ? fd.purposes.join("; ") : fd.purposes || "";
    const days = Array.isArray(fd.daysAttending) ? fd.daysAttending.join("; ") : fd.daysAttending || "";

    const row = [
      escapeCsv(p.ticket_code),
      escapeCsv(p.pass_type),
      escapeCsv(fd.fullName || fd.contactPerson || "Attendee"),
      escapeCsv(fd.email),
      escapeCsv(fd.phone),
      escapeCsv(fd.organization || fd.companyName),
      escapeCsv(fd.jobTitle),
      escapeCsv(fd.cityProvince),
      escapeCsv(fd.age),
      escapeCsv(purposes),
      escapeCsv(days),
      escapeCsv(p.status),
      escapeCsv(p.checked_in_day1_at ? "Yes" : "No"),
      escapeCsv(p.checked_in_day1_at ? new Date(p.checked_in_day1_at).toLocaleString("en-PH", { timeZone: "Asia/Manila" }) : ""),
      escapeCsv(p.checked_in_day2_at ? "Yes" : "No"),
      escapeCsv(p.checked_in_day2_at ? new Date(p.checked_in_day2_at).toLocaleString("en-PH", { timeZone: "Asia/Manila" }) : ""),
      escapeCsv(p.created_at ? new Date(p.created_at).toLocaleString("en-PH", { timeZone: "Asia/Manila" }) : ""),
    ];
    csvRows.push(row.join(","));
  });

  const csvPath = path.join(archiveDir, "opfbex2026_master_attendees.csv");
  fs.writeFileSync(csvPath, csvRows.join("\n"));

  console.log(`\n🎉 ARCHIVAL COMPLETE!`);
  console.log(`📁 Files saved in: ${archiveDir}/`);
  console.log(` - opfbex2026_master_attendees.csv (Complete Attendee Directory)`);
  console.log(` - passes_raw.json (${passes.length} passes)`);
  console.log(` - gforms_raw.json (${gforms.length} Google Forms records)`);
  console.log(` - feedback_raw.json (${feedback.length} feedback responses)`);
}

main().catch(console.error);