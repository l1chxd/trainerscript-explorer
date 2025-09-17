function splitTopLevel(input, delimiter) {
  const result = [];
  let current = "";
  let depth = 0;
  let quoteChar = null;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (quoteChar) {
      current += char;
      if (char === quoteChar && input[i - 1] !== "\\") {
        quoteChar = null;
      }
      continue;
    }

    if (char === "\"" || char === "'") {
      quoteChar = char;
      current += char;
      continue;
    }

    if (char === "{" || char === "[") {
      depth += 1;
      current += char;
      continue;
    }

    if (char === "}" || char === "]") {
      if (depth > 0) {
        depth -= 1;
      }
      current += char;
      continue;
    }

    if (depth === 0 && char === delimiter) {
      if (current.trim().length > 0) {
        result.push(current.trim());
      }
      current = "";
      continue;
    }

    current += char;
  }

  const finalValue = current.trim();
  if (finalValue.length > 0) {
    result.push(finalValue);
  }

  return result;
}

function stripQuotes(value) {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseValue(raw) {
  const value = raw.trim();
  if (!value) {
    return "";
  }

  if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  if (value === "true" || value === "false") {
    return value === "true";
  }

  if (!Number.isNaN(Number(value)) && value === String(Number(value))) {
    return Number(value);
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) {
      return [];
    }
    return splitTopLevel(inner, ",").map((part) => parseValue(part));
  }

  if (value.startsWith("{") && value.endsWith("}")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) {
      return {};
    }
    const entries = splitTopLevel(inner, ",");
    const result = {};
    for (const entry of entries) {
      const separator = entry.indexOf(":");
      if (separator === -1) {
        continue;
      }
      const key = stripQuotes(entry.slice(0, separator).trim());
      const entryValue = entry.slice(separator + 1).trim();
      result[key] = parseValue(entryValue);
    }
    return result;
  }

  return stripQuotes(value);
}

function parseFrontMatterBlock(block) {
  const data = {};
  const lines = block.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }
    const separator = line.indexOf(":");
    if (separator === -1) {
      continue;
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1);
    if (!key) {
      continue;
    }
    data[key] = parseValue(value);
  }
  return data;
}

function matter(input) {
  const source = input == null ? "" : String(input);
  const frontMatterMatch = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);

  if (!frontMatterMatch) {
    return {
      content: source,
      data: {},
      matter: "",
    };
  }

  const [, frontMatter] = frontMatterMatch;
  const content = source.slice(frontMatterMatch[0].length);
  return {
    content,
    data: parseFrontMatterBlock(frontMatter),
    matter: frontMatterMatch[0],
  };
}

module.exports = matter;
matter.default = matter;
matter.matter = matter;
