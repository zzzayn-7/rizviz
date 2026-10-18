"use client";

import { useEffect, useState } from "react";
import { CONTACT_EVENT } from "./ContactButton";
import ContactDialog from "./ContactDialog";
import type { Origin } from "./PopDialog";

// Mounted once in the root layout so any page can open the contact form.
export default function ContactDialogHost() {
  const [origin, setOrigin] = useState<Origin | null>(null);

  useEffect(() => {
    const open = (event: Event) =>
      setOrigin((event as CustomEvent<Origin>).detail);
    window.addEventListener(CONTACT_EVENT, open);
    return () => window.removeEventListener(CONTACT_EVENT, open);
  }, []);

  return origin ? (
    <ContactDialog origin={origin} onClose={() => setOrigin(null)} />
  ) : null;
}
