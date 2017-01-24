/**
 * @class Rook
 * @param {String} color
 */

extend('Piece', 'Rook');

CLASS.Rook = function (color) {
    this.super(color, CONST.ROOK);
};

CLASS.Rook.append = {
    // The rook can move any number of squares along any rank or file,
    // but may not leap over other pieces.

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
            return false;
        }
    }
};
