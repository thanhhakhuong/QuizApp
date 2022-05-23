const email = "s81983@gmail.com";
const password = "secret";
let category = "allgemein";
let index = 0;
let success = null;
let message = "Herzlichen Glückwunsch, Sie haben alle Fragen in dieser Kategorie beantwortet!";
let randomId;
let answers = [];

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
                    this.loadAjax();
                    btn.addEventListener("click", () => this.checkAjax());
                }
            })
        };
    }
    
    getTask() {
        let task = myData[category][index];
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
                // document.getElementById("question").innerHTML = res['feedback'];
                if (res['success'] == true) {
                    console.log("Model 151");
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
            console.log(JSON.stringify(answers));
            xhr.send(JSON.stringify(answers));
            console.debug("Request send");
        }
    }

}