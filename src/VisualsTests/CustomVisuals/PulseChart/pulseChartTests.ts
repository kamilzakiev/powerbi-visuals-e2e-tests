import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("PulseChart", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.pulseChart g.dotsContainer > *");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.PulseChart();
        ClientHelpers.clickElement(visual.dotsContainerDot.eq(0));
        ClientHelpers.clickElement(visual.dotsContainerDot.eq(1), true);

        expect(visual.tooltipContainerTooltip.eq(0)).toBeInDOM();
        expect(visual.tooltipContainerTooltip.eq(1)).toBeInDOM();

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "110.95")
            .then(done, done.fail);
    });
});