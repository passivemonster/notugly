var stats;
var camera_c, scene_c, renderer_c;
var remain ;

var wed = 0 , about = 0 , ju = 0 , contact = 0 ;
var mouseX = 0, mouseY = 0;

var nbParticles = 10302;
var transform = nbParticles ;

var transIsActive = 0;

var canvas = document.getElementById("john");
var W = window.innerWidth ;
var H = window.innerHeight/2;

var halfW = W / 2;
var halfH = H / 2;

var particles = [];

var switchShape = 1;

// utils
var PI2 = Math.PI * 2;
var count = 0;
var CamX = 0;
var CamY = 0;
var CamZ = 800;

// big expfun

var getImageData = function(image) {

  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  return ctx.getImageData(0, 0, image.width, image.height);
}

var appsVertices = [];
var drawTheMap = function(imagedata) {
var h = imagedata.height ;
var w = imagedata.width ;
  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;

       appsVertices.push(vertex) ;
       wed++ ;
      }
    }
  }
}

var appsVertices1 = [];
var drawTheMap1 = function(imagedata1) {
var h = imagedata1.height ;
var w = imagedata1.width ;
  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata1.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;

       appsVertices1.push(vertex) ;

        about++ ;

      }
    }
  }
}

var appsVertices2 = [];
var drawTheMap2 = function(imagedata2) {
var h = imagedata2.height ;
var w = imagedata2.width ;

  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata2.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;

       appsVertices2.push(vertex) ;

       ju++ ;

      }
    }
  }
}

var appsVertices3 = [];
var drawTheMap3 = function(imagedata3) {
var h = imagedata3.height ;
var w = imagedata3.width ;
  for (var y = 0;y < h; y += 2) {

    for (var x = 0; x < w; x += 2) {

      if (imagedata3.data[(x * 4 + y * 4 * w) + 3] > 128) {

        var vertex = new THREE.Vector3();
        vertex.x = x - w / 2;
        vertex.y = -y + h / 2;
        vertex.z = 0;

       appsVertices3.push(vertex) ;

        contact++ ;
      }
    }
  }
}


// SPACE
var spaceVertices = []; // array of vertices
var amount = 16;
var separation = 10;
var offset = ( ( amount - 1 ) * separation ) / 2;

for ( var i = 0; i < nbParticles; i ++ ) {
  var vertex_c = new THREE.Vector3() ;
  vertex_c.x =Math.random() * window.innerWidth * 2 - window.innerWidth ;
  vertex_c.y = Math.random() * window.innerWidth * 2 - window.innerWidth ;
  vertex_c.z =Math.random() * window.innerWidth * 2 - window.innerWidth ;
  spaceVertices.push(vertex_c);
}

var actualVertices = spaceVertices; // first shape displayed

init();
animate_s();

