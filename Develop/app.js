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

function inputEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What type of team member are you adding?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((answer) => {
      console.log(answer);
      if (answer.role === "Manager") {
        createManager();
      } else if (answer.role === "Engineer") {
        createEngineer();
      } else if (answer.role === "Intern") {
        createIntern();
      }
    });
}

inputEmployee();

function createManager() {
  const managerInfo = [
    {
      type: "input",
      name: "managerName",
      message: "What is the manager's name?",
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is the manager's email address?",
    },
    {
      type: "input",
      name: "managerID",
      message: "What is the manager's ID?",
    },

    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is the manager's office number?",
    },
  ];

  inquirer.prompt(managerInfo).then((answer) => {
    const manager = new Manager(
      answer.managerName,
      answer.managerID,
      answer.managerEmail,
      answer.managerOfficeNumber
    );
    teamMembers.push(manager);
    createTeam();
  });
}

function createEngineer() {
  const engineerInfo = [
    {
      type: "input",
      name: "engineerName",
      message: "What is the engineer's name?",
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is the engineer's email address?",
    },
    {
      type: "input",
      name: "engineerID",
      message: "What is the engineer's ID?",
    },

    {
      type: "input",
      name: "github",
      message: "What is the engineer's GitHub username?",
    },
  ];

  inquirer.prompt(engineerInfo).then((answer) => {
    const engineer = new Engineer(
      answer.engineerName,
      answer.engineerID,
      answer.engineerEmail,
      answer.github
    );
    teamMembers.push(engineer);
    createTeam();
  });
}

function createIntern() {
  const internInfo = [
    {
      type: "input",
      name: "internName",
      message: "What is the intern's name?",
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is the intern's email address?",
    },
    {
      type: "input",
      name: "internID",
      message: "What is the intern's ID?",
    },

    {
      type: "input",
      name: "school",
      message: "What is the intern's school?",
    },
  ];

  inquirer.prompt(internInfo).then((answer) => {
    const intern = new Intern(
      answer.internName,
      answer.internID,
      answer.internEmail,
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
      inputEmployee();
    } else {
      outputTeam();
    }
  });
}

function outputTeam() {
  const HTML = render(teamMembers);
  fs.writeFile(outputPath, HTML, error => {
    if (error) {
      console.log(error);
      return;
    }
  });
}

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
