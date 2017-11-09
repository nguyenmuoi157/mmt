
var canvas, context;
var tileW=20, tileH=20;

var mapW=50, mapH=35;
var vocung=mapH*mapW*mapH*mapW;	

var tilemap = [];
var img,tuong,dau,cuoi,duongdi;

var diemdau,diemcuoi;

//hàm lấy giá trị hàng và cột trong Text box
$(function(){
 $("#xacnhan").click(function(){
	
	var a =  parseInt($("#sohang").val());
	var b = parseInt($("#socot").val());
	 if(a>35 || b>50){
		 
		 mapH=35;
		 mapW=50;
		 swal({
			  title: 'Số bạn nhập quá lớn!',
			  text: 'Vui lòng nhập số nhỏ hơn. Số hàng tối đa 35, số cột tối đa 50',
			  type: 'info',
			  confirmButtonText: 'Ok'
			});
	 } else if(a<5 || b<5){
		 
		  mapH=35;
		  mapW=50;
		 swal({
			  title: 'Số bạn nhập quá nhỏ!',
			  text: 'Vui lòng nhập số lớn hơn. Số hàng tối thiểu 5, số cột tối thiểu 5',
			  type: 'info',
			  confirmButtonText: 'Ok'
			});
		 
	 } else{
		 
		 mapH=a;
		 mapW=b;
	 }
	taotilemap();
	drawimage();
//	console.log(a+b);
	
	
});	
	
});
function taotilemap(){
	
 	for(var i=0;i<mapH*mapW;i++){
	tilemap.push(1);
                           }
}
window.onload = function(){
	canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");
	taotilemap();
	//
	
	img = new Image();
	tuong = new Image();
	dau = new Image();
	cuoi= new Image();
	duongdi = new Image();
	img.onload = function(){
	  	
	drawimage();	
		
	}
	img.src="image/box.png";
	tuong.src="image/tuong.png";
    dau.src="image/dau.png";
	cuoi.src="image/cuoi.png";
	duongdi.src = "image/duongdi.png";
	//console.log(option);
	//alert(option);
}
//hàm vẽ hình ảnh
function drawimage(){	
	context.clearRect(0,0,1000,700);
	for(var i =0;i<mapH;i++){
			for(var j =0;j<mapW;j++){
				var x=j*tileW;
			    var y=i*tileH;
//				console.log("x"+x+",y"+y);
				switch(tilemap[i*mapW+j]){
					case -1://vẽ tường
						context.drawImage(tuong,x,y,tileW,tileH);
						break;
					case 1://vẽ đường đi
						context.drawImage(img,x,y,tileW,tileH);
						break;
					case 2://vẽ điểm đầu
						context.drawImage(dau,x,y,tileW,tileH);
						break;
					case 5://vẽ đường đi
						context.drawImage(duongdi,x,y,tileW,tileH);
						break;
					default://vẽ điểm cuối
						context.drawImage(cuoi,x,y,tileW,tileH);
						break;
						
				}
			}			
		}	
     }
//lấy toạ độ chột
var option=null;
var mX,mY;
var mXa,mYb;
var clickX,clickY;
var clickX1,clickY1;
var dautam=-5,cuoitam=-5;
var click =false;
$(function(){

$("#mycanvas").mousedown(function(){
		
		click=true;
	});
$("#mycanvas").mouseup(function(){
		click=false;
		
	});
$("#mycanvas").mousemove(function(even){
	
	mXa= even.pageX-canvas.offsetLeft;
	mYb = even.pageY-canvas.offsetTop;
	
	//console.log(mX+","+mY);
	if(Math.floor(mXa/tileW)<mapW && Math.floor(mYb/tileH)<mapH){
		clickY1=Math.floor(mXa/tileW);
		clickX1= Math.floor(mYb/tileH);
//		$("#toado").text("toạ độ chuột "+clickX1+","+clickY1);
//		console.log(clickX1+","+clickY1);
	}	
	
	
	
//	console.log(click);
if(option=="vatcan" && click){
			
			tilemap[clickX1*mapW+clickY1]=-1;
			drawimage();
		}
    });	
});

