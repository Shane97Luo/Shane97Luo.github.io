(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"01End_atlas_", frames: [[0,0,800,600],[0,602,400,500],[402,602,400,500],[0,1104,400,500]]}
];


// symbols:



(lib.background = function() {
	this.spriteSheet = ss["01End_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.photo1 = function() {
	this.spriteSheet = ss["01End_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.photo2 = function() {
	this.spriteSheet = ss["01End_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.photo3 = function() {
	this.spriteSheet = ss["01End_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



// stage content:
(lib._01End = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// stars
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("EAkhAjwIpBikIInjrIgWpXIGKHEIIzjPIk0IDIFzHXIpJiFIlOHygA9nXwIthFIIHTseIpDrRIOHDFIH7sEIBcOWIN8D0ItPFzIAtOdgAnsboImEhPIFfi3IgtmJIEaEVIFnilIivFjIELEjImHg6IjCFYgEgzeAWoImUB5IDvlcIjvlbIGUB4IEBlOIAKGlIGOCMImOCNIgKGlgEAvlgUTImLBJIEGkxIi/liIFzCbIEVkjIghGQIFrCuImIBdIg1GOgAc19rInCBZIEnlgIjgmQIGqCrIE3lRIgfHKIGhDBIm9BwIg3HHgEAtAgjfIlkhgIFRiVIgUlwID2ERIFYiEIi4FAIDoEeIlphOIjIE1gEgvkgjIIk1iLIFHhWIAllRIC3EeIFMhGIjWEGICoEnIk8h7IjkD7g");
	this.shape.setTransform(386.1,296.8);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(35).to({_off:false},0).wait(13));

	// photo3
	this.instance = new lib.photo3();
	this.instance.parent = this;
	this.instance.setTransform(360,79,1,1,-2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({_off:false},0).wait(25));

	// photo2
	this.instance_1 = new lib.photo2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(227.2,20.5,1,1,6);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(11).to({_off:false},0).wait(37));

	// photo1
	this.instance_2 = new lib.photo1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(2.4,97.1,1,1,-12);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(48));

	// background
	this.instance_3 = new lib.background();
	this.instance_3.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(48));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(400,300,800,600);
// library properties:
lib.properties = {
	id: '0CD0D821079EEE4E906F3FBF7B0D21F6',
	width: 800,
	height: 600,
	fps: 24,
	color: "#333333",
	opacity: 1.00,
	manifest: [
		{src:"images/01End_atlas_.png", id:"01End_atlas_"}
	],
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
an.compositions['0CD0D821079EEE4E906F3FBF7B0D21F6'] = {
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