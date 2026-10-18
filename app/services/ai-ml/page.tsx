import type { Metadata } from "next";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import aiChip from "../../images/ai.png";
import aiHero from "../../images/ai-hero.png";
import insuranceAi from "../../images/prj3-img.png";

export const metadata: Metadata = {
  title: "AI & Machine Learning | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="AI / ML"
      headline={["Building Intelligence", "Into Your Business"]}
      hero={aiHero}
      heroAlt="A glowing circuit-brain icon above a city skyline at night"
    >
      <ServiceDetail
        achieve={{
          label: "What we help you achieve",
          headline: ["Practical AI.", "Real business purpose."],
          body: "Rizviz develops AI-powered applications around the way your business operates. From simplifying repetitive tasks to helping people find and interpret information, we connect AI capabilities with practical needs. Our team works with you to identify where AI can add value and build solutions that fit your existing workflows.",
          image: aiChip,
          imageAlt:
            "A glowing AI chip with a transparent neural network on top of a circuit board",
        }}
        deliver={{
          label: "What we deliver",
          headline: "Intelligence where it matters.",
          intro:
            "Focused AI and machine learning capabilities, built around your requirements.",
          items: [
            {
              title: "AI-Powered Applications",
              description:
                "Bring intelligent features into your products, helping users find answers, understand information, and complete tasks more easily.",
            },
            {
              title: "Predictive Models",
              description:
                "Use patterns in historical data to anticipate outcomes and support planning, with models developed for your specific business questions.",
            },
            {
              title: "Intelligent Automation",
              description:
                "Reduce repetitive work with AI-assisted processes that organize information, handle routine requests, and keep people involved where judgment matters.",
            },
            {
              title: "AI Integration",
              description:
                "Connect AI capabilities with your existing software and workflows, making them accessible within the tools your team already uses.",
            },
          ],
        }}
        featured={{
          label: "Featured project",
          headline: "Intelligence across the insurance journey.",
          cta: "Explore Insurance AI",
          href: "/products",
          image: insuranceAi,
          imageAlt: "The GetInsuredAI website, From lead to claim",
        }}
      />
    </ServicePage>
  );
}
