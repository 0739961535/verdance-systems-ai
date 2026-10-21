/** The tool marks live once in /tools.svg (scripts/build-tool-sprite.mjs). Bump v when the sprite changes. */
export const TOOL_SPRITE = "/tools.svg?v=b6254353";
export const toolSymbolId = (name: string) => `tm-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
