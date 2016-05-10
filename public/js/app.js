// var username;

// $(".dropdown-menu li a").click(function(){
//   $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
//   $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
//     username= $(this).data('value');
    
//   console.log(username);
// });
// function setusername(){
//   $('#username').html('Author: '+username);
// }

var username = $('#user').html();
console.log(username);


var thisView = angular.module('rbac-forum', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/template/topic.html',
    controller: 'topicCtrl'
  });
  $routeProvider.when('/posts/show/:topic_id', {
    templateUrl: '/template/post.html',
    controller: 'postCtrl'
  });
  $routeProvider.when('/comments/show/:topic_id/:post_id', {
    templateUrl: '/template/comment.html',
    controller: 'commentCtrl'
  });
  // $routeProvider.when('/profile/', {
  //   controller: 'profileCtrl'
  // });
}])

// thisView.controller('profileCtrl', ['$scope', '$http', function($scope, $http){
//   var user = $scope.user;
//   console.log(user);

// }
// ]);

thisView.controller('topicCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.username = username;
    $scope.topics = [];
    $http.get("/topics").success(function(topics){
      $scope.topics = topics;
    });
    
    $scope.buttonEditMode = function(){
      if($scope.username == 'admin' || $scope.username == 'moderator'){
        return true;
      }else{
        return false;
      }
    }
    
    // $http.get("/profile").success(function(req,res) {
    //     $scope.username = res.body.username;
    // })
    // console.log($scope.username);
    $scope.savetopic = function(topic){
      if (topic.hasOwnProperty('_id')){
        $http.put("/topics/"+topic._id, topic).success(function(topic){
          console.log("topic saved: ",topic);
        });
      }
    };
    
    $scope.toggleEditMode = function(repeatScope){
      if (!!repeatScope.editMode){
        repeatScope.editMode = false;
      } else {
        repeatScope.editMode = true;
      }
    };
    
    $scope.destroy = function(topic){
      if (topic.hasOwnProperty('_id')){
        $http.delete("/topics/"+topic._id).success(function(){
          var index = $scope.topics.indexOf(topic);
          if (index > -1){
            $scope.topics.splice(index, 1);
          }
        });
      }
    };
    
    $scope.addtopic = function(){
      var newtopic = {name: $scope.name || "null"};
      $http.post("/topics", newtopic).success(function(topic){
        $scope.topics.push(topic);
        $scope.name = '';
      });
    };
}]);


thisView.controller('postCtrl', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.topic_id = $routeParams.topic_id;
    // show topic name
    $http.get("/topics/"+$scope.topic_id).success(function(topic){
      $scope.topic_name = topic[0].name;
    });
    
    $scope.username = username;
    $scope.showVar = false;
    $scope.formshow = function(){
      $scope.showVar = !$scope.showVar;
      if($scope.showVar == false){
        $('textarea').val('');
      }
    }
     $scope.buttonEditMode = function(){
      if($scope.username == 'admin' || $scope.username == 'moderator' || $scope.username == 'author'){
        return true;
      }else{
        return false;
      }
    }
    
    $scope.posts = [];
    $http.get("/posts/show/"+$scope.topic_id).success(function(posts){
      $scope.posts = posts;
    });
    
    $scope.createPost = function(){
      var newpost = {
        topic_id: $scope.topic_id,
        title: $scope.title,
        content: $scope.content,
        author:$scope.username
      };
      $http.post("/posts/show/"+$scope.topic_id, newpost).success(function(post){
        $scope.posts.push(post);
        $scope.title = '';
        $scope.content = '';
      });
      
    };
    
    $scope.deletePost = function(post){
      if (post.hasOwnProperty('_id')){
        
        $http.delete('/posts/show/'+$scope.topic_id+'/'+post._id).success(function(document){
          var index = $scope.posts.indexOf(post);
          if (index > -1){
            $scope.posts.splice(index, 1);
          }
        });
        // $scope.posts=[];
      }
    };
}]);


thisView.controller('commentCtrl', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $scope.topic_id = $routeParams.topic_id;
    $scope.post_id = $routeParams.post_id;
    $scope.username = username;
    // show post name
    $http.get("/posts/show/"+$scope.topic_id + '/' + $scope.post_id).success(function(post){
      $scope.title = post[0].title;
      $scope.content = post[0].content;
      $scope.author = post[0].author;
      $scope.date = post[0].date;
    });
    
    
    $scope.comments = [];
    $http.get("/comments/show/"+$scope.topic_id + '/' + $scope.post_id).success(function(comments){
      $scope.comments = comments;
    });
    
    $scope.buttonEditMode = function(){
      if($scope.username == 'admin' || $scope.username == 'moderator'){
        return true;
      }else{
        return false;
      }
    }
    
    $scope.createComment = function(){
      var newcomment = {
        post_id: $scope.post_id,
        content: $scope.comment,
        author: $scope.username
      };
      $http.post("/comments/show/"+$scope.topic_id+'/'+$scope.post_id, newcomment).success(function(comment){
      $scope.comments.push(comment);
      $scope.comment = '';
      console.log(comment);
      });
      
    };
    
    $scope.deleteComment = function(comment){
      if (comment.hasOwnProperty('_id')){
        
        $http.delete('/comments/show/'+$scope.topic_id+'/'+$scope.post_id+'/'+comment._id).success(function(document){
          var index = $scope.comments.indexOf(comment);
          if (index > -1){
            $scope.comments.splice(index, 1);
          }
        });
      }
    };
}]);
