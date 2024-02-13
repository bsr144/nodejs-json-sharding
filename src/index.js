require('dotenv').config({ path: process.cwd() + `/envs/.env.${process.env.NODE_ENV}` });

require('./drivers/rest/express');
