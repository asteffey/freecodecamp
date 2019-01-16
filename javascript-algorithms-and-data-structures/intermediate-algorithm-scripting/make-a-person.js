var Person = function(firstAndLast) {
  // Complete the method below and implement the others similarly
  let firstName, lastName;

  this.getFullName = function() {
    return [firstName, lastName].join(" ");
  };

  this.setFullName = function(_firstAndLast) {
    [firstName, lastName] = _firstAndLast.split(" ");
  };

  this.getFirstName = function() {
    return firstName;
  };

  this.setFirstName = function(_firstName) {
    firstName = _firstName;
  };

  this.getLastName = function() {
    return lastName;
  };

  this.setLastName = function(_lastName) {
    lastName = _lastName;
  };
  
  this.setFullName(firstAndLast);
};

{
  var bob = new Person("Bob Ross");
  console.log(Object.keys(bob).length +"=="+ 6);
  console.log((bob instanceof Person) +"=="+ true);
  console.log(bob.firstName +"=="+ undefined);
  console.log(bob.lastName +"=="+ undefined);
  console.log(bob.getFirstName() +"=="+ "Bob");
  console.log(bob.getLastName() +"=="+ "Ross");
  console.log(bob.getFullName() +"=="+ "Bob Ross");
  bob.setFirstName("Haskell"); console.log(bob.getFullName() +"=="+ "Haskell Ross");
  bob.setLastName("Curry"); console.log(bob.getFullName() +"=="+ "Haskell Curry");
  bob.setFullName("Haskell Curry"); console.log(bob.getFullName() +"=="+ "Haskell Curry");
  bob.setFullName("Haskell Curry"); console.log(bob.getFirstName() +"=="+ "Haskell");
  bob.setFullName("Haskell Curry"); console.log(bob.getLastName() +"=="+ "Curry");
}

//reset bob for freecodecamp tests
var bob = new Person("Bob Ross");