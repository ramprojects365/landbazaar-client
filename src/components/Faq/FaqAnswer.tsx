type FaqPart =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string };

function splitFaqMarkup(text: string): FaqPart[] {
  const parts: FaqPart[] = [];
  const pattern = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "link", text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", text: text.slice(lastIndex) });
  }

  return parts;
}

export default function FaqAnswer({ text }: { text: string }) {
  return (
    <p>
      {splitFaqMarkup(text).map((part, index) => {
        if (part.type === "text") return <span key={index}>{part.text}</span>;

        return (
          <a
            key={index}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part.text}
          </a>
        );
      })}
    </p>
  );
}
