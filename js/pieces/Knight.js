/**
 * @class Knight
 * @param {String} color
 */

extend('Piece', 'Knight');

CLASS.Knight = function (color) {
    this.super(color, CONST.KNIGHT);
};

CLASS.Knight.append = {
    // The knight moves to any of the closest squares that are not on the same rank,
    // file, or diagonal, thus the move forms an "L"-shape: two squares vertically
    // and one square horizontally, or two squares horizontally and one square
    // vertically. The knight is the only piece that can leap over other pieces.

    /**
     * @function testMoves
     * @param {BoardCell} start
     * @param {BoardCell} end
     * @return {Boolean}
     * @api public
     */

    testMoves: function (start, end) {
        var v = start.calcVerticalDistance(end);
        var h = start.calcHorizontalDistance(end);

        return (v === 2 && h === 1) || (v === 1 && h === 2);
    }
};
