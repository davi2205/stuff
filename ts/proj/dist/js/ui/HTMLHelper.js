export class HTMLHelper {
    createElement() {
        var element;
        element = document.createElement("div");
        element.style.position = "absolute";
        element.style.boxSizing = "border-box";
        element.style.userSelect = "none";
        element.style.webkitUserSelect = "none";
        element.style.msUserSelect = "none";
        element.style.MozUserSelect = "none";
        return element;
    }
    createTextElement(text) {
        var element;
        element = document.createElement("div");
        element.style.position = "absolute";
        element.style.boxSizing = "border-box";
        element.style.userSelect = "none";
        element.style.webkitUserSelect = "none";
        element.style.msUserSelect = "none";
        element.style.MozUserSelect = "none";
        element.textContent = text;
        return element;
    }
    setBounds(element, x, y, width, height) {
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    }
    makeSolid(element) {
        element.style.border = "1px solid #7c8aa6";
        element.style.borderRadius = "8px";
        element.style.background = "linear-gradient(180deg, #fdfefe 0%, #eef4ff 100%)";
        element.style.boxShadow = "2px 2px 1px rgba(53, 77, 117, 0.24), 0 6px 14px rgba(53, 77, 117, 0.18)";
        element.style.padding = "10px";
        element.style.paddingTop = "8px";
        element.style.paddingBottom = "8px";
    }
    makeDebossed(element) {
        element.style.border = "1px solid #7c8aa6";
        element.style.borderRadius = "8px";
        element.style.background = "linear-gradient(180deg, #eef4ff 0%, #fdfefe 100%)";
        element.style.boxShadow = "inset 2px 2px 1px rgba(53, 77, 117, 0.24), inset 0 6px 14px rgba(53, 77, 117, 0.18)";
        element.style.padding = "10px";
        element.style.paddingTop = "8px";
        element.style.paddingBottom = "8px";
    }
}
//# sourceMappingURL=HTMLHelper.js.map