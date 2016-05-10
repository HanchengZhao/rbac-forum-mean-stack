<?php
   
  $username = $_REQUEST["username"];
  $pwd = hash('sha256',$_REQUEST["password"]);

   $dbhandle = new PDO("sqlite:auth.db") or die("Failed to open DB");
   if (!$dbhandle) die ($error);
   $statement = $dbhandle->prepare("insert into users(username, password) values ( :username, :pwd)");
    $statement->bindParam(":username", $username);
    $statement->bindParam(":pwd", $pwd);
    $status = $statement->execute();
    if($status){
        // set a user as role user
        $statement = $dbhandle->prepare("select uid from users where username = :username ");
        $statement->bindParam(":username", $username);
        $statement->execute();
        $results = $statement->fetch(PDO::FETCH_ASSOC);
        $uid = $results['uid'];
        $statement = $dbhandle->prepare("INSERT INTO user_roles VALUES(:uid,'4');");
        $statement->bindParam(":uid", $uid);
        $statement->execute();
      header("Location: login.html"); /* Redirect browser */
      exit();
    }
    else{
        echo"The username has already existed!";
    }