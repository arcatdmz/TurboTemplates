import { turbo, TurboButton } from "turbodombuilder";
import { Canvas } from "./canvas/canvas";
import { Toolbar } from "./toolbar/toolbar";
import { AddSquareTool } from "./tools/addSquare.tool";
import { MoveTool } from "./tools/move.tool";
import { SnapMoveTool } from "./tools/snapMove.tool";

Canvas.create({ parent: document.body });
const toolbar = Toolbar.create({ parent: document.body });

toolbar.addTool(
  TurboButton.create({ text: "Add Sqare", tools: AddSquareTool }),
);
toolbar.addTool(TurboButton.create({ text: "Move", tools: MoveTool }));
toolbar.addTool(
  TurboButton.create({
    text: "Snap Move",
    tools: SnapMoveTool,
  }),
);
