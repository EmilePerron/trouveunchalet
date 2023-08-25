<?php

namespace App\Doctrine\EventListener;

use Doctrine\ORM\Tools\Event\GenerateSchemaEventArgs;
use Doctrine\ORM\Tools\ToolEvents;
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('doctrine.event_listener', ['event' => ToolEvents::postGenerateSchema])]
class IgnoreForeignKeysListener
{
    public function postGenerateSchema(GenerateSchemaEventArgs $args): void
    {
        $schema = $args->getSchema();

        foreach ($schema->getTables() as $table) {
            $foreignKeys = $table->getForeignKeys();

            foreach ($foreignKeys as $foreignKey) {
                $table->removeForeignKey($foreignKey->getName());
            }
        }
    }
}
