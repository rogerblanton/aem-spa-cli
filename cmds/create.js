const mvn = require('maven').create();
const inquirer = require('inquirer');
const ora = require('ora')

module.exports = (args) => {

    let questions = [
        {
            type: 'input',
            name: 'package',
            message: 'Package Name:'
        },
        {
            type: 'input',
            name: 'groupId',
            message: 'Group ID (Maven artifact groupId for all projects):'
        },
        {
            type: 'input',
            name: 'artifactId',
            message: 'Artifact ID (Maven artifact "root" artifactId, is suffixed for the individual modules):'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Starting Maven Version Number:'
        },
        {
            type: 'input',
            name: 'projectTitle',
            message: 'Project Title (descriptive project name):'
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'Project Name (Used for building AEM apps path, content path, conf etc. Should not include spaces or special characters):'
            //TODO add validation for this one since it does break stuff
        },
        {
            type: 'input',
            name: 'componentGroup',
            message: 'Component Group (Name of the component group in AEM Editor):'
        },
        {
            type: 'list',
            name: 'optionFrontend',
            message: 'Front End Framework:',
            choices: ['angular', 'react']
        }
    ];

    inquirer.prompt(questions).then(answers => {
        const commands = ['archetype:generate'];
        const defines = {
            'interactiveMode': false,
            'archetypeCatalog': 'local',
            'archetypeGroupId': 'com.adobe.cq.spa.archetypes',
            'archetypeArtifactId': 'aem-spa-project-archetype',
            'archetypeVersion': '1.0.3-SNAPSHOT',
            'package': answers['package'],
            'groupId': answers['groupId'],
            'artifactId': answers['artifactId'],
            'version': answers['version'],
            'projectTitle': answers['projectTitle'],
            'projectName': answers['projectName'],
            'componentGroup': answers['componentGroup'],
            'optionFrontend': answers['optionFrontend']
        };
        const spinner = ora().start();
        mvn.execute(commands, defines).then(() => {
            spinner.stop();
        }).catch((error) => {
            console.log(error);
        });
    });
};