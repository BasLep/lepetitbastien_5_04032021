let urlPageAndId = new URL(document.location).searchParams;
let id = urlPageAndId.get("id"); // recuperation of the teddy id
let urlTeddyId = "http://localhost:3000/api/teddies/" + id; // creation of the new URL with ID
let quantityOfTeddy;
let colorOfTeddy;
let teddyInformationAfterClick;
async function getInformationTeddy() {
	const res = await fetch(urlTeddyId);
	const teddies = await res.json();
	// recovery of id and create element in DOM
	const boxTeddyProduct = document.getElementById("box_teddy_product");
	const colorProductChoose = document.getElementById("color_product_choose");
	const nameTeddy = document.createElement("h2");
	const imgTeddy = document.createElement("img");
	const priceTeddy = document.createElement("p");
	const descriptionTeddy = document.createElement("p");
	// affectation of the data
	const optionsColor = teddies.colors;
	nameTeddy.textContent = teddies.name;
	imgTeddy.src = teddies.imageUrl;
	priceTeddy.textContent = "Prix : " + teddies.price / 100 + "€";
	descriptionTeddy.textContent = teddies.description;
	// display color of the teddy
	optionsColor.forEach((element, color) => {
		colorProductChoose[color] = new Option(element, color);
	});
	teddyInformationAfterClick = {
		id: id,
		nameTeddy: teddies.name,
		url: teddies.imageUrl,
		price: teddies.price / 100,
		color: colorOfTeddy,
		quantity: quantityOfTeddy
	};

	boxTeddyProduct.appendChild(nameTeddy);
	boxTeddyProduct.appendChild(imgTeddy);
	boxTeddyProduct.appendChild(priceTeddy);
	boxTeddyProduct.appendChild(descriptionTeddy);
}
getInformationTeddy();

// activation with the clik on "ajouter au panier"
document.getElementById("button_product_add_basket").addEventListener("click", () => {
	let card = JSON.parse(localStorage.getItem("card")) || [];
	const colorProductChoose = document.getElementById("color_product_choose");
	let textColorTeddyChoose = colorProductChoose.options[colorProductChoose.selectedIndex].text;
	if (
		window.confirm(
			// display add in basket with color and name information
			`${teddyInformationAfterClick.nameTeddy} avec la couleur : ${textColorTeddyChoose} a bien été ajouté à votre panier. Pour revenir à la page d'accueil, cliquez sur OK, sinon ANNULER pour rester sur la page de l'ourson ${teddyInformationAfterClick.nameTeddy}`
		)
	) {
		window.location.href = "index.html"; // clik on OK = return index.html
	}
	// what happens when an id already in the array "productInLocalStorage"
	let presenceTeddyBasket = false;

	for (let i = 0; i < card.length; i++) {
		if (
			// check if Teddy and color are in basket
			id === card[i].id &&
			textColorTeddyChoose === card[i].color
		) {
			// look id
			// if the teddy is already in the basket
			presenceTeddyBasket = true;
			// modification of quantity for the teddy
			card[i].quantity++;
			break;
		}
	}
	if (!presenceTeddyBasket) {
		// if there is not a teddy and an associate color in basket
		//  associate in the array the color choose by user
		teddyInformationAfterClick.color = textColorTeddyChoose;
		teddyInformationAfterClick.quantity = 1;
		card.push(teddyInformationAfterClick);
	}
	localStorage.setItem("card", JSON.stringify(card));
});
