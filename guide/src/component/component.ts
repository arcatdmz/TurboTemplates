import {define, TurboElement} from "turbodombuilder";
import {ComponentView} from "./component.view";
import {ComponentData} from "./component.types";
import {ComponentModel} from "./component.model";
import {ComponentInteractor} from "./component.interactor";
import {ComponentTool} from "./component.tool";
import {ComponentSubstrate} from "./component.substrate";

//To create a custom web component, create a new class and extend TurboElement. Simple.
//You also have to define it for the browser using @define(), passing it the tag of the component.
//The tag should be at least two words separated by a dash (like "my-component" for example).
//Generic types (<ComponentView, ComponentData, ComponentModel>) are used for auto-completion,
//but you can omit them.
@define("my-component")
export class Component extends TurboElement<ComponentView, ComponentData, ComponentModel> {
    public static defaultProperties = {
        model: ComponentModel,
        view: ComponentView,
        interactors: ComponentInteractor,
        tools: ComponentTool,
        substrate: ComponentSubstrate,
        data: {a: "hello", b: "world", x: 4},
    }
}