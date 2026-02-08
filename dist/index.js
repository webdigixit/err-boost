// src/index.ts
var ErrBoost = class extends Error {
  timestamp;
  isBoosted = true;
  cause;
  constructor(message, props = {}, original) {
    const finalMessage = original ? `${message}
${original.message}` : message;
    super(finalMessage);
    this.name = (original == null ? void 0 : original.name) || this.constructor.name;
    this.timestamp = (/* @__PURE__ */ new Date()).toISOString();
    if (original == null ? void 0 : original.stack) {
      this.stack = original.stack;
    } else if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
    if (original) {
      this.cause = original;
      Object.assign(this, original);
    }
    Object.assign(this, props);
  }
  /**
   * Enhanced JSON support - standard Errors usually stringify to {}
   */
  toJSON() {
    const json = {
      name: this.name,
      message: this.message,
      stack: this.stack,
      timestamp: this.timestamp,
      isBoosted: this.isBoosted
    };
    Object.keys(this).forEach((key) => {
      if (!(key in json)) {
        json[key] = this[key];
      }
    });
    return json;
  }
};
var errBoost = (originalOrProps, propsOrMsg, msg) => {
  let originalError;
  let properties = {};
  let finalMessage = "";
  const args = [originalOrProps, propsOrMsg, msg];
  for (const arg of args) {
    if (arg instanceof Error) {
      originalError = arg;
    } else if (typeof arg === "string" && arg.length > 0) {
      finalMessage = finalMessage ? `${finalMessage} ${arg}` : arg;
    } else if (typeof arg === "object" && arg !== null) {
      properties = { ...properties, ...arg };
    }
  }
  return new ErrBoost(
    finalMessage || (originalError == null ? void 0 : originalError.message) || "An unexpected error occurred",
    properties,
    originalError
  );
};
errBoost.type = (propsOrMsg, msg) => {
  return errBoost(new TypeError(), propsOrMsg, msg);
};
errBoost.range = (propsOrMsg, msg) => {
  return errBoost(new RangeError(), propsOrMsg, msg);
};
errBoost.syntax = (propsOrMsg, msg) => {
  return errBoost(new SyntaxError(), propsOrMsg, msg);
};
errBoost.wrap = (err, context = {}, message = "Wrapped Error") => {
  const original = err instanceof Error ? err : new Error(String(err));
  return errBoost(original, context, message);
};
var index_default = errBoost;
export {
  ErrBoost,
  index_default as default,
  errBoost
};
