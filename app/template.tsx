"use client";

import { usePathname } from "next/navigation";

// Every page fades in as it opens. Keying on the full path remounts the
// wrapper on each navigation, including moves inside one section such as
// /services to /services/devops, which a plain template would not restart.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-in motion-reduce:animate-none">
      {children}
    </div>
  );
}
