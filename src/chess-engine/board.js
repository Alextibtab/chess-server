function PieceIndex(piece, pieceNumber) {
    return (piece * 10 + pieceNumber);
}

let GameBoard = {};

GameBoard.pieces = new Array(BOARD_SQUARES);
GameBoard.side = COLOURS.WHITE;
GameBoard.fiftyMove = 0;
GameBoard.hisPly = 0;
GameBoard.ply = 0;
GameBoard.enPas = 0;
GameBoard.castlePerm = 0;
GameBoard.material = new Array(2); // material count of pieces for black and white
GameBoard.pieceNumber = new Array(13); // indexed by piece
GameBoard.pieceList = new Array(14 * 10);
GameBoard.posKey = 0;