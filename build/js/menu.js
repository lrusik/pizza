var pizzas = [
    {
        name: "New York‑style pizza",
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
    var exitMark = 0;
    var code = document.createElement('div');
    for (var i = 0; i < pizzas.length / 4; i++) {
        var newCont = document.createElement('div');
        newCont.classList.add('menu__cont');
        newCont.classList.add('cont');
        for (var j = 0; j < 4; j++) {
            var newColumn = document.createElement('div');
            newColumn.classList.add('menu__column');
            newColumn.classList.add('column');
            newColumn.classList.add('item');
            for (var z = 0; z < 2; z++) {
                if (pizzas[i * 4 + j + z] === undefined) {
                    exitMark = 1;
                    break;
                }
                var newItem = document.createElement('div');
                newItem.classList.add('menu__item');
                newItem.classList.add('item');
                newItem.setAttribute('data-id', i * 4 + j + z);
                newItem.innerHTML = "\n\t\t\t\t\t<img class=\"menu__icon\" src=\"" + pizzas[i * 4 + j + z].picture + "\" alt=\"\">\n\t\t\t\t\t<div class=\"menu__title dish\">" + pizzas[i * 4 + j + z].name + "</div>\n\t\t\t\t\t<div class=\"menu__price header subheader price\">$" + pizzas[i * 4 + j + z].price + "</div>\n\t\t\t\t\t<div class=\"menu__buttons cont\">\n\t\t\t\t\t\t<div class=\"menu__button button item\" onclick=\"addToCard(event)\" data-min-dur=\"100\" data-max-dur=\"700\" value=\"" + (i * 4 + j + z) + "\">Add to card <span><span></span></span></div>\n\t\t\t\t\t\t<div class=\"menu__button button item\" onclick=\"quickView(event)\" value=\"" + (i * 4 + j + z) + "\">Quick view</div>\n\t\t\t\t\t</div>\n\t\t\t\t";
                newColumn.appendChild(newItem);
            }
            j++;
            newCont.appendChild(newColumn);
            if (exitMark)
                break;
        }
        code.appendChild(newCont);
        if (exitMark)
            break;
    }
    document.querySelector('#appendPlace').appendChild(code);
}
createMenu();

//# sourceMappingURL=../maps/menu.js.map
