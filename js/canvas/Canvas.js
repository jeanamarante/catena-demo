/**
 * HTMLCanvasElement module.
 *
 * @class Canvas
 * @param {String} id
 */

CLASS.Canvas = function (id) {
    this._el = document.getElementById(id);
    this._context = this._el.getContext('2d');
};

CLASS.Canvas.append = {
    /**
     * @function getHTMLElement
     * @return {HTMLCanvasElement}
     * @api public
     */

    getElement: function () {
        return this._el;
    },

    /**
     * @function getContext
     * @return {CanvasRenderingContext2D}
     * @api public
     */

    getContext: function () {
        return this._context;
    }
};
