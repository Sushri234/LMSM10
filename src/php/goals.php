<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$data = json_decode(file_get_contents("php://input"));
//print_r($data);

$boxlead=$data->boxlead;
$goal=$data->goal;
$empid=$data->eid;
$empname=$data->namee;

if($boxlead && $empid &&$goal ){
$sql="insert into goals (ENAME,EID,BL,Goal) values ('$empname','$empid','$boxlead','$goal');";
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