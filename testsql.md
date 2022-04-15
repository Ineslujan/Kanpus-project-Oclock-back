# PERMISSIONS

## SIGNIN

| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/signin/                       |    ✔️  |   ✔️    |    ✔️    |    ✔️  |
|post    |/signin/                       |    ✔️  |   ✔️    |    ✔️    |    ✔️  |


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
|get     |/user/event_form/              |    ✔️  |   ✔️    |    ⛔    |    ⛔ |


## TRAINEE
| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/user/trainee/                 |    ✔️  |   ✔️    |    ⛔    |    ⛔ |
|get     |/user/trainee/:user_id         |    ✔️  |   ✔️    |    ⛔    |    ⛔ |
|get     |/user/trainee/:user_id         |    ✔️  |   ✔️    |    ⛔    |    ⛔ |
|post    |/user/trainee/                 |    ✔️  |   ✔️    |    ⛔    |    ⛔ |
|patch   |/user/trainee/:user_id         |    ✔️  |   ✔️    |    ⛔    |    ⛔ |
|delete  |/user/trainee/:user_id         |    ✔️  |   ✔️    |    ⛔    |    ⛔ |



## FORMER
| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/user/former                   |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|get     |/user/former/:user_id          |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|post    |/user/former/                  |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|patch   |/user/former/:user_id          |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|delete  |/user/former/:user_id          |    ✔️  |   ⛔   |    ⛔    |    ⛔ |


## PASSWORD
| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|patch   |/user/password                 |    ✔️  |   ✔️    |    ✔️    |    ⛔ |
|patch   |/user/password/:user_id        |    ✔️  |   ⛔   |    ⛔    |    ⛔ |


## PLACE
| METHOD | ROUTE                         | ADMIN | FORMER | TRAINEE | GUEST |
|--------|-------------------------------|-------|--------|---------|-------|
|get     |/user/former                   |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|get     |/user/former/:user_id          |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|post    |/user/former/                  |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|patch   |/user/former/:user_id          |    ✔️  |   ⛔   |    ⛔    |    ⛔ |
|delete  |/user/former/:user_id          |    ✔️  |   ⛔   |    ⛔    |    ⛔ |


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

heroku logs --tail

sqitch revert heroku
sqitch deploy heroku
heroku pg:psql -f ./data/seed-v2.sql
```
(
	'admin',
	'admin',
	'145 avenue admin Coty 84000 AVIGNON',
	'+33682564713',
	'admin@gmail.com',
	'$2b$10$lTVQtGpEs5mtr.eDhCR7xO9y4HClflgyyT0V350OItJuEHV4vOI.e',
	'thumbnail.png',
	'#269987',
	'admin',
	true,
	null
),
(
	'former',
	'former',
	'145 avenue admin Coty 84000 AVIGNON',
	'+33682564713',
	'former@gmail.com',
	'$2b$10$lTVQtGpEs5mtr.eDhCR7xO9y4HClflgyyT0V350OItJuEHV4vOI.e',
	'thumbnail.png',
	'#269987',
	'former',
	true,
	null
),
(
	'trainee',
	'trainee',
	'26 rue michel patoulachy 84000 AVIGNON',
	'+33698765426',
	'trainee@gmail.com',
	'$2b$10$lTVQtGpEs5mtr.eDhCR7xO9y4HClflgyyT0V350OItJuEHV4vOI.e',
	'thumbnail.png',
	'#269987',
	'trainee',
	null,
	1
)