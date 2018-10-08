var geocoder;
var map;
var timeout = 600;

var locations=[];
var accountid=localStorage.id;

$(function(){ 
    initialize();
});

$.ajax({
	type: "GET",
    url: "http://localhost:8080/HelloWorldWebApp/api/javalogin/getcontacts/"+accountid,
	success:
	function (response, status) {
	data= response;
	$.each(data,function(i,field){
	var location =data[i].address.streetAddress + ' ' + data[i].address.city + ' ' + data[i].address.state+ ' ' + data[i].address.country;
	locations.push(location);
	})
	map = new google.maps.Map(document.getElementById('map'), {
	zoom: 8,
	center: {lat:33.6844, lng:73.0479}
	}); 
	for (var x = 0; x <locations.length; x++) {
		codeAddress(locations[x]);
	} 
	},
	error:
	function (response, status) { // Required Callback Function
	console.log(status);
	}
	});

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(30.3753, 69.3451);
    var mapOptions = {
      zoom: 5,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
document.getElementById("emailid").text =localStorage.email;
function codeAddress(address){ 
var geocoder = new google.maps.Geocoder();
geocoder.geocode({ 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
       var marker= new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title:address
        }); 
    }
});
}

function logout()
{
	localStorage.removeItem("id");
	localStorage.removeItem("email");
	}

