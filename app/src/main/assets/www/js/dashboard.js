/**
 * cordova-jquery-bootstrap
 * File: app.js
 * Created by rajeendra on 7/29/17.
 *
 */

var lang = 'nl';
var app = null;
var accessToken = null;
var pagers = ["pageOne", "pageTwo", "pageThree", "pageFour", "pageFive", "pageSix", "pageSeven"];
var currentPage = "init";
var uiStack = [];
var navStack = [];
var ppls = [];
var personJSONList = [];
var selectedPersonID = null;
var selectedPersonNumbers = [];
var newContact = {};
var selectedPersonData = null;
var lastNumberKey = 1;
var selectedNumberKey = -1;
var newNumber = "";
var selectedAction = null;
var testData = null;

// This is some of test contact data, This data could use to test from the browser
// uncomment localDev_ functions and comment mLab_ functions to test from browser
// open /android-cordova-inapp-webview/app/src/main/assets/www/dashboard.html file from browser
// mLab_xxx_v0() functions calls CRUD services to old mongo.cloud APIs and mLab_xxx_v1() for new API

var testContacts = [
    {
        "_id" : "63035737335d0da7378c0012",
        "active" : "Y",
        "fname" : "firstA",
        "lname": "lastA",
        "cpse" : "",
        "numbers" : [
          { "id" : "1", "number" : "1198218212", "type" : "omx" },
          { "id" : "2", "number" : "1172875475", "type" : "omx" },
          { "id" : "3", "number" : "1159454985", "type" : "omx" }
        ]
      },
      {
        "_id" : "63035737335d0da7378c0013",
        "active" : "Y",
        "fname" : "firstB",
        "lname": "lastB",
        "cpse" : "Company ABC",
        "numbers" : [
          { "id" : "1", "number" : "1298218212", "type" : "omx" },
          { "id" : "2", "number" : "1272875475", "type" : "omx" },
          { "id" : "3", "number" : "1259454985", "type" : "omx" }
        ]
      },
      {
        "_id" : "63035737335d0da7378c0014",
        "active" : "Y",
        "fname" : "firstC",
        "lname": "lastC",
        "cpse" : "Service",
        "numbers" : [
          { "id" : "1", "number" : "1398218212", "type" : "omx" },
          { "id" : "2", "number" : "1372875475", "type" : "omx" },
          { "id" : "3", "number" : "1359454985", "type" : "omx" }
        ]
      }
];

$(document).ready(function () {
    
    // Below code snippet need by spinner to hide, when the result being loaded to <p> element
    var elementA = document.querySelector('#toDoItems');
    var elementB = document.querySelector('#numberTable');

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "attributes") {
          //console.log("attributes changed")
          hideSpinner();
        }
      });
    });

    observer.observe(elementA, {
      attributes: true //configure it to listen to attribute changes
    });

    observer.observe(elementB, {
        attributes: true //configure it to listen to attribute changes
    });    

    //

    if(runMode!="html"){
        //Android.showToast("dashboard ready");
    }
    //dashboard_init();

    $(document).on('click', '#btnSave' ,function() {
	    Android.saveMongodbAPIKey($('#mongodb-apikey').val());
	});

	$(document).on('click', '#btnSaveNum' ,function() {
	    if (selectedPersonID!=null){
            //mLab_saveExistingContact_v0();
            mLab_saveExistingContact_v1();
	    }
	    if (selectedPersonID==null){
            //mLab_saveNewContact_v0();
            mLab_saveNewContact_v1();
	    }
	});

	$(document).on('click', '#btnAddNum' ,function() {
        addNumber();
	});

	$(document).on('click', '#btnOKnumbeOptions' ,function() {
		if(selectedAction=="addNum"){
			addNumberAndviewEdit(selectedPersonID);
		}
		else{
			onlyViewEdit(selectedPersonID);
		}
	});

    $(document).on('change', "#sliderOwnWork", function() {
        // 1/0-default/non, ow-own/work, ml-mobile/land, fx-fax/non-fax
        var options = "0omx";
        var headStr = options.substring(0, 1); //0,1
        //var repStr = str.substring(1, 1); //o,w
        var tailStr = options.substring(2); //m,1 f,x
        var repStr = "o";
        if($('#cbOwnWork:checked').val()=="on"){
            repStr = "w";
        }
        //saveKnockFirst(kf);
        //Android.showToast(headStr+repStr+tailStr);
        showAlertMsgBox(2, headStr+repStr+tailStr);

    });

    $(".toast-btn").click(function () {
        $(".toast-container").hide();
    });  

    $(".ml-2").click(function () {
        $(".toast-container").hide();
    });
    
    //showToast("asndbsamd asadasd",'P');


});

// Home
function showPage01(){
    // Home page
    hideAll();
    $("#pageOne").show();
    currentPage = "pageOne";
    navStack = [];
    navStack.push("pageOne");
    //page01();
}

// Contact
function showPage02(){
    //
    hideAll();
   $('#panel-numberOptions').hide();
    //$('#numberTable ').show();
    $('#panel-numberTable').show();
    $('#numberTable-bottom').show();
    $("#pageTwo").show();
    currentPage = "pageTwo";
    navStack = [];
    navStack.push("pageTwo");
    //page02();
}

