'use strict';

var ToDo;

$(window).bind('firebase.connected', function(event, userID) {

    var _template = Handlebars.compile($('#template-item').html());

    var ref = new Firebase('https://whitelist.firebaseio.com/' + userID + '/items');

    // fires whenever a todo is added to firebase
    //    also fires during startup. adds all existing todos to the ul#list
    ref.on('child_added', function(snapshot) {
        var data = snapshot.val();
        data.id = snapshot.key();
        drawNewItem(data);
    });

    // fires whenever a todo is removed
    ref.on('child_removed', function(snapshot) {
        $('#' + snapshot.key()).fadeOut(function() {
            $(this).remove();
        });
    });

    // fires whenever a todo is modified
    //    firebase does not specify what was changed, just that the todo was changed :(
    ref.on('child_changed', function(snapshot) {
        var data = snapshot.val();
        var element = $('#' + snapshot.key());
        var completed = data.completed;

        $(element).find('input').val(data.text);

        if (completed) {
            $(element).addClass('completed');
            $(element).find('.complete .fa').removeClass('fa-square-o');
            $(element).find('.complete .fa').addClass('fa-check-square-o');
            $(element).insertAfter($('#list li:not(".completed"):last'));

        } else{
            $(element).removeClass('completed');
            $(element).find('.complete .fa').addClass('fa-square-o');
            $(element).find('.complete .fa').removeClass('fa-check-square-o');
            $(element).insertBefore($('#list li.completed:first'));
        }
    });

    // create new todo that came from firebase and add to ul#list
    function drawNewItem(data) {
        var i = new ToDo(false, true, data);

        // determine where to insert the new todo
        //   completed items at the bottom of the list
        if ($('#list li.completed').length <= 0) {
            $(i.template).appendTo('#list').fadeIn();
        }
        else if (i.completed) {
            $(i.template).insertAfter($('#list li:not(".completed"):last')).fadeIn();
        }
        else {
            $(i.template).insertBefore($('#list li.completed:first')).fadeIn();
        }
    }

    // ToDo item. can be created from input box or connected session via firebase
    //   save: does this todo need to be saved to firebase?
    //   bind: does this todo need to event handlers bound to it?
    //   options: overrides for default values. at minimun, is text node
    ToDo = function(save, bind, options) {

        var self = this;

        this.completed = false;
        this.text = '';

        $.extend(this, options);

        this.template = _template(this);

        if (save) {
            var tmp = ref.push(self);
            this.id = tmp.key();
            tmp.update({id: this.id});
        }

        if (bind) {
            self.bindEvents();
        }
    };

    // set text and update in firebase
    ToDo.prototype.setText = function(text) {
        var self = this;

        self.text = text;
        var updateRef = new Firebase('https://whitelist.firebaseio.com/' + userID + '/items/' + self.id);
        updateRef.update({text: self.text});
    };

    // mark as completed/uncompleted, update UI, and save in firebase
    ToDo.prototype.complete = function(event) {
        var self = this;

        var element = $(event.target);

        $(element).toggleClass('fa-square-o');
        $(element).toggleClass('fa-check-square-o');


        self.completed = $(element).hasClass('fa-check-square-o');

        if (self.completed) {
            $(element).parents('li').addClass('completed');
        }
        else {
            $(element).parents('li').removeClass('completed');
        }

        var updateRef = new Firebase('https://whitelist.firebaseio.com/' + userID + '/items/' + self.id);
        updateRef.update({completed: self.completed});
    };

    // bind click and change events to item to determine if the text has changed,
    //    it has been completed, or if it has been deleted
    ToDo.prototype.bindEvents = function() {
        var self = this;

        $('ul').on('change', '#' + this.id, function(event) {
            event.preventDefault();

            if (self.id === $(this).attr('id')) {
                self.setText($(this).find('input').val());
            }
        });

        $('ul').on('click', '#' + this.id + ' .complete .fa', function(event) {
            event.preventDefault();

            if (self.id === $(this).parents('li').attr('id')) {
                self.complete(event);
            }
        });

        $('ul').on('click', '#' + this.id + ' .remove .fa', function(event) {
            event.preventDefault();
            var removeRef = new Firebase('https://whitelist.firebaseio.com/' + userID + '/items/' + self.id);
            removeRef.remove();
        });
    };
});
