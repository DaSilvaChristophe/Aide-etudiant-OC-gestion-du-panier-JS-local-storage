// TRAVAIL EFFECTUER (REMISE EN ETAT FONCTIONNEL - RECTIFICATION DES PROBLEMES CITER)

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

    let select = document.getElementById("colors");
    let quantity = document.getElementById('quantity').value;
    console.log(select.value);
    console.log(quantity)

    const saveBasket = (basket) => {
      localStorage.setItem('basket',JSON.stringify(basket));
    }
    
    const getBasket = () => {
      let basket = JSON.parse(localStorage.getItem('basket'));
      if(basket === null){
        return basket = [];
      } else {
        return basket;
      }
    }
  
    const addBasket = () => {
      
      const productQuantity = Object.assign({}, productData,{
        colors: `${select.value}`,
        quantity: `${quantity}`,
      });
      console.log(productQuantity);
      
      let basket = getBasket();
      
      let searchProduct = basket.find(p => p._id === productQuantity._id && p.colors === productQuantity.colors);
      if(searchProduct != undefined){
        for(let i = 0; i < productQuantity.quantity; i++){
        searchProduct.quantity++ ;}
      } else {
        productQuantity.quantity = productQuantity.quantity;
        basket.push(productQuantity);
      }
      saveBasket(basket);
    }

    addBasket();

  })
};
