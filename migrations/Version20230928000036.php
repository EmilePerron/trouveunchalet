<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20230928000036 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Adds number of bedrooms and guests to listings.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing ADD number_of_bedrooms INT DEFAULT NULL, ADD maximum_number_of_guests INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP number_of_bedrooms, DROP maximum_number_of_guests');
    }
}
