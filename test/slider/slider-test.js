var Montage = require("montage").Montage;
var TestController = require("montage-testing/test-controller").TestController;

exports.SliderTest = Montage.create(TestController, {


    "testSlider": { value:null },
    "sliderValue": { value:null },
    "testSlider2": { value:null },
    "sliderValue2": { value:null }

});
