/**
 * Container for all board cells.
 *
 * @class BoardCellGrid
 * @param {Canvas} canvas
 * @param {Board} board
 */

CLASS.BoardCellGrid = function (canvas, board) {
    this._grid = [];
    this._board = board;
    this._pieceFactory = new CLASS.PieceFactory();

    this._build(canvas);
};

CLASS.BoardCellGrid.append = {
    /**
     * Return collection of cells with pieces.
     *
     * @function traceVerticalPath
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Array}
     * @api public
     */

    traceVerticalPath: function (start, end) {
        var path = [];

        // Start and end cells must be in the same column.
        if (start.isSameCell(end) || !start.isInSameColumn(end)) { return path; }

        // Direction
        var inc = start.getRow() < end.getRow() ? 1 : -1;

        // Start from adjacent row.
        var row = start.getRow() + inc;
        var col = start.getColumn();

        // Distance of how many cells are gonna be checked.
        var max = start.calcVerticalDistance(end);

        // Never check the start cell. Only push to path the end
        // cell and the cells between the start and end cells.
        for (var i = 1; i < max; i++) {
            var cell = this._grid[row][col];

            // Ignore empty cells.
            if (!cell.isEmpty()) { path.push(cell); }

            row += inc;
        }

        return path;
    },

    /**
     * @function traceHorizontalPath
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Array}
     * @api public
     */

    traceHorizontalPath: function (start, end) {
        var path = [];

        // Start and end cells must be in the same row.
        if (start.isSameCell(end) || !start.isInSameRow(end)) { return path; }

        var inc = start.getColumn() < end.getColumn() ? 1 : -1;
        var row = start.getRow();
        var col = start.getColumn() + inc;
        var max = start.calcHorizontalDistance(end);

        for (var i = 1; i < max; i++) {
            var cell = this._grid[row][col];

            if (!cell.isEmpty()) { path.push(cell); }

            col += inc;
        }

        return path;
    },

    /**
     * @function traceHorizontalPath
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Array}
     * @api public
     */

    traceDiagonalPath: function (start, end) {
        var path = [];

        // Start and end cells cannot be in the same row or same column.
        if (start.isSameCell(end) || start.isInSameRow(end) || start.isInSameColumn(end)) { return path; }

        var vInc = start.getColumn() < end.getColumn() ? 1 : -1;
        var hInc = start.getRow() < end.getRow() ? 1 : -1;
        var row = start.getRow() + hInc;
        var col = start.getColumn() + vInc;

        // One diagonal cell is traversed after one row and column.
        var max = (start.calcHorizontalDistance(end) + start.calcVerticalDistance(end)) / 2;

        for (var i = 1; i < max; i++) {
            var cell = this._grid[row][col];

            if (!cell.isEmpty()) { path.push(cell); }

            row += hInc;
            col += vInc;
        }

        return path;
    },

    /**
     * @function getCell
     * @param {Number} row
     * @param {Number} col
     * @return {BoardCell}
     * @api public
     */

    getCell: function (row, col) {
        return this._grid[row][col];
    },

    /**
     * Build chess board.
     *
     * @function build
     * @param {Canvas} canvas
     * @api private
     */

    _build: function (canvas) {
        var oddRow = false;

        // Rows
        for (var i = 0; i < CONST.BOARD_LENGTH; i++) {
            // Top row pieces are black.
            var pieceColor = i < 2 ? CONST.BLACK : CONST.WHITE;

            this._grid[i] = [];

            // Columns
            for (var j = 0; j < CONST.BOARD_LENGTH; j++) {
                var type = CONST.BOARD_LAYOUT[i][j];
                var cellColor = '';

                // Odd rows follow a different color pattern.
                if (oddRow) {
                    cellColor = Boolean(j % 2) ? CONST.DARK_BROWN : CONST.LIGHT_BROWN;
                } else {
                    cellColor = Boolean(j % 2) ? CONST.LIGHT_BROWN : CONST.DARK_BROWN;
                }

                this._grid[i][j] = new CLASS.BoardCell(canvas, this._board, i, j, cellColor, this._pieceFactory.getPiece(pieceColor, type));
            }

            oddRow = !oddRow;
        }
    }
};
