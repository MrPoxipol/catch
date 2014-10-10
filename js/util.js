/** 
	@brief Just a color data struct (carrier)
	@param[i] r, g, b RGB color system components
*/
function rgb(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

/**
	@brief Constructs a color object with name (description)
	@param[i] color A Color object
	@param[i] name 	String containing color description eg. purple
*/
function TileColor(color, name){
	this.setColor = function(color) {
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
	};

	this.setName = function(name) {
		this.name = name;
	};

	this.setColor(color);
	this.setName(name);
}