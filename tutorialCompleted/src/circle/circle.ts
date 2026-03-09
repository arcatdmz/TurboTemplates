import {
    define,
    TurboElement,
    Point,
    signal,
    randomColor,
    effect,
    turbo,
    p,
    TurboEvent, DefaultEventName
} from "turbodombuilder";
import "./circle.css";

//Custom circle element, defined as a custom element using @define().
//It extends TurboElement (making it a custom web component), without any generics.
//Presents the same code as the Square, but all in one file.
@define("demo-circle")
export class Circle extends TurboElement {
    //@signal turns any kind of simple field (like a string or a number) into a smart entity.
    //When the value of the @signal changes, it will notify and re-execute all the @effect
    //functions that read the @signal.
    @signal color: string = randomColor([60, 90], [40, 70]);
    @signal position: Point = new Point();
    @signal size: number = 100;
    @signal name: string = "Circle";

    //Paragraph element inside the square that contains its name
    protected nameElement: HTMLParagraphElement;

    //A move function that takes a delta Point and increments accordingly the position signal.
    public move(delta: Point) {
        this.position = delta.add(this.position);
    }

    //Initialization method called automatically when you do Circle.create().
    public initialize() {
        super.initialize();
        //Add custom initialization code here if you need to
    }

    //Setup method where you can create your sub-elements.
    //You don't have to create them here, but it's a useful structure to organize your code.
    //This method is automatically called in the initialize() method, which you can also overwrite.
    protected setupUIElements() {
        super.setupUIElements();
        //Create a paragraph with contentEditable set to true, which allows you to edit the text by clicking on it.
        this.nameElement = p({contentEditable: "true"});
    }

    //Setup method where you can add your sub-elements to the DOM.
    //You don't have to use this, but it's a useful structure to organize your code.
    //Again, this method is automatically called in the initialize() method.
    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild(this.nameElement);
    }

    //Setup method where you can add event listeners to your element or sub-elements.
    //You don't have to use this, but it's a useful structure to organize your code.
    //Again, this method is automatically called in the initialize() method.
    protected setupUIListeners() {
        super.setupUIListeners();
        //Adding a blur event listener to nameElement (when focus is released from it)
        turbo(this.nameElement).on(DefaultEventName.blur, () => {
            //Saving the typed name to the signal
            this.name = this.nameElement.textContent;
            //Logging the new saved name.
            console.log("Name:", this.name);
        });
    }

    //@effect methods are called automatically when the values of the signals they use change.
    @effect private updatePosition() {
        //Offset by half the size to center the circle at the stored position.
        const offset = this.size / 2;
        //Assign the position as a CSS transform style, in px.
        turbo(this).setStyle("transform", `translate(
            ${this.position.x - offset}px, 
            ${this.position.y - offset}px)
        `);
    }

    @effect private updateColor() {
        //Assign the color of the circle as a CSS background-color attribute.
        turbo(this).setStyle("backgroundColor", this.color);
    }

    @effect private updateSize() {
        //Change the width and height of the circle based on the size signal.
        turbo(this).setStyles({width: this.size + "px", height: this.size + "px"});
    }

    @effect private updateName() {
        //Set the text written inside nameElement.
        this.nameElement.textContent = this.name;
    }
}