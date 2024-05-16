	function chgsort(){   // p_form, p_sort,p_callback
		//Carl , Change the parameter transfer method .
      a=chgsort.arguments;
		var p_form = a[0];
		var p_sort = a[1];
		callback = listall_cb;
		if(typeof(a[2])!='undefined') callback = a[2];

		var frm = eval("document."+p_form);
		var sortType = 0;
		var passValue = 0;
		
		if(p_sort == frm.Sort.value){
			sortType = 1;
			passValue = (-1)*frm.Direct.value;
			frm.Direct.value = (-1)*frm.Direct.value;
		}
		else{
			sortType = 2;
			passValue = p_sort;
			frm.Sort.value = p_sort;
		}
		
		frm.Gopage.value = 1;
		frm.Begin.value = 0;

		x_chgsort(keyValue(p_form),sortType,passValue,callback);

	}

	function xview(p_page){

		var formName = "Form1";
		var frm = eval("document."+formName);
//		var pg = p_page ;
		

		x_xview(keyValue(formName),listall_cb);
	}

	function getSortValue(method,k,passValue){

		var frm = eval("document."+"Form1");
//		var param = frm.PARAM.value; 

		var len = k.length;
		var sortVal = new Array();
		for(var i=0;i<len;i++){
			
			element = eval("frm."+k[i]);
			sortVal[i] = element.value;
			if(method == "chgsort"){
				if(k[i] == "Gopage")sortVal[i] = 1;
				if(k[i] == "Begin")sortVal[i] = 0;

			}else if(method == "xview"){
				if(k[i] == "Gopage")sortVal[i] = passValue;
			}

		}

		return sortVal;

	} 

	function showDialog(urlVal,secondVal){

		return window.showModalDialog(urlVal,secondVal,"dialogHeight:600px;dialogWidth:600px;edge:Raised;center:yes;Help:No;resizable:No;status:Yes;");

	}
