// Sends a form to /api/send. The server chooses the inbox from the kind:
// applications go to careers@, contact messages and demo requests to info@.
// Returns an error message to show, or null when it was sent.
export async function submitForm(
  kind: "application" | "contact" | "demo",
  data: FormData,
): Promise<string | null> {
  data.set("kind", kind);
  try {
    const res = await fetch("/api/send", { method: "POST", body: data });
    if (res.ok) return null;
    const body = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    return body?.error ?? "Something went wrong. Please try again.";
  } catch {
    return "We could not reach the server. Please check your connection and try again.";
  }
}
