"use strict";
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    // Never do like this
    // because each created object will have the same function
    // it will lead to bad memory management
    /*
    this.calcAge = function () {
      return new Date().getFullYear() - this.birthYear
    };
    */
};
Person.prototype.calcAge = function () {
    return new Date().getFullYear() - this.birthYear;
};
Person.prototype.species = "Homo Sapiens";
const jonas = new Person("Jonas", 2006);
console.log(jonas);
console.log(jonas instanceof Person);
console.log(Person.prototype);
console.log(jonas.calcAge());
console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species"));
const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};
// Creates a blueprint as completely new object
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
console.log(mike.calcAge());
console.log("___________________________________________________");
class Teacher extends Person.prototype.constructor {
    constructor(fullName, birthYear, experience) {
        super(fullName, birthYear);
        this.experience = experience;
    }
}
const sarah = new Teacher("Sarah", 2000, 3);
console.log(sarah.experience);
console.log(sarah.firstName);
console.log(sarah.calcAge());
console.log("___________________________________________________");
// @ts-ignore
Array.prototype.getUnique = function () {
    return [...new Set(this)];
};
const test_arr = [1, 1, 1, 45, 345, 254, 4, 4, 4];
// @ts-ignore
console.log(test_arr.getUnique());
class Tower {
    hp;
    damage;
    _modificator;
    constructor(hp, damage) {
        this.hp = hp;
        this.damage = damage;
        this._modificator = 1;
    }
    levelUp() {
        this.hp *= 1.1;
        this.damage *= 1.1;
    }
    attack() {
        return this.damage * this._modificator;
    }
    get modificator() {
        return this._modificator;
    }
    set modificator(modification) {
        this._modificator = modification;
    }
    static description() {
        console.log("some description");
    }
}
const basicTower = new Tower(100, 100);
basicTower.modificator = 1.1;
console.log(basicTower.modificator);
basicTower.levelUp();
console.log(basicTower.attack());
/* // CHALLENGE #1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

Car.prototype.print = function () {
  console.log(`'${this.make}' going at ${this.speed}km/h`);
};
const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
mercedes.accelerate();
bmw.brake();
mercedes.brake();
bmw.print();
mercedes.print();
*/
/* // CHALLENGE #2
interface Car {
  make: string;
  speed: number;
}

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    return this;
  }

  break() {
    this.speed -= 5;
    return this;
  }

  get speedUp() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }

  print() {
    console.log(`${this.make} going at ${this.speed} km/h`);
  }
}

const ford = new Car("Ford", 120);
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.break();
ford.print();
console.log(ford.speedUs);
ford.speedUs = 300;
ford.print();
*/
/* // CHALLENGE #3

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}, with a charge of ${this.charge}%`
  );
};

const toyota = new EV("Toyota", 120, 40);

toyota.accelerate();
toyota.accelerate();
toyota.chargeBattery(90);
toyota.accelerate();
*/
/* // CHALLENGE #4
class EV extends Car {
  _charge: number;

  constructor(make, speed, charge) {
    super(make, speed);
    this._charge = charge;
  }

  chargeBattery(chargeTo) {
    this._charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this._charge--;
    console.log(
      `${this.make} going at ${this.speed}, with a charge of ${this._charge}%`
    );
    return this;
  }
}

const rav4 = new EV("toyota", 120, 100);
rav4
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate()
  .accelerate();
rav4.break();
rav4.accelerate();
*/
class Account {
    owner;
    currency;
    movements = [];
    //   #movements = [];
    locale = navigator.language;
    pin;
    // #pin;
    // _pin;
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
    }
    // API ⬇
    deposit(value) {
        this.movements.push(value);
        return this;
    }
    withdraw(value) {
        this.movements.push(-value);
        return this;
    }
    // #loanApproved() {
    // _loanApproved() {
    loanApproved() {
        return true;
    }
    requestLoan(value) {
        if (this.loanApproved()) {
            this.deposit(value);
            console.log(`Loan approved`);
            return this;
        }
        alert(`Loan request declined`);
    }
}
const acc1 = new Account("Obama", "EUR", 2808);
acc1.deposit(200);
acc1.withdraw(500);
acc1.requestLoan(99999999999999);
