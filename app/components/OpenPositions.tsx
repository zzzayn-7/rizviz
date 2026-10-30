import ApplyButton from "./ApplyButton";

type Job = {
  title: string;
  experience: string;
  vacancies: string;
};

// The same for every opening.
const GENDER = "Male";
const LOCATION = "Onsite";

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
    <div className="min-w-0">
      <dt className="text-[0.68rem] font-semibold uppercase tracking-widest text-brand-ice/60">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-white">{value}</dd>
    </div>
  );
}
export default function OpenPositions() {
  return (
    <section
      id="open-roles"
      className="relative w-full pb-20 pt-20 sm:pb-28 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl text-left">
          <h2 className="text-5xl font-extrabold leading-none tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
            Open Positions
          </h2>
          <p className="mt-8 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
            Explore opportunities at Rizviz and find a role that matches your
            skills and experience.
          </p>
        </div>
        <ul className="mt-12 glass-navy divide-y divide-white/10 overflow-hidden rounded-2xl sm:mt-14">
          {jobs.map((job, i) => (
            <li key={job.title}>
              <article className="group relative grid items-center gap-x-8 gap-y-4 px-6 py-5 transition-colors duration-300 hover:bg-white/[0.05] sm:px-8 lg:grid-cols-[2.5rem_minmax(0,1.3fr)_minmax(0,2fr)_auto]">
                {/* A line of blue that slides in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-brand-blue transition-transform duration-300 group-hover:scale-y-100"
                />
                <span className="hidden text-sm font-semibold text-brand-sky lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold leading-snug text-white">
                  {job.title}
                </h3>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                  <Fact label="Experience" value={job.experience} />
                  <Fact label="Vacancies" value={job.vacancies} />
                  <Fact label="Gender" value={GENDER} />
                  <Fact label="Location" value={LOCATION} />
                </dl>
                <ApplyButton
                  detail={{
                    role: job.title,
                    gender: GENDER,
                    roleType: LOCATION,
                  }}
                  className="block rounded-full border-2 border-brand-ice bg-brand-ice px-7 py-2 text-center text-sm font-semibold text-brand-navy transition-colors duration-500 ease-in-out hover:bg-transparent hover:text-brand-ice lg:justify-self-end"
                >
                  Apply now
                </ApplyButton>
              </article>
            </li>
          ))}
        </ul>{" "}
      </div>
    </section>
  );
}
