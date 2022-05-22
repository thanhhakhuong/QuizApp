let category = "allgemein";
let index = 0;
let stat = {
    "right": 0,
    "wrong": 0,
    "total": 0,
    "result": null
}
let message = "Herzlichen Glückwunsch, Sie haben alle Fragen in dieser Kategorie beantwortet!";
const email = "s81983@gmail.com";
const password = "secret";
let randomId;

class Model {

    getCategory() {
        let categoriesEl = document.querySelectorAll('#categories > button');
        let answersEl = document.querySelectorAll("#answers > button");
        for (let i = 0; i < 4; i++) {
            categoriesEl[i].addEventListener("click", (event) => {
                category = event.target.value;
                index = 0;
                answersEl.forEach(button => button.style.visibility = 'visible');
                if (i < 3) this.getTask();
                else this.loadAjax();
            })
        };
    }
    
    getTask() {
        let task = myData[category][index];
        v.displayTask(task);
    }

    restart() {
        stat = {
            "right": 0,
            "wrong": 0,
            "total": 0,
            "result": null
        }
    }

    evaluate(event) {
        // TODO: add categories constraint
        // if (event.target.nodeName.toLowerCase() === "button") {
            if (event.target.id == "0") {
                stat['right']++;
                stat['result'] = true;
                if (category != 'ajax') {
                    if (index + 1 < myData[category].length) {
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
                } else {
                    this.loadAjax();
                }
            }
            else {
                stat['wrong']++;
                stat['result'] = false;
            }
            stat['total']++;
            return stat;
        // }
    }

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
			console.log(xhr.responseText);
			let data = JSON.parse(xhr.responseText);
			// console.log(data['content']);
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

}