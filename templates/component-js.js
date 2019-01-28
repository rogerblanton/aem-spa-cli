
module.exports = {

    getJsContent: (name, aemName) => {
        return "/*\n" +
            name + ".js\n" +
            " \n" +
            "Maps to reactApp/components/content/" + aemName + "\n" + //TODO get actual project name in here
            "*/\n" +
            " \n" +
            "import React, {Component} from 'react';\n" +
            "import {extractModelId} from '../../Utils';\n" +
            "import {MapTo} from '@adobe/cq-react-editable-components';\n" +
            "/**\n" +
            "* Default Edit configuration for the Text component that interact with the Core Text component and sub-types\n" +
            "*\n" +
            "* @type EditConfig\n" +
            "*/\n" +
            "const " + name + "EditConfig = {\n" +
            " \n" +
            "    emptyLabel: 'Text',\n" +
            " \n" +
            "    isEmpty: function(props) {\n" +
            "        return !props || !props.text || props.text.trim().length < 1;\n" +
            "    }\n" +
            "};\n" +
            " \n" +
            "// TODO replace the below example code with your actual code" +
            "/**\n" +
            "* " + name + " React component\n" +
            "*/\n" +
            "class" + name + "extends Component {\n" +
            " \n" +
            "    get richTextContent() {\n" +
            "        return <div id={extractModelId(this.props.cqPath)} data-rte-editelement dangerouslySetInnerHTML={{__html:  this.props.text}}/>;\n" +
            "    }\n" +
            " \n" +
            "    get textContent() {\n" +
            "        return <div>{this.props.text}</div>;\n" +
            "    }\n" +
            " \n" +
            "    render() {\n" +
            "        return this.props.richText ? this.richTextContent : this.textContent;\n" +
            "    }\n" +
            "}\n" +
            " \n" +
            "MapTo('" + aemName + "/components/content/text')(" + name + ", " + name + "EditConfig);";

    }
};