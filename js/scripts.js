$(function() {
    var X_PIN_OFFSET = 14;
    var Y_PIN_OFFSET = 48;
    var PIN_IMG = 'images/redpinblackdotsmall.png';

    var $map = $('#map-div');

    var locations = [
        {
            id: 1,
            name: 'Milwaukee Art Museum',
            description: 'The Milwaukee Art Museum contains nearly 25,000 works of art. It is one of the largest museums in the United States.',
            img: '../../images/milwaukeeMuseum',
            left: 790,
            top: 249
        }
    ];

    function addPin(pin) {
        var $pin = $('<img src="' + PIN_IMG + '" id="pin-' + pin.id + '" class="pin" alt="pin">');

        $map.append($pin);
        $pin.css({
            'left': calcXOffset(pin.left) + 'px', 
            'top': calcYOffset(pin.top) + 'px'
        });
        //console.log($pin.position());
    }

    function addLocation(e) {
        var location = {
            id: locations[locations.length - 1].id + 1,
            left: e.pageX - $map.offset().left,
            top: e.pageY - $map.offset().top
        }
        locations.push(location);
        addPin(location);
    }


    function calcXOffset(xVal) {
        return xVal - X_PIN_OFFSET;
    }
    function calcYOffset(yVal) {
        return yVal - Y_PIN_OFFSET;
    }

    function init() {
        addPin(locations[0]);
        $map.on('click', addLocation)
    }
    
    init();

    
});
