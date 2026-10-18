import type { Metadata } from "next";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import dataHero from "../../images/data-hero.png";
import dataImage from "../../images/data.png";
import intellotrade from "../../images/prj1-img.png.jpeg";

export const metadata: Metadata = {
  title: "Data Engineering | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="Data Engineering"
      headline={["Turning Data", "Into Business Clarity"]}
      hero={dataHero}
      heroAlt="A glowing data chart and network globe above a city skyline at night"
    >
      <ServiceDetail
        achieve={{
          label: "What we help you achieve",
          headline: ["Connected data.", "A dependable foundation."],
          body: "Rizviz builds the data pipelines and systems that bring your business information together. We help collect, organize, and prepare data from different sources so it is ready for reporting, analytics, and AI. Our team works around your existing systems to make data easier to access, maintain, and use.",
          image: dataImage,
          imageAlt:
            "Glass data sources linked by pipelines to a central data warehouse",
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
          headline: "Complex trade data. Connected intelligence.",
          body: "Intellotrade brings AI-powered trade intelligence to the Pakistan–US trade corridor. It helps users explore tariffs, HS codes, and global shipping routes, bringing key trade information together to support more informed planning.",
          cta: "Explore Intellotrade",
          href: "/products",
          image: intellotrade,
          imageAlt: "The Intellotrade website, Trade Smarter With AI",
        }}
      />
    </ServicePage>
  );
}
