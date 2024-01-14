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
    // console.log(board)
    // console.log(boardNUM)
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
        console.log("piece moved to tile")
    }
    else {
        // console.log("Ate a Piece")
        validated = validMove(item, "eat")
        console.log("piece ate a tile")
    }

    if (validated) {
        // console.log(`White King Checker: ${whiteKingCheck}`)
        // console.log(`Black King Checker: ${blackKingCheck}`)
        // console.log(`Player Checker: ${player}`)
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
            ateChekcer = true
            newTile = item.parentElement
            replacedPiece = newTile.children[0]
            oldTilePosition = selectedPiece.parentElement

            item.parentElement.appendChild(chessPiece)
            item.parentElement.removeChild(item)
            return validated
        }
        else {
            ateChekcer = false
            newTile = item
            oldTilePosition = selectedPiece.parentElement
            item.appendChild(chessPiece)
            return validated

        }
    }
    else {
        // console.log("Invalid Move")

    }

}

const selectPiece = () => {
    console.log("running selectPiece")
    checkMateChecker()
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", (event) => {
            // console.log(counter)
            selectedTile = img.parentElement.textContent
            event.stopImmediatePropagation()
            // console.log(`You clicked ${img.parentElement.textContent}`)
            // console.log(`You clicked ${img.classList}`)
            if (counter == 0) {
                if (player == 0 && event.target.classList[0] == "white") {
                    img.parentElement.style.backgroundColor = "hsl(29.14deg 99.06% 58.43%)"
                    // img.parentElement.style.backgroundColor = "	#fe84ff"
                    selectedPiece = img
                    counter++
                }
                else if (player == 1 && event.target.classList[0] == "black") {
                    img.parentElement.style.backgroundColor = "hsl(29.14deg 99.06% 58.43%)"
                    // img.parentElement.style.backgroundColor = "	#fe84ff"
                    selectedPiece = img
                    counter++
                }
            }

            // Moving chess piece to another chess piece
            else {
                if (img.classList[0] != selectedPiece.classList[0]) {
                    // checkMateChecker()
                    validated = pieceMove(img, "Yes")
                    if (validated) {
                        // checkMateChecker()
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

const validMove = (item = undefined, eat = undefined) => {
    // checkMateChecker()
    // EMPTY TILE CHECKER (
    if (item != undefined && eat == undefined) {

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
                // console.log("Your pawn succesfully moved")
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
                // console.log("Your pawn succesfully moved")
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
                // console.log("Your pawn succesfully moved")
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
                // console.log("Your pawn succesfully moved")
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
                // console.log("Your horse successfully moved")
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
                            // console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            // console.log(cell)
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
                        // console.log("Rook Moved Up Succesfully")
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
                        // console.log("Rook Moved Down Succesfully")
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
                        // console.log("Rook Moved Right Succesfully")
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
                        // console.log("Rook Moved Left Succesfully")
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
                // console.log(blockedCellsBishop)
                // console.log(blockedCellsBishopID)

                try {
                    // console.log(`${blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id}`)
                    // console.log(`${blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id}`)
                    // console.log(`${blockedCellsBishopIDBottomLeft[0].id}`)
                    // console.log(`${blockedCellsBishopIDBottomRight[0].id}`)
                }
                catch {
                    // console.log("error")
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
                            // console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            // console.log(cell)
                            blockedCellsRookIDUnder.push(cell)
                        }
                    })
                    if ((blockedCellsRookIDAbove[0] == undefined && item.id[1] > selectedPiece.parentElement.id[1]) || item.id[1] > selectedPiece.parentElement.id[1] && blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1][1] - selectedPiece.parentElement.id[1] > Math.abs(item.id[1] - selectedPiece.parentElement.id[1])) {
                        // console.log("Rook Moved Up Succesfully")
                        // console.log(blockedCellsRookIDRelevant)
                        // console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        // console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        // console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        // console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${blockedCellsRookIDAbove[0][1] - selectedPiece.parentElement.id[1]} is the difference between closest right and current`)
                        // console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        // console.log(`New Location: ${item.id}`)
                        // console.log(blockedCellsRooks)
                        // console.log(blockedCellsRooks)
                        return true
                    }
                    else if ((blockedCellsRookIDUnder[0] == undefined && item.id[1] < selectedPiece.parentElement.id[1]) || (item.id[1] < selectedPiece.parentElement.id[1] && Math.abs(blockedCellsRookIDUnder[0][1] - selectedPiece.parentElement.id[1]) > Math.abs(item.id[1] - selectedPiece.parentElement.id[1]))) {
                        // console.log("Rook Moved Down Succesfully")
                        // console.log(blockedCellsRookIDRelevant)
                        // console.log(`Closest Blocked tile up is undefined: ${blockedCellsRookIDAbove[0] == undefined}`)
                        // console.log(`Closest Blocked tile up: ${blockedCellsRookIDUnder[1]}`)
                        // console.log(`Closest Blocked tile left: ${blockedCellsRookIDAbove[blockedCellsRookIDUnder.length - 1]}`)
                        // console.log(`We are going right ${item.id[1] < selectedPiece.parentElement.id[1]}`)
                        // console.log(`${blockedCellsRookIDAbove[0][1] - selectedPiece.parentElement.id[1]} is the difference between closest right and current`)
                        // console.log(`${Math.abs(item.id[1] - selectedPiece.parentElement.id[1])} is the difference between new location and current`)
                        // console.log(`New Location: ${item.id}`)
                        // console.log(blockedCellsRooks)
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
    else if (item != undefined && eat != undefined) {
        // Pawn Eater Logic(
        if (selectedPiece.classList[1] === "pawn" && selectedPiece.classList[0] === "white") {
            console.log(item.parentElement.textContent[1])
            if ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 1) || ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == 1))) {
                // console.log("Your pawn succesfully ate")
                // console.log(selectedPiece.parentElement.textContent[0])
                return true
            }
            else {
                return false
            }
        }
        if (selectedPiece.classList[1] === "pawn" && selectedPiece.classList[0] === "black") {
            console.log(item.parentElement.textContent[1])
            if ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == -1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -1) || ((item.parentElement.id[0] - selectedPiece.parentElement.id[0] == 1 && item.parentElement.id[1] - selectedPiece.parentElement.id[1] == -1))) {
                // console.log("Your pawn succesfully ate")
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
                // console.log("Your horse successfully ate")
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
                            // console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            // console.log(cell)
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
                // console.log(blockedCellsBishop)
                // console.log(blockedCellsBishopID)

                try {
                    // console.log(`${blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id}`)
                    // console.log(`${blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id}`)
                    // console.log(`${blockedCellsBishopIDBottomLeft[0].id}`)
                    // console.log(`${blockedCellsBishopIDBottomRight[0].id}`)
                }
                catch {
                    // console.log("error")
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
                try {
                    // console.log(`${blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id}`)
                    // console.log(`${blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id}`)
                    // console.log(`${blockedCellsBishopIDBottomLeft[0].id}`)
                    // console.log(`${blockedCellsBishopIDBottomRight[0].id}`)
                }
                catch {
                    // console.log("error")
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
                            // console.log(cell)
                            blockedCellsRookIDAbove.push(cell)
                        }

                        else if (cell[1] < selectedPiece.parentElement.id[1]) {
                            // console.log(cell)
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

    else {
        return false
    }
}

const kingChecker = (white = undefined) => {

    if (blackKingCheck) {
        document.getElementById("check").textContent = `Black King Checked`
    }

    if (whiteKingCheck) {
        document.getElementById("check").textContent = `White King Checked`
    }

    if (white == undefined) {
        if (player == 0) {
            document.getElementById("check").textContent = `Black King Will Be Checked`
            if (ateChekcer == false) {
                let newTilePosition = document.getElementById(newTile.id)
                newTilePosition.removeChild(newTilePosition.children[0])
                oldTilePosition.appendChild(selectedPiece)
                console.log(player)
                player = 1
            }
            if (ateChekcer) {
                let newTilePosition = document.getElementById(newTile.id)
                oldTilePosition.appendChild(selectedPiece)
                newTilePosition.removeChild(newTilePosition.children[0])
                newTilePosition.appendChild(replacedPiece)

                console.log(player)
                player = 1
                document.getElementsByClassName("player")[0].textContent = "Black's Turn"

            }
        }
    }
    else if (white != undefined) {
        if (player == 1) {
            document.getElementById("check").textContent = `White King Will Be Checked`
            if (ateChekcer == false) {
                let newTilePosition = document.getElementById(newTile.id)
                newTilePosition.removeChild(newTilePosition.children[0])
                oldTilePosition.appendChild(selectedPiece)
                console.log(player)
                player = 0
            }
            if (ateChekcer) {
                let newTilePosition = document.getElementById(newTile.id)
                oldTilePosition.appendChild(selectedPiece)
                newTilePosition.removeChild(newTilePosition.children[0])
                newTilePosition.appendChild(replacedPiece)

                console.log(player)
                player = 0
                document.getElementsByClassName("player")[0].textContent = "White's Turn"

            }
        }
    }

    setTimeout(() => { document.getElementById("check").textContent = `` }, 2000)

}

const checkMateChecker = () => {
    console.log("CheckMateChecker is running")
    let whiteKing = []
    let whiteKingParameterID = []
    let blackKing = []
    let blackKingParameterID = []

    document.querySelectorAll(`.tile`).forEach(tile => {
        try {
            if (tile.children[0].classList[0] == `white` && tile.children[0].classList[1] == "king") {
                whiteKing.push(tile)
            }
            else if (tile.children[0].classList[0] == `black` && tile.children[0].classList[1] == "king") {
                blackKing.push(tile)
            }
        }
        catch {
            // console.log("No piece")
        }

    })

    let whiteKingFirstDigit = parseInt(whiteKing[0].id[0])
    let whiteKingSecondDigit = parseInt(whiteKing[0].id[1])
    let blackKingFirstDigit = parseInt(blackKing[0].id[1])
    let blackKingSecondDigit = parseInt(blackKing[0].id[1])


    // WhiteKing Parameters
    whiteKingParameterID.push(`${whiteKingFirstDigit - 1}${whiteKingSecondDigit + 1}`)
    whiteKingParameterID.push(`${whiteKingFirstDigit}${whiteKingSecondDigit + 1}`)
    whiteKingParameterID.push(`${whiteKingFirstDigit + 1}${whiteKingSecondDigit + 1}`)

    whiteKingParameterID.push(`${whiteKingFirstDigit - 1}${whiteKingSecondDigit}`)
    whiteKingParameterID.push(`${whiteKingFirstDigit + 1}${whiteKingSecondDigit}`)

    whiteKingParameterID.push(`${whiteKingFirstDigit - 1}${whiteKingSecondDigit - 1}`)
    whiteKingParameterID.push(`${whiteKingFirstDigit}${whiteKingSecondDigit - 1}`)
    whiteKingParameterID.push(`${whiteKingFirstDigit + 1}${whiteKingSecondDigit - 1}`)
    // )

    // BlackKing Parameters
    blackKingParameterID.push(`${blackKingFirstDigit - 1}${blackKingSecondDigit + 1}`)
    blackKingParameterID.push(`${blackKingFirstDigit}${blackKingSecondDigit + 1}`)
    blackKingParameterID.push(`${blackKingFirstDigit + 1}${blackKingSecondDigit + 1}`)

    blackKingParameterID.push(`${blackKingFirstDigit - 1}${blackKingSecondDigit}`)
    blackKingParameterID.push(`${blackKingFirstDigit + 1}${blackKingSecondDigit}`)

    blackKingParameterID.push(`${blackKingFirstDigit - 1}${blackKingSecondDigit - 1}`)
    blackKingParameterID.push(`${blackKingFirstDigit}${blackKingSecondDigit - 1}`)
    blackKingParameterID.push(`${blackKingFirstDigit + 1}${blackKingSecondDigit - 1}`)
    // )

    
    // White Pawn Checker Arrays
    let UpperLeftTilesWhitePawn = []
    let UpperRightTilesWhitePawn = []
    // )

    // Black Pawn Checker Arrays
    let UnderLeftTilesBlackPawn = []
    let UnderRightTilesBlackPawn = []
    // )

    let blackingID = parseInt(blackKing[0].id)
    let blackingIDFirstDigit = parseInt(blackKing[0].id[0])
    let blackingIDSecondDigit = parseInt(blackKing[0].id[1])

    let whitekingId = parseInt(whiteKing[0].id)
    let whitekingIdFirstDigit = parseInt(whiteKing[0].id[0])
    let whitekingIdSecondDigit = parseInt(whiteKing[0].id[1])


    document.querySelectorAll(`.tile`).forEach(tile => {
        let chessChar = tile.children[0]
        try {

            // White Checks the Black King
            if (chessChar.classList[0] == "white") {

                // White Pawn Checks Black King
                if (chessChar.classList[1] == "pawn") {
                    // console.log("I am a white pawn")
                    let pawnPiece = chessChar
                    let pawnID = pawnPiece.parentElement.id
                    let UpperLeftTile = parseInt(`${parseInt(pawnID[0]) - 1}${parseInt(pawnID[1]) + 1}`)
                    let UpperRightTile = parseInt(`${parseInt(pawnID[0]) + 1}${parseInt(pawnID[1]) + 1}`)


                    UpperLeftTilesWhitePawn.push(UpperLeftTile)
                    UpperRightTilesWhitePawn.push(UpperRightTile)

                    if (UpperLeftTilesWhitePawn.includes(blackingID) || UpperRightTilesWhitePawn.includes(blackingID)) {
                        blackKingCheck = true
                        kingChecker()
                        // )
                    }

                }
                // )

                // White Horse Checks Black King
                else if (chessChar.classList[1] == "horse") {
                    // console.log("I am a white horse")
                    let horsePiece = chessChar
                    let horsePieceID = horsePiece.parentElement.id

                    let upLeftTile = parseInt(`${parseInt(horsePieceID[0]) - 1}${parseInt(horsePieceID[1]) + 2}`)
                    let upRightTile = parseInt(`${parseInt(horsePieceID[0]) + 1}${parseInt(horsePieceID[1]) + 2}`)

                    let downLeftTile = parseInt(`${parseInt(horsePieceID[0]) - 1}${parseInt(horsePieceID[1]) - 2}`)
                    let downRightTile = parseInt(`${parseInt(horsePieceID[0]) + 1}${parseInt(horsePieceID[1]) - 2}`)

                    let leftUpTile = parseInt(`${parseInt(horsePieceID[0]) - 2}${parseInt(horsePieceID[1]) + 1}`)
                    let leftDownTile = parseInt(`${parseInt(horsePieceID[0]) - 2}${parseInt(horsePieceID[1]) - 1}`)

                    let rightUpTile = parseInt(`${parseInt(horsePieceID[0]) + 2}${parseInt(horsePieceID[1]) + 1}`)
                    let rightDownTile = parseInt(`${parseInt(horsePieceID[0]) + 2}${parseInt(horsePieceID[1]) - 1}`)

                    if ((blackingID == upLeftTile)
                        || (blackingID == upRightTile)
                        || (blackingID == downLeftTile)
                        || (blackingID == downRightTile)
                        || (blackingID == leftUpTile)
                        || (blackingID == leftDownTile)
                        || (blackingID == rightUpTile)
                        || (blackingID == rightDownTile)) {
                        // alert("Check")
                        blackKingCheck = true
                        kingChecker()

                    }
                }
                // )

                // White Rook Checks Black King
                else if (chessChar.classList[1] == "rook") {
                    // console.log("I am a white rook")
                    let blockedCells = []
                    let blockedCellsRooks = []
                    let blockedCellsRookIDAbove = []
                    let blockedCellsRookIDUnder = []
                    let blockedCellsRookIDRight = []
                    let blockedCellsRookIDLeft = []

                    let rookPiece = chessChar
                    let rookPieceID = rookPiece.parentElement.id

                    document.querySelectorAll(".tile").forEach(tile => {
                        if (tile.children.length == 1) {
                            blockedCells.push(tile)
                        }
                    })

                    for (tile of blockedCells) {
                        if (tile.id[0] == rookPieceID[0] && tile.id[1] > rookPieceID[1]) {
                            blockedCellsRookIDAbove.push(tile.id)
                            blockedCellsRooks.push(tile)

                        }
                        else if (tile.id[0] == rookPieceID[0] && tile.id[1] < rookPieceID[1]) {
                            blockedCellsRookIDUnder.push(tile.id)
                            blockedCellsRooks.push(tile)
                        }
                        else if (tile.id[1] == rookPieceID[1] && tile.id[0] > rookPieceID[0]) {
                            blockedCellsRookIDRight.push(tile.id)
                            blockedCellsRooks.push(tile)

                        }
                        else if (tile.id[1] == rookPieceID[1] && tile.id[0] < rookPieceID[0]) {
                            blockedCellsRookIDLeft.push(tile.id)
                            blockedCellsRooks.push(tile)
                        }
                    }
                    try {
                        if ((blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1] == blackingID)) {
                            // alert("Check")
                            blackKingCheck = true
                            kingChecker()

                        }
                        else (
                            blackKingCheck = false
                        )
                    }

                    catch {
                        // console.log("error")
                    }

                    try {
                        if ((blockedCellsRookIDUnder[0] == blackingID)) {
                            // alert("Check")
                            blackKingCheck = true
                            kingChecker()

                        }
                        else (
                            blackKingCheck = false
                        )
                    }

                    catch {
                        // console.log("error")
                    }

                    try {
                        if ((blockedCellsRookIDRight[0] == blackingID)) {
                            // alert("Check")
                            blackKingCheck = true
                            kingChecker()

                        }
                        else (
                            blackKingCheck = false
                        )

                    }

                    catch {
                        // console.log("error")
                    }

                    try {
                        if ((blockedCellsRookIDLeft[blockedCellsRookIDLeft.length - 1] == blackingID)) {
                            // alert("Check")
                            blackKingCheck = true
                            kingChecker()

                        }
                        else (
                            blackKingCheck = false
                        )
                    }

                    catch {
                        // console.log("error")
                    }
                }
                // )

                // White Bishop Checks Black King
                else if (chessChar.classList[1] == "bishop") {
                    // console.log("I am a white bishop")
                    let blockedCells = []
                    let blockedCellsBishop = []
                    let blockedCellsBishopID = []
                    let blockedCellsBishopIDUpperLeft = []
                    let blockedCellsBishopIDUpperRight = []
                    let blockedCellsBishopIDBottomLeft = []
                    let blockedCellsBishopIDBottomRight = []

                    let bishopPiece = chessChar
                    let bishopID = bishopPiece.parentElement.id

                    document.querySelectorAll(".tile").forEach(tile => {
                        if (tile.children.length == 1) {
                            blockedCells.push(tile)
                        }
                    })
                    blockedCells.forEach(tile => {
                        if (((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)
                            || (tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                            || (tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                            || (tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0))) {
                            blockedCellsBishop.push(tile)
                            blockedCellsBishopID.push(tile.id)
                        }
                    })

                    blockedCells.forEach(tile => {
                        if ((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                            blockedCellsBishopIDUpperLeft.push(tile)
                        }
                        if ((tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                            blockedCellsBishopIDUpperRight.push(tile)
                        }
                        if ((tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                            blockedCellsBishopIDBottomLeft.push(tile)
                        }
                        if ((tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                            blockedCellsBishopIDBottomRight.push(tile)
                        }
                    })

                    if ((blackingIDFirstDigit < bishopID[0]) && (blackingIDSecondDigit > bishopID[1]) && ((blackingID - bishopID) % 9 == 0)) {
                        try {
                            if (blackingID == blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()
                            }
                        }
                        catch {
                            return false
                        }
                    }
                    if ((blackingIDFirstDigit > bishopID[0]) && (blackingIDSecondDigit > bishopID[1]) && ((blackingID - bishopID) % 11 == 0)) {
                        try {
                            if (blackingID == blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()
                            }
                        }
                        catch {
                            return false
                        }
                    }

                    if ((blackingIDFirstDigit < bishopID[0]) && (blackingIDSecondDigit < bishopID[1]) && ((blackingID - bishopID) % 11 == 0)) {
                        try {
                            if (blackingID == blockedCellsBishopIDBottomLeft[0].id) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()
                            }
                        }
                        catch {
                            return false
                        }
                    }
                    if ((blackingIDFirstDigit > bishopID[0]) && (blackingIDSecondDigit < bishopID[1]) && ((blackingID - bishopID) % 9 == 0)) {
                        try {
                            if (blackingID == blockedCellsBishopIDBottomRight[0].id) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()
                            }
                        }
                        catch {
                            return false
                        }
                    }
                }
                // )

                // White Queen Checks Black King
                else if (chessChar.classList[1] == "queen") {
                    // console.log("I am a white queen")

                    let queenPiece = chessChar
                    let queenPieceID = queenPiece.parentElement.id

                    // Bishop Attributes of Queen
                    if (((blackingIDFirstDigit < queenPieceID[0]) && (blackingIDSecondDigit > queenPieceID[1]) && ((blackingID - queenPieceID) % 9 == 0)
                        || (blackingIDFirstDigit > queenPieceID[0]) && (blackingIDSecondDigit > queenPieceID[1]) && ((blackingID - queenPieceID) % 11 == 0)
                        || (blackingIDFirstDigit < queenPieceID[0]) && (blackingIDSecondDigit < queenPieceID[1]) && ((blackingID - queenPieceID) % 11 == 0)
                        || (blackingIDFirstDigit > queenPieceID[0]) && (blackingIDSecondDigit < queenPieceID[1]) && ((blackingID - queenPieceID) % 9 == 0))) {
                        let blockedCells = []
                        let blockedCellsBishop = []
                        let blockedCellsBishopID = []
                        let blockedCellsBishopIDUpperLeft = []
                        let blockedCellsBishopIDUpperRight = []
                        let blockedCellsBishopIDBottomLeft = []
                        let blockedCellsBishopIDBottomRight = []

                        let bishopPiece = chessChar
                        let bishopID = bishopPiece.parentElement.id

                        document.querySelectorAll(".tile").forEach(tile => {
                            if (tile.children.length == 1) {
                                blockedCells.push(tile)
                            }
                        })
                        blockedCells.forEach(tile => {
                            if (((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)
                                || (tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                                || (tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                                || (tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0))) {
                                blockedCellsBishop.push(tile)
                                blockedCellsBishopID.push(tile.id)
                            }
                        })

                        blockedCells.forEach(tile => {
                            if ((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                                blockedCellsBishopIDUpperLeft.push(tile)
                            }
                            if ((tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                                blockedCellsBishopIDUpperRight.push(tile)
                            }
                            if ((tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                                blockedCellsBishopIDBottomLeft.push(tile)
                            }
                            if ((tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                                blockedCellsBishopIDBottomRight.push(tile)
                            }
                        })

                        if ((blackingIDFirstDigit < bishopID[0]) && (blackingIDSecondDigit > bishopID[1]) && ((blackingID - bishopID) % 9 == 0)) {
                            try {
                                if (blackingID == blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                                    // alert("Check")
                                    blackKingCheck = true
                                    kingChecker()
                                }
                            }
                            catch {
                                return false
                            }
                        }
                        if ((blackingIDFirstDigit > bishopID[0]) && (blackingIDSecondDigit > bishopID[1]) && ((blackingID - bishopID) % 11 == 0)) {
                            try {
                                if (blackingID == blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                                    // alert("Check")
                                    blackKingCheck = true
                                    kingChecker()
                                }
                            }
                            catch {
                                return false
                            }
                        }

                        if ((blackingIDFirstDigit < bishopID[0]) && (blackingIDSecondDigit < bishopID[1]) && ((blackingID - bishopID) % 11 == 0)) {
                            try {
                                if (blackingID == blockedCellsBishopIDBottomLeft[0].id) {
                                    // alert("Check")
                                    blackKingCheck = true
                                    kingChecker()
                                }
                            }
                            catch {
                                return false
                            }
                        }
                        if ((blackingIDFirstDigit > bishopID[0]) && (blackingIDSecondDigit < bishopID[1]) && ((blackingID - bishopID) % 9 == 0)) {
                            try {
                                if (blackingID == blockedCellsBishopIDBottomRight[0].id) {
                                    // alert("Check")
                                    blackKingCheck = true
                                    kingChecker()
                                }
                            }
                            catch {
                                return false
                            }
                        }
                    }
                    // )

                    // Rook Attributes of Queen
                    else if ((blackingIDFirstDigit == queenPieceID[0]
                        && blackingIDSecondDigit != queenPieceID[1])
                        || (blackingIDFirstDigit != queenPieceID[0]
                            && blackingIDSecondDigit == queenPieceID[1])) {
                        // console.log("I am a white rook")
                        let blockedCells = []
                        let blockedCellsRooks = []
                        let blockedCellsRookIDAbove = []
                        let blockedCellsRookIDUnder = []
                        let blockedCellsRookIDRight = []
                        let blockedCellsRookIDLeft = []

                        let rookPiece = chessChar
                        let rookPieceID = rookPiece.parentElement.id

                        document.querySelectorAll(".tile").forEach(tile => {
                            if (tile.children.length == 1) {
                                blockedCells.push(tile)
                            }
                        })

                        for (tile of blockedCells) {
                            if (tile.id[0] == rookPieceID[0] && tile.id[1] > rookPieceID[1]) {
                                blockedCellsRookIDAbove.push(tile.id)
                                blockedCellsRooks.push(tile)

                            }
                            else if (tile.id[0] == rookPieceID[0] && tile.id[1] < rookPieceID[1]) {
                                blockedCellsRookIDUnder.push(tile.id)
                                blockedCellsRooks.push(tile)
                            }
                            else if (tile.id[1] == rookPieceID[1] && tile.id[0] > rookPieceID[0]) {
                                blockedCellsRookIDRight.push(tile.id)
                                blockedCellsRooks.push(tile)

                            }
                            else if (tile.id[1] == rookPieceID[1] && tile.id[0] < rookPieceID[0]) {
                                blockedCellsRookIDLeft.push(tile.id)
                                blockedCellsRooks.push(tile)
                            }
                        }
                        try {
                            if ((blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1] == blackingID)) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()

                            }
                            else (
                                blackKingCheck = false
                            )
                        }

                        catch {
                            // console.log("error")
                        }

                        try {
                            if ((blockedCellsRookIDUnder[0] == blackingID)) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()

                            }
                            else (
                                blackKingCheck = false
                            )
                        }

                        catch {
                            // console.log("error")
                        }

                        try {
                            if ((blockedCellsRookIDRight[0] == blackingID)) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()

                            }
                            else (
                                blackKingCheck = false
                            )

                        }

                        catch {
                            // console.log("error")
                        }

                        try {
                            if ((blockedCellsRookIDLeft[blockedCellsRookIDLeft.length - 1] == blackingID)) {
                                // alert("Check")
                                blackKingCheck = true
                                kingChecker()

                            }
                            else (
                                blackKingCheck = false
                            )
                        }

                        catch {
                            // console.log("error")
                        }
                    }
                    // )
                }
                // 
            }
            // )

            // Black Checks the White King
            else if (chessChar.classList[0] == "black") {

                // Black Pawn Checks White King
                if (chessChar.classList[1] == "pawn") {
                    // console.log("I am a black pawn")
                    let pawnPiece = chessChar
                    let pawnID = pawnPiece.parentElement.id
                    let UpperLeftTile = parseInt(`${parseInt(pawnID[0]) - 1}${parseInt(pawnID[1]) - 1}`)
                    let UpperRightTile = parseInt(`${parseInt(pawnID[0]) + 1}${parseInt(pawnID[1]) - 1}`)


                    UnderLeftTilesBlackPawn.push(UpperLeftTile)
                    UnderRightTilesBlackPawn.push(UpperRightTile)



                    // console.log(`Pawn Checker Upper left: ${UpperLeftTile}`)
                    // console.log(`Pawn Checker Upper right: ${UpperRightTile}`)
                    // console.log(`Pawn Checker Upper left Tiles: ${UpperLeftTilesWhitePawn}`)
                    // console.log(`Pawn Checker Upper right Tiles: ${UpperRightTilesWhitePawn}`)
                    // console.log(UpperLeftTilesWhitePawn.includes(blackingID))
                    // console.log(UpperRightTilesWhitePawn.includes(blackingID))
                    // console.log(UpperLeftTilesWhitePawn.includes(blackingID))
                    // console.log(UpperRightTilesWhitePawn.includes(blackingID))
                    if (UnderLeftTilesBlackPawn.includes(whitekingId) || UnderRightTilesBlackPawn.includes(whitekingId)) {
                        whiteKingCheck = true
                        kingChecker("white")
                        // )
                    }

                }
                // )

                // Black Horse Checks White King
                else if (chessChar.classList[1] == "horse") {
                    // console.log("I am a white horse")
                    let horsePiece = chessChar
                    let horsePieceID = horsePiece.parentElement.id

                    let upLeftTile = parseInt(`${parseInt(horsePieceID[0]) - 1}${parseInt(horsePieceID[1]) + 2}`)
                    let upRightTile = parseInt(`${parseInt(horsePieceID[0]) + 1}${parseInt(horsePieceID[1]) + 2}`)

                    let downLeftTile = parseInt(`${parseInt(horsePieceID[0]) - 1}${parseInt(horsePieceID[1]) - 2}`)
                    let downRightTile = parseInt(`${parseInt(horsePieceID[0]) + 1}${parseInt(horsePieceID[1]) - 2}`)

                    let leftUpTile = parseInt(`${parseInt(horsePieceID[0]) - 2}${parseInt(horsePieceID[1]) + 1}`)
                    let leftDownTile = parseInt(`${parseInt(horsePieceID[0]) - 2}${parseInt(horsePieceID[1]) - 1}`)

                    let rightUpTile = parseInt(`${parseInt(horsePieceID[0]) + 2}${parseInt(horsePieceID[1]) + 1}`)
                    let rightDownTile = parseInt(`${parseInt(horsePieceID[0]) + 2}${parseInt(horsePieceID[1]) - 1}`)

                    if ((whitekingId == upLeftTile)
                        || (whitekingId == upRightTile)
                        || (whitekingId == downLeftTile)
                        || (whitekingId == downRightTile)
                        || (whitekingId == leftUpTile)
                        || (whitekingId == leftDownTile)
                        || (whitekingId == rightUpTile)
                        || (whitekingId == rightDownTile)) {
                        whiteKingCheck = true
                        kingChecker("white")
                    }
                }
                // )

                // Black Rook Checks White King
                else if (chessChar.classList[1] == "rook") {
                    // console.log("I am a black rook")
                    let blockedCells = []
                    let blockedCellsRooks = []
                    let blockedCellsRookIDAbove = []
                    let blockedCellsRookIDUnder = []
                    let blockedCellsRookIDRight = []
                    let blockedCellsRookIDLeft = []

                    let rookPiece = chessChar
                    let rookPieceID = rookPiece.parentElement.id

                    document.querySelectorAll(".tile").forEach(tile => {
                        if (tile.children.length == 1) {
                            blockedCells.push(tile)
                        }
                    })

                    for (tile of blockedCells) {
                        if (tile.id[0] == rookPieceID[0] && tile.id[1] > rookPieceID[1]) {
                            blockedCellsRookIDAbove.push(tile.id)
                            blockedCellsRooks.push(tile)

                        }
                        else if (tile.id[0] == rookPieceID[0] && tile.id[1] < rookPieceID[1]) {
                            blockedCellsRookIDUnder.push(tile.id)
                            blockedCellsRooks.push(tile)
                        }
                        else if (tile.id[1] == rookPieceID[1] && tile.id[0] > rookPieceID[0]) {
                            blockedCellsRookIDRight.push(tile.id)
                            blockedCellsRooks.push(tile)

                        }
                        else if (tile.id[1] == rookPieceID[1] && tile.id[0] < rookPieceID[0]) {
                            blockedCellsRookIDLeft.push(tile.id)
                            blockedCellsRooks.push(tile)
                        }
                    }
                    try {
                        if ((blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1] == whitekingId)) {
                            // alert("Check")
                            whiteKingCheck = true
                            kingChecker("white")

                        }

                    }

                    catch {
                        // console.log("error")
                    }

                    try {
                        if ((blockedCellsRookIDUnder[0] == whitekingId)) {
                            // alert("Check")
                            whiteKingCheck = true
                            kingChecker("white")

                        }

                    }

                    catch {
                        // console.log("error")
                    }

                    try {
                        if ((blockedCellsRookIDRight[0] == whitekingId)) {
                            // alert("Check")
                            whiteKingCheck = true
                            kingChecker("white")

                        }


                    }

                    catch {
                        // console.log("error")
                    }

                    try {
                        if ((blockedCellsRookIDLeft[blockedCellsRookIDLeft.length - 1] == whitekingId)) {
                            // alert("Check")
                            whiteKingCheck = true
                            kingChecker("white")

                        }

                    }

                    catch {
                        // console.log("error")
                    }
                }
                // )

                // Black Bishop Checks White King
                else if (chessChar.classList[1] == "bishop") {
                    // console.log("I am a black bishop")
                    let blockedCells = []
                    let blockedCellsBishop = []
                    let blockedCellsBishopID = []
                    let blockedCellsBishopIDUpperLeft = []
                    let blockedCellsBishopIDUpperRight = []
                    let blockedCellsBishopIDBottomLeft = []
                    let blockedCellsBishopIDBottomRight = []

                    let bishopPiece = chessChar
                    let bishopID = bishopPiece.parentElement.id

                    document.querySelectorAll(".tile").forEach(tile => {
                        if (tile.children.length == 1) {
                            blockedCells.push(tile)
                        }
                    })
                    blockedCells.forEach(tile => {
                        if (((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)
                            || (tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                            || (tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                            || (tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0))) {
                            blockedCellsBishop.push(tile)
                            blockedCellsBishopID.push(tile.id)
                        }
                    })

                    blockedCells.forEach(tile => {
                        if ((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                            blockedCellsBishopIDUpperLeft.push(tile)
                        }
                        if ((tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                            blockedCellsBishopIDUpperRight.push(tile)
                        }
                        if ((tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                            blockedCellsBishopIDBottomLeft.push(tile)
                        }
                        if ((tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                            blockedCellsBishopIDBottomRight.push(tile)
                        }
                    })

                    if ((whitekingIdFirstDigit < bishopID[0]) && (whitekingIdSecondDigit > bishopID[1]) && ((whitekingId - bishopID) % 9 == 0)) {
                        try {
                            if (whitekingId == blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")
                            }
                        }
                        catch {
                            return false
                        }
                    }
                    if ((whitekingIdFirstDigit > bishopID[0]) && (whitekingIdSecondDigit > bishopID[1]) && ((whitekingId - bishopID) % 11 == 0)) {
                        try {
                            if (whitekingId == blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")
                            }
                        }
                        catch {
                            return false
                        }
                    }

                    if ((whitekingIdFirstDigit < bishopID[0]) && (whitekingIdSecondDigit < bishopID[1]) && ((whitekingId - bishopID) % 11 == 0)) {
                        try {
                            if (whitekingId == blockedCellsBishopIDBottomLeft[0].id) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")
                            }
                        }
                        catch {
                            return false
                        }
                    }
                    if ((whitekingIdFirstDigit > bishopID[0]) && (whitekingIdSecondDigit < bishopID[1]) && ((whitekingId - bishopID) % 9 == 0)) {
                        try {
                            if (whitekingId == blockedCellsBishopIDBottomRight[0].id) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")
                            }
                        }
                        catch {
                            return false
                        }
                    }
                }
                // )

                // Black Queen Checks White King
                else if (chessChar.classList[1] == "queen") {
                    // console.log("I am a Black Queen")

                    let queenPiece = chessChar
                    let queenPieceID = queenPiece.parentElement.id

                    // Bishop Properties of Queen
                    if (((whitekingIdFirstDigit < queenPieceID[0]) && (whitekingIdSecondDigit > queenPieceID[1]) && ((whitekingId - queenPieceID) % 9 == 0)
                        || (whitekingIdFirstDigit > queenPieceID[0]) && (whitekingIdSecondDigit > queenPieceID[1]) && ((whitekingId - queenPieceID) % 11 == 0)
                        || (whitekingIdFirstDigit < queenPieceID[0]) && (whitekingIdSecondDigit < queenPieceID[1]) && ((whitekingId - queenPieceID) % 11 == 0)
                        || (whitekingIdFirstDigit > queenPieceID[0]) && (whitekingIdSecondDigit < queenPieceID[1]) && ((whitekingId - queenPieceID) % 9 == 0))) {
                        console.log("I am a black bishop")
                        let blockedCells = []
                        let blockedCellsBishop = []
                        let blockedCellsBishopID = []
                        let blockedCellsBishopIDUpperLeft = []
                        let blockedCellsBishopIDUpperRight = []
                        let blockedCellsBishopIDBottomLeft = []
                        let blockedCellsBishopIDBottomRight = []

                        let bishopPiece = chessChar
                        let bishopID = bishopPiece.parentElement.id

                        document.querySelectorAll(".tile").forEach(tile => {
                            if (tile.children.length == 1) {
                                blockedCells.push(tile)
                            }
                        })
                        blockedCells.forEach(tile => {
                            if (((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)
                                || (tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                                || (tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)
                                || (tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0))) {
                                blockedCellsBishop.push(tile)
                                blockedCellsBishopID.push(tile.id)
                            }
                        })

                        blockedCells.forEach(tile => {
                            if ((tile.id[0] < bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                                blockedCellsBishopIDUpperLeft.push(tile)
                            }
                            if ((tile.id[0] > bishopID[0]) && (tile.id[1] > bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                                blockedCellsBishopIDUpperRight.push(tile)
                            }
                            if ((tile.id[0] < bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 11 == 0)) {
                                blockedCellsBishopIDBottomLeft.push(tile)
                            }
                            if ((tile.id[0] > bishopID[0]) && (tile.id[1] < bishopID[1]) && ((tile.id - bishopID) % 9 == 0)) {
                                blockedCellsBishopIDBottomRight.push(tile)
                            }
                        })

                        if ((whitekingIdFirstDigit < bishopID[0]) && (whitekingIdSecondDigit > bishopID[1]) && ((whitekingId - bishopID) % 9 == 0)) {
                            try {
                                if (whitekingId == blockedCellsBishopIDUpperLeft[blockedCellsBishopIDUpperLeft.length - 1].id) {
                                    // alert("Check")
                                    whiteKingCheck = true
                                    kingChecker("white")
                                }
                            }
                            catch {
                                return false
                            }
                        }
                        if ((whitekingIdFirstDigit > bishopID[0]) && (whitekingIdSecondDigit > bishopID[1]) && ((whitekingId - bishopID) % 11 == 0)) {
                            try {
                                if (whitekingId == blockedCellsBishopIDUpperRight[blockedCellsBishopIDUpperRight.length - 1].id) {
                                    // alert("Check")
                                    whiteKingCheck = true
                                    kingChecker("white")
                                }
                            }
                            catch {
                                return false
                            }
                        }

                        if ((whitekingIdFirstDigit < bishopID[0]) && (whitekingIdSecondDigit < bishopID[1]) && ((whitekingId - bishopID) % 11 == 0)) {
                            try {
                                if (whitekingId == blockedCellsBishopIDBottomLeft[0].id) {
                                    // alert("Check")
                                    whiteKingCheck = true
                                    kingChecker("white")
                                }
                            }
                            catch {
                                return false
                            }
                        }
                        if ((whitekingIdFirstDigit > bishopID[0]) && (whitekingIdSecondDigit < bishopID[1]) && ((whitekingId - bishopID) % 9 == 0)) {
                            try {
                                if (whitekingId == blockedCellsBishopIDBottomRight[0].id) {
                                    // alert("Check")
                                    whiteKingCheck = true
                                    kingChecker("white")
                                }
                            }
                            catch {
                                return false
                            }
                        }

                    }
                    // )


                    // Rook Properties of Queen
                    else if ((whitekingIdFirstDigit == queenPieceID[0]
                        && whitekingIdSecondDigit != queenPieceID[1])
                        || (whitekingIdFirstDigit != queenPieceID[0]
                            && whitekingIdSecondDigit == queenPieceID[1])) {
                        // console.log("I am a black rook")
                        let blockedCells = []
                        let blockedCellsRooks = []
                        let blockedCellsRookIDAbove = []
                        let blockedCellsRookIDUnder = []
                        let blockedCellsRookIDRight = []
                        let blockedCellsRookIDLeft = []

                        let rookPiece = chessChar
                        let rookPieceID = rookPiece.parentElement.id

                        document.querySelectorAll(".tile").forEach(tile => {
                            if (tile.children.length == 1) {
                                blockedCells.push(tile)
                            }
                        })

                        for (tile of blockedCells) {
                            if (tile.id[0] == rookPieceID[0] && tile.id[1] > rookPieceID[1]) {
                                blockedCellsRookIDAbove.push(tile.id)
                                blockedCellsRooks.push(tile)

                            }
                            else if (tile.id[0] == rookPieceID[0] && tile.id[1] < rookPieceID[1]) {
                                blockedCellsRookIDUnder.push(tile.id)
                                blockedCellsRooks.push(tile)
                            }
                            else if (tile.id[1] == rookPieceID[1] && tile.id[0] > rookPieceID[0]) {
                                blockedCellsRookIDRight.push(tile.id)
                                blockedCellsRooks.push(tile)

                            }
                            else if (tile.id[1] == rookPieceID[1] && tile.id[0] < rookPieceID[0]) {
                                blockedCellsRookIDLeft.push(tile.id)
                                blockedCellsRooks.push(tile)
                            }
                        }
                        try {
                            if ((blockedCellsRookIDAbove[blockedCellsRookIDAbove.length - 1] == whitekingId)) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")

                            }

                        }

                        catch {
                            // console.log("error")
                        }

                        try {
                            if ((blockedCellsRookIDUnder[0] == whitekingId)) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")

                            }

                        }

                        catch {
                            // console.log("error")
                        }

                        try {
                            if ((blockedCellsRookIDRight[0] == whitekingId)) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")

                            }


                        }

                        catch {
                            // console.log("error")
                        }

                        try {
                            if ((blockedCellsRookIDLeft[blockedCellsRookIDLeft.length - 1] == whitekingId)) {
                                // alert("Check")
                                whiteKingCheck = true
                                kingChecker("white")

                            }

                        }

                        catch {
                            // console.log("error")
                        }

                    }
                    // )
                }
                // )

            }
            // )
        }

        catch {
            // console.log(`tile has no chess piece`)
        }
    })
}

const board = resetBoard()
const boardNUM = resetBoard("JesusIsGay")
makeBoard()
makePiece([whiteking, whitequeen, whitebishop, whitehorse, whiterook, whitepawn, blackking, blackqueen, blackbishop, blackhorse, blackrook, blackpawn])
let counter = 0
let player = 0
let selectedTile = ``
let selectedPiece = ``
let newTile = ''
let replacedPiece = ``
let ateChekcer = false
let blackKingCheck = ''
let whiteKingCheck = ''
// checkMateChecker()
selectPiece()
document.querySelectorAll(".tile").forEach(tile => {
    tile.addEventListener("click", () => {
        // console.log("You clicked on a tile")
        // console.log(counter)
        // checkMateChecker()
        // selectPiece()

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
            // checkMateChecker()
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

