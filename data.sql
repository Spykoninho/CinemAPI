create table movies
(
    id          serial
        constraint "PK_c5b2c134e871bfd1c2fe7cc3705"
            primary key,
    name        varchar                                not null,
    duration    integer                                not null,
    description varchar                                not null,
    "createdAt" timestamp with time zone default now() not null,
    "updatedAt" timestamp with time zone default now() not null
);

INSERT INTO public.movies (id, name, duration, description, "createdAt", "updatedAt") VALUES (1, 'Le Réveil de l''Ancienne Forêt', 145, 'Une aventure épique dans un monde oublié.', '2025-05-08 13:01:52.198752 +00:00', '2025-05-08 13:01:52.198752 +00:00');
INSERT INTO public.movies (id, name, duration, description, "createdAt", "updatedAt") VALUES (3, 'Code Rouge: Traque à Moscou', 128, 'Un thriller d''espionnage intense.', '2025-05-08 13:01:52.494080 +00:00', '2025-05-08 13:01:52.494080 +00:00');
INSERT INTO public.movies (id, name, duration, description, "createdAt", "updatedAt") VALUES (4, 'Les Chroniques de Zylos (Animation)', 88, 'Les héros de Zylos sauvent la galaxie.', '2025-05-08 13:01:52.553362 +00:00', '2025-05-08 13:01:52.553362 +00:00');
INSERT INTO public.movies (id, name, duration, description, "createdAt", "updatedAt") VALUES (5, 'Après la Pluie', 110, 'Un drame familial émouvant.', '2025-05-08 13:01:52.613212 +00:00', '2025-05-08 13:01:52.613212 +00:00');
INSERT INTO public.movies (id, name, duration, description, "createdAt", "updatedAt") VALUES (2, 'Wall-e 2', 400, 'Moins bien qu''avant', '2025-05-08 13:01:52.424301 +00:00', '2025-05-08 13:01:52.424301 +00:00');


create table rooms
(
    id                serial
        constraint "PK_0368a2d7c215f2d0458a54933f2"
            primary key,
    name              varchar                                not null,
    description       varchar                                not null,
    capacity          integer                                not null,
    type              rooms_type_enum                        not null,
    handicap_friendly boolean                  default false not null,
    maintenance       boolean                  default false not null,
    "createdAt"       timestamp with time zone default now() not null,
    "updatedAt"       timestamp with time zone default now() not null
);

INSERT INTO public.rooms (id, name, description, capacity, type, handicap_friendly, maintenance, "createdAt", "updatedAt") VALUES (1, 'Salle Aurore', 'Salle principale confortable.', 200, 'STANDARD', true, false, '2025-05-08 13:01:52.710789 +00:00', '2025-05-08 13:01:52.710789 +00:00');
INSERT INTO public.rooms (id, name, description, capacity, type, handicap_friendly, maintenance, "createdAt", "updatedAt") VALUES (2, 'Salle Crépuscule', 'Salle premium avec son immersif.', 150, 'IMAX', true, false, '2025-05-08 13:01:52.802126 +00:00', '2025-05-08 13:01:52.802126 +00:00');
INSERT INTO public.rooms (id, name, description, capacity, type, handicap_friendly, maintenance, "createdAt", "updatedAt") VALUES (3, 'Salle Zenith', 'Petite salle intimiste.', 75, 'STANDARD', false, false, '2025-05-08 13:01:52.881069 +00:00', '2025-05-08 13:01:52.881069 +00:00');


create table users
(
    id       serial
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    email    varchar         not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    password varchar         not null,
    role     users_role_enum not null,
    money    integer         not null
);

INSERT INTO public.users (id, email, password, role, money) VALUES (2, 'mathisfreamiot3@gmail.com', '$2b$10$IYJ640mR0Rxjjks8SvO7V.OXbXKmYHHgbV/LlxJnKUG7GwjCcwvky', 'CLIENT', 0);
INSERT INTO public.users (id, email, password, role, money) VALUES (1, 'admin@gmail.com', '$2b$10$DikZQ02vaMTRO7ZEdp72Ouf18vliBCntjkkpBHIoeAKCieH.4ffWq', 'ADMIN', 10000709);


create table refresh_tokens
(
    id               serial
        constraint "PK_7d8bee0204106019488c4c50ffa"
            primary key,
    "userId"         integer   not null,
    token            varchar   not null
        constraint "UQ_4542dd2f38a61354a040ba9fd57"
            unique,
    "expirationDate" timestamp not null
);

INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJDTElFTlQiLCJpYXQiOjE3NDY3MDkyNjIsImV4cCI6MTc0ODAwNTI2Mn0.P2Bjekmj4xNGhp_JQfCsmF1oGx3nY6gjSiFlsny234s', '2025-05-08 13:16:02.405000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcwOTMwMSwiZXhwIjoxNzQ4MDA1MzAxfQ.emdGg2pgvyQ1ASBqbhQYfrszElVCfiq0VdLPMTqc-5c', '2025-05-08 13:16:41.022000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcwOTY0MiwiZXhwIjoxNzQ4MDA1NjQyfQ.im8FRyKiPoCTNnDAbh3jN71ahJGbg6U3WGe5SK-0Jks', '2025-05-08 13:22:22.844000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcwOTc0MCwiZXhwIjoxNzQ4MDA1NzQwfQ.iKSWXJ305iHAoOkREunMoB4xnye6QQmmGGmSIo6YD1c', '2025-05-08 13:24:00.307000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcwOTk1MiwiZXhwIjoxNzQ4MDA1OTUyfQ.WXvC13LIynkfY3_57jhvnHTa6dzTD9h9zjamV8cAGyU', '2025-05-08 13:27:32.504000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (7, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMDAyMywiZXhwIjoxNzQ4MDA2MDIzfQ.rlREOG4nMEJbZ-Imr0cpQzjLgzGXe2kxRx04fEujOZU', '2025-05-08 13:28:43.503000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (8, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMDIwOSwiZXhwIjoxNzQ4MDA2MjA5fQ.vFHmXOL9qm2yk1FlV2R9IPfF_u6u1y5_6DcfT-oF74c', '2025-05-08 13:31:49.527000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (9, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMDU0NiwiZXhwIjoxNzQ4MDA2NTQ2fQ.wJeXOk4yGJw04phP9DC38TBfRFNa2rcebyfDYgTuIhk', '2025-05-08 13:37:26.914000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMDg3OCwiZXhwIjoxNzQ4MDA2ODc4fQ.JpqkKE9ry4vQdgKSpThu6BcLsLjjwCehmyVRVyoOC28', '2025-05-08 13:42:58.604000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMTE4NSwiZXhwIjoxNzQ4MDA3MTg1fQ.lfLvhcB82ykDLgC6C3H3kHDoU5VS0EHLHgGgOyeqoZo', '2025-05-08 13:48:05.370000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (12, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMTUwNCwiZXhwIjoxNzQ4MDA3NTA0fQ.aBvKhTbX9a2plbRc77QO_1A7r_xYi7_lP7PpHD9klQI', '2025-05-08 13:53:24.266000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (13, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMTgxNiwiZXhwIjoxNzQ4MDA3ODE2fQ.KrtlBXUE3LU0jQV5NrrH4ZZs7525vyqhWvmPRpmh4TI', '2025-05-08 13:58:36.419000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (14, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMzQxMywiZXhwIjoxNzQ4MDA5NDEzfQ.XVrtEVkD7S5Z_kxo7902NdbkHROZZ8ImY9wR-_TEDl4', '2025-05-08 14:25:13.695000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (15, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxMzg4MywiZXhwIjoxNzQ4MDA5ODgzfQ._CMfwq6_7GiEw2ep6XDE9s_CtJBJ9aouJcP8vbZLSpg', '2025-05-08 14:33:03.289000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (16, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxNTA2NCwiZXhwIjoxNzQ4MDExMDY0fQ.as3EKBwjTexR3Da3KuyS2IUAv87TUJwP-89fADFqCJQ', '2025-05-08 14:52:44.946000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (17, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxNTY4NCwiZXhwIjoxNzQ4MDExNjg0fQ.gS5z3W8kw32DQjWYnl6FBFMuH6eW8-cLTr9NLYNTQ7w', '2025-05-08 15:03:04.073000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (18, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NjcxNzMxMSwiZXhwIjoxNzQ4MDEzMzExfQ.M2sf_TS_9Nkis4-iE61JGuXzxTUWqit0P_iPWodokNw', '2025-05-08 15:30:11.052000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (19, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NDc5NSwiZXhwIjoxNzQ4MjcwNzk1fQ.Q0DTDjwOsPAR-M2qpG4_-lc1f-SCfHfCj5Quek32vcM', '2025-05-11 15:01:35.970000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (20, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhpc2ZyZWFtaW90M0BnbWFpbC5jb20iLCJyb2xlIjoiQ0xJRU5UIiwiaWF0IjoxNzQ2OTc0ODA5LCJleHAiOjE3NDgyNzA4MDl9.GIfPh-bx6cFxWcEO1JNEO_qTSLWHsBIx0Mejpoq_ZNc', '2025-05-11 15:01:49.879000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (22, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NDgyMSwiZXhwIjoxNzQ4MjcwODIxfQ.GTILZLr6XHwNBzEeKFGfjU2h78TNGw9fbOqC75UthwM', '2025-05-11 15:02:01.929000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (23, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NTEzMiwiZXhwIjoxNzQ4MjcxMTMyfQ.bcqLQ6tsbbOBOh6IyN5ROh9OIWSG3MDABx4yDV96AdM', '2025-05-11 15:07:12.502000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (24, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NTEzNiwiZXhwIjoxNzQ4MjcxMTM2fQ.XdyheBsNEDeTjHWrnBK7o-pEnaMsNn3WYr0WVmVMQXk', '2025-05-11 15:07:16.054000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (25, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NTQ0OSwiZXhwIjoxNzQ4MjcxNDQ5fQ.YZX2S5nALpYMRDAXDtd_VjjF02qWTqJvfo63xtCxpbw', '2025-05-11 15:12:29.418000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (26, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NTQ3NiwiZXhwIjoxNzQ4MjcxNDc2fQ.e6E_tAYz-ojkYanS5ZmWv0CF3D5PtEfpkRbsiOj8nZs', '2025-05-11 15:12:56.127000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (27, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NTc5MiwiZXhwIjoxNzQ4MjcxNzkyfQ.JQp9N6KnY33TzN_0jPCjM_K567c7QMp4Jv61QuYr_ao', '2025-05-11 15:18:12.094000');
INSERT INTO public.refresh_tokens (id, "userId", token, "expirationDate") VALUES (28, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0Njk3NTg2NiwiZXhwIjoxNzQ4MjcxODY2fQ.l1awxFsOurJfcUW87Nl2V1XROIOJm2s4TY6AGtZcZLg', '2025-05-11 15:19:26.061000');


create table room_images
(
    id          serial
        constraint "PK_ac049009c777706919d50237ecf"
            primary key,
    filename    varchar                                not null,
    "createdAt" timestamp with time zone default now() not null,
    "updatedAt" timestamp with time zone default now() not null,
    "roomId"    integer
        constraint "FK_b3799f499d5004e9595a3ab59cf"
            references rooms
);

INSERT INTO public.room_images (id, filename, "createdAt", "updatedAt", "roomId") VALUES (1, '1/1746710889966-111909438.jpg', '2025-05-08 13:28:10.038182 +00:00', '2025-05-08 13:28:10.038182 +00:00', 1);
INSERT INTO public.room_images (id, filename, "createdAt", "updatedAt", "roomId") VALUES (3, '1/1746711093917-111909438.jpg', '2025-05-08 13:31:33.952641 +00:00', '2025-05-08 13:31:33.952641 +00:00', 1);
INSERT INTO public.room_images (id, filename, "createdAt", "updatedAt", "roomId") VALUES (4, '1/1746975946627-111909438.jpg', '2025-05-11 15:05:46.763186 +00:00', '2025-05-11 15:05:46.763186 +00:00', 1);
INSERT INTO public.room_images (id, filename, "createdAt", "updatedAt", "roomId") VALUES (5, '1/1746976044352-111909438.jpg', '2025-05-11 15:07:24.434998 +00:00', '2025-05-11 15:07:24.434998 +00:00', 1);


create table sessions
(
    id            serial
        constraint "PK_3238ef96f18b355b671619111bc"
            primary key,
    start_session timestamp with time zone not null,
    end_session   timestamp with time zone not null,
    id_movie      integer                  not null,
    id_room       integer                  not null,
    "movieId"     integer
        constraint "FK_634b9dee3787a14c1d7b6e893f2"
            references movies
);

INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (1, '2025-05-09 10:00:00.000000 +00:00', '2025-05-09 12:02:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (2, '2025-05-09 14:30:00.000000 +00:00', '2025-05-09 17:08:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (3, '2025-05-09 10:00:00.000000 +00:00', '2025-05-09 12:38:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (4, '2025-05-09 14:30:00.000000 +00:00', '2025-05-09 16:28:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (5, '2025-05-09 10:00:00.000000 +00:00', '2025-05-09 11:58:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (6, '2025-05-09 14:30:00.000000 +00:00', '2025-05-09 16:50:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (7, '2025-05-10 10:00:00.000000 +00:00', '2025-05-10 12:38:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (8, '2025-05-10 14:30:00.000000 +00:00', '2025-05-10 16:28:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (9, '2025-05-10 10:00:00.000000 +00:00', '2025-05-10 11:58:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (10, '2025-05-10 14:30:00.000000 +00:00', '2025-05-10 16:50:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (11, '2025-05-10 10:00:00.000000 +00:00', '2025-05-10 12:20:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (12, '2025-05-10 14:30:00.000000 +00:00', '2025-05-10 17:25:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (13, '2025-05-11 10:00:00.000000 +00:00', '2025-05-11 11:58:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (14, '2025-05-11 14:30:00.000000 +00:00', '2025-05-11 16:50:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (15, '2025-05-11 10:00:00.000000 +00:00', '2025-05-11 12:20:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (16, '2025-05-11 14:30:00.000000 +00:00', '2025-05-11 17:25:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (17, '2025-05-11 10:00:00.000000 +00:00', '2025-05-11 12:55:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (18, '2025-05-11 14:30:00.000000 +00:00', '2025-05-11 16:32:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (19, '2025-05-12 10:00:00.000000 +00:00', '2025-05-12 12:20:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (20, '2025-05-12 14:30:00.000000 +00:00', '2025-05-12 17:25:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (21, '2025-05-12 10:00:00.000000 +00:00', '2025-05-12 12:55:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (22, '2025-05-12 14:30:00.000000 +00:00', '2025-05-12 16:32:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (23, '2025-05-12 10:00:00.000000 +00:00', '2025-05-12 12:02:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (24, '2025-05-12 14:30:00.000000 +00:00', '2025-05-12 17:08:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (25, '2025-05-13 10:00:00.000000 +00:00', '2025-05-13 12:55:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (26, '2025-05-13 14:30:00.000000 +00:00', '2025-05-13 16:32:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (27, '2025-05-13 10:00:00.000000 +00:00', '2025-05-13 12:02:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (28, '2025-05-13 14:30:00.000000 +00:00', '2025-05-13 17:08:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (29, '2025-05-13 10:00:00.000000 +00:00', '2025-05-13 12:38:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (30, '2025-05-13 14:30:00.000000 +00:00', '2025-05-13 16:28:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (31, '2025-05-14 10:00:00.000000 +00:00', '2025-05-14 12:02:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (32, '2025-05-14 14:30:00.000000 +00:00', '2025-05-14 17:08:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (33, '2025-05-14 10:00:00.000000 +00:00', '2025-05-14 12:38:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (34, '2025-05-14 14:30:00.000000 +00:00', '2025-05-14 16:28:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (35, '2025-05-14 10:00:00.000000 +00:00', '2025-05-14 11:58:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (36, '2025-05-14 14:30:00.000000 +00:00', '2025-05-14 16:50:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (37, '2025-05-15 10:00:00.000000 +00:00', '2025-05-15 12:38:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (38, '2025-05-15 14:30:00.000000 +00:00', '2025-05-15 16:28:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (39, '2025-05-15 10:00:00.000000 +00:00', '2025-05-15 11:58:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (40, '2025-05-15 14:30:00.000000 +00:00', '2025-05-15 16:50:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (41, '2025-05-15 10:00:00.000000 +00:00', '2025-05-15 12:20:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (42, '2025-05-15 14:30:00.000000 +00:00', '2025-05-15 17:25:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (43, '2025-05-16 10:00:00.000000 +00:00', '2025-05-16 11:58:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (44, '2025-05-16 14:30:00.000000 +00:00', '2025-05-16 16:50:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (45, '2025-05-16 10:00:00.000000 +00:00', '2025-05-16 12:20:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (46, '2025-05-16 14:30:00.000000 +00:00', '2025-05-16 17:25:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (47, '2025-05-16 10:00:00.000000 +00:00', '2025-05-16 12:55:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (48, '2025-05-16 14:30:00.000000 +00:00', '2025-05-16 16:32:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (49, '2025-05-17 10:00:00.000000 +00:00', '2025-05-17 12:20:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (50, '2025-05-17 14:30:00.000000 +00:00', '2025-05-17 17:25:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (51, '2025-05-17 10:00:00.000000 +00:00', '2025-05-17 12:55:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (52, '2025-05-17 14:30:00.000000 +00:00', '2025-05-17 16:32:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (53, '2025-05-17 10:00:00.000000 +00:00', '2025-05-17 12:02:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (54, '2025-05-17 14:30:00.000000 +00:00', '2025-05-17 17:08:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (55, '2025-05-18 10:00:00.000000 +00:00', '2025-05-18 12:55:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (56, '2025-05-18 14:30:00.000000 +00:00', '2025-05-18 16:32:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (57, '2025-05-18 10:00:00.000000 +00:00', '2025-05-18 12:02:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (58, '2025-05-18 14:30:00.000000 +00:00', '2025-05-18 17:08:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (59, '2025-05-18 10:00:00.000000 +00:00', '2025-05-18 12:38:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (60, '2025-05-18 14:30:00.000000 +00:00', '2025-05-18 16:28:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (61, '2025-05-19 10:00:00.000000 +00:00', '2025-05-19 12:02:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (62, '2025-05-19 14:30:00.000000 +00:00', '2025-05-19 17:08:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (63, '2025-05-19 10:00:00.000000 +00:00', '2025-05-19 12:38:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (64, '2025-05-19 14:30:00.000000 +00:00', '2025-05-19 16:28:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (65, '2025-05-19 10:00:00.000000 +00:00', '2025-05-19 11:58:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (66, '2025-05-19 14:30:00.000000 +00:00', '2025-05-19 16:50:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (67, '2025-05-20 10:00:00.000000 +00:00', '2025-05-20 12:38:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (68, '2025-05-20 14:30:00.000000 +00:00', '2025-05-20 16:28:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (69, '2025-05-20 10:00:00.000000 +00:00', '2025-05-20 11:58:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (70, '2025-05-20 14:30:00.000000 +00:00', '2025-05-20 16:50:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (71, '2025-05-20 10:00:00.000000 +00:00', '2025-05-20 12:20:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (72, '2025-05-20 14:30:00.000000 +00:00', '2025-05-20 17:25:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (73, '2025-05-21 10:00:00.000000 +00:00', '2025-05-21 11:58:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (74, '2025-05-21 14:30:00.000000 +00:00', '2025-05-21 16:50:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (75, '2025-05-21 10:00:00.000000 +00:00', '2025-05-21 12:20:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (76, '2025-05-21 14:30:00.000000 +00:00', '2025-05-21 17:25:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (77, '2025-05-21 10:00:00.000000 +00:00', '2025-05-21 12:55:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (78, '2025-05-21 14:30:00.000000 +00:00', '2025-05-21 16:32:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (79, '2025-05-22 10:00:00.000000 +00:00', '2025-05-22 12:20:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (80, '2025-05-22 14:30:00.000000 +00:00', '2025-05-22 17:25:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (81, '2025-05-22 10:00:00.000000 +00:00', '2025-05-22 12:55:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (82, '2025-05-22 14:30:00.000000 +00:00', '2025-05-22 16:32:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (83, '2025-05-22 10:00:00.000000 +00:00', '2025-05-22 12:02:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (84, '2025-05-22 14:30:00.000000 +00:00', '2025-05-22 17:08:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (85, '2025-05-23 10:00:00.000000 +00:00', '2025-05-23 12:55:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (86, '2025-05-23 14:30:00.000000 +00:00', '2025-05-23 16:32:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (87, '2025-05-23 10:00:00.000000 +00:00', '2025-05-23 12:02:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (88, '2025-05-23 14:30:00.000000 +00:00', '2025-05-23 17:08:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (89, '2025-05-23 10:00:00.000000 +00:00', '2025-05-23 12:38:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (90, '2025-05-23 14:30:00.000000 +00:00', '2025-05-23 16:28:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (91, '2025-05-24 10:00:00.000000 +00:00', '2025-05-24 12:02:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (92, '2025-05-24 14:30:00.000000 +00:00', '2025-05-24 17:08:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (93, '2025-05-24 10:00:00.000000 +00:00', '2025-05-24 12:38:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (94, '2025-05-24 14:30:00.000000 +00:00', '2025-05-24 16:28:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (95, '2025-05-24 10:00:00.000000 +00:00', '2025-05-24 11:58:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (96, '2025-05-24 14:30:00.000000 +00:00', '2025-05-24 16:50:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (97, '2025-05-25 10:00:00.000000 +00:00', '2025-05-25 12:38:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (98, '2025-05-25 14:30:00.000000 +00:00', '2025-05-25 16:28:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (99, '2025-05-25 10:00:00.000000 +00:00', '2025-05-25 11:58:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (100, '2025-05-25 14:30:00.000000 +00:00', '2025-05-25 16:50:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (101, '2025-05-25 10:00:00.000000 +00:00', '2025-05-25 12:20:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (102, '2025-05-25 14:30:00.000000 +00:00', '2025-05-25 17:25:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (103, '2025-05-26 10:00:00.000000 +00:00', '2025-05-26 11:58:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (104, '2025-05-26 14:30:00.000000 +00:00', '2025-05-26 16:50:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (105, '2025-05-26 10:00:00.000000 +00:00', '2025-05-26 12:20:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (106, '2025-05-26 14:30:00.000000 +00:00', '2025-05-26 17:25:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (107, '2025-05-26 10:00:00.000000 +00:00', '2025-05-26 12:55:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (108, '2025-05-26 14:30:00.000000 +00:00', '2025-05-26 16:32:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (109, '2025-05-27 10:00:00.000000 +00:00', '2025-05-27 12:20:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (110, '2025-05-27 14:30:00.000000 +00:00', '2025-05-27 17:25:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (111, '2025-05-27 10:00:00.000000 +00:00', '2025-05-27 12:55:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (112, '2025-05-27 14:30:00.000000 +00:00', '2025-05-27 16:32:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (113, '2025-05-27 10:00:00.000000 +00:00', '2025-05-27 12:02:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (114, '2025-05-27 14:30:00.000000 +00:00', '2025-05-27 17:08:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (115, '2025-05-28 10:00:00.000000 +00:00', '2025-05-28 12:55:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (116, '2025-05-28 14:30:00.000000 +00:00', '2025-05-28 16:32:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (117, '2025-05-28 10:00:00.000000 +00:00', '2025-05-28 12:02:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (118, '2025-05-28 14:30:00.000000 +00:00', '2025-05-28 17:08:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (119, '2025-05-28 10:00:00.000000 +00:00', '2025-05-28 12:38:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (120, '2025-05-28 14:30:00.000000 +00:00', '2025-05-28 16:28:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (121, '2025-05-29 10:00:00.000000 +00:00', '2025-05-29 12:02:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (122, '2025-05-29 14:30:00.000000 +00:00', '2025-05-29 17:08:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (123, '2025-05-29 10:00:00.000000 +00:00', '2025-05-29 12:38:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (124, '2025-05-29 14:30:00.000000 +00:00', '2025-05-29 16:28:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (125, '2025-05-29 10:00:00.000000 +00:00', '2025-05-29 11:58:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (126, '2025-05-29 14:30:00.000000 +00:00', '2025-05-29 16:50:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (127, '2025-05-30 10:00:00.000000 +00:00', '2025-05-30 12:38:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (128, '2025-05-30 14:30:00.000000 +00:00', '2025-05-30 16:28:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (129, '2025-05-30 10:00:00.000000 +00:00', '2025-05-30 11:58:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (130, '2025-05-30 14:30:00.000000 +00:00', '2025-05-30 16:50:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (131, '2025-05-30 10:00:00.000000 +00:00', '2025-05-30 12:20:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (132, '2025-05-30 14:30:00.000000 +00:00', '2025-05-30 17:25:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (133, '2025-05-31 10:00:00.000000 +00:00', '2025-05-31 11:58:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (134, '2025-05-31 14:30:00.000000 +00:00', '2025-05-31 16:50:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (135, '2025-05-31 10:00:00.000000 +00:00', '2025-05-31 12:20:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (136, '2025-05-31 14:30:00.000000 +00:00', '2025-05-31 17:25:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (137, '2025-05-31 10:00:00.000000 +00:00', '2025-05-31 12:55:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (138, '2025-05-31 14:30:00.000000 +00:00', '2025-05-31 16:32:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (139, '2025-06-01 10:00:00.000000 +00:00', '2025-06-01 12:20:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (140, '2025-06-01 14:30:00.000000 +00:00', '2025-06-01 17:25:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (141, '2025-06-01 10:00:00.000000 +00:00', '2025-06-01 12:55:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (142, '2025-06-01 14:30:00.000000 +00:00', '2025-06-01 16:32:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (143, '2025-06-01 10:00:00.000000 +00:00', '2025-06-01 12:02:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (144, '2025-06-01 14:30:00.000000 +00:00', '2025-06-01 17:08:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (145, '2025-06-02 10:00:00.000000 +00:00', '2025-06-02 12:55:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (146, '2025-06-02 14:30:00.000000 +00:00', '2025-06-02 16:32:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (147, '2025-06-02 10:00:00.000000 +00:00', '2025-06-02 12:02:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (148, '2025-06-02 14:30:00.000000 +00:00', '2025-06-02 17:08:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (149, '2025-06-02 10:00:00.000000 +00:00', '2025-06-02 12:38:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (150, '2025-06-02 14:30:00.000000 +00:00', '2025-06-02 16:28:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (151, '2025-06-03 10:00:00.000000 +00:00', '2025-06-03 12:02:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (152, '2025-06-03 14:30:00.000000 +00:00', '2025-06-03 17:08:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (153, '2025-06-03 10:00:00.000000 +00:00', '2025-06-03 12:38:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (154, '2025-06-03 14:30:00.000000 +00:00', '2025-06-03 16:28:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (155, '2025-06-03 10:00:00.000000 +00:00', '2025-06-03 11:58:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (156, '2025-06-03 14:30:00.000000 +00:00', '2025-06-03 16:50:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (157, '2025-06-04 10:00:00.000000 +00:00', '2025-06-04 12:38:00.000000 +00:00', 3, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (158, '2025-06-04 14:30:00.000000 +00:00', '2025-06-04 16:28:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (159, '2025-06-04 10:00:00.000000 +00:00', '2025-06-04 11:58:00.000000 +00:00', 4, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (160, '2025-06-04 14:30:00.000000 +00:00', '2025-06-04 16:50:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (161, '2025-06-04 10:00:00.000000 +00:00', '2025-06-04 12:20:00.000000 +00:00', 5, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (162, '2025-06-04 14:30:00.000000 +00:00', '2025-06-04 17:25:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (163, '2025-06-05 10:00:00.000000 +00:00', '2025-06-05 11:58:00.000000 +00:00', 4, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (164, '2025-06-05 14:30:00.000000 +00:00', '2025-06-05 16:50:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (165, '2025-06-05 10:00:00.000000 +00:00', '2025-06-05 12:20:00.000000 +00:00', 5, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (166, '2025-06-05 14:30:00.000000 +00:00', '2025-06-05 17:25:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (167, '2025-06-05 10:00:00.000000 +00:00', '2025-06-05 12:55:00.000000 +00:00', 1, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (168, '2025-06-05 14:30:00.000000 +00:00', '2025-06-05 16:32:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (169, '2025-06-06 10:00:00.000000 +00:00', '2025-06-06 12:20:00.000000 +00:00', 5, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (170, '2025-06-06 14:30:00.000000 +00:00', '2025-06-06 17:25:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (171, '2025-06-06 10:00:00.000000 +00:00', '2025-06-06 12:55:00.000000 +00:00', 1, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (172, '2025-06-06 14:30:00.000000 +00:00', '2025-06-06 16:32:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (173, '2025-06-06 10:00:00.000000 +00:00', '2025-06-06 12:02:00.000000 +00:00', 2, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (174, '2025-06-06 14:30:00.000000 +00:00', '2025-06-06 17:08:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (175, '2025-06-07 10:00:00.000000 +00:00', '2025-06-07 12:55:00.000000 +00:00', 1, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (176, '2025-06-07 14:30:00.000000 +00:00', '2025-06-07 16:32:00.000000 +00:00', 2, 1, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (177, '2025-06-07 10:00:00.000000 +00:00', '2025-06-07 12:02:00.000000 +00:00', 2, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (178, '2025-06-07 14:30:00.000000 +00:00', '2025-06-07 17:08:00.000000 +00:00', 3, 2, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (179, '2025-06-07 10:00:00.000000 +00:00', '2025-06-07 12:38:00.000000 +00:00', 3, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (180, '2025-06-07 14:30:00.000000 +00:00', '2025-06-07 16:28:00.000000 +00:00', 4, 3, null);
INSERT INTO public.sessions (id, start_session, end_session, id_movie, id_room, "movieId") VALUES (181, '2025-05-11 16:51:51.236000 +00:00', '2025-05-11 19:46:51.236000 +00:00', 1, 1, null);


create table tickets
(
    id                  serial
        constraint "PK_343bc942ae261cf7a1377f48fd0"
            primary key,
    "sessionId"         integer,
    "userId"            integer                                not null,
    "purchaseDate"      timestamp with time zone default now() not null,
    "isSuperTicket"     boolean                                not null,
    "remainingSessions" integer
);

INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (1, 1, 1, '2025-05-08 13:02:12.074000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (2, 2, 1, '2025-05-08 13:02:12.181000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (3, 7, 1, '2025-05-08 13:02:12.293000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (4, 8, 1, '2025-05-08 13:02:12.462000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (5, 13, 1, '2025-05-08 13:02:12.749000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (6, 25, 1, '2025-05-08 13:02:12.920000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (7, 50, 1, '2025-05-08 13:02:13.167000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (8, 100, 1, '2025-05-08 13:02:13.262000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (9, 150, 1, '2025-05-08 13:02:13.367000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (12, 1, 1, '2025-05-08 13:14:06.346000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (13, 1, 1, '2025-05-08 13:14:23.526000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (14, 1, 1, '2025-05-08 13:14:33.311000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (15, 1, 1, '2025-05-08 13:16:13.303000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (16, 1, 1, '2025-05-08 13:16:25.950000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (10, null, 1, '2025-05-08 13:02:13.435000 +00:00', true, 7);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (18, 181, 1, '2025-05-11 14:50:36.689000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (11, null, 1, '2025-05-08 13:02:13.506000 +00:00', true, 7);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (19, 181, 1, '2025-05-11 14:50:37.674000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (17, null, 1, '2025-05-11 14:47:40.328000 +00:00', true, 9);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (20, 181, 1, '2025-05-11 14:50:41.602000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (21, 181, 1, '2025-05-11 14:57:52.292000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (22, 181, 1, '2025-05-11 14:57:53.488000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (23, 181, 1, '2025-05-11 14:57:54.144000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (24, 181, 1, '2025-05-11 14:57:54.691000 +00:00', false, 0);
INSERT INTO public.tickets (id, "sessionId", "userId", "purchaseDate", "isSuperTicket", "remainingSessions") VALUES (25, 181, 1, '2025-05-11 14:57:55.302000 +00:00', false, 0);


create table transactions
(
    id                serial
        constraint "PK_a219afd8dd77ed80f5a862f1db9"
            primary key,
    "userId"          integer                                not null,
    amount            integer                                not null,
    "transactionDate" timestamp with time zone default now() not null,
    "transactionType" varchar                                not null
);

INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (1, 1, 10, '2025-05-08 13:02:12.084000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (2, 1, 10, '2025-05-08 13:02:12.204000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (3, 1, 10, '2025-05-08 13:02:12.297000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (4, 1, 10, '2025-05-08 13:02:12.468000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (5, 1, 10, '2025-05-08 13:02:12.762000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (6, 1, 10, '2025-05-08 13:02:12.927000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (7, 1, 10, '2025-05-08 13:02:13.174000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (8, 1, 10, '2025-05-08 13:02:13.268000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (9, 1, 10, '2025-05-08 13:02:13.374000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (10, 1, 100, '2025-05-08 13:02:13.439000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (11, 1, 100, '2025-05-08 13:02:13.512000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (12, 1, 100, '2025-05-08 13:10:03.592000 +00:00', 'DEPOSIT');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (13, 1, 100, '2025-05-08 13:10:05.293000 +00:00', 'DEPOSIT');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (14, 1, 100, '2025-05-08 13:10:05.980000 +00:00', 'DEPOSIT');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (15, 1, 10, '2025-05-08 13:10:11.017000 +00:00', 'WITHDRAW');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (16, 1, 10, '2025-05-08 13:10:11.994000 +00:00', 'WITHDRAW');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (17, 1, 10, '2025-05-08 13:10:12.265000 +00:00', 'WITHDRAW');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (18, 1, 10, '2025-05-08 13:10:13.028000 +00:00', 'WITHDRAW');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (19, 1, 10, '2025-05-08 13:14:23.581000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (20, 1, 1000, '2025-05-11 14:47:23.973000 +00:00', 'DEPOSIT');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (21, 1, 100, '2025-05-11 14:47:28.373000 +00:00', 'WITHDRAW');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (22, 1, 100, '2025-05-11 14:47:40.339000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (23, 1, 10, '2025-05-11 14:57:52.303000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (24, 1, 10, '2025-05-11 14:57:53.495000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (25, 1, 10, '2025-05-11 14:57:54.155000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (26, 1, 10, '2025-05-11 14:57:54.704000 +00:00', 'TICKET');
INSERT INTO public.transactions (id, "userId", amount, "transactionDate", "transactionType") VALUES (27, 1, 10, '2025-05-11 14:57:55.313000 +00:00', 'TICKET');
