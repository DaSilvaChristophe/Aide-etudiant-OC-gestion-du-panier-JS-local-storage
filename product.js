// BASE DE TRAVAIL DONNER

const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;

let productData = [];



const fetchProduct =async () => {
    await fetch(objectURL)
    .then ((res) => res.json())
    .then ((promise) => {productData = promise
    console.log(productData); })   
};


const productDisplay = async () =>{
    await fetchProduct();
    document.getElementById("item__img").innerHTML = `
    <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    `;
    document.getElementById("title").innerHTML = `
    ${productData.name}
    `;
    document.getElementById("price").innerHTML = `
    ${productData.price}
    `;
    document.getElementById("description").innerHTML = `
    ${productData.description}
    `;
    
    
    let select = document.getElementById("colors");
    console.log(select);
    console.log(productData.colors);

    for (i = 0; i < productData.colors.length; i++) {
        select.innerHTML += `<option value="${productData.colors[i]}">${productData.colors[i]}</option>`;
      };
    console.log(productData.colors.length);
    add2Cart();
};

productDisplay();

const add2Cart = () => {
  
  let button = document.getElementById("addToCart");
  console.log(button);
  button.addEventListener("click", () => {
    let productAdded = JSON.parse(localStorage.getItem("Promise"));
    let select = document.getElementById("colors");
    console.log(select.value);
    console.log(productAdded);

    const productQuantity = Object.assign({}, productData,{
      colors: `${select.value}`,
      quantity: 1,
    });
    console.log(productQuantity);

    if (productAdded == null) {
      productAdded = [];
      productAdded.push(productQuantity);
      console.log(productAdded);
      localStorage.setItem("promise", JSON.stringify(productAdded));  
    } 
      for (i = 0; i < productAdded.length; i++) {
        console.log("test000");
        if(productAdded[i]._id == productData._id && productAdded[i].colors == select.value) {
           return( 
            productAdded[i].quantity++,
            console.log("quantity++"),
            localStorage.setItem("promise",JSON.stringify(productAdded)),
            (productAdded = JSON.parse(localStorage.getItem("promise")))
           );
        }
      }
      for (i = 0; i < productAdded.length; i++) {
        if(productAdded[i]._id == productData._id && productAdded[i].colors != select.value) {
          return (console.log("test001"),
          productAdded.push(productQuantity),
          localSorage.setItem(`promise`,JSON.stringify(productAdded)),
          productAdded= JSON.parse(localStorage.getItem("promise")))   
        }
      }
    }
   
  );
  return (productAdded = JSON.parse(localStorage.getItem("promise")));

}
