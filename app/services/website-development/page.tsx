import type { Metadata } from "next";
import AiChipHero3D from "../../components/AiChipHero3D";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import WebsiteVisual from "../../components/WebsiteVisual";

export const metadata: Metadata = {
  title: "Website Development | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="Website Development"
      headline={["Building Websites", "That Mean Business"]}
      scene={<AiChipHero3D mark="website" />}
      cta={{
        headline: "Give your business a stronger digital presence.",
        button: "Discuss your website",
      }}
    >
      <ServiceDetail
        dark
        achieve={{
          label: "What we help you achieve",
          headline: ["Your business.", "Clearly presented online."],
          body: "Rizviz develops websites that bring your brand, services, and digital experiences together. From business websites to interactive web applications, we focus on clear navigation, responsive layouts, and practical functionality. Our team works with you to create an online presence that serves your visitors and remains easy to manage as your business grows.",
          visual: <WebsiteVisual />,
        }}
        deliver={{
          label: "What we deliver",
          headline: "Designed for visitors. Built for purpose.",
          intro:
            "Focused web development capabilities that connect thoughtful design with dependable functionality.",
          items: [
            {
              title: "Business Websites",
              description:
                "Create a professional website that communicates your offering, reflects your brand, and gives visitors a clear path to get in touch.",
            },
            {
              title: "Custom Web Applications",
              description:
                "Build browser-based portals and tools that let users complete tasks, access information, and interact with your business online.",
            },
            {
              title: "Content Management Systems",
              description:
                "Set up manageable content structures so your team can update pages, publish information, and keep your website current.",
            },
            {
              title: "Responsive Design & Performance",
              description:
                "Adapt layouts across screen sizes and optimize loading, navigation, and interactions for a smoother browsing experience.",
            },
          ],
        }}
        featured={{
          label: "Use case",
          projectName: "Business Website & Inquiry Journey",
          projectNameBelow: true,
          headline: (
            <>
              From first visit to{" "}
              <span className="text-brand-ice">conversation.</span>
            </>
          ),
          cta: "Discuss your website requirements",
          href: "contact",
        }}
      />
    </ServicePage>
  );
}
