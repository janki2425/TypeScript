const statusText=document.querySelector(".status") as HTMLParagraphElement;
const cells=document.querySelectorAll(".cell") as NodeListOf<HTMLDivElement>;
const restart=document.querySelector(".restart")  as HTMLButtonElement;
const player_X=document.querySelector('.player-X')  as HTMLButtonElement;
const player_O=document.querySelector('.player-O')  as HTMLButtonElement;
const autoplay=document.querySelector('.autoplay')  as HTMLButtonElement;

type Player = 'X' | 'O' | '';
type BoardState = Player[];

let currentPlayer:Player = '';
let board: string[] = Array(9).fill('');
let game:boolean = false;
let computerPlayer:Player ='';
let iscomputerMode:boolean =false;
let isgameOn:boolean =false;

const combination: number[][] =[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

player_X.addEventListener("click",selectPlayer);
player_O.addEventListener("click",selectPlayer);
autoplay.addEventListener("click",()=>{
    isgameOn =true;
    iscomputerMode = !iscomputerMode;
    if (iscomputerMode && game && currentPlayer === computerPlayer) {
        setTimeout(computerMove, 500);
    }
});
restart.addEventListener("click", restartGame);

cells.forEach((cell, index) => {
    cell.dataset.index = index.toString();
    cell.addEventListener("click", cellClick);
});

function selectPlayer(e: Event): void{
    const target = e.target as HTMLButtonElement;
    if(target.classList.contains("player-X")){
        currentPlayer="X";
        computerPlayer="O";
    }
    else if(target.classList.contains("player-O")){
        currentPlayer="O";
        computerPlayer="X";
    }
    statusText.textContent=`player ${currentPlayer}'s Starts`;

    player_X.disabled=true;
    player_O.disabled=true;
    autoplay.disabled=true;


    game=true;
    if (iscomputerMode && currentPlayer === computerPlayer) {
        setTimeout(computerMove, 500);
    }
}

function cellClick(e:Event):void{
    const target = e.target as HTMLButtonElement;
    let index:any;
    if (!game || currentPlayer === "" || target.textContent !== ""){
        return;
    }

    index=target.dataset.index;

    if(board[index]=='' && game){
        board[index]=currentPlayer;
        target.textContent=currentPlayer;
        target.classList.add('filled');

        checkWinner();
        if (game) {
            changePlayer();

            if (iscomputerMode && currentPlayer === computerPlayer) {
                setTimeout(computerMove, 500);
            }
        }
    }
}
function changePlayer():void{
    currentPlayer=currentPlayer === 'X'? 'O' : 'X';
    statusText.textContent=`player ${currentPlayer} turn`;
}

function computerMove():void{
    if(!game || !iscomputerMode || currentPlayer !== computerPlayer){
        return;
    }
    let emptyCells=board.map((val:any,index:any)=> val=== "" ? index : null).filter(val=>val !== null)

    if(emptyCells.length > 0){
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let move =emptyCells[randomIndex];

        board[move]=currentPlayer;
        cells[move].textContent=currentPlayer;
        cells[move].classList.add('filled');

        checkWinner();
        if(game){
            changePlayer();
        }
    }
}

function checkWinner():void{
    for(let combo of combination){
        const [a,b,c]=combo;
        if(board[a] && board[a]===board[b] && board[a]=== board[c]){
            statusText.textContent=`winner : ${currentPlayer}`;
            game=false;
            return;
        }
    }
    if(board.indexOf('') === -1){
        statusText.textContent="It's a Draw!...";
        game=false;
        return;
    }
}

function restartGame():void{
    board= Array(9).fill('');
    currentPlayer='';
    computerPlayer='';
    iscomputerMode=false;
    game=false;
    statusText.textContent = 'select X or O to start';

    cells.forEach(cell => {
        cell.textContent='';
        cell.classList.remove('filled');
    });

    player_X.disabled=false;
    player_O.disabled=false;
    autoplay.disabled=false;
}

