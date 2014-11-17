'use strict';

var ToDo;

$(window).bind('firebase.connected', function(event, userID) {

    var _template = Handlebars.compile($('#template-item').html());

    var ref = new Firebase('https://whitelist.firebaseio.com/' + userID + '/items');

    ref.on('child_added', function(snapshot) {
        var data = snapshot.val();
        data.id = snapshot.key();
        drawNewItem(data);
    });

    ref.on('child_removed', function(snapshot) {
        $('#' + snapshot.key()).fadeOut(function() {
            $(this).remove();
        });
    });

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

    function drawNewItem(data) {
        var i = new ToDo(false, true, data);

        console.log(i.text);

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

    ToDo.prototype.setText = function(text) {
        var self = this;

        self.text = text;
        var updateRef = new Firebase('https://whitelist.firebaseio.com/' + userID + '/items/' + self.id);
        updateRef.update({text: self.text});
    };

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
