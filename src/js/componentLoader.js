/**
 * Component class for loading modular UI components
 */
class Component {
	constructor(name, basePath = "components") {
		this.name = name;
		this.basePath = basePath;
		this.htmlPath = `${basePath}/${name}/${name}.html`;
		this.cssPath = `${basePath}/${name}/${name}.css`;
	}

	async loadInto(targetElement) {
		// Load the CSS if it hasn't been loaded yet
		if (!document.querySelector(`link[href="${this.cssPath}"]`)) {
			this.loadCSS();
		}

		// Load the HTML
		try {
			const response = await fetch(this.htmlPath);
			const html = await response.text();
			targetElement.innerHTML = html;
		} catch (error) {
			console.error(`Failed to load ${this.name} component HTML:`, error);
		}
	}

	loadCSS() {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = this.cssPath;
		document.head.appendChild(link);
	}
}

/**
 * Automatically load common components when the DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
	componentNames = ["header", "footer"];
	componentNames.forEach(async component => {
		const targetElement = document.getElementById(component);
		if (targetElement) {
			await new Component(component).loadInto(targetElement);
		}
	});
});
