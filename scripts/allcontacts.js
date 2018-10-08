$(".div2").hide();
$.ajax({
    type: "GET",
    url: "http://localhost:8080/HelloWorldWebApp/api/javalogin/helloworld",
    contentType: "application/json;",
    success: function(response){
    	$("#checkingGet").text(response)
    }
   
});

var editNew=0;
var contactid=0;
var accountid=localStorage.id;
var dataRec;
$.ajax({
    type: "GET",
    url: "http://localhost:8080/HelloWorldWebApp/api/javalogin/getcontacts/"+accountid,
    success: function (response, status) {
    	dataRec= response;
    	var htmltable='';
    	for (var i = 0; i < dataRec.length; i++) {
    	    htmltable+="<tr><td><i class=\"fas fa-key\"></i></td><td><i class=\"fas fa-user\"></i></td><td>" + dataRec[i].firstName
    	    		+" "+ dataRec[i].lastName +"</td><td>" + dataRec[i].email+ "</td><td>"+ dataRec[i].address.city+
    	    		", "+dataRec[i].address.state+", "+dataRec[i].address.country+"</td>" +
    	    				"<td> <a class=\"edit_link\"  id=\""+dataRec[i].id+"\"   style=\"margin:10px\" >Edit</a> <a class=\"deletecontact\"  id=\""+dataRec[i].id+"\"  style=\"margin:10px\" >Delete</a> " +
    	    				"</td></tr>";
    	}
    	$('#contactTab tr').first().after(htmltable);
    	document.getElementById("emailid").text =localStorage.email;
    	loadEvents();
    }});


function loadEvents()
{
	 $(".deletecontact").click(function(event){
	    	deleteContact(event.target.id);
	    	event.preventDefault();
	    });
		$(".edit_link").click(function(event){
	    	event.preventDefault();
	    	$('#editform').find(':text').val("");
	    	populateForm(event.target.id);
	    	contactid=event.target.id;
	    	window.setInterval($(".div2").fadeToggle("slow"), 1000);
	    });}


$(document).ready(function(){
    $(".comment_link").click(function(event){
    	event.preventDefault();
        editNew=1;
    	$('#editform').find(':text').val("");
        $(".div2").fadeToggle("slow");
    });
    
    $('#usearch').keyup(function(){
        var searchText = $(this).val().toLowerCase();
        $.each($("#contactTab tbody tr"), function() {
            if($(this).text().toLowerCase().indexOf(searchText) === -1)
               $(this).hide();
            else
               $(this).show();                
        });
    }); 
});

function logout()
{
	localStorage.removeItem("id");
	localStorage.removeItem("email");
	}

function aucontact()
{
	if(editNew==1){
		editNew=0;
		addcontact()
		}
	else
	{
		updatecontact(contactid);
		
	}
}

function deleteContact(contact)
{
	$.ajax({
	    type: "POST",
	    contentType: "application/json;",
	    url: "http://localhost:8080/HelloWorldWebApp/api/javalogin/deletecontact",
	    data: "{\"id\":\""+contact+"\"}",
	    success: function (response, status) {
	    	data= response;
	    	window.open("allcontacts.html#");
	    	close();
	    }});
}


function updatecontact(contactid)
{
	var jsonData="{\"accountId\":\""+accountid+"\"," +
	"\"id\":\""+contactid+"\"," +
	"\"firstName\":\""+document.forms['editform']['ufname'].value+"\"," +
	"\"lastName\":\""+document.forms['editform']['ulname'].value+"\"," +
	"\"email\":\""+document.forms['editform']['uemail'].value+"\",\"gender\":\"M/F\"," +
	"\"phoneNumber\":\""+document.forms['editform']['umobile'].value+"\",\"status\":\"Alive\"," +
	"\"address\":{\"city\":\""+document.forms['editform']['ucity'].value+"\"," +
			"\"state\":\"\",\"country\":\""+document.forms['editform']['ucountry'].value+"\"," +
					"\"streetAddress\":\""+document.forms['editform']['ustreet'].value+"\"}}";
	
	$.ajax({
	    type: "POST",
	    contentType: "application/json;",
	    url: "http://localhost:8080/HelloWorldWebApp/api/javalogin/updatecontact",
	    data: jsonData,
	    success: function (response, status) {
	    	data= response;
	    	window.open("allcontacts.html#");
	    	close();
	    }});
}

function addcontact()
{
	var jsonData="{\"accountId\":\""+accountid+"\"," +
	"\"firstName\":\""+document.forms['editform']['ufname'].value+"\"," +
	"\"lastName\":\""+document.forms['editform']['ulname'].value+"\"," +
	"\"email\":\""+document.forms['editform']['uemail'].value+"\",\"gender\":\"M/F\"," +
	"\"phoneNumber\":\""+document.forms['editform']['umobile'].value+"\",\"status\":\"Alive\"," +
	"\"address\":{\"city\":\""+document.forms['editform']['ucity'].value+"\"," +
			"\"state\":\"\",\"country\":\""+document.forms['editform']['ucountry'].value+"\"," +
					"\"streetAddress\":\""+document.forms['editform']['ustreet'].value+"\"}}";
	
	$.ajax({
	    type: "POST",
	    contentType: "application/json;",
	    url: "http://localhost:8080/HelloWorldWebApp/api/javalogin/addcontact",
	    data: jsonData,
	    success: function (response, status) {
	    	data= response;
	    	window.open("allcontacts.html#");
	    	close();
	    }});
}

var saverigger;

function populateForm(contactid)
{
	saveTrigger=contactid;
	for (var i = 0; i < dataRec.length; i++) {
		if(dataRec[i].id==contactid)
		{	contactid=i; break;}
	   }
	document.forms['editform']['uemail'].value = dataRec[contactid].email;
	document.forms['editform']['ufname'].value = dataRec[contactid].firstName;
	document.forms['editform']['ulname'].value = dataRec[contactid].lastName;
	document.forms['editform']['umobile'].value = dataRec[contactid].phoneNumber;
	document.forms['editform']['ustreet'].value = dataRec[contactid].address.streetAddress;
	document.forms['editform']['ucity'].value = dataRec[contactid].address.city;
	document.forms['editform']['ucountry'].value = dataRec[contactid].address.country;
	}

function cancelForm()
{
	$(".div2").hide();
	$('#editform').find(':text').val("");
	editNew=0;
	contactid=0;
}