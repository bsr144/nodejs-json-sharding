const fs = require('fs');
const path = require('path');
const errorConstants = require('../../../utils/constants/error');
const validCredentials = require('../../../security/credentials/db');
const CustomError = require('../../../utils/error/custom_error');

function dbAuthenticator(dbConfig) {
  return {
    authenticateCredentialsAndLoadDb: function () {
      const hostCredentials = this.getHostCredentials(dbConfig.host);
      const dbName =
        this.isUsernameAndPasswordValid(hostCredentials, dbConfig) &&
        this.isDbnameValid(hostCredentials, dbConfig);
      return this.loadDb(dbName);
    },

    getHostCredentials: function (host) {
      const hostCredentials = validCredentials[host];
      if (hostCredentials) {
        return hostCredentials;
      }
      throw new Error(errorConstants.drivers.database.AUTH_HOST_ERROR_MESSAGE);
    },

    isDbnameValid: (hostCredentials, dbConfig) => {
      const validDbname = hostCredentials.dbname.find(
        (eachDbName) => eachDbName === dbConfig.dbname
      );
      if (!validDbname) {
        throw new Error(`the given database [${dbConfig.dbname}] doesn't exist in the system`);
      }
      return validDbname;
    },

    isUsernameAndPasswordValid: function (hostCredentials, dbConfig) {
      const password = hostCredentials[dbConfig.username];
      if (password) {
        if (password === dbConfig.password) {
          return true;
        }
        throw new Error(errorConstants.drivers.database.AUTH_PASSWORD_ERROR_MESSAGE);
      }
      throw new Error(errorConstants.drivers.database.AUTH_USERNAME_ERROR_MESSAGE);
    },

    loadDb: (dbname) => {
      try {
        const datasetsDirectory = path.join(__dirname, `../../../../datasets`);
        const filePath = path.join(datasetsDirectory, `${dbname}.json`);
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
      } catch (err) {
        throw new Error(`database [${dbname}] is not found: ${err.message}`);
      }
    },
  };
}

class MemoryDB {
  #data;
  constructor(dbConfig) {
    this.#data = dbAuthenticator(dbConfig).authenticateCredentialsAndLoadDb();
  }

  executeQuery = async (query) => {
    if (query[query.length - 1] !== ';') {
      throw new CustomError({
        type: 'DATABASE',
        status_code: 500,
        message: `query doesn't end with ';' annotation`,
      });
    }

    const results = [];

    if (query.startsWith('SELECT')) {
      const parts = query.split('WHERE');
      const selectClause = parts[0].split('SELECT')[1].split('FROM')[0].trim();
      const columns = selectClause === '*' ? Object.keys(this.#data[0]) : selectClause.split(',');
      const whereClause = parts[1];

      for (const row of this.#data) {
        if (this.evaluateWhereClause(row, whereClause)) {
          const resultRow = {};
          for (const col of columns) {
            const trimmedCol = col.trim();
            if (trimmedCol === '*') {
              Object.assign(resultRow, row);
            } else {
              resultRow[trimmedCol] = row[trimmedCol];
            }
          }
          results.push(resultRow);
        }
      }
    }
    return results;
  };

  evaluateWhereClause = (row, whereClause) => {
    if (!whereClause) {
      return true;
    }

    const [column, value] = whereClause.split('=').map((part) => part.trim());

    const condition = value.replace(/['";]/g, '') == row[column];

    return condition;
  };
}

module.exports = MemoryDB;
