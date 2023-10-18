<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'connection.php';

$data = json_decode(file_get_contents("php://input"));
$id=$data->id;
$goal=$data->goal;
$eid=$data->empid;

if ($goal && $id) {
  $sql = "UPDATE goals SET Goal = '$goal' WHERE ID='$id' and EID='$eid'";
  $res = mysqli_query($con, $sql);
  $rowss = mysqli_affected_rows($con);
 
    if ($rowss == 0) {
    $response['data'] = array(
      'Msg' => 'negative'
    );}
    if ($res) {
      $response['data'] = array(
        'Msg' => 'Edited'
      );
    echo json_encode($response);
  } }

?>