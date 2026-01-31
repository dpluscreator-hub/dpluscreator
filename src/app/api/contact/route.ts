import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // Max requests
const RATE_WINDOW = 60000; // 1 minute window

// Input sanitization
function sanitize(input: string | undefined): string {
  if (!input) return "";
  return input
    .trim()
    .slice(0, 500) // Limit length
    .replace(/[<>]/g, ""); // Remove potential HTML/script tags
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIP = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateData = rateLimitMap.get(clientIP);
    
    if (rateData) {
      if (now - rateData.timestamp < RATE_WINDOW) {
        if (rateData.count >= RATE_LIMIT) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        rateData.count++;
      } else {
        rateLimitMap.set(clientIP, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(clientIP, { count: 1, timestamp: now });
    }

    const body = await request.json();
    const { name, email, phone, company, message, service, date, time, type } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone),
      company: sanitize(company),
      message: sanitize(message),
      service: sanitize(service),
      date: sanitize(date),
      time: sanitize(time),
      type: sanitize(type),
    };

    // Check environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.error("Missing Google Sheets configuration");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      Timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      Name: sanitizedData.name,
      Email: sanitizedData.email,
      Phone: sanitizedData.phone || "N/A",
      Company: sanitizedData.company || "N/A",
      Service: sanitizedData.service || "N/A",
      Date: sanitizedData.date || "N/A",
      Time: sanitizedData.time || "N/A",
      Message: sanitizedData.message || "N/A",
      Type: sanitizedData.type || "Contact Form",
    });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
