import {TurboHandler} from "turbodombuilder";
import {ComponentModel} from "./component.model";

//A handler is a place for grouping a bunch of API functions and manipulations
//of part of your model's data.
//This helps to keep your code a bit more organized, especially if you have a lot of functions in your model.
//Generic types (<ComponentModel>) are optional but useful for auto-completion.
export class ComponentHandler extends TurboHandler<ComponentModel> {
    //Here are some useful fields and methods provided by the handler
    private handlerAPI() {
        this.model; //The model of this handler's component;
    }

    //Setup function called in the handler's constructor, if you need to add some behavior at that stage.
    protected setup() {
        super.setup();
        //Add code...
    }
}