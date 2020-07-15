

function openPage(page) {
	document.getElementById('home').style.display='none';
	document.getElementById('news').style.display='none';
	document.getElementById('displays').style.display='none';
	document.getElementById('guestbook').style.display='none';
	document.getElementById('store').style.display='none';
	document.getElementById('register').style.display='none';
	document.getElementById(page).style.display='block';
	getDestinations(page);
}

function getVersion() {
	const uriVersion = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/version";
	const xhrVersion = new XMLHttpRequest();
	xhrVersion.open("GET", uriVersion, true);
	xhrVersion.onload = () => {
		let addrs = "<div>"
		addrs += '<h1 class = "title">Welcome to The Bob Doran Museum of Computing</h1> <br> <img src = "http://redsox.uoa.auckland.ac.nz/ms/logo.svg", id="imghome", alt = "Bob Doran Logo"/><br><p> You can learn more about the displays here. If you are intrigued by what you find here and live close to Auckland, or are visiting the city, please feel free to drop in to the school and see the displays for yourself. We are located at the University on Princes Street and are always open during normal office hours and also in the evenings and on the weekends when classes are in session. </p> Version: ' + xhrVersion.responseText + "</div>"
		document.getElementById("home").innerHTML = addrs;
		}
		xhrVersion.send(null);
	}

function getDestinations(page) {
	if (page = "news") { 
		const uriNews = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
		const xhrNews = new XMLHttpRequest();
		xhrNews.open("GET", uriNews, true);
		xhrNews.setRequestHeader("Accept", "application/json");
		xhrNews.onload = () => {
			const respNews = JSON.parse(xhrNews.responseText);
			showNews(respNews);
		}
		xhrNews.send(null);
	}
		
	if (page = "displays") {
		const uriDisplays = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
		const xhrDisplays = new XMLHttpRequest();
		xhrDisplays.open("GET", uriDisplays, true);
		xhrDisplays.setRequestHeader("Accept", "application/json");
		xhrDisplays.onload = () => {
			const respDisplays = JSON.parse(xhrDisplays.responseText);
			showDisplays(respDisplays);
		}
		xhrDisplays.send(null);
	}
	
	if (page = "guestbook") {
		let addrs = "<h1 class='title'>Guestbook</h1> <h2> Please leave a message </h2> <table><tr> <td> Name: <input type= 'text' id = 'name' placeholder = 'Enter name'> </td> </tr> <tr> <td> Comment: <input type= 'text' id = 'message' placeholder = 'Enter comment'> </td> </tr> </table>" 
		addrs += "<br> <button onclick='post()'>Submit</button>" + "</br> </br> </br>" + "<h2> Recent Entries </h2> <iframe id = 'frame' src='http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/htmlcomments'>";
		addrs += "</iframe>"
		document.getElementById("guestbook").innerHTML = addrs;
	}

	if (page = "register") {
		let addrs = "<div> Name: <input type='text' id = 'username' placeholder='Enter Name'></div>";
		addrs += "<div> Password: <input type='password' id = 'password' placeholder='Enter Password'></div>";
		addrs += "<div> Address: <input type='text' id='address' placeholder='Enter Address'></div>"
		addrs += "<button onclick='register()'>Register</button>"
		document.getElementById("register").innerHTML = addrs;
	}

	if (page = "store") {
		const uriStore = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=";
		const xhrStore = new XMLHttpRequest();
		xhrStore.open("GET", uriStore, true);
		xhrStore.setRequestHeader("Accept", "application/json");
		xhrStore.onload = () => {
			const respStore = JSON.parse(xhrStore.responseText);
			showStore(respStore);
		}
		xhrStore.send(null);
	}

}

function check() {
	if (document.getElementById("username") == null) {
		return false;
	}
	else {
		return true;
	}
}

function register(){
	const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/register";
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let address = document.getElementById("address").value;
	const hash = {"Name":username, "Password": password, "Address":address};
	const xhr = new XMLHttpRequest();
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "application/JSON");
	xhr.onload = () => {
		alert(xhr.responseText);}
		xhr.send(JSON.stringify(hash));
	}
	
function post() {
	let name = document.getElementById("name").value;
	let message = document.getElementById("message").value;
	const uriPost = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=" + name;
	const xhrPost = new XMLHttpRequest();
	xhrPost.open("POST", uriPost, true);
	xhrPost.setRequestHeader("Content-Type", "application/json");
	xhrPost.onload = () => {
		document.getElementById('frame').src = document.getElementById('frame').src;
	}
	xhrPost.send(JSON.stringify(message));
}


function showNews(destinations) {
	let addrs = "<div> <h1 class='title'> News </h1> <table>";
	const addNews = (record) => {
		addrs += "<tr> <td> <b>" + record.titleField + "</b> </td> </tr> <tr> <td> </br> <img src=" + record.enclosureField.urlField + " width = auto, height = 50%> </br>" + record.descriptionField + "<div class = 'datefield'>" + record.pubDateField + "</div> </br> </td> </tr>";
   }
   destinations.forEach(addNews)
   addrs += "</table> </div>"
   document.getElementById("news").innerHTML = addrs;
}

function showDisplays(destinations) {
	let addrs = "<div> <h1 class='title'> Displays </h1> </div> </br> <input type='text' id='searchword' onkeyup='search()' placeholder='Search'> <table id='displayTable'> </br> </br> ";
	const addDisplays = (record) => {
		addrs += "<div> <tr> <td> <b>" + record.Title + "</b> </br></br> <img src='http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + record.ItemId + "'width = auto, height = 400px> </td> <td>" + record.Description + " </td> </tr> </div> ";
   }
   destinations.forEach(addDisplays)
   addrs += "</table> </div>"
   document.getElementById("displays").innerHTML = addrs;
}

function showStore(destinations) {
	let addrs = "<div> <h1 class='title'> Store </h1> </div> </br> <input type='text' id='searchword' onkeyup='search()' placeholder='Search'> <table id='displayTable'> </div> </br> </br>";
	const addStore = (record) => {
		addrs += "<tr> <td> <b>" + record.Title + "</b> </td> <td> <img src='http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=" + record.ItemId + "' width = auto, height = 400px> <p>" + record.Description + " </p><a href='http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + record.ItemId + "'>Buy " + record.Title + "</a> </td></div>";
   }
   destinations.forEach(addStore)
   addrs += "</table> </div>"
   document.getElementById("store").innerHTML = addrs;
}

function search() { /*code used from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table */
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("searchword");
	filter = input.value.toUpperCase();
	table = document.getElementById("displayTable");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		} else {
			tr[i].style.display = "none";
			}
		}
	}       
}
