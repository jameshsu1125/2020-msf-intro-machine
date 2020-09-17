<?
//允許網址，*為所有
header('Access-Control-Allow-Origin:*');  
//允取方法
header('Access-Control-Allow-Methods:POST, GET');  
//允許header
header('Access-Control-Allow-Headers:x-requested-with,content-type');

if(isset($_POST["imgBase64"])){
	//存圖片
	$path = "./";
	$baseUrl = "https://msf.lesca.net/_storage";
	
    $imageData = $_POST["imgBase64"];
    $imageData = str_replace('data:image/jpg;base64,', '', $imageData);
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);
    $imageData = base64_decode( $imageData);
    $source = imagecreatefromstring($imageData);
	$fileName = date("YmdHisu");
	$imageSave = imagejpeg($source,"{$path}/upload/{$fileName}.jpg",100);
    imagedestroy($source);
	
	//存檔案
	//讀取模板
	$templete = file_get_contents("templete.html");
	$newHtml = $templete;
	
	//替換參數
	$imageUrl = "{$baseUrl}/upload/{$fileName}.jpg";
	$shareUrl = "{$baseUrl}/share/{$fileName}.html";
	
	$newHtml = str_replace("##title##",$_POST["title"],$newHtml);
    $newHtml = str_replace("##url##",$shareUrl,$newHtml);
	$newHtml = str_replace("##share_image##",$imageUrl,$newHtml);
	$newHtml = str_replace("##share_desc##",$_POST["description"],$newHtml);
	
	//存檔
	$open = @fopen("{$path}/share/{$fileName}.html","w+"); //開啟檔案，要是沒有檔案將建立一份
	@fwrite($open,$newHtml); //寫入
	fclose($open); //關閉檔案

    $response = [
        'message'=>"新增成功",
        "status_code" => 0,
        "img_url" => $imageUrl,
		"share_url" => $shareUrl,
    ];
}else{

    $response = [
        'message'=>"新增失敗",
        "status_code" => 1
    ];
}

echo json_encode($response);

?>