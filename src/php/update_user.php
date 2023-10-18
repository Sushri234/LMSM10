<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$data = json_decode(file_get_contents("php://input"));
$fullname = $data->fullname;
$email = $data->email;
$password = $data->password;
$role = $data ->role;
$boxlead = $data ->boxlead;
$mobileno = $data->mobileno;
$address=$data->address;
$employeeiD= $data->employeeiD;
$edsgn=$data->empD;



if($employeeiD){
$sql="UPDATE login SET Full_Name='$fullname',EmailID='$email',Password='$password',Role='$role',Boxlead='$boxlead',Mobile_NO='$mobileno',Address='$address',EMPD='$edsgn' WHERE EMPID='$employeeiD'";
$result = mysqli_query($con,$sql);
if($result){
  $response['data']=array(
    'Status' => 'valid'
  );
  echo json_encode($response);
}else{
  $response['data']=array(
    'Status' => 'Invalid'
  );
  echo json_encode($response);
}

}
?>