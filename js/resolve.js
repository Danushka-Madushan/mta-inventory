const currentType = {
    "type" : "",
}

const realName = {
    'pizza' : 'Pizza',
    'hamburguer' : 'Hamburger',
    'burrito' : 'Burrito',
    'Water' : 'Water Bottle',
    'refrigerante' : 'Water',
    'whisky' : 'Whisky',
    'colete' : 'Armor',
    'taco' : 'Baseball Bat',
    'taser' : 'Taser',
    'glock' : 'Glock',
    'deagle' : 'Deagle',
    'escopeta' : 'ShotGun',
    'tec9' : 'Tec-9',
    'mp5' : 'MP5',
    'ak47' : 'AK-47',
    'm4a1' : 'M4A1',
    'awm' : 'AWM',
    '.50' : '.50',
    '762' : '.762',
    '556' : '.556',
    '.45' : '.45',
    '12' : '12 Gauge',
    '9mm' : '9mm',
    'Repaire-Kit' : 'Repaire Kit',
    'bandagem' : 'Bandages',
    'cavalo' : 'Mask I',
    'touro' : 'Mask II',
    'flor' : 'Flowers',
    'gasolina' : 'Fuel Can',
    'lockpick' : 'Lock Pick',
    'identidade' : 'ID Card',
    'porte' : 'Gun License',
}

const Icons = {
    'Item' : 'fa-solid fa-box',
    'Water' : 'fa-solid fa-droplet',
    'Bandages' : 'fa-solid fa-bandage',
    'Fuel Can' : 'fa-solid fa-gas-pump',
    'Pizza' : 'fa-solid fa-pizza-slice',
    'Water Bottle' : 'fa-solid fa-bottle-water',
    'Whisky' : 'fa-solid fa-wine-bottle',
    'Armor' : 'fa-solid fa-shield',
    'Hamburger' : 'fa-solid fa-burger',
    'Burrito' : 'fa-solid fa-burger',
    'Baseball Bat' : 'fa-solid fa-baseball-bat-ball',
    'Taser' : 'fa-solid fa-gun',
    'Glock' : 'fa-solid fa-gun',
    'Deagle' : 'fa-solid fa-gun',
    'ShotGun' : 'fa-solid fa-gun',
    'Tec-9' : 'fa-solid fa-gun',
    'MP5' : 'fa-solid fa-gun',
    'AK-47' : 'fa-solid fa-gun',
    'M4A1' : 'fa-solid fa-gun',
    'AWM' : 'fa-solid fa-gun',
    '.762' : 'fa-solid fa-crosshairs',
    '.556' : 'fa-solid fa-crosshairs',
    '.45' : 'fa-solid fa-crosshairs',
    '.50' : 'fa-solid fa-crosshairs',
    '12 Gauge' : 'fa-solid fa-crosshairs',
    '9mm' : 'fa-solid fa-crosshairs',
    'Repaire Kit' : 'fa-solid fa-toolbox',
    'Mask I' : 'fa-solid fa-mask',
    'Mask II' : 'fa-solid fa-mask',
    'Flowers' : 'fa-solid fa-fan',
    'Lock Pick' : 'fa-solid fa-key',
    'ID Card' : 'fa-solid fa-id-card',
    'Gun License' : 'fa-solid fa-address-card',
}

const maxAmount = {
    'a' : 20,
    'b' : 20,
}

const getKeyByValue = (object, value) => {
    let n = Object.keys(object).find(
        key => object[key] === value
    )
    return (n ? n : value)
}

const getName = (method, item) => {
    if (method) {
        return (realName.hasOwnProperty(item) ? realName[item] : item)
    } else {
        return getKeyByValue(realName, item)
    }
}

const getStorageType = () => {
    return currentType.type
}

const setStorageType = (type) => {
    currentType.type = type
}