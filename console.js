const output = document.createElement("p");
output.id = "console";
output.innerText = "Console:";
output.style.border = "8px solid red";
output.style.backgroundColor = "darkBlue";
output.style.color = "red";
output.style.fontSize = "32px";
output.style.paddingLeft = "16px";
document.body.appendChild(output);

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function(){
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);

    let log = document.createElement("p");
    log.style.color = "inherit";
    log.style.fontSize = "inherit";
    log.id = "log";
    log.innerText = console.logs[console.logs.length-1];
    output.appendChild(log);
}
