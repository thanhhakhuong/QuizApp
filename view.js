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
        let questionEl = document.getElementById("question");
        let answersEl = document.querySelectorAll("#answers > button");

        questionEl.innerHTML = task["a"];
        answersEl = document.querySelectorAll("#answers > button");
        for (let i = 0; i < 4; i++) {
            answersEl[i].innerHTML = task["l"][i];
        }

        if (category == "mathe") {
            katex.render(task["a"], questionEl, {
                throwOnError: false
            });
            for (let i = 0; i < 4; i++) {
                katex.render(task["l"][i], answersEl[i], {
                    throwOnError: false
                });
            }
        }
    }

    evaluate(stat) {
        document.getElementById("rightNum").innerText = "Richtig: " + stat['right']; 
        document.getElementById("wrongNum").innerText = "Falsch: " + stat['right']; 
        document.getElementById("totalNum").innerText = "Gesamt: " + stat['total']; 
        if(stat['result'] == true) document.getElementById("progress-bar").innerHTML += "<div class=\"item right\"/></div>";
        if(stat['result'] == false) document.getElementById("progress-bar").innerHTML += "<div class=\"item wrong\"/></div>";
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
                event.target.style.backgroundColor = "#C3EDBF";
            } else event.target.style.backgroundColor = "#FF6961";
        }
    }

    colorOff(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
            event.target.style.backgroundColor = "transparent";
        }
    }
}