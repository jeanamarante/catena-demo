/**
 * @class Piece
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
     * Test all possible movement combinations.
     *
     * @function testMoves
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Boolean}
     * @api abstract
     */

    testMoves: function (start, end) {
        this.abstract();
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
        var path = start.traceVerticalPath(end);

        // Cells must be in the same column.
        if (!start.isInSameColumn(end) || !this._testPath(end, path, skipPieces)) {
            return false;

        // Can only move piece in one direction.
        } else if (strictLimit) {
            return this._testVector(limit, start.calcVerticalVector(end));

        // Can move piece in both directions.
        } else {
            return this._testDistance(limit, start.calcVerticalDistance(end));
        }
    },

    /**
     * @function testHorizontallMove
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @param {Number} limit
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api public
     */

    testHorizontalMove: function (start, end, limit, skipPieces) {
        var path = start.traceHorizontalPath(end);

        // Cells must be in the same row.
        if (!start.isInSameRow(end) || !this._testPath(end, path, skipPieces)) {
            return false;
        } else {
            return this._testDistance(limit, start.calcHorizontalDistance(end));
        }
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
        var path = start.traceDiagonalPath(end);

        // Cells cannot be in the same row or same column.
        if (start.isInSameRow(end) || start.isInSameColumn(end) || !this._testPath(end, path, skipPieces)) {
            return false;
        }

        var horizontalTest = this._testDistance(limits[1], start.calcHorizontalDistance(end));

        // Can only move in one direction vertically.
        if (strictVerticalLimit) {
            return this._testVector(limits[0], start.calcVerticalVector(end)) && horizontalTest;
        } else {
            return this._testDistance(limits[0], start.calcVerticalDistance(end)) && horizontalTest;
        }
    },

    /**
     * @function setCell
     * @param {BoardCell} cell
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
     * @param {BoardCell} cell
     * @return {Boolean}
     * @api public
     */

    canMoveToCell: function (cell) {
        if (this._cell === null) {
            return false;

        // Prohibit moving pieces to other cells that have a piece of the same color.
        } else if (!cell.isEmpty() && this.isSameColor(cell.getPiece())) {
            return false;
        } else {
            return this.testMoves(this._cell, cell);
        }
    },

    /**
     * @function getCell
     * @return {BoardCell}
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
     * @function testPath
     * @param {BoardCell} cell
     * @param {Array} path
     * @param {Boolean} skipPieces
     * @return {Boolean}
     * @api private
     */

    _testPath: function (end, path, skipPieces) {
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
     * @function testVector
     * @param {Number} limit
     * @param {Number} vector
     * @return {Boolean}
     * @api private
     */

    _testVector: function (limit, vector) {
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
     * @function testDistance
     * @param {Number} limit
     * @param {Number} distance
     * @return {Boolean}
     * @api private
     */

    _testDistance: function (limit, distance) {
        return Math.abs(limit) >= distance;
    }
};
