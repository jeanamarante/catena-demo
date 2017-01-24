// Cell Dimensions
CONST.CELL_WIDTH = 50;
CONST.CELL_HEIGHT = 50;

// Cell Colors
CONST.GRAY = '#D6D6D6';
CONST.DARK_BROWN = '#AB7549';
CONST.LIGHT_BROWN = '#D4B96E';

// Piece Colors
CONST.BLACK = 'black';
CONST.WHITE = 'white';

// Piece Types
CONST.KING = 'king';
CONST.PAWN = 'pawn';
CONST.ROOK = 'rook';
CONST.QUEEN = 'queen';
CONST.BISHOP = 'bishop';
CONST.KNIGHT = 'knight';

// Row Formations
CONST.BACK = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
CONST.FRONT = ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'];
CONST.EMPTY = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];

// Chess board is 8x8.
CONST.BOARD_LENGTH = 8;

// Chess board layout.
CONST.BOARD_LAYOUT = [
    CONST.BACK, CONST.FRONT, // Black Pieces
    CONST.EMPTY,
    CONST.EMPTY,
    CONST.EMPTY,
    CONST.EMPTY,
    CONST.FRONT, CONST.BACK  // White Pieces
];
