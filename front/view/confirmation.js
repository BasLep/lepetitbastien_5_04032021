let succesOrder = document.getElementById("succes_order");
let order = JSON.parse(localStorage.getItem("order"));
console.log(order);
let orderid = order[0].orderId;
let email = order[0].contact.email;
console.log(email);
let confirmationOrder = `Votre commande <strong>${orderid}</strong> a bien été prise en compte. <br>Vous recevrez un mail de confirmation dans quelques minutes à l'adresse <em>${email}</em>`;
succesOrder.innerHTML = confirmationOrder;
