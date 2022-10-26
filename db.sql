drop table if exists order_items;
drop table if exists orders;
drop table if exists coupons;
drop table if exists items;
drop table if exists zipcodes;

create table items (
	id_item serial primary key,
  category text,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into items (category, description, price, width, height, length, weight) values ('Música', 'CD', 30, 30, 30, 10, 0.3);
insert into items (category, description, price, width, height, length, weight) values ('Vídeo', 'DVD', 50, 40, 20, 10, 0.5);
insert into items (category, description, price, width, height, length, weight) values ('Vídeo', 'VHS', 10, 40, 20, 10, 0.5);
insert into items (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3);
insert into items (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Amplificador', 5000, 50, 50, 50, 20);
insert into items (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Cabo', 30, 10, 10, 10, 1);

create table zipcodes (
	code text primary key,
	street text,
	neighborhood text,
	lat numeric,
	long numeric
);

insert into zipcodes (code, street, neighborhood, lat, long) values ('88015600', 'Rua Almirante Lamego', 'Centro', -27.5945, -48.5477);
insert into zipcodes (code, street, neighborhood, lat, long) values ('22060030', 'Rua Aires Saldanha', 'Copacabana', -22.9129, -43.2003);

create table orders (
	id_order serial primary key,
	code text,
	cpf text,
	freight numeric,
	issue_date timestamp,
	total numeric,
	coupon_code text,
	coupon_percentage integer,
	sequence integer
);

create table order_items (
	id_order integer references orders (id_order),
	id_item integer references items (id_item),
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);

create table coupons (
	code text primary key,
	percentage integer,
	expire_date timestamp
);

insert into coupons (code, percentage, expire_date) values ('VALE10', 10, '2055-06-22 10:10:25-07');
insert into coupons (code, percentage, expire_date) values ('VALE20', 20, '2052-06-22 10:10:25-07');
insert into coupons (code, percentage, expire_date) values ('VALE30', 30, '2050-06-22 10:10:25-07');
