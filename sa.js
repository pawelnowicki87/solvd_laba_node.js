class User {
    constructor(name = "KKK", surname, age) {
        this.name = name,
        this.surname = surname,
        this.age = age
    }

    sayHi() {
        return console.log(`Hello! My name is ${this.name} ${this.surname} and I'm ${this.age} years old.`);
    }
}

const user = new User(undefined, 'Nowicki', 38);
const user1 = new User("Michał", 'Lubidzic', 22);
const user2 = new User("dsa", 'dada', 17);

const arrayOfUsers = new Array(user, user1, user2)

arrayOfUsers.map(user => user.sayHi())

console.log('pierwsze wypisanie minęło ------');

arrayOfUsers.push(new User("Kamila", 'Bogota', 77))

// console.log(arrayOfUsers);
// arrayOfUsers.map(user => user.sayHi())



// user.sayHi();
// user1.sayHi();
// user2.sayHi();

class Student extends User {
    constructor(name, isEditable) {
        super(name),
        this.isEditable = isEditable
    }
}

const student = new Student("Kurwa", false);

console.log(student);