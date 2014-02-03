// Wild surge generator, based on the N
"use strict";

// Functions
var Die, Roll, Clear, Generate;

// Vars
var rollRegex;

Die = function(sides)
{
    return Math.floor(Math.random() * sides) + 1;
}

// Regex should match standard die notation
rollRegex = /(\d+)?\s*?d\s*?(\d+)(?:\s*?([+-])\s*?(\d+))?/g;
Roll = function(str)
{
    // Parse a string to see if it has any die notations in it, 
    // and roll them if it does, replacing the die notation string(s)
    // with the results
    var i, re, num, sides, add, total;
    while (re = rollRegex.exec(str))
    {
        total = 0;
        if (re)
        {
            num = re[1] ? re[1] : 1;
            sides = re[2]
            if (re[3])
            {
                add = parseInt(re[4], 10);
                if (isNaN(add)) add = 0;
            }
            for(i = 0; i < num; i += 1) 
            {
                total += Die(sides);
            }
            if (add)
            {
                total += add;
            }
            str = str.replace(re[0].trim(), total);
        }
    }
    return str;
}

Generate = function(event)
{
    var i, n;
    for(i = 0; i < event.data[0]; i += 1)
    {
        if ($('#output').text().length > 0)
        {       
            $('#output').append('</br>');
        }
        $('#output').append(Roll($.wildSurges[Die($.wildSurges.length)]));
    }
}

$(document).ready(function() 
{
    $('#clear').click(function() {$('#output').empty();});
    $('#roll-one').click([1], Generate);
    $('#roll-two').click([2], Generate);
    $('#roll-five').click([5], Generate);
    $('#roll-ten').click([10], Generate);
});