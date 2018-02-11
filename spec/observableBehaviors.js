/**
 * Created by wang on 2018/2/11.
 */

import {isSubscribable} from 'subscribable';
import {Observable, isObservable} from '../src/observable';



describe('Observable', () => {
    it('should be subscribable', () => {
        const instance = new Observable();
        expect(isSubscribable(instance)).toEqual(true);
    });

    it('should be observable', () => {
        const instance = new Observable();
        expect(isObservable(instance)).toEqual(true);
    });

    it('should be able to write values to it', () => {
        const instance = new Observable();
        instance(9);
        expect(instance()).toEqual(9);
    });

    it('should notify subscribers about each new value', function () {
        var instance = new Observable();
        var notifiedValues = [];
        instance.subscribe(function (value) {
            notifiedValues.push(value);
        });

        instance('A');
        instance('B');

        expect(notifiedValues.length).toEqual(2);
        expect(notifiedValues[0]).toEqual('A');
        expect(notifiedValues[1]).toEqual('B');
    });

    it('Should be able to write to multiple observable properties on a model object using chaining syntax', function() {
        var model = {
            prop1: new Observable(),
            prop2: new Observable()
        };
        model.prop1('A').prop2('B');
        expect(model.prop1()).toEqual('A');
        expect(model.prop2()).toEqual('B');
    });

    it('Should notify "beforeChange" subscribers before each new value', function () {
        var instance = new Observable();
        var notifiedValues = [];
        instance.subscribe(function (value) {
            notifiedValues.push(value);
        }, null, "beforeChange");

        instance('A');
        instance('B');

        expect(notifiedValues.length).toEqual(2);
        expect(notifiedValues[0]).toEqual(undefined);
        expect(notifiedValues[1]).toEqual('A');
    });


});