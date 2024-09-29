alert("Welcome to our store!");

let customerName = prompt("Please enter your name:");

let item = prompt("What item would you like to order?");

let quantity;
do {
    quantity = parseInt(prompt("How many of that item would you like to order? (1-99)"));
} while (isNaN(quantity) || quantity < 1 || quantity > 99);

let currentDate = new Date();
let arrivalDate = new Date(currentDate);
arrivalDate.setDate(currentDate.getDate() + 7);

let options = { year: 'numeric', month: 'long', day: 'numeric' };
let formattedArrivalDate = arrivalDate.toLocaleDateString("en-US", options);

let hours = currentDate.getHours();
let greeting;

if (hours < 12) {
    greeting = "Good Morning";
} else if (hours < 18) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}
document.getElementById("greeting").innerHTML = `${greeting}, ${customerName}! Thank you for your order.`;
document.getElementById("orderDetails").innerHTML = `You ordered ${quantity} of ${item}.`;
document.getElementById("arrivalDate").innerHTML = `Your order will arrive by ${formattedArrivalDate}.`;