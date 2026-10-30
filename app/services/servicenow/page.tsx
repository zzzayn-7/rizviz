import type { Metadata } from "next";
import AiChipHero3D from "../../components/AiChipHero3D";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import ServiceNowVisual from "../../components/ServiceNowVisual";

export const metadata: Metadata = {
  title: "ServiceNow | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="ServiceNow"
      headline={["Connecting Workflows.", "Simplifying Everyday Operations."]}
      scene={<AiChipHero3D mark="servicenow" />}
      cta={{
        headline: "Make everyday work flow better.",
        button: "Discuss your workflows",
      }}
    >
      <ServiceDetail
        dark
        achieve={{
          label: "What we help you achieve",
          headline: ["Connected workflows.", "Simpler everyday operations."],
          body: "Rizviz helps businesses configure and adapt ServiceNow around the way their teams work. We bring requests, approvals, and service processes into connected workflows, reducing manual coordination and improving visibility. Our team works with you to understand existing processes and develop a platform experience that supports your operational needs.",
          visual: <ServiceNowVisual />,
        }}
        deliver={{
          label: "What we deliver",
          headline: "Make work flow better.",
          intro:
            "Focused ServiceNow capabilities that connect your teams, systems, and everyday processes.",
          items: [
            {
              title: "Platform Implementation",
              description:
                "Set up and configure ServiceNow around your service requirements, team responsibilities, and existing operational processes.",
            },
            {
              title: "Workflow Automation",
              description:
                "Automate request routing, approvals, and follow-up tasks to reduce repetitive coordination and make ownership clear at each stage.",
            },
            {
              title: "System Integration",
              description:
                "Connect ServiceNow with your business applications to exchange information and support workflows that span multiple systems.",
            },
            {
              title: "Platform Customization",
              description:
                "Adapt forms, service catalogs, portals, and dashboards to give teams an experience suited to their roles and responsibilities.",
            },
          ],
        }}
        featured={{
          label: "Use case",
          projectName: "Employee Service Requests",
          projectNameBelow: true,
          headline: (
            <>
              From request to{" "}
              <span className="text-brand-blue">resolution.</span>
            </>
          ),
          cta: "Discuss your ServiceNow requirements",
          href: "contact",
        }}
      />
    </ServicePage>
  );
}
