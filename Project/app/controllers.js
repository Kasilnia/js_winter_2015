/*
 * Controller
 */

 var HomeController = function () {
	this.view = new HomeView();
    return this;
};

HomeController.prototype.loadView = function () {
    this.view.render();
};


var MenuController = function () {
    return this;
};

MenuController.prototype.loadView = function ( menu ) {
    var view = new MenuView(menu);
    view.render();
};


var BasketController = function (basket) {
	this.basket = basket;
	this.view = new BasketView(this.basket);
    return this;
};

BasketController.prototype.loadView = function () {
    this.view.render();
};

BasketController.prototype.addToBasket = function ( id ) {
    name = "quantity-"+id;
    count = $('input[name=' + name + ']').val();
    pizza = menu.find_pizza(id);
    this.basket.add_entry(pizza, count);
    price = this.basket.update_summary();
    this.view.update_total_price(price);
};

BasketController.prototype.updateBasket = function () {
	basket = this.basket;
	$("#basket input").each( function(index) {
		id = this.name.replace("basket-quantity-", "");
		count = this.value;
		entry = basket.entries[id];
		entry.count = count;
	});

    price = this.basket.update_summary();
    this.view.update_total_price(price);
};

var OrderController = function (basket) {
	this.model = basket;
	this.view = new OrderView(this.model);
    return this;
};

OrderController.prototype.loadView = function () {
    this.view.render();
};

OrderController.prototype.submitOrder = function () {
    var URL = '/order';
    order = basket.get_entries_list();
    phone = $("input[name='phone']").value;
    address = $("input[name='street']").value;
    remarks = $("textarea #remarks").value;

    $.post( "/order", {
        "order": order,
        "orderInfo":{ "phone": phone, "address": address, "remarks": remarks }
    });
};

var InfoController = function () {
	this.view = new InfoView();
    return this;
};

InfoController.prototype.set_data = function () {
	info_view = this.view;
	var URL = 'http://localhost:8080/contact';
    $.ajax({
        url: URL,
        error: function () {
            console.log('CONTACT ERROR');
        },
        success: function (data) {
            info_view.set_data(data);
        }
    });
    
};

InfoController.prototype.loadView = function () {
    this.view.render();
};



