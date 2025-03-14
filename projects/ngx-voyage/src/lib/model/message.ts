export interface Message {
  text: string;
  type: "info" | "warn" | "error";
}

export function isMessage(m: unknown): m is Message {
  return m != null && typeof m === "object" && "text" in m && "type" in m;
}
