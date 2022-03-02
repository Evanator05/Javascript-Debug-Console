const output = document.createElement("p");
output.id = "console";
output.innerText = "Console";
output.style.border = "8px solid black";
output.style.backgroundColor = "darkBlue";
output.style.color = "white";
output.style.fontSize = "32px";
output.style.paddingLeft = "16px";
document.body.appendChild(output);

function createConsoleLog(text, colour) {
  let log = document.createElement("p");
  log.style.color = colour;
  log.style.fontSize = "inherit";
  log.id = "log";
  log.innerText = text;
  output.appendChild(log);
}

console.everything = [];
console.defaultLog = console.log.bind(console);
console.log = function(){ //logs
  console.everything.push(Array.from(arguments));
  console.defaultLog.apply(console, arguments);
  createConsoleLog(console.everything[console.everything.length-1], "inherit")
}

console.defaultError = console.error.bind(console);
console.error = function(){ // errors
  console.everything.push(Array.from(arguments));
  console.defaultError.apply(console, arguments);
  createConsoleLog(console.everything[console.everything.length-1], "red")
}

console.defaultWarn = console.warn.bind(console);
console.warn = function(){ //warns
  console.everything.push(Array.from(arguments));
  console.defaultWarn.apply(console, arguments);
  createConsoleLog(console.everything[console.everything.length-1], "yellow")
}

console.defaultDebug = console.debug.bind(console);
console.debug = function(){ //debugs
  console.everything.push(Array.from(arguments));
  console.defaultDebug.apply(console, arguments);
  createConsoleLog(console.everything[console.everything.length-1], "blue")
}
