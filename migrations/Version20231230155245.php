<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231230155245 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add date last completely crawled to listings.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing ADD date_last_completely_crawled DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('UPDATE listing SET date_last_completely_crawled = date_updated');
        $this->addSql('ALTER TABLE listing MODIFY date_last_completely_crawled DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP date_last_completely_crawled');
    }
}
