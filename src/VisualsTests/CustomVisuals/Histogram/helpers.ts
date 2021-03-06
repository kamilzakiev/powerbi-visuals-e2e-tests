﻿namespace ClientVisuals {
	export class Histogram {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || ClientHelpers.getVisualsRootElements()).find("svg.histogram").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

		public get mainElement() {
            return this.rootElement.children("svg");
        }
        
        public get columnRects() {
            return this.mainElement
                .children("g")
                .children("g.columns")
                .children("rect.column");
        }
	}
}