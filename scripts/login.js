function validateLogin(){
	$.ajax({
	    type: "POST",
	    contentType: "application/json;",
	    url: "http://localhost:8080/HelloWorldWebApp/api/javalogin/login",
	    data: "{\"email\":\""+document.loginform.uname.value+"\",\"password\":\""+document.loginform.psw.value+"\"}",
	    success: function (response, status) {
	    	data= response;
	    	if(data.id>0)
	    	{	localStorage.id=data.id;
	    		localStorage.email=data.email;
	    		window.open("allcontacts.html#");
	    		close();
	    	}
	    }});
}