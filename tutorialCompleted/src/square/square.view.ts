import {turbo, effect, TurboView, p, DefaultEventName} from "turbodombuilder";
import {SquareModel} from "./square.model";
import {Square} from "./square";

//View of the square element
export class SquareView extends TurboView<Square, SquareModel> {
    //Paragraph element inside the square that contains its name
    public nameElement: HTMLParagraphElement;

    //Initialization method called automatically when you do Square.create() and the instance is assigned this view,
    //either though Square's static defaultProperties, or as a custom property passed in the properties
    //parameter for Square.create({...}).
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }

    //Setup method where you can create your sub-elements.
    //You don't have to create them here, but it's a useful structure to organize your code.
    //This method is automatically called in the view's initialize() method, which you can also overwrite.
    protected setupUIElements() {
        super.setupUIElements();
        //Create a paragraph with contentEditable set to true, which allows you to edit the text by clicking on it.
        this.nameElement = p({contentEditable: "true"});
    }

    //Setup method where you can add your sub-elements to the DOM.
    //You don't have to use this, but it's a useful structure to organize your code.
    //Again, this method is automatically called in the view's initialize() method.
    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild(this.nameElement);
    }

    //Setup method where you can add event listeners to your element or sub-elements.
    //You don't have to use this, but it's a useful structure to organize your code.
    //Again, this method is automatically called in the view's initialize() method.
    protected setupUIListeners() {
        super.setupUIListeners();
        //Adding a blur event listener to nameElement (when focus is released from it)
        turbo(this.nameElement).on(DefaultEventName.blur, () => {
            //Saving the typed name to the signal
            this.model.name = this.nameElement.textContent;
            //Logging the new saved name.
            console.log("Name:", this.model.name);
        });
    }

    //@effect methods are called automatically when the values of the signals they use change
    @effect private updatePosition() {
        //Offset by half the size to center the square at the model's position
        const offset = this.model.size / 2;
        //Assign the position as a CSS transform style, in px.
        turbo(this).setStyle("transform", `
        translate(${this.model.position.x - offset}px, ${this.model.position.y - offset}px)
        `);
    }

    @effect private updateColor() {
        //Assign the color of the square as a CSS background-color attribute.
        turbo(this).setStyle("backgroundColor", this.model.color);
    }

    @effect private updateSize() {
        //Change the width and height of the square based on the model's size
        turbo(this).setStyles({width: this.model.size + "px", height: this.model.size + "px"});
    }

    @effect private updateName() {
        //Set the text written inside nameElement.
        this.nameElement.textContent = this.model.name;
    }
}