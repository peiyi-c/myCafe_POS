const menu = document.querySelector("#menu");
const cartArea = document.querySelector("#cartArea");
const cart = document.querySelector("#cart");

const totalItemDisplay = document.querySelector("#total-item");
const totalAmountDisplay = document.querySelector("#total-amount");

const confirmButton = document.querySelector("#pay-button");


// coffee product data
const coffeeData = [
  {
    id: "product-1",
    name: "Espresso",
    price: 4.95
  },
  {
    id: "product-2",
    name: "Americano",
    price: 5
  },
  {
    id: "product-3",
    name: "Cafe latte",
    price: 10
  },
  {
    id: "product-4",
    name: "Cafe Mocha",
    price: 7
  },
  {
    id: "product-5",
    name: "Capupucino",
    price: 7.5
  }

];
// render coffee products //
function renderProducts() {
  menu.innerHTML = ''
  coffeeData.forEach(coffee => {
    menu.innerHTML +=
      `<div class="card">
        <div class="card-body row">
          <h5 class="card-title my-auto px-5 col-6">${coffee.name}</h5>
          <span class="card-text my-auto text-align-left col-3">€ ${coffee.price}</span>
          <button type="button" class="add-button btn btn-primary col-2" data-item="${coffee.id}">Add</button>
      </div>
    </div>`
  })

}

// cart items
let cartItems = []
// render cart items //
function renderCart() {
  cart.innerHTML = ''
  cartItems.forEach(cartItem => {
    const product = coffeeData[cartItem.coffeeIndex]
    const cartItemAmount = getCartItemAmount(cartItem)
    cart.innerHTML +=
      `<li class="cart-item list-group-item d-flex justify-content-between lh-lg">
        <div class="my-auto w-50 d-flex">
          <p class="my-auto">
            <span>${product['name']}</span>
            <small class="text-secondary"> € ${product['price']}</small>
            <small> x ${cartItem['quantity']}</small>
          </p>
        </div>
        <span>€ ${cartItemAmount}</span>
        <button class="remove-button btn btn-danger" type="reset" data-item="${cartItem['coffeeIndex']}">Remove</button>
        
      </li>
      `
  })
  totalAmountDisplay.textContent = getTotalAmount()
  totalItemDisplay.textContent = getTotalItem()
}

// calculate item sum in €
function getCartItemAmount(cartItem) {
  const product = coffeeData[cartItem.coffeeIndex]
  return Math.round((product.price * cartItem.quantity) * 100) / 100
}

// calculate cart total sum in €
function getTotalAmount() {
  let totalAmount = 0
  cartItems.forEach(cartItem => {
    totalAmount += getCartItemAmount(cartItem)
  })
  return totalAmount
}

// calculate cart item count
function getTotalItem() {
  let totalItem = 0
  for (i = 0; i < cartItems.length; i++) {
    totalItem += cartItems[i]['quantity']
  }
  return totalItem
}

// EventListener click add
menu.addEventListener('click', addToCart)
function addToCart(e) {
  const target = e.target
  if (target.classList.contains('add-button')) {
    const coffeeIndex = target.getAttribute('data-item').slice(8) - 1
    const existingCartItemIndex = cartItems.findIndex(cartItem => cartItem.coffeeIndex === coffeeIndex)
    if (existingCartItemIndex >= 0) {
      cartItems[existingCartItemIndex].quantity += 1
    } else {
      cartItems.push({
        coffeeIndex,
        quantity: 1
      })
    }
    cartArea.classList.remove('visually-hidden')
  }
  renderCart()
}

// EventListener click remove or clear all
cartArea.addEventListener('click', removeCartItems)
function removeCartItems(e) {
  let target = e.target
  if (target.id === 'clear-button') {
    cartItems = []
    cartArea.classList.add('visually-hidden')
  } else if (target.classList.contains('remove-button')) {
    const cartCoffeeIndex = target.getAttribute('data-item')
    const remainingCartItems = cartItems.filter(cartItem => cartItem['coffeeIndex'] != cartCoffeeIndex)
    cartItems = remainingCartItems
    if (!cartItems.length) {
      cartArea.classList.add('visually-hidden')
    }
  }
  renderCart()
}

confirmButton.addEventListener('click', function () {
  alert('Continue to pay');
})

renderProducts()
renderCart()



