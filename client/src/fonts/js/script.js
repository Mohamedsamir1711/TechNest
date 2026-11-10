console.log("Hello World");

let name1 = "John";
let name2 = "Jane";

let fullName = name1 + " " + name2;

console.log(fullName);

let par = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.";

let card = `
<div class="card" style="width: 18rem;"></div>
  <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
  <div class="card-body">
  
    <h5 class="card-title">Card title</h5>
    <p class="card-text">${par}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
`;
  
document.write(card);

let num1 = 10.6;

console.log(Math.trunc(num1));

let y = 14.7;

console.log(parseInt(y));
console.log(Math.floor(y));
console.log(Math.abs(y));
console.log(Math.trunc(y));

console.log(par.startsWith("Lorem"));
console.log(par.endsWith("dolor."));
console.log(par.includes("consectetur"));


let temp = prompt("Enter a number: ");

if (temp > 30) {
    console.log("It's hot outside.");
} else if (temp > 20) {
    console.log("It's warm outside.");
} else {
    console.log("It's cold outside.");
}

