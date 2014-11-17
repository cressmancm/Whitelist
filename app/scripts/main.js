'use strict';

$(document).ready(function() {

    function newToDo(value) {
        if (value) {
            new ToDo(true, false, { text: value });
            $('#add').val('');
        }
    }

    // add new todo when leaving the input
    $('#add').blur(function() {
        newToDo($('#add').val());
    });

    // add new todo when pressing enter to allow quick multiple adds
    $('#add').keypress(function(event) {
        var code = event.keyCode || event.which;
        if(code === 13) {
            newToDo($('#add').val());
        }
    });
});
