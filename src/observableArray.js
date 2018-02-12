/**
 * Created by wang on 2018/2/12.
 */

import {Observable, isObservable} from './observable';

export function ObservableArray (initialValues) {
    initialValues = initialValues || [];
    if (typeof initialValues != 'object' || !('length' in initialValues)) {
        throw new Error('The argument passed when initializing an observable array must be an array, or null, or undefined');
    }
    const result = Observable(initialValues);
    Object.setPrototypeOf(result, ObservableArray.fn);
    return result;
}

ObservableArray.fn = {
    delete(itemOfArray) {
        const underlyingArray  = this.peek();
        const deleteValues = [];
        try {
            underlyingArray.forEach((item, index) => {
                if (itemOfArray === item) {
                    if(deleteValues.length === 0) {
                        this.valueWillChange();
                    }
                    deleteValues.push(item);
                    underlyingArray.splice(index, 1);
                }
            });
            if (deleteValues.length) {
                this.valueHasChanged();
            }
            return deleteValues;
        } catch(e) {

        }
    },

    clear() {
        const underlyingArray = this.peek();
        const allValues = underlyingArray.slice(0);
        this.valueWillChange();
        underlyingArray.splice(0);
        this.valueHasChanged();
        return allValues;
    },
};

Object.assign(ObservableArray.fn, Observable.fn);

["pop", "push", "reverse", "shift", "sort", "splice", "unshift"].forEach((method) => {
    ObservableArray.fn[method] = function() {
        const underlyingArray = this.peek();
        this.valueWillChange();
        const methodCallResult = underlyingArray[method].apply(underlyingArray, arguments);
        this.valueHasChanged();
        return (methodCallResult === underlyingArray) ? this : methodCallResult;
    };
});

['slice'].forEach((method) => {
    ObservableArray[method] = function() {
        const underlyingArray = this.peek();
        return underlyingArray[methodName].apply(underlyingArray, arguments);
    };
});
