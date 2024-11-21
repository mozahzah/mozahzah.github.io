// /*
// SPDX-License-Identifier: GPL-2.0-only
// Copyright © 2024 mozahzah. All rights reserved.
// Author: mozahzah 
// */


//     .mobile-div-block {-webkit-transform: rotate(90deg);
//         -moz-transform: rotate(90deg);
//         -o-transform: rotate(90deg);
//         -ms-transform: rotate(90deg);
//         transform: rotate(90deg);}

    

//     // Init Variables
//     var videos = document.getElementsByClassName("video");
//     var columnGroups = document.getElementsByClassName("portfolio-main-block");
//     var vidText = "v";
//     var j;
//     var video;
//   	var firstTime = true;
//     var NumberOfVideos;
//     var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
//     // Name Videos
//     function NameVideos()
//     {
//     	for (let i=0;i < NumberOfVideos; i++)
//     	{
//         	video = videos.item(i);
//         	video.id = vidText+i;
//     	}
//     }
    
//     function SetupHover ()
//     {
//         if ($(window).width() > 991 && !isMobile)
//         {
//        			for (let i=0; i < NumberOfVideos; i++)
//             {
//             	//columnGroups.item(i).addEventListener("mouseenter", function(){PlayVid("v"+i)},false);
//             	//columnGroups.item(i).addEventListener("mouseleave", function(){PauseVid("v"+i)}, false);
//             }
//         }
//         else 
//         {   
//         		console.log("unbinding");
//             Array.prototype.forEach.call(columnGroups, function(el) 
//             {
//     					elClone = el.cloneNode(true);
// 						el.parentNode.replaceChild(elClone, el);
//             });
//         }
//     }

//     function SetupDirection()
//     {
//         for (let i = 0; i < NumberOfVideos; i++) 
//         {
//             if ($(window).width() > 991)
//             {
//                	if (i % 2 !== 0) 
//                	{
//                     $(".portfolio-main-block").eq(i).css({"flex-direction": "row-reverse"});
//                 }
//             }
//             else
//             {
//                 $(".portfolio-main-block").eq(i).css({"flex-direction": "row"});
//             }
//         }
//     }
    
//     // Video Player Functions
//     function PlayVid(id) 
//     {
//         var player = new Vimeo.Player(document.getElementById(id));
      	
//       	if (firstTime)
//         {
//       		player.setMuted(true);
//           	player.setVolume(0);
//           	if ($(window).width() < 991 && isMobile){player.setVolume(1);
//                                                     player.setMuted(true);}
//         	firstTime = false;
//         }
      
//         player.play().catch(function(error) {console.error('error playing the video:', error.name);});
      
     	
//     }

//     function PauseVid(id)
//     {
//         var player = new Vimeo.Player(document.getElementById(id));
//         player.pause().catch(function(error) {
//     		console.error('error playing the video:', error.name);});
//     }
//     function StopVid(id)
//     {
//         //document.getElementById(id).pause();
//        // document.getElementById(id).currentTime = 0;
//     }
    
//     // if element is on screen 
//     $.fn.isOnScreen = function(){
    
//         var win = $(window);
//         var viewport = {
//             top : win.scrollTop(),
//             left : win.scrollLeft()
//         };
//         viewport.right = viewport.left + win.width();
//         viewport.bottom = viewport.top + win.height();
    
//         var bounds = this.offset();
//         bounds.right = bounds.left + this.outerWidth();
//         bounds.bottom = bounds.top + this.outerHeight();
    
//         return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
//     };
    

//     //Main Events

//     //init
//     $(document).ready(function()
//     {   
//     	NumberOfVideos = document.getElementsByClassName("video").length;
//     	NameVideos();
//         SetupHover();
//         SetupDirection();
//         $(window).resize(function()
//         {
//         	if (!isMobile){
//         		SetupHover();
//             SetupDirection();}
//         });
//     });
    
//     //pause on scroll for mobile
//     $(document).ready(function(){
//         $(columnGroups).parent().scroll(function()
//         {
//             if ($(window).width() < 991 && isMobile) 
//             {
//               for (let i = 0; i < NumberOfVideos; i++)
//                 {
//                     let v = "#v"+i.toString();
//                     let id = "v"+i.toString();
//                     if ($(v).isOnScreen()) 
//                     {
//                         PlayVid(id);
//                     }
//                     else 	
//                     {
//                         PauseVid(id);
//                     }
//                 }
//             }
//         });
//     });
    
//     // stop video for all
//     $(document).ready(function(){
//         $(window).scroll(function()
//         {
//               for (let i = 0; i < NumberOfVideos; i++)
//             	{
//                 let v = "#v"+i.toString();
//                 let id = "v"+i.toString();
//                 if ($(v).isOnScreen()) 
//                 {
//                     //if (isMobile && $(window).width() < 991)
//                    // {
//                        // PlayVid(id);
//                    // }
//                 }
//                 else 	
//                 {
//                    // StopVid(id);
//                 }
//             } 
//         });
//     });