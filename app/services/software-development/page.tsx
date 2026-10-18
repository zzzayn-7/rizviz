import type { Metadata } from "next";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import seHero from "../../images/se-hero.png";
import seImage from "../../images/se.png";

export const metadata: Metadata = {
  title: "Software Development | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="Software Development"
      headline={["Building Software", "Around Your Business"]}
      hero={seHero}
      heroAlt="A glowing code and gear icon above a city skyline at night"
    >
      <ServiceDetail
        achieve={{
          label: "What we help you achieve",
          headline: ["Your requirements.", "Thoughtfully engineered software."],
          body: "Rizviz develops software around your business processes, users, and operational needs. From internal tools to complete enterprise systems, we turn requirements into practical applications. Our team brings together planning, development, and testing to build software that supports everyday work and can evolve as your business changes.",
          image: seImage,
          imageAlt:
            "Layered panels of a software application with a code icon on top",
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
          projectName: "ERP Suite",
          headline: "One platform. Connected business functions.",
          body: "Rizviz developed an ERP suite covering financial and non-financial business modules. The software brings core functions into a shared platform, helping teams manage daily operations and business records through connected modules designed to work together.",
          cta: "Explore our ERP suite",
          href: "/products",
        }}
      />
    </ServicePage>
  );
}
