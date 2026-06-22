import type { ReactNode } from "react"; // 용도 JSX 내부 인라인 마크다운 렌더링 타입 정의

type MarkdownRendererProps = {
  content: string;
};

type CalloutType = "info" | "tip" | "warning" | "note" | "success";

type MarkdownBlock =
  | {
      type: "heading";
      level: 1 | 2 | 3;
      content: string;
    }
  | {
      type: "paragraph";
      lines: string[];
    }
  | {
      type: "list";
      ordered: boolean;
      items: string[];
    }
  | {
      type: "code";
      language: string;
      content: string;
    }
  | {
      type: "diagram";
      lines: string[];
    }
  | {
      type: "image";
      alt: string;
      src: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "details";
      summary: string;
      content: string[];
    }
  | {
      type: "callout";
      variant: CalloutType;
      title: string;
      content: string[];
    }
  | {
      type: "quote";
      content: string;
    }
  | {
      type: "divider";
    }
  | {
      type: "spacer";
    };

const CALLOUT_LABELS: Record<CalloutType, string> = {
  info: "Info",
  tip: "Tip",
  warning: "Warning",
  note: "Note",
  success: "Success",
};

function isBlankLine(line: string) {
  return line.trim() === "";
}

function isHeadingLine(line: string) {
  return line.startsWith("# ");
}

function isSubHeadingLine(line: string) {
  return line.startsWith("## ");
}

function isSmallHeadingLine(line: string) {
  return line.startsWith("### ");
}

function isUnorderedListLine(line: string) {
  return line.startsWith("- ");
}

function isOrderedListLine(line: string) {
  return /^\d+\.\s+/.test(line.trim());
}

function isQuoteLine(line: string) {
  return line.startsWith("> ");
}

function isDividerLine(line: string) {
  return line.trim() === "---";
}

function isImageLine(line: string) {
  return /^!\[.*\]\(.*\)$/.test(line.trim());
}

function isTableLine(line: string) {
  const trimmedLine = line.trim();

  return trimmedLine.startsWith("|") && trimmedLine.endsWith("|");
}

function isTableDividerLine(line: string) {
  const trimmedLine = line.trim();

  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(trimmedLine);
}

function isDiagramStart(line: string) {
  return line.startsWith("```diagram");
}

function isCodeBlockStart(line: string) {
  return line.startsWith("```") && !isDiagramStart(line);
}

function isDetailsStart(line: string) {
  return line.startsWith(":::details ");
}

function isBlockEnd(line: string) {
  return line.trim() === ":::";
}

function isCalloutType(value: string): value is CalloutType {
  return (
    value === "info" ||
    value === "tip" ||
    value === "warning" ||
    value === "note" ||
    value === "success"
  );
}

function isCalloutStart(line: string) {
  const blockType = line.trim().replace(":::", "").split(" ")[0];

  return line.startsWith(":::") && isCalloutType(blockType);
}

function removeMarkdownPrefix(line: string, prefix: string) {
  return line.replace(prefix, "").trim();
}

function removeOrderedListPrefix(line: string) {
  return line.replace(/^\d+\.\s+/, "").trim();
}

function parseImageLine(line: string) {
  const imageMatch = line.trim().match(/^!\[(.*)\]\((.*)\)$/);

  if (!imageMatch) {
    return {
      alt: "",
      src: "",
    };
  }

  return {
    alt: imageMatch[1],
    src: imageMatch[2],
  };
}

function parseTableCells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseCodeLanguage(line: string) {
  const language = line.replace("```", "").trim();

  if (!language) {
    return "text";
  }

  return language;
}

function createParagraphBlock(lines: string[]) {
  return {
    type: "paragraph" as const,
    lines,
  };
}

