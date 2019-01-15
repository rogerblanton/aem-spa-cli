const menus = {
    main: `
    aem-spa [command] <options>

    create .............. create a new AEM SPA project
    generate .............. generate a new item for the project 
    version ............ show package version
    help ............... show help menu for a command`,

    create: `
    aem-spa create <options>

    --framework, -f ..... the framework to use, accepted options are angular or react`,

    generate: `
    aem-spa generate <options>

    --item, -i ..... the item to generate, accepted options are component or template`,

};

module.exports = (args) => {
    const subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0];

    console.log(menus[subCmd] || menus.main);
};