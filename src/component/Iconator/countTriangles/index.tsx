import * as THREE from 'three'

interface Props {
    traverse(arg0: (node: any) => void): unknown;
    object: THREE.Object3D | THREE.Object3D[] | THREE.Group | THREE.Object3DEventMap;  // 明确指定类型
}

export const countTriangles = (object: Props) => {
    let totalTriangles = 0;
    object.traverse((node) => {
        if (node.isMesh && node.geometry) {
            if (node.geometry.index) {
                totalTriangles += node.geometry.index.count / 3;
            } else {
                totalTriangles += node.geometry.attributes.position.count / 3;
            }
        }
    });
    return totalTriangles;
}
