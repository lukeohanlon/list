modalShow = () => {
    $('.ui.modal')
    .modal('show')
  ;
}
modalClose = () => {
    $('.ui.modal')
    .modal('hide')
  ;
}
window.addEventListener('load', () => {
    items = JSON.parse(localStorage.getItem('items')) || [];
    const newItem = document.querySelector('#form-list')
    displayitems()
    newItem.addEventListener('submit', e => {
        e.preventDefault()
        if(e.target.elements.content.value.trim() == ""){
            alert('please enter an item')
        }else {
            const item = {
                content: e.target.elements.content.value,
                done: false,
                createdAr: new Date().getTime()
            }
        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
        e.target.reset()
        displayitems()
        modalClose()
        }
    })
})

function displayitems() {
    const itemList = document.getElementById('item-list')

    itemList.innerHTML = ''
    items.forEach(item => {
        const itemItem = document.createElement('li')
        itemItem.classList.add('item-item')
        const input = document.createElement('input')
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const delBtn = document.createElement('button')
        content.classList.add('item-content')
        actions.classList.add('actions')
        delBtn.classList.add("delete")
        content.innerHTML = item.content
        delBtn.innerHTML = "Delete"
        actions.appendChild(delBtn)
        itemItem.appendChild(content)
        itemItem.appendChild(actions)
        itemList.appendChild(itemItem)

        if(item.done) {
            item.classList.add("done")
        }
        input.addEventListener('click', e => {
            item.done = e.target.checked
            localStorage.setItem('items', JSON.stringify(items))

            if(item.done) {
                itemItem.classList.add('done')
            } else {
                itemItem.classList.remove('done')
            }
            displayitems()
        })
        delBtn.addEventListener('click', e => {
            items = items.filter(i => i != item)
            localStorage.setItem('items', JSON.stringify(items))
            displayitems()
        })

    });
}
