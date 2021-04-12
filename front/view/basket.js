// display teddy information in basket page for each teddy in the basket
function displayBasket() {
	let card = JSON.parse(localStorage.getItem("card"));
	let tableBody = document.getElementById("table_body");
	card.forEach((teddy) => {
		// recuperation of the teddy id
		products = {
			id: teddy.id
		};
		console.log(products);
		// new line
		let newLine = tableBody.insertRow(0);
		// new line for image
		let newCellImage = newLine.insertCell(-1);
		const image = document.createElement("img");
		image.src = teddy.url;
		newCellImage.appendChild(image);
		// new cell for teddy name
		let newCellName = newLine.insertCell(-1);
		let nameTeddy = document.createTextNode(teddy.nameTeddy);
		newCellName.appendChild(nameTeddy);
		// new cell for color of teddy
		let newCellColor = newLine.insertCell(-1);
		let color = document.createTextNode(teddy.color);
		newCellColor.appendChild(color);
		// new cell for price
		let newCellPrice = newLine.insertCell(-1);
		let price = document.createTextNode(teddy.price);
		newCellPrice.appendChild(price);
		// new cell for quantity
		let newCellQuantity = newLine.insertCell(-1);
		let quantity = document.createTextNode(teddy.quantity);
		newCellQuantity.appendChild(quantity);
		// new cell for add teddy
		let newCellAdd = newLine.insertCell(-1);
		let add = document.createTextNode("+");
		newCellAdd.appendChild(add);
		newCellAdd.addEventListener("click", () => {
			teddy.quantity++;
			localStorage.setItem("card", JSON.stringify(card));
			document.location.reload();
		});
		// new cell for remove one teddy in quantity
		let newCellRemove = newLine.insertCell(-1);
		let remove = document.createTextNode("-");
		newCellRemove.appendChild(remove);
		newCellRemove.addEventListener("click", () => {
			teddy.quantity--;
			if (teddy.quantity === 0) {
				let index = card.indexOf(teddy);
				card.splice(index, 1);
			}
			localStorage.setItem("card", JSON.stringify(card));
			document.location.reload();
		});
		// new cell for delete teddy
		let newCellDelete = newLine.insertCell(-1);
		let deleteTeddy = document.createTextNode("Supprimer");
		newCellDelete.appendChild(deleteTeddy);
		newCellDelete.addEventListener("click", () => {
			let index = card.indexOf(teddy);
			card.splice(index, 1);
			// delete card[index];
			localStorage.setItem("card", JSON.stringify(card));
			document.location.reload();
		});
		// new cell for total by teddy
		let newCellTotalPriceTeddy = newLine.insertCell(-1);
		let totalPriceNumber = parseInt(teddy.price * teddy.quantity);
		let totalPriceTeddy = document.createTextNode(totalPriceNumber + "€");
		newCellTotalPriceTeddy.appendChild(totalPriceTeddy);
	});
}
displayBasket();
// counting total price
function totalPrice() {
	let card = JSON.parse(localStorage.getItem("card"));
	let cellTotalPrice = document.getElementById("total_price");
	let arrayPrice = [];
	let result = 0;
	for (let i = 0; i < card.length; i++) {
		let totalPriceTeddy = parseInt(card[i].quantity * card[i].price);
		arrayPrice.push(totalPriceTeddy);
		result = 0;
		for (let j = 0; j < arrayPrice.length; j++) {
			result += arrayPrice[j];
		}
	}
	let totalPriceDisplay = document.createTextNode(result + "€");
	cellTotalPrice.appendChild(totalPriceDisplay);
}
totalPrice();

function displayPlaceAnOrder() {
	let buttonPlaceOrder = document.getElementById("button_place_order");
	let formPlaceOrder = document.getElementById("div_place_order");
	buttonPlaceOrder.addEventListener("click", () => {
		if (getComputedStyle(formPlaceOrder).display != "none") {
			formPlaceOrder.style.display = "none";
		} else {
			formPlaceOrder.style.display = "block";
		}
	});
}
displayPlaceAnOrder();

// let contact = {};
// document.getElementById("button_submit").addEventListener("click", () => {
// 	contact = {
// 		firstName: document.getElementById("first_name"),
// 		lastName: document.getElementById("last_name"),
// 		adress: document.getElementById("adress"),
// 		email: document.getElementById("email"),
// 		city: document.getElementById("city_form")
// 	};
// });
let dataTeddy = {
	contact: {
		firstName: "Bastien",
		lastName: "Lepetit",
		adress: "rue Georges",
		email: "aaa@aaa.fr",
		city: "New-York"
	},
	products: ["5be9c8541c9d440000665243"]
};
console.log(dataTeddy);
//   http://localhost:3000/api/teddies/order
const insertOrder = async function (data) {
	let response = await fetch("http://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	// let responseData = await response.json();
};
insertOrder(dataTeddy);
// document.getElementById("button_submit").addEventListener("click", () => {
// 	let contact = {
// 		firstName: document.getElementById("first_name"),
// 		lastName: document.getElementById("last_name"),
// 		adress: document.getElementById("adress"),
// 		email: document.getElementById("email"),
// 		city: document.getElementById("city_form")
// 	};
// 	console.log(contact);
// 	// const promiseOrder = await fetch("http://localhost:3000/api/teddies/order", {
// 	// 	method: "POST",
// 	// 	headers: { "Content-Type": "application/json" },
// 	// 	body: JSON.stringify(contact)
// 	// });
// 	// promiseOrder
// 	// 	.then((response) => response.json())
// 	// 	.then((response) => {
// 	// 		try {
// 	// 		} catch (error) {
// 	// 			console.log(error);
// 	// 		}
// 	// 	});
// 	// // const order = await result.json();
// });
