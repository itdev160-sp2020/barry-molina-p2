$(function() {
    var X_PIN_OFFSET = 14;
    var Y_PIN_OFFSET = 48;
    var PIN_IMG = 'images/redpinblackdotsmall.png';

    var $map = $('#map-div');
    var $info = $('#info-box');
    var $dialog = $('#info-dialog');
    var $currentPin = null;
    var currentLocation = null;

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

    function location(id, left, top) {
        this.id = id;
        this.left = left;
        this.top = top;
    }

    function addPin(location) {
        var $pin = $('<img src="' + PIN_IMG + '" id="pin-' + location.id + '" class="pin" alt="pin">');
        var $img = $info.find('#location-img');

        $map.append($pin);
        $pin.css({
            'left': calcPinLeft(location.left) + 'px', 
            'top': calcPinTop(location.top) + 'px'
        });
        $pin.on('mouseenter mouseleave', function(e) {
            if (e.type === 'mouseenter') {
                $info.css({
                    'left': location.left,
                    'top': location.top
                });
                $info.find('#location-name').text(location.name);
                $info.find('#location-description').text(location.description);

                if (location.img) {
                    $img.attr('src', location.img);
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
        return $pin;
    }

    function openDialog(location) {
        $dialog.css({
            'left': location.left,
            'top': location.top
        });
        $dialog.fadeIn(300);
    }

    function saveLocation() {
        var name = $dialog.find('#edit-name-text').val();
        var desc = $dialog.find('#edit-description-text').val();

        currentLocation.name = name;
        currentLocation.description = desc;

        locations.push(currentLocation);
        closeDialog();
    }

    function cancelPin() {
        $currentPin.remove();
        closeDialog();
    }

    function closeDialog() {
        $currentLocation = null;
        $currentPin = null;
        $dialog.hide();
        $dialog.find('#edit-name-text').val('');
        $dialog.find('#edit-description-text').val('');
    }

    function addLocation(e) {
        if ($currentPin) {
            cancelPin();
        }
        currentLocation = new location(
            locations[locations.length - 1].id + 1,
            calcMapLeft(e.pageX),
            calcMapTop(e.pageY)
        )
        //locations.push(currentLocation);
        $currentPin = addPin(currentLocation);
        openDialog(currentLocation);
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
        $map.on('click', addLocation);
        $dialog.on('click', function(e) {
            e.stopPropagation();
        })
        $('#cancel-button').on('click', cancelPin);
        $('#save-button').on('click', saveLocation)
    }
    
    init();

    
});
