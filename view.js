let right = 0;
let wrong = 0;
let total = 0;

class View {

    constructor(p) {
        this.p = p;
        this.setHandler();
    }

    setHandler() {
        let answersEl = document.querySelectorAll('#answers > button');
        answersEl.forEach(button => {
            button.addEventListener("mousedown", this.colorOn.bind(this));
            button.addEventListener("mouseup", this.colorOff.bind(this));
        })
    }

    displayTask(task) {
        let questionEl = document.getElementById("question");
        let answersEl = document.querySelectorAll("#answers > button");

        questionEl.innerHTML = task["text"];
        answersEl = document.querySelectorAll("#answers > button");
        for (let i = 0; i < 4; i++) {
            answersEl[i].innerHTML = task["options"][i];
        }

        if (category == "mathe") {
            katex.render(task["text"], questionEl, {
                throwOnError: false
            });
            for (let i = 0; i < 4; i++) {
                katex.render(task["options"][i], answersEl[i], {
                    throwOnError: false
                });
            }
        }
    }

    displayEvaluation(success) {
        if (success == null) {
            document.getElementById("rightNum").innerText = "Richtig: 0";
            document.getElementById("wrongNum").innerText = "Falsch: 0"; 
            document.getElementById("totalNum").innerText = "Gesamt: 0"; 
            document.getElementById("progress-bar").innerHTML = "";
        } else {
            if (success == true) {
                right++;
                document.getElementById("rightNum").innerText = "Richtig: " + right;
                document.getElementById("progress-bar").innerHTML += "<div class=\"item right\"/></div>";
            }
            else {
                wrong++;
                document.getElementById("wrongNum").innerText = "Falsch: " + wrong;
                document.getElementById("progress-bar").innerHTML += "<div class=\"item wrong\"/></div>";
            }
    
            total++;
            document.getElementById("totalNum").innerText = "Gesamt: " + total; 
        }
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