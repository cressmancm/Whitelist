'use strict';

// all backgrounds from http://subtlepatterns.com/

$(window).bind('firebase.connected', function(event, userID) {

    var ref = new Firebase('https://whitelist.firebaseio.com/' + userID + '/settings/background');

    // live updates of the background across sessions/devices
    //   fun feature, but more features will benefit from firebase
    $('#backgrounds li').click(function(event) {
        var name = $(event.target).attr('class');
        $('body').css({
            'background-image': 'url(/images/' + name + '.png)'
        });

        ref.set({
            background: name
        });
    });

    ref.on('value', function(snapshot) {
        var key = snapshot.key();
        var value = snapshot.val();

        // this will eventually grow
        //   may need to be reworked if it gets out of hand
        if (key === 'background' && value && value.background) {
            $('body').css({
                'background-image': 'url(/images/' + value.background + '.png)'
            }).removeClass().addClass(value);
        }
    });

});
