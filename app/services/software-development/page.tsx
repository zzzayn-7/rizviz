import type { Metadata } from "next";
import AiChipHero3D from "../../components/AiChipHero3D";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import hospital from "../../images/prj5.png";
import SoftwareVisual from "../../components/SoftwareVisual";

export const metadata: Metadata = {
  title: "Software Development | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="Software Development"
      headline={["Building Software", "Around Your Business"]}
      scene={<AiChipHero3D mark="software" />}
      cta={{
        headline: "Build software around the way you work.",
        button: "Discuss your software project",
      }}
    >
      <ServiceDetail
        dark
        achieve={{
          label: "What we help you achieve",
          headline: ["Your requirements.", "Thoughtfully engineered software."],
          body: "Rizviz develops software around your business processes, users, and operational needs. From internal tools to complete enterprise systems, we turn requirements into practical applications. Our team brings together planning, development, and testing to build software that supports everyday work and can evolve as your business changes.",
          visual: <SoftwareVisual />,
        }}
        deliver={{
          label: "What we deliver",
          headline: "Built to fit your business.",
          intro:
            "Focused software engineering capabilities that turn business requirements into working systems.",
          items: [
            {
              title: "Custom Software Development",
              description:
                "Build applications around your specific workflows, giving teams the tools they need to manage tasks and solve operational challenges.",
            },
            {
              title: "Enterprise Systems",
              description:
                "Develop connected business platforms that bring departmental processes, records, and responsibilities together in one organized system.",
            },
            {
              title: "API Development & Integration",
              description:
                "Create interfaces that connect your applications, exchange information, and reduce manual work between separate business systems.",
            },
            {
              title: "Application Modernization",
              description:
                "Improve existing software by updating components, refining functionality, and addressing maintainability as your requirements evolve.",
            },
          ],
        }}
        featured={{
          label: "Featured project",
          projectName: "Hospital Management System",
          projectNameBelow: true,
          headline: (
            <>
              One platform.
              <br />
              <span className="text-brand-blue">
                Connected business functions.
              </span>
            </>
          ),
          cta: "Explore our Hospital Management System",
          href: "/products",
          image: hospital,
          imageAlt:
            "The Hospital Management System appointments screen with a schedule table",
        }}
      />
    </ServicePage>
  );
}
