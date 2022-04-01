BEGIN;
--kanpus_place
INSERT INTO kanpus_place (name,position) VALUES 
('Studio',0),
('Salle info 1',1),
('Salle info 2',2),
('Box 1',4),
('Box 2',5),
('Box 3',6),
('Salle de cours',3);

--kanpus_event
INSERT INTO kanpus_event (
	name,
	address,
	note,
	equipment,
	role,
	start_date,
	duration,
	place_id
) VALUES 
(
	'COURS RÉALISATION TECHNIQUE DE TOURNAGE',
	null,
	null,
	null,
	null,
	'2021-09-27 08:45:00+02',
	'0 8:00:00',
	7
),
(
	'PREPA MICROFICTION / VISIONNAGE / EXPLICATIONS',
	null,
	null,
	null,
	null,
	'2021-09-28 08:45:00+02',
	'0 8:00:00',
	7
),
(
	'ATELIER FCPX',
	null,
	null,
	null,
	null,
	'2021-09-29 08:45:00+02',
	'0 8:00:00',
	2
),

(
	'ATELIER GH4',
	null,
	null,
	'GH4 ',
	null,
	'2021-09-29 08:45:00+02',
	'0 8:00:00',
	1
),
(
	'ATELIER ÉCRITURE',
	null,
	null,
	null,
	null,
	'2021-09-29 08:45:00+02',
	'0 8:00:00',
	7
),
(
	'ATELIER FCPX',
	null,
	null,
	null,
	null,
	'2021-09-30 08:45:00+02',
	'0 8:00:00',
	2
),
(
	'ATELIER GH4',
	null,
	null,
	'GH4 ',
	null,
	'2021-09-30 08:45:00+02',
	'0 8:00:00',
	1
),
(
	'ATELIER ÉCRITURE',
	null,
	null,
	null,
	null,
	'2021-09-30 08:45:00+02',
	'0 8:00:00',
	7
),
(
	'ATELIER FCPX',
	null,
	null,
	null,
	null,
	'2021-10-01 08:45:00+02',
	'0 8:00:00',
	2
),
(
	'ATELIER GH4',
	null,
	null,
	'GH4 ',
	null,
	'2021-10-01 08:45:00+02',
	'0 8:00:00',
	1
),
(
	'ATELIER ÉCRITURE',
	null,
	null,
	null,
	null,
	'2021-10-01 08:45:00+02',
	'0 8:00:00',
	7
),
(
	'Smartphone video',
	null,
	null,
	'iphone',
	null,
	'2021-09-27 08:45:00+02',
	'3 15:45:00',
	6
);


--kanpus_promo
INSERT INTO kanpus_promo (
	name,
	start_school_year,
	end_school_year
) VALUES (
	'Stage court',
	'2020-09-01',
	'2021-06-30'
),
(
	'Opemis',
	'2020-09-01',
	'2021-06-30'
);

--kanpus_user
INSERT INTO kanpus_user (
	firstname,
	lastname,
	address,
	phone_number,
	email,
	password,
	image,
	color,
	role,
	is_permanent,
	promo_id
) VALUES (
	'Alain',
	'Deloin',
	'45 rue fernand michel 84000 AVIGNON',
	'+33678956412',
	'a.deloin@gmail.com',
	'123456789',
	'alaindeloin.jpg',
	'#269987',
	'former',
	true,
	null
),
(
	'Francis',
	'Lalouche',
	'145 avenue René Coty 84000 AVIGNON',
	'+33682564713',
	'francis.lallouche@gmail.com',
	'123456789',
	'flalouche.jpg',
	'#269987',
	'former',
	false,
	null
),
(
	'Remy',
	'Lalouche',
	'145 avenue René Coty 84000 AVIGNON',
	'+33682564713',
	'remy.lallouche@gmail.com',
	'123456789',
	'flalouche.jpg',
	'#269987',
	'former',
	false,
	null
),
(
	'Jean',
	'Moulin',
	'26 rue michel patoulachy 84000 AVIGNON',
	'+33698765426',
	'j.moulin@gmail.com',
	'123456789',
	'rjean.jpg',
	'#269987',
	'trainee',
	null,
	1
),
(
	'Anne',
	'Tataway',
	'79 allée de lilas 84000 AVIGNON',
	'+336231547995',
	'tataway@gmail.com',
	'123456789',
	'Romane.jpg',
	'#269987',
	'trainee',
	null,
	2
),
(
	'Romane',
	'Beauroger',
	'6 place de l`abreuvoir rue michel patoulachy 84000 AVIGNON',
	'+33698765426',
	'romane@gmail.com',
	'123456789',
	'rjean.jpg',
	'#269987',
	'trainee',
	null,
	2
),
(
	'Romain',
	'Beauroger',
	'8 place de l`abreuvoir rue michel patoulachy 84000 AVIGNON',
	'+33699765426',
	'romain@gmail.com',
	'123456789',
	'rjean.jpg',
	'#269987',
	'trainee',
	null,
	2
);
--kanpus_group
INSERT INTO kanpus_group (name) VALUES
('GRP1'),
('GRP2'),
('GRP3'),
('GRP4'),
('Zagreus'),
('ZEUS'),
('Easy6');

--kanpus_user_has_event
INSERT INTO kanpus_user_has_event (
	user_id,
	event_id
) VALUES 
    (5,1),
    (6,1),
    (7,1),
    (3,1),
    (5,2),
    (6,2),
    (7,2),
    (1,2),
    (3,2),
    (5,3),
    (1,3),
    (6,4),
    (2,4),
    (7,5),
    (3,5),
    (7,6),
    (1,6),
    (5,7),
    (2,7),
    (6,8),
    (3,8),
    (6,9),
    (1,9),
    (7,10),
    (2,10),
    (5,11),
    (3,11),
    (4,12)
;


--kanpus_user_has_group
INSERT INTO kanpus_user_has_group (
	user_id,
	group_id
) VALUES 
(5,1),
(6,1),
(7,1);



COMMIT;

