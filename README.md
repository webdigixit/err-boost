ErrBoost

Boost your JavaScript/TypeScript error handling — wrap, extend, and re-throw errors without losing original context or custom properties.

A lightweight utility for enhancing JavaScript errors with rich metadata, stack preservation, automatic timestamps, and better JSON serialization.

📌 Features

Zero-Loss Error Wrapping – Preserve original error message, stack trace, and properties when re-throwing.

Smart JSON Serialization – Built-in toJSON() support to include custom properties and stack data in logs.

Auto-Timestamping – Every error gets an ISO timestamp for easier debugging.

Modern Cause Support – Uses the native cause property to maintain clean error chains.

Flexible API – Multiple function signatures for messages, objects, and original Error instances.

Lightweight & Typed – Written in TypeScript with no external dependencies.

📦 Installation

Install via npm:

npm install err-boost

🚀 Usage
📌 CommonJS (Node.js)
const errBoost = require("err-boost");

📌 ESM / TypeScript
import errBoost from "err-boost";

🧠 API
errBoost([originalError], [props], [message])

Creates a boosted Error with:

The given message

Optional custom props included in the error object

Preservation of original error data (if provided)

Example:

throw errBoost({ code: "NOT_FOUND", status: 404 }, `Resource not found: ${url}`);

💡 Advanced Usage
Wrap an existing error:
try {
  // some logic
} catch (err) {
  throw errBoost(err, { severity: "high" }, "Operation failed");
}

Create specific built-in error types:
throw errBoost.range("Value must be positive");
throw errBoost.type({ expected: "string" }, "Invalid input type");

🔍 JSON Support

Standard JavaScript errors return an empty object when stringified. ErrBoost provides a rich JSON output automatically:

const err = errBoost({ id: 123 }, "Test Error");
console.log(JSON.stringify(err, null, 2));


Example output:

{
  "name": "ErrBoost",
  "message": "Test Error",
  "stack": "ErrBoost: Test Error at...",
  "timestamp": "2026-02-08T17:00:00.000Z",
  "isBoosted": true,
  "id": 123
}

📚 Examples
import errBoost from "err-boost";

// Basic error
throw errBoost("Something went wrong!");

// Error with properties
throw errBoost({ code: "E_FAIL" }, "Failed to process request");

🧪 Testing

The repo includes a testing script (test-run.js) and configuration for Mocha, Karma, and NYC. You can run tests with:

npm test

🛡 License

Distributed under the MIT License.

📌 About

No official website or topics are provided in the original repository metadata.
