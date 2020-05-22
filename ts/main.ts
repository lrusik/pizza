//=include ../node_modules/slick-carousel/slick/slick.js
//=include ../node_modules/smoothscroll/smoothscroll.js

//=include lib/lib.ts
//=include menu.ts

function clickOnIt(query) {
	const buttons = document.querySelectorAll(query);
	for(let i=0; i < buttons.length; i++)
		buttons[i].click();
}

function buttonLoadingAndCheck(event) {
	const min = parseInt(event.currentTarget.getAttribute('data-min-dur'), 10);
	const max = parseInt(event.currentTarget.getAttribute('data-max-dur'), 10);
	event.currentTarget.classList.add("buttonLoading_animate");
	setTimeout( () => {
		event.target.classList.remove("buttonLoading_animate");
		const check = event.target.querySelector("span span")
		check.classList.add("checkmark");
		check.classList.add("opacity");

		setTimeout( () => {
			check.classList.remove("checkmark");
			check.classList.remove("opacity");
		}, 2000);	

	}, Math.floor(Math.random() * max) + min);
}

function buttonLoading(event) {
	const min = parseInt(event.currentTarget.getAttribute('data-min-dur'), 10);
	const max = parseInt(event.currentTarget.getAttribute('data-max-dur'), 10);
	event.currentTarget.classList.add("buttonLoading_animate");
	setTimeout( () => {
		event.target.classList.remove("buttonLoading_animate");
	}, Math.floor(Math.random() * max) + min);

}

function listenersToButtonAnim() {
	const buttons = document.querySelectorAll('.buttonLoading');

	for(let i=0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', (event) => {
			buttonLoading(event);
		});
	}
}

function hideQuickView() {
	document.querySelector('.product-quickview').classList.add("product-quickview_hide");
	document.body.classList.remove('overlay');
	document.body.classList.remove('overlay__animate');
}

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function newCardItem(id, name, price, picture, quantity, subtotal) {
	const item = document.createElement('tr');
	item.setAttribute('data-id', id);

	item.innerHTML = `

		<td class="card__preprekreuz">
			<div class="card__prekreuz">
				<div class="card__kreuz" onclick="removeTab(event)"><div></div></div>
			</div>
		</td>
		<td>
			<div class="card__product">
				<div class="card__image nonemd">
					<img src="` + picture + `" alt="" class="card__picture"> 
				</div>
				<div class="card__name">` + name + `</div>

			</div>
		</td>
		<td class="card__preprice">
			<div class="card__price">$<span class="card__amount">` + price + `</span></div>
		</td>
		<td>
			<div class="card__counter counter">
				<div class="counter__inner">
					<div class="counter__number"> <span>` + quantity + `</span> </div>
					<div class="counter__buttons">
						<div class="counter__up" onclick="counterUp(event)">
							<div></div>
						</div>
						<div class="counter__down" onclick="counterDown(event)">
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</td>
		<td class="card__subtotal">$<span>` + subtotal + `</span></td>
	`;

	return item;
}

function addToCardQ(event) {
	const min = parseInt(event.currentTarget.getAttribute('data-min-dur'), 10);
	const max = parseInt(event.currentTarget.getAttribute('data-max-dur'), 10);
	
	const id = parseInt(event.currentTarget.getAttribute('value'), 10);
	const quantity = parseInt(event.currentTarget.parentElement.querySelector(".counter__number").innerText, 10);
	const item = newCardItem(id, pizzas[id].name, pizzas[id].price, pizzas[id].picture, quantity, pizzas[id].price);
	const trs = document.querySelectorAll(".card__list tr");
	event.currentTarget.classList.add("buttonLoading_animate");
	setTimeout( () => {
		event.target.classList.remove("buttonLoading_animate");
		$('.card__counter .counter__number span').unbind('DOMSubtreeModified');
		insertAfter(trs[trs.length - 1], item);
	  	$('.card__counter .counter__number span').bind('DOMSubtreeModified', function(event){
	  		calculateSubtotal(event);
		});
		calculateTotal();
		hideQuickView();
	}, Math.floor(Math.random() * max) + min);
	
}

function addToCard(event) {
	buttonLoadingAndCheck(event);
	const id = parseInt(event.currentTarget.getAttribute('value'), 10);
	const item = newCardItem(id, pizzas[id].name, pizzas[id].price, pizzas[id].picture, 1, pizzas[id].price);
	const trs = document.querySelectorAll(".card__list tr");
	$('.card__counter .counter__number span').unbind('DOMSubtreeModified');
	insertAfter(trs[trs.length - 1], item);
  	$('.card__counter .counter__number span').bind('DOMSubtreeModified', function(event){
  		calculateSubtotal(event);
	});
	calculateTotal();
}

function quickView(event) {
	const id = parseInt(event.currentTarget.getAttribute('value'), 10);
	document.querySelector('.product-quickview').classList.remove("product-quickview_hide");
	document.querySelector('.product-quickview__image img').setAttribute('src', pizzas[id].picture);
	document.querySelector('.product-quickview__button').setAttribute('value', id);

	document.querySelector('.product-quickview__title').innerText = pizzas[id].name;
	document.querySelector('.product-quickview__text').innerText = pizzas[id].text;
	document.querySelector('.product-quickview__price span').innerText = pizzas[id].price;

	document.querySelector('.product-quickview__cal .product-quickview__optgramms span').innerText = pizzas[id].cal;
	document.querySelector('.product-quickview__carbon .product-quickview__optgramms span').innerText = pizzas[id].carbon;
	document.querySelector('.product-quickview__squ .product-quickview__optgramms span').innerText = pizzas[id].squ;
	document.querySelector('.product-quickview__fat .product-quickview__optgramms span').innerText = pizzas[id].fat;


	document.body.classList.add('overlay');
	document.body.classList.add('overlay__animate');
}

