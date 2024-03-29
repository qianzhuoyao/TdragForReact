import {
    fromEvent,
    Observable,
    concatAll,
    takeUntil,
    withLatestFrom,
    map, takeWhile,
} from "rxjs";

type eventRunName =
    | 'mousedown_enter'
    | 'mousemove_moving'
    | 'mouseup_put'
type resultRunName =
    'drag_result_success'
    | 'drag_result_fail'
    | 'drag_result_finally'
type ILiveOfEvent = { [k in eventRunName]?: ILiveNotifyCallback }
type IResultOfDrag = { [k in resultRunName]?: IResultNotifyCallback }
type ILiveNotifyCallback = (evt?: Event) => void
type IResultNotifyCallback = () => void


export default class DragEvent {
    private readonly mouseDownObserver: Observable<Event> | null = null;
    private readonly mouseMoveObserver: Observable<Event> | null = null;
    private readonly mouseUpObserver: Observable<Event> | null = null;
    private liveOfEvent: ILiveOfEvent = {}
    private resultOfDrag: IResultOfDrag = {}
    private stop: boolean = false
    private E: HTMLElement | null = null

    constructor(HTMLElement: HTMLElement) {
        this.mouseDownObserver = fromEvent(HTMLElement, 'mousedown');
        this.mouseMoveObserver = fromEvent(document, 'mousemove');
        this.mouseUpObserver = fromEvent(document, 'mouseup');
        HTMLElement.style.position = 'absolute'
        document.onselectstart = (i) => i.preventDefault();
        document.ondragstart = () => false;
        this.LoadDragEvent(HTMLElement)
        this.E = HTMLElement
    };

    public cancel() {
        this.stop = true
    }

    public open() {
        if (this.E) {
            this.stop = false
            this.LoadDragEvent(this.E)
        }
    }

    /**
     * 载入事件
     * @private
     */
    private LoadDragEvent(HTMLElement: HTMLElement) {
        if (this.mouseDownObserver && this.mouseMoveObserver && this.mouseUpObserver) {
            this.mouseDownObserver.pipe(
                takeWhile(() => !this.stop),
                map((evt: Event) => {
                    if (this.liveOfEvent.mousedown_enter) {
                        this.liveOfEvent.mousedown_enter(evt)
                    }
                    return (this.mouseMoveObserver as Observable<Event>).pipe(
                        map((evt: Event) => {
                            if (this.liveOfEvent.mousemove_moving) {
                                this.liveOfEvent.mousemove_moving(evt)
                            }
                        }),
                        takeUntil(
                            (this.mouseUpObserver as Observable<Event>).pipe(
                                map((evt: Event) => {
                                    this.mixinEvent(evt, HTMLElement)
                                })
                            )
                        )
                    );
                }),
                concatAll(),
                withLatestFrom(this.mouseMoveObserver),
                map((latestResult: any) => {
                    const {pageX, pageY} = latestResult[1] as MouseEvent;
                    return {
                        x: pageX,
                        y: pageY,
                    };
                })
            )
                .subscribe(({x, y}) => {
                    if (!this.stop) {
                        HTMLElement.style.left = x + 'px'
                        HTMLElement.style.top = y + 'px'
                    }
                });
        }
    };

    private mixinEvent(evt: Event, HTMLElement: HTMLElement) {
        if (this.liveOfEvent.mouseup_put) {
            this.liveOfEvent.mouseup_put(evt)
        }
        if ((evt as MouseEvent).pageX !== parseFloat(HTMLElement.style.left) ||
            (evt as MouseEvent).pageY !== parseFloat(HTMLElement.style.top)
        ) {
            if (this.resultOfDrag.drag_result_fail) {
                this.resultOfDrag.drag_result_fail()
            }
        } else {
            if (this.resultOfDrag.drag_result_success) {
                this.resultOfDrag.drag_result_success()
            }
        }
        if (this.resultOfDrag.drag_result_finally) {
            this.resultOfDrag.drag_result_finally()
        }
    }

    /**
     * 事件回调
     * @param eventName
     * @param callback
     */
    public eventNotify(eventName: eventRunName, callback: ILiveNotifyCallback) {
        this.liveOfEvent[eventName] = callback
    };

    /**
     * 结果回调
     * @param resultName
     * @param callback
     */
    public resultNotify(resultName: resultRunName, callback: IResultNotifyCallback) {
        this.resultOfDrag[resultName] = callback

    };
};
