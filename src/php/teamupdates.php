<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$Mngr=$_GET['mname'];

if($Mngr) {
    $sql = ("select ID,ENAME,Goal,EID,Achievement,Remarks from goals where BL='$Mngr' and GoalState='Completed' group by ID ORDER BY ENAME");
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