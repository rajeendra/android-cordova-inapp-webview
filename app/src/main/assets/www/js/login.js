var signin = false;
var dashboardView = "login";

// steps to run as html
// 1./ set mod as runMode = "html";
// 2./ run http-server @  ../assets/www$ http-server
// 3./ url http://127.0.0.1:8080/dashboard.html

var runMode = "html";
//var runMode = "android";

$(document).ready(function () {

    if(runMode!="html"){
        //Android.showToast("login ready");
    }


    $("#btn-login").click(function () {
        user = $('#login-username').val();
        pwd  = $('#login-password').val();
        //getUser(user, pwd);
        mLab_getUser(user, pwd);

        //var url = "file:///android_asset/www/home.html";
        //showWebview(url);

    });
    //btn-fblogin
    $("#btn-fblogin").click(function () {
        //alert("btn-fblogin click");
        Android.showToast(xmsg);
    });

    // googleMap
    //$("#mapDiv").click(function () {
        //alert("btn-fblogin click");
        //Android.showToast("googleMap");
    //});

    login_init();

});

function showAndroidToast(toast) {
    Android.showToast(toast);
}

//function addData(s){
//    xmsg = s;
//}

function signout(){
    signin = false;
    //$('.navbar-toggle').click();
    hideAll();
    Android.preLogout();
    showLogin();
}

function login_init() {
    //Android.showToast("login_init");
    android_preLogin();
    initDisplayView();
    initFooter();
}

function initDisplayView(){
   if(runMode!="html"){
        dashboardView= StringGetter.getDashboardView();
   }
   else{
        dashboardView=="home";
   }

    if(dashboardView=="login")
        showLogin();
    else
        showDashboard();
}

function initFooter(){
    var lat= 0;
    var lng= 0;

    if(runMode!="html"){
        lat= StringGetter.getLat();
        lng= StringGetter.getLng();
    }
    //Android.showToast("lat: "+lat + " lng: "+lng);

    var myCenter = new google.maps.LatLng(lat, lng);

    var mapOptions= {
        center:myCenter,
        zoom:15
    };

    //var useragent = navigator.userAgent;
    //Android.showToast("useragent: "+useragent);

    var mapCanvas = document.getElementById("googleMap");

    var map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new google.maps.Marker({
          position: myCenter,
          map: map
          //title: 'Click to zoom'
        });


        marker.addListener('click', function() {
          //map.setZoom(8);
          //map.setCenter(marker.getPosition());
          Android.showToast("map click");
        });


}

function android_preLogin(){
    var data = {};

    if(runMode!="html"){
        var json = Android.preLogin();
        var data = JSON.parse(json);
    }
    else{
        data.cuser = "user2";
        data.cpwd = "pwd2";
    }

    //var data  = null;
    //data.cuser="xxx";
    //data.cpwd="yyy";
    if(data.cuser!="") $('#login-username').val(data.cuser);
    if(data.cpwd!="") $('#login-password').val(data.cpwd);

    if(data.cuser!="") $('#login-remember').prop('checked', true);
}

function android_LoginState(){

    var json = Android.getUser();
    var data = JSON.parse(json);

    if(data.csin=="yes")
        return true;

    return false;
}
// For temp use Below function is the right one
function getUser(username, password) {
    //loginSuccess=true;

    postLogin();

    //var url = "home.html";
    //var url = "http://d3273674.ngrok.io/Buurtmus/customerApp/returnParcel?lang=en&accessToken=9w3cN7ogRGDBr1owe9liGUZ9XVG88LYeaZRNVZ8hkjyEK9RyHbZnszbcFI3VNWiraK3Z3j6VnSXdroIZSGfluoCQ031K4pqal0HG0BgxF6s69xf2rGb8KTGGCg65rJbzxowlrYkrUYHJvo6AYue436X4n8IMMHnTWFW2BODNNeOHTlb#";
    var url = "https://2017.cssconf.eu/";
    showWebview(url);
}


