This is an experiment in using the equivalent of sub-classing with inheritance in JavaScript to handle the API differences between activity types in Fitbit OS(!).

Structure
-
Activity stats for an activity type (*eg*, calories, steps) are managed in a handler object. There are different types of handlers, to accommodate the different ways in which activity stats must be obtained from the Fitbit API. These are:

* `standardHandler`: handles calories, steps, distance and elevationGain
* `azmHandler`: handles total activeZoneMinutes
* `hourlyStepsHandler`: handles hourly steps (well, it would if it were finished).

Code that's common to all handlers is encapsulated into an abstract base class (called `baseHandler`). `standardHandler`, `azmHandler` and `hourlyStepsHandler` are effectively sub-classes of `baseHandler`, in that they inherit properties from `baseHandler`.

> **Confession:** because JavaScript isn't a normal object-oriented language, there isn't really a hierarchy of object types at runtime, and the 'classes' aren't types but are actually objects. The structure described here applies to how the objects are constructed, rather than how they're used.

Advantages
-

This structure avoids needing to duplicate similar blocks of code, because common code is encapsulated in the base class object.

It also avoids needing to use conditional tests (including ternaries and switches) every second to work out how to handle a particular activity type. Determining how to extract stats for a particular activity type is done once per type (at initialisation), by specifying which handler to use for the activity type.

Other Features
-

Each activity type's goal is extracted from the API only once (at object creation), because accessing the value via a local variable is about 100 times faster than indexing into goals[].

An [IIFE](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression) is used to initialise the app, so that the function's memory can be released after it has run.

Limitations
-

This code does not contain any error detection or correction. The focus is entirely on object structure.

Although the code should execute efficiently, the approach is probably overkill for real applications.

Acknowledgement
-

This repository is based on a project written by [BarbWire-1](https://github.com/BarbWire-1).