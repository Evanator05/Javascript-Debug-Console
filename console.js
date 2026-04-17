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

// input container
const inputWrapper = document.createElement("div");
Object.assign(inputWrapper.style, {
  display: "flex",
  borderTop: "2px solid black"
});

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Type JavaScript and press Enter...";
Object.assign(input.style, {
  flex: "1",
  fontSize: "14px",
  padding: "6px",
  fontFamily: "monospace",
  border: "none",
  outline: "none",
  backgroundColor: "#111",
  color: "white"
});

inputWrapper.appendChild(input);
output.appendChild(inputWrapper);

// command history
let history = [];
let historyIndex = -1;

// evaluate input
function runCommand(code) {
  try {
    // echo input
    createConsoleLog(["> " + code], "#aaa", "INPUT");

    let result = eval(code);

    // handle promises nicely
    if (result instanceof Promise) {
      result
        .then(res => createConsoleLog([res], "lime", "RESULT"))
        .catch(err => createConsoleLog([err], "red", "ERROR"));
    } else if (result !== undefined) {
      createConsoleLog([result], "lime", "RESULT");
    }
  } catch (err) {
    createConsoleLog([err.stack || err], "red", "ERROR");
  }
}

// key handling
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const code = input.value.trim();
    if (!code) return;

    history.push(code);
    historyIndex = history.length;

    runCommand(code);
    input.value = "";
  }

  // history navigation
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
    e.preventDefault();
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = "";
    }
    e.preventDefault();
  }
});

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
