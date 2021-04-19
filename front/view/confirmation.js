let succesOrder = document.getElementById("succes_order");
let order = JSON.parse(localStorage.getItem("order"));
console.log(order);
let orderid = order[0].orderId;
let email = order[0].contact.email;
console.log(email);
let confirmationOrder = `Votre commande ${orderid} a bien été prise en compte. Vous recevrez un mail de confirmation dans quelques minutes à l'adresse ${email}`;
succesOrder.innerHTML = confirmationOrder;
