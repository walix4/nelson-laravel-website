// Static config + helpers for the Book a Meeting flow.
// Submission is mocked for now — wire to the booking API later (see BookingFlow.handleSubmit).

export const MEETING = {
  org: "DrayGo",
  title: "Schedule a Meeting",
  subtitle: "Choose a time that works best for you",
  durationLabel: "30 min",
  durationMinutes: 30,
};

// Brand tokens (mirror globals.css --navy / --red)
export const NAVY = "#08192b";
export const NAVY_DEEP = "#0a1a30";
export const RED = "#fc0b05";

// Booking-flow theme tokens (red + black).
// LIME/LIME_TEXT names kept for compatibility — they now carry the red accent.
export const LIME = "#fc0b05"; // red accent
export const LIME_TEXT = "#ffffff"; // white text on red surfaces
export const ACCENT_RGB = "252,11,5"; // red, for rgba() tints
export const BG = "#0b0c0e"; // black page background
export const CARD = "#17181b"; // card surface
export const CARD_2 = "#111214"; // summary / secondary surface
export const BORDER = "rgba(255,255,255,0.12)";
export const TXT = "#ffffff";
export const TXT_MUTED = "rgba(255,255,255,0.55)";
export const TXT_FAINT = "rgba(255,255,255,0.40)";

export interface Country {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

export const COUNTRIES: Country[] = [
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "PK", dial: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "France" },
  { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
];

export const TIMEZONES: string[] = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney",
  "UTC",
];

export function detectTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && !TIMEZONES.includes(tz)) TIMEZONES.unshift(tz);
    return tz || "America/New_York";
  } catch {
    return "America/New_York";
  }
}

// 30-minute slots, 9:00 AM – 5:00 PM.
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 9; h < 17; h++) {
    for (const m of [0, 30]) {
      const period = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      slots.push(`${hour12}:${m === 0 ? "00" : "30"} ${period}`);
    }
  }
  return slots;
}

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Past dates and weekends are unavailable.
export function isDayDisabled(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  if (d < today) return true;
  const day = d.getDay();
  return day === 0 || day === 6;
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
