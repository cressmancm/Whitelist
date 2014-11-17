'use strict';

$(window).bind('firebase.connected', function(event, userID) {

    var ref = new Firebase('https://whitelist.firebaseio.com/' + userID + '/settings/background');

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

        if (key === 'background' && value && value.background) {
            $('body').css({
                'background-image': 'url(/images/' + value.background + '.png)'
            }).removeClass().addClass(value);
        }
    });

});
