function InitFilesRanksBoard() {
    let index = 0;
    let file = FILES.FILE_A;
    let rank = RANKS.RANK_1;
    let square  = SQUARES.A1;

    // Initialise Files and Ranks boards to offboard value 100
    for (index = 0; index < BOARD_SQUARES; index++) {
        FilesBoard[index] = SQUARES.OFFBOARD;
        RanksBoard[index] = SQUARES.OFFBOARD;
    }

    // Loop through and mark files and ranks with appropriate values defined in the defs file
    for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++) {
        for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
            square = FileRankToSquare(file, rank);
            FilesBoard[square] = file;
            RanksBoard[square] = rank;
        }
    }

}

function InitHashKeys() {
    let index = 0;

    for (index = 0; index < 14 * 120; index++) {
        PieceKeys[index] = rand_32();
    }

    SideKey = rand_32();

    for (index = 0; index < 16; index++) {
        CastleKeys[index] = rand_32();
    }
}

function init() {
    InitFilesRanksBoard();
    InitHashKeys();
}