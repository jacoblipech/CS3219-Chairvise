export function processRawCSVString(rawCSV) {
	var labels = [];
	var data = [];
	rawCSV = rawCSV.split("\n");

	var labelString = rawCSV.splice(0, 1)[0];
	var labels = labelString.split(",");
	labels = labels.map(function(item) {
		return item.trim().replace(/['"]+/g, "");
	});

	data = rawCSV;
	data = data.map(function(item) {
		var splitted = item.split(",");
		splitted = splitted.map(function(e) {
			return e.trim().replace(/['"]+/g, "");
		});
		return splitted;
	});
	console.log(data)
  return [labels, data];
}

export function processMapping(mapping, data, dbFields) {
	var result = [];
	var map = {};
	for (var i = 0; i < mapping.length; i++) {
		map[mapping[i][0]] = mapping[mapping[i][1]]
	}
	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var dataObject = {};
		for (var idx in mapping) {
			dataObject[dbFields.fieldMetaDataList[mapping[idx][0]].fieldName] = row[mapping[idx][1]];
		}
		result.push(dataObject);
	}
	console.log(result);
}