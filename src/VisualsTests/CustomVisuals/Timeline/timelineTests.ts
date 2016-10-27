import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("Timeline", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.timeline g.cursorsArea > *");
    });

    itClient("selection test", function (done) {
        var visual = new ClientVisuals.Timeline();
        ClientHelpers.clickElement(visual.cellRects.eq(0));

        var firstCell = visual.cellRects.eq(0);
        var selectionColor = firstCell.css('fill');

        visual.cellRects.toArray().map($).forEach(e => {
            ClientHelpers.assertColorsMatch(e.css('fill'), selectionColor, !e.is(firstCell));
        });

        ClientHelpers.waitUntil(() => ClientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "$46.22K")
            .then(done, done.fail);
    });
});