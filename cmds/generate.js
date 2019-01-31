const fs = require('fs-extra');
const findRoot = require('find-root');
const path = require('path');
let isAngularProject = false;
let isReactProject = false;
let reactComponentJsText = require('../templates/react/react-component-js');

module.exports = (args) => {
    let item = args._[1];
    let name = args._[2];

    let projectFolder = null;
    if (args.projectFolder || args.p) {
        projectFolder = args.projectFolder || args.p;
    }

    let componentGroup = null;

    if (args.componentGroup | args.c) {
        componentGroup = args.componentGroup | args.c;
    }

    const aemSpaProjectRoot = findRoot(process.cwd(), function (dir) {
        return fs.existsSync(path.resolve(dir, 'ui.apps')) && fs.existsSync(path.resolve(dir, 'ui.content'));
    });

    isAngularProject = fs.existsSync(path.resolve(aemSpaProjectRoot, 'angular-app'));
    isReactProject = fs.existsSync(path.resolve(aemSpaProjectRoot, 'react-app'));


    if (isAngularProject || isReactProject) {
        switch (item) {
            case 'template':
                console.log('going to generate a template named ' + name);
                generateTemplate(aemSpaProjectRoot, name, projectFolder, componentGroup);
                break;

            case 'component':
                console.log('going to generate a component named ' + name);
                generateComponent(aemSpaProjectRoot, name, projectFolder, componentGroup);
                break;

            default:
                error(`"${item}" is not a valid item that can be generate!`, true);
                break;
        }
    } else {
        console.log('This is not an AEM SPA project, please run this from inside of an AEM SPA project.');
    }

};


function generateComponent(projectRoot, name, projectFolder, componentGroup) {
    if (isReactProject) {

        if (componentGroup == null) {
            console.log('component group not specified, using react default of "reactApp"');
            componentGroup = 'reactApp';
        }

        if (projectFolder == null) {
            console.log('project folder not specified, using react default of "reactApp"');
            projectFolder = 'reactApp';
        }

        let aemName = name;
        let aemPath = projectRoot + '/ui.apps/src/main/content/jcr_root/apps/' + projectFolder + '/components/' + aemName;
        name = name.replace(/^\w/, c => c.toUpperCase());
        let reactComponentPath = projectRoot + '/' + projectFolder + '/src/components/' + name;
        let componentExists = fs.existsSync(path.resolve(projectRoot, projectFolder + '/src/components/' + name));
        if (componentExists) {
            console.log(name + ' component already exists, please create something else');
        } else {

            fs.outputFile(aemPath + '/_cq_editConfig.xml', 'hello!', function(err) {
                if (err) throw err;
                console.log('Created AEM component edit config');
            });

            fs.outputFile(aemPath + '/.content.xml', 'hello!', function(err) {
                if (err) throw err;
                console.log('Created AEM component content xml');
            });

            fs.outputFile(reactComponentPath + '/' + name + '.js', reactComponentJsText.getJsContent(name, aemName, projectFolder), function(err) {
                if (err) throw err;
                console.log('Created React component js file');
            });

            fs.outputFile(reactComponentPath + '/' + name + '.css', '', function(err) {
                if (err) throw err;
                console.log('Created React component css file');
            });

            fs.appendFile(projectRoot + '/react-app/src/ImportComponents.js', 'require(\'./components/'+ name +'/' + name + '\');', function (err) {
                if (err) throw err;
                console.log('ImportComponents updated');
            });
        }

    } else {
        if (componentGroup == null) {
            console.log('component group not specified, using angular default of "angularApp"');
            componentGroup = 'angularApp';
        }

        if (projectFolder == null) {
            console.log('project folder not specified, using angular default of "angularApp"');
            projectFolder = 'angularApp';
        }
        console.log('angular not implemented yet, please use ng generate');
    }
}

function generateTemplate(projectRoot, name) {
    if (isReactProject) {

    } else {
        console.log('angular not implemented yet, please use ng generate');
    }

}