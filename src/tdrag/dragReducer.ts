import DragElement from "./dragElement";
//异常元素id为-1
const ERR_CHILD_ID = -1;
export default class DragReducer {
    //单例
    static instance: DragReducer | null = null;
    //节点集合
    private children: DragElement[] = [];
    //标识集合
    private IDS: number[] = [];
    //最大标识
    private maxID: number = 0;

    constructor() {
        this.single();
    };

    private single() {
        if (!DragReducer.instance) {
            DragReducer.instance = this;
        }
        ;
        return DragReducer.instance;
    };

    /**
     * 生成递增标识
     */
    private generateMaxID() {
        if (DragReducer.instance) {
            DragReducer.instance.maxID++;
        }
        ;
        return DragReducer.instance?.maxID;
    };

    /**
     * 插入递增标识至标识集合
     */
    private insertIDS() {
        if (DragReducer.instance) {
            DragReducer.instance.IDS.push(DragReducer.instance.maxID);
        }
        ;
    };

    /**
     * 同步集合与最大标识
     */
    private autoGenerateElementId() {
        const id = DragReducer.instance?.generateMaxID();
        DragReducer.instance?.insertIDS();
        return id;
    };

    /**
     * 创建节点
     */
    public createChild(HTMLElement: (HTMLElement | null)) {
        if (DragReducer.instance && HTMLElement) {
            const E = new DragElement(DragReducer.instance.autoGenerateElementId() ?? ERR_CHILD_ID);
            E.init(HTMLElement);
            DragReducer.instance.children.push(E);
            console.log(this.children,'c')
        }
        ;
    };
}
