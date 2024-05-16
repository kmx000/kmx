   function cl_ltrim(p_str,p_char)  {
     for(var i=0;i<p_str.length;)  {
         if(p_str.substr(i,1) != p_char)  break;  
         p_str = p_str.substr(i+1);
     }
     return p_str
  }
   function cl_rtrim(p_str,p_char)  {
     for(var i=p_str.length-1;i>=0;i--)  {
         if(p_str.substr(i,1) != p_char)  break;  
         p_str = p_str.substr(0,i);
     }
     return p_str
  }
  function cl_trim(p_str,p_char)  {
     p_str = cl_ltrim(p_str,p_char);
     p_str = cl_rtrim(p_str,p_char);
     return p_str;
  }
