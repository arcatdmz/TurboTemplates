import {turbo} from "turbodombuilder";
import {SelectTool} from "./select.tool";
import {Canvas} from "../canvas/canvas";

//Snap Select tool
//A select tool that activates the "snap" substrate in the canvas when it is active.
//Accordingly, it snaps objects to a grid when the pointer is released.
export class SnapSelectTool extends SelectTool {
    public toolName = "snapSelect"; //Define the tool name

    //Retrieve the canvas
    public get canvas(): Canvas {
        return document.body.querySelector("my-canvas");
    }

    //When the tool is activated --> activate "snap" substrate
    public onActivate() {
        turbo(this.canvas).activateSubstrate("snap");
    }

    //When the tool is deactivated --> deactivate "snap" substrate
    public onDeactivate() {
        turbo(this.canvas).deactivateSubstrate("snap");
    }
}