import type { Metadata } from "next";
import AiChipHero3D from "../../components/AiChipHero3D";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import MobileVisual from "../../components/MobileVisual";
import skinClin from "../../images/prj2.png";

export const metadata: Metadata = {
  title: "App Development | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="App Development"
      headline={["Bringing Your", "Ideas to Mobile"]}
      scene={<AiChipHero3D mark="mobile" />}
      cta={{
        headline: "Bring your next app idea to life.",
        button: "Discuss your app",
      }}
    >
      <ServiceDetail
        dark
        achieve={{
          label: "What we help you achieve",
          headline: ["Your ideas.", "Built for mobile."],
          body: "Rizviz develops mobile applications that connect your services with the people who use them. From customer-facing products to tools for your team, we focus on clear interfaces and practical functionality. Our developers work with you to shape the experience, connect supporting systems, and prepare your application for everyday use.",
          visual: <MobileVisual />,
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
          projectNameBelow: true,
          headline: (
            <>
              AI capabilities.
              <br />
              <span className="text-brand-ice">A mobile experience.</span>
            </>
          ),
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
