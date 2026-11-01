import type { Metadata } from "next";
import BusinessVisual from "../../components/BusinessVisual";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";
import analytics from "../../images/prj8.png";

export const metadata: Metadata = {
  title: "Business Development | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="Business Development"
      headline={["Growing Your Business", "Through Real Partnerships"]}
      scene={<></>}
      cta={{
        headline: "Let’s grow your business together.",
        button: "Discuss your growth plans",
      }}
    >
      <ServiceDetail
        dark
        achieve={{
          label: "What we help you achieve",
          headline: ["Clear direction.", "Steady growth."],
          body: "Rizviz supports your growth with structured business development: finding the right opportunities, building relationships with the right partners, and turning conversations into lasting engagements. Our team works with you to understand your market, shape your offering, and put a practical plan in place to reach new customers.",
          visual: <BusinessVisual />,
        }}
        deliver={{
          label: "What we deliver",
          headline: "Growth, planned and followed through.",
          intro:
            "Focused business development capabilities that help you find opportunities and turn them into lasting relationships.",
          items: [
            {
              title: "Market Research & Opportunity Mapping",
              description:
                "Study your market, competitors, and customer segments to identify where your business can grow and which opportunities deserve attention first.",
            },
            {
              title: "Lead Generation & Outreach",
              description:
                "Build a steady flow of qualified prospects through focused outreach, so your team spends its time on conversations that matter.",
            },
            {
              title: "Partnerships & Proposals",
              description:
                "Develop relationships with partners and clients, and prepare clear proposals that present your offering and the value it brings.",
            },
            {
              title: "Sales Pipeline Support",
              description:
                "Track opportunities from first contact to agreement, with a clear view of progress and next steps for every account.",
            },
          ],
        }}
        featured={{
          label: "Featured project",
          projectName: "Analytics Portal",
          projectNameBelow: true,
          headline: (
            <>
              Progress tracked.
              <br />
              <span className="text-brand-blue">Results made clear.</span>
            </>
          ),
          cta: "Explore our Analytics Portal",
          href: "/products",
          image: analytics,
          imageAlt:
            "The Analytics Portal employee performance dashboard with charts and a team table",
        }}
      />
    </ServicePage>
  );
}
