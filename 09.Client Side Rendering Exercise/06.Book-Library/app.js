import { render } from './node_modules/lit-html/lit-html.js'
import { createBook, deleteBookById, getAllBooks, getBookById, updateBook } from "./src/api/data.js";
import { createTable } from "./templates/table.js";
import { addForm } from "./templates/addForm.js";
import { editForm } from "./templates/editForm.js";
import { createBookTr } from "./templates/bookTr.js";

const ctx = {
    loadBooks,
    onDelete,
    onEdit,
    onSave,
    onSubmit
}

const body = document.querySelector('body');
render(createTable(ctx), body);
const tbody = document.querySelector('tbody')
const formSec = document.querySelector('#form-section');
const editSec2 = addForm(ctx);
render(editSec2, formSec)

async function loadBooks() {
    const res = await getAllBooks();
    const booksArr = Object.entries(res);
    const rows = booksArr.map(book => createBookTr(book, ctx))
    render(rows, tbody)
    const editSec = addForm(ctx);
    render(editSec, formSec);

}
async function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    e.target.reset()
    const title = formData.get('title')
    const author = formData.get('author');
    if (!title || !author) {
        alert('Empty fields!')
        return
    }
    await createBook(author, title);
    loadBooks()
}

async function onEdit(id) {
    const book = await getBookById(id)
    const form = editForm(book, (e) => onSave(e, id));
    render(form, formSec)
}

async function onDelete(id) {
    await deleteBookById(id)
    loadBooks()
}

async function onSave(e, id) {
    e.preventDefault();
    const formData = new FormData(e.target);
    e.target.reset()
    const title = formData.get('title')
    const author = formData.get('author')
    await updateBook(id, author, title)
    loadBooks()
}