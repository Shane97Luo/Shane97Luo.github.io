/******************************************************************
 * Author:              Shane Luo
 * Date:                2020 6th June
 * Email:               shaneluo97@foxmail.com
 ******************************************************************/

//![1]
var width; //页面宽度
var height; //页面高度
var origPoint = new THREE.Vector3(0, 0, 0); //原点
var raycaster = new THREE.Raycaster(); //光线碰撞检测器
var mouse = new THREE.Vector2(); //存储鼠标坐标或者触摸坐标
var isRotating = false; //魔方是否正在转动
var intersect; //碰撞光线穿过的元素
var normalize; //触发平面法向量
var startPoint; //触发点
var movePoint;
var initStatus = []; //魔方初始状态
//![1]

//![2]魔方转动的六个方向
var xLine = new THREE.Vector3(1, 0, 0); //X轴正方向
var xLineAd = new THREE.Vector3(-1, 0, 0); //X轴负方向
var yLine = new THREE.Vector3(0, 1, 0); //Y轴正方向
var yLineAd = new THREE.Vector3(0, -1, 0); //Y轴负方向
var zLine = new THREE.Vector3(0, 0, 1); //Z轴正方向
var zLineAd = new THREE.Vector3(0, 0, -1); //Z轴负方向

// var rotaDirection = {
//     xposAxis = new THREE.Vector3(1, 0, 0), //X轴正方向
//     xnegAxi = new THREE.Vector3(-1, 0, 0), //X轴负方向
//     yposAxis = new THREE.Vector3(0, 1, 0), //Y轴正方向
//     ynegAxi = new THREE.Vector3(0, -1, 0), //Y轴负方向
//     zposAxis = new THREE.Vector3(0, 0, 1), //Z轴正方向
//     znegAxi = new THREE.Vector3(0, 0, -1) //Z轴负方向
// };
//![2]

window.requestAnimFrame = (function() { //如果有变化则可能还需要requestAnimationFrame刷新
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.webkitRequestAnimationFrame;
})();

//![a] 渲染器
var renderer;
//根据页面宽度和高度创建渲染器，并添加容器中
function initThree() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas'),
        antialias: true,
        alpha: true,
    });
    renderer.setSize(width - 10, height - 10);
    renderer.setClearColor(0x336699, 2.0);

    //document.getElementById('canvas-frame').appendChild(renderer.domElement);

}
//![a]


//![b]创建相机，并设置正方向和中心点
var camera;
var controller; //视角控制器
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(500, 500, 500);
    camera.up.set(0, 1, 0); //正方向
    camera.lookAt(origPoint);
}
//![b]

//![c]
//创建场景，后续元素需要加入到场景中才会显示出来
var scene;

function initScene() {
    scene = new THREE.Scene();
    // 坐标系
    // var axes = new THREE.AxesHelper(200);
    // axes.position.set(0, 0, 0);
    // scene.add(axes);

}
//![c]

//![d]创建光线
var light;

function initLight() {
    light = new THREE.AmbientLight(0xfefefe);
    scene.add(light);
}
//![d]

//![g]  窗体改变监听器
function onResize(params) {
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectMatrix;
    //renderer.setSize(window.innerWidth, window.innerHeight);
    //threeStart();
}

window.addEventListener('resize', onResize, false);

//![g]

var cubeParams = { //魔方参数
    x: 0,
    y: 0,
    z: 0,
    num: 4,
    len: 50,
    colors: ['rgba(255,193,37,1)', 'rgba(0,191,255,1)',
        'rgba(50,205,50,1)', 'rgba(178,34,34,1)',
        'rgba(255,255,0,1)', 'rgba(255,255,255,1)'
    ]
};

/**
 * 简易魔方
 * x、y、z 魔方中心点坐标
 * num 魔方阶数
 * len 小方块宽高
 * colors 魔方六面体颜色
 */
