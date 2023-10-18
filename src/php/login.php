<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';

$user = json_decode(file_get_contents("php://input"));
$email = $user->email;
$password = $user->password;


if($email && $password){
$sql=("select * from login where EmailID= '$email'and Password = '$password'");//and Status='Enabled';");
$result = mysqli_query($con,$sql);
$count=mysqli_num_rows($result);
$row=mysqli_fetch_assoc($result);
if($count>0){
    http_response_code(200);
    echo json_encode($row);
}else{
    http_response_code(202);
}
}
?>