function showPage03(){
    hideAll();
    selectedPersonID = null;
    selectedPersonNumbers = [];
    $("#pageThree").show();
    currentPage = "pageThree";
    navStack = [];
    navStack.push("pageThree");
    page03();
}

// Not yet
function showPage04(){
    hideAll();
    $("#pageFour").show();
    currentPage = "pageFour";
    navStack = [];
    navStack.push("pageFour");
}

// Gallery
function showPage05(){
    hideAll();
    $("#pageFive").show();
    currentPage = "pageFive";
    navStack = [];
    navStack.push("pageFive");
    page05();
}

// Register
function showPage06(){
    hideAll();
    $("#pageSix").show();
    currentPage = "pageSix";
    navStack = [];
    navStack.push("pageSix");
}

// Configuration
function showPage07(){
    hideAll();
    $("#pageSeven").show();
    currentPage = "pageSeven";
    navStack = [];
    navStack.push("pageSeven");
    page07();
}

// Under construction
function showPageUC(){
    hideAll();
    $("#under-construction").show();
    currentPage = "pageUC";
    navStack = [];
    navStack.push("pageUC");
}

function hideAll() {
    $("#pageOne").hide();
    $("#pageTwo").hide();
    $("#pageThree").hide();
    $("#pageFour").hide();
    $("#pageFive").hide();
    $("#pageSix").hide();
    $("#pageSeven").hide();
    $('.navbar-collapse').collapse('hide');
    $("#under-construction").hide();
    hideSpinner();
}

function testMsg(){
    Android.showToast("testMsg");
}

function sendEmail(){
    var data = [{
                 emailTo:"rajeendra.kanishka@gmail.com",
                 replyTo:"reply.to@test.com",
                 customerAccount: "user@user.com",
                 subject:"Support request"
               }];
    var json = Android.sendEmail(JSON.stringify({data}));
}

function showLocation(){
    android_showLocation();
}

function android_showLocation(){
    Android.showLocation();
}

function showMap(){
    android_map();
}

function android_map(){
    Android.showMap();
}

