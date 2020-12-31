const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function createManager(arr) {
  const managerInfo = [
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is your office number?",
    },
  ];

  inquirer.prompt(managerInfo).then((answer) => {
    const manager = new Manager(
      arr[0],
      arr[1],
      arr[2],
      answer.managerOfficeNumber
    );
    console.log(manager);
    teamMembers.push(manager);
    createTeam();
  });
}

function createEngineer(arr) {
  const engineerInfo = [
    {
      type: "input",
      name: "github",
      message: "What is your GitHub username?",
    },
  ];

  inquirer.prompt(engineerInfo).then((answer) => {
    const engineer = new Engineer(
        arr[0],
        arr[1],
        arr[2],
      answer.github
    );
    teamMembers.push(engineer);
    createTeam();
  });
}

function createIntern(arr) {
  const internInfo = [
    {
      type: "input",
      name: "school",
      message: "What is your school name?",
    },
  ];

  inquirer.prompt(internInfo).then((answer) => {
    const intern = new Intern(
        arr[0],
        arr[1],
        arr[2],
      answer.school
    );
    teamMembers.push(intern);
    createTeam();
  });
}

function createTeam() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "addTeamMember",
      message: "Are you adding a new team member?",
      default: true,
    },
  ]).then((answer) => {
    if (answer.addTeamMember === true) {
      askQuestions();
    } else {
      outputTeam();
    }
  });
}

function outputTeam() {
  const HTML = render(teamMembers);
  fs.writeFile(outputPath, HTML, (err) => {
    if (err) throw err;
  });
}

const basicQuestions = [
    {
        type: "input",
        name: "employeeName",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "employeeID",
        message: "What is your ID number?",
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "What is your email address?",
      },
      {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
]

function askQuestions() {
    inquirer.prompt(basicQuestions).then((answer) => {
        let basicAnswers = [];
        basicAnswers.push(answer.employeeName, answer.employeeID, answer.employeeEmail, answer.role);
    if (answer.role === "Manager") {
        createManager(basicAnswers);
    } else if (answer.role === "Engineer") {
            createEngineer(basicAnswers);
        } else {
            createIntern(basicAnswers);
        }
  });
}

askQuestions();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// render(teamMembers)

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```