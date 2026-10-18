import type { Metadata } from "next";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import devopsHero from "../../images/devops-hero.png";
import devopsImage from "../../images/devops.png";

export const metadata: Metadata = {
  title: "DevOps | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="DevOps"
      headline={[
        "Streamlining Delivery.",
        "Strengthening Your Infrastructure.",
      ]}
      hero={devopsHero}
      heroAlt="A glowing DevOps infinity loop above a city skyline at night"
    >
      <ServiceDetail
        achieve={{
          label: "What we help you achieve",
          headline: ["Smoother releases.", "Dependable operations."],
          body: "Rizviz brings development and operations together through automation and carefully configured infrastructure. We help simplify software delivery, reduce repetitive maintenance, and create consistent environments for your applications. Our team works with you to understand your existing setup and build processes that support everyday operations and future growth.",
          image: devopsImage,
          imageAlt: "Three servers on a platform linked by glowing connections",
        }}
        deliver={{
          label: "What we deliver",
          headline: "Built for continuous delivery.",
          intro:
            "Practical DevOps capabilities that support your applications from development through daily operation.",
          items: [
            {
              title: "CI/CD Pipelines",
              description:
                "Automate build, testing, and deployment workflows to make software releases more consistent and reduce manual handoffs.",
            },
            {
              title: "Cloud Infrastructure",
              description:
                "Configure hosting environments, networking, and access around your application requirements, with room to adapt as your needs change.",
            },
            {
              title: "Infrastructure Automation",
              description:
                "Make environment setup and routine configuration repeatable, helping your team maintain consistency and reduce repetitive administrative work.",
            },
            {
              title: "Monitoring & Maintenance",
              description:
                "Track application and infrastructure health, investigate operational issues, and streamline the maintenance needed to keep systems running.",
            },
          ],
        }}
        featured={{
          label: "Featured project",
          projectName: "ERP Suite Deployment Automation",
          headline: "Simplifying delivery behind everyday operations.",
          body: "Our DevOps team automated deployment and maintenance for the company’s ERP suite, with private IP configurations supporting internal communication between its components. The work brought deployment workflows and infrastructure configuration together to make ongoing operation and upkeep more manageable.",
          cta: "Explore our ERP suite",
          href: "/products",
        }}
      />
    </ServicePage>
  );
}