function SimpleCube(x, y, z, num, len, colors) {
    //魔方左上角坐标
    var leftUpX = x - num / 2 * len;
    var leftUpY = y + num / 2 * len;
    var leftUpZ = z + num / 2 * len;

    //根据颜色生成材质
    var materialArr = [];
    for (var i = 0; i < colors.length; i++) {
        var texture = new THREE.Texture(faces(colors[i]));
        texture.needsUpdate = true;
        var material = new THREE.MeshLambertMaterial({ map: texture });
        materialArr.push(material);
    }

    var cubes = [];
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < num * num; j++) {
            var cubegeo = new THREE.BoxGeometry(len, len, len);
            var cube = new THREE.Mesh(cubegeo, materialArr);

            //依次计算各个小方块中心点坐标
            cube.position.x = (leftUpX + len / 2) + (j % num) * len;
            cube.position.y = (leftUpY - len / 2) - parseInt(j / num) * len;
            cube.position.z = (leftUpZ - len / 2) - i * len;
            cubes.push(cube)
        }
    }
    return cubes;
}

//生成canvas素材
function faces(rgbaColor) {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var context = canvas.getContext('2d');
    if (context) {
        //画一个宽高都是256的黑色正方形
        context.fillStyle = 'rgba(0,0,0,1)';
        context.fillRect(0, 0, 256, 256);
        //在内部用某颜色的16px宽的线再画一个宽高为224的圆角正方形并用改颜色填充
        context.rect(16, 16, 224, 224);
        context.lineJoin = 'round';
        context.lineWidth = 16;
        context.fillStyle = rgbaColor;
        context.strokeStyle = rgbaColor;
        context.stroke();
        context.fill();
    } else {
        alert('您的浏览器不支持Canvas无法预览.\n');
    }
    return canvas;
}


//创建展示场景所需的各种元素
var cubes

function initObject() {
    //生成魔方小正方体
    cubes = SimpleCube(cubeParams.x, cubeParams.y, cubeParams.z, cubeParams.num, cubeParams.len, cubeParams.colors);
    for (var i = 0; i < cubes.length; i++) {
        var item = cubes[i];
        /**
         * 由于筛选运动元素时是根据物体的id规律来的，但是滚动之后位置发生了变化；
         * 再根据初始规律筛选会出问题，而且id是只读变量；
         * 所以这里给每个物体设置一个额外变量cubeIndex，每次滚动之后更新根据初始状态更新该cubeIndex；
         * 让该变量一直保持初始规律即可。
         */
        initStatus.push({
            x: item.position.x,
            y: item.position.y,
            z: item.position.z,
            cubeIndex: item.id
        });
        item.cubeIndex = item.id;
        scene.add(cubes[i]); //并依次加入到场景中
    }

    console.log("cube size", cubes.length);
    console.log("cubeparam num", cubeParams.num);

    //透明正方体
    var cubegeo = new THREE.BoxGeometry(150, 150, 150);
    var hex = 0x000000;
    for (var i = 0; i < cubegeo.faces.length; i += 2) {
        cubegeo.faces[i].color.setHex(hex);
        cubegeo.faces[i + 1].color.setHex(hex);
    }
    var cubemat = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, opacity: 0, transparent: true });
    var cube = new THREE.Mesh(cubegeo, cubemat);
    cube.cubeType = 'coverCube';
    scene.add(cube);
}


function initPlane() {
    var PlaneGeometry = new THREE.PlaneGeometry(2000, 2000);
    var PlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
    // var PlaneMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    shapePlane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
    shapePlane.rotation.x = -0.5 * Math.PI;
    shapePlane.position.set(0, 0, 0);
    shapePlane.receiveShadow = true;

    shapePlane1 = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
    shapePlane1.rotation.x = 0.5 * Math.PI;
    shapePlane1.position.set(0, 0, 0);
    shapePlane1.receiveShadow = true;

    // scene.add(shapePlane);
    // scene.add(shapePlane1);

}

