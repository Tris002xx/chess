const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
const columnS = ["1", "2", "3", "4", "5", "6", "7", "8"]
const rows = ["8", "7", "6", "5", "4", "3", "2", "1"]


class Piece {
    constructor(type, team, initX, initY) {
        this.type = type;
        this.team = team;
        this.initX = initX;
        this.initY = initY;
    }
}

// Black
const blackking = new Piece("king", "black", columns[4], rows[0])
const blackqueen = new Piece("queen", "black", columns[3], rows[0])
const blackbishop = new Piece("bishop", "black", ["c", "f"], rows[0])
const blackhorse = new Piece("horse", "black", ["b", "g"], rows[0])
const blackrook = new Piece("rook", "black", ["a", "h"], rows[0])
const blackpawn = new Piece("pawn", "black", columns, rows[1])
// White
const whiteking = new Piece("king", "white", columns[4], rows[7])
const whitequeen = new Piece("queen", "white", columns[3], rows[7])
const whitebishop = new Piece("bishop", "white", ["c", "f"], rows[7])
const whitehorse = new Piece("horse", "white", ["b", "g"], rows[7])
const whiterook = new Piece("rook", "white", ["a", "h"], rows[7])
const whitepawn = new Piece("pawn", "white", columns, rows[6])

const resetBoard = (OK = undefined) => {
    const board = []
    const boardNum = []
    for (let row of rows) {
        for (let column of columns) {
            board.push(`${column}${row}`)
        }
        for (let column of columnS) {
            boardNum.push(`${column}${row}`)
        }
    }
    if (OK == undefined) {
        return board
    }
    else {
        return boardNum
    }
}

const makeBoard = () => {
    console.log(board)
    console.log(boardNUM)
    const chessboardElement = document.querySelector(".container")
    let rowIndex = 0
    let columnIndex = -1
    board.forEach(tile => {
        columnIndex++
        const tileElement = document.createElement("div")
        if (columnIndex % 8 == 0) {
            rowIndex++
        }
        tileElement.classList.add("tile")
        if ((columnIndex + rowIndex) % 2 == 0) {
            tileElement.classList.add("black-tile")
        }
        else if ((columnIndex + rowIndex) % 2 != 0) {
            tileElement.classList.add("white-tile")
        }
        chessboardElement.appendChild(tileElement)
        tileElement.textContent = tile
    })
    let counts = -1
    document.querySelectorAll(".tile").forEach(tile => {
        counts++
        boardNUM.forEach(id => {
            tile.id = boardNUM[counts]
        })
    })
    // document.querySelectorAll(".tile").forEach(tile => {
    //     tile.textContent = tile.id
    // })
}

const makePiece = (pieces) => {
    pieces.forEach((piece) => {
        const typePiece = piece.type
        const teamPiece = piece.team
        const initialRow = piece.initX
        const initialCol = piece.initY
        const svgImg = `assets/${teamPiece}-${typePiece}.svg`
        document.querySelectorAll(`.tile`).forEach(tile => {
            let cord = tile.textContent
            // Chess Piece Placement
            if (typeof initialRow == "object") {
                for (let i = 0; i < initialRow.length; i++) {
                    if (cord == `${initialRow[i]}${initialCol}`) {
                        const img = document.createElement("img")
                        img.setAttribute("src", `${svgImg}`)
                        img.classList.add(`${teamPiece}`)
                        img.classList.add(`${typePiece}`)
                        tile.appendChild(img)
                    }
                }
            }
            // King and Queen Placement
            if (typeof initialRow == "string") {
                if (cord == `${initialRow}${initialCol}`) {
                    const img = document.createElement("img")
                    img.setAttribute("src", `${svgImg}`)
                    img.classList.add(`${teamPiece}`)
                    img.classList.add(`${typePiece}`)
                    tile.appendChild(img)
                }
            }
        })
    })
}

