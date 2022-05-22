const email = "s81983@gmail.com";
const password = "secret";
window.onload = start;
let randomId;

function start() {
	var p = document.getElementById("ajaxBtn");
	p.addEventListener("click", loadAjax);
	let answersEl = document.querySelectorAll('#answers > button');
	answersEl.forEach(button => {
		button.addEventListener("click", loadAjax);
	})
}

function loadAjax() {

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
			// displayTask(data);
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

function displayTask(task) {

	let question = task["text"];
	let answers = task["options"];

	let questionEl = document.getElementById('question');
	let answersEl = document.querySelectorAll('#answers > button');

	questionEl.innerHTML = question;
	for (let i = 0; i < 4; i++) {
		answersEl[i].innerHTML = answers[i];
	}
}