for (let index = 0; index < 0; index++) {
    console.log("ew");
}


var tetrParm = {
    pos: { x: 0, y: 120, z: 0 },
    length: 50
}

var pyramid; //金字塔魔方
// var regTetrahedron = []; //四棱锥

// 初始化三棱锥
function initTetrahedrons(topPos, length, layerNum) {

    // initRegTetr(topPos, length);

    var pos = new Array();
    var cnt = 0;

    var test = {
        x: topPos.x,
        y: topPos.y + 90,
        z: topPos.z
    }
    initRegTetr(test, length);
    // scene.children[1].rotation.x += 30;
    // console.log("child", scene.children.length);

    initRegTetr(topPos, length);
    for (let i = 0; i <= layerNum - 1; i++) {
        for (let j = 0; j < i; j++) {
            //左下角 ==>右下角
            pos[0] = {
                x: topPos.x - length / 2 * i + length * j,
                y: topPos.y - (Math.sqrt(6) / 3) * length * i,
                z: topPos.z + (Math.sqrt(3) / 6) * length * i
            };
            //右下角 ==> 后角
            pos[1] = {
                x: topPos.x + length / 2 * i - (length / 2) * j,
                y: topPos.y - (Math.sqrt(6) / 3) * length * i,
                z: topPos.z + (Math.sqrt(3) / 6) * length * i - (Math.sqrt(3) / 2) * length * j
            };
            //后角 ==>左下角
            pos[2] = {
                x: topPos.x - (length / 2) * j,
                y: topPos.y - (Math.sqrt(6) / 3) * length * i,
                z: topPos.z - (Math.sqrt(3) / 3) * length * i + (Math.sqrt(3) / 2) * length * j
            };

            for (let index = 0; index < pos.length; index++) {
                initRegTetr(pos[index], length);
                cnt++;
            }


        }
    }
    console.log("cnt:", cnt);
}

/* 生成单个三棱锥
 * pos: 三棱锥顶点位置{x,y,z}
 * length: 边长
 * type: 0-mian
 */
function initRegTetr(pos, length, type) {

    var materialTetrahedron = new THREE.MeshLambertMaterial({
        color: 0xffff00,
        // wireframe: true
    });

    var vertices = [
        new THREE.Vector3(pos.x,
            pos.y,
            pos.z),
        new THREE.Vector3(pos.x - length / 2,
            pos.y - (Math.sqrt(6) / 3) * length,
            pos.z + (Math.sqrt(3) / 6) * length),
        new THREE.Vector3(pos.x + length / 2,
            pos.y - (Math.sqrt(6) / 3) * length,
            pos.z + (Math.sqrt(3) / 6) * length),
        new THREE.Vector3(pos.x,
            pos.y - (Math.sqrt(6) / 3) * length,
            pos.z - (Math.sqrt(3) / 3) * length)
    ];

    var faces = [
        new THREE.Face3(0, 2, 1), //有效
        // new THREE.Face3(1, 0, 2), //有效
        // new THREE.Face3(1, 2, 1),
        // new THREE.Face3(2, 1, 0), //有效
        // new THREE.Face3(2, 0, 1),
        // new THREE.Face3(0, 1, 2),


        new THREE.Face3(0, 1, 3),

        // new THREE.Face3(1, 2, 3),//有效
        // new THREE.Face3(1, 3, 2),
        // new THREE.Face3(3, 2, 1),
        // new THREE.Face3(3, 1, 2),//有效
        new THREE.Face3(2, 3, 1), //有效
        // new THREE.Face3(2, 1, 3),

        // new THREE.Face3(0, 2, 3),
        // new THREE.Face3(0, 3, 2), //有效
        // new THREE.Face3(2, 0, 3),//有效
        // new THREE.Face3(2, 3, 0),
        new THREE.Face3(3, 2, 0), //有效
        // new THREE.Face3(3, 0, 2),

    ]

    var geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();

    tetrahedron = new THREE.Mesh(geom, materialTetrahedron);
    tetrahedron.position.set(0, 0, 0);
    tetrahedron.rotation.x += 0;
    scene.add(tetrahedron);
}

