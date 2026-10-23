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
      className="relative w-full pb-20 pt-4 sm:pb-28 sm:pt-8"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-ice">
            Open Positions
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Find your next role.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
            Explore opportunities at Rizviz and find a role that matches your
            skills and experience.
          </p>
        </div>
        <ul className="mt-12 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#12304a]/95 to-[#0b1d2d]/95 shadow-[0_30px_70px_-30px_rgba(50,159,224,0.6)] sm:mt-14">
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
                  className="block rounded-full border-2 border-brand-blue bg-brand-blue px-7 py-2 text-center text-sm font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-transparent lg:justify-self-end"
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
