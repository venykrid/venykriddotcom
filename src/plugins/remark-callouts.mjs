const CALLOUT_REGEX = /^\[!([a-zA-Z0-9_-]+)\]([+-])?(?:[ \t]+([^\n]*))?(?:\n|$)/;

function makeSpan(className, children = [], extraProps = {}) {
  return {
    type: "paragraph",
    data: {
      hName: "span",
      hProperties: {
        className,
        ...extraProps,
      },
    },
    children,
  };
}

function transformTree(node) {
  if (!node || !Array.isArray(node.children)) return;

  for (const child of node.children) {
    transformTree(child);
  }

  if (node.type !== "blockquote" || node.children.length === 0) return;

  const firstParagraph = node.children[0];
  if (
    firstParagraph.type !== "paragraph" ||
    !Array.isArray(firstParagraph.children) ||
    firstParagraph.children.length === 0
  ) {
    return;
  }

  const firstText = firstParagraph.children[0];
  if (firstText.type !== "text") return;

  const match = firstText.value.match(CALLOUT_REGEX);
  if (!match) return;

  const calloutType = match[1].toLowerCase();
  const fold = match[2]; // '-', '+', or undefined
  const customTitle = match[3]?.trim();
  const titleText =
    customTitle || calloutType.charAt(0).toUpperCase() + calloutType.slice(1);

  // Strip the [!type] line from the first text node
  firstText.value = firstText.value.slice(match[0].length);
  if (firstText.value === "") {
    firstParagraph.children.shift();
  }
  if (firstParagraph.children.length === 0) {
    node.children.shift();
  }

  const isCollapsible = fold === "-" || fold === "+";
  const remainingChildren = node.children;

  const titleChildren = [
    makeSpan(["callout-icon"], [], { "aria-hidden": "true" }),
    makeSpan(["callout-title-text"], [{ type: "text", value: titleText }]),
  ];

  if (isCollapsible) {
    titleChildren.push(
      makeSpan(["callout-fold"], [], { "aria-hidden": "true" })
    );
  }

  const titleNode = {
    type: "paragraph",
    data: {
      hName: isCollapsible ? "summary" : "div",
      hProperties: {
        className: ["callout-title"],
      },
    },
    children: titleChildren,
  };

  node.data = {
    hName: isCollapsible ? "details" : "div",
    hProperties: {
      className: ["callout", `callout-${calloutType}`],
      "data-callout": calloutType,
      ...(fold === "+" ? { open: true } : {}),
    },
  };

  if (remainingChildren.length > 0) {
    const contentNode = {
      type: "blockquote",
      data: {
        hName: "div",
        hProperties: {
          className: ["callout-content"],
        },
      },
      children: remainingChildren,
    };
    node.children = [titleNode, contentNode];
  } else {
    node.children = [titleNode];
  }
}

export default function remarkCallouts() {
  return (tree) => {
    transformTree(tree);
  };
}
