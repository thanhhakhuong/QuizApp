/* JSON myData for questions and answers */
const myData = { 
  "mathe": [
    {"text":"x^2+x^2", "options":["2x^2","x^4","x^8","2x^4"]},
    {"text":"x^2*x^2", "options":["x^4","x^2","2x^2","4x"]}
    ],
  "internettechnologien": [
    {"text":"Welche Authentifizierung bietet HTTP?", "options":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
    {"text":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen?", "options":["UDP","TCP","HTTP","Fast Retransmit"]},
    {"text":"A proxy server is used for which of the following?", "options":["To process client requests for web pages","To provide TCP/IP","To process client requests for database access","To provide security against unauthorized users"]},
    {"text":"SMTP is a...", "options":["Protocol used for transferring message","Networking protocol","Encryption standard","Protocol used for smart card message interchange"]},
    {"text":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "options":["UDP","TCP","HTTP","Fast Retransmit"]},
  ],
  "allgemein": [
    {"text":"Karl der Große, Geburtsjahr", "options":["747","828","650","1150"]},
    {"text":"Wie heißt die Hauptstadt der Slowakei?", "options":["Bratislava","Sofia","Berlin","Prag"]},
    {"text":"Wie viele Zähne hat ein erwachsener Mensch normalerweise?", "options":["32","30","26","36"]},
    ]
}
const email = "s81983@gmail.com";
const password = "secret";
let category = "allgemein";
let index = 0;
let success = null;
let message = "Herzlichen Glückwunsch, Sie haben alle Fragen in dieser Kategorie beantwortet!";
let randomId;
let answers = [];
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

// ############### PRESENTER ###############

class Presenter {
    setModelAndView(m, v) {
        this.m = m;
        this.v = v;
    }

    start() {
        v.setHandler();
        m.getCategory();
        m.getTask();
    }

    evaluate() {
        let answersEl = document.querySelectorAll('#answers > button');
        answersEl.forEach(button => {
            button.addEventListener("click", (event) => {
                success = m.evaluate(event);
                if(success != undefined) v.displayEvaluation(success);
            })
        })      
    }

    restart() {
        document.getElementById("restart").addEventListener("click", () => {
            m.restart();
            v.displayEvaluation(null);
        });
    }

}

// ############### MODEL ###############

class Model {

    getCategory() {
        
        let categoriesEl = document.querySelectorAll('#categories > button');
        let answersEl = document.querySelectorAll("#answers > button");
        let taskEl = document.getElementById("task");

        let btn = document.createElement("button");
        btn.innerHTML = "Submit";
        btn.type = "submit";
        btn.name = "formBtn";
        btn.id = "submitBtn";

        for (let i = 0; i < 4; i++) {
            categoriesEl[i].addEventListener("click", (event) => {
                category = event.target.value;
                index = 0;
                answersEl.forEach(button => button.style.visibility = 'visible');
                if (i < 3) {
                    this.getTask();
                    if(taskEl.contains(btn)) taskEl.removeChild(btn);
                }
                else {
                    taskEl.appendChild(btn);
                    document.getElementById("progress").innerHTML = "";
                    this.loadAjax();
                    btn.addEventListener("click", () => this.checkAjax());
                }
            })
        };
    }
    
    getTask() {
        let task = myData[category][index];
        let total = myData[category].length;
        let cur = index + 1;
        v.displayProgress(cur, total);
        v.displayTask(task);
    }

    restart() {
        success = null;
    }

    evaluate(event) {
        // if (event.target.nodeName.toLowerCase() === "button") {
        if (category != 'ajax') {
            if (event.target.id == "0") {
                success = true;
                    if (index < myData[category].length - 1) {
                        index++;
                        this.getTask();
                    } else
                    {
                        document.getElementById("question").innerHTML = message;
                        let answersEl = document.querySelectorAll('#answers > button');
                        for (let i = 0; i < 4; i++) {
                            answersEl[i].style.visibility = 'hidden';
                        }
                    }
                } 
            else {
                success = false;
            }
            return success;
        }
        else {
            this.getAnswers(event);
            return;
        }
    }

    // ##################### AJAX ##############################

    loadAjax() {

        let xhr = getXhr();
        sendXhr(xhr);

        function getXhr() { // API für asynchrone Aufrufe
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
            return xhr;
        } else return false;
        }

        function xhrHandler() {
            // console.log( "Status: " + xhr.readyState );
            if (xhr.readyState != 4) { 
                return; 
            }
            if (xhr.status == 404) {
                sendXhr(xhr);
            }
            // console.log( "Status: " + xhr.readyState + " " + xhr.status);
            if (xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                // console.log(data);
                v.displayTask(data);
            }
        }
        
        function sendXhr() {
            randomId = Math.floor(Math.random() * 30) + 1;
            let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/' + randomId;
            xhr.onreadystatechange = xhrHandler;
            xhr.open('GET', url);
            xhr.setRequestHeader("Authorization", "Basic " + window.btoa(email + ":" + password));
            xhr.send(null);
            console.debug("Request send");
        }

    }

    getAnswers(event) {
        if (category == "ajax") {
            let answer = parseInt(event.target.id);
            if (!answers.includes(answer)) answers.push(answer);
        }
    }

    checkAjax() {

        let xhr = getXhr();
        sendXhr(xhr);

        function getXhr() { // API für asynchrone Aufrufe
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
            return xhr;
        } else return false;
        }

        function xhrHandler() {
            // console.log( "Status: " + xhr.readyState );
            if (xhr.readyState != 4) { 
                return; 
            }
            // console.log( "Status: " + xhr.readyState + " " + xhr.status);
            if (xhr.status == 200) {
                let res = JSON.parse(xhr.responseText);
                console.log(res);
                v.displayEvaluation(res['success']);
                document.getElementById("progress").innerHTML = res['feedback'];
                if (res['success'] == true) {
                    setTimeout(m.loadAjax(),20000);
                }
                answers = [];
            } 
        }
        
        function sendXhr() {
            let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/1/solve';
            xhr.onreadystatechange = xhrHandler;
            xhr.open('POST', url);
            xhr.setRequestHeader("Authorization", "Basic " + window.btoa("s81983@gmail.com:secret"));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify(answers));
            console.debug("Request send");
        }
    }

}


// ############### VIEW ###############
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

    displayProgress(cur, total) {
        let progressEl = document.getElementById("progress");
        progressEl.innerHTML = cur + "/" + total;
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
        let btn = document.getElementById("task").lastChild;
        if (event.target.nodeName.toLowerCase() === "button") {
            if (btn.innerText != "Submit") {
                if (event.target.id == "0") {
                    event.target.style.backgroundColor = "#C3EDBF";
                } else event.target.style.backgroundColor = "#FF6961";
            } else {
                event.target.style.backgroundColor = "#C1C1C1";
            }
        }
    }

    colorOff(event) {
        if (event.target.nodeName.toLowerCase() === "button") {
                event.target.style.backgroundColor = "transparent";
        }
    }
}