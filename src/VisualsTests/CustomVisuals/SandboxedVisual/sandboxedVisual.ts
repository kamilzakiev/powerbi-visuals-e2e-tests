import {visualConfig} from "../../exports";

visualConfig.
describe("SandboxedVisual", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value)) // Selects the sandbox iframe.
            .waitForExist("svg.tornado-chart g.columns > *");
    });

    it("selection test", (done) => {
        return browser
            .executeSpec(function(done) {
                var visual = new clientVisuals.TornadoChart();

                clientHelpers.clickElement(visual.columns.eq(3));

                visual.columns.toArray().map($).forEach((e,i) => {
                    if(i !== 3) {
                        expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                    }
                });

                done();
            })
            .frameParent() // Switches to the main frame with unsadnboxed visuals.
            .executeSpec(function(done) {
                clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "0.09")
                    .then(done, done.fail);
            });
    });
});