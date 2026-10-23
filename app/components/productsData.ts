import type { StaticImageData } from "next/image";
import intellotrade from "../images/prj1-img.png.jpeg";
import insuranceAi from "../images/prj3-img.png";
import skinClin from "../images/prj2-img.png";
import zameendarBot from "../images/prj4.png";
import hospital from "../images/prj5.png";
import busTicketing from "../images/prj6.png";
import erp from "../images/prj7.png";
import analytics from "../images/prj8.png";

export type Product = {
  name?: string;
  description?: string;
  // Three short key features.
  features?: [string, string, string];
  screenshot?: StaticImageData;
  screenshotAlt?: string;
  // A tall phone screenshot: shown whole inside the frame instead of cropped.
  screenshotPortrait?: boolean;
};

// Fill the cards in as the content arrives; the empty ones keep placeholders.
export const products: Product[] = [
  {
    name: "Intellotrade",
    description:
      "Intellotrade simplifies Pakistan–US trade with AI-powered HS code classification, duty calculations, and landed cost estimates—all through plain-language queries or product photos.",
    features: [
      "AI-Powered HS Classification",
      "Duty & Exemption Calculation",
      "Live Landed Cost Estimation",
    ],
    screenshot: intellotrade,
    screenshotAlt: "The Intellotrade website, Trade Smarter With AI",
  },
  {
    name: "GetInsuredAI",
    description:
      "Insurance AI simplifies life insurance application reviews by organizing customer information, analyzing documents, and highlighting potential risks—helping insurance teams reduce manual effort and make informed decisions.",
    features: [
      "Application Review Assistance",
      "Customer Risk Insights",
      "Document Analysis",
    ],
    screenshot: insuranceAi,
    screenshotAlt: "The GetInsuredAI website, From lead to claim",
  },
  {
    name: "ZameendarBot",
    description:
      "ZameendarBot supports everyday farming with practical guidance on crop risks, plant diseases, and weather conditions, helping farmers protect their crops and make informed agricultural decisions.",
    features: [
      "Crop Risk Insights",
      "Plant Disease Guidance",
      "Weather-Based Farming Advice",
    ],
    screenshot: zameendarBot,
    screenshotAlt:
      "The ZameendarBot chat answering a farmer's question about yellow wheat leaves",
  },
  {
    name: "SkinClin",
    description:
      "SkinClin uses AI-powered skin analysis to highlight potential concerns such as acne, dark spots, and dryness, helping users understand their skin and make more informed skincare choices.",
    features: [
      "AI-Powered Skin Analysis",
      "Potential Concern Identification",
      "Personalized Skincare Insights",
    ],
    screenshot: skinClin,
    screenshotAlt:
      "The SkinClin app home screen with a Start a new skin scan card",
    screenshotPortrait: true,
  },
  {
    name: "Hospital Management System",
    description:
      "A centralized system for organizing patient records, appointments, and billing, helping hospital teams coordinate daily administrative tasks and keep essential information accessible.",
    features: [
      "Patient Records Management",
      "Appointment Scheduling",
      "Billing Management",
    ],
    screenshot: hospital,
    screenshotAlt:
      "The Hospital Management System appointments screen with a schedule table",
  },
  {
    name: "Bus Ticketing System",
    description:
      "A booking system that brings trip schedules, seat availability, and ticket reservations together, helping operators manage bookings and passengers plan their journeys.",
    features: [
      "Route & Schedule Management",
      "Seat Selection",
      "Ticket Booking",
    ],
    screenshot: busTicketing,
    screenshotAlt:
      "The Bus Ticketing System booking screen with trips and a seat map",
  },
  {
    name: "Enterprise Resource Planning",
    description:
      "An integrated ERP suite connecting financial and operational functions, helping teams manage business records, coordinate departmental workflows, and oversee everyday activities through one platform.",
    features: [
      "Financial Management",
      "Integrated Business Modules",
      "Centralized Records & Reporting",
    ],
    screenshot: erp,
    screenshotAlt:
      "The ERP suite business overview with sales orders, invoices and tasks",
  },
  {
    name: "Analytics Portal",
    description:
      "A centralized portal for reviewing employee performance, tracking task completion, and understanding team progress—helping managers identify trends and support informed performance discussions.",
    features: [
      "Employee Performance Overview",
      "Task Completion Tracking",
      "Team Reports & Analytics",
    ],
    screenshot: analytics,
    screenshotAlt:
      "The Analytics Portal employee performance dashboard with charts and a team table",
  },
];

// What an empty card shows in place of each missing piece of content.
export const placeholders = {
  name: "Product name",
  description:
    "A concise paragraph explaining what the product does and who it helps.",
  features: ["Key feature one", "Key feature two", "Key feature three"],
};
