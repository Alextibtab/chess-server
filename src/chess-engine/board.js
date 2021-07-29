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

GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveListStart = new Array(MAXDEPTH);

function PrintBoard() {
    let square, file, rank, piece;

    console.log("\nGame Board:\n");
    for (rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
        let line = (RankChar[rank] + " ");
        for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
            square = FileRankToSquare(file, rank);
            piece = GameBoard.pieces[square];
            line += (" " + PieceChar[piece] + " ");
        }
        console.log(line);
    }

    let line = "  ";
    for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
        line += (" " + FileChar[file] + " ");
    }

    console.log(line);
    console.log("side: " + SideChar[GameBoard.side]);
    console.log("enPas: " + GameBoard.enPas);
    line = "";

    if (GameBoard.castlePerm & CASTLEBIT.WKCA) line += 'K';
    if (GameBoard.castlePerm & CASTLEBIT.WQCA) line += 'Q';
    if (GameBoard.castlePerm & CASTLEBIT.BKCA) line += 'k';
    if (GameBoard.castlePerm & CASTLEBIT.BQCA) line += 'q';

    console.log("castle: " + line);
    console.log("Key: " + GameBoard.posKey.toString(16));
}

function GeneratePosKey() {
    let square = 0;
    let finalKey = 0;
    let piece = PIECES.EMPTY;

    for (square = 0; square < BOARD_SQUARES; square++) {
        piece = GameBoard.pieces[square];
        if (piece != PIECES.EMPTY && piece != SQUARES.OFFBOARD) {
            finalKey ^= PieceKeys[(piece * 120) + square];
        }
    }

    if (GameBoard.side == COLOURS.WHITE) {
        finalKey ^= SideKey;
    }

    if (GameBoard.enPas != SQUARES.NO_SQ) {
        finalKey ^= PieceKeys[GameBoard.enPas];
    }

    finalKey ^= CastleKeys[GameBoard.castlePerm];

    return finalKey;
}

function ResetBoard() {
    let index = 0;
    for (index = 0; index < BOARD_SQUARES; index++) {
        GameBoard.pieces[index] = SQUARES.OFFBOARD;
    }

    for (index = 0; index < 64; index++) {
        GameBoard.pieces[square120(index)] = PIECES.EMPTY;
    }

    for (index = 0; index < 14 * 120; index++) {
        GameBoard.pieceList[index] = PIECES.EMPTY;
    }

    for (index = 0; index < 2; index++) {
        GameBoard.material[index] = 0;
    }

    for (index = 0; index < 13; index++) {
        GameBoard.pieceNumber[index] = 0;
    }

    GameBoard.side = COLOURS.BOTH;
    GameBoard.enPas = SQUARES.NO_SQ;
    GameBoard.fiftyMove = 0;
    GameBoard.ply = 0;
    GameBoard.hisPly = 0;
    GameBoard.castlePerm = 0;
    GameBoard.posKey = 0;
    GameBoard.moveListStart[GameBoard.ply] = 0;
}

function ParseFen(fen) {
    ResetBoard();

    let rank = RANKS.RANK_8;
    let file = FILES.FILE_A;
    let piece = 0;
    let count = 0;
    let index = 0;
    let Square120 = 0;
    let fenCount = 0;

    while ((rank >= RANKS.RANK_1) && fenCount < fen.length) {
        count = 1;
        switch (fen[fenCount]) {
            // Parse black pieces
            case 'p': piece = PIECES.bP; break;
            case 'r': piece = PIECES.bR; break;
            case 'n': piece = PIECES.bN; break;
            case 'b': piece = PIECES.bB; break;
            case 'k': piece = PIECES.bK; break;
            case 'q': piece = PIECES.bQ; break;

            // Parse white pieces
            case 'P': piece = PIECES.wP; break;
            case 'R': piece = PIECES.wR; break;
            case 'N': piece = PIECES.wN; break;
            case 'B': piece = PIECES.wB; break;
            case 'K': piece = PIECES.wK; break;
            case 'Q': piece = PIECES.wQ; break;

            case '1':
            case '2':
            case '3':    
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                piece = PIECES.EMPTY;
                count = Number(fen[fenCount]);
                break;
            
            case '/':
            case ' ':
                rank--;
                file = FILES.FILE_A;
                fenCount++;
                continue;

            default:
                console.log("FEN error");
                return;
        }

        for (index = 0; index < count; index++) {
            Square120 = FileRankToSquare(file, rank);
            GameBoard.pieces[Square120] = piece;
            file++; 
        }
        fenCount++;
    }
    // Set side to play
    GameBoard.side = (fen[fenCount] == 'w') ? COLOURS.WHITE : COLOURS.BLACK;
    fenCount += 2;

    for (index = 0; index < 4; index++) {
        if (fen[fenCount] == ' ') {
            break;
        }
        switch(fen[fenCount]) {
            case 'K': GameBoard.castlePerm |= CASTLEBIT.WKCA; break;
            case 'Q': GameBoard.castlePerm |= CASTLEBIT.WQCA; break;
            case 'k': GameBoard.castlePerm |= CASTLEBIT.BKCA; break;
            case 'q': GameBoard.castlePerm |= CASTLEBIT.BQCA; break;
            default: break;
        }
        fenCount++;
    }
    fenCount++;

    if (fen[fenCount] != '-') {
        file = Number(fen[fenCount]);
        rank = Number(fen[fenCount+1]);
        GameBoard.enPas = FileRankToSquare(file, rank);
    }

    GameBoard.posKey = GeneratePosKey();
}