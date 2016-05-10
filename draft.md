##database:
    tables:users, oprations: CRUD,  rolePermissions
            objects:  topics, posts, comments
            roles:admin, author, user, moderator,
            
            
##php: 
    check whether a person has a particular permission
    session: assigned after a person signed in 
     how to assign a particular person as an author of a post?

##javascript:
    CRUD topic/posts/comments/






#commands: 
    select * from users inner join user_roles on users.uid = user_roles.uid
   inner join role_permissions on user_roles.rid = role_permissions.rid
   inner join permissions on role_permissions.pid = permissions.pid 
   
   
   
admin: admin123
moderator: moderator123
author: author123
user: user

mongod --smallfiles --syslog --fork