insert into "users" ("fullName", "email", "passwordHash", "location", "aboutMe", "photoUrl")
values ('Pepe Frog','ilikebunnies@gmail.com','123abc','Irvine','i like bunnies', 'https://img-9gag-fun.9cache.com/photo/aR7yPVA_460s.jpg'),
       ('Cat','fake@gmail.com','456def','Brentwood','a fake about me', 'https://pbs.twimg.com/media/FA3XOXcWYAIAAf_?format=jpg&name=medium'),
       ('Valeera Sanguinar','morefake@gmail.com','789ghi','Irvine','more fake about me', 'https://pbs.twimg.com/media/BgIbE88CQAAkg9z.jpg'),
       ('Yuuya Watanabe','evenmorefake@gmail.com','321cba','Japan','im a pro!','http://media.wizards.com/2015/events/2015wc/2015wc_watanabe.jpg'),
       ('Tomoharu Saito','evenevenmorefake@gmail.com','654fed','Japan','im a pro!','https://upload.wikimedia.org/wikipedia/commons/6/69/Tomoharu_Saitou.JPG');

insert into "availabilities" ("time", "description", "userId")
values ('11:11:11', 'Free for a few hours!', '3'),
       ('11:11:11', 'Lets play Magic!', '4'),
       ('11:11:11', 'Im free to get food!', '5');
