/**
 * @class CLASS.Rook
 * @extends CLASS.Piece
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
     * @function checkMoves
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Boolean}
     * @api public
     */

    checkMoves: function (start, end) {
        return this.checkVerticalMove(start, end, Infinity, false, false) || this.checkHorizontalMove(start, end, Infinity, false, false);
    }
};
