import moment from 'moment';
import Papa from 'papaparse';

export function processRawCSVString(csvFile) {
	Papa.parse(csvFile, {
		complete: function(result) {
			var data = result.data;
			var labels = result.data[0];
			return [labels, data];
		}
	});
}

// This is a rather comoplex function
// this function includes some parsing logic
export function processMapping(mapping, detail, data, dbFields, hasLabel) {
	// validate 
	var checkDateResult = dateCheck(mapping, dbFields);
	if (hasLabel) {
		data = data.slice(1);
	}
	if (checkDateResult != null) {
		throw checkDateResult;
	}
	var result = [];
	var map = {};
	for (var i = 0; i < mapping.length; i++) {
		map[mapping[i][0]] = mapping[mapping[i][1]]
	}
	var dateField;
	for (var idx in dbFields.fieldMetaDataList) {
		if (dbFields.fieldMetaDataList[idx].type == "Date") {
			dateField = dbFields.fieldMetaDataList[idx].fieldName
		}
	}
	// for each row of data
	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var dataObject = {};

		var usingDate = false;
		var isSeperateDate = false;
		var localDate, localTime;
		// for each mapped database fields
		for (var idx in mapping) {
			var rawData = row[mapping[idx][1]];
			var fieldType = dbFields.fieldMetaDataList[mapping[idx][0]].type;

			// if date is selected, directly parse date as usual
			if (fieldType == "Date") {
				rawData = moment(rawData, "YYYY-M-D H:m").format("YYYY-MM-DD hh:mm:ss");
				if (rawData == "Invalid date") {
					throw "invalid date format";
				}
				usingDate = true;
				isSeperateDate = false;
			}

			// if we are not using date and date time is not complete,
			// then store local date
			if (!usingDate && fieldType == "LocalDate" && localTime == null) {
				localDate = rawData;
				continue;
			}

			// similarly, store local time
			if (!usingDate && fieldType == "LocalTime" && localDate == null) {
				localTime = rawData;
				continue;
			}

			// then if date is complete, combine then together
			if (!usingDate && fieldType == "LocalDate" && localTime != null) {
				rawData = moment(rawData + " " + localTime, "YYYY-M-D H:m").format("YYYY-MM-DD hh:mm:ss");
				if (rawData == "Invalid date") {
					throw "invalid date format";
				}
				isSeperateDate = true;
			}

			if (!usingDate && fieldType == "LocalTime" && localDate != null) {
				rawData = moment(localDate + " " + rawData, "YYYY-M-D H:m").format("YYYY-MM-DD hh:mm:ss");
				if (rawData == "Invalid date") {
					throw "invalid date format";
				}
				isSeperateDate = true;
			}

			// parse integer
			if (fieldType == "int") {
				rawData = parseInt(rawData);
			}

			// parse double
			if (fieldType == "double") {
				rawData = parseFloat(rawData);
			}

			// parse boolean
			if (fieldType == "boolean") {
				var format = detail[idx].detail;
				switch (format) {
				case "yes":
					rawData = rawData == "yes" ? true : false;
					break;
				case "true":
					rawData = rawData == "true" ? true : false;
					break;
				case "ok":
					rawData = rawData == "ok" ? true : false;
					break;
				case "accept":
					rawData = rawData == "accept" ? true : false;
					break;
				default:
					throw "boolean format not supported";
				}
			}

			// if is seperate date format, assign using date field
			// else, assign directly using date field
			if (isSeperateDate) {
				dataObject[dateField] = rawData;
				isSeperateDate = false;
			} else {
				dataObject[dbFields.fieldMetaDataList[mapping[idx][0]].fieldName] = rawData;
			}
		}
		result.push(dataObject);
	}
	return result;
}

export function dateCheck(mapping, dbFields) {
	var localDateExists = false;
	var localTimeExists = false;
	for (var idx in mapping) {
		var dbLabelType = dbFields.fieldMetaDataList[mapping[idx][0]].type;
		if (dbLabelType == "Date") {
			return null;
		}
		if (dbLabelType == "LocalDate") {
			localDateExists = true;
		}
		if (dbLabelType == "LocalTime") {
			localTimeExists = true;
		}
	}
	if (localDateExists && !localTimeExists) {
		return "local time not specified when local date exists."
	}

	if (!localDateExists && localTimeExists) {
		return "local date not specified when local time exists."
	}
}