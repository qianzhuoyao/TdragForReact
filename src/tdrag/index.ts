import DragReducer from "./dragReducer";


/**
 * 相信的心就是魔法
 * @param root
 */
export function magic(root: string) {
    const element = document.getElementById(root);
    const reducer = new DragReducer()
    reducer.createChild(element);
    return reducer
}

export type IReducer = DragReducer

export const initReducer = new DragReducer()
