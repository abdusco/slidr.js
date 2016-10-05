/**
 * Created by Abdus on 4.10.2016.
 */

// CustomEvent polyfill
(function () {
    if (typeof window.CustomEvent === "function") { return false; }

    function CustomEvent(event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

(function (global) {
    function Slidr(container, options) {
        if (!container instanceof Node) { throw new Error('element should be single'); }

        var _ = this;
        var extend = function (from, to) {
            Object.keys(from).forEach(function (k) {
                if (!k in to) { return; }
                to[k] = from[k];
            });
            return to;
        };
        var defaults = {
            containerClass: 'slidr',
            currentClass: 'slidr__item--current',
            itemClass: 'slidr__item',
            cycle: true,
        };
        _.options = extend(options || {}, defaults);

        this.reset = function (items, complete) {
            var this$1 = this;

            if (!items) { items = _.items; }
            _.items.forEach(function (i) {
                i.classList.remove(this$1.options.currentClass);
                if (complete) { i.classList.remove(this$1.options.itemClass); }
            });
        }
        this.activate = function (index) {
            index = _.getIndex(index);
            if (index === this.position.current) { return; }

            this.reset();
            var prevItem = _.items[this.position.current];
            var nextItem = _.items[index];

            prevItem.classList.remove(this.options.currentClass);
            nextItem.classList.add(this.options.currentClass);

            this.position.current = index;
            return index;
        }
        this.getIndex = function (index) {
            var count = this.items.length;

            if (this.options.cycle) {
                // if index is higher than elements count, reset to zero
                // if smaller than zero, count back from the end
                index %= count;
                if (index < 0) { index += count; }
            }
            // clamp index between bounds [0, count - 1]
            return Math.min(Math.max(index, 0), count - 1);
        }
        this.dispatch = function (name, detail) {
            var e = new CustomEvent(name, {detail: detail});
            _.container.dispatchEvent(e);
        }
        this.init = function (container) {
            var this$1 = this;

            // prepare container and items
            _.container = container;
            container.classList.add(_.options.containerClass);

            var items = [].slice.call(container.children);
            items.forEach(function (i) { return i.classList.add(this$1.options.itemClass); });
            _.items = items;

            // default to first
            _.position = {
                last: _.items.length - 1,
                current: 0
            };

            // get active element, if theres none, pick the first
            var current = _.container.querySelector('.' + _.options.currentClass);
            if (!current) {
                current = _.items[_.position.current];
                current.classList.add(_.options.currentClass)
            }
            _.position.current = _.items.indexOf(current);

            return container;
        }
        this.init(container);
    }

    var s = Slidr.prototype;
    s.show = function (index) {
        return this.activate(index);
    }
    s.next = function () {
        var index = this.position.current + 1;
        index = this.activate(index);
        if (index !== undefined) { this.dispatch('slidr:next', {index: index, item: this.items[index]}); }
    }
    s.prev = function () {
        var index = this.position.current - 1;
        index = this.activate(index);
        if (index !== undefined) { this.dispatch('slidr:prev', {index: index, item: this.items[index]}); }
    }
    s.update = function () {
        return this.init(this.container);
    }
    s.destroy = function () {
        this.reset(this.items, true);
        this.container.classList.remove(this.options.containerClass);
    }
    s.on = function (name, listener) {
        this.container.addEventListener(name, listener);
    }

    // Exports to multiple environments
    if (typeof define === 'function' && define.amd) { //AMD
        define(function () {
            return Slidr;
        });
    } else if (typeof module !== 'undefined' && module.exports) { //node
        module.exports = Slidr;
    } else { // browser
        // use string because of Google closure compiler ADVANCED_MODE
        /* jslint sub:true */
        global['Slidr'] = Slidr;
    }
})(this);
//# sourceMappingURL=slidr.compiled.js.map