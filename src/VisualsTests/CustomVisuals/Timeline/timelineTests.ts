import {visualConfig} from "../../exports";

visualConfig.
describe("Timeline", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.timeline g.cursorsArea > *");
    });

    itClient("selection test", function (done) {
        var visual = new clientVisuals.Timeline();
        clientHelpers.clickElement(visual.cellRects.eq(0));

        var firstCell = visual.cellRects.eq(0);
        var selectionColor = firstCell.css('fill');

        visual.cellRects.toArray().map($).forEach(e => {
            clientHelpers.assertColorsMatch(e.css('fill'), selectionColor, !e.is(firstCell));
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "$46.22K")
            .then(done, done.fail);
    });
});