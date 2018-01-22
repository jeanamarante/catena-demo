/**
 * Mouse input helper.
 *
 * @singleton Mouse
 */

SINGLE.Mouse = {
    _canvas: null,

    // Rect listeners.
    _listeners: [],

    /**
     * <canvas> element that will listen to mouse events.
     *
     * @function setCanvasRegion
     * @param {HTMLCanvasElement}
     * @api public
     */

    setCanvasRegion: function (canvas) {
        this._canvas = canvas;
        this._canvas.onclick = this._onCanvasClick.bind(this);
    },

    /**
     * @function addRectListener
     * @param {CLASS.Rect} listener
     * @api public
     */

    addRectListener: function (listener) {
        if (!isInstance(CLASS.Rect, listener) || this._listeners.indexOf(listener) !== -1) { return undefined; }

        this._listeners.push(listener);
    },

    /**
     * Mouse click callback for canvas element.
     *
     * @function onCanvasClick
     * @param {MouseEvent} e
     * @api private
     */

    _onCanvasClick: function (e) {
        // Mouse click coordinates relative to the canvas region.
        var x = e.layerX;
        var y = e.layerY;

        for (var i = 0, max = this._listeners.length; i < max; i++) {
            var listener = this._listeners[i];

            if (listener.containsPoint(x, y)) {
                listener.onMouseClick(e);

                break;
            }
        }
    }
};
