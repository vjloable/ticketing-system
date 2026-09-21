import nodemailer from "nodemailer";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

// 1. Configuration
const SUPABASE_URL = "https://epgezqrigtwjngppxpyh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_sqkEMD9OoD97ZES8c_pRsw_jNQl2PA-";

const GMAIL_USER = "opfbex2026.tickets@gmail.com";
const GMAIL_APP_PASS = "obey odom rfud wrgw"; // Your App Password

// Set TEST_MODE to true to send ONLY 1 test email to yourself first.
// When you're happy with it, change TEST_MODE to false to send to all attendees!
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

function getHtmlTemplate(fullName, expressLink, qrCodeUrl) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; background-color: #0b0716; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #2d2438; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
      
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #1c1427 0%, #2f1238 100%); padding: 24px 20px; text-align: center; border-bottom: 2px solid #ff462d;">
        <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">ONE PAMPANGA FOOD & BEVERAGE EXPO</h2>
        <p style="margin: 4px 0 0 0; color: #ff8c42; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">OPFBEX 2026 • Official Digital Pass</p>
      </div>

      <!-- Body Content -->
      <div style="padding: 24px 20px; text-align: center;">
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #e2e8f0;">Hello <strong style="color: #ffffff;">${fullName}</strong>,</p>
        <p style="margin: 0 0 20px 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
          Thank you for registering. Below is your official contactless express entry pass for OPFBEX 2026. Just show this to the registration staff and you will be let in right away!
        </p>

        <!-- Digital Badge Card -->
        <div style="background-color: #160e29; border: 1px solid #3b2d54; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a78bfa; font-weight: 700; margin-bottom: 4px;">ATTENDEE PASS</div>
          <div style="font-size: 18px; font-weight: bold; color: #ffffff; margin-bottom: 16px;">${fullName}</div>

          <!-- Clean QR Badge with Solid Logo Cutout -->
          <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; border-collapse: collapse;">
            <tr>
              <td align="center" valign="middle" width="200" height="200" background="${qrCodeUrl}" style="background-image: url('${qrCodeUrl}'); background-size: 200px 200px; background-position: center; background-repeat: no-repeat; width: 200px; height: 200px; border-radius: 8px;">
                <!--[if gte mso 9]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:200px;height:200px;">
                <v:fill type="frame" src="${qrCodeUrl}" color="#ffffff" />
                <v:textbox inset="0,0,0,0">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 6px; border: 2px solid #ffffff;">
                  <tr>
                    <td align="center" valign="middle" style="padding: 3px; background-color: #ffffff;">
                      <img src="https://opfbex.project01.ph/logo192.png" width="36" height="36" alt="OPFBEX Logo" style="display: block; width: 36px; height: 36px;" />
                    </td>
                  </tr>
                </table>
                <!--[if gte mso 9]>
                </v:textbox>
                </v:rect>
                <![endif]-->
              </td>
            </tr>
          </table>

          <p style="margin: 14px 0 0 0; font-size: 16px; color: #94a3b8;">
            Please tap the button below upon arriving at the entrance gate.
          </p>
        </div>

        <!-- Express Entry Button -->
        <div style="margin-bottom: 24px;">
          <a href="${expressLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 8px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35); text-transform: uppercase; letter-spacing: 0.5px;">
            ⚡ Open Express Entry Pass
          </a>
        </div>

        <div style="border-top: 1px dashed #2d2438; padding-top: 16px;">
          <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.4;">
            📍 <strong>Venue:</strong> SMX Convention Center Clark<br>
            📅 <strong>Dates:</strong> September 19–20, 2026 • 10:00 AM – 7:00 PM
          </p>
        </div>
      </div>
    </div>
  `;
}

function cleanEmail(rawEmail) {
  if (!rawEmail) return null;
  let email = rawEmail.trim().toLowerCase();
  
  // Fix known typos
  email = email.replace(/@gmailcom$/, "@gmail.com");
  email = email.replace(/@gmail\.con$/, "@gmail.com");
  email = email.replace(/@gmal\.con$/, "@gmail.com");

  // Validate basic email format
  if (!email.includes("@") || !email.includes(".")) return null;
  return email;
}

async function run() {
  console.log("🚀 Verifying Gmail SMTP connection...");
  await transporter.verify();
  console.log("✅ Gmail SMTP connected as:", GMAIL_USER);

  if (TEST_MODE) {
    console.log(`\n🧪 TEST MODE IS ON: Sending 1 test email to ${TEST_RECIPIENT}...`);
    const testLink = "https://opfbex.project01.ph/passes/johnvinceagonzales@gmail.com/express";
    const testQr = `https://quickchart.io/qr?text=${encodeURIComponent(testLink)}&size=200&ecLevel=H&margin=1`;
    
    await transporter.sendMail({
      from: `"OPFBEX 2026 Ticketing" <${GMAIL_USER}>`,
      to: TEST_RECIPIENT,
      replyTo: GMAIL_USER,
      subject: "Your Express Entry Pass: OPFBEX 2026",
      html: getHtmlTemplate("John Vince Gonzales (Test)", testLink, testQr),
    });

    console.log("✅ Test email sent! Check your inbox.");
    console.log("👉 When ready to send all, edit the script, set `const TEST_MODE = false`, and run again.\n");
    return;
  }

  // Fetch Day 2 attendees from Supabase
  console.log("\n📦 Fetching Day 2 registrants from database...");
  const { data: attendees, error } = await supabase
    .from("google_forms_registrants")
    .select("id, full_name, email, days_attending, pass_id")
    .ilike("days_attending", "%Day 2%");

  if (error) {
    console.error("❌ Failed to fetch attendees:", error);
    return;
  }

  console.log(`📋 Found ${attendees.length} Day 2 registrants.`);

  let sentCount = 0;
  let skippedCount = 0;

  // Persistent send log
  const LOG_FILE = "scripts/sent-log.json";
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

  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    const email = cleanEmail(attendee.email);
    const fullName = attendee.full_name || "OPFBEX Attendee";

    if (!email) {
      console.log(`⚠️ [${i + 1}/${attendees.length}] Skipped invalid email: "${attendee.email}" (${fullName})`);
      skippedCount++;
      continue;
    }

    // Skip if already sent
    if (sentSet.has(email)) {
      skippedCount++;
      continue;
    }

    const expressLink = `https://opfbex.project01.ph/passes/${encodeURIComponent(email)}/express`;
    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(expressLink)}&size=200&ecLevel=H&margin=1`;

    try {
      await transporter.sendMail({
        from: `"OPFBEX 2026 Ticketing" <${GMAIL_USER}>`,
        to: email,
        replyTo: GMAIL_USER,
        subject: "Your Express Entry Pass: OPFBEX 2026",
        html: getHtmlTemplate(fullName, expressLink, qrCodeUrl),
      });

      sentCount++;
      sentLog.push(email);
      sentSet.add(email);
      fs.writeFileSync(LOG_FILE, JSON.stringify(sentLog, null, 2));

      console.log(`✅ [${sentCount}] Sent to: ${fullName} <${email}>`);

      // 400ms delay to keep sending smooth
      await new Promise((resolve) => setTimeout(resolve, 400));
    } catch (sendErr) {
      if (sendErr.message.includes("quota") || sendErr.responseCode === 550) {
        console.error(`\n🚨 GOOGLE DAILY QUOTA REACHED at attendee #${sentCount}!`);
        console.log(`💾 All sent emails have been safely saved to ${LOG_FILE}.`);
        console.log(`👉 You can run this command again tomorrow morning at 8:00 AM to send the remaining emails seamlessly.\n`);
        break;
      }
      console.error(`❌ Failed to send to ${email}:`, sendErr.message);
    }
  }

  console.log(`\n🎉 DONE! Successfully sent: ${sentCount}, Skipped: ${skippedCount}`);
}

run().catch(console.error);