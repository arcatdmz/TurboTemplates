import {define, TurboElement, Point, expose, turbo} from "turbodombuilder";
import {SquareModel} from "./square.model";
import {SquareView} from "./square.view";
import "./square.css";
import {SquareInteractor} from "./square.interactor";

//Custom square element, defined as a custom element using @define().
//It extends TurboElement (making it a custom web component), with generic types for its view and model,
//great for autocompletion.
@define("demo-square")
export class Square extends TurboElement<SquareView, any, SquareModel> {
    //Expose fields from the model. Hover over @expose() to read more about it.
    @expose("model") color: string;
    @expose("model") size: number;
    @expose("model") position: Point;
    @expose("model") name: string;

    //Default properties for creating a new instance of Square. Used when calling Square.create().
    //You can define any custom fields to assign by default to new squares.
    public static defaultProperties = {
        view: SquareView,
        model: SquareModel,
        interactors: SquareInteractor
    };

    //A move function that takes a delta Point and increments accordingly the position stored in the model.
    public move(delta: Point) {
        this.model.position = delta.add(this.model.position);
    }
}