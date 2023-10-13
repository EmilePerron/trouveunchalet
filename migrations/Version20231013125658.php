<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231013125658 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add pricing columns to listings';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing ADD minimum_price_per_night INT DEFAULT NULL, ADD maximum_price_per_night INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP minimum_price_per_night, DROP maximum_price_per_night');
    }
}
