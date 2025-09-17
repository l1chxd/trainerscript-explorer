function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function convertInline(text) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const lines = String(markdown ?? "")
    .replace(/\r\n/g, "\n")
    .split(/\n/);

  const htmlParts = [];
  let inList = false;
  let paragraphBuffer = [];

  const closeList = () => {
    if (inList) {
      htmlParts.push("</ul>");
      inList = false;
    }
  };

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }
    const text = paragraphBuffer.join(" ");
    htmlParts.push(`<p>${convertInline(text)}</p>`);
    paragraphBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      closeList();
      flushParagraph();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      closeList();
      flushParagraph();
      htmlParts.push(`<h${level}>${convertInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    const listMatch = line.match(/^[-*+]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!inList) {
        htmlParts.push("<ul>");
        inList = true;
      }
      htmlParts.push(`<li>${convertInline(listMatch[1])}</li>`);
      continue;
    }

    paragraphBuffer.push(line.trim());
  }

  closeList();
  flushParagraph();

  return htmlParts.join("");
}

module.exports = function remarkHtml() {
  return async (markdown) => markdownToHtml(markdown);
};
