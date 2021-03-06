"use strict";

app.controller('mainCtrl', function ($scope, $http) {
   $scope.awesomeThings = [
   	'HTML5 Boilerplate',
   	'AngularJS',
   	'Karma'
   ];


   $(".navBar--addProject").removeClass('open');


   // Dashboard navbar search input
   var dashboardSearchIcon = $('.dashboard--search label i').css('color');
   $('.dashboard---searchInput').focus(function(){
   	$('.dashboard--search label i').css({'color':'#3F51B5'});
   });
   $('.dashboard---searchInput').blur(function(){
   	$('.dashboard--search label i').css({'color':dashboardSearchIcon});
   });


   $http.get('data/projects.json')
   	.success(function(data){
   		$scope.projects = data;
   		$scope.projectsDashboard = data;
   		return $scope.projects;
   		return $scope.projectsDashboard;
   	})
   	.error(function(data){
   		console.log(data);
   	})
   	.then(function(){
   		init();
   	});

   // $scope.showLinkDev = function(project) {
   // 	return project.hasOwnProperty('linkDev');
   // }


   // if (window.history && window.history.pushState) {
   // 	$(window).on('popstate', function() {
   // 		init();
   // 	});
   // }


   $scope.routeLink = function(href){
   	var currentPage = $('.container > div > div');
   	if(currentPage.hasClass('dashboard'));

   	$('.dashboard-projects .dashboard--project').addClass('dashboard--projectNotClicked');
	   $('.dashboard--projectNotClicked').css({'opacity':'0'});
     	setTimeout(function(){
   		$('.dashboard').css({'opacity':'0'});
   	},200);
   	setTimeout(function(){
   		function dirname(path){
   			return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
   		}
			// window.location=project;
	  		var dirPath = dirname(location.href);
	  		var fullPath = dirPath + "/" + href;
  		   window.location=fullPath;
  		},400);

  //  	function dirname(path){
  //  		return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
  //  	}
		// var project = $('.dashboard--projectClicked').data("value");
	 //  	var dirPath = dirname(location.href);
	 //  	var fullPath = dirPath + "/" + project;
  // 	   window.location=fullPath;
	}







    // Dashboard Content Hover
    var clicked = false;
		$scope.projectMouseover = function(project){
			if(clicked === false){
				clicked = true;
		  		$('.dashboard-projects .dashboard--project')
		  			.addClass('dashboard--projectNotHover');
		  		$('.'+project)
		  			.removeClass('dashboard--projectNotHover')
		  			.addClass('dashboard--projectHover');
	  		}
		}
		$scope.projectMouseout = function(){
			if(clicked === true){
				clicked = false;
      		$('.dashboard-projects .dashboard--project')
      		.removeClass('dashboard--projectNotHover')
      		.removeClass('dashboard--projectHover');
      	}
		}




	/* ------ Random link click transition ------ */
		$('a').click(function(e){
			e.preventDefault();
			var eLink = $(this).attr('href');
			var eLinkBlank = $(this).attr('target');
			$('.projects').removeClass('open');

			$(".navBar--addProject").removeClass('open');
			$(".addProject").removeClass('open');
			$(".addProject .addProject-background").removeClass('open');
			$(".addProject .addProject-content").removeClass('open');
			setTimeout(function(){
				if(eLinkBlank == '_blank'){
					window.open(eLink);
				} else {
					window.location = eLink;
				}
			},400);
		});
	/* ------------------------------------------ */







  function init(){
		$(".projects").removeClass('open');
	  	$('.dashboard').removeClass('modify');
	  	$(".navBar-tools").removeClass('hideNav');

	  	setTimeout(function(){
	  		$('.dashboard--project').addClass('transi');
		  	var x = 1;
		  	var xLength = $('.dashboard--project').length;

		  	function dashboardTransi(x){
			  	setTimeout(function(){
			  		if(x<=xLength){
			  			$('.dashboard--project:nth-child('+x+')').removeClass('transi');
			  			x++;
			  			dashboardTransi(x);
			  		} else {
			  			x = 1;
			  		}
			  	},100);
			}
			dashboardTransi(x);
		  	resetDashboard();
		},50);
   }

  function resetDashboard(){
   	$('.dashboard--project').removeAttr('style');
   	$('.dashboard--projectClicked footer').removeAttr('style');
   	$('.dashboard--projectClicked .dashboard---projectDevelopment').removeAttr('style');
   	$('.dashboard--projectClicked .dashboard---projectTitle h3').removeAttr('style');
   	$('.dashboard--projectClicked .dashboard---projectTitle h2').removeAttr('style');
   	$('.dashboard--projectClicked .dashboard---projectTitle hr').removeAttr('style');

   	$('.dashboard-projects .dashboard--project')
   		.removeClass('dashboard--projectNotClicked')
   		.removeClass('dashboard--projectClicked');
   	$('.projects .project').addClass('hide');

   	setTimeout(function(){
   		dashboardEvents();
   		// fallback to avoid spam rush
   		$('.dashboard--projectClicked .dashboard---projectTitle h2').removeAttr('style');
   	},100);
   }

   function dashboardEvents(){
   	// $('body').css({'background':'#eee'});
	   // Dashboard Content Click
	   $scope.projectClick = function(project){
	   	clicked = true;
	   	$('.dashboard-projects .dashboard--project').addClass('dashboard--projectNotClicked');
	   	$('.'+project).removeClass('dashboard--projectNotClicked').addClass('dashboard--projectClicked');

	   	$('.dashboard--projectClicked .dashboard---projectTitle .hrLoader').css({
		   	'width': '100px',
		   	'opacity':'1'
			});
	   	$('.dashboard--projectNotClicked').css({
	   		'opacity':'0'
	   	});

	   	setTimeout(function(){
		   	$('.dashboard--projectClicked footer')
		   		.delay(200)
		   		.queue(function(){
		   			$('.'+project).css({
				   		'opacity':'0',
				   		'-moz-transform': 'translateY(40px)',
				   		'-webkit-transform': 'translateY(40px)',
				   		'-o-transform': 'translateY(40px)',
				   		'-ms-transform': 'translateY(40px)',
				   		'transform': 'translateY(40px)'
				   	}).dequeue();
		   		});
		   		$('.dashboard--projectClicked .dashboard---projectTitle hr').css({
		   			'opacity':'0'
		   		});
		   },200);

	   	setTimeout(function(){
	   		$('.dashboard--projectClicked .dashboard---projectDevelopment')
	   			.fadeOut('fast');
	   		$('.dashboard--projectClicked .dashboard---projectTitle h3')
	   			.delay(200)
	   			.queue(function(){
	   				$('.'+project).css({
			   			'opacity':'0',
			   			'-moz-transform': 'translateY(40px)',
			   			'-webkit-transform': 'translateY(40px)',
			   			'-o-transform': 'translateY(40px)',
			   			'-ms-transform': 'translateY(40px)',
			   			'transform': 'translateY(40px)'
			   		}).dequeue();
	   			});
	   		$('.dashboard--projectClicked .dashboard---projectTitle h2')
	   			.delay(400)
	   			.queue(function(){
	   				$('.'+project).css({'opacity':'0'}).dequeue();
	   			});
	     	},400);
	     	setTimeout(function(){
	   		$('.dashboard').css({
	   			'opacity':'0'
	   		});
	   	},600);
	   	setTimeout(function(){
	   		function dirname(path){
	   			return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
	   		}
				var project = $('.dashboard--projectClicked').data("value");
				// window.location=project;
		  		var dirPath = dirname(location.href);
		  		var fullPath = dirPath + "/project/" + project;
	  		   window.location=fullPath;
	  		},800);
	   };
   }



})

