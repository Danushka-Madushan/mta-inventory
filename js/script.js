const regex = new RegExp('^[0-9]$')

$('.mv-ico-2').hide();
$('.mv-ico-1').hide();

const getQuerry = (querry) => {
    return document.querySelector(querry)
}

const checkInput = (key) => {
    let count = getQuerry('.amt-input').value
    if (count.length <= 2) {
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

const createNewElement = (name, amount) => {
    const item = document.createElement("div");
    let icon = (Icons.hasOwnProperty(name) ? Icons[name] : Icons['Item'])
    
    item.className = 'item'
    item.innerHTML = `
    <button class="item-icon">
        <i class="${icon}"></i>
    </button>
    <div class="it-nfo">
        <button class="it-name">${name}</button>
        <button class="cunt">${amount}</button>
    </div>`;

    return (item ? item : false)
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

const parseJSON = (method, Jobject) => {
    if (method == 'decode' && Jobject) {
        let deObject = {}, parsed = JSON.parse(Jobject)
        for (const elm in parsed[0]) {
            deObject[parsed[0][elm][0]] = parsed[0][elm][1]
        }   
        return deObject
    } else if (method == 'encode' && Jobject) {
        let enObject = [[]]
        for (const each in Jobject) {
            enObject[0].push([getName(false, each), Jobject[each]])
        }
        return JSON.stringify(enObject)
    }
}

const getAllDeckItems = (deckid) => {
    let deck = getQuerry(`.deck-${deckid}-items`)
    return (deck ? deck.querySelectorAll('.item') : []);
}

const getDuplicateItems = (deckname) => {
    let dups = {}, ditems = {}, reData = {}

    let items = getAllDeckItems(deckname)
    for (let i = 0; i < items.length; i++) {
        let cname = items[i].children[1].children[0].innerText
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

const emptyDecks = () => {
    let decks = ['a', 'b']
    for (const deck in decks) {
        let items = getAllDeckItems(decks[deck])
        for (const item of items) {
            item.remove()
        }
    }
    return 1
}

const sortDeck = (prime, dup) => {
    for (let i = 0; i < dup.length; i++) {
        let curVal = prime.children[1].children[1].innerText
        let addition = dup[i].children[1].children[1].innerText
        prime.children[1].children[1].innerText = parseInt(curVal) + parseInt(addition)
        dup[i].remove()
    }
}

const updateDeckValue = (method, deck) => {
    let d1nitems = getAllDeckItems('a'), val1 = 0
    let d2nitems = getAllDeckItems('b'), val2 = 0

    for (let i = 0; i < d1nitems.length; i++) {
        let amount = getData(d1nitems[i])[2]
        val1 += amount
    }

    for (let i = 0; i < d2nitems.length; i++) {
        let amount = getData(d2nitems[i])[2]
        val2 += amount
    }

    if (method == 'get') {
        return (deck == 'a' ? (val1/100).toFixed(2) : (val2/100).toFixed(2))
    }

    getQuerry('.deck-a').children[0].children[2].children[1].innerText = (val1/100).toFixed(2)
    getQuerry('.deck-b').children[0].children[2].children[1].innerText = (val2/100).toFixed(2)

} 

const analyzeDeck = (deckid) => {
    let deckitems = getDuplicateItems(deckid)
    for (let key in deckitems) {
        if (deckitems.hasOwnProperty(key)) {
            let primeItem = deckitems[key][0]
            let childItems = deckitems[key][1]
            sortDeck(primeItem, childItems)
        }
    }
    updateDeckValue(0, false)
    /* getAllDeckItems(deckid) use this to update mta  */
    let de = ['a', 'b']
    for (const e in de) {
        let items = {}
        let g = getAllDeckItems(de[e])
        for (let i = 0; i < g.length; i++) {
            let v = getData(g[i])
            items[v[1]] = v[2]
        }
        if (de[e] == 'a') {
            console.log(parseJSON('encode', items), 'User Inventory')
        } else if (de[e] == 'b') {
            console.log(parseJSON('encode', items), 'User Stash')
        }
        
    }
    return 1
}

const transferItem = (item, parentDeck) => {
    let curAmount = updateDeckValue('get', (parentDeck == 'deck-a-items' ? 'b' : 'a'))
    let curtotal = parseFloat(curAmount) + parseFloat((getData(item)[2]/100).toFixed(2))
    if (curtotal <= maxAmount[(parentDeck == 'deck-a-items' ? 'b' : 'a')]) {
        if (parentDeck == 'deck-a-items' && item) {
            getQuerry('.deck-b-items').appendChild(item)
            analyzeDeck('b')
        } else if (parentDeck == 'deck-b-items' && item) {
            getQuerry('.deck-a-items').appendChild(item)
            analyzeDeck('a')
        }
    } else {
        console.log('Max Amount reached')
    }
}

const addItemsToDeck = (data, deck) => {
    let items = parseJSON('decode', data)
    if (Object.keys(items).length > 0) {
        for (let i in items) {
            let newItem = createNewElement(getName(true, i), items[i])
            if (newItem) {
                transferItem(newItem, (deck == 'a' ? 'deck-b-items' : 'deck-a-items'))
            }
        }
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
