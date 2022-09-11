var selectedPackageName = null;
var selectedPackageId = -1;
var selectedPackagePrice = 0.00;
var receiverPersonName = null;
var receiverPersonPostcode = null;
var receiverPersonHouseNumber = null;
var receiverPersonHouseNumberSuffix = null;
var receiverPersonStreet = null;
var receiverPersonCity = null;
var receiverPersonCompany = null;
var receiverPersonEmail = null;
var senderName = null;
var senderCompany = null;
var possibleDates = null;
var orderNumber = null;
var selectedDay = null;
var selectedDate = null;
var selectedDayStringShort = null;
var selectedDayStringLong = null;
var currentPage = "loadParcelWeightLessThan10";
var previousPages = [];
var selectedPickupFirst = null;
var selectedPickupSecond = null;
var actionDateUnsureFlg = 0;
var selectedDayPickupFirst = null;
var selectedDayPickupFirstLong = null;
var selectedDayPickupSecond = null;
var isExistingOrder = false;
var orderDID = -1;
var app = null;
var accessToken = null;
var defaultCompany=null;
var defaultPerson=null;
var isBkBtn=false;
var knockFirstSaved = true;
var hitFinalizeOrders = true;  // user hit the finalizeOrders [btnPayment] button OR create-more-orders [btnMoreOrders] button

//var accessToken = "9w3cN7ogRGDBr1owe9liGUZ9XVG88LYeaZRNVZ8hkjyEK9RyHbZnszbcFI3VNWiraK3Z3j6VnSXdroIZSGfluoCQ031K4pqal0HG0BgxF6s69xf2rGb8KTGGCg65rJbzxowlrYkrUYHJvo6AYue436X4n8IMMHnTWFW2BODNNeOHTlb";


$(document).ready(function () {

    init();

    selectedPackageName = getLanguageValue("send.label.nobox");

    $('input').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if ( (code==13) || (code==10))
        {
            $(this).blur();
            return false;
        }
    });


    $("#btnCancel").click(function () {
        //alert(' Back to native app ');
        if(app != null && app =='android'){
            JsHandler.homePage(' Hi ');
        }else{
            window.location = 'ios:showUserHome';
        }

    });

    $("#btnBack").click(function () {

        isBkBtn = true;

        switch (currentPage) {
            case "loadParcelWeightLessThan10":{
                if(app != null && app =='android'){
                    JsHandler.homePage(' Hi ');
                }else{
                    window.location = 'ios:showUserHome';
                }
                break;
            }

            case "showSupplyPackaging":
                showParcelWeightLessThan10();
                break;
            case "showDivSelectShippingBox":
                showSupplyPackaging();
                break;
            case "showDivWhomToSendParcel":
                showSupplyPackaging();
                break;
            case "showDivSenderDetails":
                showDivWhomToSendParcel();
                break;
            case "showDivSenderCompany":
                showDivWhomToSendParcel();
                break;
            case "showDivSenderHasName":
                showDivWhomToSendParcel();
                break;
            case "showDivSelectReceiver":
                showDivWhomToSendParcel();
                break;
            case "showSenderCompanyAndName":
                showDivWhomToSendParcel();
                break;
            case "loadSummary":
                showDivSelectReceiver(true);
                break;
            case "showReceiverCompany":
                showDivSelectReceiver(true);
                break;
            case "showDivReceiverHasName":
                showReceiverCompany();
                break;
            case "showReceiverCompanyAndName":
                showDivReceiverHasName();
                break;
            case "showDivReceiverDetails":
                showDivSelectReceiver(true);
                break;
            case "showDivPostcode":
                showDivSelectReceiver(true);
                break;
            case "showDivReceiverHousenumber":
                showDivPostcode();
                break;
            case "showDivReceiverHasHouseSuffix":
                showDivReceiverHousenumber();
                break;
            case "showDivReceiverHouseSuffix":
                showDivReceiverHasHouseSuffix();
                break;
            case "showDivReceiverAddress":
                window[previousPages["showDivReceiverAddress"]]();
                break;
            case "showDivPrealert":
                showDivReceiverAddress();
                break;
            case "showDivReceiverEmail":
                showDivPrealert();
                break;
            case "showDivSelectEvening":
                showDivPrealert();
                break;
            case "showDivAllInfo":
                showDivSelectEvening();
                break;
            case "showDivBMNumber":
                showDivAllInfo();
                break;
            case "showDivSentSuccess":
                if(app != null && app =='android'){
                    JsHandler.homePage(' Hi ');
                }else{
                    window.location = 'ios:showUserHome';
                }
                break;
            case "loadKnockFirst":
                showDivSentSuccess();
                break;
            case "showDivAddressNotFound":
                showDivPostcode();
                break;
            case "showDivCity":
                showDivAddressNotFound();
                break;
            case "showDivStreet":
                showDivAddressNotFound();
                break;
            case "showDivMailBoxConfirm":
                window[previousPages["showDivMailBoxConfirm"]]();
                break;
            case "showDivCityName":
                window[previousPages["showDivCityName"]]();
                break;
        }
        isBkBtn = false;
    });

    $("#btnKnockFirstYes").click(function(){
        saveKnockFirst("true")
    });
    $("#btnKnockFirstNo").click(function(){
        saveKnockFirst("false")
    });

    $("#btnParcelWeightLessThan10Yes").click(function () {
        showSupplyPackaging();
    });

    $("#btnParcelWeightLessThan10No").click(function () {
        //alert(' btnParcelWeightLessThan10No ');
    });

    $("#btnSupplyPackagingYes").click(function () {
        showDivSelectShippingBox();
    });

    $('#overlay').on('shown.bs.modal', function () {
        $('body').addClass('modal-open-overlay');
    });
    $('#overlay').on('hidden.bs.modal', function (e) {
        $('body').removeClass('modal-open-overlay');
    });

    $("#btnSupplyPackagingNo").click(function () {
        selectedPackageName = getLanguageValue("send.label.nobox");
        selectedPackageId = -1;
        selectedPackagePrice = 0.00;
        showDivWhomToSendParcel();
    });

    $("#btnNoPacking").click(function () {
        selectedPackageName = getLanguageValue("send.label.nobox");
        selectedPackageId = -1;
        selectedPackagePrice = 0.00;
        showDivWhomToSendParcel();
    });

    $("#btnWhomToSendParcelPerson").click(function () {
        senderCompany = "";
        showDivSenderDetails();
    });

    $("#btnWhomToSendParcelCompany").click(function () {
        showDivSenderCompany();
    });

    $("#btnSenderDetails").click(function () {
        if ($('#txtSenderDetails').val().trim().length > 0) {
            senderName = $('#txtSenderDetails').val();
        } else {
            senderName = "";
        }
        showDivSelectReceiver();
    });

    $("#btnSelectReceiverCompany").click(function () {
        showReceiverCompany();
    });

    $("#btnSelectReceiverPerson").click(function () {
        showDivReceiverDetails();
    });

    $("#btnReceiverDetails").click(function () {

        if ($('#txtReceiverName').val().length > 0) {
            receiverPersonName = $('#txtReceiverName').val();
        } else {
            receiverPersonName = "";
        }
        showDivPostcode();
    });

    $("#btnPostCode").click(function () {
        receiverPersonPostcode = $('#txtPostCode').val().toUpperCase().replace(/\s/g, '');

        if ($('#txtPostCode').val().length > 3 && validatePostalCode(receiverPersonPostcode)) {
            $('#divPostalCode').html(receiverPersonPostcode.toUpperCase());
            showDivReceiverHousenumber();
        } else {
            $("#divpPostalcodeIncorrect").show();
        }
    });

    $("#btnHousenumber").click(function () {

        if ($('#txtHouseNumber').val().length > 0) {
            receiverPersonHouseNumber = $('#txtHouseNumber').val();
            $('#divHouseNumberDispaly').html(receiverPersonHouseNumber);
            showDivReceiverHasHouseSuffix();
        } else {
            $("#divHouseNumberIncorrect").show();
        }

    });

    $("#btnReceiverHasHouseSuffixYes").click(function () {

        showDivReceiverHouseSuffix();
    });

    $("#btnReceiverHasHouseSuffixNo").click(function () {

        getReceiverPersonAddress();

    });

    $("#btnMailBoxNo").click(function () {
        showDivAddressNotFound();
    });

    $("#btnMailBoxYes").click(function () {
        showDivCityName();
    });

    $("#btnCityName").click(function () {

        if ($('#txtCityName').val().length > 0) {

            receiverPersonStreet = getLanguageValue("send.label.postbox");
            receiverPersonCity = $('#txtCityName').val();

            var address = '<div class="get-started">' +
                '<div class="bubble default">' +
                '<p>' + getLanguageValue("send.label.instruction54") + '</p>' +
                '<p>' ;

            //if (receiverPersonCompany != null) {
            //    address = address + receiverPersonCompany + '<br>';
            //}
            //if (receiverPersonName != null) {
            //    address = address + receiverPersonName + '<br>';
            //}
            address = address + receiverPersonStreet + ' ' +  $('#txtHouseNumber').val() + '<br>';
            address = address + receiverPersonPostcode + ' ' + receiverPersonCity + '<br>';

            address = address + '</p></div> </div>';

            $("#divReceiverAddress").empty().append(address);

            showDivReceiverAddress();
        }
        else{
            $("#divHouseNumberIncorrect").show();
        }

    });

    $("#btnHouseSuffix").click(function () {
        if ($('#txtHouseSuffix').val().length > 0) {
            receiverPersonHouseNumberSuffix = $('#txtHouseSuffix').val();
            getReceiverPersonAddress();

        } else {
            getReceiverPersonAddress();
        }
    });

    $("#btnReceiverAddressYes").click(function () {
        showDivPrealert();
    });

    $("#btnReceiverAddressNo").click(function () {
        if(previousPages['showDivReceiverAddress']=="showDivCityName"){
            showDivPostcode();
        }
        else{
            showDivStreet();
        }

    });


    $("#btnPrealertYes").click(function () {
        showDivReceiverEmail();
    });

    $("#btnPrealertNo").click(function () {
        showDivSelectEvening();
    });

    $("#btnReceiverEmail").click(function () {

        if ($('#txtReceiverEmail').val().length > 0) {

            if (isEmail($('#txtReceiverEmail').val())) {
                receiverPersonEmail = $('#txtReceiverEmail').val();
                showDivSelectEvening();
            } else {
                $("#divReceiverEmailIncorrect").show();
            }

        } else {
            receiverPersonEmail = null;
            showDivSelectEvening();
        }

    });


    $("#btnAllInfoConfirm").click(function () {
        showDivBMNumber();
    });
    $("#BtnBMNumber").click(function () {
        createOrders();
    });

    $("#btnMoreOrders").click(function () {
        if(!knockFirstSaved){
            hitFinalizeOrders = false;
            loadKnockFirst();
        }
        else{
            // create More Orders
            //if(app != null && app =='android'){
            //    JsHandler.homePage(' Hi ');
            //}else{
            //    window.location = 'ios:showUserHome';
            //}
            createMoreOrders();
        }

    });
    $("#btnMainMenu").click(function () {
        if(app != null && app =='android'){
            JsHandler.homePage(' Hi ');
        }else{
            window.location = 'ios:showUserHome';
        }

    });

    $("#btnPayment").click(function () {
        if(!knockFirstSaved){
            hitFinalizeOrders = true;
            loadKnockFirst();
        }
        else{
            // finaliz eOrders
            //if(app != null && app =='android'){
            //    JsHandler.payment(' Hi ');
            //}else{
            //    window.location = '/Buurtmus/customerApp/payment?token=' + accessToken +'&lang='+lang;
            //}

            finalizeOrders();
        }
    });

    $("#btnSenderCompany").click(function () {
        if ($('#txtSenderCompany').val().trim().length > 0) {
            senderCompany = $('#txtSenderCompany').val();
        } else {
            senderCompany = "";
        }
        showDivSenderHasName();

    });


    $("#btnSenderHasNameYes").click(function () {
        showSenderCompanyAndName();
    });

    $("#btnSenderHasNameNo").click(function () {
        senderName = "";
        showDivSelectReceiver();
    });

    $("#btnSenderCompanyAndName").click(function () {
        if ($('#txtSenderCompanyAndName').val().trim().length > 0) {
            senderName = $('#txtSenderCompanyAndName').val();
        } else {
            senderName = "";
        }
        showDivSelectReceiver();
    });


