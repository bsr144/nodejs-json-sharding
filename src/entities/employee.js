class Employee {
  constructor(id, name, managerId, created_at) {
    this.id = id;
    this.name = name;
    this.managerId = managerId;
    this.created_at = created_at;
    this.manager = null;
  }

  setManager(manager) {
    this.manager = manager;
  }

  hasManager() {
    return this.managerId;
  }
}

module.exports = Employee;
