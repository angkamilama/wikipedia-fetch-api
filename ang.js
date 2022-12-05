const userInput = document.querySelector('#user');
const display = document.querySelector('.text-box');
const btn = document.querySelector('button');

btn.addEventListener('click', getValue);


function getValue(e) {
    e.preventDefault();
    let typedWord = userInput.value;
    console.log(typedWord); // It works!!!
    if (!typedWord) {
        display.innerHTML = '<p>Please enter a word to search !!!</p>';
        return;
    }
   fetchPages(typedWord);
}


const fetchPages = searchValue => {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${searchValue}`)
   .then (response => response.json())
   .then (data => {
      console.log(data);
         let result = data.query.search;
        //  console.log(typeof result);   =>object
         renderResult(result);
    })
   .catch (error => {         
    display.innerHTML = `<p> there is an ${error}... </p>`;
         return;
   });
}

const renderResult = (list) => {
    const cardsList = list.map(item => {
        const {title, pageid, snippet} = item;
        return `
            <div class='item-info'>
                <a href="https://en.wikipedia.org/?curid=${pageid}" target="_blank"><p>${title}</p></a>
                <p>${snippet}</p>
            </div>`;
        })
    .join('');
    
    display.innerHTML =`<div class='item-info'>${cardsList}</div>`;
}