//-------------------------------

    $("#btnReceiverCompany").click(function () {
        if ($('#txtReceiverCompany').val().length > 0) {
            receiverPersonCompany = $('#txtReceiverCompany').val();
        } else {
            receiverPersonCompany = "";
        }
        showDivReceiverHasName();
    });


    $("#btnCity").click(function () {
        if ($('#txtCity').val().trim().length > 0) {
            receiverPersonCity = $('#txtCity').val();

            var address = '<div class="get-started">' +
                '<div class="bubble default">' +
                '<p>' + getLanguageValue("send.label.instruction54") + '</p><p>';
            if (receiverPersonCompany != null) {
                address = address + receiverPersonCompany + '<br>';
            }
            if (receiverPersonName != null) {
                address = address + receiverPersonName + '<br>';
            }
            receiverPersonHouseNumberSuffix = receiverPersonHouseNumberSuffix == null ? '' : receiverPersonHouseNumberSuffix;

            address = address + receiverPersonStreet + ' ' + receiverPersonHouseNumber + '' + receiverPersonHouseNumberSuffix + '<br>';
            address = address + receiverPersonPostcode.toUpperCase() + ' ' + receiverPersonCity + '<br>';
            address = address + '</p></div> </div>';

            $("#divReceiverAddress").empty()
                .append(address);

            showDivReceiverAddress();
        } else {
            //alert(' Error');
            $("#divCityIncorrect").show();
        }
    });


    $("#btnStreet").click(function () {
        if ($('#txtStreet').val().trim().length > 0) {
            receiverPersonStreet = $('#txtStreet').val();
            $("#divInfoCityStreetName").html(receiverPersonStreet)

            showDivCity();
        } else {
            //alert(' Error');
            $("#divStreetIncorrect").show();
        }

    });

    $("#btnPostalCodeHouseNo").click(function () {
        showDivPostcode();
    });


    $("#btnAddressNotFoundYes").click(function () {
        showDivStreet();
    });

    $("#btnAddressNotFoundNo").click(function () {
        showDivPostcode();
    });


    $("#btnReceiverHasNameYes").click(function () {
        showReceiverCompanyAndName();
    });

    $("#btnReceiverHasNameNo").click(function () {
        showDivPostcode();
    });

    $("#btnReceiverCompanyAndName").click(function () {
        if ($('#txtReceiverCompanyAndName').val().length > 0) {
            receiverPersonName = $('#txtReceiverCompanyAndName').val();
        } else {
            receiverPersonName = "";
        }
        showDivPostcode();
    });
//-------------------------------


});

$(document).on('click', '.packageClick', function () {
        var partsOfStr = this.id.split('#');
        selectedPackageId = partsOfStr[0];
        selectedPackageName = partsOfStr[1];
        selectedPackagePrice = partsOfStr[2];
        selectedPackagePrice = parseFloat(selectedPackagePrice).toFixed(2);

        showDivWhomToSendParcel();

    }
).on('click', '#btnWhenToCollectParcelEditBox', function () {
        showSupplyPackaging();
    }
).on('click', '#btnFirstDay', function () {
        selectedDate = selectedPickupFirst;
        selectedDay = selectedDayPickupFirst;
        selectedDayStringShort = selectedDayPickupFirst;
        selectedDayStringLong = selectedDayPickupFirstLong;
        showDivAllInfo();
    }
).on('click', '#btnSecondDay', function () {
        selectedDate = selectedPickupSecond;
        selectedDay = selectedDayPickupSecond;
        selectedDayStringShort = selectedDayPickupSecond
        selectedDayStringLong = selectedDayPickupSecond;
        showDivAllInfo();
    }
).on('click', '#btnEditPackaging', function () {
        showSupplyPackaging();
    }
).on('click', '#btnEditDeliveryDay', function () {
        showDivSelectEvening();
    }
).on('click', '#btnEditReceiverEmail', function () {
        showDivReceiverEmail();
    }
).on('click', '#btnEditReceiverAddress', function () {
        showDivPostcode();
    }
).on('click', '#btnEditReceiver', function () {
        showDivSelectReceiver();
    }
).on('click', '#btnEditSender3', function () {
        showDivWhomToSendParcel();
    }
).on('click', '#btnEditSenderCompany', function () {
        showDivSenderCompany();
    }
).on('click', '#btnEditSender', function () {
        showDivSenderDetails();
    }
).on('click', '#btnEditReceiverName', function () {
        showDivReceiverDetails();
    }
).on('click', '#btnEditPostcode', function () {
        showDivPostcode();
    }
).on('click', '#btnEditHousenumber', function () {
        showDivReceiverHousenumber();
    }
);


function init() {
    accessToken = getQuery('accessToken');
    lang = getQuery('lang');
    selectLanguage(lang);
    app = getQuery('app');

    var orderDid = getQuery('order');
    if (orderDid == null) {
        showParcelWeightLessThan10();
    } else {
        lang = getQuery('langCode');
        selectLanguage(lang);
        getOrderInfo(orderDid);
    }
    getProfile();
    setPlaceholder();
}

