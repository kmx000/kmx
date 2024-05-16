
var numOfClickChangeTd = 0;
var haveEditCalled = 0; // otherwise the haveEdit function will be called twice;

function  toEdit(element,pField,p_wc){

	numOfClickChangeTd ++;
	var changeId = "idOfClickChangeTd"+numOfClickChangeTd;
	var children = element.childNodes;
	var child = children[0]

	if(child)
	if(child.type != "text"){

	var value = element.innerHTML;

	// <a href='#'>abc</a> will get value 'abc';
	if(value.match(/^<A href=.+A>$/)){
		value = value.substring(0,value.length-4); // remove </a>
		var tmp = value.match(/^<A href=.+>/)
		var tmp2 = value.split(tmp);
		value = tmp2[1];
	}

	var input = document.createElement("input");
	var newValue = "";

	element.innerHTML = "";
	input.value = value;
	input.size = value.length;
//alert(value.length);
	input.style.width = "95%";
//	input.focus = true;
	element.appendChild(input); 
	element.id = changeId;

	newValue = element.innerHTML ;
	element.innerHTML = newValue.substr(0,newValue.length-1) + " onmouseover=\"javascript:this.focus()\"  onmouseout=\"haveEdit('"+changeId+"','"+pField+"','"+p_wc+"',this)\">"
	haveEditCalled  = 0;
	
	}
}


function haveEdit(id,pField,p_wc,element){

	if(haveEditCalled == 1)return false;
	var e = document.getElementById(id);
	var value = element.value;


	if(chkField(pField,value)) {
		if(e)e.innerHTML = value;
	//	alert("Op=fldedit&"+pField+"="+value+"&"+p_wc);
		sajaxSubmit("Op=fldedit&"+pField+"="+value+"&"+p_wc,'',fldedit_cb);
	}
	else {
		element.focus();
	}
	haveEditCalled  = 1;
//	alert(element.value);
//	alert(pField);
//	father.removeChild(document.getElementById("tmpInputId"));
//	father.innerHTML = element.value;
//	alert(element.value);
	/*
	var inputs = element.childNodes;
	var input = inputs[0]
	if(input.type == "text"){
		element.innerHTML = input.value;
	}
	*/
	//alert(inputs[0].type);

} 

function toEditArea(element){
	element.className = "edit";
}

function haveEditArea(element){
	element.className = "dis";

}


