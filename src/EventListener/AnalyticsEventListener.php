<?php

namespace App\EventListener;

use App\Util\Plausible;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpKernel\Event\TerminateEvent;
use Symfony\Component\HttpKernel\KernelEvents;

#[AsEventListener(event: KernelEvents::TERMINATE)]
class AnalyticsEventListener
{
	public function __construct(
		private readonly Plausible $plausible,
	) {
	}

    public function __invoke(TerminateEvent $terminateEvent): void
    {
		$this->plausible->request = clone $terminateEvent->getRequest();

		if (str_starts_with($this->plausible->request->getPathInfo(), "/image/")) {
			return;
		}

		if (str_starts_with($this->plausible->request->getPathInfo(), "/cron/")) {
			return;
		}

		$this->plausible->trackEvent();
    }
}
