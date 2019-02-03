/**
 * @class CLASS.BoardCellGrid
 * @classdesc Container for all board cells.
 * @param {CLASS.Canvas} canvas
 * @param {CLASS.Board} board
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
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Array}
     * @api public
     */

    traceVerticalPath: function (start, end) {
        let path = [];

        // Start and end cells must be in the same column.
        if (start.isSameCell(end) || !start.isInSameColumn(end)) { return path; }

        // Direction
        let inc = start.getRow() < end.getRow() ? 1 : -1;

        // Start from adjacent row.
        let row = start.getRow() + inc;
        let col = start.getColumn();

        // Distance of how many cells are gonna be checked.
        let max = start.calcVerticalDistance(end);

        // Never check the start cell. Only push to path the end
        // cell and the cells between the start and end cells.
        for (let i = 1; i < max; i++) {
            let cell = this._grid[row][col];

            // Ignore empty cells.
            if (!cell.isEmpty()) { path.push(cell); }

            row += inc;
        }

        return path;
    },

    /**
     * @function traceHorizontalPath
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Array}
     * @api public
     */

    traceHorizontalPath: function (start, end) {
        let path = [];

        // Start and end cells must be in the same row.
        if (start.isSameCell(end) || !start.isInSameRow(end)) { return path; }

        let inc = start.getColumn() < end.getColumn() ? 1 : -1;
        let row = start.getRow();
        let col = start.getColumn() + inc;
        let max = start.calcHorizontalDistance(end);

        for (let i = 1; i < max; i++) {
            let cell = this._grid[row][col];

            if (!cell.isEmpty()) { path.push(cell); }

            col += inc;
        }

        return path;
    },

    /**
     * @function traceHorizontalPath
     * @param {CLASS.BoardCell} start
     * @param {CLASS.BoardCell} end
     * @return {Array}
     * @api public
     */

    traceDiagonalPath: function (start, end) {
        let path = [];

        if (!start.isDiagonal(end)) { return path; }

        let vInc = start.getColumn() < end.getColumn() ? 1 : -1;
        let hInc = start.getRow() < end.getRow() ? 1 : -1;
        let row = start.getRow() + hInc;
        let col = start.getColumn() + vInc;
        let max = (start.calcVerticalDistance(end) + start.calcHorizontalDistance(end)) / 2;

        for (let i = 1; i < max; i++) {
            let cell = this._grid[row][col];

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
     * @return {CLASS.BoardCell}
     * @api public
     */

    getCell: function (row, col) {
        return this._grid[row][col];
    },

    /**
     * Build chess board.
     *
     * @function build
     * @param {CLASS.Canvas} canvas
     * @api private
     */

    _build: function (canvas) {
        let oddRow = false;

        // Rows
        for (let i = 0; i < CONST.BOARD_LENGTH; i++) {
            // Top row pieces are black.
            let pieceColor = i < 2 ? CONST.BLACK : CONST.WHITE;

            this._grid[i] = [];

            // Columns
            for (let j = 0; j < CONST.BOARD_LENGTH; j++) {
                let type = CONST.BOARD_LAYOUT[i][j];
                let cellColor = '';

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
