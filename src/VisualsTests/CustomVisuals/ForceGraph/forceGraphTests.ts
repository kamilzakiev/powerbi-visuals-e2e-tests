import {visualConfig} from "../../exports";

visualConfig.
describe("ForceGraph", __dirname, (reportUrl) => {
    beforeEach(() => {
        return browser
            .waitForExist("svg.forceGraph > g.node > *");
    });

    itClient("dom validation tests", function () {
        var visual = new clientVisuals.ForceGraph();
        expect(visual.nodes).toBeInDOM();
        expect(visual.nodeTexts).toBeInDOM();
        expect(visual.nodes.children("circle")).toBeInDOM();
        expect(visual.links).toBeInDOM();
    });
});