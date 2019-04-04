
RED='\033[0;31m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color


echo "${BLUE}please enter the template name${NC}"

read templateName

echo "${BLUE}please enter a section name${NC}"

read sectionName

if [ -e ../template/${templateName}/views/${sectionName}.php ]
then
    echo "${RED}php file for section ${sectionName} already exits${NC}"
else
    touch ../template/${templateName}/views/${sectionName}.php
    echo "<div class='${templateName}__${sectionName}'></div>" >> ../template/${templateName}/views/${sectionName}.php
    echo "${GREEN}file created${NC}"
fi


if [ -e ../app/sources/sass/themes/views/${templateName}/_${sectionName}.scss ]
then
    echo "${RED}SCSS file for components ${sectionName} already exits${NC}"
else
    echo "${GREEN}SCSS file for ${sectionName} created${NC}"
    touch ../app/sources/sass/themes/views/${templateName}/_${sectionName}.scss
    echo ".${sectionName}{ }" >> ../app/sources/sass/themes/views/${templateName}/_${sectionName}.scss
    echo " @import 'views/${templateName}/_${sectionName}.scss';" >> ../app/sources/sass/themes/_main.scss
fi
