var pd = 4;
var score = 0;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(); 

renderer.setSize(window.innerWidth, window.innerHeight-38);
document.body.appendChild(renderer.domElement);

var boxGeometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

var cube = new THREE.Mesh(boxGeometry, material);
var circle = new THREE.Mesh(new THREE.CircleGeometry(1, 2048), material);
//scene.add(cube);
scene.add(circle);
scene.updateMatrixWorld(true)
circle.position.x = 0;
circle.callback = function () {
    score +=1;
    console.log(score);
    document.getElementById('a').innerHTML = score;
}
camera.position.z = 20;
window.addEventListener( 'click', onMouseMove, false );

function onMouseMove(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {

        intersects[ i ].object.callback();

	}
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function moveCircle(circle) {
    var p = circle.position
    var td = [1, 2, 3, 4]
    var arr = [];
    if (p.x > 15) {
        arr.push(1);
    }
    if (p.x < -15) {
        arr.push(2);
    }
    if (p.y > 15) {
        arr.push(3);
    }
    if (p.y < -15) {
        arr.push(4);
    }
    arr.push(pd);
    let ad = td.filter(x => !arr.includes(x));
    direction = ad[Math.floor((Math.random() * ad.length))];
    val = [1,2,3,4,5];
    let bb = val[Math.floor((Math.random() * val.length))] * 1;
    //console.log(direction);
    switch (direction) {
        case 1: circle.translateX(bb); pd = 1; break;
        case 2: circle.translateX(-bb); pd = 2; break;
        case 3: circle.translateY(bb); pd = 3; break;
        case 4: circle.translateY(-bb); pd = 4; break;
    }
    return p;
}
function animate() {
    setTimeout(function () {
        requestAnimationFrame(animate);
        cube.rotation.x -= 0.01;
        cube.rotation.y -= 0.01;
        circle.postion = moveCircle(circle);
        //console.log(circle.position)
        renderer.render(scene, camera);
    }, 100);
}
function gameCtrl(){
    setTimeout(()=>{
        alert(`Time's up!. Your Score is ${score}`)
        window.location.href="./index.html"
    },15000)
}
animate();
gameCtrl();