

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


## SIGNIN

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/signin/                       |    ✔️  |   ✔️    |    ✔️    |    ✔️    |
|post    |/signin/                       |    ✔️  |   ✔️    |    ✔️    |    ✔️    |


## EVENT

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/event/organizer/:date         |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|post    |/event/check_date/:event_id    |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|post    |/event/                        |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|get     |/event/my_course/:page_number  |    ✔️  |   ✔️    |    ✔️    |    ⛔    |
|patch   |/event/:event_id               |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|get     |/event/:event_id               |    ✔️  |   ✔️    |    ✔️    |    ⛔    |
|delete  |/event/:event_id               |    ✔️  |   ✔️    |    ⛔    |    ⛔    |


## USER

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/user/event_form/              |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|get     |/user/trainee/                 |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|get     |/user/former                   |    ✔️  |   ⛔   |    ⛔    |    ⛔    |
|get     |/user/:user_id                 |    ✔️  |   ✔️    |    ⛔    |    ⛔    |*
|post    |/user/:role/                   |    ✔️  |   ✔️   |    ⛔    |    ⛔    |*
|patch   |/user/former/:user_id          |    ✔️  |   ⛔   |    ⛔    |    ⛔    |
|patch   |/user/trainee/:user_id         |    ✔️  |   ✔️   |    ⛔    |    ⛔    |
|patch   |/user/password                 |    ✔️  |   ✔️    |    ✔️    |    ⛔    |
|patch   |/user/password/:user_id        |    ✔️  |   ⛔   |    ⛔    |    ⛔    |
|delete  |/user/:user_id                 |    ✔️  |   ⛔   |    ⛔    |    ⛔    |*


## PLACE

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/place/                        |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|post    |/place/                        |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|patch   |/place/:place_id               |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|delete  |/place/:place_id               |    ✔️  |   ✔️    |    ⛔    |    ⛔    |


## PROMO

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/promo/                        |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|post    |/promo/                        |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|patch   |/promo/:promo_id               |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|delete  |/promo/:promo_id               |    ✔️  |   ✔️    |    ⛔    |    ⛔    |


## SETTINGS

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/settings/                     |    ✔️  |   ⛔   |    ⛔    |    ⛔    |
|put     |/settings/                     |    ✔️  |   ⛔   |    ⛔    |    ⛔    |


## ABSENCE

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/absence/:user_id              |    ✔️  |   ✔️    |    ⛔    |    ⛔    |
|patch   |/absence/:event_id             |    ✔️  |   ✔️    |    ⛔    |    ⛔    |



```shell
git push heroku API-init:main

psql -d kanpus -f ./data/seed.sql
```
