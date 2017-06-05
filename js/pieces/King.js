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
     * @function checkMoves
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Boolean}
     * @api public
     */

    checkMoves: function (start, end) {
        if (this.checkVerticalMove(start, end, 1, false, false)) {
            return true;
        } else if (this.checkHorizontalMove(start, end, 1, false, false)) {
            return true;
        } else {
            return this.checkDiagonalMove(start, end, [1, 1], false, false);
        }
    }
};
