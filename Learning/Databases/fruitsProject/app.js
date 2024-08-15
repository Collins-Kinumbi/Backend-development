const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/fruitsDB";

mongoose.connect(url);

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   name: "Apple",
//   rating: 9,
//   review: "Scrumptious!",
// });

const concordGrapes = new Fruit({
  name: "Concord grapes",
  rating: 10,
  review: "Best these grapes reign supreme",
});

const grapple = new Fruit({
  rating: 10,
  review: "Best these grapes reign supreme",
});

// Save a single fruit
async function saveFruit(fruit) {
  try {
    await fruit.save();
    console.log("Fruit saved successfully!");
  } catch (err) {
    console.error(err);
  }
}

// saveFruit(fruit);
// saveFruit(concordGrapes);
// saveFruit(grapple);

// const lime = new Fruit({
//   name: "Lime",
//   rating: 9,
//   review: "Me love some citrus!",
// });

// const grapes = new Fruit({
//   name: "Grapes",
//   rating: 10,
//   review: "So sweet and juicy!",
// });
// const pear = new Fruit({
//   name: "Pear",
//   rating: 7,
//   review: "Apple wannabe!",
// });

// Save multiple fruits
async function saveFruits(fruits) {
  try {
    await Fruit.insertMany(fruits);
    console.log("Fruits saved successfully!");
  } catch (err) {
    console.error(err);
  }
}

// saveFruits([lime, grapes, pear]);

// Find and log all fruits
async function findFruits() {
  try {
    const fruits = await Fruit.find();

    // console.log(fruits);

    mongoose.connection.close();

    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  } catch (err) {
    console.error(err);
  }
}

// findFruits();

// Updating
async function updateFruit(filter, update) {
  try {
    await Fruit.updateOne(filter, update);
    console.log("Fruit updated successfully!");
  } catch (err) {
    console.log(err);
  }
}

// updateFruit(
//   { _id: "66b0822bcda8fc83f1ba75ce" },
//   {
//     name: "Grapple",
//     rating: 8,
//     review: "Weird in a good way! Tastes like an apple and a grape! ",
//   }
// );

// Deleting
// // Delete one
async function deleteFruit(condtion) {
  try {
    await Fruit.deleteOne(condtion);
    console.log("Fruit deleted successfully");
  } catch (err) {
    console.log(err);
  }
}

// deleteFruit({ name: "Grapple" });

////////////////////////////////////////////////
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
});

// Save a person
async function savePerson(person) {
  try {
    await person.save();
    console.log("Person saved successfully!");
  } catch (err) {
    console.error(err);
  }
}

// savePerson(person);

// Delete many
async function deletePeople(condtion) {
  try {
    await Person.deleteMany(condtion);
    console.log("Items deleted successfully!");
  } catch (err) {
    console.log(err);
  }
}

// deletePeople({ name: "John" });
