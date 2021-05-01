// display teddy information in basket page for each teddy in the basket
function displayBasket() {
	let card = JSON.parse(localStorage.getItem("card"));
	let tableBody = document.getElementById("table_body");
	card.forEach((teddy) => {
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
		newCellAdd.classList.add("add_teddy_basket");
		let add = document.createTextNode("+");
		newCellAdd.appendChild(add);
		newCellAdd.addEventListener("click", () => {
			teddy.quantity++;
			localStorage.setItem("card", JSON.stringify(card));
			document.location.reload();
		});
		// new cell for remove one teddy in quantity
		let newCellRemove = newLine.insertCell(-1);
		newCellRemove.classList.add("add_teddy_basket");
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
		newCellDelete.classList.add("add_teddy_basket");
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
	let displayPlaceOrder = document.getElementById("div_place_order");
	displayPlaceOrder.style.display = "none";
	buttonPlaceOrder.addEventListener("click", () => {
		if (getComputedStyle(displayPlaceOrder).display != "none") {
			displayPlaceOrder.style.display = "none";
		} else {
			displayPlaceOrder.style.display = "block";
		}
	});
}
displayPlaceAnOrder();

function orderInformation() {
	document.getElementById("form_place_order").addEventListener("submit", (e) => {
		e.preventDefault();
		// get form values
		let firstName = document.getElementById("first_name").value;
		let lastName = document.getElementById("last_name").value;
		let address = document.getElementById("address").value;
		let email = document.getElementById("email").value;
		let city = document.getElementById("city_form").value;
		let contact = {
			firstName: firstName,
			lastName: lastName,
			address: address,
			email: email,
			city: city
		};
		let card = JSON.parse(localStorage.getItem("card"));
		let products = [];
		card.forEach((teddy) => {
			while (teddy.quantity != 0) {
				products.push(teddy.id);
				teddy.quantity--;
			}
		});
		let fullInformation = { contact, products };
		let order = JSON.parse(localStorage.getItem("order")) || [];
		const insertOrder = async function (data) {
			try {
				let response = await fetch("http://localhost:3000/api/teddies/order", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data)
				});
				if (response.ok) {
					let data = await response.json();
					console.log(data);
					order.push(data);
					localStorage.setItem("order", JSON.stringify(order));
					console.log(order);
					window.location.href = "confirmation.html";
				} else {
					console.error("retour du serveur : ", response.status);
				}
			} catch (e) {
				console.log(e);
			}
		};
		insertOrder(fullInformation);
	});
}
orderInformation();
