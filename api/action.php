<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_config.php";
$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = strip_tags($postjson['aksi']);
$data = array();

switch($aksi)
{
    case "add_pendonor":
        $nama             = filter_var($postjson['nama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $nik              = filter_var($postjson['nik'], FILTER_SANITIZE_NUMBER_INT);
        $goldar           = filter_var($postjson['goldar'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $email            = filter_var($postjson['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $no_hp            = filter_var($postjson['no_hp'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $sql = "INSERT INTO pendonor (nik, nama, goldar, email, no_hp) 
                    VALUES (:nik, :nama, :goldar, :email, :no_hp)";
                       $stmt = $pdo->prepare($sql);
                       $stmt->bindParam(':nama', $nama, PDO::PARAM_STR);
                       $stmt->bindParam(':nik', $nik, PDO::PARAM_INT);
                       $stmt->bindParam(':goldar', $goldar, PDO::PARAM_STR);
                       $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                       $stmt->bindParam(':no_hp', $no_hp, PDO::PARAM_INT);
                       $stmt->execute();
           

            if ($sql) {
                $result = json_encode(array('success' => true));
            } else {
                $result = json_encode(array('success' => false, 'msg' => 'Error, please try again'));
            }
            echo $result;
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    break;

    case "get_pendonor":
        $limit = filter_var($postjson['limit'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $start = filter_var($postjson['start'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        try {
            $sql = "SELECT * FROM pendonor ORDER BY id DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($rows as $row) {
                $data[] = array(
                    'id' => $row['id'],
                    'nama' => $row['nama'],
                    'nik' => $row['nik'],
                    'goldar' => $row['goldar'],
                    'email' => $row['email'],
                    'no_hp' => $row['no_hp'],
                );
            }
            if($stmt) $result = json_encode(array('success'=>true,
            'result'=>$data));
        else $result = json_encode(array('success'=>false));
            echo $result;
            } 
        catch(PDOException $e) 
        {
            echo $e->getMessage();
        }
    break;
}
