<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include 'connection.php';
$data = json_decode(file_get_contents("php://input"));

$state=$data->state;
$id=$data->id;

if ($state && $id) {
  $sql = "UPDATE leaves SET State = '$state' WHERE ID='$id'";
  $res = mysqli_query($con, $sql);
  if ($res) {
    $response['data'] = array(
      'Leave' => 'Approved'
    );
    echo json_encode($response);
  } }
?>