function setPlaceholder(){
    $("#txtSenderDetails").attr("placeholder", getLanguageValue("send.label.nopersonname"));
    $("#txtSenderCompany").attr("placeholder", getLanguageValue("send.label.nocompanyname"));
    $("#txtSenderCompanyAndName").attr("placeholder", getLanguageValue("send.label.nopersonname"));

    $("#txtReceiverCompanyAndName").attr("placeholder", getLanguageValue("send.label.receiverPersonName"));
    $("#txtReceiverCompany").attr("placeholder", getLanguageValue("send.label.receiverPersonCompany"));
    $("#txtReceiverName").attr("placeholder", getLanguageValue("send.label.receiverPersonName"));
    $("#txtPostCode").attr("placeholder", getLanguageValue("send.label.receiverPersonPostcode"));
    $("#txtHouseNumber").attr("placeholder", getLanguageValue("send.label.receiverPersonHouseNumber"));
    $("#txtHouseSuffix").attr("placeholder", getLanguageValue("send.label.receiverPersonHouseNumberSuffix"));
    $("#txtCityName").attr("placeholder", getLanguageValue("send.label.cityname"));
    $("#txtReceiverEmail").attr("placeholder", getLanguageValue("send.label.receiveremail"));
    $("#txtCity").attr("placeholder", getLanguageValue("send.label.receiverCity"));
    $("#txtStreet").attr("placeholder", getLanguageValue("send.label.receiverStreet"));
}

function getQuery(q) {
    return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function createMoreOrders(){
    if(app != null && app =='android'){
        JsHandler.homePage(' Hi ');
    }else{
        window.location = 'ios:showUserHome';
    }
}

function finalizeOrders(){
    if(app != null && app =='android'){
        JsHandler.payment(' Hi ');
    }else{
        window.location = '/Buurtmus/customerApp/payment?token=' + accessToken +'&lang='+lang;
    }
}

function showParcelWeightLessThan10() {
    hideAll();
    currentPage = "loadParcelWeightLessThan10";
    $('#divParcelWeightLessThan10').show();
    $('#footerParcelWeightLessThan10').show();
}


function showSupplyPackaging() {
    hideAll();
    currentPage = 'showSupplyPackaging';
    $('#divSupplyPackaging').show();
    $('#footerSupplyPackaging').show();

}


function showDivSelectShippingBox() {
    loadPackaging();
    hideAll();
    currentPage = 'showDivSelectShippingBox';
    $('#divSelectShippingBox').show();
    $('#footerSelectShippingBox').show();
}


function showDivWhomToSendParcel() {
    hideAll();
    currentPage = 'showDivWhomToSendParcel';
    $("#divSelectedBoxType").empty()
        .append('<label><a href="#" id="btnWhenToCollectParcelEditBox" class="fa fa-pencil"  aria-hidden="true"></a>' + selectedPackageName + '</label>');
    $('#divWhomToSendParcel').show();
    $('#footerWhomToSendParcel').show();
}


function showDivSenderDetails() {
    hideAll();
    currentPage = 'showDivSenderDetails';
    $("#txtSenderDetails").val(defaultPerson);
    $('#footerSenderDetails').show();
    $('#divSenderDetails').show();


}


function showDivSenderCompany() {
    hideAll();
    currentPage = 'showDivSenderCompany';
    $("#txtSenderCompany").val(defaultCompany);
    $('#divSenderCompany').show();
    $('#footerSenderCompany').show();
}

function getProfile() {
    var url = "/Buurtmus/rest/customerApp/getProfile/";

    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            "deviceUUID": "JSKLDFJLJEDDFGDGDFGDFGFLKSFSF",
            "appId": "CUSTOMER_APP",
            "accessToken": accessToken
        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            if (data != null) {
                if (data.personDTO != null) {

                    if(data.personDTO.senderReceiverDTO==null || data.personDTO.senderReceiverDTO.companyName == null || data.personDTO.senderReceiverDTO.companyName.length==0){
                    }
                    else{
                        defaultCompany = data.personDTO.senderReceiverDTO.companyName;
                    }

                    if(data.personDTO.firstName == null || data.personDTO.firstName.length==0){
                    }
                    else{
                        defaultPerson = data.personDTO.firstName;
                    }

                    if(data.personDTO.senderReceiverDTO==null || data.personDTO.senderReceiverDTO.knockFirst == null){
                        knockFirstSaved = false;
                    }
                }
            } else {
                alert("Profile details not found");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Profile details not found");

        }
    });
}


function showDivSenderHasName() {
    hideAll();
    currentPage = 'showDivSenderHasName';
    var hasValue = (senderCompany != null  && senderCompany != '');
    var senderCompanyStr = (senderCompany != null  && senderCompany != '') ? senderCompany : getLanguageValue("send.label.senderCompany");
    if(hasValue){
        $("#divInputSenderCompany").empty()
            .append('<label><a href="#" id="btnInputSenderCompany" class="fa fa-pencil"  aria-hidden="true"></a>' + senderCompanyStr + '</label>');
    }
    else{
        $("#divInputSenderCompany").empty()
            .append('<label><a href="#" id="btnInputSenderCompany" class="fa fa-pencil"  aria-hidden="true"></a><p style="color: #95b3d0">' + senderCompanyStr + '</p></label>');

    }
    $('#footerSenderHasName').show();
    $('#divSenderHasName').show();
}


function saveSenderDetails() {
    var upadteCompany = false;
    var upadtePerson = false;
    var company = '';
    var person = '';

    if(currentPage!=null && currentPage=='showDivSenderHasName'){
        if(defaultCompany==null && $("#txtSenderCompany").val().trim().length>0){
            upadteCompany = true;
            company=$("#txtSenderCompany").val();
        }
    }
    if(currentPage!=null && currentPage=='showSenderCompanyAndName'){
        if(defaultCompany==null && $("#txtSenderCompany").val().trim().length>0){
            upadteCompany = true;
            company=$("#txtSenderCompany").val();
        }
        if(defaultPerson==null && $("#txtSenderCompanyAndName").val().trim().length>0){
            upadtePerson = true;
            person=$("#txtSenderCompanyAndName").val();
        }
    }
    if(currentPage!=null && currentPage=='showDivSenderDetails'){
        if(defaultPerson==null && $("#txtSenderDetails").val().trim().length>0){
            upadtePerson = true;
            person=$("#txtSenderDetails").val();
        }
    }

    if(upadteCompany){
        saveCompany(company);
    }
    if(upadtePerson){
        saveName(person);
    }

    if(upadteCompany || upadtePerson){
        setTimeout(function(){ $('#saveSenderDetailsModal').modal("show"); }, 500);

    } else {
        showDivSelectReceiverImpl();
    }
}


function saveCompany(name) {
    var url = "/Buurtmus/rest/customerApp/updateProfile";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            "applicationCode": "CONSUMER_APP",
            "accessToken": accessToken,
            "lang": lang,
            "personDTO": {
                "senderReceiverDTO": {
                    "companyName": name
                }
            }
        }),
        contentType: "application/json; charset=UTF-8",

        success: function (data, textStatus, jqXHR) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Getting language of the user failed.");
        }

    });
}

function saveName(name) {
    var url = "/Buurtmus/rest/customerApp/updateProfile";

    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            "applicationCode": "CONSUMER_APP",
            "accessToken": accessToken,
            "lang": lang,
            "personDTO": {
                "firstName":name
            }
        }),
        contentType: "application/json; charset=UTF-8",

        success: function (data, textStatus, jqXHR) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Getting language of the user failed.");
        }

    });
}

function showDivSelectReceiver(boolFromBack) {
    if (boolFromBack) {
        showDivSelectReceiverImpl();
    } else {
        saveSenderDetails();
    }
}

function showDivSelectReceiverImpl() {
    hideAll();
    currentPage = 'showDivSelectReceiver';
    var htmlStr = '';
    if (senderCompany != null && senderCompany != "") {
        htmlStr = htmlStr + '<label><a href="#" id="btnEditSenderCompany" class="fa fa-pencil"  aria-hidden="true"></a>' + senderCompany + '</label>';
    }
    if (senderName != null && senderName != "") {
        htmlStr = htmlStr + '<label><a href="#" id="btnEditSender" class="fa fa-pencil"  aria-hidden="true"></a>' + senderName + '</label>';
    }

    $("#divInputSenderName").empty()
        .append(htmlStr);
    $('#footerSelectReceiver').show();
    $('#divSelectReceiver').show();
}

function showSenderCompanyAndName() {
    hideAll();
    currentPage = 'showSenderCompanyAndName';
    $("#txtSenderCompanyAndName").val(defaultPerson);
    var hasValue = (senderCompany != null && senderCompany != '');
    var senderCompanyStr = (senderCompany != null && senderCompany != '') ? senderCompany : getLanguageValue("send.label.senderCompany");
    if(hasValue){
        $("#divInputSenderCompanyAndName").empty()
            .append('<label><a href="#" id="btnInputSenderCompanyAndName" class="fa fa-pencil"  aria-hidden="true"></a>' + senderCompanyStr + '</label>');
    }
    else{
        $("#divInputSenderCompanyAndName").empty()
            .append('<label><a href="#" id="btnInputSenderCompanyAndName" class="fa fa-pencil"  aria-hidden="true"></a><p style="color: #95b3d0">' + senderCompanyStr + '</p></label>');
    }
    $('#footerSenderCompanyAndName').show();
    $('#divSenderCompanyAndName').show();
}


// --------------------------

function showReceiverCompany() {
    hideAll();
    currentPage = 'showReceiverCompany';
    $('#divReceiverCompany').show();
    $('#footerReceiverCompany').show();
}

