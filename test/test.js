let answers = [];
function start() {
	var p = document.getElementById("normal-button");
	p.addEventListener("click", loadAjax);
	var answersEl = document.querySelectorAll('#answers > button');
	answersEl.forEach(button => {
		button.addEventListener("click", (event) => checkAjax(event));
	})
}
window.onload = start;

function loadAbsatz () {
	document.getElementById("absatz").innerHTML += "von Javascript eingefügter Text.";
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
		// console.log( "Status: " + xhr.readyState + " " + xhr.status);
		if (xhr.status == 200) {
			let data = JSON.parse(xhr.responseText);
			console.log(data);
			displayTask(data);
		} 
	}
	
	function sendXhr() {
		let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/1';
		xhr.onreadystatechange = xhrHandler;
		xhr.open('GET', url);
		xhr.setRequestHeader("Authorization", "Basic " + window.btoa("s81983@gmail.com:secret"));
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

function checkAjax(event) {
	// console.log(event.target.id);
	let answer = parseInt(event.target.id);
	answers.push(answer);
	console.log(JSON.stringify(answers));

	let xhr = getXhr();
	sendXhr(xhr);

	function getXhr() { // API für asynchrone Aufrufe
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
		return xhr;
	} else return false;
	}

	function xhrHandler() {
		console.log( "Status: " + xhr.readyState );
		if (xhr.readyState != 4) { 
			return; 
		}
		console.log( "Status: " + xhr.readyState + " " + xhr.status);
		if (xhr.status == 200) {
			let data = JSON.parse(xhr.responseText);
			console.log(data);
		} 
	}
	
	function sendXhr() {
		let url = 'https://irene.informatik.htw-dresden.de:8888/api/quizzes/1/solve';
		xhr.onreadystatechange = xhrHandler;
		xhr.open('POST', url);
		xhr.setRequestHeader("Authorization", "Basic " + window.btoa("s81983@gmail.com:secret"));
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Accept", "application/json");
		let dataToSend = "[2]";
		console.log(dataToSend);
		xhr.send(JSON.stringify(answers));
		console.debug("Request send");
	}
}