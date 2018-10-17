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

export function processMapping(mapping, detail, data, dbFields) {
	var checkDateResult = dateCheck(mapping, dbFields);
	if (checkDateResult != null) {
		throw checkDateResult;
	}
	var result = [];
	var map = {};
	for (var i = 0; i < mapping.length; i++) {
		map[mapping[i][0]] = mapping[mapping[i][1]]
	}
	// for each row of data
	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var dataObject = {};

		var dateAdded = false;
		var localDate, localTime, localDateFormat, localTimeFormat;
		// for each mapped database fields
		for (var idx in mapping) {
			var rawData = row[mapping[idx][1]];
			var fieldType = dbFields.fieldMetaDataList[mapping[idx][0]].type;
			if (fieldType == "Date") {
				var format = detail[idx].detail;
				if (!moment(rawData, format, true).isValid()) {
					throw "format not match";
				}
				rawData = moment(rawData, format).format("YYYY-MM-DD hh:mm:ss");
				dateAdded = true;
			}

			if (!dateAdded && fieldType == "LocalDate" && localTime == null) {
				localDateFormat = detail[idx].detail;
				localDate = rawData;
				continue;
			}

			if (!dateAdded && fieldType == "LocalTime" && localDate == null) {
				localTimeFormat = detail[idx].detail;
				localTime = rawData;
				continue;
			}

			if (!dateAdded && fieldType == "LocalDate" && localTime != null) {
				var format = detail[idx].detail + " " + localTimeFormat;
				console.log(format);
				console.log(rawData + " " + localTime);
				if (!moment(rawData + " " + localTime, format, true).isValid()) {
					throw "format not match";
				}
				rawData = moment(rawData + " " + localTime, format).format("YYYY-MM-DD hh:mm:ss");
				dateAdded = true;
			}

			if (!dateAdded && fieldType == "LocalTime" && localDate != null) {
				var format = localDateFormat + " " + detail[idx].detail;
				console.log(format);
				console.log(localDate + " " + rawData)
				if (!moment(localDate + " " + rawData, format, true).isValid()) {
					throw "format not match";
				}
				rawData = moment(localDate + " " + rawData, format).format("YYYY-MM-DD hh:mm:ss");
				dateAdded = true;
			}

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
				default:
					throw "format not supported";
				}
			}
			dataObject[dbFields.fieldMetaDataList[mapping[idx][0]].fieldName] = rawData;
		}
		result.push(dataObject);
	}
	console.log(result);
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