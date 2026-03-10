import { behavior, Propagation, TurboEvent, TurboTool } from "turbodombuilder";
import { Canvas } from "../canvas/canvas";
import { Square } from "../square/square";

export class AddSquareTool extends TurboTool {
  public toolName = "add-square";

  @behavior() click(e: TurboEvent, target: Node) {
    if (target instanceof Canvas) {
      Square.create({
        position: e.position,
        color: "blue",
        name: "Square " + Date.now(),
        parent: target,
      });
      return Propagation.stopPropagation;
    }
  }
}
