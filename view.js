const GREEN = "#C3EDBF";
const RED = "#FF6961";

class View {

    constructor(p) {
        this.p = p;
        this.setHandler();
    }

    setHandler() {
        let buttons = document.querySelectorAll('#answers > button');
        buttons.forEach(button => {
            button.addEventListener("mousedown", this.colorOn.bind(this));
            button.addEventListener("mouseup", this.colorOff.bind(this));
        })
    }

    displayTask(task) {
        
    }

    evaluate(stat) {
        document.getElementById("rightNum").innerText = "Richtig: " + stat['right']; 
        document.getElementById("wrongNum").innerText = "Falsch: " + stat['right']; 
        document.getElementById("totalNum").innerText = "Gesamt: " + stat['total']; 
    }

    restart() {
        document.getElementById("rightNum").innerText = "Richtig: 0";
        document.getElementById("wrongNum").innerText = "Falsch: 0"; 
        document.getElementById("totalNum").innerText = "Gesamt: 0"; 
        document.getElementById("progress-bar").innerHTML = "";
    }

    colorOn(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
            if (event.target.id == "0") {
                event.target.style.backgroundColor = GREEN;
            } else event.target.style.backgroundColor = RED;
        }
    }

    colorOff(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
            event.target.style.backgroundColor = "transparent";
        }
    }
}