<?php
   $username = $_REQUEST["username"];
   $operation = $_REQUEST["operation"];
   $object = $_REQUEST["object"];
   $dbhandle = new PDO("sqlite:data.db") or die("Failed to open DB");
   if (!$dbhandle) die ($error);
   $stmt = $dbhandle->prepare("select * from users inner join user_roles on users.uid = user_roles.uid
   inner join role_permissions on user_roles.rid = role_permissions.rid
   inner join permissions on role_permissions.pid = permissions.pid 
   where username = :username and operation = :operation and object = :object ;");
   $stmt->bindParam(":username", $username);
   $stmt->bindParam(":operation", $operation);
   $stmt->bindParam(":object", $object);
   $stmt->execute();
   $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
   if (isset($results["uid"])){
      echo "Yes! $username can $operation $object";
   } else {
      echo "No! $username can't $operation $object";
   }
   
?>