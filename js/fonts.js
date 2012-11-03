// http://ejohn.org/apps/jselect/event.html
function addEvent(object, event, method) {
    if (object.attachEvent) {
        object['e' + event + method] = method;
        object[event + method] = function(){object['e' + event + method](window.event);};
        object.attachEvent('on' + event, object[event + method]);
    } else {
    object.addEventListener(event, method, false);
    }
}

function cancel(event) {
    (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
    (event.stopPropagation) ? event.stopPropagation() : event.cancelBubble = true;
}


!(function(context) {
    var FontUI = function() {};

    FontUI.prototype = {
        fontZoomer: function(name, output) {
            var zoomer = new Dragdealer(name, {
                steps: 8,
                animationCallback: function(x, y) {
                    var v = 20 + x * 73;
                    output.style.fontSize = String(v.toFixed()) + 'px';
                    output.style.lineHeight = String((v - 5).toFixed()) + 'px';
                }
            });
            zoomer.setStep(6);
        },

        typeTester: function(input, output, toggle) {
            var self = this,
                weights = toggle.getElementsByTagName('a');

            this.weight = weights[0].id;
            weights[0].className = 'active';

            for (var i = 0; i < weights.length; i++) {
                addEvent(weights[i], 'click', function(e) {
                    cancel(e);
                    if (this.className !== 'active') {
                        var children = this.parentNode.getElementsByTagName('a');
                        for (var c = 0; c < children.length; c++) children[c].className = '';
                        this.className = 'active';
                        self.weight = this.id;
                        output.innerHTML = '<span class=' + self.weight + '>' + input.value + '</span>';
                    }
                });
            }

            addEvent(input, 'keyup', function(e) {
                switch (e.keyCode) {
                    // Exclude keys from executing on this.
                    case 91: // command
                    case 40: // down arrow
                    case 39: // left arrow
                    case 38: // up arrow
                    case 37: // right arrow
                    case 13: // enter
                    case 16: // shift
                        break;

                    default:
                        output.innerHTML = '<span class=' + self.weight + '>' + input.value + '</span>';
                }
                return false;
            });

            addEvent(input, 'keydown', function(e) {
               if (e.keyCode === 8) {
                    output.innerHTML = '<span class=' + self.weight + '>' + input.value + '</span>';
               }
            });
        },

        slideShow: function(show) {
            var slides = show.getElementsByTagName('div'),
                pager = document.getElementById('pager'),
                set = false;

           for (i = 0; i < slides.length; i++) {
                var item = document.createElement('a');
                item.setAttribute('href', '#');
                item.className = 'item slide-' + (i + 1);
                // Set the first page link an active class
                if (!set) {
                    item.className += ' active';
                    set = true;
                }

                pager.appendChild(item);
                addEvent(item, 'click', function(e) {
                    cancel(e);
                    if (this.className.search('active') === -1) {
                        var classId = this.className.split(' ')[1];
                        var children = this.parentNode.getElementsByTagName('a');
                        for (var c = 0; c < children.length; c++) {
                            children[c].className = children[c].className.replace('active', '');
                            for (i = 0; i < slides.length; i++) {
                               slides[i].className = slides[i].className.replace('active', '');
                            }
                        }
                        var current = qwery('.' + classId);
                        for (i = 0; i < current.length; i++) current[i].className += ' active';
                    }
                });
           }
        }
    };

    window.FontUI = FontUI;
})(window);
