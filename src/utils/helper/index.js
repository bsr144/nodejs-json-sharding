class Helper {
  objectIsNotEmpty = (obj) => Object.keys(obj).length > 0;
  formatDate = (date) => {
    const newDate = new Date(date);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Jakarta',
    });

    return dateFormatter.format(newDate);
  };
}

module.exports = Helper;