function loader(){
 //var html = '<div id="loader" class="loader" style="margin:0 auto;" style="display: none"></div>';
 var html = '<div id="loader" class="loader" ></div>';
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

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Test page
//////////////////////////////////////////////////////////////////////////////////////////////////////

function testFunc(){
    // var data = [{
    //              str1:"Test Func",
    //              str2:"text2",
    //              str3:"text3",
    //              str4:"text4"
    //            }];

    var data = {
                 _id: "8328209348203498203",
                 fname: "fnameA"
               };    

    var json = Android.testFunc(JSON.stringify(data));

    Android.showToast(json);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Contact person list
//////////////////////////////////////////////////////////////////////////////////////////////////////

function page03() {
    //Android.showToast("page03");

    uiStack=[];
    uiStack.push(0); // add init leval 0

    // comment mLab_searchPersons() for browser testing and uncomment localDev_searchPersons();
    mLab_searchPersons();
    //localDev_searchPersons(testContacts);
}

function localDev_searchPersons(data){
    personJSONsPopulate(data);
}

function mLab_searchPersons() {
  //mLab_searchPersons_v0();
    mLab_searchPersons_v1();
}

function mLab_searchPersons_v1() {
    //var jsonResponse = JSON.parse(Android.getAllContacts());
    //personJSONsPopulate(jsonResponse);

    //
    //var pTag = document.getElementById('toDoItems');
    var resultFromApp;

    showSpinner();

    // This delay is to, spinner to load before the thread is being hold by the
    // service call to Android
    setTimeout(function (){
        resultFromApp = JSON.parse(Android.getAllContacts());

        // This is need to trigger when the data is fetched for spinner to hide
        // Listen by above : observer.observe
        //pTag.setAttribute('data-text', 'OK'  );
        
        hideSpinner();

        //if(resultFromApp==null)
        //    resultFromApp = "Error in API call, Make sure you saved your API key";

        personJSONsPopulate(resultFromApp);
    }, 300);


}

function mLab_searchPersons_v0() {
    var url = "https://api.mlab.com/api/1/databases/testdatabase/collections/persons?apiKey=Hwx_Pbw971okmS5Vi9RPh6FPDHovtt-C";
    $('#toDoItemsHead').prepend(loader());
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        data: JSON.stringify({

            "id":0
            //"id": $('#txtId').val(),
            //"neighbourhoodDID": $("#cmbNeighbourhood").val(),
            //"firstName": $('#txtFirstName').val(),
            //"houseNumber": $('#txtHouseNo').val()

        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
	        if(data.length==0){
	            showAlertMsgBox(2, "no contact information found");
	        }
	        else{
                personJSONsPopulate(data);
	        }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            error(); // oops page
        }
    });
}

function personJSONsPopulate(data){  // here data straight from service call 

    if (data.length > 0) {
        var htmlStrI = '';
        personJSONList=[];

        $.each(data, function (key, value) {
            htmlStrI = htmlStrI + getHTMLRowsForPersonTabel(value,key);
            personJSONList.push(value);
        });

        var s =  '<div class="input-group">'+
                 '<p style="margin-bottom: unset;"><a href="#" class="list-group-item active">Contacts</a></p>'+
                 '<span onclick="addContact()" class="input-group-addon"><i class="glyphicon glyphicon-plus"></i></span>'+
                 '</div>';

        uiStack.push(1); // lev0 -> lev1

        $('#toDoItemsHead').empty();
        $('#toDoItemsHead').prepend(s);
        $('#toDoItems').empty();  //page 3
        $('#toDoItems').prepend(htmlStrI);

    }
}

function stepBack(key){

	if(currentPage=="pageTwo" || currentPage=="addContact" ){
	    showPage03();
	}
	else if(currentPage=="editNumberInContact"){
	    showPage02();
	}
	else if(currentPage=="addNumberToContact"){
	    showPage02();
	}
	else{
	    showPage01();
	}

}

function addContact(){
    selectedPersonNumbers = [];
    selectedPersonID = null;
    selectedPersonData = null;

    $('#fname').val("") ;
    $('#lname').val("") ;
    $('#cpse').val("") ;

    showPage02();
    currentPage = "addContact";
    uiStack.push(2); // lev1 -> lev2

    newNumber = "+94";
    addNewNumber();
    populateAvailableNumbersToTabel();
}

function getHTMLRowsForPersonTabel(val, key){ 
    // val represent a each contact from contact list straight form service call  
    // key is just a unique number use by the UI
    
    //Android.showToast(val.cpse);

    var personData =
    '{'+
    ' ~~key~~ : ~~' + key + '~~,'+
    //' ~~id~~ : ~~' + val._id.$oid + '~~,'+
    ' ~~id~~ : ~~' + val._id + '~~,'+
    ' ~~fname~~ : ~~' + val.fname + '~~, '+
    ' ~~lname~~ : ~~' + val.lname + '~~, '+
    ' ~~cpse~~ : ~~' + val.cpse + '~~'+
    '}';

    var display = '';
    var name = val.fname + '  ' + val.lname;
    var cpse = val.cpse;
    //var cpse = "Compant Xyz";

    if (name.trim().length==0){
        if(cpse.trim().length>0){
            display = '<b>' + cpse +'</b>';
        }
    }
    else if(name.trim().length>0){
        if(cpse.trim().length>0){
            display = name +'<br/><b>' + cpse +'</b>';
        }
        else if(cpse.trim().length==0){
            display = name;
        }
    }

    var html=
        '<div class="input-group"><span onclick="getPersonAndViewEdit(\'' + personData + '\')" class="input-group-addon"><i class="glyphicon glyphicon-edit"></i></span>'

	+

        //'<p style="margin-bottom: unset;"><a href="#" style="font-size: 16px;" class="list-group-item" onclick="openContactNumbersModal(\'' + key + '\')">'+ display +'</a></p>'
        '<p style="margin-bottom: unset;"><a href="#" style="font-size: 16px;" class="list-group-item" onclick="getPersonAndViewEdit(\'' + personData + '\')" >'+ display +'</a></p>'

	+

	'</div>'

    return html;
}

function getPersonAndViewEdit(personData){
    //Fetch selected person from database

	var json = personData.replace(/~~/g, '"');
	var obj = JSON.parse(json);

    selectedPersonData = obj;
    selectedPersonID = obj.id;

	showPage02();
	if(runMode!="html"){
	    //Android.moveWebview();
	}

    uiStack.push(2); // lev1 -> lev2

    // comment mLab_getPerson() for browser testing and uncomment localDev_getPerson();
    mLab_getPerson(obj.id);  // Fetch selected conact from server
    //localDev_getPerson(testContacts[0] );
}

function refreshContact(){
	if(selectedPersonID!=null){
	    showPage(2); // remain same leval 2
	    //uiStack.push(2); // lev2 -> lev2
        getPerson(selectedPersonID);
        //syncContact();
	}
	else{
	    addContact(); // remain same leval 2
	}
}

function addNumberAndviewEdit(id){
    // When return from Add-Options {Add new number)
    newNumber = $('#newNumber').val();

	showPage02();

	uiStack.pop(); // lev3 -> lev2

    // selectedPersonData is assign value when user select contact from the listed contact list
    // selectedPersonData.key is the array index where the contact person in the personJSONList
    if(selectedPersonID!=null){
        $('#fname').val(personJSONList[selectedPersonData.key].fname);
        $('#lname').val(personJSONList[selectedPersonData.key].lname);
        $('#cpse').val(personJSONList[selectedPersonData.key].cpse);
    }
    if (selectedPersonID==null){
         $('#fname').val(newContact.fname) ;
         $('#lname').val(newContact.lname) ;
         $('#cpse').val(newContact.cpse) ;
    }
	addNewNumber();
	populateAvailableNumbersToTabel();

}

function onlyViewEdit(id){
    // When return from Edit-Options
    showPage02();

	uiStack.pop(); // lev3 -> lev2

	if(selectedPersonID!=null){
        $('#fname').val(personJSONList[selectedPersonData.key].fname);
        $('#lname').val(personJSONList[selectedPersonData.key].lname);
        $('#cpse').val(personJSONList[selectedPersonData.key].cpse);
	}
    if (selectedPersonID==null){
         $('#fname').val(newContact.fname) ;
         $('#lname').val(newContact.lname) ;
         $('#cpse').val(newContact.cpse) ;
    }
	populateAvailableNumbersToTabel();
}

function addNewNumber(){
     // 1/0-default/non, ow-own/work, ml-mobile/land, fx-fax/non-fax

    var id = selectedPersonNumbers.length;
    var number = newNumber;
    var  xdata = '{ ~~id~~ : ~~' + id + '~~, ~~number~~ : ~~' + number + '~~, ~~type~~ : ~~' + '1omx' + '~~}';
	var json = xdata.replace(/~~/g, '"');
	var obj = JSON.parse(json);

    selectedPersonNumbers.push(obj);
}

function populateAvailableNumbersToTabel(){

    $('#numberTable').empty();

    for (i = 0; i < selectedPersonNumbers.length; i++) {
        var rowNo = i;
        var number = selectedPersonNumbers[i].number;
        var type = selectedPersonNumbers[i].type;

        var  xdata = '{ ~~id~~ : ~~' + i + '~~, ~~number~~ : ~~' + number + '~~, ~~type~~ : ~~' + type + '~~}';

                    var tableRow = '<tr id="'+rowNo+'"><td><div class="input-group"><span onclick="editOptions(\''+xdata+'\')" class="input-group-addon"><i class="glyphicon glyphicon-edit"></i></span><input id="txt1" type="text" class="form-control" style="font-size: 16px; float:  unset;" value="'+ number +'" name="msg" placeholder="+94777111666"><span onclick="openEditDialer('+ rowNo +')" class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;<span onclick="removeNumber('+ rowNo +')" class="input-group-addon"><i class="glyphicon glyphicon-remove"></i></span></div></td></tr>';

        $('#numberTable').append(tableRow);
    }

    if(selectedPersonData!=null){
        personJSONList[selectedPersonData.key].numbers = selectedPersonNumbers;
    }


    $('#panel-numberOptions').hide();
    //$('#numberTable ').show();
    $('#panel-numberTable').show();
    $('#numberTable-bottom').show();

}

function openContactNumbersModal(key){
    var htmlStrI ="";
    for (i = 0; i < personJSONList[key].numbers.length; i++) {
        var num = personJSONList[key].numbers[i].number;
        var html = '<li class="list-group-item list-group-item-success" onclick="openDialer(\'' + num + '\')">' + num + '</li>';
        htmlStrI = htmlStrI + html;
    }
    $("#numberList").empty();
    $("#numberList").prepend(htmlStrI);

    $("#modalContacts").modal("show");
}

function openDialer(num){
    Android.openDialer("C"+ num);
}

function openEditDialer(rowid){
    var num = $('#numberTable tr[id='+rowid+'] input').val();
    Android.openDialer("C"+ num);
}

function localDev_getPerson(data) {
    getPerson(data);
}

function mLab_getPerson(id){
    //mLab_getPerson_v0(id);
    mLab_getPerson_v1(id)
}

function mLab_getPerson_v1(id) {
    //var jsonResponse = JSON.parse(Android.getOneContact(id));
    //getPerson(jsonResponse);

    //
    //var pTag = document.getElementById('numberTable');
    var resultFromApp;

    showSpinner();

    // This delay is to, spinner to load before the thread is being hold by the
    // service call to Android
    setTimeout(function (){
        resultFromApp = JSON.parse(Android.getOneContact(id));

        // This is need to trigger when the data is fetched for spinner to hide
        // Listen by above : observer.observe
        //pTag.setAttribute('data-text', 'OK'  );
        
        hideSpinner();

        //if(resultFromApp==null)
        //    resultFromApp = "Error in API call, Make sure you saved your API key";
    
        if(resultFromApp==null){
            showToast("Oops! something went wrong",'D');
        }

        getPerson(resultFromApp);
    }, 500);

}

function mLab_getPerson_v0(id) {
    $('#numberTable').prepend(loader());
    var url = "https://api.mlab.com/api/1/databases/testdatabase/collections/persons/"+id+"?apiKey=Hwx_Pbw971okmS5Vi9RPh6FPDHovtt-C";
    selectedPersonNumbers=[];
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

        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {

            $('#fname').val(data.fname);
            $('#lname').val(data.lname);
            $('#cpse').val(data.cpse);

            if (data.numbers.length > 0) {
                $('#numberTable').empty();
                $.each(data.numbers, function (key, value) {

                    selectedPersonNumbers.push(value);

                    var id =  value.id;
                    var number = value.number;
                    var type = value.type;
                    var  xdata = '{ ~~id~~ : ~~' + key + '~~, ~~number~~ : ~~' + number + '~~, ~~type~~ : ~~' + type + '~~}';

                    var tableRow = '<tr id="'+key+'"><td><div class="input-group"><span onclick="editOptions(\''+xdata+'\')" class="input-group-addon"><i class="glyphicon glyphicon-edit"></i></span><input id="txt1" type="text" class="form-control" style="font-size: 16px; float:unset;" value="'+ value.number +'" name="msg" placeholder="+94777111666"><span onclick="openEditDialer('+ key +')" class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;<span onclick="removeNumber('+key+')" class="input-group-addon"><i class="glyphicon glyphicon-remove"></i></span></div></td></tr>';
                    $('#numberTable').append(tableRow);
                });
                $('#numberTable-bottom').show();
            }

            //getPersonJSON(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showDivMsgBox(4, " Error.");
            //error();
        }
    });
}

