function confirmdelete(){
    return confirm("確定刪除此筆資料?")
}
function clearall(){
    for(i=0;i<Form1.length;i++){
       type=document.Form1.elements[i].type
       if(type!="submit" && type!="reset" && type!="button" &&type!="hidden" &&type!="radio" &&type!="checkbox"){
          document.Form1.elements[i].value = ""
       }
       if ((type=="radio" || type=="checkbox") && document.Form1.elements[i].checked) {
          document.Form1.elements[i].checked = false;
       }
    }
}

function clearall_1(){
    for(i=0;i<Form1.length;i++){
       type=document.Form1.elements[i].type
       if(type!="submit" && type!="reset" && type!="button" &&type!="hidden" &&type!="radio" &&type!="checkbox"){
          document.Form1.elements[i].value = ""
       }
       if ((type=="radio" || type=="checkbox") && document.Form1.elements[i].checked) {
          document.Form1.elements[i].checked = false;
       }
    }

    document.Form1.submit();
}
function closeDiv(p_id) {
	document.getElementById(p_id).className="hideThis";
}
function onFocus(p_obj,p_val){
	if(p_obj.value==p_val)
		p_obj.select();
}
