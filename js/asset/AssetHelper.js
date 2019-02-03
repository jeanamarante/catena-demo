/**
 * @class SINGLE.AssetHelper
 * @classdesc Store assets.
 * @hideconstructor
 */

SINGLE.AssetHelper = {
    _pieceImageRegistry: {},

    /**
     * Load assets.
     *
     * @function init
     * @api public
     */

    init: function () {
        this._pieceImageRegistry[CONST.BLACK] = {};
        this._pieceImageRegistry[CONST.WHITE] = {};

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
     * @function hasPieceImage
     * @param {String} color
     * @param {String} type
     * @return {Boolean}
     * @api public
     */

    hasPieceImage: function (color, type) {
        return !isUndefined(this._pieceImageRegistry[color]) && !isUndefined(this._pieceImageRegistry[color][type]);
    },

    /**
     * @function getPieceImage
     * @param {String} color
     * @param {String} type
     * @return {HTMLImageElement}
     * @api public
     */

    getPieceImage: function (color, type) {
        return this.hasPieceImage(color, type) ? this._pieceImageRegistry[color][type] : null;
    },

    /**
     * @function loadPieceImage
     * @param {String} color
     * @param {String} type
     * @param {String} id
     * @api private
     */

    _loadPieceImage: function (color, type, id) {
        this._pieceImageRegistry[color][type] = document.getElementById(id);
    }
};