function collectParagraphLines(lines: string[], startIndex: number) {
  const paragraphLines: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];

    if (isBlankLine(line)) {
      break;
    }

    if (isDiagramStart(line) || isCodeBlockStart(line)) {
      break;
    }

    if (isDetailsStart(line) || isCalloutStart(line)) {
      break;
    }

    if (isTableLine(line)) {
      break;
    }

    if (
      isHeadingLine(line) ||
      isSubHeadingLine(line) ||
      isSmallHeadingLine(line)
    ) {
      break;
    }

    if (
      isUnorderedListLine(line) ||
      isOrderedListLine(line) ||
      isImageLine(line) ||
      isQuoteLine(line) ||
      isDividerLine(line)
    ) {
      break;
    }

    paragraphLines.push(line.trim());
    index += 1;
  }

  return {
    paragraphLines,
    nextIndex: index,
  };
}

function parseCodeBlock(lines: string[], startIndex: number) {
  const language = parseCodeLanguage(lines[startIndex]);
  const codeLines: string[] = [];
  let index = startIndex + 1;

  while (index < lines.length && !lines[index].startsWith("```")) {
    codeLines.push(lines[index]);
    index += 1;
  }

  return {
    block: {
      type: "code" as const,
      language,
      content: codeLines.join("\n"),
    },
    nextIndex: index + 1,
  };
}

function parseDiagramBlock(lines: string[], startIndex: number) {
  const diagramLines: string[] = [];
  let index = startIndex + 1;

  while (index < lines.length && !lines[index].startsWith("```")) {
    const line = lines[index].trim();

    if (line) {
      diagramLines.push(line);
    }

    index += 1;
  }

  return {
    block: {
      type: "diagram" as const,
      lines: diagramLines,
    },
    nextIndex: index + 1,
  };
}

function parseDetailsBlock(lines: string[], startIndex: number) {
  const summary = removeMarkdownPrefix(lines[startIndex], ":::details ");
  const detailsLines: string[] = [];
  let index = startIndex + 1;

  while (index < lines.length && !isBlockEnd(lines[index])) {
    detailsLines.push(lines[index]);
    index += 1;
  }

  return {
    block: {
      type: "details" as const,
      summary,
      content: detailsLines,
    },
    nextIndex: index + 1,
  };
}

function parseCalloutHeader(line: string) {
  const rawHeader = line.trim().replace(":::", "");
  const [rawType, ...titleParts] = rawHeader.split(" ");
  const variant = isCalloutType(rawType) ? rawType : "info";
  const title = titleParts.join(" ").trim() || CALLOUT_LABELS[variant];

  return {
    variant,
    title,
  };
}

function parseCalloutBlock(lines: string[], startIndex: number) {
  const header = parseCalloutHeader(lines[startIndex]);
  const calloutLines: string[] = [];
  let index = startIndex + 1;

  while (index < lines.length && !isBlockEnd(lines[index])) {
    if (!isBlankLine(lines[index])) {
      calloutLines.push(lines[index].trim());
    }

    index += 1;
  }

  return {
    block: {
      type: "callout" as const,
      variant: header.variant,
      title: header.title,
      content: calloutLines,
    },
    nextIndex: index + 1,
  };
}

function parseTableBlock(lines: string[], startIndex: number) {
  const headers = parseTableCells(lines[startIndex]);
  const rows: string[][] = [];
  let index = startIndex + 1;

  if (index < lines.length && isTableDividerLine(lines[index])) {
    index += 1;
  }

  while (index < lines.length && isTableLine(lines[index])) {
    if (!isTableDividerLine(lines[index])) {
      rows.push(parseTableCells(lines[index]));
    }

    index += 1;
  }

  return {
    block: {
      type: "table" as const,
      headers,
      rows,
    },
    nextIndex: index,
  };
}

function parseListBlock(lines: string[], startIndex: number) {
  const ordered = isOrderedListLine(lines[startIndex]);
  const items: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];

    if (ordered && !isOrderedListLine(line)) {
      break;
    }

    if (!ordered && !isUnorderedListLine(line)) {
      break;
    }

    items.push(
      ordered
        ? removeOrderedListPrefix(line)
        : removeMarkdownPrefix(line, "- "),
    );
    index += 1;
  }

  return {
    block: {
      type: "list" as const,
      ordered,
      items,
    },
    nextIndex: index,
  };
}

