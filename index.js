
const GREEN = "#C3EDBF";
const RED = "#FF6961";
/* JSON DATA for questions and answers */
const DATA = { 
  "teil-mathe": [
    {"a":"x^2+x^2", "l":["2x^2","x^4","x^8","2x^4"]},
    {"a":"x^2*x^2", "l":["x^4","x^2","2x^2","4x"]}
    ],
  "teil-internettechnologien": [
    {"a":"Welche Authentifizierung bietet HTTP", "l":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
    {"a":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "l":["UDP","TCP","HTTP","Fast Retransmit"]},
    ],
  "teil-allgemein": [
    {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]},
    ],
  "teil-noten": [
    {"a":"C4", "l":["C","D","E","H"]},
    {"a":"(C4 E4 G4)", "l": ["C", "H", "F", "D"]},
    ]       
}
let p, v, m;
let category = "teil-allgemein";
let right = wrong = total = 0;
let currentIndex = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    m = new Model();
    p = new Presenter();
    v = new View(p);
    p.setModelAndView(m, v);
    p.start();
    p.evaluate();
    p.restart();
});

class Presenter {
    setModelAndView(m, v) {
        this.m = m;
        this.v = v;
    }

    start() {
        console.log("Presenter -> start");
        v.setHandler();
        m.getTask();
    }

    evaluate() {
        var buttons = document.querySelectorAll('#answers > button');
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                // console.log("Presenter -> evaluate" + right + "-" + wrong + "-" + total);
                m.evaluate(event);
                v.evaluate(event);
            })
        })      
    }

    restart() {
        document.getElementById("restart").addEventListener("click", () => {
            console.log("Presenter -> restart");
            m.restart();
            v.restart();
        });
    }

}

class Model {
    // TODO: add get category
    
    getTask() {
        console.log("Model -> getTask");
        // TODO: change this to return DATA
        // render question separated in view

        // intial task
        let currentTask = DATA[category][currentIndex];
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = currentTask["a"];
        let answersElement = document.querySelectorAll("#answers > button");
        for (let i = 0; i < 4; i++) {
            answersElement[i].innerHTML = currentTask["l"][i];
        }
        // load new task when new category is selected
        var radios = document.getElementsByName('category');
        radios.forEach(radio => radio.addEventListener(
            'change', () => {
                category = "teil-" + radio.value;
                console.log("Model -> getTask: " + category);
                currentIndex = 0;
                currentTask = DATA[category][currentIndex];
                // TODO: move this to view - create displayTask() function
                questionElement.innerHTML = currentTask["a"];
                answersElement = document.querySelectorAll("#answers > button");
                for (let i = 0; i < 4; i++) {
                    answersElement[i].innerHTML = currentTask["l"][i];
                    answersElement[i].disabled = false;
                }
        }))

    }

    restart() {
        console.log("Model -> restart");
        let button = document.getElementById("restart");
        button.addEventListener("click", () => {
            right = 0;
            wrong = 0;
            total = 0;
        })
    }

    evaluate(event) {
        let progressBarElem = document.getElementById("progress-bar");
        let rightItem = "<div class=\"item right\"/></div>";
        let wrongItem = "<div class=\"item wrong\"/></div>";
        if (event.target.id == "0") {
            right++;
            progressBarElem.innerHTML += rightItem;
            // load new task - merge this into getTask
            console.log("Category length: " + DATA[category].length);
            if (currentIndex + 1 < DATA[category].length) {
                currentIndex++;
                console.log("Get new task " + currentIndex);
                this.getTask();
            } else {
                document.getElementById("question").innerHTML = "Herzlichen Glückwunsch, Sie haben alle Fragen in dieser Kategorie beantwortet!";
                let buttons = document.querySelectorAll('#answers > button');
                buttons.forEach(button => button.disabled = true);
            }
        }
        else {
            wrong++;
            progressBarElem.innerHTML += wrongItem;
        }
        total = total + 1;
        // console.log("Model -> evaluate " + right + "-" + wrong + "-" + total);
    }
}

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

    selectCategory(event) {
        
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