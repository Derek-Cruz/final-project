insert into "users" ("fullName", "email", "passwordHash", "location", "aboutMe", "photoUrl")
values ('Pepe Frog','ilikebunnies@gmail.com','123abc','Irvine','i like bunnies', 'https://img-9gag-fun.9cache.com/photo/aR7yPVA_460s.jpg'),
       ('Cat','fake@gmail.com','456def','Brentwood','a fake about me', 'https://pbs.twimg.com/media/FA3XOXcWYAIAAf_?format=jpg&name=medium'),
       ('Fake User','morefake@gmail.com','789ghi','Irvine','more fake about me', 'https://pbs.twimg.com/media/FA3XOXcWYAIAAf_?format=jpg&name=medium');

insert into "availabilities" ("time", "description", "userId")
values ('11:11:11', 'Free for a few hours!', '2')
