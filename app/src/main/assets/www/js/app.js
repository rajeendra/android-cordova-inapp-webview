$(document).ready(function () {

    $("#btn-login").click(function () {
        user = $('#login-username').val();
        pwd  = $('#login-password').val();
        //getUser(user, pwd);
        mLab_getUser(user, pwd);

    });

});

function init() {

}

function getUser(username, password) {
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

function mLab_getUser(username, password) {

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
            var loginSuccess = false;
            if(data!=null && data.length==1){
                 if (password == data[0].pwd){
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

function postLogin() {
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