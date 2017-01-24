/**
 * @class Queen
 * @param {String} color
 */

extend('Piece', 'Queen');

CLASS.Queen = function (color) {
    this.super(color, CONST.QUEEN);
};

CLASS.Queen.append = {
    // The queen combines the power of the rook and bishop and can move
    // any number of squares along rank, file, or diagonal, but it may
    // not leap over other pieces.

    /**
     * @function testMoves
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Boolean}
     * @api public
     */

    testMoves: function (start, end) {
        if (this.testVerticalMove(start, end, Infinity, false, false)) {
            return true;
        } else if (this.testHorizontalMove(start, end, Infinity, false, false)) {
            return true;
        } else {
            return this.testDiagonalMove(start, end, [Infinity, Infinity], false, false);
        }
    }
};
