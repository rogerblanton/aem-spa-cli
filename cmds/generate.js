const fs = require('fs-extra');
const findRoot = require('find-root');
const path = require('path');
let isAngularProject = false;
let isReactProject = false;
let componentjsText = require('../templates/component-js');

module.exports = (args) => {
    let item = args._[1];
    let name = args._[2];

    const aemSpaProjectRoot = findRoot(process.cwd(), function (dir) {
        return fs.existsSync(path.resolve(dir, 'ui.apps')) && fs.existsSync(path.resolve(dir, 'ui.content'));
    });

    isAngularProject = fs.existsSync(path.resolve(aemSpaProjectRoot, 'angular-app'));
    isReactProject = fs.existsSync(path.resolve(aemSpaProjectRoot, 'react-app'));

    if (isAngularProject || isReactProject) {
        switch (item) {
            case 'template':
                console.log('going to generate a template named ' + name);
                generateTemplate(aemSpaProjectRoot, name);
                break;

            case 'component':
                console.log('going to generate a component named ' + name);
                generateComponent(aemSpaProjectRoot, name);
                break;

            default:
                error(`"${item}" is not a valid item that can be generate!`, true);
                break;
        }
    } else {
        console.log('This is not an AEM SPA project, please run this from inside of an AEM SPA project.');
    }

};


function generateComponent(projectRoot, name) {
    if (isReactProject) {

        let aemName = name;
        //TODO get project name in here
        let aemPath = projectRoot + '/ui.apps/src/main/content/jcr_root/apps/reactApp/components/' + aemName;
        name = name.replace(/^\w/, c => c.toUpperCase());
        let reactComponentPath = projectRoot + '/react-app/src/components/' + name;
        let componentExists = fs.existsSync(path.resolve(projectRoot, 'react-app/src/components/' + name));
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

            fs.outputFile(reactComponentPath + '/' + name + '.js', componentjsText.getJsContent(name, aemName), function(err) {
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
        console.log('angular not implemented yet, please use ng generate');
    }
}

function generateTemplate(projectRoot, name) {
    if (isReactProject) {

    } else {
        console.log('angular not implemented yet, please use ng generate');
    }

}