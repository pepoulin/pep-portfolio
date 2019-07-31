function initVideoShader(opts) {
  /*
    opts.videoSrc
    opts.linkSelector
    opts.videoContainerSelector
    opts.effectsAutoOff (true/false)
    opts.randomEffects (true/false)
    opts.nonRandomParamValues (obj)
    opts.showHideOnMouseEnter (true/false)
    opts.showHideOnMouseClick (true/false)
  */

  //Bad TV Shader Demo
  //Using Three.js r.75
  //by Felix Turner / www.airtight.cc / @felixturner

  var VIDEO_SRC = opts.videoSrc;

  var camera, scene, renderer;
  var video, videoTexture,videoMaterial;
  var composer;
  var shaderTime = 0;
  var badTVParams, badTVPass;   
  var staticParams, staticPass;   
  var rgbParams, rgbPass; 
  var filmParams, filmPass; 
  var renderPass, copyPass;
  var pnoise, globalParams;
  var gVideoTextureLoadDone = false;
  var gVideoIsPlaying = false;

  var canAnimate = false;

  function startAnimate(st) {
    canAnimate = st;
    if (st) {
      animate();
      video.play();
    } else {
      video.pause();
    }
  }

  function show() {
    if(!gVideoIsPlaying) {
      gVideoIsPlaying = true;
      video.play();
    }

    if(opts.randomEffects) {
      randomizeParams();
    } else {
      setParams(opts.nonRandomParamValues);
    }
    badTVParams.show = rgbParams.show = true;
    onToggleShaders();
    startAnimate(true);

    if(opts.effectsAutoOff) {    
      setTimeout(function() {
        badTVParams.show = rgbParams.show = false;
        onToggleShaders();
      }, 250);
    }
  }

  function hide() {
    randomizeParams();
    badTVParams.show = rgbParams.show = true;
    onToggleShaders();
    setTimeout(function() {
      badTVParams.show = rgbParams.show = false;
      onToggleShaders();
      startAnimate(false);
      $(opts.videoContainerSelector).hide();
    }, 150);
  }

  function videoTextureOnLoad() {
    if(opts.showHideOnMouseEnter) {    
      $(opts.linkSelector).mouseenter(function() {
        show();
      }).mouseleave(function() {
        hide();
      });
    }

    if(opts.showHideOnMouseClick) {
      $(opts.linkSelector).click(function() {
        show();
      })
      $(opts.videoContainerSelector).click(function() {
        hide();
      })
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    preloadVideo();

    if(!gVideoTextureLoadDone) {
      gVideoTextureLoadDone = true;
      videoTextureOnLoad();
    }

  });

  function preloadVideo() {
    //Load Video
    video = document.createElement( 'video' );
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.addEventListener('loadeddata', function() {
      init();
      animate();
    });
    video.src = VIDEO_SRC;
    // video is played first time that show() is called
  }

  function init() {
    var cross='anonymous';
    THREE.ImageUtils.crossOrigin = cross;
    THREE.Loader.crossOrigin = cross;
    THREE.ObjectLoader.crossOrigin = cross;
    THREE.TextureLoader.crossOrigin = cross;

    // camera = new THREE.PerspectiveCamera(55, 1920 / 1080, 20, 3000);
    camera = new THREE.PerspectiveCamera(55, 16/9, 20, 3000);
    camera.position.z = 1000;
    scene = new THREE.Scene();

    //init video texture
    videoTexture = new THREE.Texture( video );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    videoMaterial = new THREE.MeshBasicMaterial( {
      map: videoTexture
    } );

    //Add video plane
    // var planeGeometry = new THREE.PlaneGeometry(1920, 1080, 1, 1);
    var planeGeometry = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerHeight, 1, 1);
    var plane = new THREE.Mesh( planeGeometry, videoMaterial );
    scene.add( plane );
    // plane.z = 0;
    // plane.scale.x = plane.scale.y = 1.45;


    var dist = camera.position.z - plane.position.z;
    var height = window.innerHeight;
    camera.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI);
    camera.updateProjectionMatrix();


    //init renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    $(opts.videoContainerSelector).empty();
    $(opts.videoContainerSelector).append( renderer.domElement );

    //POST PROCESSING
    //Create Shader Passes
    renderPass = new THREE.RenderPass( scene, camera );
    badTVPass = new THREE.ShaderPass( THREE.BadTVShader );
    rgbPass = new THREE.ShaderPass( THREE.RGBShiftShader );
    filmPass = new THREE.ShaderPass( THREE.FilmShader );
    staticPass = new THREE.ShaderPass( THREE.StaticShader );
    copyPass = new THREE.ShaderPass( THREE.CopyShader );

    //set shader uniforms
    filmPass.uniforms.grayscale.value = 0;

    //Init DAT GUI control panel
    badTVParams = {
      mute:true,
      show: true,
      distortion: 3.0,
      distortion2: 1.0,
      speed: 0.3,
      rollSpeed: 0.1
    };

    staticParams = {
      show: false,
      amount:0.5,
      size:4.0
    };

    rgbParams = {
      show: true,
      amount: 0.005,
      angle: 0.0,
    };

    filmParams = {
      show: false,
      count: 800,
      sIntensity: 0.9,
      nIntensity: 0.4
    };

    onToggleShaders();
    onToggleMute();
    onParamsChange();

    window.addEventListener('resize', onResize, false);
    // renderer.domElement.addEventListener('click', randomizeParams, false);
    onResize();
    randomizeParams();
  }

  function onParamsChange() {
    //copy gui params into shader uniforms
    badTVPass.uniforms[ 'distortion' ].value = badTVParams.distortion;
    badTVPass.uniforms[ 'distortion2' ].value = badTVParams.distortion2;
    badTVPass.uniforms[ 'speed' ].value = badTVParams.speed;
    badTVPass.uniforms[ 'rollSpeed' ].value = badTVParams.rollSpeed;

    staticPass.uniforms[ 'amount' ].value = staticParams.amount;
    staticPass.uniforms[ 'size' ].value = staticParams.size;

    rgbPass.uniforms[ 'angle' ].value = rgbParams.angle*Math.PI;
    rgbPass.uniforms[ 'amount' ].value = rgbParams.amount;

    filmPass.uniforms[ 'sCount' ].value = filmParams.count;
    filmPass.uniforms[ 'sIntensity' ].value = filmParams.sIntensity;
    filmPass.uniforms[ 'nIntensity' ].value = filmParams.nIntensity;
  }

  function setParams(params) {    
    badTVParams.distortion = params.badTVParams.distortion;
    badTVParams.distortion2 = params.badTVParams.distortion2;
    badTVParams.speed = params.badTVParams.speed;
    badTVParams.rollSpeed = params.badTVParams.rollSpeed;
    rgbParams.angle = params.rgbParams.angle;
    rgbParams.amount = params.rgbParams.amount;

    onParamsChange();
  }

  function randomizeParams() {
    badTVParams.distortion = Math.random()*13+0.1;
    badTVParams.distortion2 = Math.random()*10+0.1;
    badTVParams.speed = Math.random()*0.7;
    badTVParams.rollSpeed = Math.random()*0.6;
    rgbParams.angle = Math.random()*2;
    rgbParams.amount = Math.random()*0.03;
    staticParams.amount = Math.random()*0.2;

    onParamsChange();
  }

  function onToggleMute(){
    video.volume  = badTVParams.mute ? 0 : 1;
  }

  function onToggleShaders(){
    //Add Shader Passes to Composer
    //order is important 
    composer = new THREE.EffectComposer( renderer);
    composer.addPass( renderPass );
    
    if (filmParams.show){
      composer.addPass( filmPass );
    }

    if (badTVParams.show){
      composer.addPass( badTVPass );
    }

    if (rgbParams.show){
      composer.addPass( rgbPass );
    }

    if (staticParams.show){
      composer.addPass( staticPass );
    }

    composer.addPass( copyPass );
    copyPass.renderToScreen = true;
  }

  function animate() {
    if (canAnimate) {
      // console.log(VIDEO_SRC, 'animating');

      shaderTime += 0.1;
      badTVPass.uniforms[ 'time' ].value =  shaderTime;
      filmPass.uniforms[ 'time' ].value =  shaderTime;
      staticPass.uniforms[ 'time' ].value =  shaderTime;

      if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
        if ( videoTexture ) {
          videoTexture.needsUpdate = true;
        }
      }

      requestAnimationFrame( animate );
      composer.render(0.1);
    }
  }

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
}