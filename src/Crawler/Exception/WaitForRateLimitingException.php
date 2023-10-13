<?php

namespace App\Crawler\Exception;

use Exception;

class WaitForRateLimitingException extends Exception
{
	public function __construct(
		public readonly int $delayInSeconds
	)
	{
		parent::__construct("To respect rate limiting, waiting a period of {$delayInSeconds}s before tring again is recommended.");
	}
}
