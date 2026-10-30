import type { Metadata } from "next";
import AiChipHero3D from "../../components/AiChipHero3D";
import DevopsVisual from "../../components/DevopsVisual";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import erpSuite from "../../images/prj7.png";

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
      scene={<AiChipHero3D mark="devops" />}
      cta={{
        headline: "Make your next release smoother.",
        button: "Discuss your DevOps needs",
      }}
    >
      <ServiceDetail
        dark
        achieve={{
          label: "What we help you achieve",
          headline: ["Smoother releases.", "Dependable operations."],
          body: "Rizviz brings development and operations together through automation and carefully configured infrastructure. We help simplify software delivery, reduce repetitive maintenance, and create consistent environments for your applications. Our team works with you to understand your existing setup and build processes that support everyday operations and future growth.",
          visual: <DevopsVisual />,
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
          projectNameBelow: true,
          headline: (
            <>
              Simplifying delivery behind{" "}
              <span className="text-brand-blue">everyday operations.</span>
            </>
          ),
          cta: "Explore our ERP suite",
          href: "/products",
          image: erpSuite,
          imageAlt:
            "The ERP suite's business overview with sales orders, invoices and tasks",
        }}
      />
    </ServicePage>
  );
}
