<?php

// class Unit
// {
//     private $timelines = [
//         [], [], []
//     ];
//     private $selectedTimeline = 0;

//     public function setTimeline($no)
//     {
//         $this->selectedTimeline = $no;
//     }

//     public function setValue($name, $value)
//     {
//         foreach ($this->timelines as $idx => &$timeline) {
//             if ($idx == $this->selectedTimeline) {
//                 $timeline[$name] = $value;
//             } else if (!array_key_exists($name, $timeline)) {
//                 $timeline[$name] = null;
//             }
//         }
//     }

//     public function dump()
//     {
//         foreach (array_keys($this->timelines[0]) as $key) {
//             foreach ($this->timelines as $timeline) {
//                 $value = $timeline[$key];

//                 switch (true) {
//                 case $value === null:
//                     $value = 'null';
//                     break;
//                 }
                
//                 echo $value . " ";
//             }
//             echo "\n";
//         }
//     }
// }

// class System
// {
//     private $root = [];
//     private $curPath = '';
//     private $selected = null;

//     public function select($path)
//     {
//         $path = rtrim($path, '/');
//         $path = str_replace('.', $this->curPath, $path);

//         $this->curPath = '';
//         $this->selected = &$this->root;
//         if ($path != '') {
//             foreach (explode('/', $path) as $part) {
//                 $part = trim($part);
//                 if (array_key_exists($part, $this->selected) && is_array($this->selected[$path])) {
//                     $this->selected = &$this->selected[$part];
//                     if ($this->curPath == '') {
//                         $this->curPath = $part;
//                     } else {
//                         $this->curPath .= '.' . $part;
//                     }
//                 } else {
//                     // error
//                 }
//             }
//         }
//     }

//     public function selectRoot()
//     {
//         $this->select('');
//     }

//     public function setScalar($name, $scalar)
//     {
//         $this->selected[$name] = $scalar;
//     }
// }

class Block
{
    private $valueTable = [];
    private $valueTableWidth = 0;

    public function resizeTable($colCount, $rowCount)
    {
        $count = count($this->valueTable);
        $newCount = $colCount * $rowCount;

        if ($newCount > $count) {
            for ($i = 0; $i < ($newCount - $count); $i++) {
                array_push($this->valueTable, null);
            }
        } else if ($newCount < $count) {
            $this->valueTable = array_slice($this->valueTable, 0, $count);
        }

        $this->valueTableWidth = $colCount;
    }

    public function valueAt($col, $row)
    {
        return $this->valueTable[$col + $row * $this->valueTableWidth];
    }

    public function setValueAt($col, $row, $value)
    {
        $this->valueTable[$col + $row * $this->valueTableWidth] = $value;
    }

    public function setValues($values)
    {
        $rowCount = count($values);
        $colCount = 0;

        foreach ($values as $rowValues) {
            $colCount = max(count($rowValues), $colCount);
        }

        $this->resizeTable($colCount, $rowCount);

        foreach ($values as $row => $rowValues) {
            foreach ($rowValues as $col => $value) {
                $this->setValueAt($col, $row, $value);
            }
        }
    }

    public function dump()
    {
        $rowCount = ceil(count($this->valueTable) / $this->valueTableWidth);
        $colCount = $this->valueTableWidth;

        for ($row = 0; $row < $rowCount; $row++) {
            echo str_repeat('-', $colCount * (20 + 2) + 2) . "\n";
            for ($col = 0; $col < $colCount; $col++) {
                $value = $this->valueTable[$col + $row * $this->valueTableWidth];
                //if ($value === null) {
                //    $value = '(null)';
                //}
                $pad = 20 - strlen($value);
                echo '| ' . $value . str_pad(' ', $pad);
            }
            echo " |\n";
        }
        echo str_repeat('-', $colCount * (20 + 2) + 2) . "\n";
    }
}

$u = new Block;
$u->setValues([
    [null, 'all cases', null, null, 'otherwise'],
    ['Player', '(...)'],
    [null, 'Name of Player', '= "Greg" ?', '= "Jorge" ?'],
    ['Rank of Player', null, 'Leader', 'Vice Leader', 'Guest'],
]);


$u->dump();
