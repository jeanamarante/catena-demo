/**
 * Initialize app.
 *
 * @class Main
 */

CLASS.Main = function () {
    var canvas = new CLASS.Canvas('App');

    SINGLE.Mouse.setCanvasRegion(canvas.getElement());

    this._board = new CLASS.Board(canvas);
};

CLASS.Main.append = {

};
