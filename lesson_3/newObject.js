(function (global) {
	if (!global.UAM) {
		global.UAM = {};
	}

	function newObject(ClassName, arg1, arg2) {
		var new_obj = {};
		new_obj.__proto__.constructor = ClassName;
		new_obj.__proto__ = ClassName.prototype;
		new_obj = new_obj.constructor(arg1,arg2);
		return new_obj;
	}

	var Person = function (first_name, last_name) {
		this.firstName = first_name;
		this.lastName = last_name;
		this.fullName = function () { return this.firstName + ' ' + this.lastName; }
	}

	global.UAM.newObject = newObject;


}(window));

/*
	Zaimplementuj funkcję newObject, która będzie działać analogicznie do operatora new. Pierwszym parametrem funkcji niech będzie
	konstruktor, natomiast pozostałe to parametry konstruktora. Przykładowe zastosowanie:

	new MyClass(arg1, arg2) -> newObject(MyClass, arg1, arg2)
*/


