/**
 * Store assets needed for game.
 *
 * @singleton AssetHelper
 */

SINGLE.AssetHelper = {
    _pieceImages: {},

    /**
     * Load assets.
     *
     * @function init
     * @api public
     */

    init: function () {
        this._pieceImages[CONST.BLACK] = {};
        this._pieceImages[CONST.WHITE] = {};

        this._loadPieceImage(CONST.BLACK, CONST.KING, 'black-king');
        this._loadPieceImage(CONST.BLACK, CONST.PAWN, 'black-pawn');
        this._loadPieceImage(CONST.BLACK, CONST.ROOK, 'black-rook');
        this._loadPieceImage(CONST.BLACK, CONST.QUEEN, 'black-queen');
        this._loadPieceImage(CONST.BLACK, CONST.BISHOP, 'black-bishop');
        this._loadPieceImage(CONST.BLACK, CONST.KNIGHT, 'black-knight');

        this._loadPieceImage(CONST.WHITE, CONST.KING, 'white-king');
        this._loadPieceImage(CONST.WHITE, CONST.PAWN, 'white-pawn');
        this._loadPieceImage(CONST.WHITE, CONST.ROOK, 'white-rook');
        this._loadPieceImage(CONST.WHITE, CONST.QUEEN, 'white-queen');
        this._loadPieceImage(CONST.WHITE, CONST.BISHOP, 'white-bishop');
        this._loadPieceImage(CONST.WHITE, CONST.KNIGHT, 'white-knight');
    },

    /**
     * @function getPieceImage
     * @param {String} color
     * @param {String} type
     * @return {HTMLImageElement}
     * @api public
     */

    getPieceImage: function (color, type) {
        return this._pieceImageExists(color, type) ? this._pieceImages[color][type] : null;
    },

    /**
     * @function pieceImageExists
     * @param {String} color
     * @param {String} type
     * @return {Boolean}
     * @api private
     */

    _pieceImageExists: function (color, type) {
        return this._pieceImages[color] !== undefined && this._pieceImages[color][type] !== undefined;
    },

    /**
     * @function loadPieceImage
     * @param {String} color
     * @param {String} type
     * @param {String} id
     * @api private
     */

    _loadPieceImage: function (color, type, id) {
        this._pieceImages[color][type] = document.getElementById(id);
    }
};
