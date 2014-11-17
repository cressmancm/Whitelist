'use strict';

$(document).ready(function() {

    var ref = new Firebase('https://whitelist.firebaseio.com');

    ref.onAuth(function(authData) {
        if (authData) {
            $(window).trigger('firebase.connected', [authData.uid]);
            signedIn();
        } else {
            signedOut();
        }
    });

    $('#signIn').click(function() {
        ref.authWithOAuthRedirect('facebook', function() {
            signedIn();
        });
    });

    $('#signOut').click(function() {
        ref.unauth();
        signedOut();
        $('#list').empty();
    });

    function signedIn() {
        $('#signIn, #intro').fadeOut();
        $('#add, #list, #settings').fadeIn();
    }

    function signedOut() {
        $('#signIn, #intro').fadeIn();
        $('#add, #list, #settings').fadeOut();
        $('#settingsPanel').slideUp();
    }
});
