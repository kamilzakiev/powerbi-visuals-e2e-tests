import {VisualConfig} from "../../../Common/exports";

VisualConfig.
describe("ForceGraph", (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => browser.frame(res.value))
            .waitForExist("svg.forceGraph > g.node > *");
    });

    it("dom validation tests", () => {
        return browser
            .executeSpec(function(done) {
                var visual = new ClientVisuals.ForceGraph();
                expect(visual.nodes).toBeInDOM();
                expect(visual.nodeTexts).toBeInDOM();
                expect(visual.nodes.children("circle")).toBeInDOM();
                expect(visual.links).toBeInDOM();

                done();
            });
    });
});