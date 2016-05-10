<?php
   session_start();
   $username = $_REQUEST["username"];
   $pwd = hash('sha256',$_REQUEST["password"]);
   $dbhandle = new PDO("sqlite:auth.db") or die("Failed to open DB");
   if (!$dbhandle) die ($error);
   $statement = $dbhandle->prepare("select * from users inner join user_roles on users.uid = user_roles.uid
   inner join role_permissions on user_roles.rid = role_permissions.rid
   inner join permissions on role_permissions.pid = permissions.pid 
   where username = :username and password = :pwd;");
   $statement->bindParam(":username", $username);
   $statement->bindParam(":pwd", $pwd);
   $statement->execute();
   $results = $statement->fetch(PDO::FETCH_ASSOC);
   // echo json_encode($results);
   if (isset($results)){
       $_SESSION['logged_in'] = true;
       
       //set the role
       if($results["rid"] == 1) {
         $_SESSION['role'] = 'admin';
       } elseif($results["rid"] == 2) {
         $_SESSION['role'] = 'moderator';
       } elseif($results["rid"] == 3) {
         $_SESSION['role'] = 'author';
       }
       //could be both author and user, so seperate 'if'
       if($results["rid"] == 4) {
         $_SESSION['role'] = 'user';
       } 
       
       echo json_encode($_SESSION['role']);

   } else {
       $_SESSION["logged_in"] = false;
       echo('The username or password is not correct');
   }
   
   
   
//     if (isset($results["password"])){
//       $_SESSION['logged_in'] = true;
//       header("Location: index.html"); /* Redirect browser */
//       exit();
//   } else {
//       $_SESSION["logged_in"] = false;
//       echo('The username or password is not correct');
//   }
   // $usn = $results["username"]; 
   // $op =$results["operation"];
   // $ob =$results["object"];
   // $role =$results["rid"];
?>