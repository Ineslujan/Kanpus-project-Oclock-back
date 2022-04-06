BEGIN;

-- Drop current data and indexes
TRUNCATE "kanpus_user" RESTART IDENTITY;

-- Table: kanpus_user
INSERT INTO "kanpus_user" ("firstname", "lastname", "address", "phone_number", "email", "password", "image") VALUES
('Rhea', 'Langworth', '459 Shirley Falls Apt. 577', '1-858-447-6482', 'Aglae_Willms@hotmail.com', 1, 'http://placeimg.com/640/480'),
('Dayna', 'Champlin', '0167 Brekke Square Suite 502', '473.379.8954', 'Betsy.Ernser@yahoo.com', 4, 'http://placeimg.com/640/480'),
('Dustin', 'Littel', '2884 Orn Trafficway Suite 525', '997-871-5105', 'Beth.Upton78@hotmail.com', 1, 'http://placeimg.com/640/480'),
('Antonette', 'Morar', '464 Clinton Glens Apt. 449', '(978) 495-7542', 'Maurice_Collins86@hotmail.com', 4, 'http://placeimg.com/640/480'),
('Lurline', 'Pagac', '69532 Schmidt View Suite 854', '611-604-9391 x9992', 'Rosendo_Kuhn96@gmail.com', 1, 'http://placeimg.com/640/480'),
('Leon', 'Yundt', '315 Domenico Crest Apt. 989', '621-913-8644', 'Rolando23@yahoo.com', 3, 'http://placeimg.com/640/480'),
('Scotty', 'Kiehn', '651 Marques Orchard Suite 315', '(888) 295-6751', 'Hillard_Jacobs@hotmail.com', 3, 'http://placeimg.com/640/480'),
('Carlotta', 'Steuber', '316 Kilback Viaduct Apt. 675', '1-721-804-1257 x201', 'Boris.Haag78@yahoo.com', 1, 'http://placeimg.com/640/480'),
('Juliana', 'Simonis', '490 Clementina Pines Suite 032', '929.446.7300 x142', 'Joyce20@yahoo.com', 3, 'http://placeimg.com/640/480'),
('Tyson', 'Frami', '2252 Greyson Union Suite 516', '977-404-3330 x0917', 'Santina_McDermott@gmail.com', 4, 'http://placeimg.com/640/480'),
('Garnett', 'Bailey', '250 Eva Rue Apt. 853', '(325) 720-9146 x35395', 'Eusebio80@yahoo.com', 4, 'http://placeimg.com/640/480'),
('Xander', 'Becker', '7158 Doris Throughway Suite 787', '1-427-428-5729 x514', 'Patrick_Walter@gmail.com', 4, 'http://placeimg.com/640/480'),
('Leda', 'Koepp', '563 Bergnaum Estate Apt. 678', '700-209-0514 x613', 'Brady.Ferry21@hotmail.com', 2, 'http://placeimg.com/640/480'),
('Brent', 'Prohaska', '801 Deshawn Forks Suite 180', '1-729-539-1059 x10525', 'Samantha_Schiller@hotmail.com', 2, 'http://placeimg.com/640/480'),
('Demarco', 'Hermiston', '54655 Esperanza Lodge Apt. 907', '864-919-6992', 'Madilyn_Jenkins46@hotmail.com', 3, 'http://placeimg.com/640/480'),
('Madeline', 'Bergstrom', '182 Bosco Orchard Apt. 087', '(783) 725-5020 x17437', 'Ward_Schulist41@yahoo.com', 1, 'http://placeimg.com/640/480'),
('Cristopher', 'Turner', '088 Deven Cape Apt. 858', '376.483.9932 x836', 'Trevion_Ritchie@hotmail.com', 2, 'http://placeimg.com/640/480'),
('Nella', 'Batz', '8070 Harrison Flats Suite 940', '(601) 554-4457 x21104', 'Harley.Mueller@yahoo.com', 3, 'http://placeimg.com/640/480'),
('Nia', 'Larkin', '25267 Schumm Forge Suite 072', '(985) 952-7744', 'Angus_Romaguera89@yahoo.com', 3, 'http://placeimg.com/640/480'),
('Jena', 'Mitchell', '8469 O''Conner Place Suite 578', '1-311-967-9231 x34502', 'Erna22@hotmail.com', 0, 'http://placeimg.com/640/480'),
('Stanton', 'Goodwin', '541 Humberto Curve Apt. 149', '697-429-9000 x02772', 'Talon99@hotmail.com', 4, 'http://placeimg.com/640/480'),
('Luigi', 'Tromp', '1757 Bo Motorway Suite 905', '1-990-266-4763 x538', 'Kelley_Ferry20@yahoo.com', 1, 'http://placeimg.com/640/480'),
('Mariana', 'Roob', '66138 Vivianne Camp Apt. 240', '573.787.2373', 'Camila_Hartmann@yahoo.com', 2, 'http://placeimg.com/640/480'),
('Yadira', 'Nikolaus', '0167 Collins Run Suite 925', '381-658-7923 x53950', 'Delilah9@gmail.com', 2, 'http://placeimg.com/640/480'),
('Dewitt', 'McDermott', '498 Kreiger Drives Suite 580', '515-884-1665 x524', 'Flo.Dibbert49@hotmail.com', 2, 'http://placeimg.com/640/480'),
('Missouri', 'Cummings', '212 Lynch Meadows Apt. 040', '(510) 694-3152 x6065', 'Everardo.Watsica33@gmail.com', 4, 'http://placeimg.com/640/480'),
('Alycia', 'MacGyver', '6970 Mosciski Grove Suite 889', '721-487-9127', 'Kasey.Smith67@yahoo.com', 1, 'http://placeimg.com/640/480'),
('Mona', 'Weber', '78180 Barrows Divide Suite 001', '623-765-0078 x91518', 'Marquis91@gmail.com', 1, 'http://placeimg.com/640/480'),
('Mustafa', 'Ritchie', '1658 Reid Way Suite 595', '361-683-3260 x9040', 'Shyanne.Ward@hotmail.com', 2, 'http://placeimg.com/640/480'),
('Keeley', 'Brown', '80764 Jacobson Inlet Apt. 224', '834.840.6869 x700', 'Judd3@hotmail.com', 1, 'http://placeimg.com/640/480'),
('Berenice', 'Kuphal', '30321 Kailee Passage Apt. 925', '1-324-548-5802 x19122', 'Lon.Schinner@hotmail.com', 1, 'http://placeimg.com/640/480'),
('Dock', 'Von', '864 Emmerich Village Suite 253', '516-777-0707', 'Golden.Fadel@hotmail.com', 3, 'http://placeimg.com/640/480'),
('Angeline', 'Schoen', '349 Haag Turnpike Suite 958', '1-387-576-7674 x597', 'Abe_Baumbach@gmail.com', 3, 'http://placeimg.com/640/480'),
('Dallin', 'Goyette', '02144 April Square Apt. 702', '(623) 970-4369', 'Dashawn_Armstrong17@yahoo.com', 2, 'http://placeimg.com/640/480'),
('Suzanne', 'Mayert', '081 Rogahn Hills Apt. 026', '311.348.6867', 'Jacey.Weber@yahoo.com', 3, 'http://placeimg.com/640/480'),
('Callie', 'Wyman', '3196 Hartmann Oval Suite 172', '229-476-5991', 'Piper_Pollich@hotmail.com', 3, 'http://placeimg.com/640/480'),
('Brendan', 'Kihn', '5974 Estevan Mountains Suite 153', '(572) 554-9939 x94678', 'Sonia3@yahoo.com', 0, 'http://placeimg.com/640/480'),
('Dee', 'Littel', '8403 Easton Fords Apt. 345', '516-928-7466 x273', 'Maci16@yahoo.com', 3, 'http://placeimg.com/640/480'),
('Ed', 'Harris', '55304 Sheldon Streets Suite 557', '968-399-2543 x7485', 'Ferne_Fisher@gmail.com', 4, 'http://placeimg.com/640/480'),
('Donna', 'Gorczany', '44666 Marquardt Key Apt. 286', '1-906-491-3161 x943', 'Alphonso45@hotmail.com', 3, 'http://placeimg.com/640/480');

COMMIT;