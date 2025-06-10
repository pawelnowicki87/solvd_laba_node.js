const DataTransformLib = {
  addValues: function (a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    } else if (typeof a === 'string' || typeof b === 'string') {
      return String(a) + String(b);
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    } else if (typeof a === 'object' && typeof b === 'object') {
      return { ...a, ...b };
    } else {
      throw new Error('Values are incorrect');
    }
  },

  stringifyValue: function (value) {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    } else {
      return String(value);
    }
  },

  invertBoolean: function (value) {
    if (typeof value !== 'boolean') {
      throw new Error('Value needs to be boolean');
    }
    return !value;
  },

  convertToNumber: function (value) {
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (isNaN(num)) {
      throw new Error('Cannot do such operation');
    }
    return num;
  },

  coerceToType: function (value, type) {
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        const num = Number(value);
        if (isNaN(num)) throw new Error('Cannot do the operation');
        return num;
      case 'boolean':
        return Boolean(value);
      case 'object':
        if (typeof value === 'object') return value;
        try {
          return JSON.parse(value);
        } catch {
          throw new Error('Cannot do the operation');
        }
      default:
        throw new Error('Uknknown type');
    }
  },

  convertToDate: function (value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Nie można przekonwertować na datę');
    }const DataTransformLib = {
  addValues: function (a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    } else if (typeof a === 'string' || typeof b === 'string') {
      return String(a) + String(b);
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    } else if (typeof a === 'object' && typeof b === 'object') {
      return { ...a, ...b };
    } else {
      throw new Error('Values are incorrect');
    }
  },

  stringifyValue: function (value) {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    } else {
      return String(value);
    }
  },

  invertBoolean: function (value) {
    if (typeof value !== 'boolean') {
      throw new Error('Value needs to be boolean');
    }
    return !value;
  },

  convertToNumber: function (value) {
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (isNaN(num)) {
      throw new Error('Cannot do such operation');
    }
    return num;
  },

  coerceToType: function (value, type) {
    switch (type) {
      case 'string':
        return this.stringifyValue(value);
      case 'number':
        return this.convertToNumber(value);
      case 'boolean':
        return Boolean(value);
      case 'object':
        if (typeof value === 'object' && value !== null) return value;
        try {
          const parsed = JSON.parse(value);
          return parsed;
        } catch {
          throw new Error('Cannot do the operation');
        }
      default:
        throw new Error('Uknknown type');
    }
  },

  convertToDate: function (value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Canoot conver to date');
    }
    return date;
  },

  isInteger: function (value) {
    return Number.isInteger(value);
  }
};

    return date;
  },

  isInteger: function (value) {
    return Number.isInteger(value);
  }
};
