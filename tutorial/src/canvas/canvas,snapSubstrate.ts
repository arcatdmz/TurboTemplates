import {
  Point,
  solver,
  SubstrateCallbackProperties,
  TurboQueue,
  TurboSubstrate,
} from "turbodombuilder";

export class CanvasSnapSubstrate extends TurboSubstrate {
  substrateName = "snap";

  defaultQueue: object[] | TurboQueue<object> = [];

  initialize() {
    super.initialize();
    this.active = false;
  }

  @solver() snapObject(properties: SubstrateCallbackProperties) {
    if (properties.eventType !== "turbo-drag-end") {
      return;
    }
    if (
      !("position" in properties.target) ||
      !(properties.target.position instanceof Point)
    ) {
      return;
    }
    const { position } = properties.target;
    const snapX = Math.round(position.x / 50) * 50;
    const snapY = Math.round(position.y / 50) * 50;
    properties.target.position = new Point(snapX, snapY);
  }
}
