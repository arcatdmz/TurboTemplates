import {button} from "turbodombuilder";
import {SelectTool} from "./tools/select.tool";
import {AddSquareTool} from "./tools/addSquare.tool";
import {Canvas} from "./canvas/canvas";
import {Toolbar} from "./toolbar/toolbar";
import {Bucket} from "./tools/bucket/bucket";
import {SnapSelectTool} from "./tools/snapSelect.tool";
import {AddCircleTool} from "./tools/addCircle.tool";

Canvas.create({parent: document.body});
Toolbar.create({
    parent: document.body,
    entries: [
        button({text: "Select", tools: SelectTool, classes: "demo-button"}),
        button({text: "Snap Select", tools: SnapSelectTool, classes: "demo-button"}),
        button({text: "Add Square", tools: AddSquareTool, classes: "demo-button"}),
        button({text: "Add Circle", tools: AddCircleTool, classes: "demo-button"}),
        Bucket.create({text: "Bucket", classes: "demo-button"}),
    ]
});