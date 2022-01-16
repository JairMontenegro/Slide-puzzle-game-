const puzzleContainer = document.querySelector('#puzzle-container')
let puzzle =[]
let size = 3

generatePuzzle()
ramdomizePuzzle()
renderPuzzle()
handleInput()


function getRow(pos){
return Math.ceil(pos/size)
}

function getCol(pos){
    const col =  pos % size
    if (col=== 0){
        return size
    }
    return col
}

function generatePuzzle(){
    for(let i =1;i <= size * size; i++){
        puzzle.push({
            value: i,
            pisition: i,
            x: (getCol(i) - 1) * 200 ,
            y: (getRow(i) - 1) * 200,
            disabled:false,
        })
    }
    
}

    function renderPuzzle() {
        puzzleContainer.innerHTML = ''
        for (let puzzleItem of puzzle) {
            if(puzzleItem.disabled) continue
            puzzleContainer.innerHTML += `
            <div class ="puzzle-item" style= "left:${puzzleItem.x}px; top:${puzzleItem.y}px;">
                ${puzzleItem.value}
            </div>    
            `
        }
    }

    function ramdomizePuzzle(){
        const randomValues = getRandomValues()
       // console.log(randomValues)
        let i = 0
        for(let puzzleItem of puzzle){
        puzzleItem.value = randomValues[i]
        i++
        }

        const puzzleWhithValueOf9 = puzzle.find(item => item.value === size * size)
        puzzleWhithValueOf9.disabled = true;
        //console.log(puzzle) 
    }
    function getRandomValues(){
        const values =[]
        for(let i = 1; i <= size * size; i++){
            values.push(i)
        }

        const randomValues = values.sort(() => Math.random() - 0.5)
        return randomValues
    }

    function handleInput(){
        document.addEventListener('keydown',handleKeyDown)
    }

    function handleKeyDown(e){
        console.log(e.key)
        switch(e.key){
            case "ArrowLeft":
                moveLeft()
            break
            case "ArrowRight":
                moveRight()
            break
            case "ArrowUp":
                moveUp()
                
            break         
            case "ArrowDown":
                moveDown()
            break
        }
        renderPuzzle()
    }

    function moveLeft(){
        const emptyPuzzle = getEmptyPuzzle()
        const rightPuzzle= getRightPuzzle()
        if(rightPuzzle){
            swapPositions(emptyPuzzle, rightPuzzle, true)
        }
    }
    function moveRight(){
        const emptyPuzzle = getEmptyPuzzle()
        const leftPuzzle= getLeftPuzzle()
        if(leftPuzzle){
            swapPositions(emptyPuzzle, leftPuzzle, true)
        }
    }
    function moveUp(){
        const emptyPuzzle = getEmptyPuzzle()
        const belowPuzzle= getBelowPuzzle()
        if(belowPuzzle){
            swapPositions(emptyPuzzle, belowPuzzle, false)
        }}
    function moveDown(){
        const emptyPuzzle = getEmptyPuzzle()
        const abovePuzzle= getAbovePuzzle()
        if(abovePuzzle){
            swapPositions(emptyPuzzle, abovePuzzle, false)
        }
    }

    function swapPositions(firstPuzzle, secondPuzzle, isX = false ){
        //position swapping 
        let temp = firstPuzzle.position
        firstPuzzle.position = secondPuzzle.position
        secondPuzzle.postion = temp
        
        //x position swapping
        
        if(isX){
        temp = firstPuzzle.x
        firstPuzzle.x = secondPuzzle.x
        secondPuzzle.x = temp 
        }else{
            // must be y 
            temp = firstPuzzle.y
            firstPuzzle.y = secondPuzzle.y
            secondPuzzle.y = temp 
        }
    }

    function getLeftPuzzle(){
        //Get the puzzle just left the empty puzzle
        const emptyPuzzle = getEmptyPuzzle()
        const isLeftEdge = getCol(emptyPuzzle.position)=== 1
        if(isLeftEdge){
            return null
        }
        const puzzle = getPuzzleByPos(emptyPuzzle.position + 1 )
        return puzzle

    }
    function getRightPuzzle(){
        //Get the puzzle just right the empty puzzle
        const emptyPuzzle = getEmptyPuzzle()
        const isRightEdge = getCol(emptyPuzzle.position)=== size
        if(isRightEdge){
            return null
        }
        const puzzle = getPuzzleByPos(emptyPuzzle.position - 1 )
        return puzzle
    }
    function getAbovePuzzle(){
         //Get the puzzle just Above the empty puzzle
         const emptyPuzzle = getEmptyPuzzle()
         const isTopEdge = getRow(emptyPuzzle.position)=== size
         if(isTopEdge){
             return null
         }
         const puzzle = getPuzzleByPos(emptyPuzzle.position - size )
         return puzzle
    }

    function getBelowPuzzle(){
         //Get the puzzle just below the empty puzzle
         const emptyPuzzle = getEmptyPuzzle()
         const isBottomEdge = getRow(emptyPuzzle.position)=== size
         if(isBottomEdge){
             return null
         }
         const puzzle = getPuzzleByPos(emptyPuzzle.position + size )
         return puzzle
    }

    function getEmptyPuzzle(){
        return puzzle.find((item) => item.disabled)
    }

    function getPuzzleByPos(pos){
        return puzzle.find((item) => item.position === pos)
    }