function parseQuoteBlock(lines: string[], startIndex: number) {
  const quoteLines: string[] = [];
  let index = startIndex;

  while (index < lines.length && isQuoteLine(lines[index])) {
    quoteLines.push(removeMarkdownPrefix(lines[index], "> "));
    index += 1;
  }

  return {
    block: {
      type: "quote" as const,
      content: quoteLines.join(" "),
    },
    nextIndex: index,
  };
}

function parseMarkdownBlocks(content: string) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (isBlankLine(line)) {
      blocks.push({ type: "spacer" });
      index += 1;
      continue;
    }

    if (isDiagramStart(line)) {
      const parsedBlock = parseDiagramBlock(lines, index);
      blocks.push(parsedBlock.block);
      index = parsedBlock.nextIndex;
      continue;
    }

    if (isCodeBlockStart(line)) {
      const parsedBlock = parseCodeBlock(lines, index);
      blocks.push(parsedBlock.block);
      index = parsedBlock.nextIndex;
      continue;
    }

    if (isDetailsStart(line)) {
      const parsedBlock = parseDetailsBlock(lines, index);
      blocks.push(parsedBlock.block);
      index = parsedBlock.nextIndex;
      continue;
    }

    if (isCalloutStart(line)) {
      const parsedBlock = parseCalloutBlock(lines, index);
      blocks.push(parsedBlock.block);
      index = parsedBlock.nextIndex;
      continue;
    }

    if (isTableLine(line)) {
      const parsedBlock = parseTableBlock(lines, index);
      blocks.push(parsedBlock.block);
      index = parsedBlock.nextIndex;
      continue;
    }

    if (isSmallHeadingLine(line)) {
      blocks.push({
        type: "heading",
        level: 3,
        content: removeMarkdownPrefix(line, "### "),
      });
      index += 1;
      continue;
    }

    if (isSubHeadingLine(line)) {
      blocks.push({
        type: "heading",
        level: 2,
        content: removeMarkdownPrefix(line, "## "),
      });
      index += 1;
      continue;
    }

    if (isHeadingLine(line)) {
      blocks.push({
        type: "heading",
        level: 1,
        content: removeMarkdownPrefix(line, "# "),
      });
      index += 1;
      continue;
    }

    if (isUnorderedListLine(line) || isOrderedListLine(line)) {
      const parsedBlock = parseListBlock(lines, index);
      blocks.push(parsedBlock.block);
      index = parsedBlock.nextIndex;
      continue;
    }

    if (isQuoteLine(line)) {
      const parsedBlock = parseQuoteBlock(lines, index);
      blocks.push(parsedBlock.block);
      index = parsedBlock.nextIndex;
      continue;
    }

    if (isImageLine(line)) {
      const image = parseImageLine(line);

      blocks.push({
        type: "image",
        alt: image.alt,
        src: image.src,
      });

      index += 1;
      continue;
    }

    if (isDividerLine(line)) {
      blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    const parsedParagraph = collectParagraphLines(lines, index);

    blocks.push(createParagraphBlock(parsedParagraph.paragraphLines));
    index = parsedParagraph.nextIndex;
  }

  return blocks;
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index): ReactNode => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (linkMatch) {
      return (
        <a
          key={`${part}-${index}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

function renderHeading(
  block: Extract<MarkdownBlock, { type: "heading" }>,
  index: number,
) {
  if (block.level === 1) {
    return <h1 key={index}>{renderInlineMarkdown(block.content)}</h1>;
  }

  if (block.level === 2) {
    return <h2 key={index}>{renderInlineMarkdown(block.content)}</h2>;
  }

  return <h3 key={index}>{renderInlineMarkdown(block.content)}</h3>;
}

function renderParagraph(
  block: Extract<MarkdownBlock, { type: "paragraph" }>,
  index: number,
) {
  return (
    <p key={index}>
      {block.lines.map((line, lineIndex) => (
        <span key={`${line}-${lineIndex}`}>
          {renderInlineMarkdown(line)}
          {lineIndex < block.lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

function renderList(
  block: Extract<MarkdownBlock, { type: "list" }>,
  index: number,
) {
  const ListTag = block.ordered ? "ol" : "ul";

  return (
    <ListTag key={index}>
      {block.items.map((item, itemIndex) => (
        <li key={`${item}-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
      ))}
    </ListTag>
  );
}

