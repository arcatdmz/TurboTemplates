import {TurboTool, TurboEvent, behavior, Propagation} from "turbodombuilder";
import {Square} from "../square/square";
import {Canvas} from "../canvas/canvas";

//Add square tool
//Check SelectTool for more context
export class AddSquareTool extends TurboTool {
    public toolName: string = "addSquare"; //Define the tool name

    //The count of squares created
    private squareCount: number = 0;

    //Equivalent to turbo(tool).addToolBehavior("click", "addSquare", (e, target) => {...});
    //e.target gives you the actual target that the user interacted with, while
    //target (from the parameters) is the current node being processed by the event, in the propagation loop.
    //So, if the event is allowed to propagate, future calls will pass the target as the HTML body, then the document, etc.
    @behavior() public click(e: TurboEvent, target: Node) {
        //If the user did not interact with the canvas directly --> ignore
        if (e.target instanceof Canvas) {
            //Increment the counter
            this.squareCount++;
            //Create a new square with target (the canvas) as parent, a custom name, and the current position.
            Square.create({parent: target, name: "Square " + this.squareCount, position: e.position});
            return Propagation.stopPropagation;
        }
    }
}