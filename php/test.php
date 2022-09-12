<?php

$file = 'semadult.pdf';

$fp = fopen($file, 'r');

while ( $content = fread($fp, 240 * 1024) ) {
    $slashPos = strrpos($content, '/');

    if ($slashPos) {
        $offset = strlen($content) - $slashPos;
        fseek($fp, -$offset, SEEK_CUR);
    }

    //$re = '/\/[a-zA-Z]*[Dd]ate/m';
    $re = '/\/[a-zA-Z]*[Ff]ont[ ]*[^ ]*/m';
    $str = $content;

    preg_match($re, $str, $matches);

    if ($matches) {
        var_dump($matches);
    }
}

fclose($fp);

