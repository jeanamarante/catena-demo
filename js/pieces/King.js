/**
 * @class King
 * @param {String} color
 */

extend('Piece', 'King');

CLASS.King = function (color) {
    this.super(color, CONST.KING);
};

CLASS.King.append = {
    // The king moves one square in any direction.

    /**
     * @function testMoves
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Boolean}
     * @api public
     */

    testMoves: function (start, end) {
        if (this.testVerticalMove(start, end, 1, false, false)) {
            return true;
        } else if (this.testHorizontalMove(start, end, 1, false, false)) {
            return true;
        } else {
            return this.testDiagonalMove(start, end, [1, 1], false, false);
        }
    }
};
