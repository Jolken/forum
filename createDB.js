'use strict'
const pg = require('pg');
var dbConfig = require('./config/db.js');
dbConfig.database = 'postgres';
var pool = new pg.Pool(dbConfig);

pool.connect((err, client, done) => {
    if (err) {
        console.log({'err' : err});
        pool.end();
    }
    else {
        client.query('CREATE DATABASE forum;', (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                dbConfig.database = 'forum';
                var forum = new pg.Pool(dbConfig);
                forum.connect((err, client, done) => {
                    if (err) {
                        console.log({ 'err': err });
                        pool.end();
                    }
                    else {
                        client.query(`CREATE TABLE p1 (
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
                                    	user	text,
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
                        );`, (err, result) => {
                            if (err) {
                                console.log({'err': err});
                                forum.end();
                                done();
                            }
                            else {
                                console.log(result);
                                forum.end();
                                done();
                            }
                            
                        });
                    }
                });
            }
            pool.end();
        });
    }
    done();
});
