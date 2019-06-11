'use strict';

/*let Huffman = new HuffmanCoding();
let timing;*/

//Encoder
const table = document.getElementsByTagName('table')[0];
const enCoder = document.getElementById('enCoder');

// Decoder
const deCoder = document.getElementById('deCoder');
const resultID = document.getElementById('result');


//Events 
enCoder.addEventListener('input', function inputListener(e) {
    //cleanup 
    deCoder.disabled = true;
    let timing = setTimeout(function() {
        removeAllRows(table.children);
        DefaultValues();
        if (enCoder.value !== "") {
            Huffman.init(enCoder.value);
            updateTable(Huffman.table, Huffman.code);
            // updateGraph(Huffman.table);
            deCoder.disabled = false;
        }
    }, 400);

});

deCoder.addEventListener('input', function inputListener(e) {
    deCoder.value = e.target.value.replace(/[^01]/g, '');
    const list = Huffman.readCode(deCoder.value);
    resultID.innerHTML = list.join('');
});
// End of events

function createRow(char, apperane, probability, code) {
    const row = document.createElement('tr');

    const charTD = document.createElement('td');
    const apperaneTD = document.createElement('td');
    const probabilityTD = document.createElement('td');
    const codeTD = document.createElement('td');

    //copy the info
    charTD.innerHTML = char;
    apperaneTD.innerHTML = apperane + 'x';
    probabilityTD.innerHTML = probability + '%';
    codeTD.innerHTML = code;

    // console.log
    //styling
    codeTD.className = 'code';

    //append to the table 
    row.appendChild(charTD);
    row.appendChild(apperaneTD);
    row.appendChild(probabilityTD);
    row.appendChild(codeTD);

    table.appendChild(row);
}


//Default functions 
function removeAllRows(elm) {
    let lastElm;
    while (elm.length > 1) {
        lastElm = elm.length - 1;
        elm[lastElm].parentNode.removeChild(elm[lastElm]);
    }
}

function DefaultValues() {
    deCoder.value = '';
    resultID.innerHTML = '';
}
//End of Default functions 

//Update function 
function updateTable(keys, HuffmanCode) {
    let probability,
        frequency,
        size = enCoder.value.length;

        
        //End-result
        keys.forEach(function readElement(elm) {
        let frequencys = elm.freq;
        let probability = ((elm.freq / size) * 100).toFixed(0);
        const char = getChar(elm.value);
        createRow(char, frequencys, probability, elm.code);
    });

}
//End of Update function 

//Helper functions
function getChar(char) {
    if (char.charCodeAt() == 32) {
        char = 'Space'
    } else if (char.charCodeAt() == 9) {
        char = 'Tabb'
    } else if (char.charCodeAt() == 10) {
        char = "New Line"
    }
    return char;
}