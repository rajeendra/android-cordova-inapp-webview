/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {

        //window.plugins.toast.showShortCenter('initialize: function');

        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        //alert("bindEvents");
        //window.plugins.toast.showShortCenter('bindEvents: function');

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

     //window.plugins.toast.showShortCenter('onDeviceReady: function);

     //window.plugins.toast.showLongBottom('Use the back button to return to main.');
     //document.getElementById("btnAdd").addEventListener("click", app.addItem);
     //document.getElementById("btnToast").addEventListener("click", app.showToast);
     //document.getElementById("btnDeviceInfo").addEventListener("click", app.showDeviceInfo);
     //document.getElementById("btnUrl").addEventListener("click", app.openWeb);

     app.receivedEvent('deviceready');
     app.preLogin();
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    preLogin: function() {
        //user = $('#login-username').val();
        //pwd  = $('#login-password').val();
        //var data = {user:user, pwd:pwd};

        HybridBridge.preLogin(null,
            function(){
                //alert(JSON.parse(data).status)
            },
            function(e){
                var data = JSON.parse(e);
                if(data.cuser!="") $('#login-username').val(data.cuser);
                if(data.cpwd!="") $('#login-password').val(data.cpwd);

                if(data.cuser!="") $('#login-remember').prop('checked', true);
                //alert(data.cuser);
            }
        );
    },

    // This is not functioning - see app.js's postLogin()

    /*postLogin: function() {
        user = $('#login-username').val();
        pwd  = $('#login-password').val();
        var data = {user:user, pwd:pwd};
        HybridBridge.postLogin(data,
            function(){
                //alert(JSON.parse(data).status)
            },
            function(e){
                var data = JSON.parse(e);
                //if(data.cuser!=null) $('#login-username').val(data.cuser);
                //if(data.cpwd!=null) $('#login-password').val(data.cpwd);
                //alert(data.cuser);
            }
        );
    },*/

    addItem: function() {
        console.log("Plugin ADD ITEM CALLED " + HybridBridge);

        var item = document.getElementById("bookmark").value;
        var myclass = "org.sample.hybridandroidapp.MyListActivity";

        var data = {item:item, myclass:myclass};

        HybridBridge.addItem(data,
            function(){
                //alert(JSON.parse(data).status)
            },
            function(e){
                var data = JSON.parse(e);
                alert(data.status);
            }
        );
     },

     showDeviceInfo: function(){
        var message = 'Cordova version: ' + device.cordova;
        message += '\n\nDevice Model: ' + device.model;
        message += '\n\nDevice Version (Android): ' + device.version;
        alert(message);
     },

     showToast: function(){
        //window.plugins.toast.showShortCenter('PHONEGAP IS AWESOME!!!');
     },

     openWeb: function(){
        var url = "http://phonegap.com"
        window.open(url)
     }

};

app.initialize();
