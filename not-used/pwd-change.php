<?php
   
   $username = $_REQUEST["username"];
   $pwd = hash('sha256',$_REQUEST["password"]);
   $new_pwd = hash('sha256',$_REQUEST["new-password"]);
   $dbhandle = new PDO("sqlite:auth.db") or die("Failed to open DB");
   if (!$dbhandle) die ($error);
   $stmt = $dbhandle->prepare("Select * from users where username = :username and password = :pwd");
   $stmt->bindParam(":username", $username);
   $stmt->bindParam(":pwd", $pwd);
   $stmt->execute();
   $results = $stmt->fetch(PDO::FETCH_ASSOC);
  
   $statement = $dbhandle->prepare("update users set password = :new_pwd  where username = :username and password = :pwd");
   $statement->bindParam(":username", $username);
   $statement->bindParam(":pwd", $pwd);
   $statement->bindParam(":new_pwd", $new_pwd);
   $statement->execute();
  

   if ($results['password']==$pwd){
    //   $_SESSION['logged_in'] = true;
      echo "Password has been changed!";
      echo $status;
  } else {
    //   $_SESSION["logged_in"] = false;
      echo("The original password is not right"); /* Redirect browser */
      exit();
  }
   
?>