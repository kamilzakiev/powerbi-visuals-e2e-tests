namespace ClientVisuals {
	export class AsterPlot {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || ClientHelpers.getVisualsRootElements()).find("svg.asterPlot").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

		public get mainElement() {
            return this.rootElement.children("svg");
        }

		public get slices() {
            return this.mainElement.find("g.asterSlices path.asterSlice");
        }
	}
}