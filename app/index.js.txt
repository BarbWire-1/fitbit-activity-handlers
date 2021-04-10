import { goals, today } from "user-activity"
/*
interface handler {
    activity: string;
    adjusted: string | number;
    goal: string | number;
    progress: number;
};

const handler = {
    name: 'Anonymous',
    progress: function (): void { console.log(JSON.stringify(this.activity)) }
};
const steps: handler = Object.create(handler)
steps.activity = 'steps';
steps.adjusted = today.adjusted.steps;
steps.goal = goals.steps;
console.log(handler.name + handler.progress)
*/   
const Person = {

   //attributes
   firstName : 'Anonymous', 
   lastName: 'Anonymous',
   birthYear  : 0,
   type : 'human',

   //methods
   name() { return this.firstName + ' ' + this.lastName },
   greet() {
       console.log('Hi, my name is ' + this.name() + ' and I am a ' + this.type + '.' )
   },
   age() {
      // age is a function of birth time.
   }
}

//const person = Object.create(Person) // that's it!

const Skywalker = Object.create(Person)
Skywalker.lastName = 'Skywalker'

const anakin = Object.create(Skywalker) // DESCENDANT COPY!! Interesting for exceptions??
anakin.firstName = 'Anakin'
anakin.birthYear = '442 BBY'
anakin.gender = 'male' // you can attach new properties.
anakin.greet() // 'Hi, my name is Anakin Skywalker and I am a human.'

Person.isPrototypeOf(Skywalker) // outputs true
Person.isPrototypeOf(anakin) // outputs true
Skywalker.isPrototypeOf(anakin) // outputs true


// create a `Robot` prototype by extending the `Person` prototype:
const Robot = Object.create(Person);
Robot.name = 'R2-D2';
Robot.type = 'robot';

Robot.machineGreet()
machinegreet();  { console.log('Hi, my name is ' + this.name() + ' and I am a ' + this.type + '.' )};
 
// Mutating the `Robot` object doesn't affect `Person` prototype and its descendants
//anakin.machineGreet() // error
console.log(Robot.machineGreet)
Person.isPrototypeOf(Robot) // outputs true
Robot.isPrototypeOf(Skywalker) // outputs false

/*
interface Robot extends  Person {
    machineGreet: Function
}
const Robot: Robot = Object.create(Person)
Robot.machineGreet = function(): void { console.log(101010) }
*/
