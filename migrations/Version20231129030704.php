<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231129030704 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Removes crawl logs';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('DROP TABLE crawl_log');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('CREATE TABLE crawl_log (id BINARY(16) NOT NULL COMMENT \'(DC2Type:ulid)\', site VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, date_started DATETIME NOT NULL, date_completed DATETIME DEFAULT NULL, logs LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\', total_listing_count INT DEFAULT NULL, crawled_count INT DEFAULT NULL, failed TINYINT(1) NOT NULL, date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
    }
}
