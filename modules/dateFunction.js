let LuxonDateTime;
let LocalLuxonDateTime;

try {
  import('../node_modules/luxon/build/es6/luxon.js').then((e) => { LuxonDateTime = e.DateTime; });
} catch (e) { LuxonDateTime = undefined; }
// This will not fail as we know there is a local copy of the file
import('./build/luxon.min.js').then((e) => { LocalLuxonDateTime = e.DateTime; });

function updateDate(element) {
  if (LuxonDateTime !== undefined) {
    element.textContent = LuxonDateTime.now().toLocaleString(LuxonDateTime.DATETIME_MED);
  } else {
    element.textContent = LocalLuxonDateTime.now().toLocaleString(LocalLuxonDateTime.DATETIME_MED);
  }
}

export default updateDate;