
	var sketch=angular.module('sketch',[]);
    sketch.controller('sketchController', ['$scope', function($scope){
	$scope.canvasWH={width:600,height:600};
	$scope.cssState={
		 style:"stroke",
		 lineWidth:1,
		 fillstyle:"#000000",
		 strokestyle:"#000000"

	}
	$scope.names={
		zhixian:"直线",
		yuanxing:"圆形",
		juxing:"矩形",
		xiangpi:"橡皮",
		qianbi:"铅笔"

	}
	$scope.tool="line";

	$scope.tools={
		"image/line.png":"line",
		"image/yuan.png":"arc",
		"image/juxing.png":"rect",
		"image/f12d.png":"eraser",
		"image/09135934.png":"pen"
	}
	$scope.setTool=function(tool){
		$scope.tool=tool;
	}
	$scope.setStyle=function(s){
        $scope.cssState.style=s;
	}
	var canvas=document.querySelector('#canvas');
	ctx=canvas.getContext('2d');
	
	var previous;
	var clearCanvas=function(){
		ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
	}
	 $scope.newSketch=function(){
	 	if(previous){
			if( confirm('是否保存') ){
				location.href = canvas.toDataURL();		
			}
		}
		clearCanvas();
		previous = null;
	 }
	 $scope.save = function(ev){
		if(previous){
			ev.srcElement.href=canvas.toDataURL();
			ev.srcElement.download = 'mypic.png';
		}else{
			alert('空画布');
		}
	 }
	var setMousemove={
		line:function(e){
			canvas.onmousemove=function(ev){
			clearCanvas();
		  if(previous){
			ctx.putImageData(previous,0,0)
		   }
		   ctx.beginPath();
		   ctx.moveTo(e.offsetX,e.offsetY);
		   ctx.lineTo(ev.offsetX,ev.offsetY);
		   ctx.stroke();
		    }
		},
		arc:function(e){
			canvas.onmousemove=function(ev){
			clearCanvas();
		   if(previous){
			ctx.putImageData(previous,0,0)
		   }
		   ctx.beginPath();
		   ctx.arc(e.offsetX,e.offsetY,Math.abs(ev.offsetX-e.offsetX),0,Math.PI*2)
		   if($scope.cssState.style=="fill"){
		   	 ctx.fill();

		   }
		   else{
		    ctx.stroke();
	
		   }
		   }
		},
		rect:function(e){
			canvas.onmousemove=function(ev){
			clearCanvas();
		  if(previous){
			ctx.putImageData(previous,0,0)
		   }
		   ctx.beginPath();
		    var w=ev.offsetX-e.offsetX;
		    var h=ev.offsetY-e.offsetY;
		    if ($scope.cssState.style=="fill") {
		    	ctx.fillRect(e.offsetX-0.5,e.offsetY-0.5,w,h)
		    }
		    else{
		    ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,w,h)	
		    }
		   
		  }
		},
		eraser:function(e){
			canvas.onmousemove=function(ev){
		  
		    ctx.clearRect(ev.offsetX,ev.offsetY,20,20)
		    }
		},
		pen:function(e){
			 ctx.beginPath();
			 ctx.moveTo(e.offsetX,e.offsetY);
			canvas.onmousemove=function(ev){
			 clearCanvas();
		  if(previous){
			ctx.putImageData(previous,0,0)
		   }

		   ctx.lineTo(ev.offsetX,ev.offsetY);
		   ctx.stroke();
		    }
		},
	}
	canvas.onmousedown=function(e){
		 setMousemove[$scope.tool](e);
		 ctx.strokeStyle=$scope.cssState.strokestyle;
		 ctx.fillStyle=$scope.cssState.fillstyle;
		 ctx.lineWidth=$scope.cssState.lineWidth;
		document.onmouseup=function(){
		canvas.onmousemove=null;
		previous=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height)
		}
		
	}
	
}])




