// Helper function to convert English digits to Bengali digits
export function toBengaliNumber(input) {
  if (input === undefined || input === null) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return input
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)]);
}

// Helper function to get formatted Bengali date for Navbar
export function getBanglaDate() {
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const today = new Date();
  const dayName = days[today.getDay()];
  const dayNum = toBengaliNumber(today.getDate());
  const monthName = months[today.getMonth()];
  const yearNum = toBengaliNumber(today.getFullYear());

  return `${dayName}, ${dayNum} ${monthName} ${yearNum}`;
}

// Format unit to Bengali text
export function formatUnit(unit) {
  if (!unit) return "প্রতি একক";
  const u = unit.toLowerCase();
  if (u.includes("kg") || u.includes("কেজি")) return "প্রতি কেজি";
  if (u.includes("liter") || u.includes("ltr") || u.includes("লিটার")) return "প্রতি লিটার";
  if (u.includes("dozen") || u.includes("ডজন")) return "প্রতি ডজন";
  if (u.includes("piece") || u.includes("pc") || u.includes("পিস")) return "প্রতি পিস";
  if (u.includes("gm") || u.includes("গ্রাম")) return "প্রতি গ্রাম";
  return `প্রতি ${unit}`;
}

// Base API URL
export const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";
