/**
 * Created by Abdus on 4.10.2016.
 */
(function (global) {
    "use strict";
    function Slidr(container, options) {
        "use strict";
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
            var prevItem = _.items[this.position.current];
            var nextItem = _.items[index];

            prevItem.classList.remove(this.options.currentClass);
            nextItem.classList.add(this.options.currentClass);
            // _.reset([prevItem]);

            this.position.current = index;
        }
        this.getIndex = function (index) {
            var count = this.items.length;

            if (this.options.cycle) {
                // if index is higher than elements count, reset to zero
                // if smaller than zero, count back from the end
                index %= count;
                if (index < 0) { index += count; }
            }
            // if larger than max, pick max
            else if (index > count - 1) { index = count - 1; }
            // if smaller than mix, pick min
            else if (index < 0) { index = 0; }

            return index;
        }
        this.init = function (c) {
            var this$1 = this;


            // prepare container and items
            _.container = c;
            c.classList.add(_.options.containerClass);

            var items = [].slice.call(c.children);
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

        }
        this.init(container);
    }

    var s = Slidr.prototype;
    s.show = function (index) {
        "use strict";
        this.activate(index);
    }
    s.next = function () {
        "use strict";
        var next = this.position.current + 1;

        /*var event = document.createEvent('CustomEvent');
         event.initCustomEvent('slidr:next', true, true, {
         index: this.position.current,
         item: this.items[next]
         })
         this.container.dispatchEvent(event);*/

        this.reset();
        this.activate(next);

    }
    s.prev = function () {
        this.reset();
        this.activate(this.position.current - 1);
    }
    s.update = function () {
        "use strict";
        this.init(this.container);
    }
    s.destroy = function () {
        this.reset(this.items, true);
        this.container.classList.remove(this.options.containerClass);
    }
    /*s.on = function (name, cb) {
     this.container.addEventListener(name, cb);
     }*/

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