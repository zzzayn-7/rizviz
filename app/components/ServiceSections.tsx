import Link from "next/link";

type Service = {
  // Matches the anchors the home page's Capabilities links point to.
  id: string;
  slug: string;
  name: string;
  description: string;
};

const services: Service[] = [
  {
    id: "ai-ml",
    slug: "ai-ml",
    name: "AI & Machine Learning",
    description:
      "Rizviz develops AI-powered applications that automate tasks, interpret data, and support informed decisions. We integrate intelligence into practical solutions built around your business workflows.",
  },
  {
    id: "devops",
    slug: "devops",
    name: "DevOps",
    description:
      "Rizviz helps teams automate software delivery and manage dependable cloud environments. We connect development and operations through streamlined deployment pipelines and consistent infrastructure practices.",
  },
  {
    id: "data-engineering",
    slug: "data-engineering",
    name: "Data Engineering",
    description:
      "Rizviz turns business data into useful insights through analysis and predictive modeling. We help teams identify patterns, understand performance, and make better-informed decisions.",
  },
  {
    id: "servicenow",
    slug: "servicenow",
    name: "ServiceNow",
    description:
      "Rizviz implements and customizes ServiceNow to simplify enterprise workflows. We connect systems and adapt the platform to support your service management and operational needs.",
  },
  {
    id: "software-development",
    slug: "software-development",
    name: "Software Development",
    description:
      "Rizviz builds custom software around your business processes and requirements. From enterprise systems to specialized applications, we develop solutions that bring your operations together.",
  },
  {
    id: "app-development",
    slug: "mobile-app-development",
    name: "Mobile App Development",
    description:
      "Rizviz develops mobile applications that make your services accessible on the go. We combine intuitive interfaces with practical functionality to support your users and business goals.",
  },
  {
    id: "website-development",
    slug: "website-development",
    name: "Website Development",
    description:
      "Rizviz creates responsive websites that clearly communicate your brand and make navigation straightforward. We bring together thoughtful design and dependable development for a smooth user experience.",
  },
];

export default function ServiceSections() {
  return (
    <>
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          // Edge-to-edge backgrounds alternate ice blue and white.
          className={`w-full py-12 sm:py-16 ${
            i % 2 === 0 ? "bg-[#F2F8FC]" : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <h2 className="text-2xl font-semibold leading-tight text-brand-navy sm:text-3xl lg:text-4xl">
              {service.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-slate">
              {service.description}
            </p>
            <Link
              href={`/services/${service.slug}`}
              className="mt-7 inline-block rounded-full border-2 border-brand-blue bg-brand-blue px-7 py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue"
            >
              Explore more
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}
