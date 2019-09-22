//#[1]三大构建
var scene; //场景
var camera; //相机
var renderer; //渲染器

var controller;

var origPoint = new THREE.Vector3(0, 0, 0); //原点
//#[!1]三大构建

var light; //灯光
var gui; //dat.gui操作参数界面

var line;

//[2]形状
var shapeCube;
var shapeLine;
var shapePlane;
var shapeSphere;
//[!2]形状

var boxColor = new function() {
    this.face0 = 0x808000; //橄榄
    this.face1 = 0xffff00; //纯黄
    this.face2 = 0x008000; //纯绿
    this.face3 = 0x0000ff; //纯蓝
    this.face4 = 0xff0000; //红色
    this.face5 = 0x8B008B; //深洋红
}

var offsetParm = new function() {
    this.offset_x = 0.01;
    this.offset_y = 0.01;
    this.offset_z = 0.01;

    this.rotation_x = Math.PI / 4;
    this.rotation_y = 10;
    this.rotation_z = 10;
}

var cnt = 0;

var v = 1;

var cubeParm = new function() {
    //size
    this.width = 5;
    this.length = 5;
    this.height = 5;
    //初始位置
    this.oriPosX = 0;
    this.oriPosY = 10;
    this.oriPosZ = 0;
    //偏移量
    this.offsetX = 5;
    this.offsetY = 5;
    this.offsetZ = 5;
    //旋转量
    this.rotationX = 10;
    this.rotationY = 10;
    this.rotationZ = 20;
}

var cubeSize = new function() {
    this.width = 5;
    this.length = 5;
    this.height = 5;
}

var cubeOffset = new function() {
    this.offsetX = 0.01;
    this.offsetY = 0.01;
    this.offsetZ = 0.02;
}
var axes;

function initGrid() {
    // 网格的边长是1000，每个小网格的边长是50
    var helper = new THREE.GridHelper(1000, 500);
    helper.setColors(0x0000ff, 0x808080);
    scene.add(helper);
}

function initScene() {
    scene = new THREE.Scene();
    axes = new THREE.AxesHelper(50);
    scene.add(axes);

    initGrid();
}

function initCamera() {
    //透视相机
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0xffffff));

    renderer.shadowMap.Enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // document.getElementById("canvs3js").appendChild(renderer.domElement);
}

function initSpotLight() {
    spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, 45);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    spotLight.castShadow = true;

    scene.add(spotLight);
}

function initPlane() {
    var PlaneGeometry = new THREE.PlaneGeometry(60, 20);
    // var PlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
    var PlaneMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    shapePlane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
    shapePlane.rotation.x = -0.5 * Math.PI;
    shapePlane.position.set(15, 0, 0);
    shapePlane.receiveShadow = true;

    scene.add(shapePlane);
}

function initSphere() {
    var SphereGeometry = new THREE.SphereGeometry(5, 70, 70);
    // var SphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
    var SphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });

    shapeSphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
    // shapeSphere.rotation.x = -0.5 * Math.PI;
    shapeSphere.position.set(0, 0, 0);
    shapeSphere.castShadow = true;

    scene.add(shapeSphere);
}

var mf = new Array();

function initCube() {
    var geometry = new THREE.BoxGeometry(cubeParm.width, cubeParm.length, cubeParm.height);
    // var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    for (let i = 0; i < geometry.faces.length; i++) {
        let hex;
        if (i < 2) {
            hex = boxColor.face0;
        } else if (i < 4) {
            hex = boxColor.face1;
        } else if (i < 6) {
            hex = boxColor.face2;
        } else if (i < 8) {
            hex = boxColor.face3;
        } else if (i < 10) {
            hex = boxColor.face4;
        } else if (i < 12) {
            hex = boxColor.face5;
        }
        geometry.faces[i].color.setHex(hex);
    }
    var material = new THREE.MeshLambertMaterial({
        // color: 0xffffff,
        vertexColors: THREE.FaceColors
    });

    shapeCube = new THREE.Mesh(geometry, material);
    mf.push(shapeCube);

    mf[mf.length - 1].position.set(cubeParm.oriPosX, cubeParm.oriPosY, cubeParm.oriPosZ);
    mf[mf.length - 1].castShadow = true;

    scene.add(shapeCube);

}

