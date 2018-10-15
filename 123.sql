--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: coding; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coding (
    id integer NOT NULL,
    owner text,
    body text,
    title text,
    date integer,
    minlvl smallint
);


ALTER TABLE public.coding OWNER TO postgres;

--
-- Name: coding1; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coding1 (
    owner text,
    body text,
    createdate integer,
    id integer
);


ALTER TABLE public.coding1 OWNER TO postgres;

--
-- Name: coding_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coding_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coding_id_seq OWNER TO postgres;

--
-- Name: coding_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coding_id_seq OWNED BY public.coding.id;


--
-- Name: example; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.example (
    id integer NOT NULL,
    owner text,
    body text,
    title text,
    date integer,
    minlvl smallint
);


ALTER TABLE public.example OWNER TO postgres;

--
-- Name: example_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.example_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.example_id_seq OWNER TO postgres;

--
-- Name: example_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.example_id_seq OWNED BY public.example.id;


--
-- Name: global; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.global (
    post integer,
    comment integer
);


ALTER TABLE public.global OWNER TO postgres;

--
-- Name: p1; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.p1 (
    owner text,
    body text,
    createdate integer,
    id integer
);


ALTER TABLE public.p1 OWNER TO postgres;

--
-- Name: supatest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supatest (
    id integer NOT NULL,
    owner text,
    body text,
    title text,
    date integer,
    minlvl smallint
);


ALTER TABLE public.supatest OWNER TO postgres;

--
-- Name: supatest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.supatest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.supatest_id_seq OWNER TO postgres;

--
-- Name: supatest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.supatest_id_seq OWNED BY public.supatest.id;


--
-- Name: threads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.threads (
    name text,
    moders text[]
);


ALTER TABLE public.threads OWNER TO postgres;

--
-- Name: undefined; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.undefined (
    id integer NOT NULL,
    owner text,
    body text,
    title text,
    date integer,
    minlvl smallint
);


ALTER TABLE public.undefined OWNER TO postgres;

--
-- Name: undefined_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.undefined_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.undefined_id_seq OWNER TO postgres;

--
-- Name: undefined_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.undefined_id_seq OWNED BY public.undefined.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username text,
    pass text,
    token text,
    lvl smallint,
    createdate integer,
    email text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: coding id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coding ALTER COLUMN id SET DEFAULT nextval('public.coding_id_seq'::regclass);


--
-- Name: example id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.example ALTER COLUMN id SET DEFAULT nextval('public.example_id_seq'::regclass);


--
-- Name: supatest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supatest ALTER COLUMN id SET DEFAULT nextval('public.supatest_id_seq'::regclass);


--
-- Name: undefined id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.undefined ALTER COLUMN id SET DEFAULT nextval('public.undefined_id_seq'::regclass);


--
-- Data for Name: coding; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coding (id, owner, body, title, date, minlvl) FROM stdin;
0	0	0	0	0	4
1	jolken	kekekekek	i wanna	1	1
\.


--
-- Data for Name: coding1; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coding1 (owner, body, createdate, id) FROM stdin;
0	0	0	0
jolken	kekekekek	1	1
\.


--
-- Data for Name: example; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.example (id, owner, body, title, date, minlvl) FROM stdin;
\.


--
-- Data for Name: global; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.global (post, comment) FROM stdin;
\.


--
-- Data for Name: p1; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.p1 (owner, body, createdate, id) FROM stdin;
\.


--
-- Data for Name: supatest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supatest (id, owner, body, title, date, minlvl) FROM stdin;
\.


--
-- Data for Name: threads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.threads (name, moders) FROM stdin;
supatest	\N
undefined	\N
coding	\N
\.


--
-- Data for Name: undefined; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.undefined (id, owner, body, title, date, minlvl) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (username, pass, token, lvl, createdate, email) FROM stdin;
su12	123	6f56888547659c2df366e8b3f34c0962164fc9cb5a1740843d12949d71e6070f88817e2b19850caa398c715ce5e29df73f2d4f9422a954e7d22d53bb957b62d8d9ce53fc6d843952bd27d9491d3eb396d4fd2b9205c28121bcc5e9c60ffb725d56d6221d8543fd781816441c0af4ec7e1862b7632087570d7858b7ba9ada8b22b46cbaac9206a74232d444688bb9cb4225207cb16af61b8f1e85bbd70ae2b096c780d04c8bff9819202ef7cd0889970ed086f5e552314fa20482bfc213edc797f157ea327860ee8759f4721f6eae9f08c2a8e33cdf42aa448e64e268d1fd5e9d46ce3cca26357671f3efe8f1a8c3470e59d2b5aca3511a20eba18379d2248eca	0	11112011	jolken122@gmail.com
su	123	e6cf44b31a4c3720215f7c688aa04309f65ff4e9ca929cfde50daafe2ac04c9c9e7ebb15bfd1daa1f7964b8a01a8c18b0c5fbccc82f28590cb3410299bcb3ecb31c1096a1b52901580c967c25f4e05eff33221200809d4aad67c02f36b928620911445fcb622f2b26611699c23c1a81dc6e9a854807135a063b10286a54a271607286a06534d46314eb3928e41ecc01059e0f65690724129843367da70dae76e0fd63467d4ceebc72a4f2936a5d7cf7127be17179c20de58cbdbbd7ce374627ab1691bd6ddfae68be9c2f6c026ff3396892faaf605fa316632f6fe861975e4d138ddcc174557368655b4be6aadcc2f98d0f5f89fc9cd59eafb62ab08eb46014a	0	11112011	jolken122@gmail.com
jolken	123	867d5d031db6f2858a8e0bb96c98dea306a2327361f73a56dbb13d276eab45c5fa1ca515c66e8caf28b9093d458ea439130ca28aa0a5fad7629b0ba34237d5d11f8091c59dfabcd0f865d2e2a828a6b4c3a77713868cbde68a64f9275ce5479d731b05f224b9dab0e1083c3b6eab525ba8db3220a28a385785cff9b1181423763b392046acc631e641e125ac7fa18f36f674482265e8c4c01fb3f6b58fdf9b7e31f6f1e78137f33b31236075d08396f2496c3b3a85cf06b55fc70778405d04175eb664fe2690e45d3f4713f34688b51acf1870ffa85f2475e3a470b25cd6e95f5ed5b33d1ef1d50467544fc423bbbbd288e4d1a92aad8993086dcb82c7480656	0	11112011	jolken122@gmail.com
su1	123	a68b6aa38c3e3b7a8ebb23d838a5860c15d6c9a44e7886a6d16e4979e1ff0cb2f75d61bf2a78b361346bdc9ada7494c36f444c57e47bbb4d3a2343b2e507d9091010290f10045ae525876ff274f08ce986651bcdccaf4da5efe5bfa3a7e3dd45cdebe8f997f5497b81e7d8cba27d320bf41d290169760ca9169bad557ada9486e341b251c1bbe0bfa7baca94341d061ed34f87222eef1d235d46bb8b74b320bc01581295bca73831d4b69a32a2ca85764147cc2cfa9c5e3c209cae11e1f168ffe781950041e40915970c20eccab74881a59741253fefb856383ae2af146a4619bb533aed45e1f64d1a518e3b0b32cb6b4c245877d23a808275676d0b95113e66	0	11112011	jolken122@gmail.com
\.


--
-- Name: coding_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coding_id_seq', 1, false);


--
-- Name: example_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.example_id_seq', 1, false);


--
-- Name: supatest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.supatest_id_seq', 1, false);


--
-- Name: undefined_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.undefined_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

