var ns,ie
ns = (document.layers)? true:false
ie = (document.all)? true:false

function Scroll(p_width,p_height,p_speed,p_direct){	//initial function 
	//initial 
	this.preTop = 0;
	this.preLeft = 0;
	this.moveLimit = 0;
	this.currentLeft = 0;
	this.currentTop = 0;
	//properities
	this.marquee_name = "";
	this.template_name = "";
	this.marquee_hidden = "";
	this.marquee_width = p_width;
	this.marquee_height = p_height;
	this.marquee_speed = p_speed;
	this.marquee_direct = p_direct;
	//method
	this.setMarObject = setMarObject;
	this.setTempObject = setTempObject;
	this.setHiddenObject = setHiddenObject;
	//this.setStopValue = setStopValue;
	//this.setStartValue = setStartValue;
	this.beginScroll = beginScroll;
	this.scrollInit = scrollInit;
	this.scrollUp = scrollUp;
	this.scrollDown = scrollDown;
	this.scrollRight = scrollRight;
	this.scrollLeft = scrollLeft;
	this.getObject = getObject;
	return this;
}
function setTempObject(p_obj){	//visible layout
	this.template_name = p_obj;
}
function setMarObject(p_obj){		//content area
	this.marquee_name = p_obj;
}
function setHiddenObject(p_obj){		//control marquee to stop
	this.marquee_hidden = p_obj;
}
function getObject(p_obj){				//initial object
	if(typeof(p_obj)=="string") {
		if(ie) return  eval("document.all."+p_obj);
		else return document.getElementById(p_obj);//Joyce firefox method
	} else {
		if(ie) return eval("p_obj");
		else return p_obj;
	}
}
function beginScroll(){
	var marq = this.getObject(this.marquee_name);
	var temp = this.getObject(this.template_name);
	// alert(this.marquee_name);
	// alert(marq);
	with(marq){
		style.height = this.marquee_height+'px';//Joyce add "px"
		if(this.marquee_direct == 'up' || this.marquee_direct == 'down'){
			style.overflowX="visible";	//scroll is visible
			style.overflowY="hidden";
		}
		else{
			style.overflowX="hidden";
			style.overflowY="visible"; 
		}
		var myStopValue = this.marquee_hidden+ "= 1";
		var myStartValue = this.marquee_hidden + "=0";
		//Joyce add "marq"
		marq.onmouseover = new Function(myStopValue);	//stop scrolling where mouse is over
		marq.onmouseout = new Function(myStartValue);	
	}
}
function scrollInit(){	//initial content of scroll
	var marq = this.getObject(this.marquee_name);
	var temp = this.getObject(this.template_name);
	//set templayer initial content  till the height of templayer is more than content
	var Nheight=this.marquee_height/4;
	var Nwidth=this.marquee_width/4;
	if(this.marquee_direct == "up" || this.marquee_direct == "down")
		marq.innerHTML += "<span style='height:"+Nheight+"px;'></span>";
	else
		marq.innerHTML += "<span style='width:"+Nwidth+"px;'></span>"; 
	temp.innerHTML = marq.innerHTML;
	if(this.marquee_direct == "up" || this.marquee_direct == "down"){
		marq.noWrap = false;
		temp.noWrap = false;
		var marq_height = 10;
		//var marq_height = temp.offsetHeight;
		while(marq_height < this.marquee_height){
			marq_height += marq_height;
			temp.innerHTML += marq.innerHTML;
		}
	}else{
		marq.noWrap = true;	//content of marquee is no wrap
		temp.noWrap = true;
		var marq_width = 10;
		//var marq_width = temp.offsetWidth;
		while(marq_width < this.marquee_width){
			marq_width += marq_width;
			temp.innerHTML += marq.innerHTML;
		}
	}
	//content of initial area is two copies of templayer content
	marq.innerHTML = temp.innerHTML + temp.innerHTML;
	temp.innerHTML = "";

	var param_up = "this.scrollUp('"+this.marquee_name+"','"+this.template_name+"',"+this.marquee_hidden+","+this.marquee_height+")";
	var param_down = "this.scrollDown('"+this.marquee_name+"','"+this.template_name+"','"+this.marquee_hidden+"',"+this.marquee_height+")";
	var param_left = "this.scrollLeft('"+this.marquee_name+"','"+this.template_name+"',"+this.marquee_hidden+","+this.marquee_width+")";
	var param_right = "this.scrollRight('"+this.marquee_name+"','"+this.template_name+"','"+this.marquee_hidden+"',"+this.marquee_width+")";
	//driver scroll by function of scrollUp() where setting is timeout
	if(this.marquee_direct == "up")
		setInterval(param_up,this.marquee_speed);
	if(this.marquee_direct == "left")
		setInterval(param_left,this.marquee_speed);
	if(this.marquee_direct == "right")
		setInterval(param_right,this.marquee_speed);
	if(this.marquee_direct == "down")
		setInterval(param_down,this.marquee_speed);
}
function scrollUp(p_marquee,p_template,p_stop,p_height){
	var stop_value = eval(p_stop);
	//stop roll if the var of stopcroll is true
	if(stop_value == 1) return;
	var marq = this.getObject(p_marquee);
	var temp = this.getObject(p_template);
	//remember the position of scroll before it starts rolling
	this.preTop = marq.scrollTop;
	//scroll move down a pix 
	marq.scrollTop += 1;
	//if scroll doesn't move ,marquee resets and move down a pix
	if(this.preTop == marq.scrollTop){
		marq.scrollTop = temp.offsetHeight- p_height + 1;
		marq.scrollTop += 1;
	}
}
function scrollRight(p_marquee,p_template,p_stop,p_width){
	var stop_value = eval(p_stop);
	if(stop_value == 1) return;
	var marq = this.getObject(p_marquee);
	var temp = this.getObject(p_template);
	this.preLeft = marq.scrollLeft;
	marq.scrollLeft -= 1;
	if(this.preLeft == marq.scrollLeft){
		if(!this.moveLimit){
			marq.scrollLeft = temp.offsetWidth*2;
			this.moveLimit = marq.scrollLeft;
		}
		marq.scrollLeft = this.moveLimit - temp.offsetWidth + p_width;
		marq.scrollLeft -= 1;
	}
}
function scrollDown(p_marquee,p_template,p_stop,p_height){
	var stop_value = eval(p_stop);
	if(stop_value == 1) return;
	var marq = this.getObject(p_marquee);
	var temp = this.getObject(p_template);
	this.preTop = marq.scrollTop;
	marq.scrollTop -= 1;
	if(this.preTop == marq.scrollTop){
		if(!this.moveLimit){
			marq.scrollTop = temp.offsetHeight*2;
			this.moveLimit = marq.scrollTop;
		}
		marq.scrollTop = this.moveLimit - temp.offsetHeight + p_height;
		marq.scrollTop -= 1;
	}
}
function scrollLeft(p_marquee,p_template,p_stop,p_width){
	var stop_value = eval(p_stop);
	if(stop_value == 1) return;
	var marq = this.getObject(p_marquee);
	var temp = this.getObject(p_template);
	marq.noWrap = true;
	this.preLeft = marq.scrollLeft;
	marq.scrollLeft = marq.scrollLeft + 1;
	if(this.preLeft == marq.scrollLeft){
		marq.scrollLeft = temp.offsetWidth - p_width + 1;
		marq.scrollLeft += 1;
	}
}
function begin_frame(p_id,p_pct, p_pix,p_height,p_speed) {
   marq_frame = new Scroll(marqueWidth,p_height,p_speed,'up');
	if(p_pct>0) 
		var marqueWidth = screen.width * p_pct * 0.82 / 100 ;
	if(p_pix>0)
		var marqueWidth = p_pix;
	marq_frame.setMarObject(p_id);
	marq_frame.setTempObject(p_id+"_temp");
	marq_frame.setHiddenObject(p_id+"_stop");
	marq_frame.beginScroll();
	marq_frame.scrollInit();
}