function initLine() {
    shapeLine = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
    var color1 = new THREE.Color(0xffffff),
        color2 = new THREE.Color(0xFFff00);

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3(5, -1, 0);
    var p2 = new THREE.Vector3(-5, -1, 0);
    // var p3 = new THREE.Vector3(-2, -2, -2);

    shapeLine.vertices.push(p1);
    shapeLine.vertices.push(p2);
    // shapeLine.vertices.push(p3);
    shapeLine.colors.push(color1, color2);

    line = new THREE.Line(shapeLine, material, THREE.LineSegments);
    scene.add(line);
}

function paramsChange() {
    cnt++
    if (cnt % 200 == 0) {

        offsetParm.rotation_x = -offsetParm.rotation_x;
    }
}

// function rotation() {
//     shapeCube.rotation.x += offsetParm.rotation_x;
//     shapeCube.rotation.y += offsetParm.rotation_y;
//     shapeCube.rotation.z += offsetParm.rotation_z;
// }


var controls = new function() {
    this.rotation = function rotation() {
        // shapeCube.rotation.x += offsetParm.rotation_x;
        for (let index = 0; index < mf.length; index++) {
            mf[index].rotation.z += offsetParm.rotation_z;
        }
    }
};

function initGui() {
    gui = new dat.GUI();

    gui.add(cubeSize, "width", 0.001, 10);
    gui.add(cubeSize, "length", 0.001, 10);
    gui.add(cubeSize, "height", 0.001, 10);

    gui.add(cubeOffset, "offsetX", 0.001, 10);
    gui.add(cubeOffset, "offsetY", 0.001, 10);
    gui.add(cubeOffset, "offsetZ", 0.001, 10);

    gui.add(controls, 'rotation');
}

function render() {
    requestAnimationFrame(render);

    paramsChange();
    // rotation();
    // move();
    // geometry.setSize(cubeSize.width, cubeSize.length, cubeSize.height);

    renderer.render(scene, camera);
}

function initAll() {
    initScene();
    initCamera();
    initRenderer();

    initSpotLight();

    var cnt = 0;
    for (let x = 0; x < 1; x++) {
        for (let y = 0; y < 2; y++) {
            for (let z = 0; z < 3; z++) {
                initCube();
                mf[cnt].position.x = cubeParm.oriPosX - 5.1 * x;
                mf[cnt].position.y = cubeParm.oriPosY + 5.1 * y;
                mf[cnt].position.z = cubeParm.oriPosZ + 5.1 * z;

                cnt++;
            }
        }
    }

    var group = new THREE.Object3D();
    group.add(mf[0]);
    group.add(mf[1]);
    group.add(mf[2]);
    scene.add(group);

    var group1 = new THREE.Object3D();
    group1.add(mf[3]);
    group1.add(mf[4]);
    group1.add(mf[5]);
    scene.add(group1);

    console.log(mf.length);

    // initCube();

    initLine(); //线条
    // initPlane();
    // initSphere();

    render();
}

var Matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

console.log("before:", Matrix);

function rotateMatrix(matrix) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            let tmp1 = matrix[i][j];
            let tmp2 = matrix[3 - j][i];

            matrix[i][j] = tmp2;
            matrix[3 - j][i] = tmp1;
        }
    }
}

var testA = 3;
var testB = 4;

// function clockiseRotate(matrix) {
//     function swap(a, Math.sqrt(matrix.length)) {
//         a = a + b;
//         b = a - b;
//         a = a - b;
//     }

//     for (let i = 0; i < 4; ++i) {
//         {
//             for (let j = 0; j < 4; ++j)
//                 swap(a[i][j], a[4 - 1 - j][4 - 1 - i]);
//         }
//     }

//     for (let i = 0; i < 4 / 2; ++i) {
//         for (let j = 0; j < 4; ++j) {
//             swap(a[i][j], a[4 - 1 - i][j]);

//         }
//     }
// }

function antiClockiseRotate(params) {

}

rotateMatrix(Matrix);
console.log("after", Matrix);