function showDivReceiverHasName() {
    hideAll();
    currentPage = 'showDivReceiverHasName';
    var hasValue = (receiverPersonCompany != '');
    var receiverPersonCompanyStr = (receiverPersonCompany != '') ? receiverPersonCompany : getLanguageValue("send.label.receiverPersonCompany");
    if(hasValue){
        $("#divInputReceiverCompany").empty()
            .append('<label><a href="#" id="btnInputReceiverCompany" class="fa fa-pencil"  aria-hidden="true"></a>' + receiverPersonCompanyStr + '</label>');

    }
    else{
        $("#divInputReceiverCompany").empty()
            .append('<label><a href="#" id="btnInputReceiverCompany" class="fa fa-pencil"  aria-hidden="true"></a><p style="color: #95b3d0">' + receiverPersonCompanyStr + '</p></label>');
    }
    $('#footerReceiverHasName').show();
    $('#divReceiverHasName').show();
}


function showReceiverCompanyAndName() {
    hideAll();
    currentPage = 'showReceiverCompanyAndName';
    $("#divInputSenderCompanyAndName").empty()
        .append('<label><a href="#" id="divInputReceiverCompanyAndName" class="fa fa-pencil"  aria-hidden="true"></a>' + receiverPersonCompany + '</label>');
    $('#footerReceiverCompanyAndName').show();
    $('#divReceiverCompanyAndName').show();
}


// --------------------------


function showDivReceiverDetails() {
    //var senderNameStr;

    hideAll();
    currentPage = 'showDivReceiverDetails';
    $('#footerReceiverDetails').show();

    //if (senderName == null || senderName.trim().length == 0) {
    //    senderNameStr = '<p style="color: #95b3d0">'+getLanguageValue("send.label.senderName")+'</p>';
    //} else {
    //    senderNameStr = senderName;
    //}

    $("#divReceiverDetails").empty()
        //.append('<div class="info">' +
        //'    <label><a href="#" id="btnEditSender2" class="fa fa-pencil" aria-hidden="true"></a> ' + senderNameStr +
        //'  </label>' +
        //'  </div>' +
        .append(
        '  <div class="get-started">' +
        '  <div class="bubble default">' +
        '  <p>' + getLanguageValue("send.label.instruction42") + '</p>' +
        ' </div>' +
        '  <div class="bubble">' +
        '   <p>' + getLanguageValue("send.label.instruction43") + '<br/>Elisa de Groot <br/>Optima</p>' +
        ' </div>' +
        '</div>')
        .show();

    if (receiverPersonName != null && receiverPersonName.trim().length > 1) {
        $("#txtReceiverName").val(receiverPersonName)
    }
}

function showDivPostcode() {
    hideAll();

    //if( isMobile.iOS() )
    //    $("#txtPostCode").attr('type', 'number');

    currentPage = 'showDivPostcode';
    var htmlStr = '';
    if (receiverPersonCompany != null && receiverPersonCompany.trim().length > 1) {
        htmlStr = htmlStr + '<label><a href="#" id="btnEditReceiverCompany" class="fa fa-pencil"  aria-hidden="true"></a>' + receiverPersonCompany + '</label>';
    }
    else{
        htmlStr = htmlStr + '<label><a href="#" id="btnEditReceiverCompany" class="fa fa-pencil"  aria-hidden="true"></a><p style="color: #95b3d0">' + getLanguageValue("send.label.receiverPersonCompany") + '</p></label>';
    }
    if (receiverPersonName != null && receiverPersonName.trim().length > 1) {
        htmlStr = htmlStr + '<label><a href="#" id="btnEditReceiverName" class="fa fa-pencil"  aria-hidden="true"></a>' + receiverPersonName + '</label>';
    }
    else{
        htmlStr = htmlStr + '<label><a href="#" id="btnEditReceiverName" class="fa fa-pencil"  aria-hidden="true"></a><p style="color: #95b3d0">' + getLanguageValue("send.label.receiverPersonName") + '</p></label>';
    }

    $("#btnInputReceiver").empty()
        .append(htmlStr);

    $('#divPostcode').show();
    if (receiverPersonPostcode != null && receiverPersonPostcode.trim().length > 1) {
        $("#txtPostCode").val(receiverPersonPostcode)
    }
    $('#footerReceiverPostCode').show();

}

function showDivReceiverHousenumber() {
    hideAll();
    currentPage = 'showDivReceiverHousenumber';
    $('#divHousenumber').show();
    $('#footerReceiverHousenumber').show();


    if (receiverPersonHouseNumber != null && receiverPersonHouseNumber.trim().length > 1) {
        $("#txtHouseNumber").val(receiverPersonHouseNumber)
    }

}

function showDivReceiverHasHouseSuffix() {
    hideAll();
    currentPage = 'showDivReceiverHasHouseSuffix';
    $('#divReceiverHasHouseSuffix').show();
    $('#footerReceiverHasHouseSuffix').show();


}

function showDivReceiverHouseSuffix() {
    hideAll();
    currentPage = 'showDivReceiverHouseSuffix';
    $('#divReceiverHouseSuffix').show();
    $('#footerReceiverHouseSuffix').show();
    if (receiverPersonHouseNumberSuffix != null && receiverPersonHouseNumberSuffix.trim().length > 1) {
        $("#txtHouseSuffix").val(receiverPersonHouseNumberSuffix)
    }
}


function showDivReceiverAddress() {
    hideAll();
    if(!isBkBtn) previousPages['showDivReceiverAddress'] = currentPage;
    currentPage = 'showDivReceiverAddress';
    $('#divReceiverAddress').show();
    $('#footerReceiverAddress').show();

}

function showDivPrealert() {
    hideAll();
    currentPage = 'showDivPrealert';
    $('#divPrealert').show();
    $('#footerPrealert').show();

}

function showDivMailBoxConfirm() {
    hideAll();
    if(!isBkBtn) previousPages["showDivMailBoxConfirm"] = currentPage;
    currentPage = 'showDivMailBoxConfirm';
    $('#divMailBoxConfirm').show();
    $('#footerMailBoxConfirm').show();
}

function showDivCityName() {
    hideAll();
    if(!isBkBtn) previousPages["showDivCityName"] = currentPage;
    currentPage = 'showDivCityName';
    $('#divCityName').show();
    $('#footerCityName').show();
}

function showDivReceiverEmail() {
    hideAll();
    currentPage = 'showDivReceiverEmail';
    $('#divReceiverEmail').show();
    $('#footerReceiverEmail').show();

    if (receiverPersonEmail != null && receiverPersonEmail.trim().length > 1) {
        $("#txtReceiverEmail").val(receiverPersonEmail)
    }
}

function showDivSelectEvening() {
    hideAll();
    currentPage = 'showDivSelectEvening';
    getPickupInfo();

}


function showDivBMNumber() {
    hideAll();

    var shortBMNumber = orderNumber;
    shortBMNumber = shortBMNumber.replace("BM", "");
    shortBMNumber = shortBMNumber.replace(/^0+/, '');
    shortBMNumber = "BM" + shortBMNumber;

    currentPage = 'showDivBMNumber';
    $('#divBMNumber').empty().append('<div class="bubble default">' +
        ' <p>' + getLanguageValue("send.label.instruction44") +
        '  <br>' +
        ' <strong>' + shortBMNumber + '</strong>' +
        ' </p>' +
        ' </div>' +
        '   <div class="infography">' +
        ' <p class="bm-no">' + shortBMNumber + '</p>' +
        ' <img src="/Buurtmus/resources/core-customerApp/images/ill_07_nocode.svg">' +
        '</div>').show();
    $('#footerBMNumber').show();
}

function loadKnockFirst(){
    hideAll();
    currentPage = "loadKnockFirst";
    $("#divKnockFirst").show();
    $("#footerKnockFirst").show();
}

function showDivSentSuccess() {
    hideAll();
    currentPage = 'showDivSentSuccess';
    $('#divSentSuccess').show();
    $('#footerSentSuccess').show();
}


function showDivAddressNotFound() {
    hideAll();
    currentPage = 'showDivAddressNotFound';
    $('#divAddressNotFound').show();
    $('#footerAddressNotFound').show();
}
function showDivCity() {
    hideAll();
    currentPage = 'showDivCity';
    $('#divCity').show();
    $('#footerCity').show();
}

function showDivStreet() {
    hideAll();
    currentPage = 'showDivStreet';
    var houseSuffix = "";
    if (receiverPersonHouseNumberSuffix != null && receiverPersonHouseNumberSuffix.trim().length > 1) {
        houseSuffix=receiverPersonHouseNumberSuffix;
    }
    $('#divPostalCodeHouseNo').html( receiverPersonPostcode.toUpperCase() + ' '+ receiverPersonHouseNumber + houseSuffix);
    $('#divStreet').show();
    $('#footerStreet').show();
}


function saveSenderDetailsModalClose(){
    showDivSelectReceiverImpl();
    $("#saveSenderDetailsModal").modal('hide');
}

function saveKnockFirstClose(){
    $("#saveSenderDetailsModal").modal('hide');

    if(hitFinalizeOrders)
        finalizeOrders();
    else
        createMoreOrders();
}

