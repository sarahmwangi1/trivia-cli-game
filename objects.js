
const student ={
    dob:"2000-10-05",
    inHostel: false,
    firstName:"Tin",
    lastName:"foil",
    lastThreeVaccines: ["BCG", "Polio", "Tetenus"],
    speak(){
console.log("Hello,my name is", this.firstName)
    }
}

const course = Object.create(student)
console.log("This is a copied object", course.firstName)

//Accessing values in objects
console.log("Student",student.lastName)
console.log("FNAME", student["firstName"])
console.log("Speak",student.speak)

student.speak ()

//Add values
student ["nationality"]= "Kenyan"
console.log("student",student)

//update values
student ["nationality"]= "Tanzanian"
student.firstName = "A Tin"
console.log("student",student)

//Delete a value
delete student.firstName
delete student["nationality"]
console.log("student",student)

const keys =Object.keys(student)
const values =Object.values(student)
const entries =Object.entries(student)

console.log("kes",keys)
console.log("values",values)
console.log("entries",entries)