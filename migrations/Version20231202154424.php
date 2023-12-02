<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231202154424 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add fireplace and woodstove columns to listings.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing ADD has_wood_stove TINYINT(1) DEFAULT NULL, ADD has_fireplace TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP has_wood_stove, DROP has_fireplace');
    }
}
