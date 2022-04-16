BEGIN;
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
) VALUES 
(
	'admin',
	'admin',
	'45 rue fernand michel 84000 AVIGNON',
	'+33678956412',
	'admin@gmail.com',
	'$2b$10$lTVQtGpEs5mtr.eDhCR7xO9y4HClflgyyT0V350OItJuEHV4vOI.e',
	'thumbnail.jpg',
	'#269987',
	'admin',
	true,
	null
);
COMMIT;