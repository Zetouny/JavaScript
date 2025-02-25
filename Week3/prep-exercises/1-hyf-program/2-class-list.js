import { modules, students, mentors, classes } from "./hyf.js";

/**
 * We would like to have a list of everyone that is currently participating in a class.
 * This means the students, but also the mentors that are currently teaching the class.
 * The students should be self explanatory, but to find the mentors you will need to follow these steps:
 * - Check what the `currentModule` of the class is
 * - Find the mentor(s) that are `nowTeaching` that module
 *
 * Should return the list of names and their roles. So something like:
 *
 *  [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }]
 */
const getPeopleOfClass = (className) => {
  let getStudent = students
    .filter((student) => student.class === className)
    .reduce((acc, val) => {
      acc.name = val.name;
      acc.role = "student";
      return acc;
    }, {});

  const getModule = classes.find((cls) => cls.name === className);

  let getMentor = mentors
    .filter((mentor) => mentor.nowTeaching === getModule.currentModule)
    .reduce((acc, val) => {
      acc.name = val.name;
      acc.role = "mentor";
      return acc;
    }, {});

  // Additional code for prettier output
  if (Object.keys(getStudent).length === 0) {
    getStudent = "No Students in this class";
  }

  if (Object.keys(getMentor).length === 0) {
    getMentor = "No Mentors for this class";
  }

  return [getStudent, getMentor];
};
// You can uncomment out this line to try your function
// console.log(getPeopleOfClass("class34"));

/**
 * We would like to have a complete overview of the current active classes.
 * First find the active classes, then for each get the people of that class.
 *
 * Should return an object with the class names as properties.
 * Each class name property contains an array identical to the return from `getPeopleFromClass`. So something like:
 *
 *  {
 *    class34: [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }],
 *    class35: [{ name: 'Jane', role: 'student' }, { name: 'Steve', role: 'mentor' }]
 *  }
 */
const getActiveClasses = () => {
  const activeClasses = classes.reduce((acc, val) => {
    if (val.active) {
      acc[val.name] = getPeopleOfClass(val.name);
    }
    return acc;
  }, {});

  return activeClasses;
};
// You can uncomment out this line to try your function
console.log(getActiveClasses());
