<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$data = json_decode(file_get_contents("php://input"));
//print_r($data);

$id=$data->id;
$achievenent=$data->achievement;
$empid=$data->eid;

if($achievenent && $empid &&$id ){
$sql = "UPDATE goals SET Achievement = '$achievenent' WHERE ID='$id' and EID='$empid'";
$result = mysqli_query($con,$sql);
if($result){
  $response['data']=array(
    'State' => 'Inserted'  );
  echo json_encode($response);
}else{
  $response['data']=array(
    'Statae' => 'Deniened');
  echo json_encode($response);
}

}
?>