function getPerson(data) {

    $('#fname').val(data.fname);
    $('#lname').val(data.lname);
    $('#cpse').val(data.cpse);

    if (data.numbers.length > 0) {
        $('#numberTable').empty();
        $.each(data.numbers, function (key, value) {

            selectedPersonNumbers.push(value);

            var id =  value.id;
            var number = value.number;
            var type = value.type;
            var  xdata = '{ ~~id~~ : ~~' + key + '~~, ~~number~~ : ~~' + number + '~~, ~~type~~ : ~~' + type + '~~}';

            var tableRow = '<tr id="'+key+'"><td><div class="input-group"><span onclick="editOptions(\''+xdata+'\')" class="input-group-addon"><i class="glyphicon glyphicon-edit"></i></span><input id="txt1" type="text" class="form-control" style="font-size: 16px; float:unset;" value="'+ value.number +'" name="msg" placeholder="+94777111666"><span onclick="openEditDialer('+ key +')" class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;<span onclick="removeNumber('+key+')" class="input-group-addon"><i class="glyphicon glyphicon-remove"></i></span></div></td></tr>';
            $('#numberTable').append(tableRow);
        });
        $('#numberTable-bottom').show();
    }

}

function getPersonJSON(data){

    var fname = data.fname;
    var lname = data.lname;
    var cpse = data.cpse;

    var personJSON = '';
	var numbers = '';

    for (i = 0; i < data.numbers.length; i++) {

        var numberData = data.numbers[i];

        var  number = '{ "id" : "' + numberData.id + '", "number" : "' + numberData.number + '", "type" : "' + numberData.type + '" }';

        var sFix = (i+1==data.numbers.length)?'':',';
        numbers = numbers + number + sFix;
    }

    var personJSON_head = '{'
    +'  "active": "Y",'
    +'  "fname": "' + fname + '",'
    +'  "lname": "' + lname + '",'
    +'  "cpse": "' + cpse + '",';

    var personJSON_numbers = ' "numbers": [' + numbers + '] }';
    personJSON = personJSON_head + personJSON_numbers;

    return personJSON;
}

