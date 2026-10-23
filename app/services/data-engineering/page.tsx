import type { Metadata } from "next";
import AiChipHero3D from "../../components/AiChipHero3D";
import DataVisual from "../../components/DataVisual";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import intellotrade from "../../images/prj1-img.png.jpeg";

export const metadata: Metadata = {
  title: "Data Engineering | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="Data Engineering"
      headline={["Turning Data", "Into Business Clarity"]}
      scene={<AiChipHero3D mark="data" />}
      cta={{
        headline: "Make your data ready for what’s next.",
        button: "Discuss your data needs",
      }}
    >
      <ServiceDetail
        dark
        achieve={{
          label: "What we help you achieve",
          headline: ["Connected data.", "A dependable foundation."],
          body: "Rizviz builds the data pipelines and systems that bring your business information together. We help collect, organize, and prepare data from different sources so it is ready for reporting, analytics, and AI. Our team works around your existing systems to make data easier to access, maintain, and use.",
          visual: <DataVisual />,
        }}
        deliver={{
          label: "What we deliver",
          headline: "Better data starts underneath.",
          intro:
            "Practical data engineering capabilities that connect your systems and prepare information for everyday use.",
          items: [
            {
              title: "Data Pipelines & Integration",
              description:
                "Bring data from applications, databases, and external sources into automated pipelines that keep information moving between your systems.",
            },
            {
              title: "Data Warehousing",
              description:
                "Organize business data in a central repository, structured to support consistent reporting and analysis across your teams.",
            },
            {
              title: "Data Transformation & Quality",
              description:
                "Clean, standardize, and validate incoming data to address duplicates, missing values, and inconsistent formats before they affect downstream work.",
            },
            {
              title: "Pipeline Monitoring & Maintenance",
              description:
                "Monitor data workflows, identify processing failures, and maintain pipelines as your sources, data volumes, and business requirements change.",
            },
          ],
        }}
        featured={{
          label: "Featured project",
          projectName: "Intellotrade",
          projectNameBelow: true,
          headline: (
            <>
              Complex trade data.
              <br />
              <span className="text-brand-ice">Connected intelligence.</span>
            </>
          ),
          cta: "Explore Intellotrade",
          href: "/products",
          image: intellotrade,
          imageAlt: "The Intellotrade website, Trade Smarter With AI",
        }}
      />
    </ServicePage>
  );
}
