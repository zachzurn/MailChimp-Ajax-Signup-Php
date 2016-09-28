<?php

/*

Mailchimp Submission code by Zach Zurn.
Takes information provided via ajax and processes the MailChimp email submission to a list.

You must provide an api key in this php file.

*/

$apiKey = 'ADD-YOUR-KEY-HERE';

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$merge_fields = $_POST['merge_fields'];
$interests = $_POST['interests'];
$list = $_POST['list'];

//Silenty die with invalid information -- we expect our forms to prevalidate, so no extra information is given if improper information is provided.
if(!isset($email) || $email == "" || !isset($list) || $list == "" || !isset($first_name) || !isset($last_name)){
    die("{}");
}

$dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
$memberId = md5(strtolower($email));
$url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $list . '/members/';

$data = array(
    'email_address' => $email,
    'status'        => "subscribed",
    'merge_fields'  => array(
        'FNAME'     => $first_name,
        'LNAME'     => $last_name
    )
);

//Add merge fields
if(is_array($merge_fields)){
    foreach($merge_fields as $key => $value){
        $data['merge_fields'][$key] = $value;
    }
}

//Add interests
if(is_array($interests) && count($interests) > 0){

    $data['interests'] = array();

    foreach($interests as $key => $value){
        if($value == "true") $data['interests'][$key] = true;
        else $data['interests'][$key] = false;
    }

}

$json = json_encode($data);

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

//echo $json;
echo $result;
