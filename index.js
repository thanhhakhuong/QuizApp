/* JSON myData for questions and answers */
const myData = { 
  "mathe": [
    {"text":"x^2+x^2", "options":["2x^2","x^4","x^8","2x^4"]},
    {"text":"x^2*x^2", "options":["x^4","x^2","2x^2","4x"]}
    ],
  "internettechnologien": [
    {"text":"Welche Authentifizierung bietet HTTP", "options":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
    {"text":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "options":["UDP","TCP","HTTP","Fast Retransmit"]},
    ],
  "allgemein": [
    {"text":"Karl der Große, Geburtsjahr", "options":["747","828","650","1150"]},
    {"text":"Wie heißt die Hauptstadt der Slowakei?", "options":["Bratislava","Sofia","Berlin","Prag"]},
    {"text":"Wie viele Zähne hat ein erwachsener Mensch normalerweise?", "options":["32","30","26","36"]},
    ]
}

let p, v, m;

window.addEventListener('DOMContentLoaded', (event) => {
  m = new Model();
  p = new Presenter();
  v = new View(p);
  p.setModelAndView(m, v);
  p.start();
  p.evaluate();
  p.restart();
});