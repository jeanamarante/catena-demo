/**
 * @class CLASS.Bishop
 * @extends CLASS.Piece
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
     * @function checkMoves
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Boolean}
     * @api public
     */

    checkMoves: function (start, end) {
        return this.checkDiagonalMove(start, end, [Infinity, Infinity], false, false);
    }
};