function renderCode(
  block: Extract<MarkdownBlock, { type: "code" }>,
  index: number,
) {
  return (
    <div className="markdown-code-block" key={index}>
      <div className="markdown-code-block__header">
        <span className="markdown-code-block__dot" />
        <span className="markdown-code-block__dot" />
        <span className="markdown-code-block__dot" />
        <span className="markdown-code-block__language">{block.language}</span>
      </div>

      <pre>
        <code data-language={block.language}>{block.content}</code>
      </pre>
    </div>
  );
}

function renderDiagram(
  block: Extract<MarkdownBlock, { type: "diagram" }>,
  index: number,
) {
  return (
    <div className="markdown-diagram" key={index}>
      {block.lines.map((line, lineIndex) => (
        <div className="markdown-diagram__row" key={`${line}-${lineIndex}`}>
          {line}
        </div>
      ))}
    </div>
  );
}

function renderImage(
  block: Extract<MarkdownBlock, { type: "image" }>,
  index: number,
) {
  return (
    <figure key={index}>
      <img src={block.src} alt={block.alt} />
      {block.alt && <figcaption>{block.alt}</figcaption>}
    </figure>
  );
}

function renderTable(
  block: Extract<MarkdownBlock, { type: "table" }>,
  index: number,
) {
  return (
    <div className="markdown-table-wrap" key={index}>
      <table>
        <thead>
          <tr>
            {block.headers.map((header, headerIndex) => (
              <th key={`${header}-${headerIndex}`}>
                {renderInlineMarkdown(header)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={`${row.join("-")}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>
                  {renderInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderDetails(
  block: Extract<MarkdownBlock, { type: "details" }>,
  index: number,
) {
  return (
    <details key={index}>
      <summary>{renderInlineMarkdown(block.summary)}</summary>

      <div>
        {block.content.map((line, lineIndex) => (
          <p key={`${line}-${lineIndex}`}>{renderInlineMarkdown(line)}</p>
        ))}
      </div>
    </details>
  );
}

function renderCallout(
  block: Extract<MarkdownBlock, { type: "callout" }>,
  index: number,
) {
  return (
    <aside
      className={`markdown-callout markdown-callout--${block.variant}`}
      key={index}
    >
      <div className="markdown-callout__rail" />

      <div className="markdown-callout__content">
        <p className="markdown-callout__title">
          {renderInlineMarkdown(block.title)}
        </p>

        {block.content.map((line, lineIndex) => (
          <p className="markdown-callout__text" key={`${line}-${lineIndex}`}>
            {renderInlineMarkdown(line)}
          </p>
        ))}
      </div>
    </aside>
  );
}

function renderQuote(
  block: Extract<MarkdownBlock, { type: "quote" }>,
  index: number,
) {
  return (
    <blockquote key={index}>{renderInlineMarkdown(block.content)}</blockquote>
  );
}

function renderDivider(index: number) {
  return <hr key={index} />;
}

function renderSpacer(index: number) {
  return <div className="markdown-spacer" key={index} />;
}

function renderMarkdownBlock(block: MarkdownBlock, index: number) {
  if (block.type === "heading") {
    return renderHeading(block, index);
  }

  if (block.type === "paragraph") {
    return renderParagraph(block, index);
  }

  if (block.type === "list") {
    return renderList(block, index);
  }

  if (block.type === "code") {
    return renderCode(block, index);
  }

  if (block.type === "diagram") {
    return renderDiagram(block, index);
  }

  if (block.type === "image") {
    return renderImage(block, index);
  }

  if (block.type === "table") {
    return renderTable(block, index);
  }

  if (block.type === "details") {
    return renderDetails(block, index);
  }

  if (block.type === "callout") {
    return renderCallout(block, index);
  }

  if (block.type === "quote") {
    return renderQuote(block, index);
  }

  if (block.type === "divider") {
    return renderDivider(index);
  }

  return renderSpacer(index);
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="markdown-content">
      {blocks.map((block, index) => renderMarkdownBlock(block, index))}
    </div>
  );
}
