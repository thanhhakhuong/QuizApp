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
let currentSet;
let category;
let right, wrong, total;
const GREEN = "#C3EDBF";
const RED = "#FF6961";

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    m = new Model();
    p = new Presenter();
    v = new View(p);
    p.setModelAndView(m, v);
    // setTimeout(p.start, 2000);
    p.start();
});

class Model {
    
    getTask() {
        let category = "teil-internettechnologien";
        var radios = document.getElementsByName('category');
        radios.forEach(radio => radio.addEventListener(
            'change', () => {
                category = "teil-" + radio.value;
                console.log("Model -> getTask: " + category);
                let currentTask = data[category][0];
                let questionElement = document.getElementById("question");
                questionElement.innerHTML = currentTask["a"];
                let answersElement = document.querySelectorAll("#answers > button");
                for (let i = 0; i < 4; i++) {
                    answersElement[i].innerHTML = currentTask["l"][i];
            }
        }))
        return data;
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

    evaluate(answer) {
        console.log("Presenter -> Answer: " + answer);
    }

}

class View {
    constructor(p) {
        this.p = p;
        this.setHandler();
    }

    setHandler() {

        document.getElementById("answer-1").addEventListener("click", this.evaluate.bind(this));

        document.getElementById("answer-1").addEventListener("mousedown", this.colorOn.bind(this));
        document.getElementById("answer-1").addEventListener("mouseup", this.colorOff.bind(this));
        document.getElementById("answer-2").addEventListener("mousedown", this.colorOn.bind(this));
        document.getElementById("answer-3").addEventListener("mousedown", this.colorOn.bind(this));
        document.getElementById("answer-4").addEventListener("mousedown", this.colorOn.bind(this));

        document.getElementById("answer-1").addEventListener("click", this.colorOff.bind(this));
    }

    selectCategory(event) {
        
    }

    evaluate(event) {
        console.log("View -> Evaluate: " + event.type + " " + event.target.nodeName);
        console.log(event);
    }

    colorOn(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
            this.color = event.target.style.backgroundColor;
            console.log("colorOn: " + event.type + " Color: " + this.color);
            if (event.target.id == "answer-1") {
                event.target.style.backgroundColor = GREEN;
            } else event.target.style.backgroundColor = RED;
        }

    }

    colorOff(event) {
        
    }
}