const regex = new RegExp('^[0-9]{1,2}$')
$('.mv-ico-2').hide();
$('.mv-ico-1').hide();

const getQuerry = (querry) => {
    return document.querySelector(querry)
}

const checkInput = (key) => {
    let count = getQuerry('.amt-input').value
    if (count.length <= 1) {
        let k = parseInt(key)
        if (regex.test(k)) {
            return true
        }
    }
    return false
}

getQuerry('.amt-input').onkeypress = (event) => {
    return checkInput(event.key)
}

/* select-and-move */

const mvBtn = (a, b) => {
    $(`#${a}-mv`).hide()
    $(`#${b}-mv`).fadeIn()
}

const allOut = () => {
    $('#right-mv').fadeOut()
    $('#left-mv').fadeOut()
}

const toggleTransferDeck = (deck, curState) => {    
    (deck == 'deck-a-items' ? mvBtn('left', 'right') : mvBtn('right', 'left'));
    (curState == 1 ? allOut() : false);
}

const getSelectedItem = () =>{
    let item = getQuerry('.selected')
    let parent = false
    if (item) {
        parent = item.parentNode.className
    }
    return (item && parent ? [item, parent] : false)
}

const copyElement = (icon, name, count) => {
    const item = document.createElement("div");
    item.className = 'item'
    item.innerHTML = `
    <button class="item-icon">
        <i class="${icon}"></i>
    </button>
    <div class="it-nfo">
        <button class="it-name">${name}</button>
        <button class="cunt">${count}</button>
    </div>`;
    return (item ? item : false)
}

const getData = (item) => {
    if (item) {
        let icon = item.children[0].lastElementChild.className
        let name = item.children[1].childNodes[1].innerText
        let itcount = item.children[1].children[1].innerText
        return [icon, name, parseInt(itcount)]
    }
    return false
}

const getAllDeckItems = (deckid) => {
    let deck = getQuerry(`.deck-${deckid}-items`)
    return (deck ? deck.querySelectorAll('.item') : []);
}

const getDuplicateItems = (deckname) => {
    let dups = {}, ditems = {}, reData = {}

    let items = getAllDeckItems(deckname)
    for (let i = 0; i < items.length; i++) {
        let cname = items[i].children[0].children[0].className
        if (cname in ditems) {
            if (typeof(dups[cname]) != 'object') {
                dups[cname] = []
            }
            dups[cname].push(items[i])
        } else {
            ditems[cname] = items[i]
        } 
    }

    for (let key in ditems) {
        if (ditems.hasOwnProperty(key)) {
            if (dups.hasOwnProperty(key)) {
                reData[key] = []
                reData[key].push(ditems[key])
                reData[key].push(dups[key])
            } 
        }
    }

    return reData
}

const analyzeDeck = (deckid) => {
    let deckitems = getDuplicateItems(deckid)
    for (let key in deckitems) {
        if (deckitems.hasOwnProperty(key)) {
            let primeItem = deckitems[key][0]
            let childItems = deckitems[key][1]
        }
    }
    /* make a function to sort deck  */
    return 1
}

const transferItem = (item, parentDeck) => {
    if (parentDeck == 'deck-a-items' && item) {
        getQuerry('.deck-b-items').appendChild(item)
    } else if (parentDeck == 'deck-b-items' && item) {
        getQuerry('.deck-a-items').appendChild(item)
    }
}

const fireTransfer = (parentDeck, item, count) => {
    let itmData = getData(item)
    if (itmData[2] - count >= 0) {
        if (count != 0 && itmData && itmData[2] != count) {
            let cpitm = copyElement(itmData[0], itmData[1], count)
            item.children[1].children[1].innerText = itmData[2] - count
            transferItem(cpitm, parentDeck)
        } else {
            transferItem(item, parentDeck);
            (item ? item.classList.toggle("selected") : false);
        }
    } else {
        console.log('Entered Amount is Larger than Selected Amount') // User Notfication
    }
}

const getCount = () => {
    let count = getQuerry('.amt-input').value
    return (count && count != ' ' ? parseInt(count) : 0)
}

const eventTransfer = () => {
    let item = getSelectedItem()
    let sCount = getCount()
    if (!item) {
        console.log('Please Select first before moving') // User Notfication
    } else {
        fireTransfer(item[1], item[0], sCount)
    }
}

getQuerry('#right-mv').onclick = () => {eventTransfer()}

getQuerry('#left-mv').onclick = () => {eventTransfer()}

/* ---- */

$('.container').on("click", ".item", function() {
    let selectedEl = getQuerry(".selected");
    if (selectedEl && selectedEl !== this) {
        selectedEl.classList.remove("selected");
    }
    this.classList.toggle("selected");
    toggleTransferDeck(this.parentElement.classList.value, this.classList.length)
});

/* ---- */
