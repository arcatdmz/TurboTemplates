import {define, signal, turbo, DefaultEventName, TurboButton, effect, input} from "turbodombuilder";
import {BucketTool} from "./bucket.tool";

//Custom element for the bucket tool
//Because it needs an input attached to it to choose the color.
@define("demo-bucket")
export class Bucket extends TurboButton {
    //Signal to fire @effect callbacks when the value changes
    @signal public color: string = "#000000";

    //The input to choose the color.
    private colorInput: HTMLInputElement;

    public static defaultProperties = {tools: BucketTool};

    //Setup method where you can create your sub-elements.
    //You don't have to create them here, but it's a useful structure to organize your code.
    protected setupUIElements() {
        super.setupUIElements();
        //Create a new hidden color input
        this.colorInput = input({type: "color", style: "visibility: hidden; position: absolute"});
    }

    //Setup method where you can add your sub-elements to the DOM.
    //You don't have to use this, but it's a useful structure to organize your code.
    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild(this.colorInput);
    }

    //Setup method where you can add event listeners to your element or sub-elements.
    //You don't have to use this, but it's a useful structure to organize your code.
    protected setupUIListeners() {
        super.setupUIListeners();
        turbo(this).on(DefaultEventName.click, () => this.colorInput.click());
        turbo(this.colorInput).on(DefaultEventName.input, () => {this.color = this.colorInput.value});
    }

    @effect private updateColor() {
        //When color changes --> update button border color and input
        turbo(this).setStyle("borderColor", this.color);
        this.colorInput.value = this.color;
    }
}