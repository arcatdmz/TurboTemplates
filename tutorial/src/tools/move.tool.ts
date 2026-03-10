import {
  behavior,
  Point,
  Propagation,
  TurboDragEvent,
  TurboTool,
} from "turbodombuilder";

export class MoveTool extends TurboTool {
  public toolName = "move";

  @behavior() drag(e: TurboDragEvent, target: Node) {
    if ("position" in target && target.position instanceof Point) {
      target.position = target.position.add(e.deltaPosition);
      return Propagation.stopPropagation;
    }
  }
}
