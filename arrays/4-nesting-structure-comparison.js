Array.prototype.sameStructureAs = function (other) {
  const same = (item, otherItem) => {
    if (isArray(item) && !isArray(otherItem)) return false;
    if (!isArray(item) && isArray(otherItem)) return false;
    if (isArray(item) && isArray(otherItem)) {
      if (item.length !== otherItem.length) return false;
      let valid = true;
      for (let i = 0; i < item.length; ++i) {
        valid &&= same(item[i], otherItem[i]);
      }
      return valid;
    }
    return true;
  };
  return same(this, other);
};
