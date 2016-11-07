export default function fio(fullName) {
  var re = /(\d)|([!_/-]+)/;
  if (!fullName || re.test(fullName)) return 'Invalid fullname';

  const name = fullName.trim().split(/\s+/);

  for (var i=0; i < name.length; i++) {
    name[i] = validName(name[i]);
  }

  switch (name.length) {
    case 1: return fullName;
    case 2: return name[1] + ' ' + name[0].charAt(0) +'.';
    case 3: return name[2] + ' ' + name[0].charAt(0) +'. ' + name[1].charAt(0) + '.';
    default: return 'Invalid fullname';

  }

  function validName(name) {
    return name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase();
    }
}
