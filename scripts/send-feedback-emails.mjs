import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// 1. Configuration
const SUPABASE_URL = "https://epgezqrigtwjngppxpyh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_sqkEMD9OoD97ZES8c_pRsw_jNQl2PA-";

const GMAIL_USER = "opfbex2026.tickets@gmail.com";
const GMAIL_APP_PASS = "obey odom rfud wrgw"; // Your working Gmail App Password

// Website Feedback Link
const FEEDBACK_URL = "https://opfbex.project01.ph/feedback";

// Test Mode: Set to true to test with YOUR email first.
// Set to false when you are ready to send to everyone!
const TEST_MODE = false;
const TEST_RECIPIENT = "opfbex2026.tickets@gmail.com";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASS,
  },
});

function getFeedbackHtmlTemplate(fullName, feedbackLink) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; background-color: #0b0716; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #2d2438; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
      
      <!-- Top Colorful Accent Bar -->
      <div style="height: 6px; background: linear-gradient(90deg, #e11d48 0%, #f97316 25%, #eab308 50%, #10b981 75%, #84cc16 100%);"></div>

      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #1c1427 0%, #2f1238 100%); padding: 28px 20px; text-align: center; border-bottom: 1px solid #3b2d54;">
        <span style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase;">
          <span style="color: #e11d48;">O</span><span style="color: #f97316;">P</span><span style="color: #eab308;">F</span><span style="color: #eab308;">B</span><span style="color: #10b981;">E</span><span style="color: #84cc16;">X</span>
          <span style="color: #ffffff; margin-left: 6px;">2026</span>
        </span>
        <p style="margin: 6px 0 0 0; color: #eab308; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
          Central Luzon Culinary Expo • Official Event Wrap-up
        </p>
      </div>

      <!-- Body Content -->
      <div style="padding: 28px 24px; text-align: center;">
        <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 20px; font-weight: 800; line-height: 1.3;">
          Thank You for Celebrating 5 Delicious Days with Us!
        </h2>

        <p style="margin: 0 0 16px 0; font-size: 14px; color: #e2e8f0; text-align: left; line-height: 1.5;">
          Hello <strong style="color: #ffffff;">${fullName}</strong>,
        </p>

        <p style="margin: 0 0 16px 0; font-size: 13px; color: #cbd5e1; text-align: left; line-height: 1.6;">
          From the intense live showdowns of the <strong>One Pampanga Culinary Cup</strong> at SM City Clark, to the <strong>Heritage Culinary Tour</strong>, and the bustling trade halls &amp; <strong>Food Forward Forum</strong> at SMX Clark — your participation made OPFBEX 2026 a landmark milestone for Philippine gastronomy!
        </p>

        <p style="margin: 0 0 24px 0; font-size: 13px; color: #cbd5e1; text-align: left; line-height: 1.6;">
          As we begin planning for <strong>OPFBEX 2027</strong>, your thoughts are deeply important to us. Please take <strong>2 quick minutes</strong> to share your feedback, favorite moments, and suggestions for improvement.
        </p>

        <!-- QR Code & Feedback Box -->
        <div style="background-color: #160e29; border: 1px dashed rgba(234, 179, 8, 0.4); border-radius: 12px; padding: 22px 18px; margin-bottom: 24px;">
          <p style="margin: 0 0 14px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #eab308;">
            Scan with Your Camera or Tap Below
          </p>

          <!-- Inline Attached QR Code -->
          <div style="margin-bottom: 16px;">
            <a href="${feedbackLink}" target="_blank" style="text-decoration: none; display: inline-block;">
              <img src="cid:feedbackqr" width="160" height="160" alt="OPFBEX Feedback QR Code" style="display: block; margin: 0 auto; border-radius: 8px; border: 4px solid #ffffff; background-color: #ffffff;" />
            </a>
          </div>

          <!-- Direct Feedback Button -->
          <div style="margin-top: 18px;">
            <a href="${feedbackLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); color: #0b0716; text-decoration: none; font-weight: 800; font-size: 14px; padding: 13px 28px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(234, 179, 8, 0.35);">
              Share Your Feedback Now →
            </a>
          </div>

          <p style="margin: 10px 0 0 0; font-size: 11px; color: #94a3b8;">
            Takes less than 2 minutes • Optional anonymous submission
          </p>
        </div>

        <div style="border-top: 1px dashed #2d2438; padding-top: 16px;">
          <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.4;">
            📍 <strong>Venues:</strong> SM City Clark • Angeles Heritage District • SMX Convention Center Clark<br>
            🤝 Organized by <strong>Pampanga Business Circle</strong>
          </p>
        </div>
      </div>
    </div>
  `;
}

function cleanEmail(rawEmail) {
  if (!rawEmail) return null;
  let email = rawEmail.trim().toLowerCase();

  // Fix common domain typos
  email = email.replace(/@gmailcom$/, "@gmail.com");
  email = email.replace(/@gmail\.con$/, "@gmail.com");
  email = email.replace(/@gmal\.con$/, "@gmail.com");
  email = email.replace(/@gamil\.com$/, "@gmail.com");

  if (!email.includes("@") || !email.includes(".")) return null;
  return email;
}

async function run() {
  console.log("🚀 Verifying Gmail SMTP connection...");
  await transporter.verify();
  console.log("✅ Gmail SMTP connected as:", GMAIL_USER);

  // Check that the QR code file exists
  const qrPath = path.resolve("public/feedback-qr.png");
  if (!fs.existsSync(qrPath)) {
    console.error("❌ QR code image not found at:", qrPath);
    return;
  }

  const mailAttachments = [
    {
      filename: "feedback-qr.png",
      path: qrPath,
      cid: "feedbackqr",
    },
  ];

  // 1. TEST MODE
  if (TEST_MODE) {
    console.log(`\n🧪 TEST MODE ACTIVE: Sending 1 test email to ${TEST_RECIPIENT}...`);

    await transporter.sendMail({
      from: `"OPFBEX 2026" <${GMAIL_USER}>`,
      to: TEST_RECIPIENT,
      replyTo: GMAIL_USER,
      subject: "Thank You for Joining OPFBEX 2026! We Value Your Feedback ★",
      html: getFeedbackHtmlTemplate("Josh (Test)", FEEDBACK_URL),
      attachments: mailAttachments,
    });

    console.log("✅ Test email sent successfully! Please check your inbox at:", TEST_RECIPIENT);
    console.log("👉 When satisfied, set `const TEST_MODE = false` in this file and run again to send to all attendees.\n");
    return;
  }

  // 2. LIVE BATCH DISPATCH
  console.log("\n📦 Fetching attendees from database...");

  // A. Fetch from google_forms_registrants
  const { data: gforms, error: gError } = await supabase
    .from("google_forms_registrants")
    .select("full_name, email");

  if (gError) {
    console.error("Error fetching Google Forms registrants:", gError);
  }

  // B. Fetch from passes table
  const { data: passes, error: pError } = await supabase
    .from("passes")
    .select("form_data");

  if (pError) {
    console.error("Error fetching passes table:", pError);
  }

  // Consolidate & deduplicate by email
  const attendeesMap = new Map();

  gforms?.forEach((r) => {
    const email = cleanEmail(r.email);
    if (email) {
      attendeesMap.set(email, r.full_name?.trim() || "OPFBEX Attendee");
    }
  });

  passes?.forEach((p) => {
    const email = cleanEmail(p.form_data?.email);
    if (email && !attendeesMap.has(email)) {
      attendeesMap.set(email, p.form_data?.fullName?.trim() || "OPFBEX Attendee");
    }
  });

  const attendeeList = Array.from(attendeesMap.entries()).map(([email, fullName]) => ({
    email,
    fullName,
  }));

  console.log(`📋 Found ${attendeeList.length} unique attendee emails across database.`);

  // Persistent send log so we never send twice
  const LOG_FILE = "scripts/sent-feedback-log.json";
  let sentLog = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      sentLog = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    } catch (e) {
      sentLog = [];
    }
  }
  const sentSet = new Set(sentLog);
  console.log(`📜 Already sent to ${sentSet.size} attendees in previous runs.`);

  let sentCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < attendeeList.length; i++) {
    const attendee = attendeeList[i];
    const email = attendee.email;
    const fullName = attendee.fullName;

    if (sentSet.has(email)) {
      skippedCount++;
      continue;
    }

    try {
      await transporter.sendMail({
        from: `"OPFBEX 2026" <${GMAIL_USER}>`,
        to: email,
        replyTo: GMAIL_USER,
        subject: "Thank You for Joining OPFBEX 2026! We Value Your Feedback ★",
        html: getFeedbackHtmlTemplate(fullName, FEEDBACK_URL),
        attachments: mailAttachments,
      });

      sentCount++;
      sentLog.push(email);
      sentSet.add(email);
      fs.writeFileSync(LOG_FILE, JSON.stringify(sentLog, null, 2));

      console.log(`✅ [${sentCount}] Sent to: ${fullName} <${email}>`);

      // 500ms delay between emails to respect Gmail rate limits
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (sendErr) {
      if (sendErr.message.includes("quota") || sendErr.responseCode === 550) {
        console.error(`\n🚨 GMAIL DAILY QUOTA REACHED at attendee #${sentCount}!`);
        console.log(`💾 All sent emails have been recorded to ${LOG_FILE}.`);
        console.log(`👉 You can run this command again tomorrow to seamlessly continue.\n`);
        break;
      }
      console.error(`❌ Failed to send to ${email}:`, sendErr.message);
    }
  }

  console.log(`\n🎉 DISPATCH COMPLETE! Sent: ${sentCount}, Skipped: ${skippedCount}`);
}

run().catch(console.error);