function xgetUser(username, password) {
    //var url = "/Pilot/rest/md/findDeliveryPersons";
    //var url = "/Pilot/rest/test/orderSeach";
    //var url = "https://jsonplaceholder.typicode.com/users";
    //var url = contactURL;
    //var url = "http://127.0.0.1:8080/Pilot/rest/md/findDeliveryPersons";
    //var url = "http://192.168.1.6:8080/Pilot/rest/md/findDeliveryPersons";
    // http://5f6a5724.ngrok.io
    var url = "http://5f6a5724.ngrok.io/xusers"
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            "user": username
        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            //showAlertMsgBox(4, "success");
            var loginSuccess = false;
            if(data!=null && data.user!=null){
                 if (password == data.pwd){
                    loginSuccess=true;

                    postLogin();

                  //var url = "home.html";
                  //var url = "http://d3273674.ngrok.io/Buurtmus/customerApp/returnParcel?lang=en&accessToken=9w3cN7ogRGDBr1owe9liGUZ9XVG88LYeaZRNVZ8hkjyEK9RyHbZnszbcFI3VNWiraK3Z3j6VnSXdroIZSGfluoCQ031K4pqal0HG0BgxF6s69xf2rGb8KTGGCg65rJbzxowlrYkrUYHJvo6AYue436X4n8IMMHnTWFW2BODNNeOHTlb#";
                    var url = "https://2017.cssconf.eu/";
                    showWebview(url);
                 }
            }

            if(!loginSuccess){
                //alert("login faild");
                showAlertMsgBox(4, "login faild");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showAlertMsgBox(4, "login faild");
        }
    });
}

// This is for testing. Function below this is the real one
// This function to skip the login server call and to get success always when user press login button
function mLab_getUser(username, password) {
    android_postLogin();
    showDashboard();
    initFooter();
}

