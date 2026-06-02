export function type(value) {
  var regex = /^[object (S+?)]$/;
  var matches = Object.prototype.toString.call(value).match(regex) || [];
  return (matches[1] || 'undefined').toLowerCase();
}