var controls = new function() {
    this.rotAnglex = 0;
    this.rotAngley = 0;
    this.rotAnglez = 0;
}

var initGui = function() {
    // var controls = new controls();
    var gui = new dat.GUI();
    gui.add(controls, 'rotAnglex', -180, 180);
    gui.add(controls, 'rotAngley', -180, 180);
    gui.add(controls, 'rotAnglez', -180, 180);
}


//渲染
function render() {
    renderer.clear();
    renderer.render(scene, camera);
    window.requestAnimFrame(render);

    numChange();
}

//开始
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();

    initPlane();
    initObject();
    // initTetrahedrons(tetrParm.pos, tetrParm.length, 4);

    render();
    //监听鼠标事件
    renderer.domElement.addEventListener('mousedown', startCube, false);
    renderer.domElement.addEventListener('mousemove', moveCube, false);
    renderer.domElement.addEventListener('mouseup', stopCube, false);
    //监听触摸事件
    renderer.domElement.addEventListener('touchstart', startCube, false);
    renderer.domElement.addEventListener('touchmove', moveCube, false);
    renderer.domElement.addEventListener('touchend', stopCube, false);
    //视角控制
    controller = new THREE.OrbitControls(camera, renderer.domElement);
    controller.target = new THREE.Vector3(0, 0, 0); //设置控制点
}

//魔方操作结束
function stopCube() {
    intersect = null;
    startPoint = null
}

var lastValue = cubeParams.num;

function numChange() {
    //获取下拉框值
    var obj = document.getElementById('selNum');
    var index = obj.selectedIndex; // 选中索引
    var text = obj.options[index].text; // 选中文本
    var value = obj.options[index].value; // 选中值

    if (value != lastValue) {
        console.log("changed", lastValue);

        cubeParams.num = value;
        lastValue = cubeParams.num;
        console.log("changed after", lastValue);

        initStatus.splice(0, initStatus.length); //清空元素
        console.log("initStatus.length", initStatus.length);

        threeStart();
    }

}

//绕着世界坐标系的某个轴旋转
function rotateAroundWorldY(obj, rad) {
    var x0 = obj.position.x;
    var z0 = obj.position.z;
    /**
     * 因为物体本身的坐标系是随着物体的变化而变化的，
     * 所以如果使用rotateZ、rotateY、rotateX等方法，
     * 多次调用后就会出问题，先改为Quaternion实现。
     */
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rad);
    obj.quaternion.premultiply(q);
    //obj.rotateY(rad);
    obj.position.x = Math.cos(rad) * x0 + Math.sin(rad) * z0;
    obj.position.z = Math.cos(rad) * z0 - Math.sin(rad) * x0;
}

function rotateAroundWorldZ(obj, rad) {
    var x0 = obj.position.x;
    var y0 = obj.position.y;
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rad);
    obj.quaternion.premultiply(q);
    //obj.rotateZ(rad);
    obj.position.x = Math.cos(rad) * x0 - Math.sin(rad) * y0;
    obj.position.y = Math.cos(rad) * y0 + Math.sin(rad) * x0;
}

function rotateAroundWorldX(obj, rad) {
    var y0 = obj.position.y;
    var z0 = obj.position.z;
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rad);
    obj.quaternion.premultiply(q);
    //obj.rotateX(rad);
    obj.position.y = Math.cos(rad) * y0 - Math.sin(rad) * z0;
    obj.position.z = Math.cos(rad) * z0 + Math.sin(rad) * y0;
}

