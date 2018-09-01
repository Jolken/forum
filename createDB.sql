CREATE TABLE p1 (
	owner 	text,
	body	text,
	createDate	int,
	id		int	
);

CREATE TABLE threads (
	name	text,
	moders	text[]
);

CREATE TABLE users (
	name	text,
	pass	text,
	token	text,
	lvl		smallint,
	createDate	int,
	email	text
);

CREATE TABLE example (
	id		serial,
	owner 	text,
	body	text,
	title	text,
	date	int,
	minlvl	smallint
);

INSERT INTO code VALUES (1, 'su', 'asd', 'das', 27082018, 1);