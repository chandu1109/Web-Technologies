<?php
session_start();
			if(isset($_SESSION['name'])){
			session_destroy();
			header("Location: http://localhost/Uploads/index.html");
			}
			else
			{
				header("Location: http://localhost/Uploads/index.html");
			}
?>