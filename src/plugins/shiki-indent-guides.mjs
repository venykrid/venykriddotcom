function getNodeText(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (Array.isArray(node.children)) {
    return node.children.map(getNodeText).join("");
  }
  return "";
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export default function shikiIndentGuides() {
  return {
    name: "shiki-indent-guides",
    code(node) {
      const lineNodes = node.children.filter(
        (child) =>
          child.type === "element" &&
          child.tagName === "span" &&
          Array.isArray(child.properties?.className)
            ? child.properties.className.includes("line")
            : typeof child.properties?.class === "string" &&
              child.properties.class.split(" ").includes("line")
      );

      if (lineNodes.length === 0) return;

      const TAB_WIDTH = 4;
      let hasTabs = false;
      let spaceStep = 0;

      const lineIndents = lineNodes.map((line) => {
        const text = getNodeText(line);
        const match = text.match(/^[ \t]+/);
        if (!match) return 0;

        let ch = 0;
        let spacesOnly = 0;
        for (const char of match[0]) {
          if (char === "\t") {
            hasTabs = true;
            ch += TAB_WIDTH;
          } else {
            ch += 1;
            spacesOnly += 1;
          }
        }

        if (!hasTabs && spacesOnly > 0 && text.trim().length > 0) {
          spaceStep = spaceStep === 0 ? spacesOnly : gcd(spaceStep, spacesOnly);
        }

        return ch;
      });

      const step = hasTabs ? TAB_WIDTH : spaceStep >= 2 ? spaceStep : 4;

      lineNodes.forEach((line, index) => {
        const indent = lineIndents[index];
        const levels = Math.floor(indent / step);
        const existingStyle = line.properties?.style
          ? `${line.properties.style}; `
          : "";
        line.properties = {
          ...line.properties,
          style: `${existingStyle}--indent: ${indent}; --indent-levels: ${levels}; --indent-step: ${step};`,
        };
      });

      // Remove newline text nodes between .line blocks so display: block doesn't double-space
      node.children = node.children.filter(
        (child) => !(child.type === "text" && child.value === "\n")
      );
    },
  };
}
