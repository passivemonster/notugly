		var vertices;
		var geometry;
    var brain;
    var wireframe;
    var brain_mesh;
    	var brain_addPosition = [];
      var time ;
      // var controls ;
      var renderer ;
      var scene ;
      var camera ;

		function john() {
				var sp = false;
				var ua = window.navigator.userAgent;
				if (ua.indexOf('Android') > 0 || ua.indexOf('iPhone') > 0 || ua.indexOf('Windows Phone') > 0) {
					sp = true;
				}

				scene = new THREE.Scene();
				scene.background = new THREE.Color(0x000000);
				scene.fog = new THREE.Fog(0xEEEDF3, 0, 40);
				/*////////////////
					camera
				////////////////*/
				var width = window.innerWidth;
				var height = window.innerHeight;
				camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      				camera.position.z = 125;

				if(sp){
					camera.position.z = 18 ;

				}


				/*////////////////
					renderer
				////////////////*/
				renderer = new THREE.WebGLRenderer({
					alpha: true,
					antialias: true,
					canvas: document.getElementById("brain-canvas1")
				});
				renderer.setSize(width, height);
				renderer.shadowMap.enabled = true;
				/*////////////////
					Light - PointLight
				////////////////*/
				var light = new THREE.PointLight(0xffffff, 1, 40);
				light.castShadow = true;
				light.position.set(0, 20, 0);
				scene.add(light);
				/*////////////////
					Light - AmbientLight
				////////////////*/
				var amblight = new THREE.AmbientLight(0x404040);
				scene.add(amblight);
				/*////////////////
					Light - DirectionalLight
				////////////////*/
				var color = 0x777777;
				directionalLight = new THREE.DirectionalLight(color, 1);
				directionalLight.position.set(0, 20, 0).normalize();
				directionalLight.castShadow = true;
				scene.add(directionalLight);
				/*////////////////
					Brain
				////////////////*/



				loader = new THREE.BufferGeometryLoader();
				loader.load('js/brain.json', function(e) {

				brain = new THREE.Object3D();
				 brain.rotation.y = -2 ;
				var gui = new dat.GUI();
		 		 gui.add(brain.rotation, 'y', 0, 10).name('y-rotation').listen();

				/*////////////////
					Brain-Line
				////////////////*/
				var geo = new THREE.EdgesGeometry(e);
				var mat = new THREE.ShaderMaterial({
	  			uniforms: {
						opacity: {
						type: "f",
						value: 1
					  },
					  width: {
						type: "f",
						value: width
					  },
	  			  time: {
						type: "f",
						value: 0
		   		  }
				  },
					fragmentShader: document.getElementById("fs_wire").textContent
					});
					wireframe = new THREE.LineSegments(geo, mat);
					wireframe.renderOrder = 1;

					/*////////////////
						Brain-Point
					////////////////*/

					var PointMaterial = new THREE.PointsMaterial({
						transparent: true,
						opacity: 0.1,
						color: 0xffffff,
						size: 0.1
					});
					PointMaterial.blending = THREE.AdditiveBlending ;
					points = new THREE.Points(e, PointMaterial);

					/*////////////////
						Brain-Face
					////////////////*/

					brain_mesh = new THREE.Object3D();
					brain.add(brain_mesh);

					var max = 30;
					var min = -max;
					var scale = .99;
					var mat_ = new THREE.ShaderMaterial({
						uniforms: {
							opacity: {
								type: "f",
								value: 0.6
							},
							width: {
								type: "f",
								value: width
							},
							time: {
								type: "f",
								value: 0
							}
						},
						fragmentShader: document.getElementById("fs_wire").textContent
					});

					for (var i = 0; i < e.attributes.position.count /3; i++) {

						if(i%2==0){
						var texture = new THREE.TextureLoader().load('pics/api.png');

					}
					else{
							var texture = new THREE.TextureLoader().load('pics/apps.png');
					}
			      var pinkMat = new THREE.MeshBasicMaterial( {
			        map: texture,
			        side: THREE.BackSide
			      } );
						pinkMat.transparent = true ;
						pinkMat.blending = THREE.AdditiveBlending ;

			      //end material

						geometry = new THREE.BufferGeometry();

						vertices = new Float32Array([
							e.attributes.position.array[i * 9 + 0], e.attributes.position.array[i * 9 + 1], e.attributes.position.array[i * 9 + 2],
							e.attributes.position.array[i * 9 + 3], e.attributes.position.array[i * 9 + 4], e.attributes.position.array[i * 9 + 5],
							e.attributes.position.array[i * 9 + 6], e.attributes.position.array[i * 9 + 7], e.attributes.position.array[i * 9 + 8]
						]);
						uvs = new Float32Array([
							0.0 , 0.0,
							0.0 , 2.0,
							2.0 , 0.0
						]) ;

						geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
						geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

						var mesh = new THREE.Mesh(geometry, pinkMat);
						brain_addPosition[i] = {
							x: Math.floor(Math.random() * (max + 1 - min)) + min,
							y: Math.floor(Math.random() * (max + 1 - min)) + min,
							z: Math.floor(Math.random() * (max + 1 - min)) + min
						};


						mesh.scale.set(scale, scale, scale);


						mesh.index = i;

						mesh.isAnimation = false;
						mesh.time = 0;

						brain_mesh.add(mesh);

					}
					/*////////////////
						Brain-extra-burden
					////////////////*/

					for (var i = 0; i < e.attributes.position.count /3; i++) {

						var pinkMat1 = new THREE.MeshPhongMaterial({
							//blending:1,
							color: new THREE.Color("rgb(255,255,60)"),
							emissive: new THREE.Color("rgb(150,168,254)"),
							specular: new THREE.Color("rgb(255,255,0)"),
							shininess: 10,
							side: 1,
							flatShading: true,
							transparent: true,
							opacity: .7,

						});

						//end material

						geometry = new THREE.BufferGeometry();

						vertices = new Float32Array([
							e.attributes.position.array[i * 9 + 0], e.attributes.position.array[i * 9 + 1], e.attributes.position.array[i * 9 + 2],
							e.attributes.position.array[i * 9 + 3], e.attributes.position.array[i * 9 + 4], e.attributes.position.array[i * 9 + 5],
							e.attributes.position.array[i * 9 + 6], e.attributes.position.array[i * 9 + 7], e.attributes.position.array[i * 9 + 8]
						]);
						uvs = new Float32Array([
							0.0 , 0.0,
							0.0 , 2.0,
							2.0 , 0.0
						]) ;

						geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
						geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
						// console.log(geometry) ;
						var mesh1 = new THREE.Mesh(geometry, pinkMat1);
						brain_addPosition[i] = {
							x: Math.floor(Math.random() * (max + 1 - min)) + min,
							y: Math.floor(Math.random() * (max + 1 - min)) + min,
							z: Math.floor(Math.random() * (max + 1 - min)) + min
						};


						mesh.scale.set(scale, scale, scale);


						mesh.index = i;

						mesh.isAnimation = false;
						mesh.time = 0;

					}


					/*////////////////
						Brain-Setting
					////////////////*/

					scene.add(brain);

					brain.scale.set(0.022, 0.022, 0.022);

				});



  			/*////////////////
					render
				////////////////*/
				time = 0;


			if (!sp) {
				var story = $("#story1");
				var brain_ = $("#brain-canvas1").get()[0];
				$(".story1").on({
					mouseenter: function(e) {

					},
					mousemove: function(e) {
						var rect = brain_.getBoundingClientRect();
						var mouseX = e.clientX - rect.left;
						var mouseY = e.clientY - rect.top;
						var diff = story.width() * 0.3 - 600;
						mouseX = (e.clientX - 600 - diff) / 1200 * 2;
						var diff = (story.outerHeight() - 800) / 2;
						mouseY = -(mouseY / 800) * 2 + 1;
						var pos = new THREE.Vector3(mouseX, mouseY, 1);

						pos.unproject(camera);

						var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
						if (brain_mesh) {
							var objs = ray.intersectObjects(brain_mesh.children);
							console.log(objs[0]);
              objs[0].object.isAnimation = true;

						}
					},
					mouseleave: function(e) {

					}
				})
			}

       return scene;

		}

    function render() {

      if (brain) {

        var timeDiff = 0.03;

        for (var i = 0; i < brain_mesh.children.length; i++) {

          var f = (brain_mesh.children[i].time) * timeDiff * Math.PI;

          if (brain_mesh.children[i].isAnimation) {
            brain_mesh.children[i].time++;

            brain_mesh.children[i].position.set(
              (brain_addPosition[i].x + brain_addPosition[i].x * Math.sin(f)),
              (brain_addPosition[i].y + brain_addPosition[i].y * Math.sin(f)),
              (brain_addPosition[i].z + brain_addPosition[i].z * Math.sin(f))


            );
            // console.log(brain_mesh.children[i].position.y) ;


            // console.log(Math.sin(f));
            if( -1 >= Math.sin(f)){
            brain_mesh.children[i].time = 0;
            brain_mesh.children[i].isAnimation = false;
          }
        }

      }

    }
    if (wireframe) {
      wireframe.material.uniforms.time.value += 0.5;
    }
    time += 0.1;

    var winResize	= new THREEx.WindowResize(renderer, camera) ;
    renderer.render(scene, camera);

}

