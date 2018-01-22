/**
 * Chess piece container.
 *
 * @class BoardCell
 * @param {CLASS.Canvas} canvas
 * @param {CLASS.Board} board
 * @param {Number} row
 * @param {Number} col
 * @param {String} color
 * @param {CLASS.Piece} piece
 */

extend('Rect', 'BoardCell');

CLASS.BoardCell = function (canvas, board, row, col, color, piece) {
    var x = col * CONST.CELL_WIDTH;
    var y = row * CONST.CELL_HEIGHT;

    this.super(x, y, CONST.CELL_WIDTH, CONST.CELL_HEIGHT);

    this._row = row;
    this._col = col;
    this._board = board;
    this._color = color;
    this._piece = null;
    this._focused = false;
    this._context = canvas.getContext();

    SINGLE.Mouse.addRectListener(this);

    if (!isNull(piece)) {
        // Cell will render after inserting piece.
        this.insertPiece(piece);
    } else {
        this.render();
    }
};

CLASS.BoardCell.append = {
    /**
     * @function render
     * @api public
     */

    render: function () {
        this._context.fillStyle = this.getColor();

        this._context.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());

        // Render piece on top of background.
        this._renderPiece();
    },

    /**
     * @function focus
     * @api public
     */

    focus: function () {
        this._focused = true;

        // Always render after any change in state.
        this.render();
    },

    /**
     * @function blur
     * @api public
     */

    blur: function () {
        this._focused = false;

        this.render();
    },

    /**
     * @function insertPiece
     * @param {CLASS.Piece} piece
     * @api public
     */

    insertPiece: function (piece) {
        // Do not insert piece if cell is occupied.
        if (!this.isEmpty()) { return undefined; }

        this._piece = piece;
        this._piece.setCell(this);

        this.render();
    },

    /**
     * @function calcVerticalVector
     * @param {CLASS.BoardCell} cell
     * @api public
     */

    removePiece: function () {
        if (this.isEmpty()) { return null; }

        var piece = this._piece;

        this._piece.removeCell();
        this._piece = null;

        this.render();

        return piece;
    },

    /**
     * @function traceVerticalPath
     * @param {CLASS.BoardCell} cell
     * @return {Array}
     * @api public
     */

    traceVerticalPath: function (cell) {
        return this._board.getCellGrid().traceVerticalPath(this, cell);
    },

    /**
     * @function traceHorizontalPath
     * @param {CLASS.BoardCell} cell
     * @return {Array}
     * @api public
     */

    traceHorizontalPath: function (cell) {
        return this._board.getCellGrid().traceHorizontalPath(this, cell);
    },

    /**
     * @function traceDiagonalPath
     * @param {CLASS.BoardCell} cell
     * @return {Array}
     * @api public
     */

    traceDiagonalPath: function (cell) {
        return this._board.getCellGrid().traceDiagonalPath(this, cell);
    },

    /**
     * @function calcVerticalVector
     * @param {CLASS.BoardCell} cell
     * @return {Number}
     * @api public
     */

    calcVerticalVector: function (cell) {
        // A vector has direction.
        return cell.getRow() - this._row;
    },

    /**
     * @function calcVerticalDistance
     * @param {CLASS.BoardCell} cell
     * @return {Number}
     * @api public
     */

    calcVerticalDistance: function (cell) {
        // Distance is an absolute value.
        return Math.abs(this.calcVerticalVector(cell));
    },

    /**
     * @function calcHorizontalVector
     * @param {CLASS.BoardCell} cell
     * @return {Number}
     * @api public
     */

    calcHorizontalVector: function (cell) {
        return cell.getColumn() - this._col;
    },

    /**
     * @function calcHorizontalDistance
     * @param {CLASS.BoardCell} cell
     * @return {Number}
     * @api public
     */

    calcHorizontalDistance: function (cell) {
        return Math.abs(this.calcHorizontalVector(cell));
    },

    /**
     * @function isEmpty
     * @return {Boolean}
     * @api public
     */

    isEmpty: function () {
        return isNull(this._piece);
    },

    /**
     * @function isFocused
     * @return {Boolean}
     * @api public
     */

    isFocused: function () {
        return this._focused;
    },

    /**
     * @function isSameCell
     * @param {CLASS.BoardCell} cell
     * @return {Boolean}
     * @api public
     */

    isSameCell: function (cell) {
        return this.isInSameRow(cell) && this.isInSameColumn(cell);
    },

    /**
     * @function isInSameRow
     * @param {CLASS.BoardCell} cell
     * @return {Boolean}
     * @api public
     */

    isInSameRow: function (cell) {
        return this._row === cell.getRow();
    },

    /**
     * @function getRow
     * @return {Number}
     * @api public
     */

    getRow: function () {
        return this._row;
    },

    /**
     * @function isInSameColumn
     * @param {CLASS.BoardCell} cell
     * @return {Boolean}
     * @api public
     */

    isInSameColumn: function (cell) {
        return this._col === cell.getColumn();
    },

    /**
     * @function getColumn
     * @return {Number}
     * @api public
     */

    getColumn: function () {
        return this._col;
    },

    /**
     * @function getColor
     * @return {String}
     * @api public
     */

    getColor: function () {
        // Render background gray if focused.
        return this._focused ? CONST.GRAY : this._color;
    },

    /**
     * @function getPiece
     * @return {CLASS.Piece}
     * @api public
     */

    getPiece: function () {
        return this._piece;
    },

    /**
     * Mouse click callback.
     *
     * @function onMouseClick
     * @param {MouseEvent} e
     * @api public
     */

    onMouseClick: function (e) {
        // Let the board know this cell has been clicked.
        this._board.onMouseClick(this);
    },

    /**
     * @function renderPiece
     * @api private
     */

    _renderPiece: function () {
        if (this.isEmpty()) { return undefined; }

        this._context.drawImage(this._piece.getImage(), this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }
};
