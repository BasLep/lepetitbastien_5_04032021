// console.log("a");
// fetch("https://jsonplaceholder.typicode.com/todos")
// 	//.then((response) => response.json())
// 	/*.then((response) => {
// 		return response.json();
// 	}) */
// 	.then(function (xyz) {
// 		return xyz.json();
// 	})
// 	.then((todos) => {
// 		console.log("b");
// 		console.log(todos);
// 	});
// console.log("c");

async function getTodos() {
	const res = await fetch("https://jsonplaceholder.typicode.com/todos");
	const todos = await res.json();
	//console.log(todos);
	const content = document.getElementById("content");
	todos.forEach((todo) => {
		const h3 = document.createElement("h3");
		h3.textContent = todo.title;
		content.appendChild(h3);
	});
}
getTodos();

// let tImageTeddy = [
// 	"../back/images/teddy_1.jpg",
// 	"../back/images/teddy_2.jpg",
// 	"../back/images/teddy_3.jpg",
// 	"../back/images/teddy_4.jpg",
// 	"../back/images/teddy_5.jpg"
// ];
// async function affichageIndex() {
// 	const h1IndexPage = document.createElement("h1");
// 	const boxHeaderIndex = document.getElementById("header_index");
// 	boxHeaderIndex.appendChild(h1IndexPage);
// 	const logoHeader = document.createElement("img");
// 	logoHeader.src = "image/logo_entreprise.png";
// 	h1IndexPage.appendChild(logoHeader);
// 	for (let i = 0; i < tImageTeddy.length; i++) {
// 		const imageTeddy = document.createElement("img");
// 		const h2TeddyImage = document.createElement("h2");
// 		imageTeddy.src = tImageTeddy[i];
// 		const textH2Teddy = document.write("Teddy Bears n°" + (i + 1));
// 		const boxImageTeddy = document.getElementById("image_teddy_index");
// 		boxImageTeddy.appendChild(imageTeddy, textH2Teddy);
// 	}
// }
// affichageIndex();
