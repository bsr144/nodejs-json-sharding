module.exports = {
  drivers: {
    database: {
      AUTH_PASSWORD_ERROR_MESSAGE:
        "failed to authenticate database connection, password doesn't match",
      AUTH_USERNAME_ERROR_MESSAGE:
        "failed to authenticate database connection, username doesn't match",
      AUTH_HOST_ERROR_MESSAGE:
        'failed to connect to database, the address (host) given is not found',
    },
  },
  custom_error: {
    type: {
      DATABASE: 'DatabaseError',
      CLIENT: 'ClientError',
      SERVER: 'ServerError',
      VALIDATION: 'ValidationError',
    },
  },
};
