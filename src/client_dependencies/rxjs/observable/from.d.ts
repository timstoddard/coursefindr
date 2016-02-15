import { Scheduler } from '../Scheduler';
import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
export declare class FromObservable<T> extends Observable<T> {
    private ish;
    private scheduler;
    constructor(ish: Observable<T> | Promise<T> | Iterator<T> | ArrayLike<T>, scheduler: Scheduler);
    static create<T>(ish: any, scheduler?: Scheduler): Observable<T>;
    _subscribe(subscriber: Subscriber<T>): any;
}
