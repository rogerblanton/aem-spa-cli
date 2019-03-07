#!/bin/bash
version=$(latest-github-release -o adobe -r aem-spa-project-archetype -V)
download $(latest-github-release -o adobe -r aem-spa-project-archetype -d "jar") > aem-spa-project-archetype-$version.jar
mvn install:install-file -Dfile=aem-spa-project-archetype-$version.jar -DgroupId=com.adobe.cq.spa.archetypes -DartifactId=aem-spa-project-archetype -Dversion=$version -Dpackaging=jar -DgeneratePom=true
