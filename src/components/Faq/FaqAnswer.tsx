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

function renderInline(text: string, keyPrefix: string) {
  return splitFaqMarkup(text).map((part, index) => {
    if (part.type === "text") return <span key={`${keyPrefix}-${index}`}>{part.text}</span>;

    return (
      <a
        key={`${keyPrefix}-${index}`}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {part.text}
      </a>
    );
  });
}

export default function FaqAnswer({ text }: { text: string }) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const hasList = lines.some((line) => line.startsWith("- "));

  if (!hasList) {
    return <p>{renderInline(text, "faq")}</p>;
  }

  const blocks: Array<{ type: "p"; text: string } | { type: "ul"; items: string[] }> = [];

  lines.forEach((line) => {
    if (line.startsWith("- ")) {
      const item = line.slice(2).trim();
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(item);
      else blocks.push({ type: "ul", items: [item] });
      return;
    }

    blocks.push({ type: "p", text: line });
  });

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{renderInline(block.text, `faq-${index}`)}</p>;
      })}
    </>
  );
}
