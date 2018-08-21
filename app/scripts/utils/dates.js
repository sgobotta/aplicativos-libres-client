/** Miscellaneous Imports */
import moment from 'moment';

const utils = {};


function isToday(date) {
  const now = moment();
  return (
    now.day() === date.day() &&
    now.month() === date.month() &&
    now.year() === date.year()
  );
}

/**
 * @function getCreationDate
 * @summary Given a creation date, resolves the attributes and returns a parsed
 * text in Spanish.
 * @param {Object} creationDate A 'moment' date.
 * @returns {String} The parsed date with text.
 */
utils.getCreationDate = (creationDate) => {
  const date = moment(creationDate);
  const wasCreatedToday = isToday(date);
  const day = date.date();
  const month = date.month() + 1;
  const year = date.year();
  let hour = date.hour();
  hour = hour < 10 ? `0${hour}` : hour;
  let minute = date.minute();
  minute = minute < 10 ? `0${minute}` : minute;

  const preDate = wasCreatedToday
    ? 'Hoy'
    : 'el día';

  const dateInfo = wasCreatedToday
    ? `${preDate}`
    : `${preDate} ${day}/${month}/${year}`;

  const preHour = hour === 1 ? 'la' : 'las';
  const hourInfo = `a ${preHour} ${hour}:${minute} hrs.`;

  return `
    Creado
    ${dateInfo}
    ${hourInfo}
    `;
};

utils.getElapsedTime = (creationDate) => {
  const now = moment();
  const elapsedSeconds = now.diff(creationDate, 'seconds');
  const elapsedMinutes = now.diff(creationDate, 'minutes');
  const elapsedHours   = now.diff(creationDate, 'hours');
  const elapsedDays    = now.diff(creationDate, 'days');
  const elapsedWeeks   = now.diff(creationDate, 'weeks');
  const elapsedMonths  = now.diff(creationDate, 'months');
  const elapsedYears   = now.diff(creationDate, 'years');

  const parse = (indicator, unit, helper, anotherUnit) => {
    let pUnit;
    pUnit = (indicator !== 1) ? `${unit}s` : unit;
    pUnit = (indicator !== 1 && unit === 'mes') ? `${unit}es` : pUnit;
    if (helper !== undefined && anotherUnit !== undefined && helper !== 0) {
      let pAnotherUnit;
      pAnotherUnit = (helper !== 1) ? `${anotherUnit}s` : anotherUnit;
      pAnotherUnit = (helper !== 1 && anotherUnit === 'mes')
        ? `${anotherUnit}es`
        : pAnotherUnit;
      return `hace ${indicator} ${pUnit} y ${helper} ${pAnotherUnit}.`;
    }
    return `hace ${indicator} ${pUnit}.`;
  };

  if (elapsedSeconds < 60) return parse(elapsedSeconds, 'segundo');
  if (elapsedMinutes < 60) return parse(elapsedMinutes, 'minuto');
  if (elapsedHours < 24) return parse(elapsedHours, 'hora');
  if (elapsedDays < 7) return parse(elapsedDays, 'día');
  if (elapsedWeeks < 4) return parse(elapsedWeeks, 'semana', elapsedDays % 7, 'día');
  if (elapsedMonths < 11) return parse(elapsedMonths, 'mes');
  return parse(elapsedYears, 'año', elapsedMonths % 12, 'mes');
};

export const DateUtils = utils;
