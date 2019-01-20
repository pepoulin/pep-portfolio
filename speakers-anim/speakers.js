(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgLBbQgFgFAAgHIAAidQAAgHAFgFQAFgFAGAAQAHAAAFAFQAFAFAAAHIAACdQAAAHgFAFQgFAFgHAAQgGAAgFgFg");
	this.shape.setTransform(1.7,9.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,3.4,19.2), null);


(lib.pulse = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol2();
	this.instance.parent = this;
	this.instance.setTransform(-11.5,13.2,1,1,0,0,0,1.7,10.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:9.6,scaleX:1.1,scaleY:1.03,x:-11.1,y:12.5},0).wait(1).to({scaleX:1.19,scaleY:1.06,x:-10.7},0).wait(1).to({scaleX:1.28,scaleY:1.09,x:-10.3},0).wait(1).to({scaleX:1.37,scaleY:1.12,x:-10},0).wait(1).to({scaleX:1.45,scaleY:1.14,x:-9.6},0).wait(1).to({scaleX:1.53,scaleY:1.17,x:-9.3},0).wait(1).to({scaleX:1.59,scaleY:1.19,x:-9},0).wait(1).to({scaleX:1.53,scaleY:1.17,x:-9.3},0).wait(1).to({scaleX:1.47,scaleY:1.15,x:-9.5},0).wait(1).to({scaleX:1.42,scaleY:1.13,x:-9.7},0).wait(1).to({scaleX:1.37,scaleY:1.12,x:-10},0).wait(1).to({scaleX:1.32,scaleY:1.1,x:-10.1},0).wait(1).to({scaleX:1.28,scaleY:1.09,x:-10.3},0).wait(1).to({scaleX:1.24,scaleY:1.07,x:-10.5},0).wait(1).to({scaleX:1.2,scaleY:1.06,x:-10.6},0).wait(1).to({scaleX:1.16,scaleY:1.05,x:-10.8},0).wait(1).to({scaleX:1.13,scaleY:1.04,x:-10.9},0).wait(1).to({scaleX:1.1,scaleY:1.03,x:-11},0).wait(1).to({scaleX:1.08,scaleY:1.02,x:-11.1},0).wait(1).to({scaleX:1.06,scaleY:1.02,x:-11.2,y:12.6},0).wait(1).to({scaleX:1.04,scaleY:1.01,x:-11.3,y:12.5},0).wait(1).to({scaleX:1.03,scaleY:1.01,y:12.6},0).wait(1).to({scaleX:1.01,scaleY:1,x:-11.4},0).wait(1).to({scaleX:1.01,scaleY:1,y:12.5},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({scaleX:1,scaleY:1,x:-11.5,y:12.6},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.2,3,3.4,19.2);


// stage content:
(lib.speakers = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// right
	this.instance = new lib.pulse();
	this.instance.parent = this;
	this.instance.setTransform(35.8,29.3,1,1,0,0,180,-11.5,12.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(27));

	// left
	this.instance_1 = new lib.pulse();
	this.instance_1.parent = this;
	this.instance_1.setTransform(10.1,29.3,1,1,0,0,0,-11.5,12.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(27));

	// headphone.svg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACRDCIAAi6IAAgEQgBg8gqgrQgqgrg8AAQg7AAgrArQgqArAAA8IgBACIAAC8IglAAQgTAAgNgOQgOgOgBgVIAAhiQAAgQAKgNQAJgNAPgEQABhQA5g5QA6g5BPAAQBPAAA6A5QA5A5ABBQQAQAEAJANQAJANAAAQIAABiQAAAUgOAPQgNAOgUAAg");
	this.shape.setTransform(23,19.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(27));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(22.5,19,45.9,38.9);
// library properties:
lib.properties = {
	id: 'ADC988C45A3C4E078D7801AD1A0E1EBF',
	width: 46,
	height: 39,
	fps: 60,
	color: "#0000FF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['ADC988C45A3C4E078D7801AD1A0E1EBF'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
