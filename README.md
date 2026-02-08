# err-boost

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/webdigixit/err-boost.git)

![NPM Version](https://img.shields.io/npm/v/err-boost)
![License](https://img.shields.io/github/license/webdigixit/err-boost)

The ultimate error-handling utility for modern JavaScript. Enhance, wrap, and trace errors without losing metadata.

ErrBoost is a lightweight utility for enhancing JavaScript and TypeScript errors with rich metadata, stack preservation, automatic timestamps, and better JSON serialization. Wrap, extend, and re-throw errors without losing the original context or custom properties.

## Features

-   **Zero-Loss Error Wrapping** – Preserve the original error message, stack trace, and properties when re-throwing.
-   **Rich Metadata** – Attach any custom properties to your errors for better logging and debugging.
-   **Smart JSON Serialization** – A built-in `toJSON()` method includes custom properties and stack data in logs, unlike standard `Error` objects.
-   **Auto-Timestamping** – Every boosted error gets an ISO timestamp for precise event tracking.
-   **Modern `cause` Support** – Uses the native `Error.cause` property to maintain clean, inspectable error chains.
-   **Flexible API** – Create errors from messages, objects, and original `Error` instances with a single, intuitive function.
-   **Lightweight & Typed** – Written in TypeScript with zero external dependencies.

## Installation

```sh
npm install err-boost
```

## Usage

### ESM / TypeScript

```javascript
import errBoost from "err-boost";
```

### CommonJS (Node.js)

```javascript
const errBoost = require("err-boost");
```

### Creating an Error with Custom Properties

Attach any metadata you need. This is perfect for logging structured data like request IDs or status codes.

```javascript
function findUser(id) {
  // ...logic
  if (!user) {
    throw errBoost({ userId: id, status: 404 }, "User not found");
  }
}
```

### Wrapping an Existing Error

Preserve the original error's stack trace and message while adding new context.

```javascript
try {
  await database.connect();
} catch (err) {
  // The original stack trace and message from `err` are preserved.
  throw errBoost(err, { severity: "high" }, "Failed to connect to database");
}
```

### Using Built-in Error Types

Quickly create specific, typed errors with the same enhancement features.

```javascript
// Creates a boosted TypeError
throw errBoost.type({ expected: "string" }, "Invalid input type");

// Creates a boosted RangeError
throw errBoost.range("Value must be positive");
```

## JSON Serialization for Better Logging

Standard JavaScript errors return an empty object when stringified. ErrBoost provides rich, structured JSON output out of the box, making it ideal for logging systems.

```javascript
const err = errBoost({ id: 123, code: "E_FAIL" }, "Test Error");

console.log(JSON.stringify(err, null, 2));
```

**Output:**

```json
{
  "name": "ErrBoost",
  "message": "Test Error",
  "stack": "ErrBoost: Test Error\n    at <anonymous>:1:13",
  "timestamp": "2026-02-08T17:00:00.000Z",
  "isBoosted": true,
  "id": 123,
  "code": "E_FAIL"
}
```

## API

### `errBoost([originalError], [props], [message])`

The main factory function for creating enhanced errors. It intelligently handles arguments in any order.

-   `originalError` (Optional): An `Error` instance to wrap.
-   `props` (Optional): An object with custom properties to add to the error.
-   `message` (Optional): A string message for the error.

### `errBoost.wrap(err, [context], [message])`

A specialized wrapper designed for `catch` blocks. It ensures any thrown value (even non-Error objects) is properly converted into a boosted error.

-   `err` (Required): The caught value (`unknown`).
-   `context` (Optional): An object with custom properties.
-   `message` (Optional): A string message to prepend to the original error's message.

### Static Helpers

-   `errBoost.type([props], [message])`
-   `errBoost.range([props], [message])`
-   `errBoost.syntax([props], [message])`

## Testing

This repository uses Vitest for testing. To run the test suite:

```sh
npm test
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
