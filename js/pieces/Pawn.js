/**
 * @class Pawn
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
     * @function testMoves
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Boolean}
     * @api public
     */

    testMoves: function (start, end) {
        // White pieces move up, black pieces move down.
        var verticalLimit = this.isWhite() ? -1 : 1;

        if (this.testVerticalMove(start, end, verticalLimit, true, false)) {
            // Piece has been moved.
            this._clean = false;

            return true;

        } else if (this.testDiagonalMove(start, end, [verticalLimit, 1], true, false)) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * @function testVerticalMove
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @param {Number} limit
     * @param {Boolean} strictLimit
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api public
     */

    testVerticalMove: function (start, end, limit, strictLimit, skipPieces) {
        // Cannot move vertically to occupied cells.
        if (!end.isEmpty()) { return false; }

        // The pawn can move two cells if it has not moved yet.
        if (this._clean) { limit *= 2; }

        return _$_.Piece.testVerticalMove.call(this, start, end, limit, strictLimit, skipPieces);
    },

    /**
     * @function testDiagonalMove
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @param {Array} limits
     * @param {Boolean} strictVerticalLimit
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api public
     */

    testDiagonalMove: function (start, end, limits, strictVerticalLimit, skipPieces) {
        // Cannot move diagonally to empty cells.
        if (end.isEmpty()) { return false; }

        return _$_.Piece.testDiagonalMove.call(this, start, end, limits, strictVerticalLimit, skipPieces);
    }
};
