import type { Metadata } from "next";
import PcbVisual from "../../components/PcbVisual";
import ServiceDetail from "../../components/ServiceDetail";
import ServicePage from "../../components/ServicePage";

export const metadata: Metadata = {
  title: "PCB Engineering | Rizviz",
};

export default function Page() {
  return (
    <ServicePage
      name="PCB Engineering"
      headline={["Engineering Better", "Electronic Foundations."]}
      scene={<></>}
      cta={{
        headline: "Let’s Engineer Your Next Board.",
        button: "Discuss Your PCB Project",
      }}
    >
      <ServiceDetail
        achieve={{
          label: "What we help you achieve",
          headline: ["From Circuit Concept to Validated Design."],
          body: [
            "Rizviz supports electronic product development through schematic design, PCB layout, engineering analysis, and prototype testing support. We translate your electrical, mechanical, and operational requirements into designs that balance performance, reliability, and manufacturability.",
            "Whether you are developing a new board or improving an existing one, our team supports design decisions, resolves technical issues, and prepares documentation for your manufacturing partner.",
          ],
          visual: <PcbVisual />,
        }}
        deliver={{
          label: "What we deliver",
          headline: "Precision at Every Layer.",
          items: [
            {
              title: "Schematic & Layout Design",
              description:
                "Translate your requirements into circuit schematics and PCB layouts, with component placement, routing, and layer planning shaped around electrical performance and physical constraints.",
            },
            {
              title: "PCB Redesign & Optimization",
              description:
                "Review existing boards to identify design weaknesses and opportunities to improve routing, component selection, reliability, and manufacturing cost while preserving required functionality.",
            },
            {
              title: "Advanced Design & Analysis",
              description:
                "Develop high-speed, RF, multilayer, and HDI PCB designs. Evaluate signal integrity, power distribution, thermal behavior, and electromagnetic interference according to your project’s requirements.",
            },
            {
              title: "Prototype & Product Support",
              description:
                "Support component selection, bill-of-materials validation, test-point planning, and prototype troubleshooting. Refine the design through testing and help your team prepare for the transition to production.",
            },
          ],
        }}
        handover={{
          label: "Design verification & handover",
          headline: "Prepared for Your Manufacturing Partner.",
          body: "We review the design against agreed electrical requirements and your manufacturer’s capabilities before release. Our handover brings together the files and documentation needed to support fabrication, assembly, and testing.",
          listIntro: "Depending on the project scope, deliverables include:",
          items: [
            "Circuit schematics and PCB layout files.",
            "Gerber and drill files for fabrication.",
            "A validated bill of materials and component placement files.",
            "Assembly drawings, design-review findings, and agreed verification reports.",
          ],
          note: "Our scope covers engineering, design, analysis, and testing support. Physical fabrication, assembly, and hardware manufacturing are handled by your manufacturing partner.",
        }}
        featured={{
          label: "Start your project",
          headline: "Let’s Engineer Your Next Board.",
          body: "Share your product requirements or existing PCB design. We’ll help define the design approach, review priorities, and next steps.",
          cta: "Discuss Your PCB Project",
          href: "contact",
        }}
      />
    </ServicePage>
  );
}