const pieceMove = (item, checker = undefined) => {
    let validated = ''
    if (checker == undefined) {
        validated = validMove(item)
    }
    else {
        console.log("Ate a Piece")
        validated = validMove(item, "eat")
    }

    if (validated) {
        const chessPiece = document.createElement("img")
        chessPiece.src = selectedPiece.src
        chessPiece.classList.add(selectedPiece.classList[0])
        chessPiece.classList.add(selectedPiece.classList[1])

        if (checker != undefined) {
            if (player == 0) {
                player = 1
            }
            else if (player == 1) {
                player = 0
            }
            if (player == 0) {
                document.getElementsByClassName("player")[0].textContent = "White's Turn"
            }
            else if (player == 1) {
                document.getElementsByClassName("player")[0].textContent = "Black's Turn"
            }
            item.parentElement.appendChild(chessPiece)
            item.parentElement.removeChild(item)
            return validated
        }
        else {
            item.appendChild(chessPiece)
            return validated
        }
    }
    else {
        console.log("Invalid Move")

    }

}

const selectPiece = () => {
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", (event) => {
            console.log(counter)
            selectedTile = img.parentElement.textContent
            event.stopImmediatePropagation()
            console.log(`You clicked ${img.parentElement.textContent}`)
            console.log(`You clicked ${img.classList}`)
            if (counter == 0) {
                if (player == 0 && event.target.classList[0] == "white") {
                    console.log(event.target.classList[0] == "white")
                    img.parentElement.style.backgroundColor = "hsl(29.14deg 99.06% 58.43%)"
                    selectedPiece = img
                    counter++
                }
                else if (player == 1 && event.target.classList[0] == "black") {
                    img.parentElement.style.backgroundColor = "hsl(29.14deg 99.06% 58.43%)"
                    selectedPiece = img
                    counter++
                }
            }
            // Moving chess piece to another chess piece
            else {
                if (img.classList[0] != selectedPiece.classList[0]) {
                    validated = pieceMove(img, "Yes")
                    if (validated) {
                        selectedPiece.parentElement.style.backgroundColor = ""
                        selectedPiece.parentElement.removeChild(selectedPiece)
                        counter--
                        selectPiece()
                    }
                    else {
                        alert("YOU CAN'T EAT THAT")
                        selectedPiece.parentElement.style.backgroundColor = ""
                        selectedPiece = ``
                        counter--
                    }
                }
                else {
                    selectedPiece.parentElement.style.backgroundColor = ""
                    selectedPiece = ``
                    counter--
                }
            }
        })
    })
}

