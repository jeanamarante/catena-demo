/**
 * @class CLASS.Queen
 * @extends CLASS.Piece
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
     * @function checkMoves
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Boolean}
     * @api public
     */

    checkMoves: function (start, end) {
        if (this.checkVerticalMove(start, end, Infinity, false, false) || this.checkHorizontalMove(start, end, Infinity, false, false)) {
            return true;
        } else {
            return this.checkDiagonalMove(start, end, [Infinity, Infinity], false, false);
        }
    }
};