function hideAll() {
    $('#divSupplyPackaging').hide();
    $('#footerSupplyPackaging').hide();
    $('#divParcelWeightLessThan10').hide();
    $('#footerParcelWeightLessThan10').hide();
    $('#divSelectShippingBox').hide();
    $('#footerSelectShippingBox').hide();
    $('#divWhomToSendParcel').hide();
    $('#footerWhomToSendParcel').hide();
    $('#footerSenderDetails').hide();
    $('#divSenderDetails').hide();
    $('#footerReceiverDetails').hide();
    $('#divReceiverDetails').hide();

    $('#divPostcode').hide();
    $('#footerReceiverPostCode').hide();
    $('#divHousenumber').hide();
    $('#footerReceiverHousenumber').hide();
    $('#divReceiverHasHouseSuffix').hide();
    $('#footerReceiverHasHouseSuffix').hide();
    $('#divReceiverHouseSuffix').hide();
    $('#footerReceiverHouseSuffix').hide();
    $('#divPrealert').hide();
    $('#footerPrealert').hide();
    $('#divReceiverEmail').hide();
    $('#footerReceiverEmail').hide();
    $('#divSelectEvening').hide();
    $('#footerSelectEvening').hide();
    $('#divAllInfo').hide();
    $('#footerAllInfo').hide();
    $('#divBMNumber').hide();
    $('#footerBMNumber').hide();
    $('#divSentSuccess').hide();
    $('#footerSentSuccess').hide();
    $('#divReceiverAddress').hide();
    $('#footerReceiverAddress').hide();
    $('#divSelectReceiver').hide();
    $('#footerSelectReceiver').hide();
    $('#divSenderCompany').hide();
    $('#footerSenderCompany').hide();
    $('#divSenderHasName').hide();
    $('#footerSenderHasName').hide();
    $('#divSenderCompanyAndName').hide();
    $('#footerSenderCompanyAndName').hide();

    $('#divReceiverCompany').hide();
    $('#footerReceiverCompany').hide();
    $('#footerReceiverHasName').hide();
    $('#divReceiverHasName').hide();
    $('#footerReceiverCompanyAndName').hide();
    $('#divReceiverCompanyAndName').hide();

    $('#footerAddressNotFound').hide();
    $('#divAddressNotFound').hide();

    $('#footerStreet').hide();
    $('#divStreet').hide();
    $('#footerCity').hide();
    $('#divCity').hide();

    $("#divReceiverEmailIncorrect").hide();
    $("#divpPostalcodeIncorrect").hide();
    $("#divHouseNumberIncorrect").hide();

    $('#divMailBoxConfirm').hide();
    $('#divCityName').hide();

    $('#footerMailBoxConfirm').hide();
    $('#footerCityName').hide();

    $("#divKnockFirst").hide();
    $("#footerKnockFirst").hide();

}

function getMatchStr(inStr){
    var ouStr;
    ouStr = inStr.trim().replace(/\./g ,'').toLowerCase();
    ouStr = ouStr.trim().replace(/\s/g ,'').toLowerCase();
    return ouStr;
}


function loadPackaging() {
    $('#divPackages').empty();
    var url = "/Buurtmus/rest/customerApp/packageTypes/";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            "deviceUUID": "123",
            "appId": "CONSUMER_APP",
            "accessToken": accessToken,
            "lang": lang
        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            if (data != null && data.length != 0) {

                data.forEach(function (val) {
                    var value = val.did + '#' + val.name + '#' + val.price;

                    $('#divPackages').append("<div class=\"package\">" +
                        "<a class=\"packageClick\" id=\"" + value + "\" href=\"#\">\n" +
                        "    <div class=\"box\">\n" +
                        "        <img src=\"" + customerAppImages + "/icon-package-" + val.productCode + ".svg\"/>\n" +
                        "    </div>\n" +
                        "    <div class=\"action\" style=\"float:right\">\n" +
                        "        <img src=\"/Buurtmus/resources/core-customerApp/images/list_arrow.svg\">\n" +
                        "        <p><span>&#8364;</span>"+ getConvertedCurrency(val.price) +"\n" +
                        "        </p>\n" +
                        "    </div>\n" +
                        "    <div class=\"info\" style='height:100%; float:right'>\n" +
                        "        <h3 style=\"text-align:left\">" + val.name + "</h3>\n" +
                        "        <p style=\"text-align:left\">" + val.dimension + "</p>\n" +
                        "    </div>\n" +
                        "</a>\n" +
                        "</div>"
                    );

                });
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Loading packaging types failed.");
        }
    });
}


function getReceiverPersonAddress() {
    var url = "/Buurtmus/rest/customerApp/getAddress/";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            loginDetails: {
                appId: "CONSUMER_APP"
            },
            address: {
                postalCode: receiverPersonPostcode,
                houseNumber: receiverPersonHouseNumber
            }

        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            if (data != null) {
                receiverPersonStreet = data.street;
                receiverPersonCity = data.city;

                var address = '<div class="get-started">' +
                    '<div class="bubble default">' +
                    '<p>' + getLanguageValue("send.label.instruction54") + '</p><p>';
                //if (receiverPersonCompany != null) {
                //    address = address + receiverPersonCompany + '<br>';
                //}
                //if (receiverPersonName != null) {
                //    address = address + receiverPersonName + '<br>';
                //}
                receiverPersonHouseNumberSuffix = receiverPersonHouseNumberSuffix == null ? '' : receiverPersonHouseNumberSuffix;

                address = address + receiverPersonStreet + ' ' + receiverPersonHouseNumber + ' ' + receiverPersonHouseNumberSuffix + '<br>';
                address = address + receiverPersonPostcode + ' ' + receiverPersonCity + '<br>';
                address = address + '</p></div> </div>';

                $("#divReceiverAddress").empty()
                    .append(address);

                showDivReceiverAddress();
            } else {

                //showDivAddressNotFound();
                showDivMailBoxConfirm();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showDivAddressNotFound();
        }
    });
}


function getPickupInfo() {
    var url = "/Buurtmus/rest/customerApp/getPickupInfo/";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            "loginDetails": {
                "deviceUUID": "123",
                "appId": "CONSUMER_APP",
                "accessToken": accessToken

            },
            "issueOrderNumber": (orderNumber == null) ? "Y" : "N",
            "issuePaymentReferenceNumber": "N"
        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {

            possibleDates = data.possibleDates;
            if (orderNumber == null) {
                orderNumber = data.orderNumber;
            }

            var day1 = null;
            var date1 = null;
            var day2 = null;
            var date2 = null;
            var index = 0;

            $.each(data.possibleDates, function (key, value) {

                if (value.orderAcceptancePossibleFlag != 'OFF') {
                    index++;
                    if (index == 1) {
                        day1 = getDay(value.dayCode);
                        date1 = value.date;
                        if (value.orderAcceptancePossibleFlag == "MAYBE") {
                            actionDateUnsureFlg = 1;
                        }
                    }
                    if (index == 2) {
                        day2 = getDay(value.dayCode);
                        date2 = value.date;
                    }
                }

            });

            var firstPickupOptionStirng = "";

            if (new Date(date1).getDate() == new Date().getDate()) {
                firstPickupOptionStirng = getLanguageValue('send.label.tonight');
            } else {
                firstPickupOptionStirng = day1 + " " + getLanguageValue('send.label.evening') + ", " + date1;
            }
            var secondPickupOptionStirng = day2 + " " +  getLanguageValue('send.label.evening') + ", " + date2;

            selectedPickupFirst = date1;
            selectedPickupSecond = date2;
            selectedDayPickupFirst = firstPickupOptionStirng;
            selectedDayPickupFirstLong = day1 + " " +  getLanguageValue('send.label.evening') + ", " + date1;
            selectedDayPickupSecond = secondPickupOptionStirng;

            $('#btnDeliveryDates').empty()
                .append('<li><a href="#" id="btnFirstDay">' + firstPickupOptionStirng + '</a></li>')
                .append('<li><a href="#" id="btnSecondDay">' + secondPickupOptionStirng + '</a></li>');



            if(lang == null || lang == 'nl'){
                $('#imgPickupBanner').attr('src','/Buurtmus/resources/core-customerApp/images/ill_09_DU.svg');

            }else{
                $('#imgPickupBanner').attr('src','/Buurtmus/resources/core-customerApp/images/ill_09_EN.svg');

            }

            $('#divSelectEvening').show();
            $('#footerSelectEvening').show();




        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Loading possible pickup times failed.");
        }
    });
}


function getDay(code) {
    if (code == 'MON') {
        return getLanguageValue("send.label.monday");
    } else if (code == 'TUE') {
        return getLanguageValue("send.label.tuesday");
    } else if (code == 'WED') {
        return getLanguageValue("send.label.wednesday");
    } else if (code == 'THU') {
        return getLanguageValue("send.label.thursday");
    } else if (code == 'FRI') {
        return getLanguageValue("send.label.friday");
    } else if (code == 'SAT') {
        return getLanguageValue("send.label.saturday");
    } else if (code == 'SUN') {
        return getLanguageValue("send.label.sunday");
    }

}


