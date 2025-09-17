class Processor {
  constructor() {
    this.plugins = [];
  }

  use(plugin, options) {
    if (typeof plugin === "function") {
      const transformer = plugin(options);
      if (typeof transformer === "function") {
        this.plugins.push(transformer);
      }
    }
    return this;
  }

  async process(markdown) {
    let result = String(markdown ?? "");
    for (const transformer of this.plugins) {
      // eslint-disable-next-line no-await-in-loop
      result = await transformer(result);
    }
    return {
      value: result,
      toString() {
        return result;
      },
    };
  }
}

function remark() {
  return new Processor();
}

module.exports = { remark };
