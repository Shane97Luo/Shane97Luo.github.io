
#  一个简单的例子说明

```javsscript

//三大构建
var scene; //场景
var camera; //相机
var renderer; //渲染器

var geometry;
var material;
var cube;

var offsetRo = 0.01;
var offsetPos = 0.01;
var cnt = 0;

function initScene() {
    scene = new THREE.Scene();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initGeometry() {
    geometry = new THREE.CubeGeometry(1, 3, 1);
}

function initMaterial() {
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
}

function initCube() {
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // scene.add(cube1);
}

// var cube1 = new THREE.Mesh(geometry1, material1)

function paramsChange() {
    cnt++
    if (cnt % 200 == 0) {
        offsetPos = -offsetPos;
        // offsetRo = -offsetRo;
    }

}

function rotation() {
    cube.rotation.x += offsetRo;
    cube.rotation.y += offsetRo;
    cube.rotation.z += offsetRo;
}

function move() {
    cube.position.x += offsetPos;
    cube.position.y += offsetPos;
}

function render() {
    requestAnimationFrame(render);

    paramsChange();

    rotation();
    move();

    renderer.render(scene, camera);
}

function initAll() {
    initScene();
    initCamera();
    initRenderer();

    initGeometry();
    initMaterial();
    initCube();

    render();
}

```