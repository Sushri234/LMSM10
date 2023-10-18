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

 
$check=mysqli_query($con,"select * from login where EMPID='$employeeiD'");
if(mysqli_num_rows($check)>0){
  $response['data']=array(
    'Status' => 'Userexists'
  );
  echo json_encode($response);
}else{
if($fullname && $email && $password&&$employeeiD){
$sql="insert into login values ('$fullname','$email','$password','$role','$boxlead','$mobileno','$address','$employeeiD','$edsgn');";
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

}
?>