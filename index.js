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
    getCategorySet() {
        var radios = document.getElementsByName('category');
        radios.forEach(radio => radio.addEventListener(
            'change', () => {
                category = "teil-" + radio.value;
                console.log(category);
                return category;
        }))
        return "teil-allgemein";
    }
    getTask() {
        let category = this.getCategorySet();
        return data[category][0];
    }
}

class Presenter {
    setModelAndView(m, v) {
        this.m = m;
        this.v = v;
    }

    start() {
        let currentTask = m.getTask();
        console.log(currentTask);
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = currentTask["a"];
        let answersElement = document.querySelectorAll("#answers > button");
        for (let i = 0; i < 4; i++) {
            answersElement[i].innerHTML = currentTask["l"][i];
        }
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
        document.getElementById("answer-1").addEventListener("click", this.evaluate.bind(this))
    }

    selectCategory(event) {

    }

    evaluate(event) {

    }

    colorOn(event) {

    }

    colorOff(event) {
        
    }
}