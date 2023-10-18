<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$EmployeeID=$_GET['empid'];

if($EmployeeID) {
    $sql = ("select ID,Goal,Remarks from goals where EID='$EmployeeID' and GoalState='Completed' Order by ID DESc");
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