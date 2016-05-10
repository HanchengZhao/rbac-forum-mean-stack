PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users (uid INTEGER PRIMARY KEY AUTOINCREMENT,
username varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL
);
INSERT INTO "users"(username, password) VALUES('admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'); 
INSERT INTO "users"(username, password) VALUES('moderator','cfde2ca5188afb7bdd0691c7bef887baba78b709aadde8e8c535329d5751e6fe');
INSERT INTO "users"(username, password) VALUES('user','04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb');

CREATE TABLE user_roles (uid int(255), rid int(8)
);
INSERT INTO "user_roles" VALUES('1','1'); 
INSERT INTO "user_roles" VALUES('2','2');
INSERT INTO "user_roles" VALUES('3','4');

CREATE TABLE roles (rid int(8), role varchar(255)
);
INSERT INTO "roles" VALUES('1','admin'); 
INSERT INTO "roles" VALUES('2','moderator');
INSERT INTO "roles" VALUES('3','author');
INSERT INTO "roles" VALUES('4','user');

CREATE TABLE permissions (pid int(8), operation varchar(255), object varchar(255)
);
INSERT INTO "permissions" VALUES('1','create','user'); 
INSERT INTO "permissions" VALUES('2','create','topic');
INSERT INTO "permissions" VALUES('3','create','post');
INSERT INTO "permissions" VALUES('4','create','comment');
INSERT INTO "permissions" VALUES('5','read','user'); 
INSERT INTO "permissions" VALUES('6','read','topic');
INSERT INTO "permissions" VALUES('7','read','post');
INSERT INTO "permissions" VALUES('8','read','comment');
INSERT INTO "permissions" VALUES('9','update','user'); 
INSERT INTO "permissions" VALUES('10','update','topic');
INSERT INTO "permissions" VALUES('11','update','post');
INSERT INTO "permissions" VALUES('12','update','comment');
INSERT INTO "permissions" VALUES('13','delete','user'); 
INSERT INTO "permissions" VALUES('14','delete','topic');
INSERT INTO "permissions" VALUES('15','delete','post');
INSERT INTO "permissions" VALUES('16','delete','comment');

CREATE TABLE role_permissions (rid int(8), pid int(8)
);
INSERT INTO "role_permissions" VALUES('1','1'); 
INSERT INTO "role_permissions" VALUES('1','2'); 
INSERT INTO "role_permissions" VALUES('1','3'); 
INSERT INTO "role_permissions" VALUES('1','4'); 
INSERT INTO "role_permissions" VALUES('1','5'); 
INSERT INTO "role_permissions" VALUES('1','6'); 
INSERT INTO "role_permissions" VALUES('1','7'); 
INSERT INTO "role_permissions" VALUES('1','8'); 
INSERT INTO "role_permissions" VALUES('1','9'); 
INSERT INTO "role_permissions" VALUES('1','10'); 
INSERT INTO "role_permissions" VALUES('1','11'); 
INSERT INTO "role_permissions" VALUES('1','12'); 
INSERT INTO "role_permissions" VALUES('1','13'); 
INSERT INTO "role_permissions" VALUES('1','14'); 
INSERT INTO "role_permissions" VALUES('1','15'); 
INSERT INTO "role_permissions" VALUES('1','16'); 
INSERT INTO "role_permissions" VALUES('2','2');
INSERT INTO "role_permissions" VALUES('2','6');
INSERT INTO "role_permissions" VALUES('2','10');
INSERT INTO "role_permissions" VALUES('2','13');
INSERT INTO "role_permissions" VALUES('2','14');
INSERT INTO "role_permissions" VALUES('3','3');
INSERT INTO "role_permissions" VALUES('3','7');
INSERT INTO "role_permissions" VALUES('3','11');
INSERT INTO "role_permissions" VALUES('3','15');
INSERT INTO "role_permissions" VALUES('4','4');
INSERT INTO "role_permissions" VALUES('4','6');
INSERT INTO "role_permissions" VALUES('4','7');
INSERT INTO "role_permissions" VALUES('4','8');
COMMIT;