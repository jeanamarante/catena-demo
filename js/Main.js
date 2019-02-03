/**
 * Initialize app.
 *
 * @class CLASS.Main
 */

CLASS.Main = function () {
    this._canvas = new CLASS.Canvas('app');
    this._board = new CLASS.Board(this._canvas);

    SINGLE.Mouse.setClickRegion(this._canvas.getHTMLElement());
};

CLASS.Main.append = {

};
