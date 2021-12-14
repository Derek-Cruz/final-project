insert into "users" ("fullName", "email", "passwordHash", "location", "aboutMe", "photoUrl")
values ('Derek Cruz','derekcruz@gmail.com','123abc','Irvine','i like to code', 'https://img-9gag-fun.9cache.com/photo/aR7yPVA_460s.jpg'),
       ('DJ Berumen','fake@gmail.com','456def','Brentwood','a fake about me', 'https://pbs.twimg.com/media/FA3XOXcWYAIAAf_?format=jpg&name=medium'),
       ('Valeera Sanguinar','morefake@gmail.com','789ghi','Irvine','more fake about me', 'https://pbs.twimg.com/media/BgIbE88CQAAkg9z.jpg'),
       ('Yuuya Watanabe','evenmorefake@gmail.com','321cba','Japan','im a pro!','http://media.wizards.com/2015/events/2015wc/2015wc_watanabe.jpg'),
       ('Tomoharu Saito','evenevenmorefake@gmail.com','654fed','Japan','im a pro!','https://upload.wikimedia.org/wikipedia/commons/6/69/Tomoharu_Saitou.JPG');

insert into "availabilities" ("time", "description", "userId")
values ('04:00:11', 'Free for a few hours!', '3'),
       ('17:11:00', 'Lets play Magic!', '4'),
       ('08:40:30', 'Im free to get food!', '5');
