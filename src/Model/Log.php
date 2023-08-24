<?php

namespace App\Model;

use App\Enum\LogType;
use DateTimeImmutable;

class Log
{
    public readonly DateTimeImmutable $date;

    public function __construct(
        public readonly LogType $type,
        public readonly string $message,
    ) {
        $this->date = new DateTimeImmutable();
    }

    public function __toString()
    {
        return "[" . $this->date->format("Y-m-d H:i:s") . "] " . strtoupper($this->type->value) . " " . $this->message;
    }
}
