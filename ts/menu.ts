const pizzas = [
	{	
		name: "Here 1",
		price: 10,
		picture: 'https://donpeppe.qodeinteractive.com/wp-content/uploads/2019/10/h3-product-img-1a.png',
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, ",
		cal: 0,
		carbon: 0,
		squ: 0,
		fat: 0, 	
	},
	{	
		name: "Here 2",
		price: 20,
		picture: "https://donpeppe.qodeinteractive.com/wp-content/uploads/2019/10/h3-product-img-1a.png",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, ",
		cal: 0,
		carbon: 0,
		squ: 0,
		fat: 0, 	
	},
	{	
		name: "Here 3",
		price: 30,
		picture: "https://donpeppe.qodeinteractive.com/wp-content/uploads/2019/10/h3-product-img-1a.png",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, ",
		cal: 0,
		carbon: 0,
		squ: 0,
		fat: 0, 	
	},
	{	
		name: "Here 4",
		price: 40,
		picture: "https://donpeppe.qodeinteractive.com/wp-content/uploads/2019/10/h3-product-img-1a.png",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, ",
		cal: 0,
		carbon: 0,
		squ: 0,
		fat: 0, 	
	},
	{	
		name: "Here 5",
		price: 50,
		picture: "https://donpeppe.qodeinteractive.com/wp-content/uploads/2019/10/h3-product-img-1a.png",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, ",
		cal: 0,
		carbon: 0,
		squ: 0,
		fat: 0, 	
	},
	{	
		name: "Here 5",
		price: 50,
		picture: "https://donpeppe.qodeinteractive.com/wp-content/uploads/2019/10/h3-product-img-1a.png",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, ",
		cal: 0,
		carbon: 0,
		squ: 0,
		fat: 0, 	
	},

];


function createMenu() {
	let exitMark = 0;
	let code = document.createElement('div');
	
	for(let i=0; i < pizzas.length / 4; i++){
		let newCont = document.createElement('div');
		newCont.classList.add('menu__cont');
		newCont.classList.add('cont');

		for(let j=0; j < 4; j++){
			let newColumn = document.createElement('div');
			newColumn.classList.add('menu__column');
			newColumn.classList.add('column');
			newColumn.classList.add('item');
			for(let z=0; z < 2; z++){
				if(pizzas[i*4 + j + z] === undefined){
					exitMark = 1;
					break;
				}

				let newItem = document.createElement('div');
				newItem.classList.add('menu__item');
				newItem.classList.add('item4');
				newItem.setAttribute('data-id', i*4 + j + z);
				newItem.innerHTML = `
					<img class="menu__icon" src="` + pizzas[i*4 + j + z].picture + `" alt="">
					<div class="menu__title dish">` + pizzas[i*4 + j + z].name + `</div>
					<div class="menu__price header subheader price">$` + pizzas[i*4 + j + z].price + `</div>
					<div class="menu__buttons">
						<div class="menu__button button" onclick="addToCard(event)" data-min-dur="100" data-max-dur="700" value="` + (i*4 + j + z) + `">Add to card <span><span></span></span></div>
						<div class="menu__button button" onclick="quickView(event)" value="` + (i*4 + j + z) + `">Quick view</div>
					</div>
				`;

				newColumn.appendChild(newItem);
			}
			j++;
			newCont.appendChild(newColumn);
			if(exitMark)
				break;
		}
		
		code.appendChild(newCont);
		if(exitMark)
			break;
	}
	
	document.querySelector('#appendPlace').appendChild(code);
}

createMenu();