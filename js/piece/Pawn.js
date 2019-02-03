/**
 * @class CLASS.Pawn
 * @extends CLASS.Piece
 * @param {String} color
 */

extend('Piece', 'Pawn');

CLASS.Pawn = function (color) {
    this.super(color, CONST.PAWN);

    // Is piece in its initial position?
    this._clean = true;
};

CLASS.Pawn.append = {
    // The pawn may move forward to the unoccupied square immediately
    // in front of it on the same file, or on its first move it may
    // advance two squares along the same file provided both squares
    // are unoccupied or the pawn may capture an opponent's piece on
    // a square diagonally in front of it on an adjacent file, by moving
    // to that square.

    /**
     * @function checkMoves
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Boolean}
     * @api public
     */

    checkMoves: function (start, end) {
        // White pieces move up, black pieces move down.
        let verticalLimit = this.isWhite() ? -1 : 1;

        if (this.checkVerticalMove(start, end, verticalLimit, true, false)) {
            // Piece has been moved.
            this._clean = false;

            return true;

        } else if (this.checkDiagonalMove(start, end, [verticalLimit, 1], true, false)) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * @function checkVerticalMove
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @param {Number} limit
     * @param {Boolean} strictLimit
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api public
     */

    checkVerticalMove: function (start, end, limit, strictLimit, skipPieces) {
        // Cannot move vertically to occupied cells.
        if (!end.isEmpty()) { return false; }

        // The pawn can move two cells if it has not moved yet.
        if (this._clean) { limit *= 2; }

        return _$_.Piece.checkVerticalMove.call(this, start, end, limit, strictLimit, skipPieces);
    },

    /**
     * @function checkDiagonalMove
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @param {Array} limits
     * @param {Boolean} strictVerticalLimit
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api public
     */

    checkDiagonalMove: function (start, end, limits, strictVerticalLimit, skipPieces) {
        // Cannot move diagonally to empty cells.
        if (end.isEmpty()) { return false; }

        return _$_.Piece.checkDiagonalMove.call(this, start, end, limits, strictVerticalLimit, skipPieces);
    }
};
