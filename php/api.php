<?php

header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

require_once("Rest.inc.php");

class API extends REST {

	public function __construct(){
		parent::__construct();				// Init parent contructor
		$this->dbConnect();					// Initiate Database connection
	}

	// 2016-02-14T09:05:16.880823Z 1 [Note] A temporary password is generated for root@localhost: o3vZqoyb6S_Q
	// If you lose this password, please consult the section How to Reset the Root Password in the MySQL reference manual.
	// exPassword!

	/*
     *  Connect to Database
    */
	private function dbConnect(){
		try {
			$this->db = new PDO('mysql:host=localhost;dbname=courses;port=8888;charset=utf8', 'root', 'root');
		} catch (PDOException $e) {
			print "<br>Error: " . $e->getMessage() . "<br>";
			die();
		}
	}

	/*
     * Dynmically call the method based on the query string
     */
	public function processApi(){
		$col = $_REQUEST['col'];
        if((int)method_exists($this,$col) > 0) {
			$this->$col();
		} else
            $this->response('',404); // If the method not exist with in this class "Page not found".
    }

	private function dept() {
		if($this->get_request_method() != "GET") {
			$this->response('',406);
		}

		$value = $_REQUEST['value'];

		$result = array();
		foreach($this->db->query("select * from courses where dept like '" . $value . "'") as $row) {
			$result[] = $row;
		}
		$this->response($this->json($result), 200);
		$this->response('',204);
	}

	private function courseNumber() {
		if($this->get_request_method() != "GET") {
			$this->response('',406);
		}

		$value = $_REQUEST['value'];

		$result = array();
		foreach($this->db->query("select * from courses where courseNumber like '" . $value . "%'") as $row) {
			$result[] = $row;
		}
		$this->response($this->json($result), 200);
		$this->response('',204);
	}

	private function units() {
		if($this->get_request_method() != "GET") {
			$this->response('',406);
		}

		$value = $_REQUEST['value'];

		$result = array();
		foreach($this->db->query("select * from courses where units like '" . $value . "'") as $row) {
			$result[] = $row;
		}
		$this->response($this->json($result), 200);
		$this->response('',204);
	}

	/*
     *	Encode array into JSON
    */
	private function json($data){
		if(is_array($data)){
			return json_encode($data);
		}
	}
}

// Initiate Library

$api = new API;
$api->processApi();
?>