function addNumber() {
    // // Move to add Options(own, mob, fax)

	//currentPage = "pageTwo-add";
	currentPage = "addNumberToContact";
	navStack.push("addNumberToContact");

	uiStack.push(3); // lev2 -> lev3

	if (selectedPersonID==null){
	    newContact.fname =  $('#fname').val();
	    newContact.lname =  $('#lname').val();
	    newContact.cpse =  $('#cpse').val();
	}

	selectedAction="addNum";
	updatePersonJSONList();  // update contact person header info
    updateNumberJSONList();  // update curent numbers for selectd person 
	$('#panel-numberTable').hide();
	$('#numberTable-bottom').hide();
	$('#panel-numberOptions').show();
    $('#numberOptions-top').empty();
    $('#numberOptions-top').prepend('<input id="newNumber" type="text" class="form-control" >');

    $('#newNumber').val("+94");
}

function editOptions(data) {
    // Move to edit Options(own, mob, fax)

	currentPage = "editNumberInContact";
	navStack.push("editNumberInContact");

    uiStack.push(3); // lev2 -> lev3

	selectedAction="editNum";

	if (selectedPersonID==null){
	    newContact.fname =  $('#fname').val();
	    newContact.lname =  $('#lname').val();
	    newContact.cpse =  $('#cpse').val();
	}

	var json = data.replace(/~~/g, '"');
	obj = JSON.parse(json);

    updatePersonJSONList();  // update contact person header info
	updateNumberJSONList();  // update curent numbers for selectd person 
	$('#panel-numberTable').hide();
	$('#numberTable-bottom').hide()
	$('#panel-numberOptions').show();
    $('#numberOptions-top').empty();
    $('#numberOptions-top').prepend('<span id="numberTitle"></span>');

	$('#numberTitle').html(getNumber(obj.id));

    var typeDef = obj.type.substring(0, 1); // o
    var typeOwn = obj.type.substring(1, 2); // m
    if(typeDef=="o"){
        $( "#cbOwnWork").prop('checked', true);
    }
}

function updatePersonJSONList() {
  for (var i = 0; i < personJSONList.length; i++) {
    //if (personJSONList[i]._id.$oid == selectedPersonID) {
    if (personJSONList[i]._id == selectedPersonID) {
      personJSONList[i].fname = $('#fname').val();
      personJSONList[i].lname = $('#lname').val();
      personJSONList[i].cpse = $('#cpse').val();
      return;
    }
  }
}

function updateNumberJSONList() { // update selected selectedPersonNumbers

	$('#numberTable').find('tbody tr').each(function(index){
		var number = $(this).find(".input-group input").val();
        setNumber(index, number);
	});
}

function getNumber(index) {
  for (var i = 0; i < selectedPersonNumbers.length; i++) {
    if (i == index) {
      return selectedPersonNumbers[i].number;
    }
  }
}

function setNumber(index, number) { // update selected selectedPersonNumbers
  for (var i = 0; i < selectedPersonNumbers.length; i++) {
    if (i == index) {
      selectedPersonNumbers[i].number = number;
      return;
    }
  }
}

