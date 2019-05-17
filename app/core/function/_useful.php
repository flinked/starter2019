<?php
function varDump($value, $text) {
    echo '<br>';
    echo $text ? : null;
    echo '<br>';
    var_dump($value ? : null);
    echo '<br>';
    echo '<br>';
}