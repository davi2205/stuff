<?php

$file = 'semadult.pdf';

$fp = fopen($file, 'r');

$tamanhoBloco = 1024; // deve ser maior q o tamanho da string a ser pesquisada

while ( $content = fread($fp, $tamanhoBloco) ) {
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