window.onclick = function(e){
	mX= e.pageX-canvas.offsetLeft;
	mY = e.pageY-canvas.offsetTop;
	if(Math.floor(mX/tileW)<mapW && Math.floor(mY/tileH)<mapH){
		clickY=Math.floor(mX/tileW);
		clickX= Math.floor(mY/tileH);
	}
	//vẽ điểm đầu cuối, vật cản
	if(option=="vatcan"){
		tilemap[clickX*mapW+clickY]=-1;
		drawimage();
	}
	if(option=="xoa"){
		tilemap[clickX*mapW+clickY]=1;
		drawimage();

	}
	if(option=="diemdau"){
		if(dautam==-5){
		   
	    dautam= clickX*mapW+clickY;
		tilemap[dautam]=2;
		diemdau= dautam;
		drawimage();

		}
		if(dautam!=-5){
			tilemap[dautam]=1;
			dautam= clickX*mapW+clickY;
		tilemap[dautam]=2;
		diemdau= dautam;
		drawimage();

		}
	}
	if(option=="diemcuoi"){
		if(cuoitam==-5){		
	    cuoitam= clickX*mapW+clickY;
		tilemap[cuoitam]=3;
		diemcuoi= cuoitam;
		drawimage();

		}
	
	if(cuoitam!=-5){
		tilemap[cuoitam]=1;
		cuoitam= clickX*mapW+clickY;
		tilemap[cuoitam]=3;
		diemcuoi= cuoitam;
		drawimage();
	}
}
	//
	
};
// sau khi có điểm đầu, điểm cuối, vật cản tính ma trận trọng số
	
	var matTrongso = new Array(mapH*mapW);
	$(function(){
		$("#run").click(function(){
		 
	 // tạo ma trận trọng số
		for(var i=0;i<mapH*mapW;i++){
		    if(tilemap[i]==5) // xoá đường đi cũ nếu có
				tilemap[i]=1;
			    matTrongso[i]= new Array(mapH*mapW);
	        }
		for(var i=0;i< mapH*mapW;i++)
				for(var j=0;j< mapH*mapW;j++){
						matTrongso[i][j]=vocung;
	        }
			
			for(var i=0;i<mapH;i++){
				for(var j=0;j<mapW;j++){
				   var index=i*mapW+j;
				   if(i==0){
					   //thuộc cạnh trên
					   if(j==0){
						   //thuộc góc trên bên trái
						   if(tilemap[index]==-1){
						   matTrongso[index][index]=vocung;
						   matTrongso[index][index+1]=vocung;
						   matTrongso[index][index+mapW]=vocung;  
						   }else{
						   matTrongso[index][index]=0;
						   matTrongso[index][index+1]=1;
						   matTrongso[index][index+mapW]=1;
						   }
						   
					   } else
					   if(j==mapW-1){
						   if(tilemap[index]==-1){
						   matTrongso[index][index]=vocung;
						   matTrongso[index][index+1]=vocung;
						   matTrongso[index][index+mapW]=vocung;    
						   }else
						   //thuộc góc trên bên phải
						   matTrongso[index][index]=0;
						   matTrongso[index][index-1]=1;
						   matTrongso[index][index+mapW]=1;
						  
						  
					   } else{
						   if(tilemap[index]==-1){
						   matTrongso[index][index]=vocung;
						   matTrongso[index][index+1]=vocung;
						   matTrongso[index][index+mapW]=vocung;    
						   }else{
						   //thuộc cạnh trên nhưng không thuộc góc
						   matTrongso[index][index]=0;
						   matTrongso[index][index+1]=1;
						   matTrongso[index][index-1]=1;
						   matTrongso[index][index+mapW]=1;
						   }
					   }
				   }else if(i==mapH-1){
					   //nếu không thuộc cạnh trên xét thuộc cạnh dưới không
					   if(j==0){
						   //thuộc góc dưới bên trái
						   if(tilemap[index]==-1){
						   matTrongso[index][index]=vocung;
						   matTrongso[index][index+1]=vocung;
						   matTrongso[index][index-mapW]=vocung;  
						   }else{
						   matTrongso[index][index]=0;
						   matTrongso[index][index+1]=1;
						   matTrongso[index][index-mapW]=1;}
						   
					   } else
					   if(j==mapW-1){
						  //thuộc góc dưới bên phải
						   if(tilemap[index]==-1){
						   matTrongso[index][index]=vocung;
						   matTrongso[index][index-1]=vocung;
						   matTrongso[index][index-mapW]=vocung; 
						   }else{
						   matTrongso[index][index]=0;
						   matTrongso[index][index-1]=1;
						   matTrongso[index][index-mapW]=1;}
						   
					   }else{
						   //thuộc cạnh dưới nhưng không thuộc góc
						    if(tilemap[index]==-1){
						   matTrongso[index][index]=vocung;
						   matTrongso[index][index-1]=vocung;
						   matTrongso[index][index+1]=vocung;
						   matTrongso[index][index-mapW]=vocung;
						   }else{
						   matTrongso[index][index]=0;
						   matTrongso[index][index-1]=1;
						   matTrongso[index][index+1]=1;
						   matTrongso[index][index-mapW]=1;}
						   
					   }
				   } else if(j==0 && i!=0){
					   //thuộc cạnh trái nhưng không phải góc
					    if(tilemap[index]==-1){
						  matTrongso[index][index]=vocung;
						   matTrongso[index][index+1]=vocung;
						   matTrongso[index][index+mapW]=vocung;
						   matTrongso[index][index-mapW]=vocung;
						   }else{
						   matTrongso[index][index]=0;
						   matTrongso[index][index+1]=1;
						   matTrongso[index][index+mapW]=1;
						   matTrongso[index][index-mapW]=1;}
					   
				   } else if(j==mapW-1 && i!=0){
					   //thuộc cạnh phải nhưng không phải góc
					    if(tilemap[index]==-1){
						  matTrongso[index][index]=vocung;
						   matTrongso[index][index-1]=vocung;
						   matTrongso[index][index+mapW]=vocung;
						   matTrongso[index][index-mapW]=vocung;
						   }else{
						   matTrongso[index][index]=0;
						   matTrongso[index][index-1]=1;
						   matTrongso[index][index+mapW]=1;
						   matTrongso[index][index-mapW]=1;}
					   
				   }else if(i>0 && i< mapH-1 && j>0 && j<mapW-1){
					   
					   //bình thường
					   if(tilemap[index]==-1){
						 matTrongso[index][index]=vocung;
						   matTrongso[index][index-1]=vocung;
						   matTrongso[index][index+1]=vocung;
						   matTrongso[index][index+mapW]=vocung;
						   matTrongso[index][index-mapW]=vocung;
						   }else{
						   matTrongso[index][index]=0;
						   matTrongso[index][index-1]=1;
						   matTrongso[index][index+1]=1;
						   matTrongso[index][index+mapW]=1;
						   matTrongso[index][index-mapW]=1;}
				   }
				}				
				
			}
	           dijsktra();	
		});
		
	});
    var P = new Array(mapH*mapW) ; //chứa đường đi