function createOrders() {

    // PostNL DPD
    var courierCode = "DPD";
    var a = getMatchStr(receiverPersonStreet)=="postbox";
    var b = getMatchStr(receiverPersonStreet)=="postbus";
    var c = getMatchStr(receiverPersonStreet)=="pobox";

    if (a || b || c){
        courierCode="PostNL";
    }

    var orderFlagString = null;
    if (selectedPackageId != -1) {
        orderFlagString = [{"code": "DELIVER_PACKAGING", "attrib1": selectedPackageId}];
    }

    var mainJson = {
        "loginDetails": {
            "deviceUUID": "123",
            "appId": "CONSUMER_APP",
            "accessToken": accessToken

        },
        "orders": [{
            "did": orderDID,
            "type": "PSN",
            "courierCode": courierCode,
            "actionDate": selectedDate + '',
            "createdTimestamp": getNow() + '',
            "actionDateUnsureFlag": actionDateUnsureFlg,
            "weight": "1",
            "weightUnit": "kg",
            "number": orderNumber,
            "orderFlags": orderFlagString,
            "currencyCode": "EUR",
            "orderDetails": [{
                "component": "PICKUP",
                "paymentReference": "",
                "method": "",
                "option": "",
                "party": "SENDER",
                "amount": "4.09",
                "amountIncludingVAT": "4.95",
                "paymentStatus": "100"
            }],
            "receiver": {
                "firstName": receiverPersonName,
                "lastName": null,
                "companyName": receiverPersonCompany,
                "email": receiverPersonEmail,
                "type": "PERSONAL",
                "address": {
                    "postalCode": receiverPersonPostcode,
                    "houseNumber": receiverPersonHouseNumber,
                    "houseNumberPrefix": receiverPersonHouseNumberSuffix,
                    "street": receiverPersonStreet,
                    "city": receiverPersonCity,
                    "countryCode": "NL"
                }
            },
            "senderName": senderName,
            "senderCompany": senderCompany
        }]
    };


    if (selectedPackageId != -1) {
        var jsonPackaging = {};

        jsonPackaging.component = "PACKAGING";
        jsonPackaging.party = "SENDER";
        jsonPackaging.amount = (selectedPackagePrice != null) ? selectedPackagePrice - ((selectedPackagePrice * 0.21) / 1.21).toFixed(2) : 0.00;
        jsonPackaging.amountIncludingVAT = (selectedPackagePrice != null) ? selectedPackagePrice : 0.00;
        jsonPackaging.paymentStatus = "100";
        mainJson.orders[0].orderDetails.push(jsonPackaging);
    }

    var url = "/Buurtmus/rest/customerApp/createOrders/";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify(mainJson),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            if (data.responseStatus != null) {

                if (data.responseStatus.responseCode == '001'){
                    if (data != null && data.orders.length != 0) {
                        data.orders.forEach(function (val) {

                        });
                    }
                    showDivSentSuccess();

                } else if (data.responseStatus.responseCode != '003'){
                    alert('Order creation failed with error code: ' + data.responseStatus.responseCode);
                }

            } else {
                alert("Order creation failed.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Order creation failed.");
        }
    });
}


function getConvertedCurrency(val) {

    if (val != null) {
        var value = parseFloat(val);
        value = value.toFixed(2);

        if (value.indexOf(".") >= 0) {
            value = value.replace(".", ",");
        } else {
            value = value + ',00';
        }

        return value;
    } else {
        return '0,00';
    }

}

function getConvertedCurrency(val) {
    if (val != null) {
        var value = parseFloat(val);
        value = value.toFixed(2);

        if (value.indexOf(".") >= 0) {
            value = value.replace(".", ",");
        } else {
            value = value + ',00';
        }
        return value;
    } else {
        return '0,00';
    }
}

function validatePostalCode(postalCode) {
    var regxp = /^\d{4}[A-Z]{2}$/;
    return regxp.test(postalCode);
}


function showDivAllInfo() {
    hideAll();
    currentPage = 'showDivAllInfo';
    receiverPersonHouseNumberSuffix = receiverPersonHouseNumberSuffix == null ? '' : receiverPersonHouseNumberSuffix;
    receiverPersonEmail = receiverPersonEmail == null ? '' : receiverPersonEmail;
    selectedPackagePrice = selectedPackagePrice == null ? '0,00' : selectedPackagePrice;

    var senderStr;
    var receiverStr;

    if (senderCompany != null && !senderCompany == '' && senderName != null && !senderName == '') {
        senderStr = '<label class="address"><a href="#" class="fa fa-pencil" id="btnEditSender3" aria-hidden="true"></a>' + senderCompany + '<br/>' + senderName + '</label>';
    } else if (senderCompany != null && !senderCompany == '' && (senderName == null || senderName == '')) {
        senderStr = '<label><a href="#" class="fa fa-pencil" id="btnEditSender3" aria-hidden="true"></a>' + senderCompany + '</label>';
    } else if (senderName != null && !senderName == '' && (senderCompany == null || senderCompany == '')) {
        senderStr = '<label><a href="#" class="fa fa-pencil" id="btnEditSender3" aria-hidden="true"></a>' + senderName + '</label>';
    } else {
        senderStr = '<label><a href="#" class="fa fa-pencil" id="btnEditSender3" aria-hidden="true"></a><p style="color: #95b3d0">'+getLanguageValue("send.label.senderInfo")+'</p></label>';
    }

    if (receiverPersonCompany != null && !receiverPersonCompany == '' && receiverPersonName != null && !receiverPersonName == '') {
        receiverStr = '<label class="address"><a href="#" class="fa fa-pencil" id="btnEditReceiver" aria-hidden="true"></a>' + receiverPersonCompany + '<br/>' + receiverPersonName + '</label>';
    } else if (receiverPersonCompany != null && !receiverPersonCompany == '' && (receiverPersonName == null || receiverPersonName == '')) {
        receiverStr = '<label><a href="#" class="fa fa-pencil" id="btnEditReceiver" aria-hidden="true"></a>' + receiverPersonCompany + '</label>';
    } else if (receiverPersonName != null && !receiverPersonName == '' && (receiverPersonCompany == null || receiverPersonCompany == '')) {
        receiverStr = '<label><a href="#" class="fa fa-pencil" id="btnEditReceiver" aria-hidden="true"></a>' + receiverPersonName + '</label>';
    } else {
        receiverStr = '<label><a href="#" class="fa fa-pencil" id="btnEditReceiver" aria-hidden="true"></a><p style="color: #95b3d0">'+getLanguageValue("send.label.receiverInfo")+'</p></label>';
    }

    var htmlStr = '<div class="get-started">' +
        '<div class="bubble default">' +
        '<p>' + getLanguageValue("send.label.instruction45") + '</p>' +
        '</div>' +
        '</div>' +
        senderStr +
        '<label class="non-edit"><span>' + getLanguageValue("send.label.shipment") + '</span> &#8364; ' + getConvertedCurrency(4.95) + '</label>' +
        receiverStr +
        '<label class="address"><a href="#" class="fa fa-pencil"  id="btnEditReceiverAddress" aria-hidden="true"></a>'
        + receiverPersonStreet + ' ' + receiverPersonHouseNumber + ' ' + receiverPersonHouseNumberSuffix + '<br>'
        + receiverPersonPostcode + ' ' + receiverPersonCity + '</label>';

    if (receiverPersonEmail != null && receiverPersonEmail.length > 1) {
        htmlStr = htmlStr + '<label><a href="#" class="fa fa-pencil" id="btnEditReceiverEmail" aria-hidden="true"></a>' + receiverPersonEmail + '</label>';
    } else {
        htmlStr = htmlStr + '<label><a href="#" class="fa fa-pencil" id="btnEditReceiverEmail" aria-hidden="true"></a><p style="color: #95b3d0">'+getLanguageValue("send.label.receiveremail")+'</p></label>';
    }

    htmlStr = htmlStr + '<label><a href="#" class="fa fa-pencil" id="btnEditDeliveryDay" aria-hidden="true"></a>' + selectedDayStringLong + '</label>' +
        '<label class="non-edit"><span>' + getLanguageValue("send.label.packaging") + '</span> &#8364; ' + getConvertedCurrency(selectedPackagePrice) + '</label>' +
        '<label><a href="#" class="fa fa-pencil"  id="btnEditPackaging"  aria-hidden="true"></a>' + selectedPackageName + '</label> ';


    $('#divAllInfo').empty()
        .append(htmlStr)
        .show();
    $('#footerAllInfo').show();
}

