let container = document.getElementById('container-game')
let boardSetting = []
let pair = []
let jumlahBaris = 4
let jumlahKolom = 4
let pairNumber = 0

let randomBox = (arr) => {
    let temp, randomIndexI, randomIndexJ
    for(let i = 0; i < arr.length; i++) {
        randomIndexI = Math.floor(Math.random() * (i + 1))
        for(let j = 0; j < arr[i].length; j++) {
            randomIndexJ = Math.floor(Math.random() * (j + 1))
            temp = arr[i][j]
            arr[i][j] = arr[randomIndexI][randomIndexJ]
            arr[randomIndexI][randomIndexJ] = temp
        }
    }
    return arr
}

let generateBoard = () => {
    let valueNumber = 1
    for(let i = 1; i <= jumlahBaris; i++) {
        let arrBox = []
        for(let j = 1; j <= jumlahKolom; j++) {

            let objBox = {
                value: valueNumber,
                isOpen: false,
                isMatch: false
            }

            arrBox.push(objBox)
            valueNumber++
        }
        if(valueNumber > 8) {
            valueNumber = 1
        }
        boardSetting.push(arrBox)
    }

    randomBox(boardSetting)
}
generateBoard()
//console.log(boardSetting)


let printBoard = () => {

    container.innerHTML = ''
    for(let i = 0; i < boardSetting.length; i++) {
        let createBaris = document.createElement('div')
        createBaris.id = i
        createBaris.className = 'baris-box'
        let barisBox = document.getElementsByClassName('baris-box')
        for(let j = 0; j < boardSetting[i].length; j++) {

            let createKolom = document.createElement('buttton')
            createKolom.id = String(i)+String(j)
            createKolom.className = 'kolom-box'
            createKolom.innerHTML = '?'
            
            let kolomBox = document.getElementsByClassName('kolom-box')
            createKolom.setAttribute('onclick',`checkNum(${i},${j})`)

            createBaris.appendChild(createKolom)

        }
        container.appendChild(createBaris)
    }
}

let checkNum = (baris,kolom) => {
    let barisBox = document.getElementsByClassName('baris-box')
    
    barisBox[baris].children[kolom].removeAttribute('onclick','')

    barisBox[baris].children[kolom].innerHTML = boardSetting[baris][kolom].value
    barisBox[baris].children[kolom].style.background = 'green'

    pair.push([baris,kolom])

    if(pair.length === 2) {
        if(boardSetting[pair[0][0]][pair[0][1]].value === boardSetting[pair[1][0]][pair[1][1]].value) {
            pairNumber++        
            pair = []
            if(pairNumber === 8) {
                setTimeout(function() {
                    win(resetGame)
                },1000)
            }
        } else {
            setTimeout(function () {
                barisBox[pair[0][0]].children[pair[0][1]].setAttribute('onclick',`checkNum(${pair[0][0]},${pair[0][1]})`)
                barisBox[pair[1][0]].children[pair[1][1]].setAttribute('onclick',`checkNum(${pair[1][0]},${pair[1][1]})`)

                barisBox[pair[0][0]].children[pair[0][1]].innerHTML = '?'
                barisBox[pair[0][0]].children[pair[0][1]].style.background = 'red'

                barisBox[pair[1][0]].children[pair[1][1]].innerHTML = '?'
                barisBox[pair[1][0]].children[pair[1][1]].style.background = 'red'

                pair = []
            },1000)
        }
    }
}

let win = (reset) => {
    let konfirmasi = confirm('You Win !!! Main lagi ?')
    if(konfirmasi) {
        reset()
    }
}

let resetGame = () => {
    boardSetting = []
    pair = []
    jumlahBaris = 4
    jumlahKolom = 4
    pairNumber = 0
    
    generateBoard()
    printBoard()
}
printBoard()

































