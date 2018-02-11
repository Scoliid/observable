/**
 * Created by wang on 2018/2/11.
 */


import {subscribable} from 'subscribable';

const latestValue = Symbol('_lastValue');

export function Observable(initValue) {
    const observable = function() {
        // write
        if (arguments.length > 0) {
            const newValue = arguments[0];
            if (observable[latestValue] !== newValue) {
                observable.valueWillChange();
                observable[latestValue] = newValue;
                observable.valueHasChanged();
            }
            return this;
        // read
        } else {
            return observable[latestValue];
        }
    };
    // initialization assignment
    observable[latestValue] = initValue;
    // extend observable
    Observable.fn.init(observable);

    // set prototype
    Object.setPrototypeOf(observable, Observable.fn);

    return observable;
}

// define prototype
Observable.fn = {
    peek() {return this[latestValue]},
    valueWillChange() {
        this.notifySubscribers(this[latestValue], 'beforeChange');
    },
    valueHasChanged() {
        this.notifySubscribers(this[latestValue]);
    },
};

Object.assign(Observable.fn, subscribable.prototype);


export function isObservable(instance) {
    return true;
}

export function unwrap(value) {
    isObservable(value) ? value() : value;
}

