import errBoost from "./dist/index.js";

// 1. The "Clean Log" Test
const dbError = errBoost({ query: "SELECT *", latency: "500ms" }, "Database Timeout");

// This is the genius part: JSON support out of the box
console.log("--- Clean JSON Output ---");
console.log(JSON.stringify(dbError, null, 2));

// 2. The "Real World" Wrap
try {
  throw new Error("Disk Full");
} catch (e) {
  const fatal = errBoost.wrap(e, { severity: "FATAL", service: "uploader" }, "System Crash");
  
  console.log("\n--- Wrapped Error ---");
  console.log(fatal.message); // System Crash \n Disk Full
  console.log("Trace preserved:", !!fatal.stack);
}