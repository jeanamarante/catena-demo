/**
 * Handles the interactable states of the game.
 *
 * @class Board
 * @param {Canvas} canvas
 */

CLASS.Board = function (canvas) {
    this._cells = new CLASS.BoardCellGrid(canvas, this);

    // Pointer to currently selected cell.
    this._target = null;

    // Which player's turn is it?
    this._playerTurn = CONST.WHITE;
};

CLASS.Board.append = {
    /**
     * @function hasTarget
     * @return {Boolean}
     * @api public
     */

    hasTarget: function () {
        return this._target !== null;
    },

    /**
     * @function getCellGrid
     * @return {BoardCellGrid}
     * @api public
     */

    getCellGrid: function () {
        return this._cells;
    },

    /**
     * Listen for clicked cell.
     *
     * @function onMouseClick
     * @param {BoardCell} cell
     * @api public
     */

    onMouseClick: function (cell) {
        // Try to move piece first.
        this._movePiece(cell);
        this._focusCell(cell);
    },

    /**
     * @function togglePlayerTurn
     * @api private
     */

    _togglePlayerTurn: function () {
        this._playerTurn = this._playerTurn === CONST.WHITE ? CONST.BLACK : CONST.WHITE;
    },

    /**
     * @function canFocusCell
     * @param {BoardCell} cell
     * @return {Boolean}
     * @api private
     */

    _canFocusCell: function (cell) {
        // Cell cannot be focused if empty or if it isn't the player's turn.
        return !cell.isEmpty() && cell.getPiece().getColor() === this._playerTurn;
    },

    /**
     * @function focusCell
     * @param {BoardCell} cell
     * @api private
     */

    _focusCell: function (cell) {
        // Always blur cell before focusing new one.
        this._blurCell();

        if (!this._canFocusCell(cell)) { return undefined; }

        this._target = cell;
        this._target.focus();
    },

    /**
     * @function blurCell
     * @api private
     */

    _blurCell: function () {
        // If no cell is focused, do nothing.
        if (!this.hasTarget()) { return undefined; }

        this._target.blur();
        this._target = null;
    },

    /**
     * Move piece in cell to new cell.
     *
     * @function movePiece
     * @param {BoardCell} cell
     * @api private
     */

    _movePiece: function (cell) {
        if (!this.hasTarget()) { return undefined; }

        var canMove = this._target.getPiece().canMoveToCell(cell);

        if (canMove) {
            // Remove piece if there is any in the destination cell.
            cell.removePiece();

            // Remove piece from old cell and move to new one.
            cell.insertPiece(this._target.removePiece());

            // Change player turn after valid move.
            this._togglePlayerTurn();
        }
    }
};