function removeTab(event) {
	$(event.currentTarget.parentElement.parentElement.parentElement).remove();
	calculateTotal();
}	

function ifFormOkay() {
	if(!document.querySelectorAll('.card__list td').length)
		return "Your card is empty!";
	if(document.querySelector('.total__input-phone').value === "")
		return "Phone number is required!";
	if(document.querySelector('.total__input-address').value === "")
		return "Address is required!";
	return 0;
}

function removeItemsFromCard() {
	const trs = document.querySelectorAll(".card__list table tr");
	for(let i=1; i < trs.length; i++){
		trs[i].remove();
	}
}

function showPending(event) {
	const ans = ifFormOkay();
	if(!ans){
		const min = parseInt(event.currentTarget.getAttribute('data-min-dur'), 10);
		const max = parseInt(event.currentTarget.getAttribute('data-max-dur'), 10);
		event.currentTarget.classList.add("buttonLoading_animate");
		setTimeout( () => {
			event.target.classList.remove("buttonLoading_animate");
			$(".pending").css("z-index", "3");
			$(".pending").css("opacity", "1");
			$(".total").css("opacity", "0");
			removeItemsFromCard();
			document.querySelector(".card .container").style.display = "none";
			localStorage.setItem('pen', '1');
		}, Math.floor(Math.random() * max) + min);
		return 0;
	}

	const error = document.querySelector(".order__error");
	error.innerText = ans;
	error.style.opacity = 1;
}

function setCarousels() {
	$('.review__inner').slick({
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	
	$('.main__slise').slick({
		dots: false,
	   infinite: true,
	   slidesToShow: 1,
	   slidesToScroll: 1,
	   draggable: false,
		swipe: false,
		swipeToSlide: false,
		touchMove: false,
		draggable: false,
	});
	

	$('.main__fade').slick({
		dots: false,
	   infinite: true,
	   slidesToShow: 1,
	   slidesToScroll: 1,
	   draggable: false,
		swipe: false,
		swipeToSlide: false,
		touchMove: false,
		draggable: false,

		fade: true,
		speed: 700,
		cssEase: 'ease-out'
	});

}
 
function cs() {
	console.log("changed");
}

function counterUp(event) {
	const num = event.currentTarget.parentElement.parentElement.querySelector(".counter__number span");
	num.innerText = parseInt(num.innerText, 10) + 1;
}

function counterDown(event) {
	const num = event.currentTarget.parentElement.parentElement.querySelector(".counter__number span");
	if(parseInt(num.innerText, 10) > 1)
		num.innerText = parseInt(num.innerText, 10) - 1;
}

function addEventListenersToCounters() {
	const counters = document.querySelectorAll('.counter');
	for(let i=0; i < counters.length; i++) {
		counters[i].querySelector('.counter__up').addEventListener('click', (event) => {
			const num = event.currentTarget.parentElement.parentElement.querySelector(".counter__number span");
			num.innerText = parseInt(num.innerText, 10) + 1;
		});
		counters[i].querySelector('.counter__down').addEventListener('click', (event) => {
			const num = event.currentTarget.parentElement.parentElement.querySelector(".counter__number span");
			if(parseInt(num.innerText, 10))
				num.innerText = parseInt(num.innerText, 10) - 1;
		});
	}
}

function removeEventListenersFromCounters() {
	const counters = document.querySelectorAll('.counter');
	for(let i=0; i < counters.length; i++) {
		counters[i].querySelector('.counter__up').removeEventListener("click")
		counters[i].querySelector('.counter__down').removeEventListener("click")
	}		
}

function calculateTotal() {
	const subtotals = document.querySelectorAll(".card__subtotal span");
	const total = document.querySelector(".total__price");
	let sum = 0;
	for(let i=0; i < subtotals.length; i++)
		sum += parseInt(subtotals[i].innerText, 10);
	total.innerText = sum;

}

function calculateSubtotal(event) {
	const item = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
	const subtotal = item.querySelector('.card__subtotal span');
	const price =  parseInt(item.querySelector('.card__amount').innerText, 10);
	subtotal.innerText = parseInt(event.target.innerText, 10) * price;	
	calculateTotal();
}

function smoothScrollId(id) {
	smoothScroll(id, 500, () => {
   	
   });
}


function setLinkHandlers() {
	const links = document.querySelectorAll(".scroll");
	for(let i=0; i < links.length; i++){
		links[i].addEventListener('click', (event) => {
			smoothScrollId(event.target.getAttribute('data-scroll-to'));
		});
	}
}


$(document).ready(function(){
  	setCarousels();
  	setLinkHandlers();
  	addEventListenersToCounters();
  	listenersToButtonAnim();

  	$('.card__counter .counter__number span').bind('DOMSubtreeModified', function(event){
  		calculateSubtotal(event);
	});

	const num = localStorage.getItem('pen');
	if(num !== null && num !== "null"){
		document.querySelector(".card .container").style.display = "none";
		$(".pending").css("z-index", "3");
		$(".pending").css("opacity", "1");
		$(".total").css("opacity", "0");
	}
});