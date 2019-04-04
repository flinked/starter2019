PS3='Please enter your choice: '
options=("components" "page" "section" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "components")
            sh sh/createComponents.sh
            break ;;
        "page")
            sh sh/createPages.sh
            break ;;
        "section")
            sh sh/createSection.sh
            break ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