//滑动操作魔方
function moveCube(event) {
    getIntersects(event);
    if (intersect) {
        if (!isRotating && startPoint) { //魔方没有进行转动且满足进行转动的条件
            movePoint = intersect.point;
            if (!movePoint.equals(startPoint)) { //和起始点不一样则意味着可以得到转动向量了
                isRotating = true; //转动标识置为true
                var sub = movePoint.sub(startPoint); //计算转动向量
                var direction = getDirection(sub); //获得方向
                var elements = getBoxs(intersect, direction);
                console.log("element", elements);
                var startTime = new Date().getTime();
                window.requestAnimFrame(function(timestamp) {
                    rotateAnimation(elements, direction, timestamp, 0);
                });
            }
        }
    }
    event.preventDefault();
}

/**
 * 旋转动画
 */
function rotateAnimation(elements, direction, currentstamp, startstamp, laststamp) {
    var totalTime = 500; //转动的总运动时间
    // console.log("elements.length", elements.length);
    if (startstamp === 0) {
        startstamp = currentstamp;
        laststamp = currentstamp;
    }
    if (currentstamp - startstamp >= totalTime) {
        currentstamp = startstamp + totalTime;
        isRotating = false;
        startPoint = null;
        updateCubeIndex(elements);
    }
    switch (direction) {
        //绕z轴顺时针
        case 0.1:
        case 1.2:
        case 2.4:
        case 3.3:
            for (var i = 0; i < elements.length; i++) {
                rotateAroundWorldZ(elements[i], -90 * Math.PI / 180 * (currentstamp - laststamp) / totalTime);
            }
            break;
            //绕z轴逆时针
        case 0.2:
        case 1.1:
        case 2.3:
        case 3.4:
            for (var i = 0; i < elements.length; i++) {
                rotateAroundWorldZ(elements[i], 90 * Math.PI / 180 * (currentstamp - laststamp) / totalTime);
            }
            break;
            //绕y轴顺时针
        case 0.4:
        case 1.3:
        case 4.3:
        case 5.4:
            for (var i = 0; i < elements.length; i++) {
                rotateAroundWorldY(elements[i], -90 * Math.PI / 180 * (currentstamp - laststamp) / totalTime);
            }
            break;
            //绕y轴逆时针
        case 1.4:
        case 0.3:
        case 4.4:
        case 5.3:
            for (var i = 0; i < elements.length; i++) {
                rotateAroundWorldY(elements[i], 90 * Math.PI / 180 * (currentstamp - laststamp) / totalTime);
            }
            break;
            //绕x轴顺时针
        case 2.2:
        case 3.1:
        case 4.1:
        case 5.2:
            for (var i = 0; i < elements.length; i++) {
                rotateAroundWorldX(elements[i], 90 * Math.PI / 180 * (currentstamp - laststamp) / totalTime);
            }
            break;
            //绕x轴逆时针
        case 2.1:
        case 3.2:
        case 4.2:
        case 5.1:
            for (var i = 0; i < elements.length; i++) {
                rotateAroundWorldX(elements[i], -90 * Math.PI / 180 * (currentstamp - laststamp) / totalTime);
            }
            break;
        default:
            break;
    }
    if (currentstamp - startstamp < totalTime) {
        window.requestAnimFrame(function(timestamp) {
            rotateAnimation(elements, direction, timestamp, startstamp, currentstamp);
        });
    }
}

//更新位置索引
function updateCubeIndex(elements) {
    for (var i = 0; i < elements.length; i++) {
        var temp1 = elements[i];
        for (var j = 0; j < initStatus.length; j++) {
            var temp2 = initStatus[j];
            if (Math.abs(temp1.position.x - temp2.x) <= cubeParams.len / 2 &&
                Math.abs(temp1.position.y - temp2.y) <= cubeParams.len / 2 &&
                Math.abs(temp1.position.z - temp2.z) <= cubeParams.len / 2) {
                temp1.cubeIndex = temp2.cubeIndex;
                break;
            }
        }
    }
}

