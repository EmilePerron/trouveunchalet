<?php

namespace App\Crawler\Driver;

use App\Crawler\Driver\Generic\AbstractGuestyDriver;

class LeVertendre extends AbstractGuestyDriver
{
	protected function getOriginUrl(): string
	{
		return "https://reservation.levertendre.com";
	}

	protected function getListingPageBaseUrl(): string
	{
		return "https://reservation.levertendre.com/properties/";
	}
}
