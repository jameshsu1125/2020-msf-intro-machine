const $ = require('jquery');
module.exports = {
	reset_time: 20000, //回到初始時間,
	Upload:function({ title = '無國界醫生', description = '愛不是藥 但一樣有效', base64 })
	{
		var url = './_storage/savePhoto.php'
		if(window.location.host == 'localhost:8080') url = 'https://msf.lesca.net/_storage/savePhoto.php';

		return new Promise((resolve, reject) =>{
			$.ajax({
				type: 'POST',
				url: url,
				dataType: 'json',
				data: {
					imgBase64: base64,
					title: title,
					description: description

				},
				success: function(data) {
					resolve(data);
				},
				error:function()
				{
					reject();
				}
			});
		})
		
		
	}
}