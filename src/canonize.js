export default function canonize(url) {
   const ind = url.indexOf('//') == -1 ? 0 : url.indexOf('//') + 2;
   const username = url.substring(ind).split('/');
   const name = (username.length > 1) ? username[1] : username[0];
   return name.indexOf('@') != -1 ? name : '@' + name;
}
