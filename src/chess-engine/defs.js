const PIECES = { EMPTY: 0, wP: 1, wN: 2, wB: 3, wR: 4, wQ: 5, wK: 6, bP: 7, bN: 8, bB: 9, bR: 10, bQ: 11, bK: 12 };
const BOARD_SQUARES = 120;
const FILES = { FILE_A: 0, FILE_B: 1, FILE_C: 2, FILE_D: 3, FILE_E: 4, FILE_F: 5, FILE_G: 6, FILE_H: 7, FILE_NONE: 8 };
const RANKS = { RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3, RANK_5: 4, RANK_6: 5, RANK_7: 6, RANK_8: 7, RANK_NONE: 8 };
const COLOURS = { WHITE: 0, BLACK: 1, BOTH: 2 };
const CASTLEBIT = { WKCA: 1, WQCA: 2, BKCA: 4, BQCA: 8};
const SQUARES = {
    A1:21, B1:22, C1:23, D1:24, E1:25, F1:26, G1:27, H1:28,
    A8:91, B8:92, C8:93, D8:94, E8:95, F8:96, G8:97, H8:98,
    NO_SQ:99, OFFBOARD:100
};


let FilesBoard = new Array(BOARD_SQUARES);
let RanksBoard = new Array(BOARD_SQUARES);

// Get the square for a file and rank on the board
function FileRankToSquare(file, rank) {
    return((21 + file) + (rank * 10));
}

let PieceBig = [ false, false, true, true, true, true, true, false, true, true, true, true, true ];
let PieceMaj = [ false, false, false, false, true, true, true, false, false, false, true, true, true ];
let PieceMin = [ false, false, true, true, false, false, false, false, true, true, false, false, false ];
let PieceVal= [ 0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000  ];
let PieceCol = [ COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE,
	COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK ];
	
let PiecePawn = [ false, true, false, false, false, false, false, true, false, false, false, false, false ];	
let PieceKnight = [ false, false, true, false, false, false, false, false, true, false, false, false, false ];
let PieceKing = [ false, false, false, false, false, false, true, false, false, false, false, false, true ];
let PieceRookQueen = [ false, false, false, false, true, true, false, false, false, false, true, true, false ];
let PieceBishopQueen = [ false, false, false, true, false, true, false, false, false, true, false, true, false ];
let PieceSlides = [ false, false, false, true, true, true, false, false, false, true, true, true, false ];

let PieceKeys = new Array(14 * 120);
let SideKey;
let CastleKeys = new Array(16);

function rand_32() {
    return (Math.floor((Math.random()*255)+1) << 23) | (Math.floor((Math.random()*255)+1) << 16)
        | (Math.floor(Math.random()*255)+1) << 8 | Math.floor((Math.random()*255)+1)
}