const mvn = require('maven').create();

module.exports = (args) => {

    const commands = ['archetype:generate'];
    const defines = {
        'interactiveMode': false,
        'archetypeCatalog': 'local',
        'archetypeGroupId': 'com.adobe.cq.spa.archetypes',
        'archetypeArtifactId': 'aem-spa-project-archetype',
        'archetypeVersion': '1.0.3-SNAPSHOT',
        'package': 'com.todd',
        'groupId': 'test',
        'artifactId': 'test-spa',
        'version': '1.0.0-SNAPSHOT',
        'projectTitle': 'testing',
        'projectName': 'testing',
        'componentGroup': 'testingSpa'
    };
    mvn.execute(commands, defines).then(() => {

    }).catch((error) => {
        console.log(error);
    });
};