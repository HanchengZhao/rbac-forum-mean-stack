<?php
 $admin = hash('sha256',admin);
 $moderator = hash('sha256',moderator);
 $user = hash('sha256',user);
 echo "admin-hash:$admin\r\n";
 echo "moderator-hash:$moderator\r\n";
 echo "user-hash:$user\r\n";
?>