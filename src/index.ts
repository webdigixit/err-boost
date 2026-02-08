type ErrorProps = Record<string, any>;
type ErrorConstructor = new (message?: string) => Error;

export class ErrBoost extends Error {
  public timestamp: string;
  public isBoosted = true;
  public cause?: Error;
  [key: string]: any;

  constructor(message: string, props: ErrorProps = {}, original?: Error) {
    // 1. Combine messages if wrapping (inspired by ono's concatMessages)
    const finalMessage = original ? `${message}\n${original.message}` : message;
    super(finalMessage);

    // 2. Set identity properties
    this.name = original?.name || this.constructor.name;
    this.timestamp = new Date().toISOString();
    
    // 3. Preserve stack trace or capture new one
    if (original?.stack) {
      this.stack = original.stack;
    } else if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, this.constructor);
    }

    // 4. Merge custom properties and handle the original error link
    if (original) {
      this.cause = original;
      // Copy properties from the original error to this one
      Object.assign(this, original);
    }
    
    // Custom properties passed to the constructor take precedence
    Object.assign(this, props);
  }

  /**
   * Enhanced JSON support - standard Errors usually stringify to {}
   */
  public toJSON() {
    const json: ErrorProps = {
      name: this.name,
      message: this.message,
      stack: this.stack,
      timestamp: this.timestamp,
      isBoosted: this.isBoosted
    };

    // Add all enumerable custom properties
    Object.keys(this).forEach((key) => {
      if (!(key in json)) {
        json[key] = this[key];
      }
    });

    return json;
  }
}

/**
 * The Main Factory Function
 */
export const errBoost = (
  originalOrProps?: Error | string | ErrorProps,
  propsOrMsg?: ErrorProps | string,
  msg?: string
) => {
  let originalError: Error | undefined;
  let properties: ErrorProps = {};
  let finalMessage = "";

  const args = [originalOrProps, propsOrMsg, msg];
  
  for (const arg of args) {
    if (arg instanceof Error) {
      originalError = arg;
    } else if (typeof arg === "string" && arg.length > 0) {
      // If we already have a message, append to it (or use the last string found)
      finalMessage = finalMessage ? `${finalMessage} ${arg}` : arg;
    } else if (typeof arg === "object" && arg !== null) {
      properties = { ...properties, ...arg };
    }
  }

  return new ErrBoost(
    finalMessage || originalError?.message || "An unexpected error occurred",
    properties,
    originalError
  );
};

// --- Static Helpers for Instant Typed Errors ---

errBoost.type = (propsOrMsg?: ErrorProps | string, msg?: string) => {
  return errBoost(new TypeError(), propsOrMsg, msg);
};

errBoost.range = (propsOrMsg?: ErrorProps | string, msg?: string) => {
  return errBoost(new RangeError(), propsOrMsg, msg);
};

errBoost.syntax = (propsOrMsg?: ErrorProps | string, msg?: string) => {
  return errBoost(new SyntaxError(), propsOrMsg, msg);
};

/**
 * Specialized "Production-Ready" wrapper for catch blocks
 */
errBoost.wrap = (err: unknown, context: ErrorProps = {}, message: string = "Wrapped Error") => {
  const original = err instanceof Error ? err : new Error(String(err));
  return errBoost(original, context, message);
};

export default errBoost;