//根据方向获得运动元素
function getBoxs(target, direction) {
    var targetId = target.object.cubeIndex;
    var ids = [];
    for (var i = 0; i < cubes.length; i++) {
        ids.push(cubes[i].cubeIndex);
    }
    var minId = min(ids);
    targetId = targetId - minId;
    var numI = parseInt(targetId / (cubeParams.num * cubeParams.num));
    var numJ = targetId % (cubeParams.num * cubeParams.num);
    var boxs = [];
    //根据绘制时的规律判断 no = i*cubeParams.num^2+j
    switch (direction) {
        //绕z轴
        case 0.1:
        case 0.2:
        case 1.1:
        case 1.2:
        case 2.3:
        case 2.4:
        case 3.3:
        case 3.4:
            for (var i = 0; i < cubes.length; i++) {
                var tempId = cubes[i].cubeIndex - minId;
                if (numI === parseInt(tempId / (cubeParams.num * cubeParams.num))) {
                    boxs.push(cubes[i]);
                }
            }
            break;
            //绕y轴
        case 0.3:
        case 0.4:
        case 1.3:
        case 1.4:
        case 4.3:
        case 4.4:
        case 5.3:
        case 5.4:
            for (var i = 0; i < cubes.length; i++) {
                var tempId = cubes[i].cubeIndex - minId;
                if (parseInt(numJ / cubeParams.num) === (parseInt(tempId % (cubeParams.num * cubeParams.num) / cubeParams.num))) {
                    boxs.push(cubes[i]);
                }
            }
            break;
            //绕x轴
        case 2.1:
        case 2.2:
        case 3.1:
        case 3.2:
        case 4.1:
        case 4.2:
        case 5.1:
        case 5.2:
            for (var i = 0; i < cubes.length; i++) {
                var tempId = cubes[i].cubeIndex - minId;
                if (tempId % (cubeParams.num * cubeParams.num) % cubeParams.num === numJ % cubeParams.num) {
                    boxs.push(cubes[i]);
                }
            }
            break;
        default:
            break;
    }
    return boxs;
}

