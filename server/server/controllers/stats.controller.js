import glob from 'glob';
import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { removeDuplicatesFromArray } from '../helpers/removeDuplicatesFromArray';

// Init XmlToJson parser
const parser = new xml2js.Parser();

// looking for .xml or .XML extensions
const localFeedPath = path.join(__dirname, '../mock/*.[xX][mM][lL]')

// TODO, should be filled for fetching information from external sources
const urlFeedPath = ''

/**
 * @dev The method fetch XML from external sources
 * For testing reasons it fetch XML from local path
 * @returns XML data
 */
const fetchXml = () => {
  return new Promise((resolve, reject) => {
    findLocalXmlFile()
    .then((fileName) => {
      if (!fileName) throw 'XML document does not found inside ./feeds folder'
        fs.readFile(fileName, (error, data) => {
          if (!error) resolve(data)
          else reject(error)
        })
      })
    .catch(error => { throw error })
  })
}

/**
 * @dev The method looks for .xml/.XML files inside certain path
 * @returns string (path of local XML file (first element only))
 */
const findLocalXmlFile = () => {
  return new Promise((resolve, reject) => {
      glob(localFeedPath, (error, files) => {
        if (!error) resolve(files[0])
        else reject(error)
      })
  })
}

/**
 * @dev Parse XML to JSON
 * @returns json value
 */
const parseXmlToJson = (xml) => {
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (error, result) => {
      if (!error) resolve(result)
      else reject(error)
    })
  })
}

/**
 * @dev The method looking for the nested key "PBP", and returns its value
 * @returns array of events
 */
const getNestedPlayEvents = (data) => {
  try {
    const pgp = data["sports-statistics"]["sports-scores"][0]["nba-scores"][0]['nba-playbyplay'][0]['play']
    if (!pgp) throw 'Undefined "pbpItem" key'
    else      return pgp
  } catch (error) {
    throw ('Invalid nested objects:', error)
  }
}

/**
 * @dev The method collects event names from provided data
 * @returns array of event names
 */
const getEvents = (data) => {
    const events = []
    data.forEach(el => {
      if (el['$'] &&
          el['$']['event-description']) {
        events.push(el['$']["event-description"])
      }
    })

    return events
}

/**
 * @dev Entry point-function
 * @returns object, "length" of unique events and "array" of unique events
 */
const getUniqueEvents = (req, res, next) => {
    fetchXml()
    .then((data) => {
      parseXmlToJson(data)
      .then((json) => {
        const pbpData = getNestedPlayEvents(json)
        const allEvents = getEvents(pbpData)
        const uniqueEvents = removeDuplicatesFromArray(allEvents)
        const result = JSON.stringify({
          'length': uniqueEvents.length,
          'totalCount': allEvents.length,
          'events': uniqueEvents
        })
        res.send(result)
      })
      .catch(error => next(error))
    })
    .catch(error => next(error))
}

export default { getUniqueEvents };