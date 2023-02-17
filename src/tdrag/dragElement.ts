import DragEvent from "./dragEvent";

export default class DragElement {
    private id: string = '';
    private SELF: DragEvent | null = null;

    constructor(id: string) {
        this.id = id;
    };

    /**
     * 初始化
     */
    public init(HTMLElement: HTMLElement) {
        this.makeSelfMovable(HTMLElement);
    };

    public stop() {
        this.SELF?.cancel()
    }

    public reStart() {
        this.SELF?.open()
    }

    /**
     * 使SELF可移动
     */
    private makeSelfMovable(HTMLElement: HTMLElement) {
        this.SELF = new DragEvent(HTMLElement)
        this.SELF.eventNotify('mousedown_enter', () => {
            console.log('mousedown_enter')
        })
        this.SELF.eventNotify('mouseup_put', () => {
            console.log('mouseup_put')
        })
        this.SELF.eventNotify('mousemove_moving', () => {
            console.log('mousemove_moving')
        })
        this.SELF.resultNotify('drag_result_fail', () => {
            console.log('drag_result_fail')
        })
        this.SELF.resultNotify('drag_result_success', () => {
            console.log('drag_result_success')
        })
        this.SELF.resultNotify('drag_result_finally', () => {
            console.log('drag_result_finally')
        })
    };
}
