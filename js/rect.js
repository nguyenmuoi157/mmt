function Rect(){
	
	this.x=0;
	this.y=0;
	 this.width=1;
	this.height1;
	this.isSelected=false;
}

Rect.prototype.isContain= function(){
	
	var right=this.x+this.width;
	var bottom=this.y+this.height;
	
	return x>this.x&& x< right&& y>this.y&&y<bottom;
}

