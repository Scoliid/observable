/**
 * Created by wang on 2018/2/12.
 */

import {ObservableArray} from '../src/observableArray';

describe('ObservableArray', () => {
    it('Should initialize to empty array if you pass no args to constructor', function() {
        const instance = new ObservableArray();
        expect(instance().length).toEqual(0);
    });

    it('Should notify "beforeChange" subscribers before push', function () {
        const instance = new ObservableArray();
        instance.push(9);
        expect(instance()).toEqual([9]);
    });

    it('Should notify "beforeChange" subscribers before push2', () => {
        const instance = new ObservableArray();
        let array;
        instance.subscribe((value) => {
            console.log(value)
            array = value.slice()
        })
        instance.push(1);
        expect(array).toEqual([1]);
    })
});