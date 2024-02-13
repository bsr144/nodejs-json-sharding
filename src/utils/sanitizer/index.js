class Sanitizer {
  sanitizeQueryParams = (validatedQueryParams) => {
    if (validatedQueryParams.name) {
      validatedQueryParams.name.replace(/[^\w\s]/gi, '');
      validatedQueryParams.name = validatedQueryParams.name.toLowerCase();
    }

    return validatedQueryParams;
  };
}

module.exports = Sanitizer;
