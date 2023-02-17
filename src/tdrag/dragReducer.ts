import DragElement from "./dragElement";

export default class DragReducer {
    //单例
    static instance: DragReducer | null = null;
    //节点集合 hash
    private children: Map<string, DragElement> = new Map();

    constructor() {
        this.single();
    };

    private single() {
        if (!DragReducer.instance) {
            DragReducer.instance = this;
        }
        return DragReducer.instance;
    };

    public stopChildren() {
        DragReducer.instance?.children.forEach(i => {
            i.stop()
        })
    }

    public reStart(id: string | undefined = undefined) {
        if (typeof id === "string") {
            DragReducer.instance?.children.get(id)?.reStart()
        } else {
            DragReducer.instance?.children.forEach(i => {
                i.reStart()
            })
        }
    }

    public stopChild(id: string) {
        DragReducer.instance?.children.get(id)?.stop()
    }

    public createChild(HTMLElement: (HTMLElement | null)) {
        if (DragReducer.instance && HTMLElement && !DragReducer.instance.children.has(HTMLElement?.id)) {
            const key = HTMLElement?.id;
            const E = new DragElement(key);
            E.init(HTMLElement);
            DragReducer.instance.children.set(key, E)
        }
    };
}
