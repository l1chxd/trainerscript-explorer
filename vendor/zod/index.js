class ZodError extends Error {
  constructor(issues) {
    super('Zod validation error');
    this.name = 'ZodError';
    this.issues = issues;
  }
}

class ZodType {
  optional() {
    return new ZodOptional(this);
  }

  parse(value) {
    const issues = [];
    const parsed = this._parse(value, issues, []);
    if (issues.length > 0) {
      throw new ZodError(issues);
    }
    return parsed;
  }

  safeParse(value) {
    const issues = [];
    const parsed = this._parse(value, issues, []);
    if (issues.length > 0) {
      return { success: false, error: new ZodError(issues) };
    }
    return { success: true, data: parsed };
  }

  _parse(value) {
    return value;
  }
}

function describe(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

class ZodString extends ZodType {
  _parse(value, issues, path) {
    if (typeof value !== 'string') {
      issues.push({ path, message: `Expected string, received ${describe(value)}` });
      return undefined;
    }
    return value;
  }
}

class ZodArray extends ZodType {
  constructor(element) {
    super();
    this.element = element;
  }

  _parse(value, issues, path) {
    if (!Array.isArray(value)) {
      issues.push({ path, message: `Expected array, received ${describe(value)}` });
      return [];
    }
    const result = [];
    for (let index = 0; index < value.length; index += 1) {
      const parsed = this.element._parse(value[index], issues, path.concat(index));
      result[index] = parsed;
    }
    return result;
  }
}

class ZodOptional extends ZodType {
  constructor(inner) {
    super();
    this.inner = inner;
  }

  _parse(value, issues, path) {
    if (value === undefined) {
      return undefined;
    }
    return this.inner._parse(value, issues, path);
  }
}

function isOptional(schema) {
  return schema instanceof ZodOptional;
}

class ZodObject extends ZodType {
  constructor(shape) {
    super();
    this.shape = shape;
  }

  _parse(value, issues, path) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      issues.push({ path, message: `Expected object, received ${describe(value)}` });
      return {};
    }

    const result = {};
    for (const key of Object.keys(this.shape)) {
      const schema = this.shape[key];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        if (isOptional(schema)) {
          continue;
        }
        issues.push({ path: path.concat(key), message: 'Missing required property' });
        continue;
      }
      const parsed = schema._parse(value[key], issues, path.concat(key));
      if (!isOptional(schema) || parsed !== undefined) {
        result[key] = parsed;
      }
    }
    return result;
  }
}

const z = {
  string: () => new ZodString(),
  array: (schema) => new ZodArray(schema),
  object: (shape) => new ZodObject(shape),
};

module.exports = {
  z,
  ZodError,
  ZodType,
  ZodString,
  ZodArray,
  ZodObject,
  ZodOptional,
};
