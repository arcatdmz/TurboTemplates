import {TurboTool, TurboEvent, behavior, Propagation} from "turbodombuilder";
import {Canvas} from "../canvas/canvas";
import {Circle} from "../circle/circle";

//Add circle tool
//Check SelectTool and AddSquareTool for more context
export class AddCircleTool extends TurboTool {
    public toolName: string = "addCircle"; //Define the tool name

    //The count of circles created
    private circleCount: number = 0;

    //Equivalent to turbo(tool).addToolBehavior("click", "addCircle", (e, target) => {...});
    @behavior() public click(e: TurboEvent, target: Node) {
        //If the user did not interact with the canvas directly --> ignore
        if (e.target instanceof Canvas) {
            //Increment the counter
            this.circleCount++;
            //Create a new circle with target (the canvas) as parent, a custom name, and the current position.
            Circle.create({parent: target, name: "Circle " + this.circleCount, position: e.position});
            return Propagation.stopPropagation;
        }
    }
}