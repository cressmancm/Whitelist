'use strict';

$(document).ready(function() {

    function newItem(value) {
        if (value) {
            new ToDo(true, false, { text: value });
            $('#add').val('');
        }
    }

    $('#add').blur(function() {
        newItem($('#add').val());
    });

    $('#add').keypress(function(event) {
        var code = event.keyCode || event.which;
        if(code === 13) {
            newItem($('#add').val());
        }
    });
});
