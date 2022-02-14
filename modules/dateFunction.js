import { DateTime } from '../node_modules/luxon/build/es6/luxon.js';
import { DateTime as LocalLuxon } from './luxon.min.js';

function updateDate(element) {
  const dateTime = DateTime.now();
  const dateTimeLocal = LocalLuxon.now();
  const dt = (dateTime !== undefined) ? dateTime : dateTimeLocal;
  element.textContent = dt.toLocaleString(DateTime.DATETIME_MED);
}

export default updateDate;