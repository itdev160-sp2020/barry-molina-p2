$(function() {
    var X_PIN_OFFSET = 14;
    var Y_PIN_OFFSET = 48;
    var PIN_IMG = 'images/redpinblackdotsmall.png';

    var $map = $('#map-div');
    var $info = $('#info-box');

    var locations = [
        {
            id: 1,
            name: 'Milwaukee Art Museum',
            description: 'The Milwaukee Art Museum contains nearly 25,000 works of art. It is one of the largest museums in the United States.',
            img: 'images/milwaukeeMuseum.jpeg',
            left: 790,
            top: 249
        }
    ];

    function addPin(pin) {
        var $pin = $('<img src="' + PIN_IMG + '" id="pin-' + pin.id + '" class="pin" alt="pin">');
        var $img = $info.find('#location-img');

        $map.append($pin);
        $pin.css({
            'left': calcPinLeft(pin.left) + 'px', 
            'top': calcPinTop(pin.top) + 'px'
        });
        $pin.on('mouseenter mouseleave', function(e) {
            if (e.type === 'mouseenter') {
                $info.css({
                    'left': pin.left,
                    'top': pin.top
                });
                $info.find('#location-name').text(pin.name);
                $info.find('#location-description').text(pin.description);

                if (pin.img) {
                    $img.attr('src', pin.img);
                }
                else {
                    $img.attr('src', '');
                }
                $info.stop();
                $info.fadeIn(300);
            }
            else {
                $info.stop();
                $info.fadeOut(300);
            }
        });
    }

    function addLocation(e) {
        var location = {
            id: locations[locations.length - 1].id + 1,
            name: '',
            description: '',
            left: calcMapLeft(e.pageX),
            top: calcMapTop(e.pageY)
        }
        locations.push(location);
        addPin(location);
        console.log(locations);
    }

    function showInfo() {

    }

    function calcPinLeft(left) {
        return left - X_PIN_OFFSET;
    }
    function calcPinTop(top) {
        return top - Y_PIN_OFFSET;
    }

    function calcMapLeft(left) {
        return left - $map.offset().left;
    }
    function calcMapTop(top) {
        return top - $map.offset().top;
    }

    function init() {
        addPin(locations[0]);
        $map.on('click', addLocation)
    }
    
    init();

    
});
