<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'connection.php';

if($con ){
$sql=("select * from leaves where State <> 'Pending';");
$result = mysqli_query($con,$sql);
$datall=array();
while($row=mysqli_fetch_assoc($result)){
    $datall[]=$row;
};
echo json_encode($datall);
}else{
    $response ="Connection failed: " . mysqli_connect_error();
      echo json_encode($response);
}
?>