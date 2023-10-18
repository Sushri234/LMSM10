<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$data = json_decode(file_get_contents("php://input"));
//print_r($data);
$fullname=$data->fullname;
$boxlead=$data->boxlead;
$typeofleave=$data->typeofleave;
$lengthofleave=$data->lengthofleave;
$leavestartdate=$data->leavestartdate;
$leaveenddate=$data->leaveenddate;
$message=$data->message;
$role=$data->role;
$Mail=$data->maill;
$empid=$data->eid;

if($fullname && $typeofleave && $lengthofleave && $message && $leavestartdate && $leaveenddate ){

switch ($role) {
  case 3:
    $sql="insert into leaves (EMPID,FullName,TypeOfLeave,LengthOfLeave,StartDate,EndDate,Message,BL,mail) 
    values ('$empid','$fullname','$typeofleave','$lengthofleave','$leavestartdate' , '$leaveenddate' , '$message' , '$boxlead', '$Mail');";
    break;
  default:
    $sql="insert into leaves (EMPID,FullName,TypeOfLeave,LengthOfLeave,StartDate,EndDate,Message,BL,Bstate,mail) 
    values ('$empid','$fullname','$typeofleave','$lengthofleave','$leavestartdate' , '$leaveenddate' , '$message' , '$boxlead','Approved','$Mail');";
    break;
}

$result = mysqli_query($con,$sql);
if($result){
  $response['data']=array(
    'State' => 'Pending'  );
  echo json_encode($response);
}else{
  $response['data']=array(
    'Leave' => 'Deniened'
  );
}

}
?>