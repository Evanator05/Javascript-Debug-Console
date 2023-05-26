const output = document.createElement("p");
output.id = "console";
output.innerText = "Console:";
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
console.log = function() {
  createConsoleLog(Array.from(arguments), "inherit")
}

window.onerror = function(msg, url, lineNo, columnNo, error) {//error messages
  createConsoleLog("File: " + url + "\n At Line: " + lineNo + ":" + columnNo + "\n" + error, "red")
}

console.warn = function(){ //warns
  createConsoleLog(Array.from(arguments), "yellow")
}

console.debug = function(){ //debugs
  createConsoleLog(Array.from(arguments), "blue")
}
