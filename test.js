function start () {
	var p = document.getElementById("normal-button");
	p.addEventListener("click", loadAjax);
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
		console.log( "Status: " + xhr.readyState );
		if (xhr.readyState != 4) { 
			return; 
		}
		console.log( "Status: " + xhr.readyState + " " + xhr.status);
		if (xhr.status == 200) {
		document.getElementById("absatz").innerHTML = xhr.responseText;
		} 
	}
	
	function sendXhr() {
		xhr.onreadystatechange = xhrHandler;
		xhr.open('GET', 'http://idefix.informatik.htw-dresden.de/it1/js/ajaxdemo.txt');
		xhr.send(null);
		console.debug("Request send");
	}

}