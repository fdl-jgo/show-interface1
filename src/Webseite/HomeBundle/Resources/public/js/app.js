(function () {
	
	//outils
	function myRandom() {
		var s;
		var num; 
		s = ((Math.random() * 2) < 1) ? -1 : 1;
		num = (Math.random() * 0.5) * s;
		return num;
	}

	function myRandom1(min, max) {
		return (Math.random() * max) + min;
	}

	function Vector(_x, _y) 
	{
		this.x = _x || 0;
		this.y = _y || 0;

		if(typeof this.x != 'number' ) PrintErr("Parameter x in Vector constructor");
		if(typeof this.y != 'number') PrintErr("Parameter y in Vector constructor");

		this.Add = function(_vector) 
		{
			if (_vector instanceof Vector) 
			{
				this.x += _vector.x;
				this.y += _vector.y;

				return this;
			} else { PrintErr("Invalid Parameter(s) in Vector.Add"); }
			
		}
		
		this.EuclidianDistance = function (_vector) {
			
			return Math.sqrt((this.x - _vector.x) * (this.x - _vector.x) + (this.y - _vector.y) * (this.y - _vector.y));
		}
	}

	function drawRect(argCtx, argV1, argV2, argColorS) {
		argCtx.fillStyle = argColorS;
		argCtx.fillRect(argV1.x,argV1.y,argV2.x,argV2.y);

	}

	function drawLine(argCtx, argFromV, argToV, argLineWidth, argLineColor) {
		argCtx.moveTo(argFromV.x,argFromV.y);
		argCtx.lineTo(argToV.x,argToV.y);
		argCtx.lineWidth = argLineWidth;
		argCtx.strokeStyle = argLineColor;
		argCtx.stroke();
	}

	function drawCircle(argCtx, argCenterV, argRayonN, argColorS) {
		argCtx.beginPath();
	    argCtx.arc(argCenterV.x, argCenterV.y, argRayonN, 0, 2 * Math.PI, true);
	    argCtx.fillStyle = "#E2FFC6";
	    argCtx.fill();

	}

	function particle(argCtx, argPosV) {
		
		this.position = argPosV;
		this.radius = 4;
		this.zone = 50;
		this.color = '#5cbdaa';
		/*this.velocity = new Vector((Math.random() * 0.5), (Math.random() * 0.5))*/
		this.velocity = new Vector(myRandom(), myRandom());
		this.border = {
			x1: 0,
			x2: 0,
			y1: 0,
			y2: 0
		}

		this.collideArea = function (argPart) {		
			var dist = this.position.EuclidianDistance(argPart.position);
			return dist < this.zone + argPart.zone ;		
		}
		this.hasFriend = function (argPart) {
			if(this.collideArea(argPart)){
				drawLine(argCtx, this.position, argPart.position, 1, this.color);
			}
		}

		this.init = function () {
			this.border.x2 = assetsResize.w;
			this.border.y2 = assetsResize.h;
			drawCircle(argCtx, this.position, this.radius, this.color); 
		}
		/*this.updat*/
		this.update = function () {
			if(this.position.x <= this.border.x1) { 
				this.velocity.x= -this.velocity.x;
				this.velocity.y= this.velocity.y;
				
			}
			if(this.position.x >= this.border.x2) {
				this.velocity.x= -this.velocity.x;
				this.velocity.y= this.velocity.y;
				
			}
			if(this.position.y <= this.border.y1) {
				this.velocity.x= this.velocity.x;
				this.velocity.y= -this.velocity.y;
				
			}
			if(this.position.y >= this.border.y2) {
				this.velocity.x= this.velocity.x;
				this.velocity.y= -this.velocity.y;
				
			}

			this.position.x = this.position.x + this.velocity.x;
			this.position.y = this.position.y + this.velocity.y;
			


			this.init();
		}

		this.init();
	}


///

	var canvas = document.createElement('canvas');
	var mainDiv = document.getElementById("mainContain");
	var ctx = canvas.getContext("2d");
	var assetsResize  = {
			w: window.innerWidth - 17,
			h: window.innerHeight -17
		};
	var siz = 'theSize'; // acces with (window.theSize)
	/*document.getElementById("mainContain").style.height = "800px";*/

	var particles = [];

	function Run() 
	{
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if(particles.length > 0 ) {
			//draw particle and apply actions
			for (var i = 0; i < particles.length; i++) {
				for (var j = i+1; j < particles.length; j++) {
					particles[i].hasFriend(particles[j]);
				}
				particles[i].update();
			}
		}

		RequestAnimationFrame(Run);
	}


	window.RequestAnimationFrame = (function()
	{
	    return  window.requestAnimationFrame         || 
	            window.webkitRequestAnimationFrame   || 
	            window.mozRequestAnimationFrame      || 
	            window.oRequestAnimationFrame        || 
	            window.msRequestAnimationFrame       || 
	    function(_callback, _element)
	    {
	        window.setTimeout(_callback, 1000 / 60);
	    };
	})();
////

	document.addEventListener('DOMContentLoaded', function () {
			

			$(".myCanvas").remove();
			canvas.className = 'myCanvas';
			canvas.width  = assetsResize.w;
			canvas.height = assetsResize.h;

			// creation particules  : 36 au totla
			   for (var i = 0; i < 36; i++) {
				   	  	var v = new Vector(myRandom1(10, assetsResize.w), myRandom1(10, assetsResize.h));
				   	  	var p = new particle(ctx, v);
				   	  	particles.push(p)
			   }


			mainDiv.insertBefore(canvas, mainDiv.firstChild);
			window[siz] = assetsResize;	// acces with (window.theSize)
				
			Run();

			$(window).resize(function(){
		    	assetsResize = {
				w: window.innerWidth -17,
				h: window.innerHeight -17
				};
				if(particles.length > 0 ) {
					for (var i = 0; i < particles.length; i++) {
							particles[i].border.x2 = assetsResize.w;
							particles[i].border.y2 = assetsResize.h;
						}
				}

				$(".myCanvas").remove();
				canvas.className = 'myCanvas';
				canvas.width  = assetsResize.w;
				canvas.height = assetsResize.h;

				mainDiv.insertBefore(canvas, mainDiv.firstChild);
				window[siz] = assetsResize;	// acces with (window.theSize) this is for absolute main div size
			});
	
			fireDom() 
	}, false);

})();