function init() {



  // scene_c
  scene_c = new THREE.Scene();
	scene_c.background = new THREE.Color(0x000000);

  // camera_c
  camera_c = new THREE.PerspectiveCamera( 45, W / H, 1, 5000 );
  scene_c.add(camera_c);
  camera_c.position.set( CamX, CamY, CamZ );
  camera_c.lookAt(scene_c.position);

  var texture, imagedata;

texture = THREE.ImageUtils.loadTexture( "pics/handset.png", undefined, function ( event ) {

    imagedata = getImageData( texture.image );

} );
setTimeout(function () {
  console.log(imagedata);
  drawTheMap(imagedata)
}, 5000);

texture1 = THREE.ImageUtils.loadTexture( "pics/brain.png", undefined, function ( event ) {

    imagedata1 = getImageData( texture1.image );

} );
setTimeout(function () {

  drawTheMap1(imagedata1)
}, 5000);

texture2 = THREE.ImageUtils.loadTexture( "pics/people_crowd-512.png", undefined, function ( event ) {

    imagedata2 = getImageData( texture2.image );

} );
setTimeout(function () {

  drawTheMap2(imagedata2)
}, 5000);

texture3 = THREE.ImageUtils.loadTexture( "pics/untitled (1).png", undefined, function ( event ) {

    imagedata3 = getImageData( texture3.image );

} );
setTimeout(function () {

  drawTheMap3(imagedata3)
}, 5000);



  // scene_c element
  var program = function ( context ) {

    context.beginPath();
    context.arc( 0, 0, 0.5, 0, PI2, true );
    context.fill();

  }
  for ( var i = 0; i < nbParticles; i++ ) {

    var material = new THREE.SpriteCanvasMaterial({
      color: 0xB8D1C6,
      program: program
    });

    particle = particles[ i ] =new THREE.Sprite( material );
    particle.position.x = actualVertices[i].x;
    particle.position.y = actualVertices[i].y ;
    particle.position.z = actualVertices[i].z;
    particle.scale.x = particle.scale.y =  1;
    scene_c.add( particle );

  }

  // renderer_c (CANVAS)
  renderer_c = new THREE.CanvasRenderer({ alpha: true, canvas: canvas } );
  renderer_c.setSize( W , H );
  renderer_c.setClearColor( 0x001920, 0); // the default

}




// EVENTS


function forChange( to ){

var a = to + 1;
  switch(a){
    case 1:
      actualVertices = appsVertices;
      option = 1 ;
      break;
    case 2:
      actualVertices = appsVertices1;
      option = 2 ;
      break;
    case 3:
      actualVertices=appsVertices2;
      option = 3 ;
      break;
    case 4:
       actualVertices=appsVertices3;
       option = 4 ;
       break;


  }

  transIsActive = 0;
switch (option) {
  case 1:
    transform = wed  ;
    break;
  case 2:
    transform = about  ;
    break;
  case 3:
    transform = ju ;
    break;
  case 4:
    transform = contact ;
    break;
  default:

}


  for ( var i = 0; i < transform-1; i++ ) {

    particle = particles[ i ];

    new TWEEN.Tween( particle.position ).to( {
      x: actualVertices[i].x ,
      y: actualVertices[i].y ,
      z: actualVertices[i].z
    }, 5000 )

    .easing( TWEEN.Easing.Elastic.Out).start();
  }

   for ( remain = transform + 1 ; remain < nbParticles - 1; remain++ ) {

     particle = particles[ remain ];

     if(particle){
     new TWEEN.Tween( particle.position ).to( {
       x: -250 + Math.random() * 800 ,
       y: -250 + Math.random() * 800 ,
       z: -250 + Math.random() * 800
     }, 5000 )
     .easing( TWEEN.Easing.Elastic.Out).start();
     }

   }
}





function onDocumentMouseMove( event ) {

  event.preventDefault();
  mouseX = event.clientX - halfW;
  mouseY = event.clientY - halfH;

  var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.1 );

  vector.unproject(camera_c) ;
  var raycaster = new THREE.Raycaster( camera_c.position, vector.sub( camera_c.position ).normalize() );

  var intersects = raycaster.intersectObjects( scene_c.children );


}

function animate_s() {

  requestAnimationFrame( animate_s );


  render_s();

}

function render_s() {

  TWEEN.update();

  camera_c.position.x += ( mouseX - camera_c.position.x ) * .005;
  camera_c.position.y += ( - mouseY - camera_c.position.y ) * .005;
  camera_c.lookAt( scene_c.position );
  camera_c.lookAt( scene_c.position );

  for ( var i = 0; i < nbParticles; i++ ) {

    particle = particles[ i ];

    if(particle.material.opacity >= .2) particle.material.opacity -= .01;
    particle.scale.x = particle.scale.y = particle.scale.y = ( Math.sin( ( i+ count ) * 0.3 ) + 1 ) * 4 +( Math.sin( ( i + count ) * 0.5 ) + 1 ) ;

  }

  count += 0.1;
  renderer_c.render( scene_c, camera_c );


}
