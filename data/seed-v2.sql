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
),
(
	'Videographeur',
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
	'thumbnail.png',
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
	'thumbnail.png',
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
	'thumbnail.png',
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
	'thumbnail.png',
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
	'thumbnail.png',
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
	'thumbnail.png',
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
	'thumbnail.png',
	'#269987',
	'trainee',
	null,
	2
),
('Rhea', 'Langworth', '459 Shirley Falls Apt. 577', '1-858-447-6482', 'Aglae_Willms@hotmail.com', '1234', 'thumbnail.png', '#269987', 'former', true, null),
('Dayna', 'Champlin', '0167 Brekke Square Suite 502', '473.379.8954', 'Betsy.Ernser@yahoo.com', '1234', 'thumbnail.png', '#269987', 'former', true, null),
('Dustin', 'Littel', '2884 Orn Trafficway Suite 525', '997-871-5105', 'Beth.Upton78@hotmail.com', '1234', 'thumbnail.png', '#269987', 'former', true, null),
('Antonette', 'Morar', '464 Clinton Glens Apt. 449', '(978) 495-7542', 'Maurice_Collins86@hotmail.com', '1234', 'thumbnail.png', '#269987', 'former', true, null),
('Lurline', 'Pagac', '69532 Schmidt View Suite 854', '611-604-9391', 'Rosendo_Kuhn96@gmail.com', '1234', 'thumbnail.png', '#269987', 'former', true, null),
('Leon', 'Yundt', '315 Domenico Crest Apt. 989', '621-913-8644', 'Rolando23@yahoo.com', '1234', 'thumbnail.png', '#269987', 'former', true, null),
('Scotty', 'Kiehn', '651 Marques Orchard Suite 315', '(888) 295-6751', 'Hillard_Jacobs@hotmail.com', '1234', 'thumbnail.png', '#269987', 'former', false, null),
('Carlotta', 'Steuber', '316 Kilback Viaduct Apt. 675', '1-721-804-1257', 'Boris.Haag78@yahoo.com', '1234', 'thumbnail.png', '#269987', 'former', false, null),
('Juliana', 'Simonis', '490 Clementina Pines Suite 032', '929.446.7300', 'Joyce20@yahoo.com', '1234', 'thumbnail.png', '#269987', 'former', false, null),
('Tyson', 'Frami', '2252 Greyson Union Suite 516', '977-404-3330', 'Santina_McDermott@gmail.com', '1234', 'thumbnail.png', '#269987', 'former', false, null),
('Garnett', 'Bailey', '250 Eva Rue Apt. 853', '(325) 720-9146', 'Eusebio80@yahoo.com', '1234', 'thumbnail.png', '#269987', 'former', false, null),
('Xander', 'Becker', '7158 Doris Throughway Suite 787', '1-427-428-5729', 'Patrick_Walter@gmail.com', '1234', 'thumbnail.png', '#269987', 'former', false, null),
('Leda', 'Koepp', '563 Bergnaum Estate Apt. 678', '700-209-0514', 'Brady.Ferry21@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Brent', 'Prohaska', '801 Deshawn Forks Suite 180', '1-729-539-1059', 'Samantha_Schiller@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Demarco', 'Hermiston', '54655 Esperanza Lodge Apt. 907', '864-919-6992', 'Madilyn_Jenkins46@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Madeline', 'Bergstrom', '182 Bosco Orchard Apt. 087', '(783) 725-5020', 'Ward_Schulist41@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Cristopher', 'Turner', '088 Deven Cape Apt. 858', '376.483.9932', 'Trevion_Ritchie@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Nella', 'Batz', '8070 Harrison Flats Suite 940', '(601) 554-44572', 'Harley.Mueller@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Nia', 'Larkin', '25267 Schumm Forge Suite 072', '(985) 952-7744', 'Angus_Romaguera89@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Jena', 'Mitchell', '8469 O''Conner Place Suite 578', '1-311-967-9231', 'Erna22@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Stanton', 'Goodwin', '541 Humberto Curve Apt. 149', '697-429-9000', 'Talon99@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Luigi', 'Tromp', '1757 Bo Motorway Suite 905', '1-990-266-4763', 'Kelley_Ferry20@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 3),
('Mariana', 'Roob', '66138 Vivianne Camp Apt. 240', '573.787.2373', 'Camila_Hartmann@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Yadira', 'Nikolaus', '0167 Collins Run Suite 925', '381-658-7923', 'Delilah9@gmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Dewitt', 'McDermott', '498 Kreiger Drives Suite 580', '515-884-1665', 'Flo.Dibbert49@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Missouri', 'Cummings', '212 Lynch Meadows Apt. 040', '(510) 694-3152', 'Everardo.Watsica33@gmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Alycia', 'MacGyver', '6970 Mosciski Grove Suite 889', '721-487-9127', 'Kasey.Smith67@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Mona', 'Weber', '78180 Barrows Divide Suite 001', '623-765-0078', 'Marquis91@gmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Mustafa', 'Ritchie', '1658 Reid Way Suite 595', '361-683-3260', 'Shyanne.Ward@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Keeley', 'Brown', '80764 Jacobson Inlet Apt. 224', '834.840.6869', 'Judd3@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Berenice', 'Kuphal', '30321 Kailee Passage Apt. 925', '1-324-548-5802', 'Lon.Schinner@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Dock', 'Von', '864 Emmerich Village Suite 253', '516-777-0707', 'Golden.Fadel@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 2),
('Angeline', 'Schoen', '349 Haag Turnpike Suite 958', '1-387-576-7674', 'Abe_Baumbach@gmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1),
('Dallin', 'Goyette', '02144 April Square Apt. 702', '(623) 970-4369', 'Dashawn_Armstrong17@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1),
('Suzanne', 'Mayert', '081 Rogahn Hills Apt. 026', '311.348.6867', 'Jacey.Weber@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1),
('Callie', 'Wyman', '3196 Hartmann Oval Suite 172', '229-476-5991', 'Piper_Pollich@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1),
('Brendan', 'Kihn', '5974 Estevan Mountains Suite 153', '(572) 554-9939', 'Sonia3@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1),
('Dee', 'Littel', '8403 Easton Fords Apt. 345', '516-928-7466', 'Maci16@yahoo.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1),
('Ed', 'Harris', '55304 Sheldon Streets Suite 557', '968-399-2543', 'Ferne_Fisher@gmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1),
('Donna', 'Gorczany', '44666 Marquardt Key Apt. 286', '1-906-491-3161', 'Alphonso45@hotmail.com', '1234', 'thumbnail.png','#269987', 'trainee', null, 1);
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
    (4,12),
	(8,1),
	(8,2),
	(8,3),
	(8,7),
	(8,11),
	(9,1),
	(9,2),
	(9,3),
	(9,7),
	(9,11),
	(10,1),
	(10,2),
	(10,3),
	(10,7),
	(10,11),
	(11,1),
	(11,2),
	(11,3),
	(11,7),
	(11,11),
	(12,1),
	(12,2),
	(12,3),
	(12,7),
	(12,11),
	(13,1),
	(13,2),
	(13,3),
	(13,7),
	(13,11),
	(14,1),
	(14,2),
	(14,3),
	(14,7),
	(14,11),
	(15,1),
	(15,2),
	(15,3),
	(15,7),
	(15,11),
	(16,1),
	(16,2),
	(16,3),
	(16,7),
	(16,11),
	(17,1),
	(17,2),
	(17,3),
	(17,7),
	(17,11),
	(18,1),
	(18,2),
	(18,3),
	(18,7),
	(18,11);





































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

