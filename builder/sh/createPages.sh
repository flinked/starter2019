
RED='\033[0;31m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color


echo "${BLUE}please enter the template name${NC}"

read templateName


if [ -e ../page-template/${templateName}.php ]
then
    echo "${RED}php file for page ${templateName} already exits${NC}"
else
    touch ../page-template/${templateName}.php
    echo "<?php" \
    "\n""/**" \
    "\n"" * Template Name: ${templateName}" \
    "\n"" *" \
    "\n"" */" \
    "\n""" \
    "\n""\$folder = '${templateName}';" \
    "\n""\$path = 'template/'. \$folder .'/'.\$folder.'-';" \
    "\n""" \
    "\n""if ( have_posts() ){" \
    "\n""  while ( have_posts() ) {" \
    "\n""    the_post();" \
    "\n""    get_header();" \
    "\n""    ?>" \
    "\n""    <div class="page--content">" \
    "\n""      <main class="${templateName}">" \
    "\n""      <?php" \
    "\n""      get_template_part(\$path . 'main');" \
    "\n""      ?>" \
    "\n""      </main>" \
    "\n""      <?php" \
    "\n""      get_footer();" \
    "\n""      ?>" \
    "\n""    </div>" \
    "\n""  <?php" \
    "\n""  }" \
    "\n""}" \
    "\n""?>" \
    >> ../page-template/${templateName}.php
    echo "${GREEN}file created${NC}"
fi

if [ -e ../template/${templateName}/${templateName}-main.php ]
then
    echo "${RED}PHP file for page ${templateName} already exits${NC}"
else
    echo "${GREEN}PHP file for ${templateName} created${NC}"
    mkdir ../template/${templateName}
    touch ../template/${templateName}/${templateName}-main.php
    echo "<div class='${templateName}__main'></div>" >> ../template/${templateName}/${templateName}-main.php
fi

if [ -e ../app/sources/sass/themes/views/${templateName}/main.scss ]
then
    echo "${RED}SCSS file for page ${templateName} already exits${NC}"
else
    echo "${GREEN}SCSS file for ${templateName} created${NC}"
    mkdir ../app/sources/sass/themes/views/${templateName}
    touch ../app/sources/sass/themes/views/${templateName}/main.scss
    echo ".${templateName}{ }" >> ../app/sources/sass/themes/views/${templateName}/main.scss
fi

