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
