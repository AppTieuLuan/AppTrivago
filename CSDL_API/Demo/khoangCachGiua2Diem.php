<?php

	function getDistanceBetweenPointsNew($latitude1, $longitude1, $latitude2, $longitude2) {
	    $theta = $longitude1 - $longitude2;
	    $miles = (sin(deg2rad($latitude1)) * sin(deg2rad($latitude2))) + (cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * cos(deg2rad($theta)));
	    $miles = acos($miles);
	    $miles = rad2deg($miles);
	    $miles = $miles * 60 * 1.1515;
	    //$feet = $miles * 5280;
	    //$yards = $feet / 3;

	    $kilometers = $miles * 1.609344;

	   //$meters = $kilometers * 1000;

	    //return compact('miles','feet','yards','kilometers','meters');
	    return round($kilometers,3);
	}
?>