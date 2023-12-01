<?php

namespace App\MessageHandler;

use App\Command\StorageSyncCommand;
use App\Message\RequestStorageSyncMessage;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler("messenger.bus.default")]
final class RequestStorageSyncHandler
{
    public function __construct(
        private StorageSyncCommand $storageSyncCommand,
		private KernelInterface $kernel,
    ) {
    }

    public function __invoke(RequestStorageSyncMessage $message)
    {
		$application = new Application();
        $application->setAutoExit(false);

        $input = new ArrayInput(['command' => 'app:storage:sync']);
        $output = new NullOutput();
        $application->run($input, $output);
    }
}
