import type { Metadata } from "next";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import mobileHero from "../../images/mobile-hero.png";
import mobileImage from "../../images/mobile.png";
import skinClin from "../../images/prj2-img.png";

export const metadata: Metadata = {
  title: "Mobile App Development | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="Mobile App Development"
      headline={["Bringing Your", "Ideas to Mobile"]}
      hero={mobileHero}
      heroAlt="A glowing mobile app icon above a city skyline at night"
    >
      <ServiceDetail
        achieve={{
          label: "What we help you achieve",
          headline: ["Your ideas.", "Built for mobile."],
          body: "Rizviz develops mobile applications that connect your services with the people who use them. From customer-facing products to tools for your team, we focus on clear interfaces and practical functionality. Our developers work with you to shape the experience, connect supporting systems, and prepare your application for everyday use.",
          image: mobileImage,
          imageAlt:
            "A smartphone showing an app interface between floating screens",
        }}
        deliver={{
          label: "What we deliver",
          headline: "Purpose behind every interaction.",
          intro:
            "Focused mobile development capabilities that bring your product from concept to a working application.",
          items: [
            {
              title: "Mobile App Design",
              description:
                "Design intuitive screens and navigation around your users’ needs, making key actions easy to find and complete.",
            },
            {
              title: "iOS & Android Development",
              description:
                "Build mobile applications for your target platforms, with attention to performance, device compatibility, and a consistent user experience.",
            },
            {
              title: "Backend & API Integration",
              description:
                "Connect your application with accounts, databases, and business systems to support the information and services your users need.",
            },
            {
              title: "Testing & Maintenance",
              description:
                "Test core journeys across devices, resolve issues, and maintain compatibility as operating systems and product requirements change.",
            },
          ],
        }}
        featured={{
          label: "Featured project",
          projectName: "SkinClin",
          headline: "AI capabilities. A mobile experience.",
          body: "SkinClin is a mobile application that uses camera images for AI-assisted skin analysis. Rizviz brought image capture and AI functionality together in a mobile interface, allowing users to submit skin images and view the resulting analysis within the app.",
          cta: "Explore SkinClin",
          href: "/products",
          image: skinClin,
          imageAlt:
            "The SkinClin app home screen with a Start a new skin scan card",
          imagePortrait: true,
        }}
      />
    </ServicePage>
  );
}