function xmLab_getUser(username, password) {

    //alert(username);

    /*
    $.ajax( { url: "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey",
		  data: JSON.stringify( { "x" : 1 } ),
		  type: "POST",
		  contentType: "application/json" } );
    */

    // https://api.mlab.com/api/1/databases/testdatabase/collections/users?q={"user": "user1"}&apiKey=Hwx_Pbw971okmS5Vi9RPh6FPDHovtt-C
    var url = "https://api.mlab.com/api/1/databases/testdatabase/collections/users?q={\"user\": \""+username+"\"}&apiKey=Hwx_Pbw971okmS5Vi9RPh6FPDHovtt-C";
    $.ajax({
        url: url,
        type: "GET",
        //dataType: 'json',
        //data: JSON.stringify({
        //    "user": username
        //}),
        //contentType: "application/json",
        success: function (data) {
            //showAlertMsgBox(4, "success");
            var loginSuccess = false;
            if(data!=null && data.length==1){
                 if (password == data[0].pwd){
                    loginSuccess=true;

                    android_postLogin();

                    //Android.showToast("postLogin success");

                  //var url = "home.html";
                  //var url = "http://d3273674.ngrok.io/Buurtmus/customerApp/returnParcel?lang=en&accessToken=9w3cN7ogRGDBr1owe9liGUZ9XVG88LYeaZRNVZ8hkjyEK9RyHbZnszbcFI3VNWiraK3Z3j6VnSXdroIZSGfluoCQ031K4pqal0HG0BgxF6s69xf2rGb8KTGGCg65rJbzxowlrYkrUYHJvo6AYue436X4n8IMMHnTWFW2BODNNeOHTlb#";
                  //var url = "https://2017.cssconf.eu/";
                    //var url = "file:///android_asset/www/dashboard.html";
                    //showWebview(url);
                    showDashboard();
                    initFooter();
                 }
            }

            if(!loginSuccess){
                //alert("login faild");
                showAlertMsgBox(4, "login faild 2");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showAlertMsgBox(4, "login faild 1");
        }
    });
}

function hideAll(){
    $('#toolbar').hide();
    $('#myNavbar').hide();
    $('#pageContent').hide();
    $('#loginbox').hide();
    $('#signupbox').hide();
    $('#mainFooter').hide();
}

function showDashboard(){
    hideAll();
    $('#toolbar').show();
    $('#myNavbar').show();
    $('#pageContent').show();
    $('#pageOne').show();
    $('#loginbox').hide();
    $('#signupbox').hide();
    $('#mainFooter').show();
}

function showLogin(){
    hideAll();
    $('#toolbar').hide();
    $('#myNavbar').hide();
    $('#pageContent').hide();
    $('#loginbox').show();
    $('#signupbox').hide();
    $('#mainFooter').hide();
}

function android_postLogin() {
    signin = true;
    user = $('#login-username').val();
    pwd  = $('#login-password').val();
    rm = $('#login-remember').is(':checked');

    //var data = [{user:user, pwd:pwd, rm:rm},{"zz":"vzz","xx":"vxx"}];

    //JSON.stringify({});
    var data = [{user:user, pwd:pwd, rm:rm}];

    if(runMode!="html"){
        var json = Android.postLogin(JSON.stringify({data}));
        var data = JSON.parse(json);
    }
}

function xpostLogin() {
    user = $('#login-username').val();
    pwd  = $('#login-password').val();
    rm = $('#login-remember').is(':checked');

    var data = {user:user, pwd:pwd, rm:rm};
    HybridBridge.postLogin(data,
        function(){
            //alert(JSON.parse(data).status)
        },
        function(e){
            var data = JSON.parse(e);
            //alert(data.cuser);
        }
    );
}

function showWebview(url) {
    var className = "org.sample.hybridandroidapp.AndroidWebviewActivity";
    var data = {className:className,url:url};
    HybridBridge.showWebview(data,
        function(){
            //alert(JSON.parse(data).status)
        },
        function(e){
            var data = JSON.parse(e);
            //alert(data.cuser);
        }
    );
}

function xshowWebview(url) {
    var className = "org.sample.hybridandroidapp.AndroidWebviewActivity";
    var data = {className:className,url:url};
    HybridBridge.showWebview(data,
        function(){
            //alert(JSON.parse(data).status)
        },
        function(e){
            var data = JSON.parse(e);
            //alert(data.cuser);
        }
    );
}

function search() {
    //var url = "/Pilot/rest/md/findDeliveryPersons";
    //var url = "/Pilot/rest/test/orderSeach";
    //var url = "https://jsonplaceholder.typicode.com/users";
    var url = contactURL;
    //var url = "http://127.0.0.1:8080/Pilot/rest/md/findDeliveryPersons";
    //var url = "http://192.168.1.6:8080/Pilot/rest/md/findDeliveryPersons";
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        data: JSON.stringify({

            "id":0

            //"id": $('#txtId').val(),
            //"neighbourhoodDID": $("#cmbNeighbourhood").val(),
            //"firstName": $('#txtFirstName').val(),
            //"username": $('#txtUsername').val(),
            //"lastName": $('#txtLastName').val(),
            //"active": $('#cmbActive').val(),
            //"postalCode": $('#txtPostcode').val(),
            //"houseNumber": $('#txtHouseNo').val()

        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            dataPopulation(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("An error occurred.");
            //error();
        }
    });
}

function dataPopulation(data) {
    if (data.length > 0) {
        var htmlStrI = '';
        $.each(data, function (key, value) {
            htmlStrI = htmlStrI + printToDoItem(value);
        });
        $.each(data, function (key, value) {
            htmlStrI = htmlStrI + printToDoItem(value);
        });
        $('#toDoItems').empty();
        $('#toDoItems').prepend(htmlStrI);
    }
}

function printToDoItem(val){

    var html=

        '<p style="margin-bottom: unset;"><a href="#" class="list-group-item">'+ val.name +'</a></p>'

    return html;
}

function showAlertMsgBox(msgType, msg){
    // 1-success, 2-info, 3-warning, 4-Error
    $("#alertMsgBox").empty();

    html = "";

    if(msgType==1){
        html =
            '<div class="alert alert-success">'+
            ' <strong>Success! </strong><span>'+msg+'</span>'+
            '</div>';
    }
    if(msgType==2){
        html =
            '<div class="alert alert-info">'+
            ' <strong>Info! </strong><span>'+msg+'</span>'+
            '</div>';
    }
    if(msgType==3){
        html =
            '<div class="alert alert-warning">'+
            ' <strong>Warning! </strong><span>'+msg+'</span>'+
            '</div>';
    }
    if(msgType==4){
        html =
            '<div class="alert alert-danger">'+
            ' <strong>Error! </strong><span>'+msg+'</span>'+
            '</div>';
    }
    $("#alertMsgBox").prepend(html);

    setTimeout(function() {
        $('#alertMsgBox').fadeOut('fast');
    }, 3000);

    $("#alertMsgBox").show();
}