const validMove = (item, eat = undefined) => {
    // EMPTY TILE CHECKER (
    if (eat == undefined) {

        // White/Black Pawn First Move Logic(
        if (selectedPiece.classList[1] === "pawn" && selectedPiece.parentElement.textContent[1] == 2) {
            let blocked = ""
            let blockedCellsFirstPawn = []
            document.querySelectorAll(".tile").forEach(tile => {
                if (tile.textContent[1] == 3) {
                    if (tile.children.length == 1) {
                        blocked = tile.textContent[0]
                        blockedCellsFirstPawn.push(blocked)
                    }
                }
            })
            if (item.textContent[1] < 5 && item.textContent[1] != selectedPiece.parentElement.textContent[1] && item.textContent[0] == selectedPiece.parentElement.textContent[0] && blockedCellsFirstPawn.includes(selectedPiece.parentElement.textContent[0]) === false) {
                console.log("Your pawn succesfully moved")
                return true
            }
            else {
                return false
            }
        }
        else if (selectedPiece.classList[1] === "pawn" && selectedPiece.parentElement.textContent[1] == 7) {
            let blocked = ""
            let blockedCellsFirstPawn = []
            document.querySelectorAll(".tile").forEach(tile => {
                if (tile.textContent[1] == 6) {
                    if (tile.children.length == 1) {
                        blocked = tile.textContent[0]
                        blockedCellsFirstPawn.push(blocked)
                    }
                }
            })
            if (item.textContent[1] > 4 && item.textContent[1] != selectedPiece.parentElement.textContent[1] && item.textContent[0] == selectedPiece.parentElement.textContent[0] && blockedCellsFirstPawn.includes(selectedPiece.parentElement.textContent[0]) === false) {
                console.log("Your pawn succesfully moved")
                return true
            }
            else {
                return false
            }
        }
        // )

        // White Pawn Move Logic(
        else if (selectedPiece.classList[1] === "pawn" && selectedPiece.classList[0] === "white" && item.textContent[0] == selectedPiece.parentElement.textContent[0]) {
            if (item.textContent[1] - selectedPiece.parentElement.textContent[1] == 1) {
                console.log("Your pawn succesfully moved")
                return true
            }
            else {
                return false
            }
        }
        // )

        // Black Pawn Move Logic(
        else if (selectedPiece.classList[1] === "pawn" && selectedPiece.classList[0] === "black" && item.textContent[0] == selectedPiece.parentElement.textContent[0]) {
            if (item.textContent[1] - selectedPiece.parentElement.textContent[1] == -1) {
                console.log("Your pawn succesfully moved")
                return true
            }
            else {
                return false
            }
        }
        // )

        // Horse Move Logic 
        else if (selectedPiece.classList[1] === "horse") {
            if (((item.id[0] - selectedPiece.parentElement.id[0] == 1 || item.id[0] - selectedPiece.parentElement.id[0] == -1) && item.id[1] - selectedPiece.parentElement.id[1] == 2) || ((item.id[0] - selectedPiece.parentElement.id[0] == 1 || item.id[0] - selectedPiece.parentElement.id[0] == -1) && item.id[1] - selectedPiece.parentElement.id[1] == -2) || ((item.id[1] - selectedPiece.parentElement.id[1] == -1 || item.id[1] - selectedPiece.parentElement.id[1] == 1) && item.id[0] - selectedPiece.parentElement.id[0] == 2) || ((item.id[1] - selectedPiece.parentElement.id[1] == -1 || item.id[1] - selectedPiece.parentElement.id[1] == 1) && item.id[0] - selectedPiece.parentElement.id[0] == -2)) {
                console.log("Your horse successfully moved")
                return true
            }
            else {
                return false
            }
        }
        // )

        // Rook Move Logic
        else if (selectedPiece.classList[1] === "rook") {
            if ((item.id[0] == selectedPiece.parentElement.id[0] && item.id[1] != selectedPiece.parentElement.id[1]) || (item.id[0] != selectedPiece.parentElement.id[0] && item.id[1] == selectedPiece.parentElement.id[1])) {
                let blockedCells = []
                let blockedCellsRooks = []
                let blockedCellsRookID = []
                let blockedCellsRookIDRelevant = []
                let blockedCellsRookIDAbove = []
                let blockedCellsRookIDUnder = []

                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })

                for (tile of blockedCells) {
                    if (tile.id[0] == selectedPiece.parentElement.id[0] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)

                    }
                    else if (tile.id[1] == selectedPiece.parentElement.id[1] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)
                    }
                }

                // Rook Moving Up/Down Column Logic 
                if (item.id[0] == selectedPiece.parentElement.id[0] && item.id[1] != selectedPiece.parentElement.id[1]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[0] == selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[1] > selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.id[1] > selectedPiece.parentElement.id[1]) || item.id[1] > selectedPiece.parentElement.id[1] && blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1][1] - selectedPiece.parentElement.id[1] > Math.abs(item.id[1] - selectedPiece.parentElement.id[1])) {
                        // console.log(blockedCellsRookIDRelevant)
                        // console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        // console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        // console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        // console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        // console.log(`New Location: ${item.id}`)
                        // console.log(blockedCellsRooks)
                        // console.log(blockedCellsRooks)
                        console.log("Rook Moved Up Succesfully")
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.id[1] < selectedPiece.parentElement.id[1]) || (item.id[1] < selectedPiece.parentElement.id[1] && Math.abs(blockedCellsRookIDUnder[0][1] - selectedPiece.parentElement.id[1]) > Math.abs(item.id[1] - selectedPiece.parentElement.id[1]))) {
                        // console.log(blockedCellsRookIDRelevant)
                        // console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        // console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        // console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        // console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        // console.log(`New Location: ${item.id}`)
                        // console.log(blockedCellsRooks)
                        console.log("Rook Moved Down Succesfully")
                        return true
                    }
                }

                // Rook Moving Left/Right Column Logic 
                else if (item.id[1] == selectedPiece.parentElement.id[1] && item.id[0] != selectedPiece.parentElement.id[0]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[1] == selectedPiece.parentElement.id[1]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[0] > selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDAbove.push(cell)
                        }
                        else if (cell[0] < selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.id[0] > selectedPiece.parentElement.id[0]) || (item.id[0] > selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDAbove[0][0] - selectedPiece.parentElement.id[0]) > Math.abs(item.id[0] - selectedPiece.parentElement.id[0]))) {
                        // console.log(blockedCellsRookIDRelevant)
                        // console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        // console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        // console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        // console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        // console.log(`New Location: ${item.id}`)
                        // console.log(blockedCellsRooks)
                        // console.log(blockedCellsRooks)
                        console.log("Rook Moved Right Succesfully")
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.id[0] < selectedPiece.parentElement.id[0]) || (item.id[0] < selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDUnder[blockedCellsRookIDUnder.length - 1][0] - selectedPiece.parentElement.id[0]) > Math.abs(item.id[0] - selectedPiece.parentElement.id[0]))) {
                        // console.log(blockedCellsRookIDRelevant)
                        // console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        // console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        // console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        // console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        // console.log(`New Location: ${item.id}`)
                        // console.log(blockedCellsRooks)
                        // console.log(blockedCellsRooks)
                        console.log("Rook Moved Left Succesfully")
                        return true
                    }
                }
            }
        }
        // )

        // Bishop Move Logic
        else if (selectedPiece.classList[1] === "bishop") {
            if (((item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0)
                || (item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0))) {
                let blockedCells = []
                let blockedCellsBishop = []
                let blockedCellsBishopID = []
                let blockedCellsBishopIDUpperLeft = []
                let blockedCellsBishopIDUpperRight = []
                let blockedCellsBishopIDBottomLeft = []
                let blockedCellsBishopIDBottomRight = []

                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })
                blockedCells.forEach(tile => {
                    if (((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0))) {
                        blockedCellsBishop.push(tile)
                        blockedCellsBishopID.push(tile.id)
                    }
                })

                blockedCells.forEach(tile => {
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDUpperLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDUpperRight.push(tile)
                    }
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDBottomLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDBottomRight.push(tile)
                    }
                })
                console.log(blockedCellsBishop)
                console.log(blockedCellsBishopID)

                try {
                    console.log(`${blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDBottomLeft[0].id}`)
                    console.log(`${blockedCellsBishopIDBottomRight[0].id}`)
                }
                catch {
                    console.log("error")
                }

                if ((item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.id < blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }
                if ((item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.id > blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }
                if ((item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.id < blockedCellsBishopIDBottomLeft[0].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }
                if ((item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.id > blockedCellsBishopIDBottomRight[0].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }
                return true
            }
        }
        // )

        // Queen Move Logic
        else if (selectedPiece.classList[1] === "queen") {
           
            // Bishop Attributes Of the Queen
            if (((item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0)
                || (item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0))) {
                let blockedCells = []
                let blockedCellsBishop = []
                let blockedCellsBishopID = []
                let blockedCellsBishopIDUpperLeft = []
                let blockedCellsBishopIDUpperRight = []
                let blockedCellsBishopIDBottomLeft = []
                let blockedCellsBishopIDBottomRight = []
                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })
                blockedCells.forEach(tile => {
                    if (((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0))) {
                        blockedCellsBishop.push(tile)
                        blockedCellsBishopID.push(tile.id)
                    }
                })

                blockedCells.forEach(tile => {
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDUpperLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDUpperRight.push(tile)
                    }
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDBottomLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDBottomRight.push(tile)
                    }
                })
                console.log(blockedCellsBishop)
                console.log(blockedCellsBishopID)

                try {
                    console.log(`${blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDBottomLeft[0].id}`)
                    console.log(`${blockedCellsBishopIDBottomRight[0].id}`)
                }
                catch {
                    console.log("error")
                }

                if ((item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.id < blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }
                if ((item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.id > blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }

                if ((item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.id < blockedCellsBishopIDBottomLeft[0].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }
                if ((item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.id > blockedCellsBishopIDBottomRight[0].id) {
                            return false
                        }
                    }
                    catch {
                        return true
                    }
                }
                return true
            }
            // )

            // Rook Attributes Of the Queen
            if ((item.id[0] == selectedPiece.parentElement.id[0] && item.id[1] != selectedPiece.parentElement.id[1] && item.id[1]) || (item.id[0] != selectedPiece.parentElement.id[0] && item.id[1] == selectedPiece.parentElement.id[1])) {
                let blockedCells = []
                let blockedCellsRooks = []
                let blockedCellsRookID = []
                let blockedCellsRookIDRelevant = []
                let blockedCellsRookIDAbove = []
                let blockedCellsRookIDUnder = []
                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })
                for (tile of blockedCells) {
                    if (tile.id[0] == selectedPiece.parentElement.id[0] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)

                    }
                    else if (tile.id[1] == selectedPiece.parentElement.id[1] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)
                    }
                }
                for (tile of blockedCells) {
                    if (tile.id[0] == selectedPiece.parentElement.id[0] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)

                    }
                    else if (tile.id[1] == selectedPiece.parentElement.id[1] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)
                    }
                }
                // Queen Moving Up/Down Logic
                if (item.id[0] == selectedPiece.parentElement.id[0] && item.id[1] != selectedPiece.parentElement.id[1]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[0] == selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[1] > selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.id[1] > selectedPiece.parentElement.id[1]) || item.id[1] > selectedPiece.parentElement.id[1] && blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1][1] - selectedPiece.parentElement.id[1] > Math.abs(item.id[1] - selectedPiece.parentElement.id[1])) {
                        console.log("Rook Moved Up Succesfully")
                        console.log(blockedCellsRookIDRelevant)
                        console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${blockedCellsRookIDAbove[0][1] - selectedPiece.parentElement.id[1]} is the difference between closest right and current`)
                        console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        console.log(`New Location: ${item.id}`)
                        console.log(blockedCellsRooks)
                        console.log(blockedCellsRooks)
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.id[1] < selectedPiece.parentElement.id[1]) || (item.id[1] < selectedPiece.parentElement.id[1] && Math.abs(blockedCellsRookIDUnder[0][1] - selectedPiece.parentElement.id[1]) > Math.abs(item.id[1] - selectedPiece.parentElement.id[1]))) {
                        console.log("Rook Moved Down Succesfully")
                        console.log(blockedCellsRookIDRelevant)
                        console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${blockedCellsRookIDAbove[0][1] - selectedPiece.parentElement.id[1]} is the difference between closest right and current`)
                        console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        console.log(`New Location: ${item.id}`)
                        console.log(blockedCellsRooks)
                        return true
                    }

                    // blockedCellsRookID = []
                }

                // Queen Moving Left/Right Column Logic 
                else if (item.id[1] == selectedPiece.parentElement.id[1] && item.id[0] != selectedPiece.parentElement.id[0]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[1] == selectedPiece.parentElement.id[1]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[0] > selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDAbove.push(cell)
                        }
                        else if (cell[0] < selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.id[0] > selectedPiece.parentElement.id[0]) || (item.id[0] > selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDAbove[0][0] - selectedPiece.parentElement.id[0]) > Math.abs(item.id[0] - selectedPiece.parentElement.id[0]))) {
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.id[0] < selectedPiece.parentElement.id[0]) || (item.id[0] < selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDUnder[blockedCellsRookIDUnder.length - 1][0] - selectedPiece.parentElement.id[0]) > Math.abs(item.id[0] - selectedPiece.parentElement.id[0]))) {
                        return true
                    }
                }
            }
            // )

        }
        // )

        // King Move Logic
        else if (selectedPiece.classList[1] === "king") {
            if ((item.id[0] == selectedPiece.parentElement.id[0] && item.id[1] - selectedPiece.parentElement.id[1] == 1)
                || (item.id[0] == selectedPiece.parentElement.id[0] && item.id[1] - selectedPiece.parentElement.id[1] == -1)
                || (item.id[1] == selectedPiece.parentElement.id[1] && item.id[0] - selectedPiece.parentElement.id[0] == 1)
                || (item.id[1] == selectedPiece.parentElement.id[1] && item.id[0] - selectedPiece.parentElement.id[0] == -1)
                || (item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) / 9 == -1)
                || (item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] > selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) / 11 == 1)
                || (item.id[0] < selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) / 11 == -1)
                || (item.id[0] > selectedPiece.parentElement.id[0]) && (item.id[1] < selectedPiece.parentElement.id[1]) && ((item.id - selectedPiece.parentElement.id) / 9 == 1)) {
                return true
            }


        }
        // )
    }

    // )

    // EATING PIECES CHECKER ()
    else {

        // Pawn Eater Logic(
        if (selectedPiece.classList[1] === "pawn" && selectedPiece.classList[0] === "white") {
            // console.log(item.parentElement.textContent[1])
            if ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 1) || ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 1))) {
                console.log("Your pawn succesfully ate")
                // console.log(selectedPiece.parentElement.textContent[0])
                return true
            }
            else {
                return false
            }
        }
        if (selectedPiece.classList[1] === "pawn" && selectedPiece.classList[0] === "black") {
            // console.log(item.parentElement.textContent[1])
            if ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -1) || ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -1))) {
                console.log("Your pawn succesfully ate")
                // console.log(selectedPiece.parentElement.textContent[0])
                return true
            }
            else {
                return false
            }
        }
        // )

        // Horse Eater Logic
        if (selectedPiece.classList[1] === "horse") {
            if (((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 1 || item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -1) && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 2) || ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 1 || item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -1) && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -2) || ((item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -1 || item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 1) && item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 2) || ((item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -1 || item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 1) && item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -2)) {
                console.log("Your horse successfully ate")
                return true
            }
            else {
                return false
            }
        }
        // )

        // Rook Eater Logic
        if (selectedPiece.classList[1] === "rook") {
            if ((item.parentElement.id[0] == selectedPiece.parentElement.id[0] && item.id[1] != selectedPiece.parentElement.id[1] && item.parentElement.id[1]) || (item.parentElement.id[0] != selectedPiece.parentElement.id[0] && item.parentElement.id[1] == selectedPiece.parentElement.id[1])) {
                let blockedCells = []
                let blockedCellsRooks = []
                let blockedCellsRookID = []
                let blockedCellsRookIDRelevant = []
                let blockedCellsRookIDAbove = []
                let blockedCellsRookIDUnder = []
                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })
                for (tile of blockedCells) {
                    if (tile.id[0] == selectedPiece.parentElement.id[0] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)

                    }
                    else if (tile.id[1] == selectedPiece.parentElement.id[1] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)
                    }
                }
                // Rook Moving Up/Down Column Logic 
                if (item.parentElement.id[0] == selectedPiece.parentElement.id[0] && item.parentElement.id[1] != selectedPiece.parentElement.id[1]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[0] == selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[1] > selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.parentElement.id[1] > selectedPiece.parentElement.id[1]) || (item.parentElement.id[1] > selectedPiece.parentElement.id[1] && blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1][1] == item.parentElement.id[1])) {
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.parentElement.id[1] < selectedPiece.parentElement.id[1]) || (item.parentElement.id[1] < selectedPiece.parentElement.id[1] && blockedCellsRookIDUnder[0][1] == item.parentElement.id[1])) {
                        return true
                    }

                }
                // Rook Moving Left/Right Column Logic 
                else if (item.parentElement.id[1] == selectedPiece.parentElement.id[1] && item.parentElement.id[0] != selectedPiece.parentElement.id[0]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[1] == selectedPiece.parentElement.id[1]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[0] > selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDAbove.push(cell)
                        }
                        else if (cell[0] < selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.parentElement.id[0] > selectedPiece.parentElement.id[0]) || (item.parentElement.id[0] > selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDAbove[0][0]) == Math.abs(item.parentElement.id[0]))) {
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.parentElement.id[0] < selectedPiece.parentElement.id[0]) || (item.parentElement.id[0] < selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDUnder[blockedCellsRookIDUnder.length - 1][0]) == Math.abs(item.parentElement.id[0]))) {
                        return true
                    }
                }
            }
        }
        // )

        // Bishop Eater Logic
        else if (selectedPiece.classList[1] === "bishop") {
            // let blockedCells = []
            // let blockedCellsBishop = []
            // let blockedCellsBishopID = []
            // let blockedCellsBishopIDUpperLeft = []
            // let blockedCellsBishopIDUpperRight = []
            // let blockedCellsBishopIDBottomLeft = []
            // let blockedCellsBishopIDBottomRight = []

            if (((item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0)
                || (item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0))) {
                let blockedCells = []
                let blockedCellsBishop = []
                let blockedCellsBishopID = []
                let blockedCellsBishopIDUpperLeft = []
                let blockedCellsBishopIDUpperRight = []
                let blockedCellsBishopIDBottomLeft = []
                let blockedCellsBishopIDBottomRight = []

                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })
                blockedCells.forEach(tile => {
                    if (((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0))) {
                        blockedCellsBishop.push(tile)
                        blockedCellsBishopID.push(tile.id)
                    }
                })

                blockedCells.forEach(tile => {
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDUpperLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDUpperRight.push(tile)
                    }
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDBottomLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDBottomRight.push(tile)
                    }
                })
                console.log(blockedCellsBishop)
                console.log(blockedCellsBishopID)

                try {
                    console.log(`${blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDBottomLeft[0].id}`)
                    console.log(`${blockedCellsBishopIDBottomRight[0].id}`)
                }
                catch {
                    console.log("error")
                }

                if ((item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }
                if ((item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }

                if ((item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDBottomLeft[0].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }
                if ((item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDBottomRight[0].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }
            }
        }
        // )

        // Queen Eater Logic 
        else if (selectedPiece.classList[1] === "queen") {

            // Bishop Attributes of Queen
            if (((item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0)
                || (item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)
                || (item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0))) {
                let blockedCells = []
                let blockedCellsBishop = []
                let blockedCellsBishopID = []
                let blockedCellsBishopIDUpperLeft = []
                let blockedCellsBishopIDUpperRight = []
                let blockedCellsBishopIDBottomLeft = []
                let blockedCellsBishopIDBottomRight = []

                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })
                blockedCells.forEach(tile => {
                    if (((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)
                        || (tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0))) {
                        blockedCellsBishop.push(tile)
                        blockedCellsBishopID.push(tile.id)
                    }
                })

                blockedCells.forEach(tile => {
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDUpperLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] > selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDUpperRight.push(tile)
                    }
                    if ((tile.id[0] < selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 11 == 0)) {
                        blockedCellsBishopIDBottomLeft.push(tile)
                    }
                    if ((tile.id[0] > selectedPiece.parentElement.id[0]) && (tile.id[1] < selectedPiece.parentElement.id[1]) && ((tile.id - selectedPiece.parentElement.id) % 9 == 0)) {
                        blockedCellsBishopIDBottomRight.push(tile)
                    }
                })
                console.log(blockedCellsBishop)
                console.log(blockedCellsBishopID)

                try {
                    console.log(`${blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id}`)
                    console.log(`${blockedCellsBishopIDBottomLeft[0].id}`)
                    console.log(`${blockedCellsBishopIDBottomRight[0].id}`)
                }
                catch {
                    console.log("error")
                }

                if ((item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }
                if ((item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }

                if ((item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 11 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDBottomLeft[0].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }
                if ((item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) % 9 == 0)) {
                    try {
                        if (item.parentElement.id == blockedCellsBishopIDBottomRight[0].id) {
                            return true
                        }
                    }
                    catch {
                        return false
                    }
                }
            }
            // )

            // Rook Attributes of Queen
            if ((item.parentElement.id[0] == selectedPiece.parentElement.id[0] && item.id[1] != selectedPiece.parentElement.id[1] && item.parentElement.id[1]) || (item.parentElement.id[0] != selectedPiece.parentElement.id[0] && item.parentElement.id[1] == selectedPiece.parentElement.id[1])) {
                let blockedCells = []
                let blockedCellsRooks = []
                let blockedCellsRookID = []
                let blockedCellsRookIDRelevant = []
                let blockedCellsRookIDAbove = []
                let blockedCellsRookIDUnder = []
                document.querySelectorAll(".tile").forEach(tile => {
                    if (tile.children.length == 1) {
                        blockedCells.push(tile)
                    }
                })
                for (tile of blockedCells) {
                    if (tile.id[0] == selectedPiece.parentElement.id[0] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)

                    }
                    else if (tile.id[1] == selectedPiece.parentElement.id[1] && tile.id != selectedPiece.parentElement.id) {
                        blockedCellsRookID.push(tile.id)
                        blockedCellsRooks.push(tile)
                    }
                }
                // Rook Moving Up/Down Column Logic 
                if (item.parentElement.id[0] == selectedPiece.parentElement.id[0] && item.parentElement.id[1] != selectedPiece.parentElement.id[1]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[0] == selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[1] > selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            console.log(cell)
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.parentElement.id[1] > selectedPiece.parentElement.id[1]) || (item.parentElement.id[1] > selectedPiece.parentElement.id[1] && blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1][1] == item.parentElement.id[1])) {
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.parentElement.id[1] < selectedPiece.parentElement.id[1]) || (item.parentElement.id[1] < selectedPiece.parentElement.id[1] && blockedCellsRookIDUnder[0][1] == item.parentElement.id[1])) {
                        return true
                    }

                }
                // Rook Moving Left/Right Column Logic 
                else if (item.parentElement.id[1] == selectedPiece.parentElement.id[1] && item.parentElement.id[0] != selectedPiece.parentElement.id[0]) {
                    blockedCellsRookID.forEach(cell => {
                        if (cell[1] == selectedPiece.parentElement.id[1]) {
                            blockedCellsRookIDRelevant.push(cell)
                        }
                    })
                    blockedCellsRookIDRelevant.forEach(cell => {
                        if (cell[0] > selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDAbove.push(cell)
                        }
                        else if (cell[0] < selectedPiece.parentElement.id[0]) {
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.parentElement.id[0] > selectedPiece.parentElement.id[0]) || (item.parentElement.id[0] > selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDAbove[0][0]) == Math.abs(item.parentElement.id[0]))) {
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.parentElement.id[0] < selectedPiece.parentElement.id[0]) || (item.parentElement.id[0] < selectedPiece.parentElement.id[0] && Math.abs(blockedCellsRookIDUnder[blockedCellsRookIDUnder.length - 1][0]) == Math.abs(item.parentElement.id[0]))) {
                        return true
                    }
                }
            }
            // )


        }
        // )

        // King Eater Logic
        else if (selectedPiece.classList[1] === "king") {
            if ((item.parentElement.id[0] == selectedPiece.parentElement.id[0] && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 1)
                || (item.parentElement.id[0] == selectedPiece.parentElement.id[0] && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -1)
                || (item.parentElement.id[1] == selectedPiece.parentElement.id[1] && item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 1)
                || (item.parentElement.id[1] == selectedPiece.parentElement.id[1] && item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -1)
                || (item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) / 9 == -1)
                || (item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] > selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) / 11 == 1)
                || (item.parentElement.id[0] < selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) / 11 == -1)
                || (item.parentElement.id[0] > selectedPiece.parentElement.id[0]) && (item.parentElement.id[1] < selectedPiece.parentElement.id[1]) && ((item.parentElement.id - selectedPiece.parentElement.id) / 9 == 1)) {
                return true
            }
        }
        // )
    }
    // )

}