function animate() {
  requestAnimationFrame(animate);
	render();
  TWEEN.update();
}
john() ;
animate() ;

function tweeeen(i){
  setTimeout(function () {
   var coords = {
		  x:  brain_addPosition[i].x*10,
	    y:  brain_addPosition[i].y*10,
	    z:  brain_addPosition[i].z*10
};
var tween = new TWEEN.Tween(coords)
	.to({
		x: 0,
		y: 0,
		z: 0
	}, 2000)
	.onUpdate(function() {

		brain_mesh.children[i].position.set(coords.x ,coords.y , coords.z) ;
	})

	.easing(TWEEN.Easing.Back.InOut)

	.start();

		/* for rotation */

		var coords_rotate = {
        x:  -1,
				y:  0

		};
		var tween_rotate = new TWEEN.Tween(coords_rotate)
			.to({
        x:  0,
				y: -2

			}, 8000)
			.onUpdate(function() {

				brain.rotation.y = coords_rotate.y ;
				brain.rotation.x = coords_rotate.x ;

			})


		/* rotation */
		var coords1 = {
			x: 8,
			y: 8,
			z: 8
		};
		var tween1 = new TWEEN.Tween(coords1)
			.to({
				x: 6,
				y: 6,
				z: 6
			}, 10000)
			.easing(TWEEN.Easing.Back.InOut)
			.onUpdate(function() {

				brain_mesh.children[i].scale.set(coords1.x ,coords1.y , coords1.z) ;
			})

			.start();
}, 1000);

}
for(var i =0 ; i < 508 ; i++){
		tweeeen(i) ;

}