function removeNumber(rowid) {
	$('#numberTable tr[id='+rowid+']').remove();
    selectedPersonNumbers.splice(rowid,1);
    updateNumberJSONList();
	populateAvailableNumbersToTabel();
}

function mLab_saveNewContact_v1(){

    // var fname = $('#fname').val();
    // var lname = $('#lname').val();
    // var cpse = $('#cpse').val();

    // updateselectedPersonNumbers();

    // var personJSON = '';
	// var numbers = '';

    // for (i = 0; i < selectedPersonNumbers.length; i++) {

    //     var number = selectedPersonNumbers[i].number;

    //     var  number = '{ "id" : "' + i + '", "number" : "' + number + '", "type" : "omx" }';

    //     var sFix = (i+1==selectedPersonNumbers.length)?'':',';
    //     numbers = numbers + number + sFix;
    // }

    // var personJSON_head = '{'
    // +'  "fname": "' + fname + '",'
    // +'  "lname": "' + lname + '",'
    // +'  "cpse": "' + cpse + '",' //Company,Service,Place or Event
    // +'  "active": "Y",';    

    // var personJSON_numbers = ' "numbers": [' + numbers + '] }';
    // personJSON = personJSON_head + personJSON_numbers;

    var personJSON = getCurrentContactJSON();
    
    //var jsonResponse = JSON.parse(Android.getOneContact(id));
    //getPerson(jsonResponse);

    //
    //var pTag = document.getElementById('numberTable');
    var resultFromApp;

    showSpinner();

    // This delay is to, spinner to load before the thread is being hold by the
    // service call to Android
    setTimeout(function (){
        resultFromApp = Android.insertOneContact(personJSON);

        // This is need to trigger when the data is fetched for spinner to hide
        // Listen by above : observer.observe
        //pTag.setAttribute('data-text', 'OK'  );
        
        hideSpinner();

        //if(resultFromApp==null)
        //    resultFromApp = "Error in API call, Make sure you saved your API key";

        //getPerson(resultFromApp);
        
        if(resultFromApp==null){
            showToast("Oops! something went wrong",'D');
        }
        else{
            showToast("Yep! Successfully saved",'S');
        }

        uiStack.pop(); // lev2 -> lev1
        showPage03();

    }, 300);
    
 
    
    
    
    // var personJSON = getCurrentContactJSON();

	// console.log("saveNewContact - request: " + personJSON);

    // var response;
    // response = Android.insertOneContact(personJSON);

    // console.log("saveNewContact - response: " + response);
    
    // uiStack.pop(); // lev2 -> lev1
    // showPage03();

}

function mLab_saveNewContact_v0(){
    $('#alertMsgBox').empty();
    $('#alertMsgBox').prepend(loader());
    $('#alertMsgBox').show();

    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var cpse = $('#cpse').val();

    updateNumberJSONList();

    var personJSON = '';
	var numbers = '';

    for (i = 0; i < selectedPersonNumbers.length; i++) {

        var number = selectedPersonNumbers[i].number;

        var  number = '{ "id" : "' + i + '", "number" : "' + number + '", "type" : "omx" }';

        var sFix = (i+1==selectedPersonNumbers.length)?'':',';
        numbers = numbers + number + sFix;
    }

    var personJSON_head = '{   '
    +'  "fname": "' + fname + '",'
    +'  "lname": "' + lname + '",'
    +'  "cpse": "' + cpse + '",'; //Company,Service,Place or Event

    var personJSON_numbers = ' "numbers": [' + numbers + '] }';
    personJSON = personJSON_head + personJSON_numbers;

	console.log("saveNewContact - personJSON: " + personJSON);

    var url = "https://api.mlab.com/api/1/databases/testdatabase/collections/persons?apiKey=Hwx_Pbw971okmS5Vi9RPh6FPDHovtt-C";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: personJSON ,
        /*data: JSON.stringify({

            "id":0
            //"id": $('#txtId').val(),
            //"neighbourhoodDID": $("#cmbNeighbourhood").val(),
            //"firstName": $('#txtFirstName').val(),
            //"houseNumber": $('#txtHouseNo').val()

        }),*/
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            showAlertMsgBox(1, "information saved");

	        uiStack.pop(); // lev2 -> lev1
	        gotoPageIcon(3);


        },
        error: function (jqXHR, textStatus, errorThrown) {
            error(); // oops page
        }
    });
}

