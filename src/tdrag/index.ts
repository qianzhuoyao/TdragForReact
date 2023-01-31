import DragReducer from "./dragReducer";

/**
 * 相信的心就是魔法
 * @param root
 */
export function magic(root: string) {
    // console.log(root, 'ok')
    const element = document.getElementById(root);
    console.log(element)
    new DragReducer().createChild(element);
};
