import {modelSignal, signal, TurboModel, TurboYBlock} from "turbodombuilder";
import {ComponentData} from "./component.types";

//Model class inspired by MVC and PAC
//The model typically holds the data of the component and simple operations on this data.
//It doesn't have access to anything but its data.
//The generic type (<ComponentData>) is optional and useful for auto-completion.
export class ComponentModel extends TurboModel<ComponentData> {
    //If you're working with Yjs data and real-time collaboration, add this line to your model.
    //I can explain in detail if you're interested.
    public static dataBlockConstructor = TurboYBlock;

    //A @signal is a field that, when its value changes, re-executes all the @effect functions
    //(they are typically defined in the view) that access it.
    //Here, I created a counter signal with a value of 0.
    //You can create signals anywhere, not just in the model.
    @signal counter: number = 0;

    //Since the model will receive data in the form of ComponentData, you can easily turn fields of
    //this data into signals using @modelSignal. These fields will be automatically assigned to the correct
    //field of the data (based on the name of the field), and re-execute @effect functions when they change.
    //Here, I defined a @modelSignal for a, b, and x from the data.
    @modelSignal() a: string;
    @modelSignal() b: string;
    @modelSignal() x: number;

    //Setup function called in the model's constructor, if you need to add some behavior at that stage.
    protected setup() {
        super.setup();
        //Custom setup code
    }

    //Here are some useful fields and methods provided by the model
    private modelAPI() {
        this.data; //You can access the data and set it.
        this.getData("a"); //Retrieve "a" from this.data, equivalent to this.a
        this.setData("a", "Hello"); //Set the value of "a". Equivalent to setting this.a
        this.getSize(); //Get the size of the data
        this.hasData("tt"); //Check if a value exists at "tt"
        this.deleteData("tt"); //Delete data at "tt"
        this.getAllKeys(); //Get all keys in the data (["a", "b", "x"])
        this.getAllValues(); //Get all values in the data (["Hello", "world", 4])
    }
}