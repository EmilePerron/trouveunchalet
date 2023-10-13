<?php

namespace App\Messenger;

use App\Crawler\Exception\WaitForRateLimitingException;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Exception\UnrecoverableMessageHandlingException;
use Symfony\Component\Messenger\Retry\RetryStrategyInterface;

class RetryStrategy implements RetryStrategyInterface
{
    /**
     * @param \Throwable|null $throwable The cause of the failed handling
     */
    public function isRetryable(Envelope $message, \Throwable $throwable = null): bool
	{
		return !($throwable instanceof UnrecoverableMessageHandlingException);
	}

    /**
     * @param \Throwable|null $throwable The cause of the failed handling
     *
     * @return int The time to delay/wait in milliseconds
     */
    public function getWaitingTime(Envelope $message, \Throwable $throwable = null): int
	{
		if ($throwable instanceof WaitForRateLimitingException) {
			return $throwable->delayInSeconds;
		}

		return 30000;
	}
}
