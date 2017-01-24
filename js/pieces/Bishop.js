/**
 * @class Bishop
 * @param {String} color
 */

extend('Piece', 'Bishop');

CLASS.Bishop = function (color) {
    this.super(color, CONST.BISHOP);
};

CLASS.Bishop.append = {
    // The bishop can move any number of squares diagonally,
    // but may not leap over other pieces.

    /**
     * @function testMoves
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Boolean}
     * @api public
     */

    testMoves: function (start, end) {
        return this.testDiagonalMove(start, end, [Infinity, Infinity], false, false);
    }
};
