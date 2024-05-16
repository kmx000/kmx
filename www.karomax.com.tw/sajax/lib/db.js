	var msghead = "<table width='100%' cellspacing=0 cellpadding=2 class='msgbg'><tr><td class='msg'>";
	var msgtail = "</td></tr></table>\n<table cellspacing=0 cellpadding=0><tr><td height=4><img src='../pictures/spacer.gif' width=1 height=4></td></tr></table>\n"; 
	
	var break_up_char = "+++L+++";

	function Response(RetCode,jsFunction,Content,other) {
	   this.RetCode = RetCode;   	// return code
		this.JsFunction = jsFunction; //  javascript to execute 
		this.Content = Content; 	// display content .
		this.Other = other; 	// display content .
		return this;
	}
	function getMsg(z){

		var zz = z.split(break_up_char);
		//instantiate the W3C DOM Parser
		var parser = new DOMImplementation();

		//load the XML into the parser and get the DOMDocument
		var domDoc = parser.loadXML(zz[1]);

		//get the root node (in this case, it is Response)
		var docRoot = domDoc.getDocumentElement();
		//get the first "TAG1" element

		var tag1 = docRoot.getElementsByTagName("JsFunction").item(0);
		var tag2 = docRoot.getElementsByTagName("Content").item(0);
		var tag3 = docRoot.getElementsByTagName("RetCode").item(0);
		var tag4 = docRoot.getElementsByTagName("Other").item(0);

		var jsfun = "";
		var content = "";
		var retcode = "";
		var other = "";

		if(tag1.getFirstChild()) jsfun = tag1.getFirstChild().getNodeValue(); 
		if(tag2.getFirstChild()) content = tag2.getFirstChild().getNodeValue(); 
		if(tag3.getFirstChild()) retcode = tag3.getFirstChild().getNodeValue(); 
		if(tag4.getFirstChild()) other = tag4.getFirstChild().getNodeValue(); 
		res = new Response(retcode,jsfun,content,other);
		return res;
		//return content;
	}
	function getXMLValue(k,v){

		var len = k.length;
		if(len != v.length) return "error";

		var xmlVal = "<Input>";
		for(var i=0;i<len;i++){
			xmlVal += "<F><K>"+k[i]+"</K><V>"+v[i]+"</V></F>";
		}
		xmlVal += "</Input>";
		return xmlVal;
	}

	function insertXMLValue(k,v,p_xml){

		var len = k.length;
		if(len != v.length) return "error";

		var val = p_xml.split("</Input>");
		var xmlVal = val[0]; 

		for(var i=0;i<len;i++){
			xmlVal += "<F><K>"+k[i]+"</K><V>"+v[i]+"</V></F>";
		}
		xmlVal += "</Input>";
		return xmlVal;

	}
	function validValue(p_value){
		var val = p_value.replace(/&/g,"&amp;");
		val = val.replace(/>/g,"&gt;");
		val = val.replace(/</g,"&lt;");
		val = val.replace(/"/g,"&quot;");
		val = val.replace(/'/g,"&apos;");

		return val;
	}
	function keyValue(p_form){
		
		// < ==> &lt;  > == > &gt; " ==> &quot; ' &pos; 
		var keys = new Array();
		var values = new Array();
		var frm = eval("document."+p_form);
		var elements = frm.elements;
		var len = elements.length;
		for(var i=0;i<len;i++){
			if(elements[i].type){
				switch(elements[i].type){
					case "checkbox":
							if(elements[i].checked){
								keys[i]=elements[i].name;
								values[i]=escape(elements[i].value);
							}
							else{
						//		keys[i]=elements[i].name;
						//		values[i]=escape("");
							};
							 break;
					
					case "radio":
							if(elements[i].checked){
								keys[i]=elements[i].name;
								values[i]=escape(validValue(elements[i].value));
							};
							break;
					default:
							 keys[i]=elements[i].name;
							 values[i]=escape(validValue(elements[i].value));
							break;
				}
			}
			else{
				keys[i] = elements[i].name;
				values[i] = escape(validValue(elements[i].value));

			}
		}

		return getXMLValue(keys,values);
	}

	function executeJsFunction(JsFunction) {
		if(JsFunction != ""){
			eval(JsFunction+";");
		}
	}
	// ex. Op=add&QuickAdd=1
	function sajaxSubmit(){

	   a=sajaxSubmit.arguments;
		var p_param = a[0];	// param, Op=mod&F  GET function (each value)
		var p_form = '';	// form value ();
		if(typeof(a[1])!='undefined') p_form = a[1];	// form
		callback = sajaxSubmit_cb;
		if(typeof(a[2])!='undefined') callback = eval(a[2]);
		callsajax = x_sajaxSubmit;
		if(typeof(a[3])!='undefined') callsajax = eval("x_"+a[3]);
		if(typeof(a[4])!='undefined') uri_in_sajax=a[4];//LUOYING

		if(p_form!='') 
			var vars = keyValue(p_form);
		else 
			var vars = "<Input></Input>";

		var k = new Array();
		var v = new Array();
		ret = p_param.split("&");
		var len = ret.length;
		for(var i=0;i<len;i++) {
			param = ret[i].split("=");
			k[i] = param[0];
			v[i] = param[1];
		}
		callsajax(insertXMLValue(k,v,vars),callback);
	}
	function sajaxSubmit_cb(z){
		Res= getMsg(z);
		document.getElementById("msgbox").innerHTML = msghead + Res.Content + msgtail;
		executeJsFunction(Res.JsFunction) ;
		listall();
	}
	function listall_cb(z){
		Res= getMsg(z);
		var divElement = document.getElementById("list_div");
		divElement.innerHTML = Res.Content;
		executeJsFunction(Res.JsFunction) ;
	}
	function listall(){
	   a=listall.arguments;
		callback = listall_cb;
		if(typeof(a[0])!='undefined') callback = a[0];

		x_listall(callback);
	}