function mLab_saveExistingContact_v1(){
    /* 

    "_id" : "237299232932938293"
    {
        "fname": "fnameA",
        "lname": "lnameA",
        "cpse": "Company ABC",        
        "active": "Y",
        "numbers": [
            {"id" : "0", "number" : "1118218212", "type" : "1omx" }, 
            {"id" : "1", "number" : "1129454985", "type" : "0omx" }
        ]
    } 

    */

    // var fname = $('#fname').val();
    // var lname = $('#lname').val();
    // var cpse = $('#cpse').val();

    // updateNumberJSONList();

    // var personJSON = '';
	// var numbers = '';

    // for (i = 0; i < selectedPersonNumbers.length; i++) {

    //     var number = selectedPersonNumbers[i].number;

    //     var  number = '{ "id" : "' + i + '", "number" : "' + number + '", "type" : "omx" }';

    //     var sFix = (i+1==selectedPersonNumbers.length)?'':',';
    //     numbers = numbers + number + sFix;
    // }

    // var personJSON_head = '{   '
    // +'  "fname": "' + fname + '",'
    // +'  "lname": "' + lname + '",'
    // +'  "cpse": "' + cpse + '",';

    // var personJSON_numbers = ' "numbers": [' + numbers + '] }';
    // personJSON = personJSON_head + personJSON_numbers;

 
 
    //  //var jsonResponse = JSON.parse(Android.getOneContact(id));
    // //getPerson(jsonResponse);

    // //
    // var pTag = document.getElementById('numberTable');
     var resultFromApp;

    showSpinner();

    var personJSON = getCurrentContactJSON();

    // This delay is to, spinner to load before the thread is being hold by the
    // service call to Android
    setTimeout(function (){
        var resultFromApp = Android.updateOneContact(selectedPersonID, personJSON);

        // This is need to trigger when the data is fetched for spinner to hide
        // Listen by above : observer.observe
        //pTag.setAttribute('data-text', 'OK'  );

        //if(resultFromApp==null)
        //    resultFromApp = "Error in API call, Make sure you saved your API key";
        
        hideSpinner();

        if(resultFromApp==null){
            showToast("Oops! something went wrong",'D');
        }
        else{
            showToast("Yep! Successfully saved",'S');
        }

        console.log(resultFromApp);

        //getPerson(resultFromApp);
    }, 300);
 
 
 
 
 
 
    //var personJSON = getCurrentContactJSON();

	//console.log("saveContact - request: " + personJSON);

    //var response;
    //response = Android.updateOneContact(selectedPersonID, personJSON);

    //console.log("saveContact - response: " + response);
}

function getCurrentContactJSON(){
    
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var cpse = $('#cpse').val();

    updateNumberJSONList();

    var personJSON = '';
	var numbers = '';

    for (i = 0; i < selectedPersonNumbers.length; i++) {

        var number = selectedPersonNumbers[i].number;

        var  number = '{ "id" : "' + i + '", "number" : "' + number + '", "type" : "omx" }';

        var sFix = (i+1==selectedPersonNumbers.length)?'':',';
        numbers = numbers + number + sFix;
    }

    var personJSON_head = '{'
    +'  "fname": "' + fname + '",'
    +'  "lname": "' + lname + '",'
    +'  "cpse": "' + cpse + '",' //Company,Service,Place or Event
    +'  "active": "Y",';    

    var personJSON_numbers = ' "numbers": [' + numbers + '] }';
    personJSON = personJSON_head + personJSON_numbers; 
    
    return personJSON;
}

function mLab_saveExistingContact_v0(){

    $('#alertMsgBox').empty();
    $('#alertMsgBox').prepend(loader());
    $('#alertMsgBox').show();

    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var cpse = $('#cpse').val();

    updateNumberJSONList();

    var personJSON = '';
	var numbers = '';

    for (i = 0; i < selectedPersonNumbers.length; i++) {

        var number = selectedPersonNumbers[i].number;

        var  number = '{ "id" : "' + i + '", "number" : "' + number + '", "type" : "omx" }';

        var sFix = (i+1==selectedPersonNumbers.length)?'':',';
        numbers = numbers + number + sFix;
    }

    var personJSON_head = '{ "$set" : {   '
    +'  "fname": "' + fname + '",'
    +'  "lname": "' + lname + '",'
    +'  "cpse": "' + cpse + '",';

    var personJSON_numbers = ' "numbers": [' + numbers + '] }}';
    personJSON = personJSON_head + personJSON_numbers;

	console.log("saveContact - personJSON: " + personJSON);

	/*

    { "$set" :
     {   "fname": "Rajeendra4",
        "numbers": [
            {
                "id": "0",
                "number": "+94112581338",
                "type": "omx"
            },
            {
                "id": "1",
                "number": "+94779735784",
                "type": "omx"
            }
        ]
     }
    }
	*/

    var url = "https://api.mlab.com/api/1/databases/testdatabase/collections/persons/"+selectedPersonID+"?apiKey=Hwx_Pbw971okmS5Vi9RPh6FPDHovtt-C";
    $.ajax({
        url: url,
        type: "PUT",
        dataType: 'json',
        data: personJSON ,
        /*data: JSON.stringify({

            //"id":0
            //"id": $('#txtId').val(),
            //"neighbourhoodDID": $("#cmbNeighbourhood").val(),
            //"firstName": $('#txtFirstName').val(),
            //"houseNumber": $('#txtHouseNo').val()

        }),*/
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            showAlertMsgBox(1, "information saved");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            error(); // oops page
        }
    });
}

