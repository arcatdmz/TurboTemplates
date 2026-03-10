import { turbo } from "turbodombuilder";
import { MoveTool } from "./move.tool";

export class SnapMoveTool extends MoveTool {
  public toolName = "snap-move";
  onActivate() {
    const canvas = document.querySelector("my-canvas");
    turbo(canvas).activateSubstrate("snap");
  }
  onDeactivate() {
    const canvas = document.querySelector("my-canvas");
    turbo(canvas).deactivateSubstrate("snap");
  }
}
