<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231013145319 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Adds average price column & property.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing ADD average_price_per_night INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP average_price_per_night');
    }
}
