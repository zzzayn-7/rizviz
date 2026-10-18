import type { Metadata } from "next";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import snowHero from "../../images/snow-hero.png";
import snowImage from "../../images/snow.png";

export const metadata: Metadata = {
  title: "ServiceNow | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="ServiceNow"
      headline={["Connecting Workflows.", "Simplifying Everyday Operations."]}
      hero={snowHero}
      heroAlt="The ServiceNow logo glowing above a city skyline at night"
    >
      <ServiceDetail
        achieve={{
          label: "What we help you achieve",
          headline: ["Connected workflows.", "Simpler everyday operations."],
          body: "Rizviz helps businesses configure and adapt ServiceNow around the way their teams work. We bring requests, approvals, and service processes into connected workflows, reducing manual coordination and improving visibility. Our team works with you to understand existing processes and develop a platform experience that supports your operational needs.",
          image: snowImage,
          imageAlt:
            "A central gear connected to document, approval, file and link icons",
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
          headline: "From request to resolution.",
          body: "Bring everyday employee requests into one organized workflow. From requesting equipment to getting access approvals, ServiceNow can route tasks to the right teams, track progress, and keep employees informed. Clear ownership and shared visibility help reduce scattered emails and manual follow-ups.",
          cta: "Discuss your ServiceNow requirements",
          href: "contact",
        }}
      />
    </ServicePage>
  );
}
