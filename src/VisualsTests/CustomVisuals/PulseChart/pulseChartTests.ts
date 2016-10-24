import {visualConfig} from "../../exports";

visualConfig.
describe("PulseChart", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.pulseChart g.dotsContainer > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.PulseChart();
        clientHelpers.clickElement(visual.dotsContainerDot.eq(0));
        clientHelpers.clickElement(visual.dotsContainerDot.eq(1), true);

        expect(visual.tooltipContainerTooltip.eq(0)).toBeInDOM();
        expect(visual.tooltipContainerTooltip.eq(1)).toBeInDOM();

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "110.95")
            .then(done, done.fail);
    });
});