const board = resetBoard()
const boardNUM = resetBoard("JesusIsGay")
makeBoard()
makePiece([whiteking, whitequeen, whitebishop, whitehorse, whiterook, whitepawn, blackking, blackqueen, blackbishop, blackhorse, blackrook, blackpawn])
let counter = 0
let player = 0
let selectedTile = ``
let selectedPiece = ``
let keepPlaying = true


selectPiece()
document.querySelectorAll(".tile").forEach(tile => {
    tile.addEventListener("click", () => {
        console.log("You clicked on a tile")
        console.log(counter)
        selectPiece()

        // Moving chess piece to an empty tile
        if (counter != 0) {
            let validated = pieceMove(tile)
            if (validated) {
                if (player == 0) {
                    player = 1
                }
                else if (player == 1) {
                    player = 0
                }
                document.querySelectorAll("img").forEach(img => {
                    if (img.parentElement.textContent == selectedTile) {
                        img.parentElement.style.backgroundColor = ""
                        img.parentElement.removeChild(img)
                    }
                })
            }
            else {
                alert("INVALID MOVE")
                selectedPiece.parentElement.style.backgroundColor = ""
                selectedPiece = ``
            }
            selectPiece()
            counter--
            if (player == 0) {
                document.getElementsByClassName("player")[0].textContent = "White's Turn"
            }
            else if (player == 1) {
                document.getElementsByClassName("player")[0].textContent = "Black's Turn"
            }
        }

    })
})

