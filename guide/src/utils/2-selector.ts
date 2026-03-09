import {$, div, t, tu, turbo} from "turbodombuilder";

const el = div(); //New div stored in a variable

//Inspired by jQuery and D3, the toolkit augments web components with a set of useful operations.
//You can access them through one of these wrappers.
//Here I augmented the div I just created above.
turbo(el); tu(el); t(el); $(el);

//You can pick and choose the wrapper you want. They all do the same thing.
//I will stick to turbo().
//What's also useful is that you (probably) get auto-completion when typing turbo(el). ...
//Your IDE will show you all the possible operations you can perform.

//Here's an example
turbo(el).addToParent(document.body);

//Most of these functions return the wrapper itself, allowing you to chain commands if needed.
turbo(el).addToParent(document.body)
    .addChild(div())
    .remove();

//Also, most of these functions set up an additional layer of checks and error prevention.
//Passing an invalid parameter or wrapping an undefined element will just be ignored and not fail.