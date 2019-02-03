/**
 * @class CLASS.Canvas
 * @param {String} id
 */

CLASS.Canvas = function (id) {
    this._el = document.getElementById(id);
    this._context2D = this._el.getContext('2d');
};

CLASS.Canvas.append = {
    /**
     * @function getHTMLElement
     * @return {HTMLCanvasElement}
     * @api public
     */

    getHTMLElement: function () {
        return this._el;
    },

    /**
     * @function getContext2D
     * @return {CanvasRenderingContext2D}
     * @api public
     */

    getContext2D: function () {
        return this._context2D;
    }
};
