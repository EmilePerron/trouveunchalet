<?php

namespace App\Enum;

enum LogType: string
{
    case Error = "error";
    case Warning = "warning";
    case Info = "info";
    case Debug = "debug";
}
