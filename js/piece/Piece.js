/**
 * @class CLASS.Piece
 * @param {String} color
 * @param {String} type
 */

CLASS.Piece = function (color, type) {
    this._cell = null;
    this._type = type;
    this._color = color;
    this._image = SINGLE.AssetHelper.getPieceImage(color, type);
};

CLASS.Piece.append = {
    /**
     * Check all possible movement combinations.
     *
     * @function checkMoves
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Boolean}
     * @api abstract
     */

    checkMoves: function (start, end) {
        this.abstract();
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
        let path = start.traceVerticalPath(end);

        // Cells must be in the same column.
        if (!start.isInSameColumn(end) || !this._checkPath(end, path, skipPieces)) {
            return false;

        // Can only move piece in one direction.
        } else if (strictLimit) {
            return this._checkVector(limit, start.calcVerticalVector(end));

        // Can move piece in both directions.
        } else {
            return this._checkDistance(limit, start.calcVerticalDistance(end));
        }
    },

    /**
     * @function checkHorizontallMove
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @param {Number} limit
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api public
     */

    checkHorizontalMove: function (start, end, limit, skipPieces) {
        let path = start.traceHorizontalPath(end);

        // Cells must be in the same row.
        if (!start.isInSameRow(end) || !this._checkPath(end, path, skipPieces)) {
            return false;
        } else {
            return this._checkDistance(limit, start.calcHorizontalDistance(end));
        }
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
        let path = start.traceDiagonalPath(end);

        // Cells cannot be in the same row or same column.
        if (!start.isDiagonal(end) || !this._checkPath(end, path, skipPieces)) {
            return false;
        }

        let horizontalCheck = this._checkDistance(limits[1], start.calcHorizontalDistance(end));

        // Can only move in one direction vertically.
        if (strictVerticalLimit) {
            return this._checkVector(limits[0], start.calcVerticalVector(end)) && horizontalCheck;
        } else {
            return this._checkDistance(limits[0], start.calcVerticalDistance(end)) && horizontalCheck;
        }
    },

    /**
     * @function setCell
     * @param {CLASS.BoardCell} cell
     * @api public
     */

    setCell: function (cell) {
        this._cell = cell;
    },

    /**
     * @function removeCell
     * @api public
     */

    removeCell: function () {
        this._cell = null;
    },

    /**
     * @function isSameColor
     * @return {Boolean}
     * @api public
     */

    isSameColor: function (piece) {
        return this._color === piece.getColor();
    },

    /**
     * Check if piece can move to new cell.
     *
     * @function canMoveToCell
     * @param {CLASS.BoardCell} cell
     * @return {Boolean}
     * @api public
     */

    canMoveToCell: function (cell) {
        if (isNull(this._cell)) {
            return false;

        // Prohibit moving pieces to other cells that have a piece of the same color.
        } else if (!cell.isEmpty() && this.isSameColor(cell.getPiece())) {
            return false;
        } else {
            return this.checkMoves(this._cell, cell);
        }
    },

    /**
     * @function getCell
     * @return {CLASS.BoardCell}
     * @api public
     */

    getCell: function () {
        return this._cell;
    },

    /**
     * @function getType
     * @return {String}
     * @api public
     */

    getType: function () {
        return this._type;
    },

    /**
     * @function isWhite
     * @return {Boolean}
     * @api public
     */

    isWhite: function () {
        return this._color === CONST.WHITE;
    },

    /**
     * @function isBlack
     * @return {Boolean}
     * @api public
     */

    isBlack: function () {
        return this._color === CONST.BLACK;
    },

    /**
     * @function getColor
     * @return {String}
     * @api public
     */

    getColor: function () {
        return this._color;
    },

    /**
     * @function getImage
     * @return {HTMLImageElement}
     * @api public
     */

    getImage: function () {
        return this._image;
    },

    /**
     * @function checkPath
     * @param {CLASS.BoardCell} cell
     * @param {Array} path
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api private
     */

    _checkPath: function (end, path, skipPieces) {
        if (path.length === 0) {
            return true;
        } else if (path.length === 1 && end.isSameCell(path[0])) {
            return true;
        } else {
            return skipPieces;
        }
    },

    /**
     * Check if vector is within the limit.
     *
     * @function checkVector
     * @param {Number} limit
     * @param {Number} vector
     * @return {Boolean}
     * @api private
     */

    _checkVector: function (limit, vector) {
        // Different checks depending on direction.
        if (limit < 0) {
            return vector < 0 && limit <= vector;
        } else {
            return vector > 0 && limit >= vector;
        }
    },

    /**
     * Check if distance is within the limit.
     *
     * @function checkDistance
     * @param {Number} limit
     * @param {Number} distance
     * @return {Boolean}
     * @api private
     */

    _checkDistance: function (limit, distance) {
        return Math.abs(limit) >= distance;
    }
};
