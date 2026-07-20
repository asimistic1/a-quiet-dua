import type { Metadata } from "next";
import { getQuietMessages } from "@/app/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminMessagesPage() {
  const messages = await getQuietMessages();

  return (
    <main
      className="min-h-[100dvh] px-6 py-12"
      style={{
        background: "linear-gradient(180deg, #101B33 0%, #1E1A24 55%, #141018 100%)",
        color: "#C9CDD6",
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <h1
          className="mb-2"
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#E6C280",
          }}
        >
          Quiet messages
        </h1>
        <p
          className="mb-10 opacity-50"
          style={{
            fontFamily: "var(--font-ui), system-ui, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {messages.length} received
        </p>

        {messages.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              opacity: 0.55,
              lineHeight: 1.7,
            }}
          >
            No messages yet — or KV is not configured.
          </p>
        ) : (
          <ul className="flex flex-col gap-8">
            {messages.map((msg, i) => (
              <li
                key={`${msg.date}-${i}`}
                className="border-t border-white/10 pt-5"
              >
                <time
                  className="mb-3 block opacity-40"
                  style={{
                    fontFamily: "var(--font-ui), system-ui, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {formatDate(msg.date)}
                </time>
                <p
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    color: "#E8E4EA",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
