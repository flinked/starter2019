
RED='\033[0;31m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color


echo "${BLUE}please enter a components name${NC}"

read componentsName

if [ -e ../components/${componentsName}.php ]
then
    echo "${RED}php file for components ${componentsName} already exits${NC}"
else
    touch ../components/${componentsName}.php
    echo "<div class='${componentsName}'><?=$template_args['option']?></div>" >> ../components/${componentsName}.php
    echo "${GREEN}file created${NC}"
fi


if [ -e ../app/sources/sass/themes/components/${componentsName}.scss ]
then
    echo "${RED}SCSS file for components ${componentsName} already exits${NC}"
else
    echo "${GREEN}SCSS file for ${componentsName} created${NC}"
    touch ../app/sources/sass/themes/components/${componentsName}.scss
    echo ".${componentsName}{ }" >> ../app/sources/sass/themes/components/${componentsName}.scss
fi