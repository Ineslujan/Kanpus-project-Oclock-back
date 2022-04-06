

Modification des datas sauf role et mot de passe
	UPDATE /user/former/:id   					* admin 
	UPDATE /user/trainee/:id  					* admin / former

Modification du mot de pass de l'utilisateur connecté
	UPDATE /user/password/    					* admin / former / trainee

Modification du mot de pass d'un autre utilisateur
	UPDATE /user/password/former/:id 			* admin
	UPDATE /user/password/trainee/:id 			* admin / former

GET MY-PROFIL

| METHOD | ROUTE                      |                    Accès |
|--------|----------------------------|--------------------------|
| UPDATE | /user/former/:user_id      |                    admin |
| UPDATE | /user/trainee/:user_id     |           admin / former |

| UPDATE | /user/password/            | admin / former / trainee |
| UPDATE | /user/password/:user_id 	  |                    admin |


```shell
git push heroku API-init:main

psql -d kanpus -f ./data/seed.sql
```

```sql

SELECT 
kanpus_user.id,
kanpus_user.firstname,
kanpus_user.lastname,
kanpus_user.address,
kanpus_user.phone_number,
kanpus_user.email,
kanpus_user.image,
kanpus_user.color,
kanpus_promo.name AS promo
FROM kanpus_user
FULL JOIN kanpus_promo ON kanpus_user.id = kanpus_promo.id
WHERE kanpus_user.id = 1
;
```