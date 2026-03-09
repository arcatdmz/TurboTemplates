import {
    div,
    element,
    h1,
    h2,
    h3,
    img,
    input,
    p,
    span,
    SvgNamespace,
    TurboButton,
    TurboIcon,
    video
} from "turbodombuilder";

//To create a new web component, you can use one of these functions
//There are many more. Check the documentation.
div(); h1(); h2(); p(); span(); img(); input(); video();

//They all take a TurboProperties object as optional parameter.
//Here's an example
div({
    style: "background-color: red",
    id: "myDiv",
    classes: "rounded",
    parent: document.body,
    children: [h1({text: "Hello"}), h3({text: "world"})],
    onClick: () => console.log("clicked")
});

//You can also use element() to create a new web component with the appropriate tag.
element({tag: "div"}); //Creates a new div.
//You can also create svg elements using the appropriate namespace.
element({tag: "svg", namespace: SvgNamespace});

//For custom web components, provided by the toolkit or created by you,
//you can use their static create() function.
TurboButton.create({text: "Click"}); //Creates a new TurboButton
TurboIcon.create({icon: "arrow-left.svg"}); //Crates a new icon