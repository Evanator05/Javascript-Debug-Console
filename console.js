const output = document.createElement("div");
output.id = "console";
Object.assign(output.style, {
  border: "4px solid black",
  backgroundColor: "#0b1a2a",
  color: "white",
  fontSize: "14px",
  padding: "8px",
  fontFamily: "monospace",
  maxHeight: "300px",
  overflowY: "auto",
  whiteSpace: "pre-wrap"
});
document.body.appendChild(output);

function formatArgs(args) {
  return args.map(arg => {
    if (typeof arg === "object") {
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return "[Circular]";
      }
    }
    return String(arg);
  }).join(" ");
}

function createConsoleLog(args, color = "white", type = "LOG") {
  const log = document.createElement("div");

  const time = new Date().toLocaleTimeString();

  log.textContent = `[${time}] [${type}] ${formatArgs(args)}`;
  log.style.color = color;

  output.appendChild(log);

  // auto-scroll
  output.scrollTop = output.scrollHeight;
}

// preserve original console
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  debug: console.debug
};

console.log = function (...args) {
  createConsoleLog(args, "white", "LOG");
  originalConsole.log.apply(console, args);
};

console.warn = function (...args) {
  createConsoleLog(args, "yellow", "WARN");
  originalConsole.warn.apply(console, args);
};

console.error = function (...args) {
  createConsoleLog(args, "red", "ERROR");
  originalConsole.error.apply(console, args);
};

console.debug = function (...args) {
  createConsoleLog(args, "cyan", "DEBUG");
  originalConsole.debug.apply(console, args);
};

// better error handling
window.onerror = function (msg, url, lineNo, columnNo, error) {
  createConsoleLog(
    [`${msg}\n${url}:${lineNo}:${columnNo}\n${error?.stack || ""}`],
    "red",
    "ERROR"
  );
};

// unhandled promise rejections
window.onunhandledrejection = function (event) {
  createConsoleLog(
    [`Unhandled Promise Rejection:\n${event.reason}`],
    "red",
    "ERROR"
  );
};
