function move(from, to, captured, promoted, flag) {
    return (from | (to << 7) | (captured << 14) | (promoted << 20) | flag);
}

function GenerateMoves() {
    GameBoard.moveListStart[GameBoard.ply+1] = GameBoard.moveListStart[GameBoard.ply];

    let pieceType;
    let pieceNumber;
    let square;

    if (GameBoard.side == COLOURS.WHITE) {
        pieceType = PIECES.wP;

        for (pieceNumber = 0; pieceNumber < GameBoard.pieceNumber[pieceType]; pieceNumber++) {
            square = GameBoard.pieceList[pieceIndex(pieceType, pieceNumber)];

            if (GameBoard.pieces[square + 10] == PIECES.EMPTY) {
                // Add Pawn Move
                if (RanksBoard[square] == RANKS.RANK_2 && GameBoard.pieces[square + 20] == PIECES.EMPTY) {
                    // Add Quiet Move here
                }
            }

            if (SQOFFBOARD(square + 9) && PieceCol[GameBoard.pieces[square + 9]] == COLOURS.BLACK) {
                // Add pawn capture move
            }

            if (SQOFFBOARD(square + 11) && PieceCol[GameBoard.pieces[square + 11]] == COLOURS.BLACK) {
                // Add pawn capture move
            }

            if (GameBoard.enPas != SQUARES.NO_SQ) {
                if (square + 9 == GameBoard.enPas) {
                    // Add enPas move
                }

                if (square + 11 == GameBoard.enPas) {
                    // Add enPas move
                }
            }
        }

        if (GameBoard.castlePerm & CASTLEBIT.WKCA) {
            if (GameBoard.pieces[SQUARES.F1] == PIECES.EMPTY && GameBoard.pieces[SQUARES.G1] == PIECES.EMPTY) {
                if (SquareAttacked(SQUARES.F1, COLOURS.BLACK) && SquareAttacked(SQUARES.E1, COLOURS.BLACK)) {
                    // Add Quiet Move
                }
            }
        }

        pieceType = PIECES.wN;
    } else {
        pieceType = PIECES.bP;

        for (pieceNumber = 0; pieceNumber < GameBoard.pieceNumber[pieceType]; pieceNumber++) {
            square = GameBoard.pieceList[pieceIndex(pieceType, pieceNumber)];

            if (GameBoard.pieces[square - 10] == PIECES.EMPTY) {
                // Add Pawn Move
                if (RanksBoard[square] == RANKS.RANK_2 && GameBoard.pieces[square - 20] == PIECES.EMPTY) {
                    // Add Quiet Move here
                }
            }

            if (SQOFFBOARD(square - 9) && PieceCol[GameBoard.pieces[square - 9]] == COLOURS.WHITE) {
                // Add pawn capture move
            }

            if (SQOFFBOARD(square - 11) && PieceCol[GameBoard.pieces[square - 11]] == COLOURS.WHITE) {
                // Add pawn capture move
            }

            if (GameBoard.enPas != SQUARES.NO_SQ) {
                if (square - 9 == GameBoard.enPas) {
                    // Add enPas move
                }
                
                if (square - 11 == GameBoard.enPas) {
                    // Add enPas move
                }
            }

        }

        pieceType = PIECES.bN;
    }
}