'use strict';

function levenshtein(a, b) {
  if (a === b) {
    return 0;
  }

  const alen = a.length;
  const blen = b.length;

  if (alen === 0) {
    return blen;
  }

  if (blen === 0) {
    return alen;
  }

  const dp = Array.from({ length: alen + 1 }, () => new Array(blen + 1));

  for (let i = 0; i <= alen; i += 1) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= blen; j += 1) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= alen; i += 1) {
    const aChar = a.charAt(i - 1);
    for (let j = 1; j <= blen; j += 1) {
      const bChar = b.charAt(j - 1);
      if (aChar === bChar) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1,
        );
      }
    }
  }

  return dp[alen][blen];
}

function addValue(target, value) {
  if (value == null) {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      addValue(target, item);
    }
    return;
  }

  if (typeof value === 'object') {
    const stringified = String(value);
    if (stringified && stringified !== '[object Object]') {
      target.push(stringified.toLowerCase());
    } else {
      const json = JSON.stringify(value);
      if (json && json !== '{}') {
        target.push(json.toLowerCase());
      }
    }
    return;
  }

  const stringValue = String(value).trim().toLowerCase();
  if (stringValue) {
    target.push(stringValue);
  }
}

function getValue(item, key) {
  if (!key) {
    return undefined;
  }

  const path = key.split('.');
  let current = item;

  for (const segment of path) {
    if (current == null) {
      return undefined;
    }

    current = current[segment];
  }

  return current;
}

function collectValues(item, keys) {
  if (!Array.isArray(keys) || keys.length === 0) {
    const values = [];
    addValue(values, item);
    return values;
  }

  const values = [];
  for (const key of keys) {
    const value = getValue(item, key);
    addValue(values, value);
  }

  return values;
}

function buildCandidates(values) {
  const candidates = new Set();

  for (const value of values) {
    if (!value) {
      continue;
    }

    candidates.add(value);

    const tokens = value.split(/[\s,;:!\?\(\)\[\]\{\}\-\/_\\]+/);
    for (const token of tokens) {
      const normalized = token.trim();
      if (normalized) {
        candidates.add(normalized);
      }
    }
  }

  return Array.from(candidates);
}

class Fuse {
  constructor(list, options) {
    this.list = Array.isArray(list) ? Array.from(list) : [];
    this.options = Object.assign({
      keys: [],
      threshold: 0.35,
      ignoreLocation: true,
    }, options || {});
  }

  setCollection(list) {
    this.list = Array.isArray(list) ? Array.from(list) : [];
  }

  search(pattern) {
    const query = String(pattern == null ? '' : pattern).trim().toLowerCase();
    const results = [];

    if (!query) {
      return this.list.map((item, index) => ({
        item,
        refIndex: index,
        score: 0,
      }));
    }

    const threshold = typeof this.options.threshold === 'number' ? this.options.threshold : 0.35;
    const keys = this.options.keys || [];

    this.list.forEach((item, index) => {
      const values = collectValues(item, keys);
      const candidates = buildCandidates(values);

      if (!candidates.length) {
        return;
      }

      let bestScore = Infinity;

      for (const candidate of candidates) {
        if (!candidate) {
          continue;
        }

        const normalizedCandidate = candidate.toLowerCase();
        if (normalizedCandidate.includes(query)) {
          bestScore = 0;
          break;
        }

        const distance = levenshtein(query, normalizedCandidate);
        const denominator = Math.max(query.length, normalizedCandidate.length, 1);
        const score = denominator === 0 ? 0 : distance / denominator;

        if (score < bestScore) {
          bestScore = score;
        }
      }

      if (bestScore <= threshold) {
        results.push({
          item,
          refIndex: index,
          score: bestScore,
        });
      }
    });

    results.sort((a, b) => {
      if (a.score === b.score) {
        return a.refIndex - b.refIndex;
      }
      return a.score - b.score;
    });

    return results;
  }
}

module.exports = Fuse;
module.exports.default = Fuse;
module.exports.Fuse = Fuse;