//获得旋转方向
function getDirection(vector3) {
    var direction;
    //判断差向量和x、y、z轴的夹角
    var xAngle = vector3.angleTo(xLine);
    var xAngleAd = vector3.angleTo(xLineAd);
    var yAngle = vector3.angleTo(yLine);
    var yAngleAd = vector3.angleTo(yLineAd);
    var zAngle = vector3.angleTo(zLine);
    var zAngleAd = vector3.angleTo(zLineAd);
    var minAngle = min([xAngle, xAngleAd, yAngle, yAngleAd, zAngle, zAngleAd]); //最小夹角

    switch (minAngle) {
        case xAngle:
            direction = 0; //向x轴正方向旋转90度（还要区分是绕z轴还是绕y轴）
            if (normalize.equals(yLine)) {
                direction = direction + 0.1; //绕z轴顺时针
            } else if (normalize.equals(yLineAd)) {
                direction = direction + 0.2; //绕z轴逆时针
            } else if (normalize.equals(zLine)) {
                direction = direction + 0.3; //绕y轴逆时针
            } else {
                direction = direction + 0.4; //绕y轴顺时针
            }
            break;
        case xAngleAd:
            direction = 1; //向x轴反方向旋转90度
            if (normalize.equals(yLine)) {
                direction = direction + 0.1; //绕z轴逆时针
            } else if (normalize.equals(yLineAd)) {
                direction = direction + 0.2; //绕z轴顺时针
            } else if (normalize.equals(zLine)) {
                direction = direction + 0.3; //绕y轴顺时针
            } else {
                direction = direction + 0.4; //绕y轴逆时针
            }
            break;
        case yAngle:
            direction = 2; //向y轴正方向旋转90度
            if (normalize.equals(zLine)) {
                direction = direction + 0.1; //绕x轴逆时针
            } else if (normalize.equals(zLineAd)) {
                direction = direction + 0.2; //绕x轴顺时针
            } else if (normalize.equals(xLine)) {
                direction = direction + 0.3; //绕z轴逆时针
            } else {
                direction = direction + 0.4; //绕z轴顺时针
            }
            break;
        case yAngleAd:
            direction = 3; //向y轴反方向旋转90度
            if (normalize.equals(zLine)) {
                direction = direction + 0.1; //绕x轴顺时针
            } else if (normalize.equals(zLineAd)) {
                direction = direction + 0.2; //绕x轴逆时针
            } else if (normalize.equals(xLine)) {
                direction = direction + 0.3; //绕z轴顺时针
            } else {
                direction = direction + 0.4; //绕z轴逆时针
            }
            break;
        case zAngle:
            direction = 4; //向z轴正方向旋转90度
            if (normalize.equals(yLine)) {
                direction = direction + 0.1; //绕x轴顺时针
            } else if (normalize.equals(yLineAd)) {
                direction = direction + 0.2; //绕x轴逆时针
            } else if (normalize.equals(xLine)) {
                direction = direction + 0.3; //绕y轴顺时针
            } else {
                direction = direction + 0.4; //绕y轴逆时针
            }
            break;
        case zAngleAd:
            direction = 5; //向z轴反方向旋转90度
            if (normalize.equals(yLine)) {
                direction = direction + 0.1; //绕x轴逆时针
            } else if (normalize.equals(yLineAd)) {
                direction = direction + 0.2; //绕x轴顺时针
            } else if (normalize.equals(xLine)) {
                direction = direction + 0.3; //绕y轴逆时针
            } else {
                direction = direction + 0.4; //绕y轴顺时针
            }
            break;
        default:
            break;
    }
    return direction;
}

//获取数组中的最小值
function min(arr) {
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

//开始操作魔方
function startCube(event) {
    getIntersects(event);
    //魔方没有处于转动过程中且存在碰撞物体
    if (!isRotating && intersect) {
        startPoint = intersect.point; //开始转动，设置起始点
        controller.enabled = false; //当刚开始的接触点在魔方上时操作为转动魔方，屏蔽控制器转动
    } else {
        controller.enabled = true; //当刚开始的接触点没有在魔方上或者在魔方上但是魔方正在转动时操作转动控制器
    }
}

//获取操作焦点以及该焦点所在平面的法向量
function getIntersects(event) {
    //触摸事件和鼠标事件获得坐标的方式有点区别
    if (event.touches) {
        var touch = event.touches[0];
        mouse.x = (touch.clientX / width) * 2 - 1;
        mouse.y = -(touch.clientY / height) * 2 + 1;
    } else {
        mouse.x = (event.clientX / width) * 2 - 1;
        mouse.y = -(event.clientY / height) * 2 + 1;
    }
    raycaster.setFromCamera(mouse, camera);
    //Raycaster方式定位选取元素，可能会选取多个，以第一个为准
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length) {
        try {
            if (intersects[0].object.cubeType === 'coverCube') {
                intersect = intersects[1];
                normalize = intersects[0].face.normal;
            } else {
                intersect = intersects[0];
                normalize = intersects[1].face.normal;
            }
        } catch (err) {
            //nothing
        }
    }
}

//计时，积分模块
function startPoint() {
    var startPoint = new Data();
    this.h = today.getHours();
    this.m = today.getMinutes();
    this.s = today.getSeconds();
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h)
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timer').innerHTML = h + ":" + m + ":" + s;
    setInterval(function() {
        startTime()
    }, 1000)

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i
    }
}

//数据模块

// function tel(pos) {
//     console.log(pos.x, pos.y, pos.z);
// }
// var qqq = {
//     x: 2,
//     y: 1,
//     z: 3
// }

// tel(qqq);