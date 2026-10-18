import Link from "next/link";

type Job = {
  title: string;
  experience: string;
  vacancies: string;
};

const jobs: Job[] = [
  {
    title: "ServiceNow Developer",
    experience: "Fresh graduate",
    vacancies: "10+",
  },
  { title: "Junior AI/ML Engineer", experience: "1–3 years", vacancies: "2" },
  { title: "Senior AI/ML Engineer", experience: "4–8 years", vacancies: "4" },
  { title: "Junior Data Engineer", experience: "1–3 years", vacancies: "2" },
  { title: "Senior Data Engineer", experience: "4–10 years", vacancies: "4" },
  { title: "DevOps Engineer", experience: "1–3 years", vacancies: "5" },
  {
    title: "Business Development Officer",
    experience: "Fresh graduate",
    vacancies: "10+",
  },
  {
    title: "Business Development Executive",
    experience: "3–4 years",
    vacancies: "7",
  },
];

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-brand-blue">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-brand-slate">{value}</dd>
    </div>
  );
}

export default function OpenPositions() {
  return (
    <section id="open-roles" className="w-full bg-[#F2F8FC] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Open Positions
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
            Find your next role.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
            Explore opportunities at Rizviz and find a role that matches your
            skills and experience.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <li key={job.title}>
              <article className="flex h-full min-h-[22rem] flex-col rounded-2xl border border-[#D3DFE9] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-sky hover:shadow-lg">
                <h3 className="text-xl font-semibold text-brand-navy">
                  {job.title}
                </h3>
                <dl className="mt-6 grid gap-4">
                  <Fact label="Experience" value={job.experience} />
                  <Fact label="Vacancies" value={job.vacancies} />
                </dl>
                <Link
                  href="/contact"
                  className="mt-auto block rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3 text-center font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-blue"
                >
                  Apply now
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