function getOrderInfo(orderDid) {
    var url = "/Buurtmus/rest/customerApp/getOrderDetails/";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({"did": orderDid}),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            if (data != null) {
                var receiver = data.receiver;
                var sender = data.sender;
                var orderFlags = data.orderFlags;
                isExistingOrder = true;
                var orderDetails = data.orderDetails;

                orderNumber = data.number;
                selectedDate = data.actionDate;
                selectedDay = toTitleCase(data.actionDay.toLowerCase());
                selectedDayStringLong = selectedDay + ' evening, ' + selectedDate;
                orderDID = data.did;

                receiverPersonName = receiver.firstName;
                receiverPersonPostcode = receiver.address.postalCode;
                receiverPersonHouseNumber = receiver.address.houseNumber;
                receiverPersonHouseNumberSuffix = receiver.address.houseNumberPrefix;
                receiverPersonStreet = receiver.address.street;
                receiverPersonCity = receiver.address.city;
                receiverPersonCompany = receiver.companyName;
                receiverPersonEmail = receiver.email;

                senderName = data.senderName;
                senderCompany = data.senderCompany;
                possibleDates = null;

                if (senderName != null && senderName.trim().length > 1) {
                    $("#txtSenderDetails").val(senderName);
                    $("#txtSenderCompanyAndName").val(senderName);
                    $("#txtSenderCompany").val(senderCompany);
                }

                if (orderDetails.length > 0) {
                    $.each(orderDetails, function (index, value) {
                        if (orderDetails[index].component == "PACKAGING") {
                            selectedPackageId = orderDetails[index].packagingDid;
                            if (selectedPackageId != -1) {
                                selectedPackageName = orderDetails[index].packagingName;
                                selectedPackagePrice = orderDetails[index].amountIncludingVAT;
                                selectedPackagePrice = parseFloat(selectedPackagePrice).toFixed(2);
                            }
                        }
                    });
                }

                actionDateUnsureFlg = 0;
                showDivAllInfo();
            } else {

                alert("error createOrders ");
                if(app != null && app =='android'){
                    JsHandler.homePage(' Hi ');
                }else{
                    window.location = 'ios:showUserHome';
                }

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Getting order details failed.");
            if(app != null && app =='android'){
                JsHandler.homePage(' Hi ');
            }else{
                window.location = 'ios:showUserHome';
            }

        }
    });
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


function changeLanguage() {
    if (lang == 'nl') {
        lang = 'en';
    } else {
        lang = 'nl';
    }

    selectLanguage(lang);
    changeUserLang(lang);
}


function changeUserLang(lang) {
    var url = "/Buurtmus/rest/customerApp/changeLanguage/";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            loginDetails: {
                "deviceUUID": "123",
                "appId": "CONSUMER_APP",
                "accessToken": accessToken
            },
            languageCode: lang
        }),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Changing language failed.");
        }
    });
}


function selectLanguage(lang) {
    if (lang == 'en') {
        languageSpecificObject = languageSpecificObject_en;
    } else {
        languageSpecificObject = languageSpecificObject_nl;

    }
    successLanguageCallback();

}


function getUserLang() {
    var url = "/Buurtmus/rest/customerApp/getUserLang/";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify(
            {
                "deviceUUID": "123",
                "appId": "CONSUMER_APP",
                "accessToken": accessToken
            }
        ),
        contentType: "application/json; charset=UTF-8",
        success: function (data, textStatus, jqXHR) {
            lang = data.lang;
            selectLanguage(data.lang)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Getting language of the user failed.");
        }
    });

}

function saveKnockFirst(isKnockFirst)  {
    var url = "/Buurtmus/rest/customerApp/updateProfile";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({
            "applicationCode": "CONSUMER_APP",
            "accessToken": accessToken,
            "lang": lang,
            "personDTO": {
                "senderReceiverDTO": {
                    "knockFirst": isKnockFirst
                }
            }
        }),
        contentType: "application/json; charset=UTF-8",

        success: function (data, textStatus, jqXHR) {
            setTimeout(function(){ $('#saveKnockFirstModal').modal("show"); }, 500);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Getting language of the user failed.");
        }

    });
}

var languageSpecificObject_en = {
    "languageSpecifications": [
        {
            "send.label.instruction1": "Does your parcel weigh less than 10 kg and is it no longer than 70 cm?",
            "send.label.instruction2": ".. and do you want to send the parcel within the Netherlands ?",
            "send.label.instruction3": "Do you wish to order packaging material for this shipment?",
            "send.label.instruction4": "Our delivery person will take it along when doing the pickup.",
            "send.label.instruction5": "Select a shipping box or bag.",
            "send.label.instruction6": "Do you wish to send your parcel as a person or as a company?",
            "send.label.instruction7": "What is the name of the company from which you wish to send this parcel?",
            "send.label.instruction8": "Do you also wish to add a sender's name?",
            "send.label.instruction9": "Which is the sender's name you wish to use?",
            "send.label.instruction10": "For Example: <br/>your name <br/>the department name",
            "send.label.instruction11": "Which is the sender's name you wish to use?",
            "send.label.instruction12": "For Example: <br/>your name <br/>the department name",
            "send.label.instruction13": "Do you wish to send your parcel to a person or to a company?",
            "send.label.instruction14": "What is the name of the company to which you wish to send this parcel?",
            "send.label.instruction15": "Do you also wish to add the name of the receiving person?",
            "send.label.instruction16": "What is the name of the receiving person?",
            "send.label.instruction17": "Bijvoorbeeld: <br/>Elisa <br/>Elisa de Groot <br/>Mrs. de Groot",
            "send.label.instruction18": "What is the postcode of the receiver?",
            "send.label.instruction19": "What is the housenumber? <br/>(without suffix) ...",
            "send.label.instruction20": "Does this housenumber have a suffix?",
            "send.label.instruction21": "What is the suffix to the house number?",
            "send.label.instruction22": "We could not find an address for the postcode / housenumber combination  you have entered. Are you sure you entered the correct information?",
            "send.label.instruction23": "What is the streetname?",
            "send.label.instruction24": "What is the name of the city?",
            "send.label.instruction25": "We can send the receiver a prealert with the expected delivery timeframe.",
            "send.label.instruction26": "For this, we need the email address of the receiver. Do you have this?",
            "send.label.instruction27": "Enter the email address of the receiver. It will only be used for sending a prealert (just press next if you can't find the email address)",
            "send.label.instruction28": "We can send the receiver a prealert with the expected delivery timeframe.",
            "send.label.instruction29": "For this, we need the email address of the receiver. Do you have this?",
            "send.label.instruction30": "Write this number on your parcel:",
            "send.label.instruction31": "Your order has been created successfully.",
            "send.label.instruction32": "No need for you to print a label, we will do that for you.",
            "send.label.instruction33": "I don't need  packaging after all",
            "send.label.instruction34": "main menu",
            "send.label.instruction35": "Sorry, in that case we cannot pickup your parcel",
            "send.label.instruction36": "finalize order(s)",
            "send.label.instruction37": "create more orders",
            "send.label.instruction38": "continue",
            "send.label.instruction39": "confirm",
            "send.label.instruction40": "Every evening between 7 and 9 we are in your neighbourhood..",
            "send.label.instruction41": "On which evening do you want us to pickup your parcel?",
            "send.label.instruction42": "What is the name of the receiving person?",
            "send.label.instruction43": "For Example",
            "send.label.instruction44": "Write this number on your parcel:",
            "send.label.instruction45": "Double check your order.",
            "send.label.instruction47": "Is this your address?",
            "send.label.instruction48": "The verification code you entered is not correct.",
            "send.label.instruction49": "The housenumber you entered is invalid.",
            "send.label.instruction50": "The Postcode you entered is invalid.",
            "send.label.instruction51": "The password you entered is invalid.",
            "send.label.instruction52": "The email address you entered is invalid.",
            "send.label.instruction53": "There is already an account for this email address.",
            "send.label.instruction55": "... or PO Box number",
            "send.label.instruction56": "The postbox number you entered is invalid.",
            "send.label.instruction57": "Does your parcel go to a PO Box?",
            "send.label.instruction58": "What is the name of the city?",
            "send.label.instruction59": "The housenumber or pobox you entered is invalid.",
            "send.label.instruction60": "We have saved your sender details. You can always change it in your profile.",
            "send.label.instruction61": "OK, I get it",
            "send.label.instruction62": "Please enter the streetname",
            "send.label.instruction63": "Please enter the city",
            "send.label.instruction64": "We always get the parcels in the evening.",
            "send.label.instruction65": "Do you want to knock that first (softly) on the door or window?",
            "send.label.instruction66": "We have saved your preference. You can always change it in your profile.",
            "send.label.instruction67": "Okay, I understand",
            "send.label.postbox":"Postbox",
            "send.label.yes": "yes",
            "send.label.no": "no",
            "send.label.company": "company",
            "send.label.person": "person",
            "send.label.tonight": "tonight",
            "send.label.evening": "evening",
            "send.label.monday": "Monday",
            "send.label.tuesday": "Tuesday",
            "send.label.wednesday": "Wednesday",
            "send.label.thursday": "Thursday",
            "send.label.friday": "Friday",
            "send.label.saturday": "Saturday",
            "send.label.sunday": "Sunday",
            "send.label.nobox": "No packaging",
            "send.label.shipment": "Shipment",
            "send.label.packaging": "Packaging",
            "send.label.cancelorder": "Cancel Order",
            "send.label.header.sendparcel": "Send Parcel",
            "send.label.instruction54": "Is the delivery address:",
            "send.label.nocompanyname": "Your company name (optional)",
            "send.label.nopersonname": "Your name",
            "send.label.senderName": "Your name",
            "send.label.senderCompany": "Your company",
            "send.label.senderInfo": "Your name and company",
            "send.label.receiverInfo": "Receiver's (company)name",
            "send.label.receiverPersonName": "Receiver's name",
            "send.label.receiverPersonCompany": "Receiver's company name",
            "send.label.receiverPersonPostcode": "Receiver's postcode",
            "send.label.receiverPersonHouseNumber": "House number or Postbox",
            "send.label.receiverPersonHouseNumberSuffix": "Suffix",
            "send.label.receiverStreet": "Streetname",
            "send.label.receiverCity": "City",
            "send.label.receiveremail": "Receiver's email address (optional)",
            "send.label.cityname": "City"
        }
    ]
};

