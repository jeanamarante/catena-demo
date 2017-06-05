/**
 * @class PieceFactory
 */

CLASS.PieceFactory = function () {

};

CLASS.PieceFactory.append = {
    /**
     * @function getPiece
     * @param {String} color
     * @param {String} type
     * @return {CLASS.Piece}
     * @api public
     */

    getPiece: function (color, type) {
        switch (type) {
            case CONST.PAWN: return new CLASS.Pawn(color);
            case CONST.KING: return new CLASS.King(color);
            case CONST.ROOK: return new CLASS.Rook(color);
            case CONST.QUEEN: return new CLASS.Queen(color);
            case CONST.BISHOP: return new CLASS.Bishop(color);
            case CONST.KNIGHT: return new CLASS.Knight(color);

            default: return null;
        }
    }
};