//	var P =[];
    var S = new Array(mapH*mapW); //chứa các đỉnh đã xét
	var L = new Array(mapH*mapW); // chứa nhãn của các đỉnh
    var duongdinn = [];
function dijsktra(){
//	console.log("điểm đầu "+diemdau);
//	console.log("điểm cuối "+diemcuoi);
//khởi tạo
	for(var i=0;i<mapH*mapW;i++){
		S[i]=0;
		P[i]= diemdau;
		L[i] = vocung;
	}
	
//        console.log("S "+S);
//		console.log("L "+L);
//		console.log("p "+P);
	
	
	 L[diemdau]=0;
	var min=vocung;
	var minIndex;
	while(S[diemcuoi]==0){	
//	console.log("S "+S);
//	console.log("l "+L);
//	console.log("p "+P);
		min=vocung;
		var t=0;
		for(var i=0;i<mapH*mapW;i++){
			if(S[i]==0 && L[i]< vocung){ //tìm phần tử nhỏ nhất trong các phần tử có nhãn khác vô cùng
				t++;	
			    if(L[i]<min ){
					min=L[i];
					minIndex=i;
				}	
			 }		 
		  }
		
	    S[minIndex]=1;
		if(t==0){
			break;
		}
		for(var j=0; j<mapH*mapW; j++){
				
				if(S[j]==0 && L[j] > L[minIndex] + matTrongso[minIndex][j]){
					L[j] = L[minIndex] + matTrongso[minIndex][j];
					P[j]=minIndex;
				}
			}		
	   }
	  
	if(L[diemcuoi]<vocung)
		swal({
			title:'độ dài đường đi ngắn nhất bằng '+L[diemcuoi],
			type:'success',
			confirmButtonText: 'Ok'
		
		});
//		alert("độ dại đường đi ngắn nhất bằng "+L[diemcuoi] ); 
	 else
		 
		 swal({
			 title:'không có đường đi',
			 type: 'erro',
			 confirmButtonText: 'Ok'
			 
		 });
//			alert("không có đường đi");
	
var i= diemcuoi;
	while(i!=diemdau){
		i=P[i];
		if(i!=diemdau && i!=diemcuoi){
		tilemap[i]=5;
		drawimage();
		}
	}
}	
	//hàm jquery lấy giá trị thì radio
$(function(){
			$("#diemdau").change(function(){
				option=$("#diemdau").val();
				
			});
			$("#diemcuoi").change(function(){
				option=$("#diemcuoi").val();
				
			});
			$("#vatcan").change(function(){
				option=$("#vatcan").val();
				
			});
	       $("#xoa").change(function(){
			   option=$("#xoa").val();
			   
		   });
	
	
});
//
