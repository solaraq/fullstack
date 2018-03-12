document.querySelector('#getBtn').addEventListener('click', function() {
	var id = $('#hostId').val() || '';
	var url = '/hosts/' + id ;
	$.get(url, function(results) {
		$('#results').html(results.map(item => item.name).join(',<p>'));
	})
}, false);

document.querySelector('#deleteBtn').addEventListener('click', function() {
	$.ajax({
		url: '/hosts/' + $('#deleteId').val(),
		type: 'DELETE',
		success: deleteCallback,
		data: {}
	  });
}, false); 

document.querySelector('#searchBtn').addEventListener('click', function() {
	$.get({
		url: '/hosts/search',
		success: function (result, success) {
			$('#results').html(result.map(item => item.name).join(',<p>'));
		},
		error: function (result, success) {
			$('#results').html(result.responseText)
		},
		data: {
			searchText: $('#searchText').val() || ''
		}
	  });
}, false);

document.querySelector('#addBtn').addEventListener('click', function() {
	$.ajax({
		url: '/hosts',
		type: 'POST',
		dataType: "json",
		contentType: "application/json",
		success: function (result, success) {
			$('#results').text(success)
		},
		error: function (result, success) {
			$('#results').html(result.responseText)
		},
		data: JSON.stringify({
			id: $('#createHostId').val(),
			name: $('#hostName').val()
		})
	  });
}, false);

function deleteCallback(result, success) {
	$('#results').text(success)
}