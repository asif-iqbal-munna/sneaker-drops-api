'use strict';

const userData = [
  { username: "johndoe", name: "John Doe" },
  { username: "janedoe", name: "Jane Doe" },
  { username: "mikejohnson", name: "Mike Johnson" },
  { username: "sarahsmith", name: "Sarah Smith" },
  { username: "davidbrown", name: "David Brown" },
  { username: "emilydavis", name: "Emily Davis" },
  { username: "chrislee", name: "Chris Lee" },
  { username: "jessicawilson", name: "Jessica Wilson" },
  { username: "danielmartinez", name: "Daniel Martinez" },
  { username: "ashleygarcia", name: "Ashley Garcia" },
  { username: "matthewrodriguez", name: "Matthew Rodriguez" },
  { username: "amandawhite", name: "Amanda White" },
  { username: "jamesharris", name: "James Harris" },
  { username: "laurathompson", name: "Laura Thompson" },
  { username: "robertclark", name: "Robert Clark" },
  { username: "morganlewis", name: "Morgan Lewis" },
  { username: "williamwalker", name: "William Walker" },
  { username: "sophiahall", name: "Sophia Hall" },
  { username: "josephallen", name: "Joseph Allen" },
  { username: "oliviawright", name: "Olivia Wright" },
  { username: "ryanking", name: "Ryan King" },
  { username: "emmascott", name: "Emma Scott" },
  { username: "alexandergreen", name: "Alexander Green" },
  { username: "isabellaadams", name: "Isabella Adams" },
  { username: "benjaminbaker", name: "Benjamin Baker" },
  { username: "miaturner", name: "Mia Turner" },
  { username: "jacobphillips", name: "Jacob Phillips" },
  { username: "charlottecampbell", name: "Charlotte Campbell" },
  { username: "ethanparker", name: "Ethan Parker" },
  { username: "ameliaevans", name: "Amelia Evans" },
  { username: "noahedwards", name: "Noah Edwards" },
  { username: "avacollins", name: "Ava Collins" },
  { username: "lucasstewart", name: "Lucas Stewart" },
  { username: "harpermorris", name: "Harper Morris" },
  { username: "masonrogers", name: "Mason Rogers" },
  { username: "ellacook", name: "Ella Cook" },
  { username: "loganbell", name: "Logan Bell" },
  { username: "ariamurphy", name: "Aria Murphy" },
  { username: "carterrivera", name: "Carter Rivera" },
  { username: "scarlettcooper", name: "Scarlett Cooper" },
  { username: "jacksonrichardson", name: "Jackson Richardson" },
  { username: "gracecox", name: "Grace Cox" },
  { username: "sebastianhoward", name: "Sebastian Howard" },
  { username: "chloeward", name: "Chloe Ward" },
  { username: "liamtorres", name: "Liam Torres" },
  { username: "lilyreyes", name: "Lily Reyes" },
  { username: "olivergriffin", name: "Oliver Griffin" },
  { username: "zoeydiaz", name: "Zoey Diaz" },
  { username: "elijahhughes", name: "Elijah Hughes" },
  { username: "natalieflores", name: "Natalie Flores" }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', userData);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
