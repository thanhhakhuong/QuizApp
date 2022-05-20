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

    displayTask() {
        
    }

    evaluate() {
        // console.log("View -> evaluate" + right + "-" + wrong + "-" + total);
        var rightElem = document.getElementById("rightNum");
        rightElem.innerText = "Richtig: " + right; 
        var wrongElem = document.getElementById("wrongNum");
        wrongElem.innerText = "Falsch: " + wrong; 
        var totalElem = document.getElementById("totalNum");
        totalElem.innerText = "Gesamt: " + total;
        
    }

    restart() {
        // console.log("View -> Restart");
        document.getElementById("rightNum").innerText = "Richtig: 0";
        document.getElementById("wrongNum").innerText = "Falsch: 0"; 
        document.getElementById("totalNum").innerText = "Gesamt: 0"; 
        document.getElementById("progress-bar").innerHTML = "";
    }

    colorOn(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
            // console.log("colorOn: " + event.type);
            if (event.target.id == "0") {
                event.target.style.backgroundColor = GREEN;
            } else event.target.style.backgroundColor = RED;
        }
    }

    colorOff(event) {
        // console.log("colorOff: " + event.type);
        if (event.target.nodeName.toLowerCase() === "button") {
            event.target.style.backgroundColor = "transparent";
        }
    }
}