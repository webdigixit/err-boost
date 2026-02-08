To make your README.md look exactly like the ono documentation, we need to use a specific layout: badges at the top, a clear tagline, a structured feature list, and organized code blocks.Here is the professional Markdown content for your ErrBoost project.ErrBoost (Boost!)Throw better errors.FeaturesZero-Loss Wrapping — Wrap and re-throw errors without losing the original type, message, stack trace, or properties.Smart JSON Serialization — Built-in toJSON() support ensures custom properties and stack traces show up in logs.Auto-Timestamping — Every error automatically includes an ISO timestamp for easier debugging and auditing.Modern cause Support — Leverages the native JavaScript cause property to maintain a clean error chain.Flexible API — Supports multiple signatures for messages, objects, and error instances.Lightweight & Typed — Written in TypeScript with zero external dependencies.ExampleJavaScriptimport errBoost from "err-boost";

// Throw an error with custom properties
throw errBoost({ code: "NOT_FOUND", status: 404 }, `Resource not found: ${url}`);

// Wrap an error without losing the original stack and props
throw errBoost(originalError, "An error occurred while saving your changes");

// Wrap an error and add custom properties
throw errBoost(originalError, { code: 404, status: "NOT_FOUND" });

// Use the specialized "wrap" helper for catch blocks
try {
  // some code
} catch (err) {
  throw errBoost.wrap(err, { severity: "high" }, "Operation failed");
}

// Throw specific Error subtypes
throw errBoost.range("Value must be positive");
throw errBoost.type({ expected: "string" }, "Invalid input type");
InstallationInstall using npm:Bashnpm install err-boost
UsageWhen using ErrBoost in Node.js apps (CommonJS):JavaScriptconst errBoost = require("err-boost");
When using a transpiler such as Babel or TypeScript (ES Modules):JavaScriptimport errBoost from "err-boost";
APIerrBoost([originalError], [props], [message])Creates a boosted Error object with the given properties.originalError — (optional) The original error that occurred. Its message, stack trace, and properties will be preserved.props — (optional) An object whose properties will be copied to the new error.message — (optional) The error message string.Specific error typesYou can explicitly create specific types of errors using these methods. The signatures are identical to the default errBoost() function.MethodReturn TypeerrBoost.error()ErrorerrBoost.type()TypeErrorerrBoost.range()RangeErrorerrBoost.syntax()SyntaxErrorerrBoost.reference()ReferenceErrorJSON SupportStandard JavaScript errors return an empty object {} when passed to JSON.stringify(). ErrBoost fixes this by providing a comprehensive toJSON() method:JavaScriptconst err = errBoost({ id: 123 }, "Test Error");
console.log(JSON.stringify(err, null, 2));

/*
{
  "name": "ErrBoost",
  "message": "Test Error",
  "stack": "ErrBoost: Test Error at...",
  "timestamp": "2026-02-08T17:00:00.000Z",
  "isBoosted": true,
  "id": 123
}
*/
LicenseMIT
