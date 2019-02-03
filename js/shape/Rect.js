/**
 * @class CLASS.Rect
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */

CLASS.Rect = function (x, y, width, height) {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;

    this.setX(x);
    this.setY(y);
    this.setWidth(width);
    this.setHeight(height);
};

CLASS.Rect.append = {
    /**
     * Mouse click event handler.
     *
     * @abstract
     * @function onMouseClick
     * @param {MouseEvent} e
     * @api public
     */

    onMouseClick: function (e) {
        this.abstract();
    },

    /**
     * Are the point coordinates inside the rectangle?
     *
     * @function containsPoint
     * @return {Boolean}
     * @api public
     */

    containsPoint: function (x, y) {
        return x > this._x && y > this._y && x < this.getXMax() && y < this.getYMax();
    },

    /**
     * @function setX
     * @param {Number} x
     * @api public
     */

    setX: function (x) {
        this._x = x;
    },

    /**
     * @function setY
     * @param {Number} y
     * @api public
     */

    setY: function (y) {
        this._y = y;
    },

    /**
     * @function setWidth
     * @param {Number} width
     * @api public
     */

    setWidth: function (width) {
        this._width = width >= 0 ? width : 0;
    },

    /**
     * @function setHeight
     * @param {Number} height
     * @api public
     */

    setHeight: function (height) {
        this._height = height >= 0 ? height : 0;
    },

    /**
     * @function getX
     * @return {Number}
     * @api public
     */

    getX: function () {
        return this._x;
    },

    /**
     * @function getY
     * @return {Number}
     * @api public
     */

    getY: function () {
        return this._y;
    },

    /**
     * @function getWidth
     * @return {Number}
     * @api public
     */

    getWidth: function () {
        return this._width;
    },

    /**
     * @function getHeight
     * @return {Number}
     * @api public
     */

    getHeight: function () {
        return this._height;
    },

    /**
     * @function getXMax
     * @return {Number}
     * @api public
     */

    getXMax: function () {
        return this._x + this._width;
    },

    /**
     * @function getYMax
     * @return {Number}
     * @api public
     */

    getYMax: function () {
        return this._y + this._height;
    }
};
