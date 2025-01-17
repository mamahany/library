const myLibrary = [];
let values = {};
const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book-btn");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector("#add-btn");
const closeBtn = document.querySelector("#close-btn");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");
const form = document.querySelector("form");

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function handleDialog(){
    values = {};
    dialog.showModal();
}

function addBookToLibrary(object) {
    book = new Book(object.title, object.author, object.pages, object.read);
    myLibrary.unshift(book);
    updateUi();
}

function updateUi(){
    container.innerHTML = "";
    myLibrary.forEach((book, index) => {
       let div = document.createElement("div");
       let h2 = document.createElement("h2");
       let para = document.createElement("p");
       let span = document.createElement("span");
       let removeBtn = document.createElement("button");
       let readBtn = document.createElement("button");
       let btnsContainer = document.createElement("div");
       div.setAttribute("class", "book");
       h2.setAttribute("class", "title");
       para.setAttribute("class", "author");
       span.setAttribute("class", "pages");
       removeBtn.setAttribute("class", "remove-btn");
       removeBtn.setAttribute("data-index", index);
       readBtn.setAttribute("class", "read-btn");
       btnsContainer.setAttribute("class", "btns-container");
       h2.textContent = book.title;
       para.textContent = "by " + book.author;
       span.textContent = "🕮 " + book.pages;
       removeBtn.textContent = "Delete";
       readBtn.textContent = book.read ? "Read ✔" : "Not read";
       readBtn.style.backgroundColor = book.read ? "var(--green)" : "var(--grave-gray)";
       removeBtn.addEventListener("click", ()=>{
        myLibrary.splice(index, 1);
        updateUi();
       })
       readBtn.addEventListener("click", ()=>{toggleRead(book.read, index)})
       div.appendChild(h2);
       div.appendChild(para);
       div.appendChild(span);
       btnsContainer.appendChild(removeBtn);
       btnsContainer.appendChild(readBtn);
       div.appendChild(btnsContainer);
       container.appendChild(div);
    });
    if(myLibrary.length == 0){
        container.innerHTML = '<div><h3 style="text-align:center;">Click the + to add a book.<h3></div>';
    }
}
function toggleRead(read, BookIndex){
    myLibrary[BookIndex].read = !read;
    updateUi();
}

newBookBtn.addEventListener("click", ()=>{handleDialog()});

addBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    if(form.checkValidity()){
        values.title = titleInput.value;
        values.author = authorInput.value;
        values.pages = pagesInput.value;
        values.read = readInput.checked;
        form.reset();
        dialog.close(values);
    }else{
        form.reportValidity();
    }
})

closeBtn.addEventListener("click", ()=>{
    form.reset();
    values = {};
    dialog.close("empty");
});

dialog.addEventListener("close", (e)=>{
    if(dialog.returnValue !== "empty"){
        addBookToLibrary(values);
    }
});


addBookToLibrary({title:"The 48 Laws of Power",author:" Robert Greene",pages:452,read:true});
addBookToLibrary({title:"Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",author:"James Clear",pages:320,read:false});
addBookToLibrary({title:"Daniel Defoe.",author:"Daniel Defoe",pages:286,read:false});
addBookToLibrary({title:"The Subtle Art of Not Giving a F*ck",author:"Mark Manson",pages:224,read:true});