function contactSearchFunction() {
    var input, filter, divContactsHolder, divContactElements, a;
    input = document.getElementById("contactSearch");
    filter = input.value.toUpperCase();
    divContactsHolder = document.getElementById("toDoItems");
    divContactElements = divContactsHolder.getElementsByTagName("div");
    var td = '';
    for (i = 0; i < divContactElements.length; i++) {
        a = divContactElements[i].getElementsByTagName("a")[0];

        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            divContactElements[i].style.display = "";
        } else {
            divContactElements[i].style.display = "none";

        }

    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////////////////////////////

function page05() {
    $("#albdd").on( "change", function () { // Album's drop down
        loadAlbum($(this).val());

        $('img').on("error", function () {
            this.src = "img/noimage.gif";
        });
    });

    loadAlbum(1);

    $('img').on("error", function () {
        this.src = "img/noimage.gif";
    });
}

function loadAlbum(id){

    var topHtml =

        '<div id="myCarousel" class="carousel slide" data-ride="carousel">'+
        '    <!-- Indicators -->'+
        '    <ol class="carousel-indicators">'+
        '     <li data-target="#myCarousel" data-slide-to="0" class="active"></li>'+
        '     <li data-target="#myCarousel" data-slide-to="1"></li>'+
        '     <li data-target="#myCarousel" data-slide-to="2"></li>'+
        '    </ol>'+
        '    <!-- Wrapper for slides -->'+
        '    <div class="carousel-inner">'

    var bottomHtml =
        '    </div> '+
        '    <!-- Left and right controls -->'+
        '    <a class="left carousel-control" href="#myCarousel" data-slide="prev">'+
        '    <span class="glyphicon glyphicon-chevron-left"></span>'+
        '    <span class="sr-only">Previous</span>'+
        '    </a>'+
        '    <a class="right carousel-control" href="#myCarousel" data-slide="next">'+
        '    <span class="glyphicon glyphicon-chevron-right"></span>'+
        '     <span class="sr-only">Next</span>'+
        '    </a>'+
        ' </div>'

    var album1 = [
        "https://s-media-cache-ak0.pinimg.com/originals/30/f2/f0/30f2f0a6eb816b6b58ceb599eedd9aae.jpg",
        "https://s-media-cache-ak0.pinimg.com/236x/68/60/8d/68608d1647383c154b9b8b13d9ec98d0.jpg",
        "https://s-media-cache-ak0.pinimg.com/236x/a2/77/90/a277904e72b95d16e23662ab0d4b388a.jpg",
        "https://s-media-cache-ak0.pinimg.com/236x/25/e1/ba/25e1ba18b724d97f8f39125aeaf26e66.jpg",
        "https://s-media-cache-ak0.pinimg.com/236x/20/93/3e/20933e17f3c2ecf96da3a2c789a569ac.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/92/21/f6/9221f6bd144dacbea12ecf80e343b035.jpg",
        "https://i.pinimg.com/564x/37/b1/49/37b149e392e62fece4ce3f9d78d8a616.jpg"
    ];

    var album2 = [
        //"https://s-media-cache-ak0.pinimg.com/564x/9c/6c/2f/9c6c2ff12a8d28a1fce9c1c12be13c17.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/1b/6e/25/1b6e259866bfc48e3d6c85ae259b347e.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/e4/da/65/e4da6532d1b6f3b9fe96abd6a24c1374.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/af/9b/46/af9b46c596689c5b380e05ef6c15f027.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/5b/d1/2a/5bd12affb87119cf5035cb3aeffdc3f2.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/6c/7b/46/6c7b46122380b57dd56a7a30725bd641.jpg",
    ];

    var album3 = [
        "https://s-media-cache-ak0.pinimg.com/564x/3e/f0/0c/3ef00c1d0d50ccce6a9dd745fcd836f8.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/61/e5/1b/61e51b3023e4078274a8731b907c9d42.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/fc/f3/28/fcf3286b729043caf34d5215b679b920.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/67/4a/bf/674abfd492001b6b2d6763dc5188664f.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/b6/8a/eb/b68aeb7151057b8f07cd1b47ad612a0a.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/3f/5d/bb/3f5dbb78fdeb3b12083b16363bd90e05.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/e1/ff/66/e1ff666c7f904766855f8bd3535f6bc3.jpg",
        "https://s-media-cache-ak0.pinimg.com/564x/97/92/1f/97921f2f9dd824d63b737efa6978964c.jpg",
    ];

    var album = album1;
    if(id==2){album=album2;}
    if(id==3){album=album3;}
    var html = '';

    for (k = 0; k < album.length; k++) {
        var act = "item";
        if(k==0) act = "item active";
        html = html +
            '<div class="' + act + '">' +
            '<img src="'+ album[k] +'" alt="" style="width:100%;">' +
            '</div>'
    }
    /*
     * onError="this.onerror=null; this.src=img/noimage.gif"
     * onError="this.onerror=null;this.src='/images/noimage.gif';"
     * */
    $('#carouselContainer').empty();
    $('#carouselContainer').prepend(topHtml+html+bottomHtml);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////////////////////////////

function page07() {
    var text = contactURL;
    $("select option").filter(function() {
        //may want to use $.trim in here
        return $(this).text() == text;
    }).prop('selected', true);

    $('#sel1').on("change", function () {
        //alert($('#sel1').find(":selected").text());
        contactURL = $('#sel1').find(":selected").text();
    });
}

function showSpinner(){
    document.getElementById("loader").style.display = "block";
    return true;
}

function hideSpinner(){
    document.getElementById("loader").style.display = "none";
}

function showToast(msg, tType){

    // S-success, P-primary, D-danger  

    $(".toast-msg-holder").text(msg);    
    if (tType=='D'){
        $("#toast-danger").show();    
    } 
    else if(tType=='S'){
        $("#toast-success").show();    
    }
    else{
        $("#toast-primary").show();  
    }
}




