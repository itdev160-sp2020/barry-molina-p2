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
        },
        {
            id: 2,
            name: 'Golden Gate Bridge',
            description: 'Until 1964, the Golden Gate Bridge had the longest suspension bridge main span in the world at 4,200 feet.',
            img: 'images/goldengatebridge.png',
            left: 30,
            top: 325
        },
        {
            id: 3,
            name: 'Old Faithful',
            description: 'Old Faithful is a highly predictable geothermal feature, and has erupted every 44 minutes to two hours since 2000.',
            img: 'images/oldfaithful.jpg',
            left: 322,
            top: 192
        },
        {
            id: 4,
            name: 'Grand Canyon',
            description: 'The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles long, up to 18 miles wide and attains a depth of over a mile.',
            img: 'images/grandcanyon.jpg',
            left: 243,
            top: 423
        },
        {
            id: 5,
            name: 'Mount Rushmore',
            description: 'Mount Rushmore roughly 60-ft. high and depict U.S. presidents George Washington, Thomas Jefferson, Theodore Roosevelt and Abraham Lincoln.',
            img: 'images/mountrushmore.jpg',
            left: 472,
            top: 222
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
                    $img.show();
                }
                else {
                    $img.hide();
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
        $currentPin = addPin(currentLocation);
        openDialog(currentLocation);
        //console.log(locations);
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
        for (var i = 0; i < locations.length; i++) {
            addPin(locations[i]);
        }
        $map.on('click', addLocation);
        $dialog.on('click', function(e) {
            e.stopPropagation();
        })
        $('#cancel-button').on('click', cancelPin);
        $('#save-button').on('click', saveLocation)
    }
    
    init();

    
});
