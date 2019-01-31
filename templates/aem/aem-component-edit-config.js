module.exports = {
    getEditConfig() {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<jcr:root xmlns:cq=\"http://www.day.com/jcr/cq/1.0\" xmlns:jcr=\"http://www.jcp.org/jcr/1.0\" xmlns:nt=\"http://www.jcp.org/jcr/nt/1.0\"\n" +
            "          jcr:primaryType=\"cq:EditConfig\">\n" +
            "    <cq:inplaceEditing\n" +
            "            jcr:primaryType=\"cq:InplaceEditingConfig\"\n" +
            "            active=\"{Boolean}true\"\n" +
            "            editorType=\"text\">\n" +
            "        <config\n" +
            "                jcr:primaryType=\"nt:unstructured\"\n" +
            "                editElementQuery=\"\\[data-rte-editelement]\"/>\n" +
            "    </cq:inplaceEditing>\n" +
            "</jcr:root>";
    }
};