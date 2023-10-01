<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231001140032 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Adds minimum stay duration to listings.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing ADD minimum_stay_in_days INT DEFAULT 1 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP minimum_stay_in_days');
    }
}
