let p, v, m;

let data = { 
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
let category = "teil-allgemein";
let right = wrong = total = 0;
let currentIndex = 0;

const GREEN = "#C3EDBF";
const RED = "#FF6961";

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

class Model {
    
    getTask() {
        console.log("Model -> getTask");
        // TODO: change this to return data
        // render question separated in view

        // intial task
        let currentTask = data[category][currentIndex];
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
                currentTask = data[category][currentIndex];
                questionElement.innerHTML = currentTask["a"];
                answersElement = document.querySelectorAll("#answers > button");
                for (let i = 0; i < 4; i++) {
                    answersElement[i].innerHTML = currentTask["l"][i];
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
        if (event.target.id == "answer-1") {
            right++;
            // load new task
            console.log("Category length: " + data[category].length);
            if (currentIndex + 1 < data[category].length) {
                currentIndex++;
                console.log("Get new task " + currentIndex);
                this.getTask();
            }
        }
        else {
            wrong++;
        }
        total = total + 1;
        // console.log("Model -> evaluate " + right + "-" + wrong + "-" + total);
    }
}

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

class View {
    constructor(p) {
        this.p = p;
        this.setHandler();
    }

    setHandler() {
        var buttons = document.querySelectorAll('#answers > button');
        buttons.forEach(button => {
            button.addEventListener("mousedown", this.colorOn.bind(this));
            button.addEventListener("mouseup", this.colorOff.bind(this));
        })
    }

    selectCategory(event) {
        
    }

    evaluate() {
        // console.log("View -> evaluate" + right + "-" + wrong + "-" + total);
        var rightElem = document.getElementById("right");
        rightElem.innerText = "Richtig: " + right; 
        var wrongElem = document.getElementById("wrong");
        wrongElem.innerText = "Falsch: " + wrong; 
        var totalElem = document.getElementById("total");
        totalElem.innerText = "Gesamt: " + total;
    }

    restart() {
        // console.log("View -> Restart");
        document.getElementById("right").innerText = "Richtig: 0";
        document.getElementById("wrong").innerText = "Falsch: 0"; 
        document.getElementById("total").innerText = "Gesamt: 0"; 
    }

    colorOn(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
            // console.log("colorOn: " + event.type);
            if (event.target.id == "answer-1") {
                event.target.style.backgroundColor = GREEN;
            } else event.target.style.backgroundColor = RED;
        }
    }

    colorOff(event) {
        // console.log("colorOff: " + event.type);
        if (event.target.nodeName.toLowerCase() === "button") {
            event.target.style.backgroundColor = "white";
        }
    }
}