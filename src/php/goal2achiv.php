<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'connection.php';

$data = json_decode(file_get_contents("php://input"));
$id=$data->id;


if ($id) {
  $sql = "UPDATE goals SET GoalState = 'Completed' WHERE ID='$id'";
  $res = mysqli_query($con, $sql);
  if ($res) {
    $response['data'] = array(
      'Msg' => 'Completed'
    );
    echo json_encode($response);
  } }

?>