var languageSpecificObject_nl = {
    "languageSpecifications": [
        {
            "send.label.instruction1":"Weegt je pakje minder dan 10 kg en is het niet langer dan 70 cm ...",
            "send.label.instruction2":"... en wil je het pakje versturen binnen Nederland?",
            "send.label.instruction3":"Wil je verpakking bestellen voor deze verzending?",
            "send.label.instruction4":"Onze bezorger neemt deze dan mee bij het ophalen.",
            "send.label.instruction5":"Kies hieronder een doos of verzendzak.",
            "send.label.instruction6":"Wil je dit pakje versturen vanuit een bedrijf of vanuit een persoon?",
            "send.label.instruction7":"Vanuit welke bedrijfsnaam wil je dit pakje versturen?",
            "send.label.instruction8":"Wil je ook nog je naam toevoegen?",
            "send.label.instruction9":"Vanuit welke naam wil je dit pakje versturen?",
            "send.label.instruction10":"Bijvoorbeeld: <br/>je naam <br/>de afdelingsnaam",
            "send.label.instruction11":"Vanuit welke naam wil je dit pakje versturen?",
            "send.label.instruction12":"Bijvoorbeeld: <br/>je naam <br/>de afdelingsnaam",
            "send.label.instruction13":"Wil je dit pakje versturen naar een bedrijf of naar een persoon?",
            "send.label.instruction14":"Wat is de naam van het bedrijf waar je dit pakje naar toe stuurt?",
            "send.label.instruction15":"Wil je ook de naam van de ontvanger toevoegen?",
            "send.label.instruction16":"Wat is de naam van de ontvanger?",
            "send.label.instruction17":"Bijvoorbeeld: <br/>Elisa <br/>Elisa de Groot <br/>Mw. de Groot",
            "send.label.instruction18":"Wat is de postcode van de ontvanger?",
            "send.label.instruction19":"Wat is het huisnummer? <br/>(zonder toevoeging) ...",
            "send.label.instruction20":"Heeft dit huisnummer een toevoeging?",
            "send.label.instruction21":"Voer de toevoeging van dit huisnummer in.",
            "send.label.instruction22":"Wij kunnen geen adres bij deze postcode / huisnummer combinatie vinden. Weet je zeker dat je de juiste informatie hebt ingevoerd?",
            "send.label.instruction23":"Wat is de straatnaam?",
            "send.label.instruction24":"Wat is de plaatsnaam?",
            "send.label.instruction25":"Wij kunnen de ontvanger het bezorgmoment laten weten.",
            "send.label.instruction26":"Hiervoor hebben wij het e-mailadres nodig. Heb je dit?",
            "send.label.instruction27":"Voer het e-mailadres van de ontvanger in. Dit wordt alleen gebruikt om het bezorgmoment te communiceren (voer niets in als je het e-mailadres niet kunt vinden).",
            "send.label.instruction28":"Wij kunnen de ontvanger het bezorgmoment laten weten.",
            "send.label.instruction29":"Hiervoor hebben wij het e-mailadres nodig. Heb je dit?",
            "send.label.instruction30":"Schrijf dit nummer op je pakje:",
            "send.label.instruction31":"Je verzending is succesvol aangemaakt.",
            "send.label.instruction32":"Je hoeft geen label te printen, wij doen dit voor je.",
            "send.label.instruction33":"toch geen verpakking",
            "send.label.instruction34":"naar hoofdmenu",
            "send.label.instruction35":"Helaas, dan kunnen wij je pakje niet versturen.",
            "send.label.instruction36":"order(s) afronden",
            "send.label.instruction37":"meer orders aanmaken",
            "send.label.instruction38":"verder",
            "send.label.instruction39":"bevestigen",
            "send.label.instruction40":"Elke avond tussen 19:00 en 21:00 zijn wij in je buurt.",
            "send.label.instruction41":"Op welke avond zullen wij je pakje komen ophalen?",
            "send.label.instruction42":"Wat is de naam van de ontvanger?",
            "send.label.instruction43":"Bijvoorbeeld",
            "send.label.instruction44":"Schrijf dit nummer op je pakje:",
            "send.label.instruction45":"Controleer je bestelling.",
            "send.label.instruction46":"Het e-mail adres dat u invoerde is niet correct.",
            "send.label.instruction47": "Is dit je adres?",
            "send.label.instruction48": "De ingevoerde verificatiecode is onjuist.",
            "send.label.instruction49": "Het ingevoerde huisnummer is ongeldig.",
            "send.label.instruction50": "De ingevoerde postcode is ongeldig.",
            "send.label.instruction51": "Het ingevoerde wachtwoord is ongeldig.",
            "send.label.instruction52": "Het ingevoerde e-mailadres is ongeldig.",
            "send.label.instruction53": "Er bestaat al een account met dit e-mailadres.",
            "send.label.instruction55": "... of postbusnummer",
            "send.label.instruction56": "Het ingevoerde postbusnummer is ongeldig.",
            "send.label.instruction57": "Gaat je pakje naar een Postbus?",
            "send.label.instruction58": "Wat is de plaatsnaam?",
            "send.label.instruction59": "Het ingevoerde huisnummer of postbus is ongeldig.",
            "send.label.instruction60": "We hebben je verzendgegevens bewaard. In je profiel kun je deze altijd wijzigen.",
            "send.label.instruction61": "Oke, ik begrijp het",
            "send.label.instruction62": "Voer de straatnaam in",
            "send.label.instruction63": "Voer de plaatsnaam in",
            "send.label.instruction64": "We komen altijd's avondas de pakjes halen.",
            "send.label.instruction65": "Wil je dat eerst(zacht) op deur of raam kloppen?",
            "send.label.instruction66": "We hebben je voorkeur opgeslagen. In je profiel kun je deze altijd weer wijzigen.",
            "send.label.instruction67": "Oke, ik begrijp het",
            "send.label.postbox":"Postbus",
            "send.label.yes":"ja",
            "send.label.no":"nee",
            "send.label.company":"bedrijf",
            "send.label.person":"persoon",
            "send.label.tonight":"vanavond",
            "send.label.evening":"avond",
            "send.label.monday":"maandag",
            "send.label.tuesday":"dinsdag",
            "send.label.wednesday":"woensdag",
            "send.label.thursday":"donderdag",
            "send.label.friday":"vrijdag",
            "send.label.saturday":"zaterdag",
            "send.label.sunday":"zondag",
            "send.label.nobox":"Geen verpakking",
            "send.label.shipment":"Verzending",
            "send.label.packaging":"Verpakking",
            "send.label.cancelorder":"Order annuleren",
            "send.label.header.sendparcel":"Pakje versturen",
            "send.label.instruction54": "Is het afleveradres:",
            "send.label.nocompanyname": "Je bedrijfsnaam (optioneel)",
            "send.label.nopersonname": "Je naam",
            "send.label.senderName": "Je naam",
            "send.label.senderCompany": "Je bedrijf",
            "send.label.senderInfo": "Je naam en bedrijf",
            "send.label.receiverInfo": "(Bedrijfs)naam ontvanger",
            "send.label.receiverPersonName": "Naam ontvanger",
            "send.label.receiverPersonCompany": "Bedrijfsnaam ontvanger",
            "send.label.receiverPersonPostcode": "Postcode ontvanger",
            "send.label.receiverPersonHouseNumber": "Huisnummer of Postbus",
            "send.label.receiverPersonHouseNumberSuffix": "Huisnummer toevoeging",
            "send.label.receiverStreet": "Straatnaam",
            "send.label.receiverCity": "Plaats",
            "send.label.receiveremail": "E-mailadres ontvanger (optioneel)",
            "send.label.cityname": "Plaats"

        }
    ]
};


var languageSpecificObject = null;

function successLanguageCallback() {
    //languageSpecificObject = JSON.parse(msg);
    $(".languageSpecificHTML").each(function () {
        $(this).html(languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
    });
    $(".languageSpecificPlaceholder").each(function () {
        $(this).attr("placeholder", languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
    });
    $(".languageSpecificValue").each(function () {
        $(this).attr("value", languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
    });
}


function getLanguageValue(key) {
    if (languageSpecificObject != null && languageSpecificObject.languageSpecifications != null) {
        return languageSpecificObject.languageSpecifications[0][key];

    } else {
        return key;
    }
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};