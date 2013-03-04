/*global expect */
var Montage = require("montage").Montage,
        TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;
        EventInfo = require("montage-testing/testpageloader").EventInfo;

TestPageLoader.queueTest("slider-test", function(testPage) {

    describe("ui/slider-spec", function() {
        var testSlider, testSliderHandle;

        beforeEach(function() {
            testSlider = testPage.test.testSlider;
            testSlider.minValue = 0;
            testSlider.maxValue = 100;
            testSliderHandle = testSlider._handlerDragArea.firstElementChild;
        });

        describe("when interacted with", function() {
            it("should slide", function() {
                var origin = testSliderHandle.offsetLeft;
                var eventInfo = EventInfo.create().initWithElement(testSliderHandle);
                eventInfo = testPage.mouseEvent(eventInfo, "mousedown", function() {
                    eventInfo.move(25,0);
                    eventInfo = testPage.mouseEvent(eventInfo, "mousemove", function() {
                        expect(testSlider.value).toEqual(25*100/testSlider._width);
                        eventInfo.move(25,0);
                        eventInfo = testPage.mouseEvent(eventInfo, "mousemove", function() {
                            eventInfo = testPage.mouseEvent(eventInfo, "mouseup", function() {
                                // Regex. "px" on "0" is optional
                                expect(testSliderHandle.parentElement.style.webkitTransform).toMatch("translate3d\\("+(~~((25+25)*100)/testSlider._width)+"%, 0(px)?, 0(px)?\\)");
                            });
                        });

                    });
                });
            });
        });
    });
});
