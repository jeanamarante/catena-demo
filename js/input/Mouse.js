/**
 * @class SINGLE.Mouse
 * @hideconstructor
 */

SINGLE.Mouse = {
    _el: null,

    _rectListeners: [],

    /**
     * <canvas> element that will listen to mouse events.
     *
     * @function setClickRegion
     * @param {HTMLElement}
     * @api public
     */

    setClickRegion: function (htmlElement) {
        this._el = htmlElement;
        this._el.addEventListener('click', this._onHTMLElementClick.bind(this));
    },

    /**
     * @function addRectListener
     * @param {CLASS.Rect} listener
     * @api public
     */

    addRectListener: function (listener) {
        if (isInstance(CLASS.Rect, listener)) {
            this._rectListeners.push(listener);
        }
    },

    /**
     * Mouse click callback for element.
     *
     * @function onHTMLElementClick
     * @param {MouseEvent} e
     * @api private
     */

    _onHTMLElementClick: function (e) {
        // Mouse click coordinates relative to the element.
        let x = e.layerX;
        let y = e.layerY;

        for (let i = 0, max = this._rectListeners.length; i < max; i++) {
            let listener = this._rectListeners[i];

            if (listener.containsPoint(x, y)) {
                listener.onMouseClick(e);

                break;
            }
        }
    }
};
