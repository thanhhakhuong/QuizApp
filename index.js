/* JSON myData for questions and answers */
const myData = { 
  "mathe": [
    {"a":"x^2+x^2", "l":["2x^2","x^4","x^8","2x^4"]},
    {"a":"x^2*x^2", "l":["x^4","x^2","2x^2","4x"]}
    ],
  "internettechnologien": [
    {"a":"Welche Authentifizierung bietet HTTP", "l":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
    {"a":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "l":["UDP","TCP","HTTP","Fast Retransmit"]},
    ],
  "allgemein": [
    {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]},
    ]
}

let p, v, m;
// let category = "allgemein";
// let right = wrong = total = 0;
// let currentIndex = 0;

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