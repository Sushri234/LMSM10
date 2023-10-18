<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'connection.php';

// $user = json_decode(file_get_contents("php://input"));
// $fullname = $user->fullname;

$fullname=$_GET['fullname'];

if($con ){
$sql=("select sum(LengthOfLeave) as noofLeaves,FullName,ID,TypeOfLeave  from leaves where State='Approved' and  BL='$fullname' group by FullName, TypeOfLeave;");
$result = mysqli_query($con,$sql);
$data=array();
while($row=mysqli_fetch_assoc($result)){
    $data[]=$row;
};
echo json_encode($data);
}else{
    $response ="Connection failed: " . mysqli_connect_error();
      echo json_encode($response);
}
?>