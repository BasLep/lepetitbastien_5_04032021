async function getTeddies() {
	const res = await fetch("http://localhost:3000/api/teddies");
	const teddies = await res.json();
	const BoxTeddyBears = document.getElementById("box_teddy_bears");
	teddies.forEach((teddy) => {
		// creation of element in document
		const nameTeddy = document.createElement("h2");
		const imgTeddy = document.createElement("img");
		const aTeddyProduct = document.createElement("a");
		const textLink = document.createTextNode("Plus d'information");
		// creation of the URL with ID
		let urlProductId = "product.html?id=" + teddy._id;
		// affectation of Teddy Bears information
		nameTeddy.textContent = teddy.name;
		imgTeddy.src = teddy.imageUrl;
		aTeddyProduct.href = urlProductId;
		// affectation in the DOM
		BoxTeddyBears.appendChild(nameTeddy);
		BoxTeddyBears.appendChild(imgTeddy);
		aTeddyProduct.appendChild(textLink);
		BoxTeddyBears.appendChild(aTeddyProduct);
	});
}
getTeddies();
