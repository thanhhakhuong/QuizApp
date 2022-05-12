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
let right = wrong = total = 0;
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
    p.evaluate();
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

    restart() {
        let button = document.getElementById("restart");
        button.addEventListener("click", () => {
            right = 0;
            wrong = 0;
            total = 0;
            console.log("Right: " + right + " - Wrong: " + wrong + " - Total: " + total);
        })
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
        m.restart();
    }

    evaluate() {
        var buttons = document.querySelectorAll('#answers > button');
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                console.log("Presenter -> Evaluate: " + event.type + " " + event.target.nodeName);
                if (event.target.id == "answer-1") {
                    right++;
                } else wrong++;
                total = total + 1;
                console.log("Right: " + right + " - Wrong: " + wrong + " - Total: " + total);
                v.evaluate();
            })
        })
    }

    restart() {
        let button = document.getElementById("restart");
        button.addEventListener("click", () => {
            m.restart();
            p.restart();
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
            // button.addEventListener("click", this.evaluate.bind(this));
            button.addEventListener("mousedown", this.colorOn.bind(this));
            button.addEventListener("mouseup", this.colorOff.bind(this));
        })
    }

    selectCategory(event) {
        
    }

    evaluate(event) {
        console.log("View -> Evaluate: Right " + right + " Wrong " + wrong + " Total " + total);
        var elem = document.getElementById("statistik");
        var text = "<li>Right: " + right + "</li>";
        text += "<li>Wrong: " + wrong + "</li>";
        text += "<li>Total: " + total + "</li>";
        elem.innerHTML = text;
        text = "";
    }

    restart() {
        var elem = document.getElementById("statistik");
        text = "<li>Right: 0</li>";
        text += "<li>Wrong: 0</li>";
        text += "<li>Total: 0</li>";
        elem.innerHTML = text;
        text = "";
    }

    colorOn(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
            // this.color = event.target.style.backgroundColor;
            // console.log("colorOn: " + event.type + " Color: " + this.color);
            // console.log("colorOn: " + event.type);
            if (event.target.id == "answer-1") {
                event.target.style.backgroundColor = GREEN;
            } else event.target.style.backgroundColor = RED;
        }
    }

    colorOff(event) {
        // console.log("colorOff: " + event.type + " Color: " + this.color);
        // console.log("colorOff: " + event.type);
        if (event.target.nodeName.toLowerCase() === "button") {
            event.target.style.backgroundColor = "white";
        }
    }
}