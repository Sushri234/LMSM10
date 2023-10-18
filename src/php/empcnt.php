<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$fullname=$_GET['fullname'];

if($fullname) {
    $sql = ("select ID,TypeOfLeave, SUM(LengthOfLeave) as noofLeaves from leaves where FullName='$fullname' and State='Approved' group by TypeOfLeave");
    $res = mysqli_query($con, $sql);
    $data=array();
while($row=mysqli_fetch_assoc($res)){
    $data[]=$row;
};
echo json_encode($data);
 } else {
      $j="failed";
      $k = json_decode($j);
      echo json_encode($k);
    
}
?>