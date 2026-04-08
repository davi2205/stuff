export function isBounded(object) {
    return typeof object.getX === "function" &&
        typeof object.getY === "function" &&
        typeof object.getWidth === "function" &&
        typeof object.getHeight === "function" &&
        typeof object.setBounds === "function";
}
//# sourceMappingURL=Bounded.js.map